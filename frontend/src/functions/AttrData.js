/**
 * Small rendering of the loop on the options
 * @param {string} attr attribute
 * @param {string[]} data api
 * @returns html
 */
export function AttrData(attr, data) {
  if (attr === "teddies") {
    return data.colors.map((s) => `<small>${s}</small>`).join("");
  }
  if (attr === "cameras") {
    return data.lenses.map((s) => `<small>${s}</small>`).join("");
  }
  if (attr === "furniture") {
    return data.varnish.map((s) => `<small>${s}</small>`).join("");
  } else {
    return "";
  }
}

/**
 * Select rendering of the loop on the options
 * @param {string} attr attribute
 * @param {string[]} data api
 * @returns html
 */
export function Options(attr, data) {
  if (attr === "teddies") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.colors.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  }
  if (attr === "cameras") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.lenses.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  }
  if (attr === "furniture") {
    return `<select name="${attr}">
              <option value="">-- Choisir une option --</option>
              ${data.varnish.map((v) => `<option value="${v}">${v}</option>`)}
            </select>`;
  } else {
    return "";
  }
}
