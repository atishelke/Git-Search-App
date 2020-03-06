import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Observable,of,empty } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  public baseUrl="https://api.github.com/search/users?q="
  public searchResults: any;
  private username="wycats";
  private clientid = '4ba695fac9d9e6405579';
  private clientsecret = '0408bd3f536bf585820b46dc8648498dd43ad10c';

  constructor(private http:HttpClient) { 
  	console.log("service is now ready!");
    }

  
  	public searchEntries(term):Observable<any>{
      
      return this.http.get(this.baseUrl+term).pipe(map(response=>{
        console.log(response);
        return this.searchResults= response["items"];
      }))
    }
    public _searchEntries(term){
      return this.searchEntries(term)
    }
  	
  

  getProfileRepos(searchEntries){
  	return this.http.get("https://api.github.com/users/"+ searchEntries +"/repos")
  	
  }

  /*updateProfile(username:string){
  	this.username = username;
  }*/

}