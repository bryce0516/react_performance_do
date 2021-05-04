import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";
import theme from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { plus } from "./redux/reducers/commonReducer";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

function App() {
  // const auth = new Auth();
  const state = useSelector((state) => state.commonReducer.number);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">hello world</div>

      <button onClick={() => dispatch(plus(1))}> this is click button </button>
      <div>{state}</div>
    </ThemeProvider>
  );
}

export default App;
