const { URL } = require('url');
const fetch = require('node-fetch');
class Database {
  constructor (options) {
    if (!options) throw new Error('You must include an options object.');
    if (!options.uri) throw new Error('You must include a database URI.');
    var url = new URL(options.uri);
    this.hostname = url.hostname;
    this.username = url.username;
    this.password = url.password;
    this.autoconnect = options.autoconnect || false;
    if (this.autoconnect === true) {
      this.connect();
    }
  }
  connect () {
    return new Promise((resolve, reject) => {
      fetch('https://' + this.hostname + '/connect', {
        method: 'POST',
        headers: {
          username: this.username,
          password: this.password
        }
      }).then(a => a.text()).then(a => {
        if (a == 'OK') {
          this.connected = true;
          return resolve(true);
        }
        reject(false);
      });
    });
  }
  get (key) {
    return new Promise(async (resolve, reject) => {
      if (this.autoconnect === true && this.connected === false) await this.connect();
      if (this.connected === false) return reject('Cannot run database querries before connected');
      fetch('https://' + this.hostname + '/get/' + key, {
        method: 'POST',
        headers: {
          username: this.username,
          password: this.password
        }
      }).then(a => a.json()).then(resolve);
    });
  }
  set (key, value) {
    return new Promise(async (resolve, reject) => {
      if (this.autoconnect === true && this.connected === false) await this.connect();
      if (this.connected === false) return reject('Cannot run database querries before connected');
      fetch('https://' + this.hostname + '/set/' + key, {
        method: 'POST',
        headers: {
          username: this.username,
          password: this.password,
          'content-type': 'application/json'
        },
        body: JSON.stringify({value:value})
      }).then(a => a.json()).then(resolve);
    });
  }
  push (key, value) {
    return new Promise(async (resolve, reject) => {
      if (this.autoconnect === true && this.connected === false) await this.connect();
      if (this.connected === false) return reject('Cannot run database querries before connected');
      fetch('https://' + this.hostname + '/push/' + key, {
        method: 'POST',
        headers: {
          username: this.username,
          password: this.password,
          'content-type': 'application/json'
        },
        body: JSON.stringify({value:value})
      }).then(a => a.json()).then(resolve);
    });
  }
  delete (key) {
    return new Promise(async (resolve, reject) => {
      if (this.autoconnect === true && this.connected === false) await this.connect();
      if (this.connected === false) return reject('Cannot run database querries before connected');
      fetch('https://' + this.hostname + '/delete/' + key, {
        method: 'POST',
        headers: {
          username: this.username,
          password: this.password
        }
      }).then(a => a.json()).then(resolve);
    });
  }
}
module.exports = {
  Database: Database
}
