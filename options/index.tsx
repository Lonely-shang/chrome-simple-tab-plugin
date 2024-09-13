import autoImage from "data-base64:~assets/images/auto.png"
import darkImage from "data-base64:~assets/images/dark.png"
import lightImage from "data-base64:~assets/images/light.png"

import { initTheme, setTheme2Html } from "~utils/themeUtils"

import "./index.scss"

import { ConfigProvider, Input, Select, theme } from "antd"
import logo from "data-base64:~assets/icon.png"
import { useEffect, useState } from "react"
import { saveConfig } from "~config/config"


const Options: React.FC = () => {
  const [mode, setMode] = useState<string>("os")
  const [engineList, setEngineList] = useState<any[]>([])
  const [currentEngine, setCurrentEngine] = useState<string>("")
  const [currentTheme, setCurrentTheme] = useState<string>("light")

  initTheme(false).then((res) => {
    setMode(res.mode)
    setCurrentTheme(res.currentTheme)
  })

  useEffect(() => {
    chrome.storage.local.get(["engineList", "defaultEngine"], (res) => {
      setEngineList(res.engineList)
      setCurrentEngine(res.defaultEngine)
    })
  }, [])

  chrome.storage.onChanged.addListener(async (changes) => {
    if (!changes.theme || changes.theme.newValue === mode) return
    setMode(changes.theme.newValue)
    const res = await setTheme2Html(changes.theme.newValue)
    setCurrentTheme(res)
  })

  const changeTheme = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.nodeName !== "IMG") return
    const theme = target.getAttribute("data-theme")
    setMode(theme)
    saveConfig({ theme })
  }

  const changeEngine = (value: string) => {
    setCurrentEngine(value)
    saveConfig({ defaultEngine: value })
  }

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
    const keyword = e.target.value
    const newEngineList = engineList.map((item) => {
      if (item.title === title) {
        return { ...item, keyword }
      }
      return item
    })
    // setEngineList(newEngineList)
    saveConfig({ engineList: newEngineList })
  }
  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}>
      <div className="optionBody">
        <div className="option-header">
          <img src={logo} alt="logo" />
          <span>Simple Tab</span>
        </div>
        <div className="option-content">
          <div className="item-content">
            <div className="item-title">主题设置</div>
            <div className="theme-content" onClick={(e) => changeTheme(e)}>
              <div
                className={
                  mode === "light" ? "theme-item active" : "theme-item"
                }
                data-theme="light">
                <img src={lightImage} alt="light" data-theme="light" />
              </div>
              <div
                className={mode === "dark" ? "theme-item active" : "theme-item"}
                data-theme="dark">
                <img src={darkImage} alt="dark" data-theme="dark" />
              </div>
              <div
                className={mode === "os" ? "theme-item active" : "theme-item"}
                data-theme="os">
                <img src={autoImage} alt="os" data-theme="os" />
              </div>
            </div>
          </div>
          <div className="item-content">
            <div className="item-title">引擎设置</div>
            <div className="engine-content">
              <div>默认搜索引擎</div>
              <div>
                <Select
                  size="large"
                  placeholder="请选择搜索引擎"
                  style={{ width: 200 }}
                  value={currentEngine}
                  dropdownStyle={{ textAlign: 'center' }}
                  onChange={(value) => changeEngine(value)}
                  options={engineList.map((item) => ({
                    value: item.searchUrl,
                    label: item.title
                  }))}
                />
              </div>
            </div>
          </div>
          <div className="item-content">
            <div className="item-title">快捷指令</div>
            <ul className="engine-list">
              {engineList.map((item) => (
                <li key={item.keyword}>
                  <div>{item.title}</div>
                  <div>
                    <Input
                      spellCheck="false"
                      defaultValue={item.searchUrl}
                      disabled={true}
                      size="large"
                    />
                  </div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div>
                    <Input
                      spellCheck="false"
                      defaultValue={item.keyword}
                      size="large"
                      style={{ textAlign: 'center' }}
                      onChange={(e) => changeKeyword(e, item.title)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Options
