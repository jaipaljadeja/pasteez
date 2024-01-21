export function generatePfpUrl(username) {
  return `https://api.dicebear.com/7.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear,solid&seed=${username}`;
}
