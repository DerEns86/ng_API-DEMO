import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { PostComponent } from './pages/post/post.component';
import { AddPostComponent } from './pages/post/add-post/add-post.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'post', component: PostComponent },
  { path: 'add-post', component: AddPostComponent },
];
