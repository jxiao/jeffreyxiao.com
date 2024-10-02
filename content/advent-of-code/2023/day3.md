+++
title="Day 3: Gear Ratios"
date=2023-12-03T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/3"
+++

## Part 1

Today's puzzle involved some annoying parsing and `string`/`char list` traversals.  Given a grid of numbers, symbols, and empty spots `.`, we're asked to find the sum of all numbers that are adjacent to at least one symbol.  Adjacent, in this case, includes diagonals.  As an example, in the following grid, all numbers except `114` and `58` should be included in the final sum.

```text
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
```

There're several ways to approach this problem.
1. Two pass approach.  First pass: find the locations of all symbols.  Second pass: build all distinct numbers and add them to a collective sum **if** the number is adjacent to a symbol.
2. "One" pass approach. Build all distinct numbers and add them to a collective sum **if** the number is adjacent to a symbol.
    - This is slightly more performant for sparse graphs since empty spots (`.`) won't need their adjacent cells searched.  This results in overall fewer cells traversed.

For simplicity of reasoning, this article will follow the first two-pass approach, which can be further broken down into distinct functions:
1. Compute the symbol positions
    - I chose to store this in a `Set` for quick & easy lookup times.  There's some wonky OCaml syntax in order to work with the `Set` module, including a custom module `Tup` (for tuples) and functors.  Readers can largely ignore this syntax for the purposes of this solution.
    ```ocaml
    let is_digit = function '0' .. '9' -> true | _ -> false
    let is_symbol = function '0' .. '9' | '.' -> false | _ -> true

    module Tup = struct
        type t = int * int
        let compare = compare
    end

    module TSet = Set.Make (Tup)

    let symbol_positions lines =
        let rec parse_row r c l set =
            match l with
            | [] -> set
            | h :: t ->
                parse_row r (c + 1) t (if is_symbol h then TSet.add (r, c) set else set)
        in
        let rec parse_rows r l set =
            match l with
            | [] -> set
            | h :: t ->
                parse_row r 0 (char_list_of_string h) set |> parse_rows (r + 1) t
        in
        parse_rows 0 lines TSet.empty
    ```

2. Building a number from a "sequence"
    - Working with a `char list`, a key part of the solution is extracting whole numbers (as opposed to digits). As we traverse the list, we keep track of the current "number-in-progress".  If we come across another digit, we know to multiply our current "number-in-progress" by 10 (left shift for base 10) and add the current digit.  Otherwise, we've come to the end of the number.
    - Determining whether we should add this value to our sum or not is simple.  We've already built a `Set` of symbol positions -- we can directly lookup the 8 surrounding positions; if any of them match, we should add the number to the final sum.

    ```ocaml
    let adjs =
        List.fold_left
            (fun acc r -> acc @ List.map (fun c -> (r, c)) [ -1; 0; 1 ])
            [] [ -1; 0; 1 ]

    let adj_to_sym positions r c =
        let rec acc = function
            | [] -> false
            | (dr, dc) :: t -> TSet.mem (r + dr, c + dc) positions || acc t
        in
        acc adjs

    (* [traverse line positions acc should_add sum (r, c)] returns the sum of all numbers in [line] given the current sum [sum] and number in progress [acc]. *)
    let rec traverse line positions acc should_add sum (r, c) =
        match line with
        | [] -> sum + if should_add then acc else 0
        | h :: t -> (
            match digit_opt h with
            | Some d ->
                let is_adj_sym = adj_to_sym positions r c in
                traverse t positions
                    ((acc * 10) + d)
                    (is_adj_sym || should_add) sum
                    (r, c + 1)
            | None ->
                traverse t positions 0 false
                    (sum + if should_add then acc else 0)
                    (r, c + 1))

    let part_one file =
        let lines = file_lines file in
        let positions = symbol_positions lines in
        let row_scores =
            List.mapi
            (fun i line ->
                traverse (char_list_of_string line) positions 0 false 0 (i, 0))
            lines
        in
        sum row_scores
    ```

## Part 2
Part 2's follow-up is an example of how a small change to the prompt _can_ widely change your implementation (although in an ideal world, it wouldn't. My code for today's puzzle isn't elegant).

Instead of finding the sum of all numbers adjacent to any symbol, we care only about those numbers that are adjacent to a **gear**.  A **gear** is defined as a `*` adjacent to _exactly_ 2 numbers.  

My first instinct (which ended up being the path I followed) is to flag all distinct numbers with an ID.  If I can build a mapping from position to number, then the solution would be as simple as finding all `*`'s and searching the adjacent 8 cells for 2 unique numbers.

Implementation wise, this part was very similar to Part 1.  Some more refactoring can be done to clean up the code, but that's for another day 😛.  The new function `num_positions` here maps grid positions `(r,c)` to a tuple representing a unique id per number (used later to determine the count of unique numbers adjacent to a symbol) and the value itself.

```ocaml
let is_star = ( = ) '*'

module TMap = Map.Make (Tup)

(** [num_positions lines] is the mapping from [(r,c)] coordinate to 
    [(id, value)], where [id] is a unique id per number and [value] represents 
    the number itself (which can span multiple coordinate positions. *)
let num_positions lines =
  let rec parse_row line (r, c) mapping positions acc next_id =
    match line with
    | [] ->
        ( List.fold_left
            (fun res tup -> TMap.add tup (next_id, acc) res)
            mapping positions,
          next_id + 1 )
    | h :: t -> (
        match digit_opt h with
        | None ->
            parse_row t
              (r, c + 1)
              (List.fold_left
                 (fun res tup -> TMap.add tup (next_id, acc) res)
                 mapping positions)
              [] 0 (next_id + 1)
        | Some d ->
            parse_row t
              (r, c + 1)
              mapping ((r, c) :: positions)
              ((acc * 10) + d)
              next_id)
  in
  let rec parse_rows lines mapping r next_id =
    match lines with
    | [] -> mapping
    | h :: t ->
        let mapping', next_id' =
          parse_row (char_list_of_string h) (r, 0) mapping [] 0 next_id
        in
        parse_rows t mapping' (r + 1) next_id'
  in
  parse_rows lines TMap.empty 0 0

let get_surrounding_nums (r, c) mappings =
  let rec build l set =
    match l with
    | [] -> set
    | (dr, dc) :: t ->
        build t
          (match TMap.find_opt (r + dr, c + dc) mappings with
          | None -> set
          | Some v -> TSet.add v set)
  in
  build adjs TSet.empty

let rec gear_ratio_for_row row acc mappings (r, c) =
  match row with
  | [] -> acc
  | h :: t ->
      let gear_ratio =
        if is_star h then
          let adj_set = get_surrounding_nums (r, c) mappings in
          if TSet.cardinal adj_set = 2 then
            TSet.fold (fun (_, v) res -> v * res) adj_set 1
          else 0
        else 0
      in
      gear_ratio_for_row t (acc + gear_ratio) mappings (r, c + 1)

let part_two file =
  let lines = file_lines file in
  let mappings = num_positions lines in
  let row_scores =
    List.mapi
      (fun i line ->
        gear_ratio_for_row (char_list_of_string line) 0 mappings (i, 0))
      lines
  in
  sum row_scores
```

Clearly, today's solution was not the cleanest. Each function was heavily parameterized and overall difficult to read (it even took me some time to refamiliarize myself with my own solution).  I'm going to leave this as is for now though: I'd like to keep a record of my old code for AoC solutions and compare them amongst different puzzles / years.
