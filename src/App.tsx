import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PathFindingVisualizer from "./Visualizer/PathFindingVisualizer";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={PathFindingVisualizer} />
          {/* <Route path="/react-rat" component={ReactRat} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
