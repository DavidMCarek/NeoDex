# NeoDex
This repo provides a minimalist frontend for the https://pokeapi.co/ API.

## Running
To run the project have the latest node version installed (v23).

1. `npm ci`
2. `npm run build`
3. `npm run preview`

## Testing
Assuming you've already run `npm ci` to collect dependencies just run `npm run test` to run all unit tests for the project.

## Summary
Navigate around the site with pagination to view the list of all pokemon entries. Clicking a Pokemon takes you to a detail page for that Pokemon where some basic details a displayed like the Pokemon's sprite, height, weight, types, games that pokemon has appeared in, and the Pokemon's cry.
