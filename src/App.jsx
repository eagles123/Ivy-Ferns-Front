import React, { useReducer, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Recommender from "./Components/layout/Recommender";
import DataDashBoard from "./Components/layout/DataDashBoard";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Intro from "./Components/layout/Intro";
import { choiceReducer } from "./Components/reducer/choiceReducer";
import { ChoiceContext } from "./Components/context/ParameterContext";
import About from "./Components/layout/About";
import FAQs from "./Components/layout/FAQs";
import NotFound from "./Components/layout/NotFound";
import HomePageTwo from "./Components/layout/HomePageTwo";
import NavBar from "./Components/layout/NavBar";

const App = () => {
  const [choice, choiceDispatch] = useReducer(choiceReducer, {
    healthField: false,
    educationField: false,
    propertyField: false,
    jobField: false
  });

  const [suburbList, setSubList] = useState([]);

  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_URL}/graphql?`
  });

  return (
    <div className="App">
      <NavBar />
      <ApolloProvider client={client}>
        <ChoiceContext.Provider
          value={{ choiceDispatch, choice, suburbList, setSubList }}
        >
          <Switch>
            <Route path="/dashboard/:id" component={DataDashBoard} />
            <Route path="/recommend" component={Recommender} />
            <Route path="/intro" component={Intro} />
            <Route path="/about" component={About} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/faqs" component={FAQs} />
            <Route path="/" component={HomePageTwo} />
            <Redirect to="/not-found" />
          </Switch>
        </ChoiceContext.Provider>
      </ApolloProvider>
    </div>
  );
};

export default App;
