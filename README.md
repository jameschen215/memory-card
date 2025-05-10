# Project: Memory Card

## Assignment

1. Create a new React Project.

2. Take some time to think about the features you want to implement, which components you need, how to structure your application, and how to get the images from an API. Your application should include a scoreboard, which counts the current score, and a “Best Score”, which shows the highest score you’ve achieved thus far. There should be a function that displays the cards in a random order anytime a user clicks one. Be sure to invoke that function when the component mounts.

3. You also need a handful of cards that display images and possibly informational text. These images and texts need to be fetched from an external API. You can use anything from [Giphy](https://giphy.com/) to a [Pokemon API](https://pokeapi.co/).

4. Now that you’ve thought about the structure of your application, set up the folder structure and start creating the components.

5. Style your application so you can show it off!
   As always, push the project to GitHub, and don’t forget to deploy it.

## TODO:

- Change favicon ✓
- Reset - scores and cards
- Game info button
- Responsive layout

## What I've learned from the project

### Stable key Props in React

When using dynamic content in a list of components (like cards), it's important to provide stable key props. If you use something like a random ID from an API that changes every time, React will treat each component as new on every render. This causes animations, transitions, and component state to reset unexpectedly.

To avoid this, use:

A stable identifier that doesn't change between renders (e.g. a consistent ID from your dataset),

Or the array index if the order of elements is fixed and doesn’t change dynamically.

This ensures React can properly reuse components and preserve their state and animation transitions.

See code in `cards.tsx` and `card.tsx`.
