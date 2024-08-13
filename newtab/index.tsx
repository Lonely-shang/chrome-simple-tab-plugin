import { useRef } from "react"

import "./index.scss"
import "../utils/fontSize"

import getBackgroundImg from "~utils/backgroundUtil"

import TabClient from "./tabClient"

function NewTab() {
  const main = useRef<HTMLDivElement>(null)

  const tabClient = new TabClient(main)

  const imageUrl = getBackgroundImg()

  return (
    <div
      className="tabBody"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}>
      <div className="tabBody-wrap" ref={main}>
        <div className="titleLogo">09 : 12 : 59</div>
        <div className="tabBody-main">
          <div className="searchBox">
            <div className="searchBox-title">{tabClient.engineName}</div>
            <input
              type="text"
              spellCheck="false"
              value={tabClient.searchValue}
              placeholder="请输入搜索内容或键入快捷命令"
              onBlur={() => tabClient.setPlaceholderPosition(true)}
              onFocus={() => tabClient.setPlaceholderPosition(false)}
              onKeyDown={(e) => tabClient.handlerSearchKeyDown(e)}
              onChange={(e) => tabClient.handlerSearchValue(e)}
              className={tabClient.getPlaceholderPosition}
            />
          </div>
          <div className="suggestBox">
            <ul className="suggestList">
              {tabClient.getSuggestList.map(item => item)}
              {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <SuggestListItem key={item}  />
              ))} */}
            </ul>
          </div>
        </div>
        {/* <div className="bookMark">
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
          <div className="bookMark-item"></div>
        </div> */}
      </div>
    </div>
  )
}

const SuggestListItem = () => {
  return (
    <li className="suggestList-item">
      <div className="item-left">
        <div>@type/element-plus</div>
        <div className="desc">
          This is ui components This is ui components This is ui components This
          is ui components This is ui components This is ui components
        </div>
      </div>
      <div className="item-right">v1.0.1</div>
    </li>
  )
}

export default NewTab
