import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { PrivateRoute } from "./Components/PrivateRoute";
import AboutTest from "./pages/AboutTest";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import News from "./pages/News";
import PoliTest from "./pages/PoliTest";
import { Register } from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />

        {/* auth */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        {/* news & test */}
        <PrivateRoute path="/news" component={News} />
        <PrivateRoute path="/test" component={PoliTest} />

        {/* about pages */}
        <Route path="/about/test" component={AboutTest} />
        <Route path="/about/us" component={AboutTest} />
        <Route path="/about/algorithm" component={AboutTest} />

        {/* article view page */}
        <Route path="/article/:id" component={AboutTest} />

        <Redirect from="/about/*" to="/about/us" />
      </Switch>
    </Router>
  );
};

export default App;
