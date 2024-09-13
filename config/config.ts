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
    chrome.storage.sync.set(config)
  }
  chrome.storage.local.set(config)
  return null
}


const saveConfig = ({
  theme,
  defaultEngine,
  engineList,
  commandList
}: {
  theme?: string
  defaultEngine?: string
  engineList?: string[]
  commandList?: string[]
}) => {
  chrome.storage.local.set({ theme, defaultEngine, engineList, commandList })
  chrome.storage.sync.set({ theme, defaultEngine, engineList, commandList })
}


const getDefaultEngine = async (): Promise<string> => {
  const data = await chrome.storage.local.get(["defaultEngine"])
  return data.defaultEngine
}

export { initConfig, saveConfig, getDefaultEngine }
