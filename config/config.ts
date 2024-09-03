import config from "./config.json"

const initConfig = async (): Promise<null> => {
  chrome.storage.local.set({ theme: "os" })
  const syncData = await chrome.storage.sync.get([
    "theme",
    "defaultEngine",
    "engineList",
    "commandList"
  ])
  if (!syncData.engineList) {
    chrome.storage.sync.set({
      ...config
    })
  }
  chrome.storage.local.set(config)
  return null
}




export { initConfig }
