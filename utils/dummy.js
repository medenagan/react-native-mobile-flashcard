import { generateRandomKey } from "./helper";

export const pickRandomValue = (...values) => values[Math.random() * values.length | 0];

export const getRandomInt = (max = 10, min = 0) => min + Math.floor(Math.random() * (max - min));

export const mapRandomArray = (max, fnMapper = (x) => x) => new Array(getRandomInt(max, max >> 1)).fill().map(fnMapper);

export const createDummyDeck = () => ({
  key: generateRandomKey(),
  timestamp: Date.now(),
  title: pickRandomValue("Red", "Blue", "Green", "Pink", "Yellow"),
  questions: mapRandomArray(7, () => {
    return {
      question: (
        "Is "
        + pickRandomValue("Paris", "New York", "London", "Barcelona", "Berlin", "Toronto", "Milan", "Los Angeles", "Tokyo")
        + " located in " + pickRandomValue("USA", "UK", "France", "Germany", "Italy", "Japan", "Cananda", "Spain")
      ),
      answer: pickRandomValue("Yes", "No", "Sure", "Maybe", "Guess so")
    };
  })
});
