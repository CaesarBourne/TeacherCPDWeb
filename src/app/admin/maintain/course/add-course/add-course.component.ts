import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../../shared/service-proxies/script-loader.service';
import { Course } from '../course';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';
import { CourseService } from '../course.service';
import { finalize, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { of } from 'rxjs';

declare let wysihtml5ParserRules: any;

@Component({
    selector: 'app-add-course',
    templateUrl: 'add-course.component.html',
    providers: [CategoryService, CourseService]
})

export class AddCourseComponent implements OnInit, AfterViewInit {

    course: Course = new Course();
    categories: Category[] = [];
    isSaving:boolean = false;

    public editorOptions: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','subscript', 'superscript',
        'fontFamily', 'fontSize', 'color','formatOL', 'formatUL'],
        quickInsertButtons: ['ul', 'ol']
      };

    constructor(private scriptLoader: ScriptLoaderService,
        private categoryService: CategoryService, private courseService: CourseService) {

    }

    ngOnInit() {

        this.categoryService.getCategories().subscribe(
            x => this.categories = x
        );
    }

    ngAfterViewInit(): void {

          }

    save() {
       
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;

        this.isSaving = true;

         this.courseService.addCourse(this.course).pipe(
              finalize(()=>{
                this.isSaving = false;
              }),
              catchError(err=>{

                return of(null);
              })
          ).subscribe(
            x=>{

                if(x)
                {
                    this.course = new Course();
                    $('#imagePreview').attr('src', '');
                    swal(
                        '',
                        'Course saved successfully!',
                        'success'
                      )
                }
                else{
                    swal(
                        '',
                        'Failed to add course!!',
                        'success'
                      )
                }
            }
        );
    }
    cancel()
    {
        this.initDefault();

    }

    initDefault() {
        this.course = new Course();
       
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