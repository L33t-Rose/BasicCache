"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Cache_exports = {};
__export(Cache_exports, {
  Cache: () => Cache
});
module.exports = __toCommonJS(Cache_exports);
class Cache {
  cacheMap;
  constructor() {
    this.cacheMap = /* @__PURE__ */ new Map();
  }
  get(key) {
    let res = this.cacheMap.get(key);
    if (!res) {
      return null;
    }
    return res.data;
  }
  set(key, data) {
    this.cacheMap.set(key, {
      data,
      invalidate: (() => {
        let c = setTimeout(() => {
          console.log("cache invalidated");
          this.cacheMap.delete(key);
          clearTimeout(c);
        }, 10 * 1e3);
      })()
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cache
});
//# sourceMappingURL=Cache.js.map
