import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react"

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
    const suggestList = useRef<HTMLUListElement>(null)
    const [active, setActive] = useState<number>(0)

    useImperativeHandle(ref, () => ({
      openSearch,
      nextSuggest,
      preSuggest,
      resetActive
    }))

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
      let _active = active + 1
      if (_active > props.suggestList.length) _active = 0
      setActive(_active)
      moveItemPosition(_active)
    }

    const preSuggest = () => {
      let _active = active - 1
      if (_active < 0) _active = props.suggestList.length
      setActive(_active)
      moveItemPosition(_active)
    }

    const moveItemPosition = (index: number) => {
      if (index == 0) {
        suggestList.current.scrollTop = 0
        return
      }
      if (index == props.suggestList.length) {
        suggestList.current.scrollTop = 10000
        return
      }
      document.querySelector(".actived").scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      })
    }

    return (
      <div className="suggestBox">
        <ul className="suggestList" ref={suggestList}>
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
