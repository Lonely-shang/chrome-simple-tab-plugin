import { ConfigProvider, Segmented } from "antd"
import React, { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import "./index.scss"

import { initTheme, setTheme2Html } from "../utils/themeUtils"

const Popup: React.FC = () => {
  const [theme, setTheme] = useState(null)
  const themeOptions = [
    { label: "明亮", value: "light" },
    { label: "黑暗", value: "dark" },
    { label: "跟随系统", value: "os" }
  ]

  initTheme()

  useEffect(() => {
    chrome.storage.local.get("theme").then((res) => {
      setTheme(res.theme)
    })
  }, [])

  const onChange = (checked: string) => {
    setTheme(checked)
    setTheme2Html(checked)
    sendToBackground({
      name: "update",
      body: {
        theme: checked
      }
    })
  }
  return (
    <>
      <div className="st-popup-body">
        <ConfigProvider theme={{
          components: {
            Segmented: {
              itemColor: 'var(--text-color)',
              itemHoverColor: 'var(--text-color)',
              itemSelectedColor: 'var(--text-color)',
              itemSelectedBg: 'var(--bg-color)',
              trackBg: 'var(--component-bg-color)',
            }
          }
        }}>
        <div>
          <Segmented<string>
            block
            value={theme}
            defaultValue="跟随系统"
            options={themeOptions}
            onChange={(value) => onChange(value)}
          />
        </div>
        </ConfigProvider>
      </div>
      <div className="st-popup-footer">@ 2024 Miliky - 扩展程序选项</div>
    </>
  )
}

export default Popup
