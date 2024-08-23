import { gsap } from "gsap"
import {
  useLayoutEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type MutableRefObject
} from "react"
import type { SuggestList } from "~components"
import type { SuggestListRef } from "~components/suggestList"

import { getEngine } from "~data/searchEngineData"
import { handlerSuggestData } from "~utils/suggestUtil"
import {
  handlerNetWorkUrl,
  handlerSearchEngines,
  matchUrl
} from "~utils/urlUtils"

class TabClient {
  private index: number = 0
  private mainDom: MutableRefObject<HTMLDivElement>
  private suggestDom: MutableRefObject<SuggestListRef>

  private suggestTimeline = useState<gsap.core.Timeline>()
  private suggestReversed = useState<boolean>(true)

  private preTitleTween = useState<gsap.core.Tween>()
  private preTitleReversed = useState<boolean>(true)

  private searchValState = useState<string>("")
  private placeholderCenter = useState<boolean>(true)

  private searchEngine = useState<SearchEngine>(null)

  private suggestListData = useState<SuggestListItem[]>([])

  private defaultEngine: string = "https://www.google.com/search?q="

  constructor(refDom: MutableRefObject<HTMLDivElement>, suggestDom: MutableRefObject<SuggestListRef>) {
    this.mainDom = refDom
    this.suggestDom = suggestDom
    this.init()
  }

  private init() {
    this.initSuggestAnimated()
    this.initPreTitleANimated()
  }

  handlerSearchValue(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const [_, setSearchVal] = this.searchValState
    setSearchVal(value)
    this.handlerSearchValueShowPreTitle(value, setSearchVal)
    this.handlerSuggestShow(value)
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
    this.removePreTitle(searchVal, event)
    this.openSearchEngine(searchVal, event)
  }

  setSuggest(enable = true) {
    const [_, setSuggest] = this.suggestReversed
    setSuggest(!enable)
  }

  setPreTitle(enable = true) {
    const [_, setPreTitle] = this.preTitleReversed
    setPreTitle(!enable)
  }

  setPlaceholderPosition(center = true) {
    const [_, setPosition] = this.placeholderCenter
    center && this.setSuggest(false)
    setPosition(center)
  }

  get searchValue() {
    return this.searchValState[0]
  }

  get engineName() {
    const [searchEngine, _] = this.searchEngine
    return searchEngine?.title
  }

  get getPlaceholderPosition() {
    const [position, _] = this.placeholderCenter
    return position ? "centerPH" : ""
  }

  get getSuggestList() {
    const [suggestList, _] = this.suggestListData
    return suggestList
  }

  private initPreTitleANimated() {
    const [tl, setTl] = this.preTitleTween
    const [reversed, _] = this.preTitleReversed
    const [__, setSearchEngine] = this.searchEngine
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tween = gsap.to(".searchBox-title", {
          display: "block",
          width: "2rem",
          paddingLeft: 25,
          paddingRight: 10,
          duration: 0.5,
          ease: "back.out",
          onReverseComplete: () => setSearchEngine(null)
        })
        setTl(tween)
      }, this.mainDom.current)
      return () => ctx.revert()
    }, [])

    useLayoutEffect(() => {
      tl && tl.reversed(reversed)
    }, [reversed, tl])
  }

  private initSuggestAnimated() {
    const [tl, setTl] = this.suggestTimeline
    const [reversed, _] = this.suggestReversed
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const time = gsap
          .timeline()
          .to(".tabBody-main", {
            borderRadius: "0.2rem",
            duration: 0.4,
            ease: "sine.out"
          })
          .to(
            ".suggestBox",
            {
              height: "3.54rem",
              duration: 0.8,
              ease: "sine.inOut"
            },
            "+=0.1"
          )
        // 把时间线实例添加进tl变量中
        setTl(time)
      }, this.mainDom.current)
      return () => ctx.revert()
    }, [])

    useLayoutEffect(() => {
      tl && tl.reversed(reversed)
    }, [reversed, tl])
  }

  private removePreTitle(searchVal: string, event: KeyboardEvent) {
    if (searchVal === "" && event.key === "Backspace") {
      if (this.index === 1) {
        this.index = 0
        this.setPreTitle(false)
      } else {
        this.index = 1
        const time = setTimeout(() => {
          this.index = 0
          clearTimeout(time)
        }, 300)
      }
    }
  }

  private handlerSearchValueShowPreTitle(
    val: string,
    setSearchVal: Dispatch<React.SetStateAction<string>>
  ) {
    if (!this.preTitleReversed[0]) return
    const [_, setSearchEngine] = this.searchEngine
    const regVal = val.match(/.*\s$/gi)
    const engine = getEngine(regVal)
    if (!engine) return
    setSearchEngine(engine)
    this.setPreTitle()
    setSearchVal("")
  }

  private async handlerSuggestShow(value: string) {
    const [searchEngine, _] = this.searchEngine
    const [__, setSuggestList] = this.suggestListData
    if (!value) {
      setSuggestList([])
      this.setSuggest(false)
    }
    if (!searchEngine) return
    const res = await handlerSuggestData(value, searchEngine)
    this.suggestDom.current.resetActive()
    setSuggestList(res)
    this.setSuggest(res.length != 0)
  }

  private openSearchEngine(value: string, event: KeyboardEvent) {
    if (event.key !== "Enter") return
    const isOpen = this.suggestDom.current.openSearch()
    if (isOpen) return
    const [searchEngine, _] = this.searchEngine
    const [showPretitle, __] = this.preTitleReversed
    if (matchUrl(value)) {
      const openUri = handlerNetWorkUrl(value)
      window.open(openUri)
      return
    }

    if (!showPretitle) {
      const url = handlerSearchEngines(searchEngine.searchUrl, value)
      window.open(url)
      return
    }

    window.open(this.defaultEngine + value)
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
