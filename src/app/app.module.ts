import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { GroundZeroComponent } from './Shared/ground-zero/ground-zero.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';




import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SearchPipeComponent } from './Pipes/search-pipe/search-pipe.component';
import { DosearchpipePipe } from './Pipes/dosearchpipe.pipe';
import { ItemListAdminComponent } from './item/item-list-admin/item-list-admin.component';
import { SingleItemComponent } from './item/single-item/single-item.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { InterInterceptor } from './services/inter.interceptor';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { CartComponent } from './cart/cart/cart.component';


const material = [
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatCardModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatBadgeModule
]

const routes : Routes = [
  {path:'', component:GroundZeroComponent,
  children:[
    //Categories
    {path:'categories/list', component:CategoryListComponent},
    { path: 'categories/form', component: CategoryFormComponent },
    { path: 'categories/form/:id', component: CategoryFormComponent },
    //items
    { path: '', component: ItemListComponent },
    //user
    { path: 'users/login', component: LoginComponent },
    { path: 'users/register', component: RegisterComponent },
    { path: 'users/list', component: UserListComponent},
    { path: 'users/form', component:UserFormComponent},
    { path: 'users/form/:id', component:UserFormComponent},
    //Cart
    {path:'cart', component:CartComponent}
  ]
}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroundZeroComponent,
    CategoryListComponent,
    CategoryDialogComponent,
    CategoryFormComponent,
    ItemListComponent,
    SearchPipeComponent,
    DosearchpipePipe,
    ItemListAdminComponent,
    SingleItemComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserDialogComponent,
    UserFormComponent,
    CartComponent
  ],
  imports: [
    ...material,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: InterInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
