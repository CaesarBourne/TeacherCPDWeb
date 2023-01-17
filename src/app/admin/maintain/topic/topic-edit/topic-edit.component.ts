import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/admin/maintain/course/course.service';
import { Course } from 'src/app/admin/maintain/course/course';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TopicService } from 'src/app/admin/maintain/topic/topic.service';
import { Topic, TopicInput } from 'src/app/admin/maintain/topic/topic';
import { PNotifyService } from 'src/shared/service-proxies/pnotify.service';
import Swal from 'sweetalert2'


declare let wysihtml5ParserRules: any;

@Component({
    selector: 'app-topic',
    templateUrl: 'topic-edit.component.html',
    providers: [CourseService, TopicService]
})

export class TopicEditComponent implements OnInit {

    course: Course = new Course();
    topics: Topic[] = [];
    topic: Topic = new Topic();
    isSaving: boolean = false;
    course_id: any;
    topic_id: any;
    isloading:boolean = false;

    constructor(private route: ActivatedRoute,
        private router: Router, private courseService: CourseService,
        private topicService: TopicService, private pnotify: PNotifyService) {

        this.course_id = this.route.snapshot.paramMap.get('course_id');
        this.topic_id = this.route.snapshot.paramMap.get('topic_id');

    }

    ngOnInit() {


        this.courseService.getCourse(this.course_id).subscribe(
            x => this.course = x
        );



        this.loadTopic();
        this.loadTopics();


    }
    private loadTopic() {
        this.topicService.getTopic(this.course_id, this.topic_id).subscribe(
            x => this.topic = x
        )
    }
    private loadTopics() {

        this.topicService.getTopics(this.course_id).subscribe(
            x => this.topics = x
        );
    }

    delete()
    {
        Swal({
            text: `Are you sure you want to delete this topic: ${this.topic.name}?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
      
            if (result.value) {
              this.isloading = true;
              this.topicService.deleteTopic(this.topic.id).pipe(
                finalize(() => {
                  this.isloading = false;
                })).subscribe(x => {
      
                    this.router.navigate(['/admin/maintain/courses']);
                });
            }
          });
    }

    submit()
     {
        this.topic.course_id = this.course_id;

       this.topicService.updateTopic(this.topic).pipe(
            finalize(() => {
                this.isSaving = false;
            })
        ).subscribe(x => {

            if (x) {
                this.pnotify.success("Topic updated successfully!");
                this.topicService.getTopics(this.course_id).subscribe(
                    x => this.topics = x
                );
            }
            else {
                this.pnotify.error("Failed to update topic");
            }

        });
    }
    onVideoChange($event) {
        let video = $event.target.files[0];

        if (video) {

            this.topic.video = video;
        }
    }

    cancel() {
        this.loadTopic();
    }
}