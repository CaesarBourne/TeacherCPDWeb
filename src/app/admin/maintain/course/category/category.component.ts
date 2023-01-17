import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddCategoryModalComponent } from './modals/add-category/add-category-modal.component';
import { CategoryService } from './category.service';
import { finalize } from 'rxjs/operators';
import { Category } from './category';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  category: Category = new Category();

  isSaving: boolean = false;
  categories: Category[] = [];
  isloading: boolean = false;
  isUpdate:boolean=false;

  constructor(private modalService: BsModalService,
    private categoryService: CategoryService) { }

  ngOnInit() {

    this.isloading = true;
    this.categoryService.getCategories().pipe(
      finalize(() => {
        this.isloading = false;
      })
    ).subscribe(x => {
      this.categories = x;
    });

  }

  delete(category: Category) {

    Swal({
      text: `Are you sure you want to delete category: ${category.name}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {

      if (result.value) {
        this.isloading = true;
        this.categoryService.deleteCategory(category.id).pipe(
          finalize(() => {
            this.isloading = false;
          })).subscribe(x => {

            let index = this.categories.findIndex(e => e.id == x);

            this.categories.splice(index, 1);
          });
      }
    });
  }

  cancel() {
    this.initModel();
  }

  save() {
    this.isSaving = true;

    this.categoryService.addCategory(this.category.name).pipe(
      finalize(() => {
        this.isSaving = false;
        this.initModel();
      }
      )).subscribe(x => {

        this.categories.push(x);
      });
  }

  edit(id) {
    
    this.categoryService.getCategory(id).pipe(
      finalize(() => {
        this.isSaving = false;
      })).subscribe(x => {

        this.isUpdate = true;
        this.category = x;
      });

  }

  update() {
    this.isSaving = true;
    this.categoryService.updateCategory(this.category).pipe(
      finalize(() => {
        this.isSaving = false;
        this.initModel();
      })).subscribe(x => {

        let index = this.categories.findIndex( e=> e.id == x.id);

        this.categories.splice(index,1,x);
      });
  }


  addCategory() {
    this.modalService.show(AddCategoryModalComponent);
  }

  private initModel()
  {
    this.category = new Category();
    this.isUpdate = false;
  }
}
