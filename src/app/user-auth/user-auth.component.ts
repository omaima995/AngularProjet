import { Component,OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean =true;
  authError:string=""
   
  constructor(private user:UserService, private product:ProductService ){

  }
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data:SignUp){
    //console.warn(data);
     this.user.userSignUp(data)


  }
  login(data:login){
    //console.warn(data);
    this.user.userlogin(data);
    this.user.invaliduserAuth.subscribe((result)=>{
      //console.warn("appel",result)
      if(result){
        this.authError="please Enter valid user details "

      }else{
        this.localCartToRemote();
      }
    })

  }
  openLogin(){
    this.showLogin=true

    
  }
  openSignUp(){
    this.showLogin=false

  }
  localCartToRemote(){
    let data = localStorage.getItem('localCart');
    let user =localStorage.getItem('user');
    let userId = user &&JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);     
      cartDataList.forEach((product:product,index) => {
        let cartData :cart={
          ...product,
          productId:product.id,
          userId

        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if (result){
              //console.warn("item in db")
            }
          })
         
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        } 
        
      });        

    }
    setTimeout(() => {
      this.product.getcartList(userId)

      
    }, 2000);

  }

}
