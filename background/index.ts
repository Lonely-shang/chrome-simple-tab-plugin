export {}

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    alert("install")
    console.log("This is a first install!");
  } else if (details.reason == "update") {
    console.log("Updated from " + details.previousVersion + " to " + chrome.runtime.getManifest().version + "!");
  }
  // initConfig()
});