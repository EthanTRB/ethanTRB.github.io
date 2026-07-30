/*
Name: Ethan Bascombe
File: main.js
Date: 29 July 2026
Description: JavaScript used to generate a random silly story.
*/

// Complete variable definitions and random functions

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings

const storyText =
  "It was 94 Fahrenheit outside, so :insertx: went for a walk. " +
  "When they got to :inserty:, they stared in horror for a few moments, " +
  "then :insertz:. Bob saw the whole thing, but was not surprised — " +
  ":insertx: weighs 300 pounds, and it was a hot day.";

const insertX = [
  "Willy the Goblin",
  "Big Daddy",
  "Father Christmas",
];

const insertY = [
  "the soup kitchen",
  "Disneyland",
  "the White House",
];

const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away",
];

// Return random story string function

function returnRandomStoryString() {
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  let newStory = storyText;

  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  return newStory;
}

// Event listener and generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`;
    const temperature = `${Math.round((94 - 32) * 5 / 9)} centigrade`;

    newStory = newStory.replace("94 Fahrenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}