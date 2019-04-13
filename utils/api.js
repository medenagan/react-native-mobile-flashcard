import { AsyncStorage } from "react-native";
import { validateCardsInDeck } from "../utils/helper";

const DECKS_STORAGE_KEY = "UdaciCards:decks";
const REMINDER_STORAGE_KEY = "UdaciCards:reminder";

export function getDecks() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(raw => resolve(JSON.parse(raw)))
  });
}

export function saveDeck(deck) {
  return new Promise((resolve, reject) => {
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [deck.key]: deck
    })).then(_=> resolve());
  });
}

export function deleteDeck({ key }) {
  return getDecks().then(decks => {
    delete decks[key];
    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function appendDeckCards({ key, cards }) {
  return getDecks().then(decks => {
    const deck = decks[key];

    if (! deck || typeof deck !== "object") {
      throw Error("Inconsistent deck on database");
    }

    deck.questions = validateCardsInDeck(deck.questions)
      .concat(validateCardsInDeck(cards));

    return saveDeck(deck);
  });
}


export function _debugResetDecks() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(DECKS_STORAGE_KEY).then(_=> resolve());
  });
}

export const getReminderStatus = () => AsyncStorage
  .getItem(REMINDER_STORAGE_KEY)
  .then(raw => JSON.parse(raw));

export const setReminderStatus = (value) => AsyncStorage
  .setItem(REMINDER_STORAGE_KEY, JSON.stringify(value));
