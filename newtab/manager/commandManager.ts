import type { Dispatch } from "react"

import type AnimationManager from "./animationManager"

class CommandManager {
  private animationManager: AnimationManager

  constructor(animationManager: AnimationManager) {}

  async getSearchCommand(
    searchVal: string,
    setSearchVal: Dispatch<React.SetStateAction<string>>
  ): Promise<SuggestListItem[]> {
    if (searchVal == ">h") {
      const res = await chrome.history.search({ text: "", maxResults: 50 })
      return res.map<SuggestListItem>((item) => {
        return {
          title: item.title,
          openUrl: item.url,
          version: this.timestampFormat(item.lastVisitTime)
        }
      })
    }
    return []
  }

  timestampFormat(timestamp?: number) {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}/${month}/${day}`
  }
}

export default CommandManager
