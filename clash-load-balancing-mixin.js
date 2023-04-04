/**
 * This mixin script helps to group proxies in the subscription file
 * based on their names' matching with specified keywords.
 * It then creates new proxy-groups in the configuration file, one for
 * each group of proxies, with the name starting with 'LoadBalancing_'.
 * Finally, it adds each new group name to the 'proxies' array of each
 * original proxy-group in the configuration file.
 *
 * @param {Object} config - An object containing the content, name, and url of
 *                         the configuration file, as well as the axios and yaml
 *                         libraries and a notify function.
 * @returns {Object} - The modified configuration object.
 */

module.exports.parse = async (
  { content, name, url },
  { axios, yaml, notify }
) => {
  // Define the list of keywords to match with proxy names
  const country_keys = ["香港", "日本", "台湾", "新加坡", "美国", "HK", "SG", "JP", "US"];

  // Initialize an object to store the matched proxies for each country
  const proxyGroups = {};

  // Loop through each proxy in the configuration file
  content.proxies.forEach((proxy) => {
    // Find the first keyword that matches with the proxy name
    const matchedKey = country_keys.find((key) => proxy.name.includes(key));

    // If a keyword is found, add the proxy name to its corresponding group
    if (matchedKey) {
      if (!proxyGroups[matchedKey]) {
        proxyGroups[matchedKey] = [];
      }
      proxyGroups[matchedKey].push(proxy.name);
    }
  });

  // Create a new proxy-group for each country with its matched proxies
  const newProxyGroups = Object.entries(proxyGroups).map(([country, proxies]) => ({
    name: `LoadBalancing_${country}`,
    type: "url-test",
    proxies,
    url: "http://www.gstatic.com/generate_204",
    interval: 300,
  }));

  // Add each new group name to the 'proxies' array of each original proxy-group
  content["proxy-groups"].forEach((group) => {
    group.proxies = [...newProxyGroups.map((group) => group.name), ...group.proxies];
  });

  // Return the modified configuration object
  return { ...content, "proxy-groups": [...content["proxy-groups"], ...newProxyGroups] };
};
