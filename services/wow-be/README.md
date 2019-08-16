# WOW BE Service

## Installation

Copy enviroment file

```bash
cp .env.sample .env.development
```

Install npm modules
```bash
npm i
```

Start in watch mode
```bash
npm run start
```

Start in production mode
```bash
npm run build
npm run start:prod
```

## Swagger

Swagger ui is available on

```
http://localhost:3000/swagger
```

## Login 

You can log in to the application using default `marketer` user by executing this CURL request

```bash
curl \
-X POST http://localhost:3000/login \
-d '{"email": "trejgun@gmail.com", "password": "qwerty"}' \
-H "Content-Type: application/json"
```

This will give you JWT token
```bash
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"}
```

Put this token in header of each of your subsequent requests

```bash
curl \
http://localhost:3000/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"
```

This will return your info
```bash
{"id":1,"email":"trejgun@gmail.com","firstName":"Trej","lastName":"Gun","birthday":"1985-12-06","description":"cool guy","phone":"15129554129","parentId":null,"gender":"male","role":"marketer","status":"active","createdAt":"2019-08-16T10:08:48.680Z","updatedAt":"2019-08-16T10:08:48.680Z","avatar":null}
```

## Registration

To create new `influencer` or `marketer` use common registration endpoint
```bash
curl \
-X POST http://localhost:3000/users \
-d '{"email": "influencer@gmail.com", "password": "strongPassw0rd", "firstName": "Influencer", "lastName": "Wow", "role": "influencer", "birthday": "2000-05-05"}' \
-H "Content-Type: application/json"
```


To create `watcher` you have to be logged in as marketer and use special registration endpoint
```bash
curl \
-X POST http://localhost:3000/users/watcher \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyZWpndW5AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTU2NTk0MTkxNSwiZXhwIjoxNTY1OTQxOTc1fQ.R577RR9gZmjAmmCgKdDQN_gHJMInAW7SPJtTOH5HY_c" \
-d '{"email": "watcher@gmail.com", "password": "strongPassw0rd", "firstName": "Watcher", "role": "watcher"}' \
-H "Content-Type: application/json"
```

## Image Upload

If you really want to test image upload you have to have AWS account
Set account keys `AWS_ACCESS_KEY_ID` `AWS_SECRET_ACCESS_KEY` in `.env.sample` then

```bash
bash scripts/env.sh
```

This command will copy `.env.sample` to `.env.development` and `.env.test` for you

Then you can execute this request from the repository root

```bash
curl \
-X POST http://localhost:3000/users/1/avatar \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus" \
-F "avatar=@\"image.png\"" \
-F "description=1234567890" 
```

