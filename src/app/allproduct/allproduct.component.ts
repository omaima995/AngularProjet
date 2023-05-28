import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {
  popularProduct: undefined| product[];
  alltoProduct: undefined| product[];
  productData: undefined|product
  constructor(private product : ProductService){

  }
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
        console.warn(data);
        this.popularProduct=data;
        
    });
    this.product. alltoProduct().subscribe((data=>{
      this. alltoProduct=data;
    }))
  }
  images = [
    { src: '../assets/images/Baniere.png', alt: 'Logo' },
    { src: '../assets/images/Logopng1.png', alt: 'Logo' }
  ];
  currentIndex = 0;
  transformValue = 0;

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateTransformValue();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
    this.updateTransformValue();
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
    this.updateTransformValue();
  }

  updateTransformValue() {
    this.transformValue = -(this.currentIndex * 100);
  }

}
