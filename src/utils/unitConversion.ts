export function convertDmToFeetInches(dm: number): string {
  const cm = dm * 10; // Convert decimeters to centimeters
  const inches = cm / 2.54; // Convert centimeters to inches
  const feet = Math.floor(inches / 12); // Get whole feet
  const remainingInches = Math.round(inches % 12); // Get remaining inches

  return `${feet} ft ${remainingInches} in`;
}

export function convertHgToLbs(hg: number): string {
  const lbs = hg * 0.220462;
  return `${lbs.toFixed(2)} lbs`;
}
