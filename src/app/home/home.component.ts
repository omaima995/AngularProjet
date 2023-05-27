import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
