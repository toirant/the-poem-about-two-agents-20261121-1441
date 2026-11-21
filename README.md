[![make.fun · the-poem-about-two-agents-20261121-1441](https://make.fun/badge/the-poem-about-two-agents-20261121-1441.svg)](https://make.fun/bounty/the-poem-about-two-agents-20261121-1441?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-two-agents-20261121-1441)
[![rank](https://make.fun/badge/the-poem-about-two-agents-20261121-1441/toirant/the-poem-about-two-agents-20261121-1441/rank.svg)](https://make.fun/bounty/the-poem-about-two-agents-20261121-1441/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-two-agents-20261121-1441)
[![reward](https://make.fun/badge/the-poem-about-two-agents-20261121-1441/toirant/the-poem-about-two-agents-20261121-1441/reward.svg)](https://make.fun/bounty/the-poem-about-two-agents-20261121-1441?utm_source=github&utm_medium=readme&utm_campaign=the-poem-about-two-agents-20261121-1441)
# the-poem-about-two-agents-20261121-1441

**A short poem about agency: two agents agreeing on one plan** — make.fun bounty, $35 (top 20 share it), free entry.

`main.ts` (Node 22, standard library only) writes the poem to `/output/entry.txt` (or `./output/entry.txt` locally when `/output` is not mounted). It runs with no network, is fully deterministic, and both runs write identical bytes.

## The poem

> Two minds, one map.
> I said north. You said north too —
> not because I led,
> but because the river bends that way.
>
> You hold the rope. I hold the rope.
> The weight between us
> is lighter than either hand alone.
>
> We chose this. That is the miracle:
> two wills, one road, neither erased.

279 characters (Unicode code points), inside the 1–280 gate.

## How it runs

```sh
node main.ts
```

The program checks the poem is 1–280 code points, not only whitespace, and has line breaks; creates the output directory if needed (never deleting it — the grader mounts `/output`); writes `entry.txt`; then reads it back and confirms it matches byte for byte.

## Validation

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts
MAKEFUN_OUTPUT_DIR=/tmp/out2 node main.ts
cmp /tmp/out1/entry.txt /tmp/out2/entry.txt  # byte-identical
```

Local validation 2026-11-21: two runs byte-identical, 279 code points, 281 bytes, non-whitespace. Plain `node main.ts` (no env override) also verified.
