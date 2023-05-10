import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DosearchpipePipe } from 'src/app/Pipes/dosearchpipe.pipe';
import { SearchPipeComponent } from 'src/app/Pipes/search-pipe/search-pipe.component';
import { CartItem } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [ DosearchpipePipe ]
})
export class ItemListComponent implements OnInit{

  items!:Item[];
  categories!:Category[];
  filter!:string;
  showList = true;
  searchForm!:FormGroup;

  searchLaunch = false;
  searchDataFiltered!:Item[];

  // currentItem !: Item ;


  constructor(private itemService : ItemsService,
    private categoryService : CategoryService,
    private formBuilder : FormBuilder,
    // private searchPipe :SearchPipeComponent,
    private searchPipe:DosearchpipePipe,
    private router : Router,
    private cartService : CartService,
    private _snackBar : MatSnackBar
    ){}

  ngOnInit(): void {
    this.getItems();
    this.getCategories();
    this.searchForm = this.formBuilder.group({
      term:['']
    });
  }

  getItems(){
    this.itemService.getAllItems().subscribe(
      (items) => {
        this.items = items;
      }
    )
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    )
  }

  forwardToSingleItem(itemid: string){
    this.router.navigate(['/items/single-item/'+itemid]);
  }

  changeClient(value:string){
    this.searchLaunch = false;
    this.filter = value;
    this.showList = false;
    if(this.filter === "All"){
      this.showList = true;
    }
  }

  onSubmit(){
    this.searchLaunch = true;
    const term = this.searchForm.get('term')?.value;
    this.searchDataFiltered = this.searchPipe.transform(this.items, term);
  }

  addToCart(itemid: string) {
    //  var currentItem : Item  = {
    //   _id: 'test',
    //   name: 'test',
    //   description: 'test',
    //   price: 0,
    //   image: 'test',
    //   category: new Category
    // };
    // var currentItem : Item ;
    // this.currentItem ={
    //   _id: 'test',
    //   name: 'test',
    //   description: 'test',
    //   price: 0,
    //   image: 'test',
    //   category: new Category
    // }

    this.itemService.getOneItemById(itemid).subscribe(
      (item) => {

        const cartItem: CartItem = {
          //_id:this.item._id,
          item: item,
          quantity: 1
        }
        this.cartService.setCartItem(cartItem);

        this._snackBar.open('You added ' + cartItem.item.name + ' to the cart', 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 4000
        });

        // this.getItems();

      });
  }

}
