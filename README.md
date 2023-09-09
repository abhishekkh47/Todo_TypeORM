To Run the application locally, execute below commands in you console under the project Directory:

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