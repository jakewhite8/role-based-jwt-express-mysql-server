# major-manager-server
 


## Project setup
```
npm install
```

* Create a file /src/config/db.config.js that exports a json object with the following database information: 
```
module.exports = {
  HOST: 'localhost',
  DB: <database-name>,
  USER: <username>,
  PASSWORD: <password>,
  PORT: <port default is set to 3306>
};

```
* Create a file /src/config/auth.config.js that exports a json object with a secret key used by jsonwebtokens to create an access token
```
module.exports = {
  secret: '<secret-key>',
};

```

### Run
```
npm start
```
### Test
```
npm run test
```
### Linter
```
npm run lint
```
