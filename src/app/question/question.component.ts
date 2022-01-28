import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']

})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAns: number = 0;
  incorrectAns: number = 0;
  interval$: any;
  progres: string = "0";
  isQuizCompleted: boolean = false;
  isSelected:boolean=false;
  selectedQuiz: string = '';


  //event handler for the select element's change event


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    //this.getAllQuestions();
    
  }
  button(value1:string) {
    localStorage.setItem("value",value1);
    this.selectedQuiz = localStorage.getItem("value")!;
    alert("It will take You to the "+`${this.selectedQuiz}`+" Quiz!!");
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        console.log(this.selectedQuiz)
        if (this.selectedQuiz === "Angular") {
          this.restQuiz();
          this.isQuizCompleted = false;
          this.isSelected=true;
          this.questionList = res.Angular;
        } else if (this.selectedQuiz === "Html") {
          this.restQuiz();
          this.isQuizCompleted = false;
          this.isSelected=true;
          this.questionList = res.Html;
        }
        else if (this.selectedQuiz === "JavaScript") {
          this.restQuiz();
          this.isQuizCompleted = false;
          this.isSelected=true;
          this.questionList = res.JavaScript;
        } else {
          this.isSelected=true;
          this.questionList = res.Java;
          this.restQuiz();
          this.isQuizCompleted = false;
        }
      })
  }
  nextQuestion() {  
      this.currentQuestion++;
      this.resetCounter();
    }

  previceQuestion() {
    this.currentQuestion--;
    this.resetCounter();
  }
  answer(currentQno: number, option: any,) {
    if (currentQno === this.questionList.length) {
      setTimeout(() => {
        this.isQuizCompleted = true;
        this.stopCounter();
      }, 1000);

    }  if (option.correct) {
      this.points += 1;
      this.correctAns++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

    }
    else {
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAns++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points = this.points - 0.5;
    }

  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          if(this.currentQuestion===this.questionList.length){
            alert("Your Test is ENd");
            this.isQuizCompleted=true;
          }else{
            this.counter = 60;
          }
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  restQuiz() {
    this.resetCounter();
    //this.getAllQuestions();
    this.currentQuestion = 0;
    this.incorrectAns = 0;
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progres = "0";
  }
  getProgressPercent() {
    this.progres = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progres;
  }
home(){
  this.isSelected=false;
}
}