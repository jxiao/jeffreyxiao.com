+++
title="Day 1: Trebuchet?!"
date=2023-12-01T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/1"
+++

FYI: the date of this article may say December 1st, 2023, but I'm actually writing this mid-way through 2024. Sorry!

I learned about Advent of Code in 2020 during Covid and found it to be a fun exercise while locked at home. For those if you unfamiliar with AoC, each day in December leading up to Christmas morning, a new puzzle is released.  Given a problem statement and a sample input, you're tasked with solving the two parts in any language of your choice.  For each part solved correctly, you earn a star -- the goal being to secure 50 starts (2 for each day, up to 25 days). Sadly, I never ended up finishing it and didn't pick it back up over the next couple of years.  

I'm a couple months out of college now and find myself missing some of the functional programming I had done over the years (OCaml) -- so I figure now would be a good time to pick it up again.  I'll be going through last year (2023)'s puzzles and solving them in OCaml.  Most of the solutions will be written with the standard library -- although I may attempt to use other libraries like `Base` or `Core` in a few problems here and there.  Without further ado, let's get into Day 1!

---

## Part 1

In this puzzle, we're given a list of [alphanumeric](https://en.wikipedia.org/wiki/Alphanumericals) strings and are tasked to recover a calibration value for each string.  A calibration value is formed by combining the first digit and the last digits of the string to form a singular two-digit number.

For example:
- `1abc2` represents the calibration value `12`
- `abc123xyz` represents the calibration value `13`
- `hello5world` represents the calibration value `55`

Finally, we're asked to find the sum of all the calibration values in the input file.

The core of the problem is extracting the calibration value for 1 string.  Once we solve that, we simply repeat on all of the remaining strings and take the sum.

For one string, we can break this into two parts:
1. Find the first digit.
2. Find the last digit out of the remaining string.

Part 1 above is relatively straightforward since we can check if the current character is one of the 9 digits (`0` doesn't appear in these strings.)

Part 2 requires a bit more tinkering.  With the remaining string left after Part 1, we need to find the _last_ digit. Since we're traversing the string left-to-right, we'll need to keep track of the most recently seen digit as we go along, ensuring that we always have the latest-appearing digit.

Implementation-wise, I wanted to take advantage of OCaml's beautiful pattern-matching structure.  Each `string` will be converted into a `char list`, allowing us to match on the list and step through one at a time.

```ocaml
module CL = struct
  type t = char list
  let compare = compare
end

module CLMap = Map.Make (CL)

let char_list_of_string s = s |> String.to_seq |> List.of_seq

(* Determines if [l] starts with [sub]. *)
let rec starts_with sub l =
  match (sub, l) with
  | [], _ -> true
  | _, [] -> false
  | hd1 :: tl1, hd2 :: tl2 -> hd1 = hd2 && starts_with tl1 tl2

(* Determines if a key in [mapping] is a prefix to [l], 
   returning it if so. *)
let starts_with_num l mapping =
  let rec acc remaining =
    match remaining with
    | [] -> None
    | (chars, v) :: t -> if starts_with chars l then Some v else acc t
  in
  acc (CLMap.bindings mapping)

let extract mapping s =
  let chars = char_list_of_string s in
  let rec acc first second l =
    match (first, second, l) with
    | _, _, [] -> (first, second)
    | None, None, _ :: tl ->
        let prefix = starts_with_num l mapping in
        acc prefix prefix tl
    | Some _, Some _, _ :: tl ->
        let prefix = starts_with_num l mapping in
        if prefix = None then acc first second tl else acc first prefix tl
    | _, _, _ ->
        Invalid_argument
          "Cannot have non-empty list while first and last differ in Optional \
           values" |> raise
  in
  acc None None chars

let score (d1, d2) =
  match (d1, d2) with
  | Some d1, Some d2 -> (d1 * 10) + d2
  | None, Some d ->
      Invalid_argument
        (Printf.sprintf "Both values must be Some: (None, Some %d)" d)
      |> raise
  | Some d, None ->
      Invalid_argument
        (Printf.sprintf "Both values must be Some: (Some %d, None)" d)
      |> raise
  | None, None -> Invalid_argument "No digits found" |> raise

let get_part_result ?(debug = false) mapping file =
  let lines = file_lines file in
  let calibrations = List.map (extract mapping) lines in
  let answer = List.fold_left (fun acc p -> acc + score p) 0 calibrations in
  if debug then
    List.combine lines (List.map score calibrations)
    |> Utils.print_list (fun (s, i) -> Printf.sprintf "(%s,%i)" s i);
  answer

let digit_mappings =
  CLMap.empty |> CLMap.add [ '1' ] 1 |> CLMap.add [ '2' ] 2
  |> CLMap.add [ '3' ] 3 |> CLMap.add [ '4' ] 4 |> CLMap.add [ '5' ] 5
  |> CLMap.add [ '6' ] 6 |> CLMap.add [ '7' ] 7 |> CLMap.add [ '8' ] 8
  |> CLMap.add [ '9' ] 9

let part_one file = get_part_result digit_mappings file
```

In the above solution, `extract` is the function that performs the string traversal, stepping through the string one char at a time, examining the digit, and updating the `first` and `second` placeholders, if needed.

Note that the `extract` function takes in an extra parameter `mappings`, which is useful for translating `char list`s to the actual digit used for building the `int`.  It seems trivial here given that each digit is a singular `char`, but it provides more flexibility in terms of mappings, which we'll see in Part 2 momentarily.

## Part 2
Whew, that was some boilerplate code.  In this follow-up, we're now told that digits may also be spelled out with letters (in addition to the numeric literal).  That is:
- `one2three` represents the calibration value `13`
- `7eightblahnine` represents the calibration value `79`

Luckily, we added support for a custom mapping of `char list`s to `int` values.  So, we can take our solution to Part 1, add a few key-value mappings, and run it again!

```ocaml
let digit_word_mappings =
  digit_mappings
  |> CLMap.add (char_list_of_string "one") 1
  |> CLMap.add (char_list_of_string "two") 2
  |> CLMap.add (char_list_of_string "three") 3
  |> CLMap.add (char_list_of_string "four") 4
  |> CLMap.add (char_list_of_string "five") 5
  |> CLMap.add (char_list_of_string "six") 6
  |> CLMap.add (char_list_of_string "seven") 7
  |> CLMap.add (char_list_of_string "eight") 8
  |> CLMap.add (char_list_of_string "nine") 9

let part_two file = get_part_result digit_word_mappings file
```

This theme of reducing a complicated problem into a simpler one comes up frequently in AoC (as well as other coding problems), but it's incredibly satisfying once we get it right.

## Alternative Solution
Let's think about the complexity of my solution for a moment. No matter the input, `extract` will necessarily traverse the entire string, even if the relevant calibration digits are at the front and end.  This works fine for short strings, but if the inputs are especially long, we can benefit from searching starting from the two endpoints.

Finding the _first_ digit is simple. In fact, we already do this in the above implementation.  The difference is in finding the _last_ digit.

We can use a neat trick to find the last digit without having to write as much logic with respect to keeping track of the most-recently seen digit.  If we _reverse_ the string, we can utilize our `starts_with_num` function to find the first digit.  The first digit in the reversed string will actually be the last digit in the original string.

There's one caveat though: since we reversed the input string, we'll also need to reverse the text numbers that we search for.  That is, instead of matching on `one` (for the digit `1`), we need to match on `eno` (`one` reversed).

I'll leave the implementation details up to you -- I'd imagine this solution results in less code and is simpler to follow.  