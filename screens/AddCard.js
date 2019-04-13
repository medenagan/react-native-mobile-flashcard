import React from "react";
import { connect } from "react-redux";

import styles from "../utils/styles";

import { TextButton } from "../components/TextButton";

import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";

import { requestAddCard } from "../actions";

class DeckOverview extends React.Component {

  static navigationOptions = {
  //  header: null,
    title: "Add Card"
  };

  state = {
    question: "",
    answer: ""
  }

  handleSubmit = () => {
    const { dispatch, navigation } = this.props;
    const { question, answer } = this.state;
    const { key } = navigation.state.params;

    dispatch(requestAddCard({ key, question, answer }));
    this.setState({ question: "", answer: ""});
    navigation.navigate("DeckOverview", {key});
  }

  render() {

    const { question, answer } = this.state;

    const isValidated = !!(question.trim().length && answer.trim().length);

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.deckOverview} behavior="padding" enabled>

        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Your question..."
            value={question}
            onChangeText={(question) => this.setState({question})}
          />

          <TextInput
            style={styles.textInput}
            placeholder="... and answer"
            value={answer}
            onChangeText={(answer) => this.setState({answer})}
          />
        </View>

        {
          (isValidated) ? (
            <TextButton
              style={styles.invert}
              onPress={this.handleSubmit}
              title="Submit :)"
              accessibilityLabel={`Add a new question to the deck`}
            />
          )

          : (
            <TextButton
              onPress={() => null}
              title="Too short to submit :("
              accessibilityLabel={`Type a question and the answer to add new card to the deck`}
            />
          )
        }

        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect()(DeckOverview);
