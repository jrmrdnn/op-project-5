/**
 * Return a character string representing a number taking into account the French locality
 * @param {number} num
 * @returns string
 */
export default function NumberToLocal(num) {
  if (typeof num === "number") {
    return (num / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  } else {
    return "";
  }
}
