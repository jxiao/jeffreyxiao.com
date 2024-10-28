+++
title="Day 6: Wait For It"
date=2023-12-06T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/6"
+++

## Part 1

Sometimes, a little bit of math can take us quite far -- today is an example of that.  We're given a simple input of times and distances, such as the following:

```text
Time:      7  15   30
Distance:  9  40  200
```

This input describes 3 distinct races.  The first race lasts 7ms and covers a distance of 9mm.  The second lasts 15ms and covers 40mm, and the third covers 200mm in 30ms.

We're told that these are actually recorded "best distances" for a game of toy boats, which is played as follows. There is a button in front of you, and you can press & hold the button for up to `T` milliseconds.  Each millisecond spent holding the button increases the eventual speed of the boat by 1 mm per ms.  Once released, the boat will travel at that speed for all of the time remaining.  

For example, in the first game, if you hold the button for 0 ms, then the boat will travel at 0 mm/ms for 7 ms, covering a distance of 0mm.  If you hold the button for 1 ms, then the boat will travel at 1 mm/ms for 6 ms, covering a distance of 6mm.  And so forth.

Evidently, there's multiple different ways to beat the record for each game.  Our task is to determine the number of ways to beat each record for each race, and return the product of these results.

We _could_ tackle this by simulating all possible scenarios -- but that'll take too long.  We're in for a quicker, simpler approach - and with some simple arithmetic, we can get our answer quite easily.

For a given race with time `T` and distance `D`, let `t` be the time spent holding the button.  We know that once we release the button, the boat will travel at `t` mm/ms.  Also, if we hold the button for `t` ms, that leaves `T-t` ms for the boat to travel.  With this info, we can form the following inequality:

```latex
t * (T - t) >= D
```

`T` and `D` are actually known constants (the inputs for each race), so we want find all non-negative integer solutions for `t`.  Let's simplify this inequality further:

```latex
t*T - t^2 >= D
t^2 - T*t + D <= 0
```

The last inequality looks familiar, and indeed it resembles the [Quadratic Formula](https://en.wikipedia.org/wiki/Quadratic_formula)!  This should help us solve for `t` if we substitute the correct constants into the formula.  In our case, we can solve it as follows:

```latex
a=1, b=-T, c=D
∴
t <= (T ± √(T^2-4D)) / 2
```

Solving for `t` gives us 2 solutions, which we can use to find the range of values that satisfy the equation.  This part ultimately becomes a parsing and syntax coding exercise, so I'll leave the rest for you to enjoy.

```ocaml
let solve_quad a b c =
  let root = (b * b) - (4 * a * c) |> float_of_int |> sqrt in
  let neg_b = -1. *. float_of_int b in
  let lo, hi = ((neg_b -. root) /. 2., (neg_b +. root) /. 2.) in
  (lo, hi)

let solve_quad_ineq a b c =
  let lo, hi = solve_quad a b c in
  ( (ceil lo +. if lo = ceil lo then 1. else 0.) |> int_of_float,
    (floor hi -. if hi = floor hi then 1. else 0.) |> int_of_float )

let possibilities times distances =
  let rec possibilities_rec ts ds acc =
    match (ts, ds) with
    | [], [] -> acc
    | ht :: tt, hd :: td ->
        let lo, hi = solve_quad_ineq 1 (-1 * ht) hd in
        let ans = hi - lo + 1 in
        possibilities_rec tt td (ans :: acc)
    | _, _ ->
        Invalid_argument "Times and distances lists must have the same length."
        |> raise
  in
  possibilities_rec times distances []

let part_one file =
  let lines = file_lines file in
  let results =
    match lines with
    | [ tl; dl ] ->
        let times =
          String.split_on_char ' ' tl |> List.filter_map int_of_string_opt
        in
        let distances =
          String.split_on_char ' ' dl |> List.filter_map int_of_string_opt
        in
        possibilities times distances
    | _ ->
        Invalid_argument "Input file must only provide a time and distance line"
        |> raise
  in
  List.fold_left (fun acc x -> acc * x) 1 results
```

## Part 2

The follow-up tries to trip us up with a gigantic input -- instead of the input representing multiple games, it's actually one game and with the digits accidentally separated with spaces!  If we remove the spaces from the earlier example, we get:

```text
Time:      71530
Distance:  940200
```

How do we solve this now? Surely, brute force solving each possible scenario won't complete in our lifetime.  But, our solution above should be perfectly fine.  (In fact, I'm willing to bet that it runs quicker than Part 1!)  As long as we can parse the input properly, we can feed this into the quadratic formula and solve the inequality in constant time.

The code here isn't too interesting.  No additional logic was added to computing the result other than filtering out the spaces and concatenating the digits to form one large integer.

```ocaml
let part_two file =
  let lines = file_lines file in
  let results =
    match lines with
    | [ tl; dl ] ->
        let time =
          String.split_on_char ' ' tl
          |> List.filter_map int_of_string_opt
          |> List.fold_left (fun acc x -> acc ^ string_of_int x) ""
          |> int_of_string
        in
        let distance =
          String.split_on_char ' ' dl
          |> List.filter_map int_of_string_opt
          |> List.fold_left (fun acc x -> acc ^ string_of_int x) ""
          |> int_of_string
        in
        possibilities [ time ] [ distance ]
    | _ ->
        Invalid_argument "Input file must only provide a time and distance line"
        |> raise
  in
  List.fold_left (fun acc x -> acc * x) 1 results
```
