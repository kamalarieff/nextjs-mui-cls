import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName
} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { initializeStore } from "../store";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const generateClassName = createGenerateClassName({
      productionPrefix: "yoghirt"
    });

    return (
      <Container>
        <StylesProvider generateClassName={generateClassName}>
          <Head>
            <title>My page</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
//export default MyApp
