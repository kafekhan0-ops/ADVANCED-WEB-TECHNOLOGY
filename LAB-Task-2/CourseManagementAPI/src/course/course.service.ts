import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

type StoredCourse = CreateCourseDto & { id: string };

@Injectable()
export class CourseService {
  private readonly courses = new Map<string, StoredCourse>();
  private nextId = 6;

  constructor() {
    // Sample data so the lab's /course/5 requests work immediately.
    this.courses.set('5', {
      id: '5',
      name: 'NestJS Fundamentals',
      code: 'CS101',
      instructor: 'John Doe',
      credits: 3,
      description: 'Sample course for Lab Task 2 testing',
    });
  }

  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: Array.from(this.courses.values(), (course) => ({ ...course })),
    };
  }

  getCourseById(id: string) {
    this.findCourseOrThrow(id);

    // Matches the response shape shown in the lab instructions.
    return {
      message: 'Course fetched successfully',
      id,
    };
  }

  createCourse(dto: CreateCourseDto) {
    const id = String(this.nextId++);
    const course: StoredCourse = { id, ...dto };

    this.courses.set(id, course);

    return {
      message: 'Course created successfully',
      data: this.toCourseDto(course),
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    const currentCourse = this.findCourseOrThrow(id);
    const updatedCourse: StoredCourse = { ...currentCourse, ...dto, id };

    this.courses.set(id, updatedCourse);

    return {
      message: 'Course updated successfully',
      id,
      data: this.toCourseDto(updatedCourse),
    };
  }

  patchCourse(id: string, dto: UpdateCourseDto) {
    const currentCourse = this.findCourseOrThrow(id);
    const updatedCourse: StoredCourse = { ...currentCourse, ...dto, id };

    this.courses.set(id, updatedCourse);

    return {
      message: 'Course patched successfully',
      id,
      updatedFields: Object.keys(dto),
    };
  }

  deleteCourse(id: string) {
    this.findCourseOrThrow(id);
    this.courses.delete(id);

    return {
      message: 'Course deleted successfully',
      id,
    };
  }

  uploadCourseMaterial(id: string, file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('A file is required');
    }

    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: `uploads/${file.filename}`,
    };
  }

  private findCourseOrThrow(id: string): StoredCourse {
    const course = this.courses.get(id);

    if (!course) {
      throw new NotFoundException(`Course with ID "${id}" was not found`);
    }

    return course;
  }

  private toCourseDto(course: StoredCourse): Omit<StoredCourse, 'id'> {
    return {
      name: course.name,
      code: course.code,
      instructor: course.instructor,
      credits: course.credits,
      ...(course.description !== undefined
        ? { description: course.description }
        : {}),
    };
  }
}
