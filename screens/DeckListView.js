import React from "react";
import { connect } from "react-redux";
import styles from "../utils/styles";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

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
  }
};

export default connect(mapStateToProps)(DeckListView);
