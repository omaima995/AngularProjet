import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  popularProduct: undefined| product[];
  trendyProduct: undefined| product[];
  productData: undefined|product
  constructor(private product : ProductService){

  }
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
        console.warn(data);
        this.popularProduct=data;
        
    });
    this.product.trendyProduct().subscribe((data=>{
      this.trendyProduct=data;
    }))
  }

}
