import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "../utils/styles";

function DeckCount({ deck }) {
  if (! deck.questions.length) {
    return <Text style={[styles.deckCount, styles.deckCountZero]}>No cards yet</Text>;
  }

  else if (deck.questions.length === 1) {
    return <Text style={styles.deckCount}>Only one card</Text>;
  }

  else {
    return <Text style={styles.deckCount}>{deck.questions.length} cards</Text>;
  }
}

function DeckTitle({ deck }) {
  return <Text style={styles.deckTitle}>{deck.title}</Text>;
}

export function DeckInfo({ deck }) {
  return (
    <View style={styles.deckInfo}>
      <View style={styles.horizontalContainer}>
        <DeckTitle deck={deck} />
      </View>
      <View style={styles.horizontalContainer}>
        <DeckCount deck={deck} />
      </View>
    </View>
  );
}
