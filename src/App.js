import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./styles.scss";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/webtoon/:title" component={Detail}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
