import React, { useEffect } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

// all of our pages!
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import GetMoreInfoPage from "../GetMoreInfoPage/GetMoreInfoPage";
import PrimingPage from "../PrimingPage/PrimingPage";
import ServiceChoicePage from "../ServiceChoicePage/ServiceChoicePage";
import ClientLocationInfoPage from "../ClientLocationInfoPage/ClientLocationInfoPage";
import DemographicsPage from "../DemographicsPage/DemographicsPage";
import FoodPreferencesPage from "../FoodPreferencesPage/FoodPreferencesPage";
import AdditionalInfoPage from "../AdditionalInfoPage/AdditionalInfoPage";
import ReviewPage from "../ReviewPage/ReviewPage";
import AdminPage from "../AdminPage/AdminPage";
import ClientStatusPage from "../ClientStatusPage/ClientStatusPage";



function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route
            // shows GetMoreInfoPage at all times (logged in or not)
            exact
            path="/getmoreinfo"
          >
            <GetMoreInfoPage />
          </Route>

          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          {/* PROTECTED */}


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PrimingPage else shows LoginPage
            exact
            path="/priming"
          >
            <PrimingPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ServiceChoicePage else shows LoginPage
            exact
            path="/servicechoice"
          >
            <ServiceChoicePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClientLocationInfoPage else shows LoginPage
            exact
            path="/clientlocationinfo"
          >
            <ClientLocationInfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows DemographicsPage else shows LoginPage
            exact
            path="/demographics"
          >
            <DemographicsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows FoodPreferencesPage else shows LoginPage
            exact
            path="/foodpreferences"
          >
            <FoodPreferencesPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdditionalInfoPage else shows LoginPage
            exact
            path="/additionalinfo"
          >
            <AdditionalInfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ReviewPage else shows LoginPage
            exact
            path="/review"
          >
            <ReviewPage />
          </ProtectedRoute>

          {/* <ProtectedRoute
            // logged in shows AdminPage else shows LoginPage
            exact
            path="/admin"
          >
            <AdminPage />
          </ProtectedRoute> */}


          <ProtectedRoute
            // logged in shows ClientStatusPage else shows LoginPage
            exact
            path="/clientstatus"
          >
            <ClientStatusPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin">
            {user.admin === true ? (
              <AdminPage />
            ) : (
              <Redirect to="/user" />
            )}
          </ProtectedRoute>

          {/* ------ PROTECTED ------ */}

          <Route exact path="/login">
            {user.id ? (
              user.admin ? (
                // If the user is an admin, redirect to /admin page
                <Redirect to="/admin" />
              ) : (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              )
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              user.admin ? (
                // If the user is an admin, redirect to /admin page
                <Redirect to="/admin" />
              ) : (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              )
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              user.admin ? (
                // If the user is an admin, redirect to /admin page
                <Redirect to="/admin" />
              ) : (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              )
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
