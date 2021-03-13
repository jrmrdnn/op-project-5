// Variable total
export let total = [];

/**
 * Convert object to array
 * Calculate the total object in array for the function CalculTotal()
 * @param {object} obj
 * @returns array
 */
export default function ObjectToArray(obj) {
  let target = [];
  Object.entries(obj).forEach((s, i) => {
    target.push([s[0]]);
    Object.entries(s[1]).forEach((k, y) => {
      target[i].push(k);
      total.push(k[1].price * k[1].number);
    });
  });
  return target;
}
