import { initTheme } from "~utils/themeUtils"

import "./index.scss"

const Options: React.FC = () => {
  initTheme()
  return (
    <div className="optionBody">
      <div className="option-content">
        <h2>Simple Tab Options</h2>
        <div className="item-content">
          222222
        </div>
      </div>
    </div>
  )
}

export default Options
