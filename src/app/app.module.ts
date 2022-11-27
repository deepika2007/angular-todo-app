import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { CreateBlogComponent } from '../app/create-blog/create-blog.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {
    path: 'blog',
    children: [
      {
        path: 'create',
        component: CreateBlogComponent,
      },
      {
        path: ':id',
        component: CreateBlogComponent,
      },
    ],
  },
  { path: '', component: AddItemsComponent },
];
@NgModule({
  declarations: [AppComponent, AddItemsComponent, CreateBlogComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
