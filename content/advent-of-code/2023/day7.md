+++
title="Day 7: Camel Cards"
date=2023-12-07T00:00:00-05:00
draft=false
toc=false
tags=["aoc", "ocaml", "dev"]
layout="aoc"
puzzle="https://adventofcode.com/2023/day/7"
+++

Peek the title! 

Once again, we're back to our gambling ways.  Today, we're playing a game similar to poker called `Camel Cards`.  The rules are pretty simple: you're dealt a hand of 5 cards, where each card is labeled with a number (or face) `2` through `A` (low to high).  Each hand matches exactly one of the following types:

1. **Five of a kind**: all 5 cards have the same label
2. **Four of a kind**: 4 cards have the same label, and 1 card is different
3. **Full house**: 3 cards have the same label, and the remaining 2 share a different label
4. **Three of a kind**: 3 cards have the same label, and the remaining 2 each have a distinct label
4. **Two pair**: two cards share one label, while the remaining card has a third label
5. **One pair**: two cards share one label, and the other three cards each have a distinct label
6. **High card**: all cards have distinct labels

Since the title of this puzzle is so relevant to camels, we'll make use of some of OCaml's extensive core features like user-defined types, pattern matching, and function compositions.
<!-- 
Start by explaining the user defined types, inherent ordering of the types, etc.

Then explain how we can (without recursion) break down the result of each hand using a few if statements and clever ordering. -->