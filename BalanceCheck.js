import { Text } from "react-native";
import Styles from "./Styles";
import chi2gof from "@stdlib/stats-chi2gof";

function totalRolls(rolls) {
  return rolls.reduce((acc, val) => { return acc + val }, 0);
}

function balanceReport(dieSize, rolls) {
  const rollCount = totalRolls(rolls);
  if (rollCount < 5 * rolls.length) {
    return `Not enough data - keep rolling!`;
  }

  let confidenceString;
  if (rollCount < 10 * rolls.length) {
    confidenceString = 'fair';
  } else {
    confidenceString = 'good';
  }

  const goodness = chi2gof(rolls, 'discrete-uniform', 0, rolls.length - 1);
  let balanceString;
  if (goodness.pValue < 0.01) {
    balanceString = "very likely unbalanced";
  } else if (goodness.pValue < 0.05) {
    balanceString = "probably unbalanced";
  } else if (goodness.pValue < 0.1) {
    balanceString = "dubiously balanced";
  } else {
    balanceString = "decently balanced";
  }

  return `Your ${dieSize} is ${balanceString} (with ${confidenceString} confidence).`;
}

const BalanceCheck = ({ dieSize, rolls }) => {
  return (
    <Text style={Styles.body_text}>{balanceReport(dieSize, rolls)}</Text>
  )
};

export default BalanceCheck;