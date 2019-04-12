import React from "react";
import { connect } from "react-redux";

import styles from "../utils/styles";

import { DeckInfo } from "../components/DeckInfo";
import { TextButton } from "../components/TextButton";

import { View } from 'react-native';

import { decksCollectionToArray } from "../utils/helper";

class DeckOverview extends React.Component {

  static navigationOptions = {
  //  header: null,
    title: "Deck Details"
  };

  handleAddCard = (key) => this.props.navigation.push("AddCard", {key});

  handleStartQuiz = (key) => this.props.navigation.push("QuizView", {key});


  render() {
    const { decks, navigation } = this.props;
    const { key } = navigation.state.params;
    const deck = decks[key];

    if (! deck) return null;

    return (
      <View style={styles.container}>
        <View style={styles.deckOverview}>

          <DeckInfo deck={deck} />

          <View style={styles.deckOverviewButtons}>
            <TextButton
              onPress={() => this.handleAddCard(key)}
              title="Add Card"
              accessibilityLabel={`Add a new card to the deck ${deck.title}`}
            />
            <TextButton
              style={styles.invert}
              onPress={() => this.handleStartQuiz(key)}
              title="Start Quiz"
              accessibilityLabel={`Start the quiz for the deck ${deck.title}`}
            />
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
