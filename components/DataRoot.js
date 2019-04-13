import React, { Fragment } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { requestGetDecks } from "../actions";

const store = createStore(reducer, middleware);

class DataRoot extends React.Component {

  componentDidMount() {
    store.dispatch(requestGetDecks())
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          {this.props.children}
        </Fragment>
      </Provider>
    );
  }
}

export default DataRoot;
