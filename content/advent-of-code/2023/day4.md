+++
title="Day 4: Scratchcards"
date=2023-12-04T00:00:00-05:00
draft=false
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

Mathematically, this is relatively straightforward.  We can separate the possibilities into two scenarios: either we have 0 matches or some positive number `n` matches.  The former is trivial: 0 is 0.  The latter isn't too bad either.  The number of times we double our winnings is exactly `n-1`.  Since the initial value is `1` (for the first match), the total is `1*2^(n-1) = 2^(n-1)`.  

Finding the number of matches is also easy.  We can tell that no number is duplicated, so a Set is sufficient for our purposes.  Sets contain a function `inter`, which (surprise!) computes the intersection of two sets -- this is exactly what we want in order to find the number of matches.

Equipped with these hints, Part 1 becomes relatively straightforward, with the bulk of the implementation dedicated to parsing the input and being exhaustive.

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

## Part 2

No true dealer will ever let its players off _that_ easy, and the masterminds behind AoC are no different.  Instead of winning "points", your prize is more scratchcards.

Specifically, you now win copies of subsequent scratchcards based on the number of matches in your current card.  Confusing huh?

Let's run through an example:

```text
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
```

Before we start processing the cards, we have 1 copy of each of the cards. Visually, we'll represent our "inventory" in JSON format (card number to copies): 
```json
{
  "Card 1" : 1,
  "Card 2" : 1,
  "Card 3" : 1,
  "Card 4" : 1,
  "Card 5" : 1,
  "Card 6" : 1,
}
```

Card 1 is up first, and we only have 1 copy of this card.  There's 4 matching numbers, so we get 1 copy of the next 4 cards (Card 2, Card 3, Card 4, and Card 5).  Now, our inventory is the following:

```json
{
  "Card 1" : 1,
  "Card 2" : 2,
  "Card 3" : 2,
  "Card 4" : 2,
  "Card 5" : 2,
  "Card 6" : 1,
}
```

Card 2 is up next, and we have 2 copies of this card.  There's 2 matching numbers, so we get 1 copy of the next 2 cards (Card 3 and Card 4).  Now, our inventory is the following:

```json
{
  "Card 1" : 1,
  "Card 2" : 2,
  "Card 3" : 3,
  "Card 4" : 3,
  "Card 5" : 2,
  "Card 6" : 1,
}
```

You get the idea from here on out.  The goal is to count the total number of cards (originals and copies) after all cards are processed.

Initially, this sounds like a completely new problem compared to Part 1, but it's not too unrelated! We still use the same logic to parse each line and to find the number of matches.  There's just a couple of things to notice for this part:

First, we can see that once we process a card, we never need to reprocess it.  We only generate copies of future cards, not prior ones.  This makes it much simpler to handle.

Second, we can treat copies and originals all at once rather than individually/one at a time.  Each "copy" (here, the word "copy" includes the original card) will produce the same result, so "n" copies will produce "n" future "copies" each.

The tricky part (since we're on a road of purely functional programming with no mutability involved) is ensuring that our map of card IDs to copies is always correct.  To accomplish this, we can write a helper function to increment the number of copies for us.  At the end, a simple `sum` function across the counts is enough to get us our answer (and out of the gambling room).

Disclaimer: I'm still learning the language. Please excuse the handwavy / round-about / ugly implementations - I'm working on it :)

```ocaml
module IMap = Map.Make (Int)

let keys map = IMap.bindings map |> List.map fst |> ISet.of_list

let rec add_copies id incr n i2c =
  match incr with
  | 0 -> i2c
  | _ ->
      add_copies id (incr - 1) n
        (IMap.update (id + incr)
           (fun opt -> Some (match opt with Some c -> c + n | None -> n))
           i2c)

let process_line id_to_copies line =
  let id, wins_str, your_str = extract_parts line in
  let winning_vals, your_vals = (make_set wins_str, make_set your_str) in
  let matches = ISet.inter winning_vals your_vals in
  let num_matches = ISet.cardinal matches in
  let i2c =
    IMap.update id
      (fun opt -> Some (match opt with Some n -> n + 1 | None -> 1))
      id_to_copies
  in
  add_copies id num_matches (IMap.find id i2c) i2c

let part_two file =
  let lines = file_lines file in
  let i2c = List.fold_left process_line IMap.empty lines in
  IMap.bindings i2c |> List.map snd |> sum
```
