import { SuggestListItem } from "~components"
import { EngineType, ParamsType } from "../enum"

import request from "./request"
import { handlerSearchEngines } from "./urlUtils"

type HandlerSuggestData = (
  searchVal: string,
  searchEngine: SearchEngine
) => Promise<SuggestListItem[]>

export const handlerSuggestData: HandlerSuggestData = async (
  searchVal: string,
  searchEngine: SearchEngine
) => {
  const { suggestionsUrl, options } = searchEngine
  if (!suggestionsUrl || !searchVal.trim()) return []
  const method = options.method
  const data = handlerRequestData(options, searchVal)
  const res = await requestData(suggestionsUrl, method, data)
  return hanlderResponse(searchVal, searchEngine, res.data)
  // return resData.map((el: any) => {
  //   return SuggestListItem({
  //     title: el.title,
  //     description: el.description,
  //     version: el.version,
  //     openUrl: el.openUrl
  //   })
  // })
}

const requestData = async (
  suggestionsUrl: string,
  method: string,
  data: any
) => {
  return await request({
    url: suggestionsUrl,
    method,
    data: method.toUpperCase() == "POST" ? data : undefined,
    params: method.toUpperCase() == "GET" ? data : undefined
  })
}

const handlerRequestData = (
  options: SearchEngineOptions,
  searchVal: string
) => {
  const data = {}
  for (const [key, value] of Object.entries(options.data)) {
    switch (value) {
      case ParamsType.KEYWORD:
        data[key] = searchVal
        break
      case ParamsType.KEYWORDLEN:
        data[key] = searchVal.length
        break
      default:
        data[key] = value
        break
    }
  }
  return data
}

const hanlderResponse = (
  value: string,
  searchEngine: SearchEngine,
  data: Array<any> | string
): SuggestListItem[] => {
  switch (searchEngine.engineType) {
    case EngineType.GOOGLE:
      return hanlderGoogleResponse(<string>data, searchEngine.searchUrl)
    case EngineType.NPM:
      return handlerNpmResponse(<Array<any>>data, searchEngine.openSuggestUrl)
    case EngineType.BING:
      return handlerBingResponse(<Array<any>>data, searchEngine.openSuggestUrl)
    default:
      return []
  }
}

const hanlderGoogleResponse = (res: string, searchUrl: string) : SuggestListItem[] => {
  const _res = JSON.parse(res.slice(4, res.length))
  const resData = Array.isArray(_res[0]) ? _res[0] : _res[1]
  return resData.map((item: any[]) => {
    const title = item[0]
    return {
      title,
      description: null,
      version: null,
      openUrl: handlerSearchEngines(searchUrl, title)
    }
  })
}

const handlerNpmResponse = (res: any[], searchUrl: string): SuggestListItem[] => {
  const _res = res as NpmResponse[]
  return _res.map((item) => {
    return {
      title: item.name,
      version: item.version,
      description: item.description,
      openUrl: `${searchUrl}${item.name}`
    }
  })
}


const handlerBingResponse = (res: any, searchUrl: string): SuggestListItem[] => {
  const _res = res as BingResponse
  return _res.s.map(item => {
    return {
      title: item.q.replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, ''),
      version: null,
      description: null,
      openUrl: `${searchUrl}${item.u}`
    }
  })
}