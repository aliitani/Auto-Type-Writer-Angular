/*
*
* Author: Ali Itani
*
* Auto Type Writer Directive: Just a auto type writer script i wrote as an angular 5 directive.
* 
* Using renderer2 and elementref
* Hope you like it!
*
* */
import { Directive, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoTypeWriter]'
})

export class AutoTypeWriterDirectiveDirective implements OnInit{
  text: string = "Hello my name is Auto-Type-Writer, and I'm testing this to see if it works?!";

  // added this just to see how more intervals work.
  error: string = "adfsdfd";
  
  list = this.text.split("");
  error_list = this.error.split("");

  error_corrected: boolean = false;
  counter: number = 0;
  count_error: number = 0;

  word: string = "";
  cursor_text: string = "";

  /*
    interval ids, that will run independent of each other, since javascript engine runs on a single thread.
    we should clear interval id before setting a new one
 */
  write_interval_id = null;
  cursor_interval_id = null;
  add_text_id = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.write_interval_id = setInterval(() => {
      this.write_text();
    }, 100);
    // this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.text);
  }

  write_text() {
    
    // adds each char to word on each count

    this.word += this.list[this.counter];
    
    // adds it innerHTML property as an attribute directive

    this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word + "|");
    this.counter++;

    // adds the error string when counter reaches half the length of the string
    if (this.counter === (this.text.length/2) && this.error_corrected === false) {
      
      clearInterval(this.write_interval_id);
      
      this.add_text_id = setInterval(() => {
        this.add_text();
      }, 200);

    }
    if(this.counter === this.list.length){
      this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word.substr(0, this.word.length));
      this.counter = 0;
      
      clearInterval(this.write_interval_id);

      this.cursor_interval_id = window.setInterval(() =>{
        this.set_cursor();
      }, 500);
    }
  }

  add_text() {
    
    this.word += this.error_list[this.count_error];

    this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word + "|");
  
    this.count_error++;

    if(this.count_error === this.error_list.length) {
      this.word = this.word.substr(0, this.text.length/2);
      this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word + "|");

      // sets error_corrected var to true once function is called.
      this.error_corrected = true;
      this.count_error = 0;

      // clear interval id and set new interval id
      clearInterval(this.add_text_id);
      this.write_interval_id = setInterval(() => { 
        this.write_text();
      }, 100);
    }
  }
  set_cursor() {
    
    // checks if cursor char | exists
    if(this.cursor_text === "" ){
      this.cursor_text = "|";
      this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word + this.cursor_text);
    } else {
      this.renderer.setProperty(this.el.nativeElement, "innerHTML", this.word);
      this.cursor_text = "";

    }

    this.counter++;

    // checks if counter is 10 clears interval ids and goes back to the beginning

    if(this.counter === 10) {
      this.counter = 0;

      // clears interval ids

      clearInterval(this.cursor_interval_id);
      clearInterval(this.write_interval_id);

      // resets vars to default

      this.word = "";
      this.error_corrected = false;

      // starts the interval again

      this.write_interval_id = window.setInterval(() => { 
        this.write_text();
      }, 100);
    }
  }
}
