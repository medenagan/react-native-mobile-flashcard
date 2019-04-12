import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants } from "expo";
import AppNavigator from './navigation/AppNavigator';

import DataRoot from "./components/DataRoot";

import DeckListView from './screens/DeckListView';
import DeckOverview from './screens/DeckOverview';
import AddCard from './screens/AddCard';
import QuizView from './screens/QuizView';



import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

const HOME = class extends React.Component {

  static navigationOptions = {
    title: "Decks"
  };

  render() {
    const { navigation } = this.props;
    return <Text onPress={() => navigation.navigate("Coniglio")}>La mia casa</Text>;
  }
}


const Navigatore = createAppContainer(createStackNavigator({
  DeckListView: {
    screen: DeckListView,
  },
  DeckOverview: {
    screen: DeckOverview
  },
  AddCard: {
    screen: AddCard
  },
  QuizView: {
    screen: QuizView
  }
}, {
  initialRouteName: "DeckListView",
  ...Platform.select({
    ios: {
      mode: "modal"
    },
    android: {
      mode: "card"
    }
  }),
  headerStyle: {
    backgroundColor: "red"
  }
}));


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
           <View style={{ backgroundColor: "lightblue", height: Constants.statusBarHeight }}>
             <StatusBar translucent backgroundColor="lightblue"/>
            </View>
          <DataRoot>
             <Navigatore />
          </DataRoot>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
