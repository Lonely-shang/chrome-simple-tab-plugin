
export const matchUrl = (searchVal: string): boolean => {
  const _copySearchValue = searchVal.trim();
  const reg =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
  const localhostReg = /^(?:http(s)?:\/\/)?localhost:[0-9]*/
  const num = _copySearchValue.search(localhostReg)
  return reg.test(_copySearchValue) || num === 0
}

export const handlerNetWorkUrl = (searchVal: string) => {
  const _copySearchValue = searchVal.trim()
  const reg = /(\S*)\/\//
  const matchVal = _copySearchValue.match(reg)
  if (!matchVal) return `http://${_copySearchValue}`
  const replaceVal = matchVal[0]
  if (replaceVal.indexOf("http") != -1 || replaceVal.indexOf("https") != -1) {
    return _copySearchValue
  }
  return _copySearchValue.replace(replaceVal, "http://")
}

export const handlerSearchEngines = (enginesUrl: string, searchVal: string): string => {
  return enginesUrl.replace('{query}', searchVal)
}