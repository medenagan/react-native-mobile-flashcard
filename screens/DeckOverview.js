import React from "react";
import { connect } from "react-redux";

import styles from "../utils/styles";

import { DeckInfo } from "../components/DeckInfo";
import { TextButton } from "../components/TextButton";

import { View, Text, TouchableOpacity, Alert } from "react-native";

import { findLatestDeck } from "../utils/helper";

import { requestDeleteDeck } from "../actions"

class DeckOverview extends React.Component {

  static navigationOptions = {
  //  header: null,
    title: "Deck Details"
  };

  handleAddCard = (key) => this.props.navigation.push("AddCard", {key});

  handleStartQuiz = (key) => this.props.navigation.push("QuizView", {key});

  handleDelete = (deck) => {
    Alert.alert("Delete Deck", `'${deck.title}' will NOT be recoverable`, [
      {
        text: "Keep",
        style: "cancel"
      }, {
        text: "Sweep",
        onPress: () => {
          const { dispatch, navigation } = this.props;
          dispatch(requestDeleteDeck({ key: deck.key }));
          navigation.navigate("DeckListView");
        }
      }
    ]);
  }


  render() {
    const { decks, navigation } = this.props;
    const { key } = navigation.state.params;

    // Can either show a specific deck or the latest one created
    const deck = key ? decks[key] : findLatestDeck(decks);

    if (! deck) return null;

    return (
      <View style={styles.container}>
        <View style={styles.deckOverview}>

          <DeckInfo deck={deck} />

          <View style={styles.deckOverviewButtons}>
            <TextButton
              onPress={() => this.handleAddCard(deck.key)}
              title="Add Card"
              accessibilityLabel={`Add a new card to the deck ${deck.title}`}
            />
            <TextButton
              style={styles.invert}
              onPress={() => this.handleStartQuiz(deck.key)}
              title="Start Quiz"
              accessibilityLabel={`Start the quiz for the deck ${deck.title}`}
            />
            <TouchableOpacity
              onPress={() => this.handleDelete(deck)}
            >
              <Text style={[styles.text, {color: "red"}]}>Delete this deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
};

export default connect(mapStateToProps)(DeckOverview);
