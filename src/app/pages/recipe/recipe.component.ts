import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipeComponent {
  recipeService: RecipeService = inject(RecipeService);
  recipe$ = this.recipeService.recipes$;

  constructor() {}
}
