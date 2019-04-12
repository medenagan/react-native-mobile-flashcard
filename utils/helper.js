export const decksCollectionToArray = decks => Object.keys(decks).map(key => {
  return {
    key,
    ...decks[key]
  };
});
