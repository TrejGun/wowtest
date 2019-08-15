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
http://localhost:3001/swagger
```

## Login 

You can log in to the application using CURL

```bash
curl -X POST http://localhost:3000/api/login -d '{"username": "trejgun@gmail.com", "password": "qwerty"}' -H "Content-Type: application/json"
```

This will give you JWT token
```bash
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"}
```

Put this token in header of your requests to profile

```bash
curl http://localhost:3000/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyZWpndW5AZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE1NjU4NTgwMDUsImV4cCI6MTU2NTg1ODA2NX0.jqfDhj-sSHtOiT41eD0vBuj64lgBg87oGIyJ78c5gus"
```

This will return your info
```bash
{"id":1,"username":"trejgun@gmail.com"}
```
