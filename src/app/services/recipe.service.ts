import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private BASE_URL = 'https://dummyjson.com/recipes';

  http: HttpClient = inject(HttpClient);
  constructor() {}

  recipes$ = this.http
    .get<Recipe[]>(this.BASE_URL + '?limit=15')
    .pipe(map((response: any) => response.recipes));
}
