import { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/authContext";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import PasswordForgot from "./pages/auth/PasswordForgot";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import Hike from "./pages/hike/Hike";
import SingleHike from "./pages/hike/SingleHike";
import HikeUpdate from "./pages/hike/HikeUpdate";
import SearchResult from "./components/SearchResult";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";

const App = () => {
  // Context
  const { state } = useContext(AuthContext);

  // Destructure user
  const { user } = state;

  // Create http link
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  // Setcontext for authtoken
  const authLink = setContext((_, { headers }) => {
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authtoken: user ? user.token : "",
      },
    };
  });

  // Concat http and authtoken link
  const httpAuthLink = authLink.concat(httpLink);

  // Create websocket link
  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
    options: {
      reconnect: true,
    },
  });

  // Create splitLink
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpAuthLink
  );

  // Create Apollo client
  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="bg-light">
        <Nav />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route exact path="/user/:username" component={SingleUser} />
          <Route exact path="/search/:query" component={SearchResult} />
          <PublicRoute
            exact
            path="/register"
            component={Register}
          ></PublicRoute>
          <PublicRoute exact path="/login" component={Login}></PublicRoute>
          <PublicRoute
            exact
            path="/complete-registration"
            component={CompleteRegistration}
          />
          <PublicRoute
            exact
            path="/password/forgot"
            component={PasswordForgot}
          ></PublicRoute>
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/password/update"
            component={PasswordUpdate}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/hike/update/:hikeid"
            component={HikeUpdate}
          />
          <PrivateRoute
            exact
            path="/hike/create"
            component={Hike}
          ></PrivateRoute>
          <Route exact path="/hike/:hikeid" component={SingleHike} />
        </Switch>
      </div>
    </ApolloProvider>
  );
};

export default App;
