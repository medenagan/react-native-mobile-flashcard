import { GET_DECKS_SUCCESS, ADD_CARD_SUCCESS, ADD_DECK_SUCCESS } from "../actions";

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

      case ADD_DECK_SUCCESS:
        return {
          ...decks,
          [action.deck.key]: action.deck
        }

    default:
      return decks;
  }
}
