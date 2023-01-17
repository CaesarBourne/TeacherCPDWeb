import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/admin/maintain/course/course.service';
import { Course } from 'src/app/admin/maintain/course/course';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Topic, TopicInput } from './topic';
import { TopicService } from './topic.service';
import { PNotifyService } from '../../../../shared/service-proxies/pnotify.service';


declare let wysihtml5ParserRules: any;

@Component({
    selector: 'app-topic',
    templateUrl: 'topic.component.html',
    providers: [CourseService, TopicService]
})

export class TopicComponent implements OnInit {

    course: Course = new Course();
    topics: Topic[] = [];
    topic: TopicInput = new TopicInput();
    isSaving: boolean = false;
    course_id: any;

    constructor(private route: ActivatedRoute,
        private router: Router, private courseService: CourseService,
        private topicService: TopicService, private pnotify: PNotifyService) {

        this.course_id = this.route.snapshot.paramMap.get('id');

    }

    ngOnInit() {


        this.courseService.getCourse(this.course_id).subscribe(
            x => this.course = x
        );

        this.loadTopics();

    }

    private loadTopics() {

        this.topicService.getTopics(this.course_id).subscribe(
            x => this.topics = x
        );
    }

    initForm() {
        this.topic = new TopicInput();
    }

    submit() {

        this.topic.course_id = this.course_id;

        this.topicService.addTopic(this.topic).pipe(
            finalize(() => {
                this.isSaving = false;
            })
        ).subscribe(x => {

            if (x) {
                this.pnotify.success("Topic added successfully!");
                this.loadTopics();
            }
            else {
                this.pnotify.error("Failed to add topic");
            }

        })
    }
    onVideoChange($event) {
        let video = $event.target.files[0];

        if (video) {

            this.topic.video = video;
        }
    }

    cancel() {
        this.initForm();
    }
}