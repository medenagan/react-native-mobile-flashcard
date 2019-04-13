import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Constants } from "expo";

import DataRoot from "./components/DataRoot";
import Navigator from "./screens/Navigator";

export default class App extends React.Component {

  render() {
      return (
        <View style={styles.container}>
           <View style={{ backgroundColor: "lightblue", height: Constants.statusBarHeight }}>
             <StatusBar translucent backgroundColor="lightblue"/>
            </View>
          <DataRoot>
             <Navigator />
          </DataRoot>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
