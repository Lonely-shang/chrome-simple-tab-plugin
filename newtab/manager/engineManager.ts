import { useState, type Dispatch, type KeyboardEvent } from "react"

import type SuggestManager from "~components/suggestList/suggestManager"
import { getDefaultEngine } from "~config/config"
import { getEngine } from "~data/searchEngineData"
import {
  handlerNetWorkUrl,
  handlerSearchEngines,
  matchUrl
} from "~utils/urlUtils"

import type AnimationManager from "./animationManager"

class EngineManager {
  private index: number
  private suggestManager: SuggestManager
  private animationManager: AnimationManager
  private searchEngine = useState<SearchEngine>(null)

  constructor(
    animationManager: AnimationManager,
    suggestManager: SuggestManager
  ) {
    this.suggestManager = suggestManager
    this.animationManager = animationManager
    animationManager.setAnimationEndCallBack = this.clearEngineData(
      this.searchEngine
    )
  }

  get getCurrentEngine() {
    return this.searchEngine
  }

  get getEngineName() {
    const [engineData, _] = this.searchEngine
    return engineData?.title
  }

  async getSearchEngine(
    value: string,
    setSearchVal: Dispatch<React.SetStateAction<string>>
  ) {
    if (!this.animationManager.getPreTitleStatus) return
    const [_, setSearchEngine] = this.searchEngine
    const regVal = value.match(/.*\s$/gi)
    const engine = await getEngine(regVal)
    if (!engine) return
    setSearchEngine(engine)
    this.animationManager.setPreTitleStatus()
    setSearchVal("")
  }

  async openSearchEngine(value: string, event: KeyboardEvent) {
    if (event.key !== "Enter") return
    const isOpen = this.suggestManager.openState()
    if (isOpen || value.startsWith(">")) return
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
    const defaultEngine = await getDefaultEngine()
    const url = handlerSearchEngines(defaultEngine, value)
    window.open(url)
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

  clearEngineData(searchEngine) {
    const [_, setSearchEngine] = searchEngine
    return () => {
      setSearchEngine(null)
    }
  }
}

export default EngineManager
