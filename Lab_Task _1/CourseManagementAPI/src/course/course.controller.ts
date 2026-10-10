import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseService } from './course.service.js';

// CONTROLLER LAYER: only handles routes (HTTP requests).
// It contains NO business logic - it just calls the service.
// @Controller('course') makes every route start with /course
@Controller('course')
export class CourseController {
  // The service is injected through the constructor (dependency injection)
  constructor(private readonly courseService: CourseService) {}

  // GET /course -> get all courses
  @Get()
  getAllCourses(): string {
    return this.courseService.getAllCourses();
  }

  // GET /course/:id -> get one course (id comes from the URL)
  @Get(':id')
  getCourseById(@Param('id') id: string): string {
    return this.courseService.getCourseById(id);
  }

  // POST /course -> create a course
  @Post()
  createCourse(): string {
    return this.courseService.createCourse();
  }

  // PUT /course/:id -> update a course
  @Put(':id')
  updateCourse(@Param('id') id: string): string {
    return this.courseService.updateCourse(id);
  }

  // DELETE /course/:id -> delete a course
  @Delete(':id')
  deleteCourse(@Param('id') id: string): string {
    return this.courseService.deleteCourse(id);
  }
}
