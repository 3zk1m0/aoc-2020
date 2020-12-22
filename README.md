
# Advent of Code 2020 TS

## Intro

This repo contains zero-setup environment for [Advent of Code](https://adventofcode.com/2020) challenges, with:
- automatic creation of a challenge template,
- automatic execution of a challenge code (with reloads),
- quick utils for testing and reading input from a file.

 
## Installation

Clone the repo and go to the created folder:
```
git clone https://github.com/caderek/aoc-starter-ts.git aoc2020
```
```
cd aoc2019
```
Using NPM:
```
npm i
```
Using Yarn:
```
yarn
```


## Running dev mode

```
npm start day<N>
```
or
```
yarn start day<N>
```
Example:
```
yarn start day1
```
If the day folder does not exist, it will be created from template.

## Running timing mode

This runs all tests and gets total time of execution. 

```
npm run time
```
or
```
yarn time
```

## Languages used:

- TypeScript
- JavaScript