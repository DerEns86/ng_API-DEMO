import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipe', component: RecipeComponent },
];
