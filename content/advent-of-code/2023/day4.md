+++
title="Day 4: Scratchcards"
date=2023-12-04T00:00:00-05:00
draft=true
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/4"
+++

## Part 1

Recently, I've started to dabble in a bit of sports gambling.  And while this endeavor is short-lived (I somehow always lose), I still find it exciting to count the winnings (when they do happen).  Today's puzzle is about calculating your winnings from a series of scratchcards.

Given a series of "cards", each showing a series of winning numbers as well as your numbers (separated by a vertical bar).  An example is below:

```text
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
```

For each scratchcard, your total winning is dependent on the number of matches that your numbers have with the winning numbers.  Obviously, if you have no matches, then your total winning is 0.  If you have 1 matching card, then your total is 1.  Every match thereafter the first doubles your total winnings.

So, `Card 1` has 4 matching numbers (lucky you!).  This means that the total value of this card is `8` since the first card has 1 point, and then the remaining 3 matches each double the total, accounting to `8`.

Mathematically, this is relatively straightforward.  We can separate the possibilities into two scenarios: either we have 0 matches or some positive number `n` matches.

```ocaml
module ISet = Set.Make (Int)

let extract_parts str =
  match String.split_on_char ':' str with
  | [ header; rest ] -> (
      match
        (String.split_on_char ' ' header, String.split_on_char '|' rest)
      with
      | hs, [ winning_vals; your_vals ] ->
          ( List.nth hs (List.length hs - 1) |> int_of_string,
            winning_vals,
            your_vals )
      | _ ->
          Invalid_argument
            (Printf.sprintf
               "No space found in header or | found in body: \"%s\"\n%!" str)
          |> raise)
  | _ ->
      Invalid_argument
        (Printf.sprintf "No colon found in string: \"%s\"\n%!" str)
      |> raise

let make_set str =
  let rec make_set_acc l acc =
    match l with
    | [] -> acc
    | h :: t -> (
        match int_of_string_opt h with
        | Some n -> ISet.add n acc |> make_set_acc t
        | None -> make_set_acc t acc)
  in
  make_set_acc (String.split_on_char ' ' str) ISet.empty

let rec pow v = function
  | 0 -> 1
  | 1 -> v
  | n ->
      let b = pow v (n / 2) in
      b * b * if n mod 2 = 0 then 1 else v

let card_points line =
  let _, wins_str, your_str = extract_parts line in
  let winning_vals, your_vals = (make_set wins_str, make_set your_str) in
  let matches = ISet.inter winning_vals your_vals in
  let num_matches = ISet.cardinal matches in
  match num_matches with 0 -> 0 | n -> pow 2 (n - 1)

let part_one file =
  let lines = file_lines file in
  let points = List.map card_points lines in
  sum points
```