# React Express Mysql RESTFUL API
 
## Get Started

#### 1. Install React Dependencies

On the command prompt run the following commands
```
$ git clone https://github.com/dpoarch/React-Express-Mysql-RESTFUL-API.git

$ cd React-Express-Mysql-RESTFUL-API/views

$ npm install

$ npm start

```

port runs at localhost:
```

http://localhost:3000

```

#### 2. Configure Database Connection

Edit secret.js file in backend folder

```

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user :  'root',
    password :  '',
    database :  'video_url',
});
module.exports = connection;

```
configure your database connection


#### 3. Install Node Server Dependencies


Run the following command

```

$ npm install

$ node server.js

```
localhost server runs at port 3002

```

http://localhost:3002

```
