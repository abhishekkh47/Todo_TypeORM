# To Run the application locally, execute below commands in you console under the project Directory:

1. Install the required node modules
> npm i

2. Create a ".env" file in root directory of you project having below values:
    SECRET="thisisarandomsecretforjwttoken"
    DB_PORT=5432
    DB_USERNAME=<db_username>
    DB_PASSWORD=<db_password>
    PORT=3000

3. Run the below command to start your server and you are good to go
> npm start

=============================================================================

## API Endpoints

### USER AUTHENTICATION 

- POST /user/signup: Create a new User.
    > This will be having below 'Request Body'
    ```
    {
        "email":"test1@gmail.com",
        "password":"testuser1s@Af"
    }
    ```

- POST /user/login: Login existing User.
    > This will be having below 'Request Body'
    ```
    {
        "email":"test1@gmail.com",
        "password":"testuser1s@Af"
    }
    ```


### TODO Application
*All of the below endpoints will be having an authentication header 'authorization' containing a bearer token generated from the user login endpoint*

- GET /todos: Retrieve a list of all Todo items.

- GET /todos/:id: Retrieve a specific Todo item by ID.

- POST /todos: Create a new Todo item.
    > This will be having below 'Request Body'
    ```
    {
    "title":"todo1",
    "description": "test todo",
    "status":"pending"
    }
    ```

- PUT /todos/:id: Update an existing Todo item.
    > This will be having below 'Request Body'
    ```
    {
    "title":"todo1",
    "description": "test todo",
    "status":"pending"
    }
    ```
    
- DELETE /todos/:id: Delete a Todo item.
