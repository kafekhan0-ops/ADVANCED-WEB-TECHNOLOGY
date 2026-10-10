import { Injectable } from '@nestjs/common';

// SERVICE LAYER: all business logic lives here.
// @Injectable() lets NestJS inject this class into the controller.
@Injectable()
export class CourseService {
  // Logic for fetching every course (returns a simple string for this lab)
  getAllCourses(): string {
    return 'All courses retrieved successfully';
  }

  // Logic for fetching one course by its id
  getCourseById(id: string): string {
    return `Course with ID ${id} retrieved successfully`;
  }

  // Logic for creating a new course
  createCourse(): string {
    return 'Course created successfully';
  }

  // Logic for updating an existing course
  updateCourse(id: string): string {
    return `Course with ID ${id} updated successfully`;
  }

  // Logic for deleting a course
  deleteCourse(id: string): string {
    return `Course with ID ${id} deleted successfully`;
  }
}
