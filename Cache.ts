export class Cache<T>{
  cacheMap: Map<string, { data: T, invalidate: void }>;
  constructor() {
    this.cacheMap = new Map();
  }
  get(key: string) {
    let res = this.cacheMap.get(key);
    if (!res) {
      return null;
    }
    return res.data;
  }

  set(key: string, data: T) {
    this.cacheMap.set(key, {
      data: data,
      invalidate: (() => {
        let c = setTimeout(() => {
          console.log("cache invalidated");
          this.cacheMap.delete(key);
          clearTimeout(c);
        }, 10 * 1000);
      })()
    })
  }
}