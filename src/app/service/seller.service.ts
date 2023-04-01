import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, SignUp } from '../data-type';
import {BehaviorSubject} from 'rxjs';
import{ Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    //return this.http.post('http://localhost:3000/seller',data)
   this.http.post('http://localhost:3000/seller',
    data,{observe:'response'}
    ).subscribe((result)=>{
      console.warn("result",result);
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home']);


      }
      //this.isSellerLoggedIn.next(true);

      //
    });
    
    //return false
  }
  reloadSeller(){
    if (localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-auth']);

    }
  }
  userlogin(data:login){
    console.warn(data)
    //api call code
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result: any)=>{
      console.warn(result)
      if (result && result.body && result.body.length){
        console.warn("user logged in")
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home']);

      }else{
        console.warn("fail");
        this.isLoginError.emit(true)
      }

    })

  }
}

