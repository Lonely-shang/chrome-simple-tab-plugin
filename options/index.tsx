import autoImage from "data-base64:~assets/images/auto.png"
import darkImage from "data-base64:~assets/images/dark.png"
import lightImage from "data-base64:~assets/images/light.png"

import { initTheme, setTheme2Html } from "~utils/themeUtils"

import "./index.scss"

import { Button, ConfigProvider, Select, Table, Tag, theme, type TableColumnsType } from "antd"
import { useState } from "react"

const Options: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("light")
  const [mode, setMode] = useState<string>("os")

  initTheme(false).then((res) => {
    setMode(res.mode)
    setCurrentTheme(res.currentTheme)
  })

  chrome.storage.onChanged.addListener( async (changes) => {
    if(changes.theme.newValue === mode) return
    setMode(changes.theme.newValue)
    const res = await setTheme2Html(changes.theme.newValue)
    setCurrentTheme(res)
  })

  const changeTheme = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.nodeName !== "IMG") return
    const theme = target.getAttribute("data-theme")
    setMode(theme)
    chrome.storage.local.set({ theme })
  }

  interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

  return (
    <ConfigProvider
    theme={{
      algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
    }}>
      <div className="optionBody">
        <div className="option-content">
          <h2>Simple Tab Options</h2>
          <div
            className="item-content theme-content"
            onClick={(e) => changeTheme(e)}>
            <div
              className={mode === "light" ? "theme-item active" : "theme-item"}
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
          <div className="item-content engine-content">
            <div>搜索引擎</div>
            <div>
              <Select
                placeholder="请选择搜索引擎"
                style={{ width: 200 }}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" }
                ]}
              />
            </div>
          </div>
          <div className="item-content">
            <Table columns={columns} dataSource={data} pagination={false} size="middle" />
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Options
