import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
