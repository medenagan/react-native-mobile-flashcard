import React from "react";
import { connect } from "react-redux";

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

class DeckListView extends React.Component {

  static navigationOptions = {
    header: null,
  };

  showDeck = (key) => {
    WebBrowser.openBrowserAsync('https://www.google.com/search=' + key);
  };

  renderItem = ({ item }) => (
    <View style={styles.deckListView}>
      <TouchableOpacity onPress={e => this.showDeck(item.key)}>

        <Text style={styles.deckTitle}>{item.title}</Text>
        {
          (! item.questions.length) && <Text style={styles.deckCountZero}>No cards yet</Text>
        }
        {
          (item.questions.length === 1) && <Text style={styles.deckCount}>Only one card</Text>
        }
        {
          (item.questions.length > 1) && <Text style={styles.deckCount}>{item.questions.length} cards</Text>
        }

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deckListView: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 10,
      },
    })
  },
  deckTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "lightblue"
  },
  deckCount: {
    fontSize: 16,
  },
  deckCountZero: {
    color: "grey",
    fontStyle: "italic"
  },
  decksListContent: {
    alignItems: "center",
    marginTop: 100,
    marginLeft: 120
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});

function mapStateToProps(decks) {
  return {
    decksArray: decksCollectionToArray(decks)
  }
};

export default connect(mapStateToProps)(DeckListView);
