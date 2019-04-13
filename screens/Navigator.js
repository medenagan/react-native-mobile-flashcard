import { Platform } from 'react-native';

import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import DeckListView from './DeckListView';
import DeckOverview from './DeckOverview';
import AddCard from './AddCard';
import QuizView from './QuizView';
import AddDeck from './AddDeck';


const stackRouteConfigs = {
  DeckListView,
  DeckOverview,
  AddCard,
  QuizView
};

const stackStackNavigatorConfigs = {
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
};

const DecksNavigator = createStackNavigator(stackRouteConfigs, stackStackNavigatorConfigs);

const tabRouteConfigs = {
  Decks: {
    screen: DecksNavigator,
    navigationOptions: {
      title: "Decks"
    }
  },
  AddDeck:{
    screen: AddDeck,
    navigationOptions: {
      title: "Add"
    }
  }
};

const materialTopNavigatorConfigs = {
  initialRouteName: "Decks",
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
      color: "white"
    },
    style: {
      backgroundColor: "lightblue"
    }
  }
};

const bottomNavigatorConfigs = {
  initialRouteName: "Decks",
  tabBarOptions: {
    activeTintColor: "lightblue",
    inactiveTintColor: "lightgrey",
    labelStyle: {
      fontSize: 14,
      fontWeight: "bold"

    }
  }
};

const TabNavigator = (Platform.OS === "ios")
  ? createBottomTabNavigator(tabRouteConfigs, bottomNavigatorConfigs)
  : createMaterialTopTabNavigator(tabRouteConfigs, materialTopNavigatorConfigs);

export default createAppContainer(TabNavigator);
