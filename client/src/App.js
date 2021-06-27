import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import AboutTest from "./pages/AboutTest";
import Amusement from "./pages/Amusement";
import Home from "./pages/Home";
import LocalNews from "./pages/LocalNews";
import { Login } from "./pages/Login";
import News from "./pages/News";
import PoliTest from "./pages/PoliTest";
import { Register } from "./pages/Register";
import Search from "./pages/Search";
import TrackedNews from "./pages/TrackedNews";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />

				{/* auth */}
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />

				{/* news & test */}
				<PrivateRoute path="/news" component={News} exact />
				<PrivateRoute path="/news/search" component={Search} />
				<PrivateRoute path="/news/tracked" component={TrackedNews} />
				<PrivateRoute path="/news/local" component={LocalNews} />
				<PrivateRoute path="/test" component={PoliTest} />

				{/* about pages */}
				<Route path="/about/test" component={AboutTest} />
				<Route path="/about/us" component={AboutTest} />
				<Route path="/about/algorithm" component={AboutTest} />

				{/* funneh */}
				<Route path="/amusement" component={Amusement} />

				<Redirect from="/about/*" to="/about/us" />
			</Switch>
		</Router>
	);
};

export default App;
