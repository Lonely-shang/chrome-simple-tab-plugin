import { useState, type Dispatch, type KeyboardEvent } from "react"

import { getEngine } from "~data/searchEngineData"
import {
  handlerNetWorkUrl,
  handlerSearchEngines,
  matchUrl
} from "~utils/urlUtils"

import type AnimationManager from "./animationManager"

class EngineManager {
  private index: number
  private animationManager: AnimationManager
  private searchEngine = useState<SearchEngine>(null)

  private defaultEngine: string = "https://www.google.com/search?q="

  constructor(animationManager: AnimationManager) {
    this.animationManager = animationManager
  }

  get getEngineName () {
    const [engineData, _] = this.searchEngine
    return engineData?.title
  }

  getSearchEngine(
    value: string,
    setSearchVal: Dispatch<React.SetStateAction<string>>
  ) {
    if (!this.animationManager.getPreTitleStatus) return
    const [_, setSearchEngine] = this.searchEngine
    const regVal = value.match(/.*\s$/gi)
    const engine = getEngine(regVal)
    if (!engine) return
    setSearchEngine(engine)
    this.animationManager.setPreTitleStatus()
    setSearchVal("")
  }

  openSearchEngine(value: string, event: KeyboardEvent) {
    if (event.key !== "Enter") return
    // const isOpen = this.suggestDom.current.openSearch()
    // if (isOpen) return
    const [searchEngine, _] = this.searchEngine
    if (matchUrl(value)) {
      const openUri = handlerNetWorkUrl(value)
      window.open(openUri)
      return
    }

    if (!this.animationManager.getPreTitleStatus) {
      const url = handlerSearchEngines(searchEngine.searchUrl, value)
      window.open(url)
      return
    }

    window.open(this.defaultEngine + value)
  }

  removeEngineSymbol(searchVal: string, event: KeyboardEvent) {
     if (searchVal === "" && event.key === "Backspace") {
      if (this.index === 1) {
        this.index = 0
        this.animationManager.setPreTitleStatus(false)
      } else {
        this.index = 1
        const time = setTimeout(() => {
          this.index = 0
          clearTimeout(time)
        }, 300)
      }
    }
  }
}

export default EngineManager
