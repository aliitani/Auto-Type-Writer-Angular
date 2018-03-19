import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutoTypeWriterDirectiveDirective } from './autoTypeWriter-Directive/auto-type-writer-directive.directive';


@NgModule({
  declarations: [
    AppComponent,
    AutoTypeWriterDirectiveDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
