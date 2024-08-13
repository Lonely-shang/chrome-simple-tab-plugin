import { Segmented, Switch } from "antd"
import React from "react"

import "./index.scss"

const Popup: React.FC = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <>
      <div className="st-popup-body">
        {/* <div className="switch-box">
          <div className="switch">
            <PoweroffOutlined />
          </div>
        </div> */}
        <div>
          <Segmented<string>
            block
            defaultValue="跟随系统"
            options={["明亮", "黑暗", "跟随系统"]}
            onChange={(value) => {
              console.log(value) // string
            }}
          />
        </div>
        {/* <div className="formItem">
          <div className="formItem-label">启用加入标签:</div>
          <div className="formItem-content">
            <Switch defaultChecked onChange={onChange} />
          </div>
        </div> */}
      </div>
      <div className="st-popup-footer">@ 2024 Miliky - 扩展程序选项</div>
    </>
  )
}

export default Popup
