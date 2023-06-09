import { Cache } from './Cache';
const test = new Cache<unknown>();

//Took this from somewhere to get fetch working in 
const fetch = (url: RequestInfo, init?: RequestInit) => import("node-fetch").then(({ default: fetch }) => fetch(url, init));

async function fetching() {
  let res = test.get("pikachu");
  if (res == null) {
    console.log("fetching from pokeAPI");
    res = await (await fetch("https://pokeapi.co/api/v2/pokemon/ditto")).json();
    test.set("pikachu", res, ["1h", "10m"]);
  } else {
    console.log("grabbing from cache");
  }
  return res;
}

let a = setInterval(async () => {
  const res = await fetching();
  //console.log(res);
}, 1000);
