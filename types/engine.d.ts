interface SuggestListItem {
  title: string
  description?: string
  version?: string
  openUrl: string
}

interface NpmResponse {
  name: string
  data: string
  scope: string
  version: string
  description: string
  keywords: string[]
  author?: {
    name?: string
  }
  links: {
    bugs?: string
    homepage?: string
    npm: string
    reponsitory: string
  }
  publisher: {
    username: string
    email: string
  }
  maintainers?: Array<{ username: string; email: string }>
}

interface BingResponse {
  i?: {
    ig: string
  }
  s: IBingSuggestItem[]
}

interface IBingSuggestItem {
  id: string
  bt?: string
  q: string
  t: string
  u: string
  ext?: {
    des?: string
    im?: string
    t?: string
  }
}

interface BilibiliResponse {
  code: number
  exp_str: string
  stoken: string
  result: {
    tag: IBilibiliSuggestItem[]
    [str:string]: any
  }
}

interface IBilibiliSuggestItem {
  name: string
  ref: number
  spid: number
  term: string
  type: string
  value: string
}