import { ParamsType } from "~enum"

const searchEngineData: Array<SearchEngine> = [
  {
    keyword: "wiki",
    title: "Wikipedia",
    searchUrl: "https://en.wikipedia.org/wiki/Special:Search/{query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "baidu",
    title: "Baidu",
    searchUrl: "http://www.baidu.com/s?wd={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "bing",
    title: "Bing",
    searchUrl: "http://www.bing.com/search?q={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "google",
    title: "Google",
    searchUrl: "http://www.google.com/search?q={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "stack",
    title: "Stack Overflow",
    searchUrl:
      "https://www.google.com/search?q=site%3Astackoverflow.com%20{query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "gmap",
    title: "Google Maps",
    searchUrl: "http://maps.google.com/?q={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "bmap",
    title: "Baidu Map",
    searchUrl:
      "https://map.baidu.com/search?querytype=s&da_src=shareurl&wd={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "youtube",
    title: "Youtube",
    searchUrl: "https://www.youtube.com/results?search_query={query}",
    suggestionsUrl:
      "https://suggestqueries-clients6.youtube.com/complete/search",
    options: {
      method: "get",
      title: "name",
      version: null,
      description: null,
      data: {
        client: "youtube",
        hl: "zh-cn",
        gl: "us",
        gs_rn: 64,
        gs_ri: "youtube",
        ds: "yt",
        cp: ParamsType.KEYWORDLEN,
        // gs_id: "6g",
        q: ParamsType.KEYWORD,
        xhr: "t",
        xssi: "t"
      }
    }
  },
  {
    keyword: "bilibili",
    title: "BiliBili",
    searchUrl: "https://search.bilibili.com/all?keyword={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "maven",
    title: "Maven",
    searchUrl: "https://mvnrepository.com/search?q={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "npm",
    title: "NPM",
    searchUrl: "https://www.npmjs.com/search?q={query}",
    suggestionsUrl: "https://www.npmjs.com/search/suggestions",
    options: {
      method: "get",
      title: "name",
      version: "version",
      description: "description",
      data: {
        q: ParamsType.KEYWORD
      }
    }
  }
]

type GetEngine = (value?: RegExpMatchArray) => SearchEngine | undefined

const getEngine: GetEngine = (value?: RegExpMatchArray) => {
  if (!value) return undefined
  const val = value[0].trim()
  return searchEngineData.find((item) => item.keyword == val)
}

export { getEngine }
