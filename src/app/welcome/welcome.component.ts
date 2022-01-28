import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,Validators,  FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 @ViewChild('name') nameKey!: ElementRef;
 
constructor(private router:Router,private formBuilder:FormBuilder) { }
  username!: FormGroup;

ngOnInit(): void {
  this.username= this.formBuilder.group({
    name:['',Validators.required]
  })
 }

 submitted=false;

 get f(){
   return this.username.controls;
 }
 onSubmit(){
   this.submitted=true;

   if(this.username.invalid){
     return;
   }
   localStorage.setItem("name", this.nameKey.nativeElement.value);
  const name=localStorage.getItem("name")!; 
     alert("Welcome to the quiz "+`${name}`)
    this.startQuiz('question');
   
 }
 startQuiz(pagename: string):void{
  this.router.navigate([`${pagename}`]) 
}
}
