import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-modal-add-cat',
    templateUrl: 'add-category-modal.component.html'
})

export class AddCategoryModalComponent implements OnInit {
    constructor(public bsModalRef:BsModalRef) { }

    ngOnInit() { }
}