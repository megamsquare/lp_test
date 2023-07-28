### Setup and installation
Make sure you have your docker running, because this api runs on Docker for database and environment control.

To initialize this API, run

```bash
docker-compose up -d
```

it will run on http://localhost:3001

## API Endpoints

### POST /api/v1/auth/register

Create a user

#### Request

- Method: POST
- Path: /api/v1/auth/register
- Request Body: The user name and password is requested

Example of Request body:
{
    "firstName": "User",
    "lastName": "Testing",
    "email": "example@email.com"
    "username": "user",
    "password": "user"
}

Response

Status Code: 201 (CREATED)

### POST /api/v1/auth/login

Login user

#### Request

- Method: POST
- Path: /api/v1/auth/login
- Request Body: The user name and password is requested

Example of Request body:
{
    "username": "user",
    "password": "user"
}

Response

Status Code: 201 (CREATED)
Response Body: This will return an accessToken which user will use to access create/update/delete of post.

### POST /api/v1/user/updateUser/:id

Update User information

#### Request

- Method: POST
- Path: /api/v1/user/updateUser/:id
- Request Body: The login user with token can update his/her informtion by passing authorization to headern and the request body

Example of Request body:
{
    "firstName": "User",
    "lastName": "Testing",
    "email": "example@email.com"
    "username": "user"
}

Response

Status Code: 200 (OK)
Response Body: This will return the information of the updated user.

### GET /api/v1/user/getAll

Users list request

#### Request

- Method: GET
- Path: /api/v1/user
- Request Body: The login admin with token can request for list of user informtion by passing authorization to headern

Example of Request body:
None

Response

Status Code: 200 (OK)
Response Body: This will return the list of users in the system.

### GET /api/v1/user/getById/:id

Get User by blog id

#### Request

- Method: GET
- Path: /api/v1/user/getById/:id
- Request Body: This gets the user id in the parameter

Example of Request body:
NONE

Response

Status Code: 200 (OK)
Response Body: This will return user information that belong to the user id passed in the parameter.

### PUT /api/v1/blog/:id

Login user Updates Blog by blog id


- Method: POST
- Path: /api/v1/blog/:id
- Request Body: This gets the blog id in the parameter

Example of Request body:
NONE

Response

Status Code: 200 (OK)
Response Body: This will return blog information that belong to the id passed in the parameter.

### Testing
To test, you need to run the below syntax in your terminal:

```bash
npm test
```

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- Http-status
- Typescript
- Jest
- Cors
- Supertest
- Ts-node
- Swagger

### Stop Project
To stop the project, you can run the below command in the terminal.

```bash
docker-compose down
```

- Note:The test only runs for register and login user,  