import { Module } from '@nestjs/common';
import { CourseController } from './course.controller.js';
import { CourseService } from './course.service.js';

// MODULE: groups the controller and service of the "course" feature together.
@Module({
  controllers: [CourseController], // handles incoming routes
  providers: [CourseService], // business logic, injectable into controllers
})
export class CourseModule {}
