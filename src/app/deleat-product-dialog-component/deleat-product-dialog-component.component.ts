import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-deleat-product-dialog-component',
  templateUrl: './deleat-product-dialog-component.component.html',
  styleUrls: ['./deleat-product-dialog-component.component.css']
})
export class DeleatProductDialogComponentComponent implements OnInit {
  productList: undefined | product[];
  productForm: FormGroup | undefined;
  productMessage :undefined | string
  constructor(private formBuilder: FormBuilder,private product:ProductService){

  }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onCancel(): void {
    // Close the dialog without adding a product
  }

  List(){
    this.product.productList().subscribe((result)=>{
      console.warn(result)
      this.productList=result;
      
    })
  
  }
    

  onDelate(id:number){
    console.warn("test id",id)
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="product is deleted";
        this.List();
  
  
      }
    })
    setTimeout(() => {
      this.productMessage=undefined;
    }, 3000);
  
  }
}
