import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AssessmentService } from 'src/app/admin/maintain/assessment/assessment.service';
import { Assessment } from 'src/app/admin/maintain/assessment/assessment';



@Component({
    selector: 'app-assessment',
    templateUrl: 'assessment.component.html',
    providers: [AssessmentService]
})

export class AssessmentComponent implements OnInit, AfterViewInit {

    assessments: Assessment[] =[];
    
    constructor( private assessmentService: AssessmentService) {

    }

    ngOnInit() {

       this.assessmentService.getAssessments().subscribe(
           x=> this.assessments = x
       );
    }

    ngAfterViewInit(): void {

    }
}