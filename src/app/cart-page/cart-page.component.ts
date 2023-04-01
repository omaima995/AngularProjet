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
  this.priceSummary.discount = price/10;
  this.priceSummary.tax=price*0.05
  this.priceSummary.delivery=7;
  this.priceSummary.total=price+(price/10)+this.priceSummary.discount+this.priceSummary.tax+this.priceSummary.delivery-(price/10);
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
