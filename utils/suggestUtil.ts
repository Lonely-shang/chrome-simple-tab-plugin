import { EngineType, ParamsType } from "../enum"

import request from "./request"
import { handlerSearchEngines } from "./urlUtils"
import { escape } from "querystring"

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
  data: any
): SuggestListItem[] => {
  switch (searchEngine.engineType) {
    case EngineType.GOOGLE:
      return hanlderGoogleResponse(<string>data, searchEngine.searchUrl)
    case EngineType.NPM:
      return handlerNpmResponse(<Array<NpmResponse>>data, searchEngine.openSuggestUrl)
    case EngineType.BING:
      return handlerBingResponse(<BingResponse>data, searchEngine.openSuggestUrl)
    case EngineType.BILIBILI:
      return handlerBilibiliResponse(<BilibiliResponse>data, searchEngine.searchUrl)
    case EngineType.KAIFABAIDU:
      return handlerKaifaBaiduResponse(<KaifaBaiduResponse>data, searchEngine.searchUrl)
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

const handlerNpmResponse = (res: NpmResponse[], searchUrl: string): SuggestListItem[] => {
  return res.map((item) => {
    return {
      title: item.name,
      version: `v${item.version}`,
      description: item.description,
      openUrl: `${searchUrl}${item.name}`
    }
  })
}


const handlerBingResponse = (res: BingResponse, searchUrl: string): SuggestListItem[] => {
  return res.s.map(item => {
    return {
      title: item.q.replace(/[^\u4e00-\u9fa5a-zA-Z\s]/g, ''),
      version: null,
      description: null,
      openUrl: `${searchUrl}${item.u}`
    }
  })
}

const handlerBilibiliResponse = (res: BilibiliResponse, searchUrl: string): SuggestListItem[] => {
  return res.result.tag.map(item => {
    const title = item.value
    return {
      title,
      description: null,
      version: null,
      openUrl: handlerSearchEngines(searchUrl, title)
    }
  })
}

const handlerKaifaBaiduResponse = (res: KaifaBaiduResponse, searchUrl: string): SuggestListItem[] => {
  return res.data.map(item => {
    return {
      title: item,
      description: null,
      version: null,
      openUrl: handlerSearchEngines(searchUrl, item)
    }
  })
}