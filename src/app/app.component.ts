import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { FormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import {map,debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators'
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'GitSearchApp';
       
    public searchTerm=new Subject<string>();
    public searchResults: any; 
    public paginationElements:any;
    user:any;
    repos:any;
    username:string;
    public page:any;
    
    constructor(private searchs: SearchService){
      
      
    }


    public searchForm= new FormGroup({
      search: new FormControl("", Validators.required),
    });

    
    public search(){
          this.searchTerm.pipe(map((e: any)=>{
          console.log (e.target.value);
          return e.target.value }),
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(term =>{
            return this.searchs._searchEntries(term);
          })).subscribe(v=>{
            this.searchResults= v;
            this.paginationElements= this.searchResults;})
            
        }
        
        ngOnInit(){
          this.search();
    
        }
      
    }

    

  