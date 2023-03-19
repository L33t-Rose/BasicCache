# Basic Cache Mechanism by Junior Jean

Wanted to play around with implementing my own cache system.
Originally did it in [repl.it](https://replit.com/@L33t-Rose/Cache)

Key Things I want to do:
* I want the ability to choose how long until the cache is invalidated
  * Allow me to choose between a number in milliseconds or as a string (i.e. "1s", "2h", etc)
  * Allow for a specific date and time when the cache can be invalidated
* Leverage Typescript a bit more to provide autocomplete for the keys
  * Maybe I can do this by keeping a list of keys(??)