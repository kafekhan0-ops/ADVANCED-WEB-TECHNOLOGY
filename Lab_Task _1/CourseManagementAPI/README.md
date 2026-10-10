# CourseManagementAPI

Lab Task 01 — Course Management REST API built with NestJS (Module → Controller → Service).

## Run

```bash
npm install
npm run start:dev
```

Open http://localhost:3000

## Routes (all return plain strings from the Service layer)

| Method | Route         | Response                                  |
|--------|---------------|-------------------------------------------|
| GET    | /             | Hello World!                              |
| GET    | /course       | All courses retrieved successfully        |
| GET    | /course/:id   | Course with ID :id retrieved successfully |
| POST   | /course       | Course created successfully               |
| PUT    | /course/:id   | Course with ID :id updated successfully   |
| DELETE | /course/:id   | Course with ID :id deleted successfully   |
