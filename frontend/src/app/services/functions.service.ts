import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  getSessionUser(){
    const a = sessionStorage.getItem("user");
    if(a !==null){
      return(JSON.parse(a))
    }else{
      return null;
    }
  }
  
}
