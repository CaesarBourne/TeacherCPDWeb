import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../../shared/service-proxies/script-loader.service';
import { Course } from '../course';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';
import { CourseService } from '../course.service';
import { finalize, tap } from 'rxjs/operators';
import { TopicService } from '../../topic/topic.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Topic } from '../../topic/topic';
import swal from 'sweetalert2';


@Component({
    selector: 'app-course-item',
    templateUrl: 'course-item.component.html',
    providers: [CategoryService, CourseService, TopicService]
})

export class CourseItemComponent implements OnInit, AfterViewInit {

    course: Course = new Course();
    categories: Category[] = [];
    topics: Topic[] = [];
    isUpdating:boolean = false;

    public editorOptions: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','subscript', 'superscript',
        'fontFamily', 'fontSize', 'color','formatOL', 'formatUL'],
        quickInsertButtons: ['ul', 'ol']
      };

    constructor(private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService, private courseService: CourseService,
        private topicService: TopicService) {

    }

    ngOnInit() {

        let course_id = this.route.snapshot.paramMap.get('id');
              
      

        this.topicService.getTopics(course_id).subscribe(x => {
            this.topics = x;
        });

            this.categoryService.getCategories().subscribe(
                x=> this.categories = x
            ); 
            
            this.courseService.getCourse(course_id).subscribe(
            x => this.course = x
        );
    }

    ngAfterViewInit(): void {

    }

    updateCourse()
    {
        this.isUpdating = true;

        this.courseService.updateCourse(this.course).pipe(
            finalize(()=>{
                this.isUpdating = false;
            })
        ).subscribe(x=>{

            if(x)
            {
                swal(
                    '',
                    'Course updated successfully!',
                    'success'
                  )
            }else{
                swal(
                    '',
                    'Failed to update course. Pleae try again!!',
                    'error'
                  )
            }
            
        });
    }

    onImageChange($event) {
        let image = $event.target.files[0];

        if (image) {

            this.course.image = image;
            var reader = new FileReader();

            reader.onload = function ($event) {
            
                $('#imagePreview').attr('src', (<any>($event.target)).result);
            }

            reader.readAsDataURL(image);
        }
    }
}