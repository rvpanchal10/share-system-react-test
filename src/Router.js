import React, { useEffect } from "react";
import LandingPage from "./screens/landingPage/LandingPage";
import DetailPage from "./screens/detailPage/DetailPage";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";

function AppRouter() {
	return (
		<Router>
			<Switch>
				<Route path="/stations" exact component={LandingPage} />
				<Route path="/stations/:id" exact component={DetailPage} />
				<Redirect path="/" exact to="/stations" />
			</Switch>
		</Router>
	);
}

export default AppRouter;
