import { Component,OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-ordes',
  templateUrl: './my-ordes.component.html',
  styleUrls: ['./my-ordes.component.css']
})
export class MyOrdesComponent implements OnInit{
  orderData:order[]|undefined;
  orderMessage:string|undefined
  constructor(private product:ProductService){

  }
  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
  })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result ;
  })

  } 
  


}
