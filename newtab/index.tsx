import { useRef } from "react"

import "./index.scss"
import "../utils/fontSize"

import { getPort } from '@plasmohq/messaging/port'
import { SuggestList, TimeClock } from "~components"
import type { SuggestListRef } from "~components/suggestList"
import getBackgroundImg from "~utils/backgroundUtil"

import TabClient from "./tabClient"
import AnimationManager from "./manager/animationManager"

function NewTab() {
  const main = useRef<HTMLDivElement>(null)
  const suggestList = useRef<SuggestListRef>(null)
  const animationManager = new AnimationManager(main)
  const tabClient = new TabClient(animationManager, suggestList)
  // const mailPort = getPort("update")
  const imageUrl = getBackgroundImg()
// chrome.storage.sync.set({
//   item: 1
// })

//   mailPort.onMessage.addListener(msg => {
//     console.log(msg);
    
//   })
//   // chrome.history.search({
//   //   text: ''
//   // })
//   console.log(chrome)
  
// chrome.storage.sync.get("item")
// .then(res => {
//   console.log(res);
  
// })
  
//   chrome.history.search(
//     {
//       text: ""
//     },
//     (results) => {
//       console.log(results)
//     }
//   )

  return (
    <div
      className="tabBody"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}>
      <div className="tabBody-wrap" ref={main}>
        <div className="titleLogo">
          <TimeClock />
        </div>
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
          <SuggestList
            ref={suggestList}
            suggestList={tabClient.getSuggestList}
          />
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

export default NewTab
