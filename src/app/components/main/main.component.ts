import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { GithubUser } from "../../models/githubUser.interface";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit, OnDestroy {
  userService: UserService = inject(UserService);

  user: GithubUser | undefined | null = undefined;
  userSubscription = new Subscription();
  public username: string = "derens86";
  public errorMessage: string | null = null;

  ngOnInit(): void {
    this.fetchUser(this.username);
    console.log(this.errorMessage);
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onEnter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.username = inputElement.value;
    this.fetchUser(this.username);
    inputElement.value = "";
  }

  fetchUser(username: string): void {
    this.userSubscription = this.userService.getUser(username).subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user);
      },
      error: (error) => {
        console.error("Somthing went wrong", error);
        this.errorMessage = `Somthing went wrong, ${error}`;
        // this.username = "derens86";
      },
      complete: () => {
        console.log("Fetching data is complete");
      },
    });
  }
}
