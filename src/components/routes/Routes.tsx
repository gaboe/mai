import * as React from "react";
import { Route } from "react-router-dom";
import { RandomSearchFirstDejong } from "../random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "../random-search/RandomSearchSecondDejong";
import { RandomSearchSchwefel } from "../random-search/RandomSearchSchwefel";
import { Home } from "../home/Home";
import { HillClimberFirstDejong } from "../hill-climber/HillClimberFirstDejong";
import { HillClimberSecondDejong } from "../hill-climber/HillClimberSecondDejong";
import { HillClimberSchwefel } from "../hill-climber/HillClimberSchwefel";
import { SimulatedAnnealingFirstDejong } from "../simulated-annealing/SimulatedAnnealingFirstDejong";
import { SimulatedAnnealingSecondDejong } from "../simulated-annealing/SimulatedAnnealingSecondDejong";
import { SimulatedAnnealingSchwefel } from "../simulated-annealing/SimulatedAnnealingSchwefel";
import { TabuFirstDejong } from "../tabu/TabuFirstDejong";
import { TabuSchwefel } from "../tabu/TabuSchwefel";
import { TabuSecondDejong } from "../tabu/TabuSecondDejong";

const Routes = () => {
  return (
    <>
      <Route exact={true} path="/" component={Home} />
      <Route
        exact={true}
        path="/random-search-dejong-first"
        component={RandomSearchFirstDejong}
      />
      <Route
        exact={true}
        path="/random-search-dejong-second"
        component={RandomSearchSecondDejong}
      />
      <Route
        exact={true}
        path="/random-search-schwefel"
        component={RandomSearchSchwefel}
      />
      <Route
        exact={true}
        path="/hill-climber-dejong-first"
        component={HillClimberFirstDejong}
      />
      <Route
        exact={true}
        path="/hill-climber-dejong-second"
        component={HillClimberSecondDejong}
      />
      <Route
        exact={true}
        path="/hill-climber-schwefel"
        component={HillClimberSchwefel}
      />

      <Route
        exact={true}
        path="/sa-dejong-first"
        component={SimulatedAnnealingFirstDejong}
      />
      <Route
        exact={true}
        path="/sa-dejong-second"
        component={SimulatedAnnealingSecondDejong}
      />
      <Route
        exact={true}
        path="/sa-schwefel"
        component={SimulatedAnnealingSchwefel}
      />
      <Route
        exact={true}
        path="/tabu-dejong-first"
        component={TabuFirstDejong}
      />
      <Route
        exact={true}
        path="/tabu-dejong-second"
        component={TabuSecondDejong}
      />
      <Route exact={true} path="/tabu-schwefel" component={TabuSchwefel} />
    </>
  );
};

export { Routes };
