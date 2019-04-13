import { AsyncStorage } from "react-native";

export const GET_DECKS_SUCCESS = "GET_DECKS_SUCCESS";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";
export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";
export const DELETE_DECK_SUCCESS = "DELETE_DECK_SUCCESS";

const DECKS_STORAGE_KEY = "UdaciCards:decks"

function getDecksSuccess(decks) {
  return {
    type: GET_DECKS_SUCCESS,
    decks
  }
}

export function requestInitialData() {
  return function (despatch) {

    const obj = {};

    (new Array(0)).fill().forEach((_, index) => (
      Object.assign(obj, {

        ["_" + index]: {
          key: "_" + index,
          timestamp: Date.now(),
          title: "title " + index,
          questions: (new Array(Math.random() * 10 | 0 )).fill().map((_, index) => {
            return {
              question: index + '_What is React?',
              answer: index + '_A library for managing user interfaces'
            };
          })
        }


      })
    ));


    despatch(getDecksSuccess(
      obj
    ));

    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(raw => console.log("AsyncDecks:", raw));
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
    dispatch(addCardSuccess({ key, question, answer }));
  }
}

export function addDeckSuccess({ deck }) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  };
}

export function requestAddDeck({ title }) {
  return function (dispatch) {
    const key = Math.random().toString(36) + title + Date.now().toString(36);
    const deck = {
      key,
      timestamp: Date.now(),
      title: String(title),
      questions: []
    }
    dispatch(addDeckSuccess({ deck }));
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
    dispatch(deleteDeckSuccess({ key }));
  }
}
