export const decksCollectionToArray = decks => Object.keys(decks).map(key => {
  return {
    key,
    ...decks[key]
  };
});

export const findLatestDeck = decks => {
  const decksArray = decksCollectionToArray(decks);
  return decksArray.length && decksArray
    .reduce((acc, el) => (el.timestamp > acc.timestamp) ? el : acc)
};
