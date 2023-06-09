import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router){

  }
  showLogin=false;
 authErreur: string ='';
  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signup(data:SignUp):void{
  console.warn(data)
  /*this.seller.userSignUp(data).subscribe((result)=>{
  //console.warn(result)
    if (result){
      this.router.navigate(['seller-home'])

    }
  });*/
  this.seller.userSignUp(data)


  }
  openLogin(){
    this.showLogin=false;

  }
  openSignUp(){
    this.showLogin=true;

  }
  Login(data:login):void{
    this.authErreur="";
    //console.warn(data);
    this.seller.userlogin(data)
    this.seller.isLoginError.subscribe((isErrer)=>{
      if (isErrer){
        this.authErreur="Email or password is not correct"

      }
    })
    }

}
