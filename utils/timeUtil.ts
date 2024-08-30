import { useState } from "react"

const [time, setTime] = useState("")

export const getTimeData = () => time

export const timeData = () => {
  let currentDate = new Date()
  // 获取当前年份
  let year = currentDate.getFullYear()

  // 获取当前月份
  let month = currentDate.getMonth() + 1

  // 获取当前日期
  let date = currentDate.getDate()

  // 获取当前小时
  let hours = currentDate.getHours()

  // 获取当前分钟
  let minutes = currentDate.getMinutes()

  // 获取当前秒数
  let seconds = currentDate.getSeconds()
  setTime(`${hours}:${minutes}:${seconds}`)
  requestAnimationFrame(timeData)
}
