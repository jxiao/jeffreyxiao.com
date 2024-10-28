+++
title="Day 5: If You Give A Seed A Fertilizer"
date=2023-12-05T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/5"
+++

## Part 1

Not sure why AoC is presenting a gardening problem in the middle of December.  Maybe it's for people like me solving these in the middle of the summer.

Today, our input has plenty of info to parse 😔. The first line contains "seed" identifiers (as `int`s).  Then, we're given a series of mappings from one "prop" (is this the right word?) to another "prop" in a semi-strange manner.  Each line contains 3 numbers: `dest`, `src` and `n` (separated by spaces).  This means that the `n` numbers for the initial prop starting with `src` correspond to the `n` numbers for the target prop starting with `dest`.  Let's run through a concrete example. 

```text
seed-to-soil map:
50 98 2
52 50 48
```

The first line (`seed-to-soil map:`) tells us what we're mapping from and to (in this case, from `seed` to `soil`).  

The next line (`50 98 2`) tells us that the **seed** number `98` corresponds to the **soil** number `50`.  The `2` tells us that this applies to the `2` numbers starting with `98` (inclusive).  Therefore, the **seed** number `99` corresponds to the **soil** number `51`.  

The last line (`52 50 48`) tells us that the **seed** numbers `[50,97]` (inclusive) correspond to the **soil** numbers `[52,99]`.  

Numbers **not** included in these special mappings are unchanged (eg. **seed** number 1 corresponds to **soil** number 1).

The final input has mappings for a sequence of props, with the end goal of finding the minimum **location** (which is a prop) of any of the input seeds.

This problem is actually quite involved with all the moving pieces.  Parsing the input is already a task on its own.  Determining the translations from one prop to another is different beast.  I'll focus on the latter.

One approach is to go through all of the potential translations for a given prop and check to see if it falls within the input range.  If it does, return the appropriate translation.  If it doesn't move on to the next.  If there are no fitting translations, then we know the input value is unchanged across the two props.  This works and is as straightforward as a solution can get.  The downside is that it can be extremely slow if there are a lot of translations, not to mention that we'll have to repeat this entire process for every initial seed.  Obviously, AoC is going to test our solution at scale, so we'll need to find another approach.  Big-O wise, if `n` is the number of input props and `k` is the number of translations, this approach would take `O(nk)` time.

Another approach is to use binary search.  Given a particular input prop number `n`, we can compare that with the "middle" number in our range. If `n` happens to fall within this range, then we've found our translation!  Otherwise, we compare `n` with this current value.  If `n` would appear above this range, then we only need to continue comparing against ranges larger than the current value.  Similarly, if `n` would appear below this range, we should only compare against ranges smaller than the current value.  This approach assumes that our ranges are sorted by input value, but this is a one time cost. Again, big-O wise with the same notation as above, we suffer a one time `O(k*log(k))` cost to sort the translations (by input id) and a `O(n*log(k))` cost to translate all of the input props.

With this implemented, the rest of the problem just requires traversing all through all of the props.  I won't bore you with the thought process behind this, other than stating that the extra code is due to my wish to play around with OCaml's type system, functors, arrays, and user-defined types.

```ocaml
type prop =
  | Initial
  | Seed
  | Soil
  | Fertilizer
  | Water
  | Light
  | Temperature
  | Humidity
  | Location

module Prop = struct
  type t = prop

  let compare = compare
end

module TupleProp = struct
  type t = prop * prop

  let compare (a1, b1) (a2, b2) =
    match compare a1 a2 with 0 -> compare b1 b2 | c -> c
end

module ISet = Set.Make (Int)
module PMap = Map.Make (Prop)
module IMap = Map.Make (Int)
module TPMap = Map.Make (TupleProp)

let next = function
  | Initial -> Seed
  | Seed -> Soil
  | Soil -> Fertilizer
  | Fertilizer -> Water
  | Water -> Light
  | Light -> Temperature
  | Temperature -> Humidity
  | Humidity -> Location
  | Location -> Invalid_argument "No next prop after Location" |> raise

let extract_nums line =
  String.split_on_char ' ' line |> List.filter_map int_of_string_opt

let add_range pmap p source range dest =
  PMap.add p ((source, range, dest) :: PMap.find p pmap) pmap

let rec parse lines pmap curr =
  match lines with
  | [] -> pmap
  | h :: t -> (
      if String.contains h ':' then
        let next_source = next curr in
        parse t (PMap.add next_source [] pmap) next_source
      else
        match String.split_on_char ' ' h with
        | [ dest; source; range ] ->
            parse t
              (add_range pmap curr (int_of_string source) (int_of_string range)
                 (int_of_string dest))
              curr
        | _ -> parse t pmap curr)

let sort_and_make_array =
  PMap.map (fun l -> List.sort compare l |> Array.of_list)

let rec bsearch arr lo hi n =
  if hi < lo then n
  else
    let c_idx = lo + ((hi - lo) / 2) in
    let src, range, dest = arr.(c_idx) in
    if n >= src && n < src + range then dest + (n - src)
    else if n < src then bsearch arr lo (c_idx - 1) n
    else bsearch arr (c_idx + 1) hi n

let rec traverse pmap n p =
  match p with
  | Location -> n
  | _ ->
      let arr = PMap.find p pmap in
      traverse pmap (bsearch arr 0 (Array.length arr - 1) n) (next p)

let part_one file =
  let lines = file_lines file in
  let seeds, pmap =
    match lines with
    | [] -> Invalid_argument "Empty file" |> raise
    | h :: t ->
        (h |> extract_nums, parse t PMap.empty Initial |> sort_and_make_array)
  in
  let locations = List.map (fun seed -> traverse pmap seed Seed) seeds in
  List.fold_left min max_int locations
```

## Part 2

Conceptually, Part 1 is straightforward enough (after some time thinking, of course).  To make things harder (and if you haven't yet gotten sick of all the ranges), the initial seed line is actually itself a range! Instead of every number being an individual seed, each pair of numbers describes a range of seed values.

Now, `seeds: 79 14 55 13` describes two ranges of seeds: `[79,92]` and `[55,67]` (inclusive).  The goal remains the same: to find the lowest location of any of the seed values.

Via brute force, we _could_ solve this by running Part 1's algorithm over all values in our range.  The only(?) thing wrong with that is the speed.  Our ranges will likely have thousands of values, and Part 1's algorithm will be too slow for our purposes.

However, the "idea" behind Part 1 can still be applied.  That is, we can still take advantage of the ordering of translations to help us move seeds through the pipeline.  Now, instead of moving individual seeds through the pipeline one by one, we can generate ranges and move ranges through the pipeline.

This requires a bit more thinking to properly segment the translations by ranges.  Let `[c_lo, c_hi]` be the lower and upper bounds of the "current" candidate range (the center of our binary search range), while `[r_lo,r_hi]` corresponds to the bounds that we're looking to translate.  Assuming that `r_lo <= r_hi` and `c_lo <= c_hi`, by following the concept of pattern matching, we can partition the possible range translations into **4** scenarios:

1. **`[r_lo,r_hi] < [c_lo,c_hi]`**: In words, this means that the range we're looking to translate is entirely outside of our current boundaries.  Specifically, our desired range (if it exists) is less than the current boundary.  In this case, we only need to recurse on the ranges smaller than our current one (ie. the left).

2. **`[r_lo,r_hi] > [c_lo,c_hi]`**: The opposite of the scenario above.  Our desired range is larger than the current boundary; we should only need to recurse on the ranges larger than our current one in order to find the appropriate translation (if it exists).

3. **`c_lo <= r_lo <= r_hi <= c_hi`**: Here, our desired range `[r_lo,r_hi]` is entirely captured within the current boundaries `[c_lo,c_hi]`. This is good news! We have our translation (with some basic arithmetic)!

4. **∃ some overlap**: This final case seems the trickiest, but let's break it down into a few simpler forms.  We know now that there must be _some_ amount of overlap between `[c_lo, c_hi]` and `[r_lo, r_hi]`.  At the same time, we also know that there must be _some_ parts of either range that don't overlap.  We can partition these into 3 categories:

&emsp;&emsp;&emsp;&emsp;A. The overlapping section.  The overlapping input range must start with the larger of the two `*_lo` boundaries and end with the smaller of the two `*_hi` ranges.  We can directly translate everything between this new range as we did in case 3 above.

&emsp;&emsp;&emsp;&emsp;B. The non-overlapping range less than the overlapping section. If you picture a number line and the ranges as bolded line segments, this case would fall to the left of the overlapping section above.  

&emsp;&emsp;&emsp;&emsp;C. The non-overlapping range larger than the overlapping section. Analogous to the case above, just on the right hand side.

Enumerating these cases helps in seeing the bigger picture.  The situation at hand seems complicated at first, but is relatively easily broken down into smaller subcases, with each subcase being relatively straightforward to understand.  And although there may be shorter solutions, I find readability to be king for these puzzles (and on AoC sized inputs).

```ocaml
let extract_ranges line =
  let rec pairs acc l =
    match l with
    | i :: r :: t -> pairs ((i, i + r - 1) :: acc) t
    | _ -> List.rev acc
  in
  pairs [] (extract_nums line)

let rec bs_ranges arr (r_lo, r_hi) (i_lo, i_hi) =
  if r_lo > r_hi then []
  else if i_hi < i_lo then [ (r_lo, r_hi) ]
  else
    let c_idx = i_lo + ((i_hi - i_lo) / 2) in
    let src, range, dest = arr.(c_idx) in
    let c_lo, c_hi = (src, src + range - 1) in
    if r_hi < c_lo then bs_ranges arr (r_lo, r_hi) (i_lo, c_idx - 1)
    else if r_lo > c_hi then bs_ranges arr (r_lo, r_hi) (c_idx + 1, i_hi)
    else if c_lo <= r_lo && r_hi <= c_hi then
      let offset = dest - src in
      [ (r_lo + offset, r_hi + offset) ]
    else
      let left = bs_ranges arr (r_lo, c_lo - 1) (i_lo, c_idx - 1) in
      let right = bs_ranges arr (c_hi + 1, r_hi) (c_idx + 1, i_hi) in
      let offset = dest - src in
      let mid = [ (max c_lo r_lo + offset, min c_hi r_hi + offset) ] in
      left @ mid @ right

let rec traverse' pmap l p =
  match p with
  | Location -> l
  | _ ->
      let arr = PMap.find p pmap in
      let pass =
        List.fold_left
          (fun acc t ->
            let res = bs_ranges arr t (0, Array.length arr - 1) in
            acc @ res)
          [] l
      in
      traverse' pmap pass (next p)

let part_two file =
  let lines = file_lines file in
  let seed_ranges, pmap =
    match lines with
    | [] -> Invalid_argument "Empty file" |> raise
    | h :: t ->
        (h |> extract_ranges, parse t PMap.empty Initial |> sort_and_make_array)
  in
  let ranges = traverse' pmap seed_ranges Seed in

  List.fold_left (fun acc (m, _) -> min acc m) max_int ranges
```
