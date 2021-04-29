# Robin-Client
Connect to a remote RobinDB server
-----------------------------------------
With RobinDB in the cloud, the sky is the limit. RobinDB features an advanced user permissions system, super fast queries, and is easier to set up than almost any other cloud database. This package is the RobinDB Client. You can find the server [here](npmjs.com/package/robindb-server) and the local version [here](https://npmjs.com/package/robindb).

## How to set up
After connecting, you can use it the same way you would use regular RobinDB.
```js
const { Database } = require('robindb-client');
const db = new Database({
  uri: 'robin://admin:admin@nest.robindb.repl.co' // Connect to the public server
});
db.connect().then(() => {
  db.get('*').then(console.log);
});
```
## Documentation

### `Robin() constructor`
 - `options` - The options object. Required
 - `options.uri` - The URI to connect to. Format is `robin://<username>:<password>@<hostname>`. Required

returns `Promise<Number>`

### `Robin.connect()`
Connect to the database

returns `Promise<Boolean>`

### `Robin.get(key)`
Get a key in the database
 - `key` - The key to get. If getting a key nested inside of objects, use dot notation. Required

returns `Promise<any>`

### `Robin.set(key, value)`
Set a key in the database
 - `key` - The key to set. If setting a key nested inside of objects, use dot notation. Required
 - `value` - The value to set the key to. Required

returns `Promise<Number>`

### `Robin.push(key, value)`
Push a value to an array. The value at the specified key must be an array. Ognom will not create an array for you.
 - `key` - The key of the array to push to. If pushing to a key inside of objects, use dot notation. Required
 - `value` - The value to push to the array. Required

returns `Promise<Number>`

### `Robin.delete(key)`
Delete a key from the database
 - `key` - The key to delete. If deleting a key nested inside of objects, use dot notation. Required

returns `Promise<Number>`


### `Robin.has(key)`
Find if a key exists in the database
 - `key` - The key to look for

returns `Promise<Boolean>`


### `Robin.all()`
Get the entire database


## Important information
This database server was built with [Replit](https://replit.com) in mind, so that's where it's meant to be used. If you're making a larger project, a database such as MongoDB or a SQL database would probably be a better fit.
 

That's it! If you have any questions I'm [YodaLightsabr#6565 on Discord](https://discord.gg/M8YY32acjm).
