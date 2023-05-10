import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from 'src/app/dialogs/category-dialog/category-dialog.component';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
//In recent versions of Angular (v15 I think), ng generate component no longer includes ngOnInit(), 
//just because it is often unused and introduces noise. The function still works, just type it out yourself and it should work fine.
export class CategoryListComponent implements OnInit {

  //dataSource for HTML
  categories!:Category[];
  displayedColumns : string[] = ['name','categoryType','edit','delete'];
  
  constructor(private categoryService : CategoryService,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getCategories();
  }

  //subscribe service created in services
  getCategories(){
    //subscribe return all 
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    )
  }

  //deleteCategoryButton
  onDeleteCategory(category:Category){
    //open a dialog form ref
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      height: '200px',
      width: '400px',
      data: {name: category.name},
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result){
        this.categoryService.deleteCategory(category._id).subscribe(
          (category) => {
            this.getCategories();
        })
      }
    });
  //   setTimeout(function(){
  //     location.reload();
  // }, 1000); 
    
  }

}
