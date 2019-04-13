import { getDecks, saveDeck, deleteDeck, appendDeckCards } from "../utils/api";
import { createDummyDeck } from "../utils/dummy";
import { generateRandomKey, validateCardsInDeck } from "../utils/helper";

export const GET_DECKS_SUCCESS = "GET_DECKS_SUCCESS";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";
export const DELETE_DECK_SUCCESS = "DELETE_DECK_SUCCESS";

function getDecksSuccess(decks) {
  return {
    type: GET_DECKS_SUCCESS,
    decks
  }
}

export function requestGetDecks() {
  return function(dispatch) {
    getDecks().then(decks => {
      // First time: create one starter deck
      if (! decks) {
        dispatch(requestAddDeck(createDummyDeck()));
      }
      else {
        dispatch(getDecksSuccess(decks));
      }
    }).catch(e => console.warn("Could not load decks:", e));
  }
}


export function addCardSuccess({ key, question, answer }) {
  return {
    type: ADD_CARD_SUCCESS,
    key,
    payload: {
      question,
      answer
    }
  };
}

export function requestAddCard({ key, question, answer }) {
  return function (dispatch) {
    appendDeckCards({ key, cards: [{ question, answer }] })
      .then(_=> dispatch(addCardSuccess({ key, question, answer })))
      .catch(e => console.warn("Could not append this card:", e));
  }
}

export function addDeckSuccess({ deck }) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  };
}

export function requestAddDeck({ title, questions }) {
  return function (dispatch) {
    const key = key || generateRandomKey(title);
    const deck = {
      key,
      timestamp: Date.now(),
      title: String(title || "Untitled"),
      questions: validateCardsInDeck(questions)
    }
    saveDeck(deck)
      .then(_=> dispatch(addDeckSuccess({ deck })))
      .catch(e => console.warn("Could not add this deck:", e));
  }
}


export function deleteDeckSuccess({ key }) {
  return {
    type: DELETE_DECK_SUCCESS,
    key
  };
}

export function requestDeleteDeck({ key }) {
  return function (dispatch) {
    deleteDeck({ key })
      .then(_=> dispatch(deleteDeckSuccess({ key })))
      .catch(e => console.warn("Could not delete this deck:", e));
  }
}
