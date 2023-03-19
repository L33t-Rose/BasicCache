"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_Cache = require("./Cache");
const test = new import_Cache.Cache();
const fetch = (url, init) => import("node-fetch").then(({ default: fetch2 }) => fetch2(url, init));
async function fetching() {
  let res = test.get("pikachu");
  if (res == null) {
    console.log("fetching from pokeAPI");
    res = await (await fetch("https://pokeapi.co/api/v2/pokemon/ditto")).json();
    test.set("pikachu", res);
  }
  return res;
}
let a = setInterval(async () => {
  const res = await fetching();
  console.log(res);
  if (res == null) {
    console.log("cache invalidated");
    clearInterval(a);
  }
}, 1e3);
//# sourceMappingURL=index.js.map
