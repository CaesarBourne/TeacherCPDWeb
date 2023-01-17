import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize, catchError, switchMap } from 'rxjs/operators';
import { Course } from 'src/app/admin/maintain/course/course';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { PNotifyService } from 'src/shared/service-proxies/pnotify.service';
import { Assessment } from '../assessment';
import swal from 'sweetalert2';
import { of } from 'rxjs';
import { QuestionService } from '../question.service';
import { Question } from '../Question';
import { QuestionOption } from '../QuestionOption';



@Component({
    selector: 'app-add-question',
    templateUrl: 'add-question.component.html',
    providers: [AssessmentService,QuestionService]
})

export class AddQuestionComponent implements OnInit {

    isSaving: boolean = false;
    assessment:Assessment = new Assessment();

    isEditAssessment:boolean = false;
    isEditingAssessment:boolean = false;
    
    question:Question;
    questions:Question[] = [];

    assesment_id:any;

    constructor(private route: ActivatedRoute,
        private router: Router,private questionService:QuestionService,
        private pnotify: PNotifyService, private assessmentService:AssessmentService) {

            this.route.paramMap.pipe(
                switchMap((params: ParamMap) =>

                  this.assesment_id = params.get('assessment_id'))
              ).subscribe(x=>{
                  
              });

    }

    ngOnInit() {

        console.log(this.assesment_id)
        this.initForm();
        this.getAssessment();
        this.loadQuestions();
    }

    private loadQuestions() {

        this.questionService.getQuestions(this.assesment_id).subscribe(
            x=> {
                this.questions = x;
            }
        );

    }

    getAssessment()
    {
        this.assessmentService.getAssessment(this.assesment_id).subscribe(
            x=>{
                this.assessment = x;
            }
        )
    }

    initForm() {
       this.question = new Question();
    }

    submit() {

        this.isSaving = true;

      this.questionService.addQuestion(this.assesment_id,this.question).pipe(
        finalize(() => {
            this.isSaving = false;
        }),
        catchError( err =>{

            swal({
                text:err.statusText,
                type: 'error'
              });

            return of(false);
        })).subscribe(x=>{

            if(x)
            {
                console.log(JSON.stringify(x));
                this.initForm();
                this.pnotify.success("question added successfully");
                this.loadQuestions();

            }
            else{
                this.pnotify.error("failed to add question");
            }
        });
    
    }
    
    cancel() {
        this.initForm();
    }

    cancelEditAssessment(){
        this.isEditAssessment = false;
        this.getAssessment();
    }

    onEditAssessment()
    {
        this.isEditingAssessment = true;
        this.assessmentService.updateAssessment(this.assessment).pipe(
            finalize(() => {
                this.isEditingAssessment = false;
            }),
            catchError( err =>{

                swal({
                    text:err.statusText,
                    type: 'error'
                  });

                return of(false);
            })).subscribe(x=>{

                if(x)
                {
                    this.isEditAssessment = false;
                    this.pnotify.success("assessment updated successfully");
                }
                else{
                    this.pnotify.error("failed to update assessment");
                }
            });
        
   
    }
    editAssessment()
    {
        this.isEditAssessment = true;

    }

    addOption()
    {
        this.question.options.push(new QuestionOption());
    }

    deleteOption(index)
    {
        this.question.options.splice(index,1);
    }
}