
const initTheme = async () => {
  const { theme } = await chrome.storage.local.get('theme')
  setTheme2Html(theme)
  matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
    if (theme !== 'os') {
      return
    }
    const mode = event.matches ? 'dark' : 'light'
    setTheme2Html(mode)
  })
}

const setTheme2Html = async (theme: string = 'light') => {
  let _theme = theme
  if (theme === 'os') {
    _theme = matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
  }
  chrome.storage.local.set({theme: theme})
  const html = document.querySelector("html")
  html.dataset.theme = _theme
}


export {
  initTheme,
  setTheme2Html
}