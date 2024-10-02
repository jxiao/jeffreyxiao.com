+++
title="Day 2: Cube Conundrum"
date=2023-12-02T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/2"
+++

## Part 1

In today's puzzle, we're given a list of games, each with a few different hands.  Each game has an ID, and represents a semicolon-separated list of hands of cubes.  An example of a few games is the following:

```bash
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
```

In Game 1, we are shown three hands (drawn from a bag **with replacement**).  The first hand has 3 blue cubes and 4 red cubes.  The second hand (after replacing the first hand) has 1 red, 2 green, and 6 blue cubes.  The third hand (again, after replacement) only has 2 green cubes.

Our job is to determine which games are possible knowing that bag contains *only 12 red cubes, 13 creen cubes, and 14 blue cubes*.  To simplify the response, we will submit the sum of the valid game IDs.

Looking at this problem and games as a whole, we can see that a game is valid if for all hands, we do not see more than 12 red, 13 green, or 14 blue cubes.  That is, if **any hand** shows **more than** 12 red, 13 green, or 14 blue cubes, we can flag the game as invalid.  Implementation wise, we'll compare the maximum value of each color cube against these constraints.

The logic behind this game is simple -- the annoying part is parsing each line, extracting the relevant values, etc.  We can see that each line follows the structure:

```bash
Game <ID>: <Cube 1, Hand 1>, <Cube 2, Hand 1>, ..., <Cube X, Hand 1>; ...; <Cube 1, Hand Y>, ..., <Cube X, Hand Y>
```

We can utilize the known separators (`:` separating the "title" and "body", `;` separating the hands for a game, and `,` separating the cubes for a hand), `String.split_on_char`, and clever pattern-matching to make our lives a bit more pleasant here.

```ocaml
module SMap = Map.Make (String)

let rec parse_pairings maxes = function
  | [] -> maxes
  | h :: t -> (
      let h = String.trim h in
      match String.split_on_char ' ' h with
      | [ n; color ] ->
          let color = String.trim color in
          let n = String.trim n |> int_of_string in
          let updated =
            SMap.update color
              (fun prev ->
                match prev with None -> Some n | Some m -> Some (max m n))
              maxes
          in
          parse_pairings updated t
      | _ -> Invalid_argument "Invalid format for count+color pair" |> raise)

let rec parse_handfuls maxes = function
  | [] -> maxes
  | h :: t ->
      let h = String.trim h in
      let updated = parse_pairings maxes (String.split_on_char ',' h) in
      parse_handfuls updated t

let parse_line s =
  let split_by_colon = String.split_on_char ':' s in
  let id, games =
    match split_by_colon with
    | [ h1; h2 ] ->
        let i = String.index h1 ' ' + 1 in
        (String.sub h1 i (String.length h1 - i) |> int_of_string, String.trim h2)
    | _ -> Invalid_argument "Incorrect format string." |> raise
  in
  let hands = String.split_on_char ';' games in
  let maxes = parse_handfuls SMap.empty hands in
  (id, maxes)

let part_one file =
  let lines = file_lines file in
  let games = List.map parse_line lines in
  let score =
    List.fold_left
      (fun acc (id, maxes) ->
        match
          ( SMap.find_opt "red" maxes,
            SMap.find_opt "green" maxes,
            SMap.find_opt "blue" maxes )
        with
        | Some r, Some g, Some b ->
            if r <= 12 && g <= 13 && b <= 14 then id + acc else acc
        | _, _, _ -> acc)
      0 games
  in
  score
```

## Part 2

The follow-up here asks us to reconsider each game.  This time, we're asked to find the minimum number of each color cube needed to produce a valid game.  On top of that, we need to calculate the _power_: defined as the product of this minimum set of cubes. 

As is the case with most AoC puzzles, we can cleanly extend/reuse our earlier solution to solve the follow-up.  Since our functions in Part 1 calculated the maximum number of each color cube seen in a hand per game, the "minimal" set to produce a valid game will be comprised of these maximum values.  From this, calculating the product and result is trivial.

```ocaml
let part_two file =
  let lines = file_lines file in
  let games = List.map parse_line lines in
  let find_default k maxes =
    match SMap.find_opt k maxes with Some c -> c | None -> 0
  in
  let score =
    List.fold_left
      (fun acc (_, maxes) ->
        let power =
          find_default "red" maxes * find_default "green" maxes
          * find_default "blue" maxes
        in
        acc + power)
      0 games
  in
  score
```
