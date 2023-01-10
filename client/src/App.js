import axios from "axios";
import { useEffect } from "react";
import Home from "./routes/Home/Home";
import Detail from "./routes/Detail/Detail";
import Search from "./routes/Search/Search";
import Join from "./routes/Join/Join";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Join" component={Join}></Route>
        <Route path="/search/:id" component={Search}></Route>
        <Route path="/webtoon/:title" component={Detail}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
