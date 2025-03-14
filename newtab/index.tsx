import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Drawer } from "antd"

import "./index.scss"
import "../utils/fontSize"

// import { getPort } from '@plasmohq/messaging/port'
import { Background, SuggestList, TimeClock } from "~components"
import type { SuggestListRef } from "~components/suggestList"
import getBackgroundImg from "~utils/backgroundUtil"

import TabClient from "./tabClient"
import AnimationManager from "./manager/animationManager"
import SuggestManager from "~components/suggestList/suggestManager"
import { initTheme } from "~utils/themeUtils"

function NewTab() {
  const main = useRef<HTMLDivElement>(null)
  const suggestList = useRef<SuggestListRef>(null)
  const animationManager = new AnimationManager(main)
  const suggestManager = new SuggestManager(suggestList, animationManager)
  const tabClient = new TabClient(animationManager, suggestManager)

  initTheme(true)
  const imageUrl = getBackgroundImg()

  const [open, setOpen] = useState(false)

  // chrome.storage.onChanged.addListener((changes) => {
  //   console.log(changes);
  //   if (!changes.theme) return
  //   setTheme2Html(changes.theme.newValue)
  // })

  // mailPort.onMessage.addListener((res) => {
  //   setTheme2Html(res.theme)
  // })

  return (
    <div className="tabBody">
      <Background imageUrl={imageUrl}></Background>
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
            suggestList={suggestManager.suggestList}
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
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default NewTab
