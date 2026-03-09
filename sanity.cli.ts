import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "k6e71wky",
    dataset: "production",
  },
  studioHost: "pampered-feline",
  deployment: {
    appId: "zh31ua465lxrktnjzmutijhs",
  },
});
