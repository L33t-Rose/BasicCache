type timeUnits = 'd' | 'h' | 'm' | 's' | 'ms';
export class Cache<T>{
  #cacheMap: Map<string, { data: T, _invalidate: void }>;
  constructor() {
    this.#cacheMap = new Map();
  }
  get(key: string) {
    let res = this.#cacheMap.get(key);
    if (!res) {
      return null;
    }
    return res.data;
  }

  private stringToTimelimit(input: string[]): number {
    if (!input) {
      throw new Error("Invalid input");
    }
    let second = 1000;
    let minute = 60 * second;
    let hour = 60 * minute;
    let day = 24 * hour;

    let sum = 0;
    for (let time of input) {
      let unit = time.split(/\d/i).pop();
      if (!unit || ['d', 'h', 'm', 's', 'ms'].indexOf(unit) == -1) {
        throw new Error("Invalid Unit of Time");
      }
      let measure = parseInt(time.split(unit)[0]);
      if (isNaN(measure)) { throw new Error("Not a number") }
      switch (unit) {
        case 'd':
          sum += measure * day;
          break;
        case 'h':
          sum += measure * hour;
          break;
        case 'm':
          sum += measure * minute;
          break;
        case 's':
          sum += measure * second;
          break;
        case 'ms':
          sum += measure;
          break;
        default:
          console.log("ERROR");
      }
    }
    return sum;
  }
  
  set(key: string, data: T, timeLimit: number | Array<`${number}${timeUnits}`> | "infinite" = 60 * 1000) {
    let time: number;
    if (Array.isArray(timeLimit)) {
      time = this.stringToTimelimit(timeLimit);
    }
    else if (timeLimit == "infinite") { time = 0; }
    else { time = timeLimit; }
    
    this.#cacheMap.set(key, {
      data: data,
      _invalidate: (() => {
        if (typeof timeLimit == "string" && timeLimit === "infinite") {
          return;
        }
        console.log("timeLimit", time);
        let c = setTimeout(() => {
          console.log("cache invalidated");
          this.#cacheMap.delete(key);
          clearTimeout(c);
        }, time);
      })()
    })
  }
}