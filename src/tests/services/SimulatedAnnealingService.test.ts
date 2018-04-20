import { getFirstDejongStats } from "./../../services/simulatedAnnealing/simulatedAnneualingService";

it("Annealing works for first dejong", () => {
  const stat = getFirstDejongStats();
  console.log("min", stat.min);
});
