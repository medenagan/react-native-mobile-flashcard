import { StyleSheet, Platform } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deckListView: {
    backgroundColor: "white",
    alignItems: "stretch",
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
  deckOverview: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  deckOverviewButtons: {
    alignItems: "stretch"
  },
  decksListContent: {
    alignItems: "center",
    marginTop: 100,
    marginLeft: 120
  },
  deckInfo: {
    backgroundColor: "white"
  },
  deckTitle: {
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    color: "lightblue",
    textAlign: "center"
  },
  deckCount: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center"
  },
  deckCountZero: {
    color: "grey",
    fontStyle: "italic"
  },
  textButton: {
    backgroundColor: "white",
    color: "lightblue",
    borderColor: "lightblue",
    borderWidth: 2,
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    margin: 20,
    textAlign: "center",
    ...Platform.select({
      ios: {
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        }
      },
      android: {
        borderRadius: 10
      }
    })
  },
  invert: {
    backgroundColor: "lightblue",
    color: "white",
    borderWidth: 0
  },
  correctButton: {
    backgroundColor: "green",
    color: "white",
    borderWidth: 0
  },
  wrongButton: {
    backgroundColor: "red",
    color: "white",
    borderWidth: 0
  },
  textInput: {
    backgroundColor: "white",
    color: "lightblue",
    borderColor: "lightblue",
    borderWidth: 2,
    fontSize: 30,
    margin: 20
  },
  text: {
    margin: 10,
    textAlign: "center",
    fontSize: 18
  },
  questionText: {
    margin: 10,
    textAlign: "center",
    fontSize: 22,
  },
  answerText: {
    margin: 10,
    textAlign: "center",
    fontSize: 24,
    color: "lightblue",
    fontWeight: "bold"
  }

});
