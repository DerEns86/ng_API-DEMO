import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { RecipeService } from '../../services/recipe.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  let service: RecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        RecipeService,
      ],
    }).compileComponents();

    service = TestBed.inject(RecipeService);

    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
