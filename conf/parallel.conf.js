
LT_USERNAME = process.env.LT_USERNAME || "andrenovais.git";
LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || "kEn3AzDcEb9G1rsYvOtqs6tXZogzKmdeiTNibYC65zfmcS92bx";

var config = {
  commanCapabilities: {
    build: "Mocha-Selenium-Sample", //Build name
    tunnel: true // Make it true to run the localhost through tunnel
  },
  multiCapabilities: [
    {
      // Desired capabilities
      name: "Your Test Name", // Test name
      platform: "Windows 10", // OS name
      browserName: "firefox",
      version: "66.0",
      visual: false, // To take step by step screenshot
      network: true, // To capture network Logs
      console: true // To capture console logs.
    },
    {
      name: "Your Test Name", // Test name
      platform: "Windows 10", // OS name
      browserName: "chrome",
      version: "75.0",
      visual: false, // To take step by step screenshot
      network: true, // To capture network Logs
      console: true // To capture console logs.
    }
  ]
};

exports.capabilities = [];
config.multiCapabilities.forEach(function(caps) {
  var temp_caps = JSON.parse(JSON.stringify(config.commanCapabilities));
  for (var i in caps) temp_caps[i] = caps[i];
  exports.capabilities.push(temp_caps);
});
