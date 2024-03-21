import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error.interceptor';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    ErrorComponent
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
    FooterComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
