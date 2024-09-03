import {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MutableRefObject
} from "react"

import type { SuggestListRef } from "~components/suggestList"
import type SuggestManager from "~components/suggestList/suggestManager"
import { handlerSuggestData } from "~utils/suggestUtil"

import type AnimationManager from "./manager/animationManager"
import EngineManager from "./manager/engineManager"
import CommandManager from "./manager/commandManager"

class TabClient {
  private engineManager: EngineManager
  private commandManager: CommandManager
  private suggestManager: SuggestManager
  private animationManager: AnimationManager

  private searchValState = useState<string>("")
  private placeholderCenter = useState<boolean>(true)

  private suggestListData = useState<SuggestListItem[]>([])

  constructor(
    animationManager: AnimationManager,
    suggestManager: SuggestManager
  ) {
    this.animationManager = animationManager
    this.suggestManager = suggestManager
    this.engineManager = new EngineManager(animationManager, suggestManager)
    this.commandManager = new CommandManager(animationManager)
  }

  async handlerSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const [_, setSearchVal] = this.searchValState
    setSearchVal(value)
    if (!this.engineManager.getEngineName && value.startsWith(">")) {
      const res = await this.commandManager.getSearchCommand(value, setSearchVal)
      this.suggestManager.setSuggestList = res
      return
    } else {
      this.engineManager.getSearchEngine(value, setSearchVal)
    }
    this.suggestManager.getSuggestList(
      value,
      this.engineManager.getCurrentEngine
    )
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
    const [searchVal, _] = this.searchValState
    this.engineManager.removeEngineSymbol(searchVal, event)
    this.engineManager.openSearchEngine(searchVal, event)
  }

  setPlaceholderPosition(center = true) {
    const [_, setPosition] = this.placeholderCenter
    center && this.animationManager.setSuggestStatus(false)
    setPosition(center)
  }

  private handlerDirection(key: string) {
    switch (key) {
      case "ArrowDown":
      case "j":
        this.suggestManager.nextItem()
        break
      case "ArrowUp":
      case "k":
        this.suggestManager.preItem()
        break
      default:
        break
    }
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
}

export default TabClient
