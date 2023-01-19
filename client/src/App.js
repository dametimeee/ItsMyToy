import Home from "./routes/Home/Home";
import Detail from "./routes/Detail/Detail";
import Search from "./routes/Search/Search";
import Join from "./routes/Join/Join";
import Login from "./routes/Login/Login";
import MyPage from "./routes/MyPage/MyPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/MyPage" component={MyPage}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/Join" component={Join}></Route>
          <Route path="/search/:id" component={Search}></Route>
          <Route path="/webtoon/:title" component={Detail}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
