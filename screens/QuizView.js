import React from "react";
import { connect } from "react-redux";

import styles from "../utils/styles";

import { TextButton } from "../components/TextButton";

import { View, Text } from "react-native";

import { unscheduleReminder, scheduleReminder } from "../utils/reminder";

class QuizView extends React.Component {

  static navigationOptions = {
  //  header: null,
    title: "Quiz"
  };

  state = {
    currentIndex: 0,
    currentModeIsAnswer: false,
    wrongCount: 0
  }

  handleStartOver = () => this.setState({
    currentIndex: 0,
    currentModeIsAnswer: false,
    wrongCount: 0
  });

  handleShowAnswer = () => this.setState({ currentModeIsAnswer: true });

  handleCorrect = () => this.setState(
    ({ currentIndex }) => ({
      currentModeIsAnswer: false,
      currentIndex: currentIndex + 1
    })
  );

  handleWrong = () => this.setState(
    ({ currentIndex, wrongCount }) => ({
      currentModeIsAnswer: false,
      currentIndex: currentIndex + 1,
      wrongCount: wrongCount + 1
    })
  );

  render() {
    const { decks, navigation } = this.props;
    const { key } = navigation.state.params;
    const deck = decks[key];

    if (! deck) return null;

    const { questions } = deck;
    const { currentIndex, currentModeIsAnswer } = this.state;

    // No questions to show
    if (! questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Sorry, there are no cards in this deck</Text>
        </View>
      );
    }

    // The quiz is over
    if (currentIndex >= questions.length) {
      const { wrongCount } = this.state;
      const correctCount = questions.length - wrongCount;
      const percentage = Math.round(correctCount / questions.length * 100);

      unscheduleReminder().then(_=> scheduleReminder());

      return (
        <View style={styles.container}>
          {
            <Text style={styles.text}>{
              [
                "Try again!",
                "Not bad!",
                "Pretty good!",
                "Remarkable!",
                "Excellent!"
              ][Math.floor(percentage / 100 * 4)]
            }</Text>
          }

          <Text style={[styles.text, {fontSize: 50, color: "lightblue", fontWeight: "bold"}]}>{percentage}%</Text>
          <Text style={[styles.text, {color: "green"}]}>{correctCount} correct</Text>
          <Text style={[styles.text, {color: "red"}]}>{wrongCount} wrong</Text>

            <View style={styles.deckOverviewButtons}>
              <TextButton
                style={styles.invert}
                onPress={this.handleStartOver}
                title="Start over"
                accessibilityLabel={`Press if you want to start this quiz again`}
              />
              <TextButton
                onPress={ e => navigation.navigate("DeckOverview", { key }) }
                title="Back to the Deck"
                accessibilityLabel={`Press if you want to go back to the back details`}
              />
            </View>
        </View>
      );
    }

    // Front / Back card
    const {question, answer} = questions[currentIndex];
    return (
      <View style={styles.container}>
        <View style={styles.deckOverview}>

            <Text style={styles.deckCount}>{currentIndex + 1}/{questions.length}</Text>

            { currentModeIsAnswer || <Text style={styles.questionText}>{question}</Text> }
            { currentModeIsAnswer && <Text style={styles.answerText}>{answer}</Text> }

            { currentModeIsAnswer
              ? (
                <View style={styles.deckOverviewButtons}>
                  <TextButton
                    style={styles.correctButton}
                    onPress={this.handleCorrect}
                    title="Correct"
                    accessibilityLabel={`Press if your answer was correct`}
                  />
                  <TextButton
                    style={styles.wrongButton}
                    onPress={this.handleWrong}
                    title="Wrong"
                    accessibilityLabel={`Press if your answer was wrong`}
                  />
                </View>
              )
              : (
                <View style={styles.deckOverviewButtons}>
                  <TextButton
                    style={styles.invert}
                    onPress={this.handleShowAnswer}
                    title="Show Answer"
                    accessibilityLabel={`Show the answer to this question`}
                  />
                </View>
              )
            }
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

export default connect(mapStateToProps)(QuizView);
