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

export const generateRandomKey = (base = Math.random().toString(36)) =>
  Math.random().toString(36) + base + Date.now().toString(36);

export const validateCardsInDeck = (cards) => Array.isArray(cards)
  ? cards.filter(card =>
    (typeof card.question === "string") && (typeof card.answer === "string")
  )
  : [];
