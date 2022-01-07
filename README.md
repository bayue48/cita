"# cita" 
# cita-api

Simple, easy implementation of the private web API.

## About The Project

API build in [Express.js](https://expressjs.com/) with [MongoDB](https://www.mongodb.com/)

### Prerequisites

- [npm](https://nodejs.org/en/download/)
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/bayue48/cita.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   This will install the dependencies inside `node_modules`

### Environment configuration

Please create database and make the changes in the `.env` file.

```js 
JWT_SECRET=YOUR_JWT_SECRET
MONGO_URI=YOUR_MONGO_URI
PORT=YOUR_APP_PORT
```

### Usage

To run it localy 

```shell
$ npm start
```

To build the Docker image

```shell
$ docker build -t your_app_name .
```

If you want to start it as a container

```shell
$ docker run -p 3000:3000 -d your_docker_image_name
```

Runs the app in the development mode.<br>
Open [http://yourhostname:3000/](http://localhost:3000/) for User Service
And [http://yourhostname:3001/](http://localhost:3001/) for Auth Service

### Endpoint

There is two module for this API:

- [AuthService](https://github.com/bayue48/tree/master/authService), contains API for user authentication,

The user authentication is implemented using [JWT](https://jwt.io/)

```
  POST .../users/auth/login
  POST .../users/auth/register
```

- [UserService](https://github.com/bayue48/tree/master/userService), contains API for user CRUD operation

```
   GET .../users/
   GET .../users/all
   GET .../users/:id
  POST .../users/
 PATCH .../users/
 PATCH .../users/:id
DELETE .../users/
DELETE .../users/:id
```

### Documentation

For more info visit [Postman Documentation](https://documenter.getpostman.com/view/13522642/UVXeqdA9)
Or [Postman Json Documentation](https://www.getpostman.com/collections/dd3439a743a4183e6410)

## Demo User

```
username: admin
password: admin
```

## License

Distributed under the MIT License.
