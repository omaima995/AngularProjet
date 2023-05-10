import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[]|undefined;
  priceSummary: priceSummary={
      price: 0 ,
      discount: 0 ,
      tax: 0 ,
      delivery: 0 ,
      total: 0 ,
  }

  constructor(private product:ProductService, private router:Router ){

  }
  ngOnInit(): void {
    this.loaddetails()

  }
  checkout(){
    this.router.navigate(['/checkout'])
  }
loaddetails(){
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result  ;
  let price=0;
  result.forEach((item)=>{
    if(item.quantity){
      price=price+ (+item.price* + item.quantity)


    }

  })
  //console.warn(price)
  this.priceSummary.price=price;
  this.priceSummary.delivery=3;
  this.priceSummary.total=price+this.priceSummary.delivery;
  //console.warn(this.priceSummary)
  if(!this.cartData.length){
    this.router.navigate(['/'])

  }
});
}

  removeToCart(cartId:number|undefined){
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result)=>{
        this.loaddetails();
      })

  }

}
