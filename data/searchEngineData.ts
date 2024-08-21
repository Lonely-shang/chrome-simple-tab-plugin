import { EngineType, ParamsType } from "~enum"

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
    engineType: EngineType.BING,
    searchUrl: "http://www.bing.com/search?q={query}",
    suggestionsUrl: "https://www.bing.com/AS/Suggestions",
    openSuggestUrl: "https://www.bing.com/",
    options: {
      method: "get",
      data: {
        pt: "page.home",
        scope: "web",
        mkt: "zh-cn",
        qry: ParamsType.KEYWORD,
        cp: ParamsType.KEYWORDLEN,
        csr: 1,
        msbqf: false,
        cvid: "72AB655B80CE480A8DC15FE59A31791A"
      }
    }
  },
  {
    keyword: "google",
    title: "Google",
    engineType: EngineType.GOOGLE,
    searchUrl: "http://www.google.com/search?q={query}",
    suggestionsUrl: "https://www.google.com/complete/search",
    options: {
      method: "get",
      data: {
        q: ParamsType.KEYWORD,
        cp: ParamsType.KEYWORDLEN,
        client: "gws-wiz",
        xssi: "t",
        gs_pcrt: undefined,
        hl: "zh-CN",
        authuser: 0,
        psi: "qhK8Zqe-JLCt0PEP5p6dwA0.1723601579143",
        dpr: 1,
        pq: null
      }
    }
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
    engineType: EngineType.GOOGLE,
    searchUrl: "https://www.youtube.com/results?search_query={query}",
    suggestionsUrl:
      "https://suggestqueries-clients6.youtube.com/complete/search",
    options: {
      method: "get",
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
    engineType: EngineType.NPM,
    searchUrl: "https://www.npmjs.com/search?q={query}",
    suggestionsUrl: "https://www.npmjs.com/search/suggestions",
    openSuggestUrl: "https://www.npmjs.com/package/",
    options: {
      method: "get",
      data: {
        q: ParamsType.KEYWORD
      }
    }
  },
  {
    keyword: "mdn",
    title: "MDN",
    searchUrl: "https://developer.mozilla.org/en-US/search?q={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "juejin",
    title: "稀土掘金",
    searchUrl: "https://juejin.cn/search?query={query}",
    suggestionsUrl: null,
    options: null
  },
  {
    keyword: "github",
    title: "GitHub",
    searchUrl: "https://github.com/search?q={query}&type=repositories",
    suggestionsUrl: null,
    options: null
  }
]

type GetEngine = (value?: RegExpMatchArray) => SearchEngine | undefined

const getEngine: GetEngine = (value?: RegExpMatchArray) => {
  if (!value) return undefined
  const val = value[0].trim()
  return searchEngineData.find((item) => item.keyword == val)
}

export { getEngine }
