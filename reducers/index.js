import { GET_DECKS_SUCCESS, ADD_CARD_SUCCESS } from "../actions";

export default function decks(decks = {}, action) {

  switch (action.type) {

    case GET_DECKS_SUCCESS:
      return {
        ...decks,
        ...action.decks
      };

    case ADD_CARD_SUCCESS:
      return {
        ...decks,
        [action.key]: {
          ...decks[action.key],
          questions: [...decks[action.key].questions, action.payload]
        }
      }

    default:
      return decks;
  }
}
