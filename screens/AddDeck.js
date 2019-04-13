import React from "react";
import { connect } from "react-redux";

import styles from "../utils/styles";

import { TextButton } from "../components/TextButton";

import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

import { requestAddDeck } from "../actions";

import { decksCollectionToArray } from "../utils/helper";

class AddDeck extends React.Component {

  static navigationOptions = {
    title: "Add Deck"
  };

  state = {
    title: ""
  }

  handleSubmit = () => {
    const { dispatch, navigation } = this.props;
    const title = this.state.title.trim() || `${(new Date).toLocaleString()}`;

    dispatch(requestAddDeck({ title }));
    this.setState({ title: ""});
    navigation.navigate("DeckOverview", { key: null} );
  }

  render() {

    const { titles } = this.props;
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.deckOverview} behavior="position" enabled>


          <Text
            style={[styles.text, {color: "lightblue", fontSize: 40}]}
          >
            Choose a title for this new deck
          </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Title"
              value={title}
              onChangeText={(title) => this.setState({title})}
            />

            <Text style={[styles.text, {color: "red"}]}>
              {
                titles.includes(title.toLowerCase())
                  ? "Please note this title already exists. Are you sure?"
                  : " "
              }
            </Text>

            <TextButton
              style={styles.invert}
              onPress={this.handleSubmit}
              title="Create"
              accessibilityLabel={`Click to append this deck to your collection`}
            />


        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    titles: decksCollectionToArray(decks).map(deck => deck.title.toLowerCase())
  }
};

export default connect(mapStateToProps)(AddDeck);
