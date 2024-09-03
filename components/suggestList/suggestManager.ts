import { useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type { SuggestListRef } from ".";
import type AnimationManager from "~newtab/manager/animationManager";
import { handlerSuggestData } from "~utils/suggestUtil";

class SuggestManager {
  private dom: MutableRefObject<SuggestListRef>
  private animationManager: AnimationManager

  private suggestListData = useState<SuggestListItem[]>([])

  constructor (
    suggestListDom: MutableRefObject<SuggestListRef>,
    animationManager?: AnimationManager
  ) {
    this.dom = suggestListDom
    this.animationManager = animationManager
  }

  preItem () {
    this.dom.current.preSuggest()
  }

  nextItem () {
    this.dom.current.nextSuggest()
  }

  openState (): boolean {
    return this.dom.current.openSearch()
  }

  resetSelected() {
    this.dom.current.resetActive()
  }

  get suggestList () {
    return this.suggestListData[0]
  }

  set setSuggestList (suggestList: SuggestListItem[]) {
    const [__, setSuggestList] = this.suggestListData
    this.dom.current.resetActive()
    setSuggestList(suggestList)
    this.animationManager.setSuggestStatus(suggestList.length != 0)
  }

  async getSuggestList (value: string, engine: [SearchEngine, Dispatch<SetStateAction<SearchEngine>>]): Promise<null> {
    const [searchEngine, _] = engine
    const [__, setSuggestList] = this.suggestListData
    if (!value) {
      setSuggestList([])
      this.animationManager.setSuggestStatus(false)
    }
    if (!searchEngine) return
    const res = await handlerSuggestData(value, searchEngine)
    this.dom.current.resetActive()
    setSuggestList(res)
    this.animationManager.setSuggestStatus(res.length != 0)
    return null
  }

}

export default SuggestManager
