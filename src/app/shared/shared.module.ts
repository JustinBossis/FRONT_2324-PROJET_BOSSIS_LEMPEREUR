import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  exports: [
    FormsModule,  
    CommonModule,
    NavigationBarComponent,
    HttpClientModule,
  ]
})
export class SharedModule { }
