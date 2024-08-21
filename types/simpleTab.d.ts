
interface IHPImageArchive {
  images: Array<IImageItem>
  tooltips: ITooltips
}

interface IImageItem {
  bot: number
  copyright: string
  copyrightlink: string
  drk: number
  enddate: string
  fullstartdate: string
  hs: Array<any>
  hsh: string
  quiz: string
  startdate: string
  title: string
  top: number
  url: string
  urlbase: string
  wp: boolean
}

interface ITooltips {
  loading: string
  next: string
  previous: string
  walle: string
  walls: string
}

interface SearchEngine {
  keyword: string
  title: string
  searchUrl: string
  engineType?: EngineType | null
  suggestionsUrl?: string | null
  openSuggestUrl?: string | null
  options: SearchEngineOptions | null
}

interface SearchEngineOptions {
  method: string
  data: {
    [key: string]: ParamsType | string | number | boolean
  }
}
