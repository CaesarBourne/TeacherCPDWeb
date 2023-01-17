import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/admin/maintain/course/course.service';
import { Course } from 'src/app/admin/maintain/course/course';

declare let wysihtml5ParserRules: any;

@Component({
    selector: 'app-course',
    templateUrl: 'course.component.html',
    providers: [CourseService]
})

export class CourseComponent implements OnInit, AfterViewInit {

    courses: Course[] =[];
    
    constructor( private courseService: CourseService) {

    }

    ngOnInit() {

       this.courseService.getCourses().subscribe(
           x=> this.courses = x
       );
    }

    ngAfterViewInit(): void {

    }
}