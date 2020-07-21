import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import client from "./graphql/apollo";
import store from "./redux/store";

import App from "./component/App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
