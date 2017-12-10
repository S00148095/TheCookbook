import { StorageService } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { GenerationComponent } from './generation/generation.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MealComponent } from './meal/meal.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './services/auth.service';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { DragulaModule } from  'ng2-dragula';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shoppinglist', component: ShoppingListComponent, canActivate: [AuthService] },
  { path: 'generation', component: GenerationComponent, canActivate: [AuthService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthService] },
  { path: 'details', component: RecipeDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ListingComponent,
    LoginComponent,
    GenerationComponent,
    RecipeComponent,
    ScheduleComponent,
    MealComponent,
    HomeComponent,
    RecipeDetailsComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    DragulaModule,
    FormsModule
  ],
  providers: [AuthService, AngularFireAuth, AngularFireDatabase, StorageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
