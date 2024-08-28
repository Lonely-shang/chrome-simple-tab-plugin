const config = require('./config.json')

const configs = {
  theme: 0,
  engineList: []
}

const initConfig = () => {
  console.log(config);
}

class Config {
  num: number = 0
  constructor () {

  }

  
  set value(v : number) {
    this.num = v;
  }
  

  
  public get value() : number {
    return this.num
  }
  

}

const configL = new Config()

export {
  initConfig,
  configL
}