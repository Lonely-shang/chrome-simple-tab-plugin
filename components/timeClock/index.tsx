import { useEffect, useState } from "react"

import "./index.scss"

const TimeClock: React.FC = () => {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const timeData = () => {
    let currentDate = new Date()
    // 获取当前年份
    let year = currentDate.getFullYear()

    // 获取当前月份
    let month = currentDate.getMonth() + 1

    // 获取当前日期
    let date = currentDate.getDate()

    // 获取当前小时
    let hours = `${currentDate.getHours()}`.padStart(2, "0")

    // 获取当前分钟
    let minutes = `${currentDate.getMinutes()}`.padStart(2, "0")

    // 获取当前秒数
    let seconds = `${currentDate.getSeconds()}`.padStart(2, "0")
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
    requestAnimationFrame(timeData)
  }

  useEffect(() => {
    timeData()
  }, [])

  return (
    <div className="clock">
      <span>{hours}</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
  )
}

export default TimeClock
