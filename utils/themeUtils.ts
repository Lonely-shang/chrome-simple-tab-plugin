const initTheme = async (listener: boolean = false) => {
  const { theme } = await chrome.storage.local.get("theme")
  const currentTheme = await setTheme2Html(theme)
  addListener(listener)
  return {
    mode: theme,
    currentTheme
  }
}

const addListener = (listener: boolean) => {
  if (listener) {
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      (event) => {
        const mode = event.matches ? "dark" : "light"
        setTheme2Html(mode)
      }
    )
  }
}

const setTheme2Html = async (theme: string = "light"): Promise<string> => {
  let _theme = theme
  if (theme === "os") {
    _theme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  chrome.storage.local.set({ theme: theme })
  const html = document.querySelector("html")
  html.dataset.theme = _theme
  return _theme
}

function analyzeCanvasTheme(canvas: HTMLCanvasElement, options: {
  sampleStep?: number
  minSamples?: number
  threshold?: number
}) {
  const {
    sampleStep = 4, // 取样间隔
    minSamples = 1000, // 最小采样数
    threshold = 128 // 默认阈值
  } = options

  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("无法获取Canvas上下文")

  try {
    const { width, height } = canvas
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    // 自动计算取样间隔
    const totalPixels = width * height
    const step = Math.max(1, Math.sqrt(totalPixels / minSamples)) | 0

    let total = 0,
      count = 0
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        total += 0.299 * r + 0.587 * g + 0.114 * b
        count++
      }
    }
    return total / count > threshold ? "light" : "dark"
  } catch (e) {
    console.error("图像分析失败:", e)
    return "light" // 默认回退
  }
}

export { initTheme, setTheme2Html, analyzeCanvasTheme }
