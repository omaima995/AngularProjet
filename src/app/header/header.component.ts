import 'bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String= 'default';
  sellerName: String='';
  searchResult:undefined|product[];
  userName:string="";
  cartItem=0
  showLogin=false;
  adminIcon=faUserCog;
  receiptIcon =faReceipt;
  addicon=faPlusSquare




 constructor (private router: Router,private product : ProductService,private library: FaIconLibrary ){
  library.addIcons(faUser);
  library.addIcons(faShoppingCart);
  library.addIcons(faHome);
  library.addIcons(faUserCog);
  library.addIcons(faPlusSquare);

  


 }
 ngOnInit(): void {
  
  this.router.events.subscribe((val:any)=>{
    //console.warn(val.url)
    if(val.url){
      if(localStorage.getItem('seller')&&val.url.includes('seller')){
        //console.warn("in seller area")
        this.menuType="seller";
        if(localStorage.getItem('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse( sellerStore)[0];
          this.sellerName =sellerData.name;

           
        }
      }else if (localStorage.getItem('user')){
        let userStore=localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName=userData.name;
        this.menuType='user';
        this.product.getcartList(userData.id)
      }
        else{
        //console.warn("outside")
        this.menuType='default'
      }
    }

  });
  
  let cartData=localStorage.getItem('localCart');
  if(cartData){
    this.cartItem=JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((items)=>{
this.cartItem=items.length
  })

  
     
 }
 logout(){
  localStorage.removeItem('seller');
  this.router.navigate(['/']);


 }
 userlogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/user-auth']);
  this.product.cartData.emit([]);

 }
 searchProduct(query:KeyboardEvent){
  if(query){
    const element =query.target as HTMLInputElement; 
    //console.warn(element.value)
    this.product.searchProducts(element.value).subscribe((result)=>{
      //console.warn(result); 
      if(result.length>5){
        result.length=5 ;


      }
      this.searchResult=result;

    })
  }

 }
 hideSearch(){
  this.searchResult=undefined;


 }
 submitSearch(val:string){
  //console.warn(val);
  this.router.navigate([`search/${val}`])

 }
 redirectToDetails(id:number){
  this.router.navigate(['/details/'+id])

 }
}
