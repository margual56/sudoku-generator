# Sudoku generator
Check the <a href="https://margual56.github.io/sudoku-generator" target="_blank">live version</a>

## Description
A simple website to generate sudokus, with the ability to instantlt check the solution or correct the individual cell values.

You might think "wow, I can cheat easily with the instant correction feature". Well, cheat if that's what you want but... That's not what this is about. Use the page to generate a sudoku, then try to solve it on paper. If you feel stuck, use the instant correction feature to unstuck yourself. 

## How it works
This project uses a naive approach (brute-force) to generate a random Sudoku. Then, it removes a certain amount of numbers from the solution and displays the removed values as `textarea` that you can fill.

The minimum number of pre-filled cells for any given Sudoku is 17. Less than that and there would be more than one possible solutions (which makes it practically impossible to solve).

## Upcoming features
- [ ] Difficulty selector
- [x] ~~Responsiveness (fit into a mobile screen)~~
- [ ] Toggle switch to hide/show "Right/Wrong" input values
