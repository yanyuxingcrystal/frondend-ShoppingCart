import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem, Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemDetailed : CartItem[] = [];
  respCart !: Cart;
  totalPrice !: number;
  totalPriceSum :number = 0;
  
  checkRemove:boolean = false;

  constructor(private cartService : CartService,
    private itemService : ItemsService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails(){

    this.cartService.cart$.pipe().subscribe(
      (respCart)=>{
        this.cartItemDetailed = [];
        this.respCart = respCart;
        respCart.cartItems.forEach(
          (cartItem)=>{
            this.itemService.getOneItemById(cartItem.item._id).subscribe(
              (item)=>{
                this.totalPrice = item.price * cartItem.quantity;
                let tmp = this.totalPriceSum;
                this.totalPriceSum = tmp + this.totalPrice;
                this.cartItemDetailed.push({
                  item:item,
                  quantity:cartItem.quantity
                })
              }
            )
          }
        )
      }
    )
  }

  removeItem(index:number, cartItem:CartItem){
    // const deleteItem = this.cartService.getCartItem(index)!;
    // this.checkRemove = true;
    // this.itemService.getOneItemById(deleteItem.item._id).subscribe(
    //   (item) => {
    //     this.totalPrice = item.price * deleteItem.quantity;
    //     let tmp = this.totalPriceSum;
    //     this.totalPriceSum = tmp - this.totalPrice;

    //     this.cartService.removeItem(index);
    //     this.snackBar.open("You deleted "+cartItem.item.name+" from the cart", "OK", {
    //       duration:2000,
    //       horizontalPosition:'right',
    //       verticalPosition:'top'
    //     })
    //   }
    // )
    this.cartService.removeItem(index);
    this.totalPriceSum = 0;

    this.snackBar.open("You deleted "+cartItem.item.name+" from the cart", "OK", {
      duration:2000,
      horizontalPosition:'right',
      verticalPosition:'top'
    })
     
    
  }

}
