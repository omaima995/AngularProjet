import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../service/product.service';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined|product
  productQuantity: number=1
  removecart=false
  carteData:product|undefined

  constructor(private activeRouter: ActivatedRoute, private product:ProductService,private library: FaIconLibrary){
    
    library.addIcons(faDollarSign);
   

  }
  ngOnInit(): void {
    let productId=this.activeRouter.snapshot.paramMap.get('productId');
    //console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result)=>{
      //console.warn(result);
      this.productData=result;
      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items= JSON.parse(cartData);
        items =items.filter((item:product)=>productId==item.id.toString());
        if(items.length){
          this.removecart=true
        }else{
          this.removecart=false
        }

      }
      let user =localStorage.getItem('user');
      if(user){

        let userId=user && JSON.parse(user).id;
        this.product.getcartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
      if(item.length){
        this.carteData=item[0];
        this.removecart=true
        
      }
      })

      }

    }) 
  }
  handelQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
       this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min')
    {
      this.productQuantity-=1;
    }

  }
  addtoCart(){
    //if (this.productData){
      //this.productData.quantity =this.productQuantity;


      /*if(localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);

    /}
    }*/
    
    if(this.productData){
      this.productData.quantity =this.productQuantity;
      
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        //console.warn('appel');
        this.removecart=true

      }else{
        console.warn('user log');
        let user =localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        //console.warn(userId);
        let cartData:cart={
          ...this.productData,
          userId,
          productId: this.productData.id

        }
        delete cartData.id;
        //console.warn(cartData);
        this.product.addToCart(cartData).subscribe((result)=>{
          console.warn('result',result);
          if(result){
            this.product.getcartList(userId);
            this.removecart=true

          }
        })


      }



    }

  }
  removetoCart(productId:number){
   
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId)
    }else{
      let user =localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      //console.warn(this.carteData)
      this.carteData && this.product.removeToCart(this.carteData.id)
      .subscribe((result)=>{
        if(result){
          this.product.getcartList(userId)
        }

      })
      this.removecart=false

    }



  }

}
