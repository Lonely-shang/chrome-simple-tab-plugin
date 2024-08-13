import { ParamsType } from "~enum";
import request from "./request"
import { SuggestListItem } from "~components";
const a = typeof SuggestListItem
type HandlerSuggestData = (
  searchVal: string,
  searchEngine: SearchEngine
) => Promise<React.JSX.Element[]>

export const handlerSuggestData: HandlerSuggestData = async (
  searchVal: string,
  searchEngine: SearchEngine
) => {
  const { suggestionsUrl, options} = searchEngine;
  if (!suggestionsUrl || !searchVal) return []
  const method = options.method
  const data = handlerRequestData(options, searchVal)
  const res = await requestData(suggestionsUrl, method, data);
  return res.data.map((el: any, index: number) => {
    return SuggestListItem({title: el.name, description: el.description, version: el.version, openUrl: el.links.npm})
  });
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
