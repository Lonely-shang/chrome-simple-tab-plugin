import { forwardRef, useImperativeHandle, useState } from "react"

import SuggestListItem from "./suggestListItem"

export interface SuggestListRef {
  openSearch: () => boolean
  preSuggest: () => void
  nextSuggest: () => void
  resetActive: () => void
}

interface SuggestListProps {
  suggestList: SuggestListItem[]
}

const SuggestList = forwardRef<SuggestListRef, SuggestListProps>(
  (props, ref) => {
    const [active, setActive] = useState<number>(0)

    useImperativeHandle(ref, () => ({ openSearch, nextSuggest, preSuggest, resetActive }))

    const resetActive = () => setActive(0)

    const openSearch = () => {
      const index = active - 1
      if (index < 0) {
        setActive(0)
        return false
      }
      const suggestItem = props.suggestList[index]
      window.open(suggestItem.openUrl)
      setActive(0)
      return true
    }

    const nextSuggest = () => {
      if (active >= props.suggestList.length) return
      setActive(active + 1)
    }

    const preSuggest = () => {
      if (active <= 0) return
      setActive(active - 1)
    }

    return (
      <div className="suggestBox">
        <ul className="suggestList">
          {props.suggestList.map((item, index) => (
            <SuggestListItem
              key={index}
              index={index + 1}
              active={active}
              title={item.title}
              version={item.version}
              openUrl={item.openUrl}
              description={item.description}
            />
          ))}
        </ul>
      </div>
    )
  }
)

export default SuggestList
