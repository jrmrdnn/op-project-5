import { total } from "./ObjectToArray";

/**
 * Calculate the total of the cart
 * @returns number
 */
export default function CalculTotal() {
  let t = 0;
  if (total) {
    total.forEach((v) => {
      t += v;
    });
  }
  return t;
}
