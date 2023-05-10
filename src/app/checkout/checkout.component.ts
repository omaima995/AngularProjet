import { Component, OnInit } from '@angular/core';
import {cart, order } from '../data-type';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import {CartPageComponent} from "../cart-page/cart-page.component";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[]|undefined;
  orderMessage:string|undefined;


  constructor(
    private product: ProductService,
    private route:Router,
    private cartPage:CartPageComponent
  ) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {

          price = price+ (+item.price* +item.quantity);

        }
        console.log(price)
      });

      this.totalPrice = price+ 3
      console.warn(this.totalPrice);
    });
  }

  orderNow(data: { email: string; adress: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
if (this.totalPrice) {
  let orderData: order = {
    ...data,
    totalPrice: this.totalPrice, // Use the cart price instead of totalePrice
    userId,
    id:undefined

  }
  this.cartData?.forEach((item)  =>{
    setTimeout(() => {
     item.id && this.product.deleteCartItems(item.id)


    },600);

  })
  this.product.orderNow(orderData).subscribe((result)=>{
    if (result){
      //alert('order places');
      this.orderMessage="your order has been pleaced"
      setTimeout(() => {
        this.route.navigate(['/my-order'])
        this.orderMessage=undefined

      },2000);

    }
  })
}
}

}
