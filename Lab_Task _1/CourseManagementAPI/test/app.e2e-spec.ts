import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';



describe('CourseManagementAPI (e2e)', () => {
  let app: INestApplication<App>;

 
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

 
  it('GET / should return Hello World!', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  it('GET /course should return all courses message', () => {
    return request(app.getHttpServer())
      .get('/course')
      .expect(200)
      .expect('All courses retrieved successfully');
  });


  it('GET /course/:id should return the course with that id', () => {
    return request(app.getHttpServer())
      .get('/course/5')
      .expect(200)
      .expect('Course with ID 5 retrieved successfully');
  });

 
  it('POST /course should create a course', () => {
    return request(app.getHttpServer())
      .post('/course')
      .expect(201)
      .expect('Course created successfully');
  });


  it('PUT /course/:id should update the course', () => {
    return request(app.getHttpServer())
      .put('/course/5')
      .expect(200)
      .expect('Course with ID 5 updated successfully');
  });


  it('DELETE /course/:id should delete the course', () => {
    return request(app.getHttpServer())
      .delete('/course/5')
      .expect(200)
      .expect('Course with ID 5 deleted successfully');
  });

  
  afterEach(async () => {
    await app.close();
  });
});
