import React from "react";

import {store} from "appRedux/store";
import Dialogs from "components/Dialogs/Dialogs";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import Content from "./Content";

import './i18n';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    background: url("https://live.staticflickr.com/65535/49924646512_ee351b4d14_k.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  body {
    height: 100%;
    margin: 0;

    .root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;

      .page {
        overflow-y: auto;
        height: 100%;
        min-height: 0;
        flex: 1;
        user-select: none;
        box-sizing: border-box;
      }
    }
  }
`;

export const App = () => {
    return <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <Content/>
            <Dialogs/>
        </BrowserRouter>
    </Provider>;
};