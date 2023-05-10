import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartCount = 0;
  userIsAdmin:boolean = false;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(
      (cart)=>{
        this.cartCount = cart?.cartItems.length ?? 0
      }
    )
  }

  ngDoCheck(){
    this.userIsAdmin = JSON.parse(localStorage.getItem('userAdmin')!);
  }

  getLoggedStatus(){
    if(localStorage.getItem('user') !== null){
      return true
    }else {
      return false
    }
  }

  logout(){
    const initialCart = {
      cartItems: [],
      user:{}
    };
  const initialCartJson = JSON.stringify(initialCart);
  localStorage.setItem('cart', initialCartJson);

  const cartJsonString : string = localStorage.getItem('cart')!;
  const cart : Cart = JSON.parse(cartJsonString);
  this.cartService.cart$.next(cart);

  localStorage.removeItem('user');

  localStorage.setItem('userAdmin', JSON.stringify(false));
    
  }
  

}
