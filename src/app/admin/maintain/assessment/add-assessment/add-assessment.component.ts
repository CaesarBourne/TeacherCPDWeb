import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { Course } from 'src/app/admin/maintain/course/course';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { PNotifyService } from 'src/shared/service-proxies/pnotify.service';
import { Assessment } from '../assessment';
import swal from 'sweetalert2';
import { observable, of } from 'rxjs';



@Component({
    selector: 'app-add-assessment',
    templateUrl: 'add-assessment.component.html',
    providers: [AssessmentService]
})

export class AddAssessmentComponent implements OnInit {

    isSaving: boolean = false;
    assessment:Assessment;
    assessmentCreated:boolean = false;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private pnotify: PNotifyService, private assessmentService:AssessmentService) {


    }

    ngOnInit() {

        this.initForm();
    }

    initForm() {
        this.assessment = new Assessment();
    }

    submit() {

        this.isSaving = true;

        this.assessmentService.addAssessment(this.assessment).pipe(
            finalize(() => {
                this.isSaving = false;
            }),
            catchError( err =>{

                swal({
                    text:err.statusText,
                    type: 'error'
                  });

                return of(false);
            })

        ).subscribe(x => {

            if (x) {
               console.log('admin/maintain/assessment/'+(<any>x).id);
               this.initForm();
                swal({
                    text: `Assessment Added successfully`,
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Add Questions',
                    cancelButtonText: 'Cancel'
                  }).then((result) => {
              
                    if (result.value) {
                    
                        this.router.navigate(['admin/maintain/assessment/'+(<any>x).id])
                    }
                  });
            }

        })
    }
    
    cancel() {
        this.initForm();
    }
    back()
    {
        this.router.navigate(['admin/maintain/assessments'])
    }
}