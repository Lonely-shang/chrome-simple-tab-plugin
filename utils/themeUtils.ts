
const initTheme = async (listener: boolean = false) => {
  const { theme } = await chrome.storage.local.get('theme')
  const currentTheme = await setTheme2Html(theme)
  addListener(listener)
  return {
    mode: theme,
    currentTheme
  }
}

const addListener = (listener: boolean) => {
  if (listener) {
    matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
      const mode = event.matches ? 'dark' : 'light'
      setTheme2Html(mode)
    })
  }
}

const setTheme2Html = async (theme: string = 'light'): Promise<string> => {
  let _theme = theme
  if (theme === 'os') {
    _theme = matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
  }
  chrome.storage.local.set({theme: theme})
  const html = document.querySelector("html")
  html.dataset.theme = _theme
  return _theme
}


export {
  initTheme,
  setTheme2Html
}