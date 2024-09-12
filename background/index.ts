import { initConfig } from "~config/config";

export {}

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    initConfig()
  } else if (details.reason == "update") {
    console.log("Updated from " + details.previousVersion + " to " + chrome.runtime.getManifest().version + "!");
  }
});