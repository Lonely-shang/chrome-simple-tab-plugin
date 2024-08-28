import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MutableRefObject
} from "react"
import type { SuggestListRef } from "~components/suggestList"

import { handlerSuggestData } from "~utils/suggestUtil"
import type AnimationManager from "./manager/animationManager"
import EngineManager from "./manager/engineManager"

class TabClient {
  private engineManager: EngineManager
  private animationManager: AnimationManager
  private suggestDom: MutableRefObject<SuggestListRef>

  private searchValState = useState<string>("")
  private placeholderCenter = useState<boolean>(true)

  private searchEngine = useState<SearchEngine>(null)

  private suggestListData = useState<SuggestListItem[]>([])

  constructor(animationManager: AnimationManager, suggestDom: MutableRefObject<SuggestListRef>) {
    this.animationManager = animationManager
    this.suggestDom = suggestDom
    this.engineManager = new EngineManager(animationManager)
  }


  handlerSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const [_, setSearchVal] = this.searchValState
    setSearchVal(value)
    this.engineManager.getSearchEngine(value, setSearchVal)
    // this.handlerSuggestShow(value)
  }

  handlerSearchKeyDown(event: KeyboardEvent) {
    event.stopPropagation()
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      (event.ctrlKey && event.key === "j") ||
      (event.ctrlKey && event.key === "k")
    ) {
      event.preventDefault()
      this.handlerDirection(event.key)
      return
    }
    if (event.key == "Tab") {
      event.preventDefault()
      return
    }
    const [searchVal, setSearchVal] = this.searchValState
    this.engineManager.removeEngineSymbol(searchVal, event)
    this.engineManager.openSearchEngine(searchVal, event)
  }

  setPlaceholderPosition(center = true) {
    const [_, setPosition] = this.placeholderCenter
    center && this.animationManager.setSuggestStatus(false)
    setPosition(center)
  }

  get searchValue() {
    return this.searchValState[0]
  }

  get engineName() {
    return this.engineManager.getEngineName
  }

  get getPlaceholderPosition() {
    const [position, _] = this.placeholderCenter
    return position ? "centerPH" : ""
  }

  get getSuggestList() {
    const [suggestList, _] = this.suggestListData
    return suggestList
  }

  private async handlerSuggestShow(value: string) {
    const [searchEngine, _] = this.searchEngine
    const [__, setSuggestList] = this.suggestListData
    if (!value) {
      setSuggestList([])
      this.animationManager.setSuggestStatus(false)
    }
    if (!searchEngine) return
    const res = await handlerSuggestData(value, searchEngine)
    this.suggestDom.current.resetActive()
    setSuggestList(res)
    this.animationManager.setSuggestStatus(res.length != 0)
  }

  handlerDirection (key: string) {
    switch (key) {
      case 'ArrowDown':
      case 'j':
        this.suggestDom.current.nextSuggest()
        break;
      case 'ArrowUp':
      case 'k':
        this.suggestDom.current.preSuggest()
        break;
      default:
        break;
    }
  }
}

export default TabClient
