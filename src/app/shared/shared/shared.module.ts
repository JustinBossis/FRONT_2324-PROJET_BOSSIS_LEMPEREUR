import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
