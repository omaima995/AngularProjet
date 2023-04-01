import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { login, SignUp } from '../data-type';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invaliduserAuth= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router ) {
    

   }
  userSignUp(user:SignUp){
    //console.warn(user)
    this.http.post("http://localhost:3000/user",user,{observe:'response'} ).subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })


  }
  userlogin(data:login){ 
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        this.invaliduserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
      }else{
        this.invaliduserAuth.emit(true)

      }

    })
    


  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }

  }
}
