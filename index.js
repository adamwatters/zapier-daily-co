const meeting = require("./triggers/meeting");

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers["authorization"] = `Bearer ${bundle.authData.apiKey}`;
  return request;
};

const App = {
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  authentication: {
    type: "custom",
    fields: [{ key: "apiKey", type: "string" }],
    test: z => {
      const promise = z.request("https://api.daily.co/v1/");
      return promise.then(response => {
        if (response.status !== 200) {
          throw new Error("Invalid API Key");
        }
      });
    }
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [addApiKeyToHeader],

  afterResponse: [],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [meeting.key]: meeting
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {}
};

// Finally, export the app.
module.exports = App;
