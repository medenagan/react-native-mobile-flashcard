import { GET_DECKS_SUCCESS } from "../actions";

export default function decks(decks = {}, action) {
  switch (action.type) {
    case GET_DECKS_SUCCESS:
      return {
        ...decks,
        ...action.decks
      };
    default:
      return decks;
  }
}
