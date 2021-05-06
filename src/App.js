import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";
import theme from "./theme";
import { useSelector, useDispatch } from "react-redux";
import { plus } from "./redux/reducers/commonReducer";
import Auth from "./Auth";
import { UserContextProvider } from "./context";
import { UserContext } from "./context/user-context";

import Login from "./pages/Login";
import MKRoutes from "./routes/MKRoutes";
import KitchenRoutes from "./routes/KitchenRoutes";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

function App() {
  const auth = new Auth();
  const state = useSelector((state) => state.commonReducer.number);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider auth={auth}>
        <UserContext.Consumer>
          {(userContext) => (
            <>
              <Switch>
                <>
                  <Route
                    path="/mk"
                    isAuthenticated={
                      userContext.isAuthenticated &&
                      userContext.user.admin_type === "AD_001"
                    }
                    component={MKRoutes}
                  />
                  <Route
                    path="/kitchen"
                    isAuthenticated={
                      userContext.isAuthenticated &&
                      userContext.user.admin_type === "AD_002"
                    }
                    component={KitchenRoutes}
                  />

                  <Route path="/login" exact>
                    <Container>
                      <Login userContext={userContext} />
                    </Container>
                  </Route>
                  <Route path="/">
                    <Redirect to="/login" />
                  </Route>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </>
              </Switch>
            </>
          )}
        </UserContext.Consumer>
      </UserContextProvider>
      <div className="app">hello world</div>

      <button onClick={() => dispatch(plus(1))}> this is click button </button>
      <div>{state}</div>
    </ThemeProvider>
  );
}

export default App;
