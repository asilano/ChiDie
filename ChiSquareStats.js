import chi2gof from "@stdlib/stats-chi2gof";

export const NOT_ENOUGH_DATA = Symbol("Not Enough");
export const LOW_AMOUNT_DATA = Symbol("Low Data");
export const HIGH_AMOUNT_DATA = Symbol("High Data");

function totalRolls(rolls) {
  return rolls.reduce((acc, val) => { return acc + val }, 0);
}

function balanceStats(rolls) {
  const rollCount = totalRolls(rolls);
  if (rollCount < 5 * rolls.length) {
    return [NOT_ENOUGH_DATA, 0];
  }

  const goodness = chi2gof(rolls, 'discrete-uniform', 0, rolls.length - 1);

  let confidenceString;
  if (rollCount < 10 * rolls.length) {
    return [LOW_AMOUNT_DATA, goodness];
  } else {
    return [HIGH_AMOUNT_DATA, goodness];
  }
}

export { balanceStats };