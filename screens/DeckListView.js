import React from "react";
import { connect } from "react-redux";
import styles from "../utils/styles";

import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import { decksCollectionToArray } from "../utils/helper";

import { DeckInfo } from "../components/DeckInfo";

class DeckListView extends React.Component {

  static navigationOptions = {
  //  header: null,
    title: "Decks"
  };

  showDeck = (key) => this.props.navigation.push("DeckOverview", {key});

  renderItem = ({ item }) => (
    <View style={styles.deckListView}>
      <TouchableOpacity onPress={e => this.showDeck(item.key)}>
        <DeckInfo deck={item} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const { decksArray } = this.props;

    // No decks to show
    if (! decksArray.length) {
      return (
        <View style={styles.container}>
          <Text style={[styles.text, {color: "lightgray"}]}>There are no decks. Add your first one!</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decksArray}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decksArray: decksCollectionToArray(decks)
      .sort((a, b) => b.timestamp - a.timestamp)
  }
};

export default connect(mapStateToProps)(DeckListView);
