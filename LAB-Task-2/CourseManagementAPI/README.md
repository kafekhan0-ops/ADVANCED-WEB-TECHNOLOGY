# Lab Task 02 – Course Management REST API (NestJS)

## Run
```bash
npm install
npm run start:dev
```
(If adding to your Lab 01 project instead: copy `src/course/*` and `src/main.ts`, then run
`npm install class-validator class-transformer @nestjs/mapped-types @nestjs/platform-express multer`
and `npm install -D @types/multer @types/express`.)

## Routes
| Method | Route | Description |
|---|---|---|
| GET | /course | Get all courses |
| GET | /course/:id | Get course by ID |
| POST | /course | Create course |
| PUT | /course/:id | Update course (full) |
| PATCH | /course/:id | Update course (partial) |
| DELETE | /course/:id | Delete course |
| POST | /course/:id/upload | Upload material (form-data, key `file`) |

## Postman tests
Valid: POST /course `{"name":"NestJS Fundamentals","code":"CS101","instructor":"John Doe","credits":3}`,
GET /course, GET /course/5, PUT /course/5 (full body), PATCH /course/5 `{"name":"NestJS Advanced"}`,
DELETE /course/5, POST /course/5/upload (form-data `file` = .jpg/.png/.pdf).

Invalid (400): empty name, credits 10, missing fields, extra unknown fields,
upload of .txt/.exe. A file over 2MB is rejected by multer (Nest returns 413 Payload Too Large).
