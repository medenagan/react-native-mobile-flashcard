import { AsyncStorage } from "react-native";

export const GET_DECKS_SUCCESS = "GET_DECKS_SUCCESS";
export const ADD_CARD_SUCCESS = "ADD_CARD_SUCCESS";


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

    (new Array(5)).fill().forEach((_, index) => (
      Object.assign(obj, {

        ["_" + index]: {
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
