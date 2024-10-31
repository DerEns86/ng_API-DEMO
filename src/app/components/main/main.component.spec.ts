import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainComponent } from "./main.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { of, throwError } from "rxjs";
import { UserService } from "../../services/user.service";

describe("MainComponent", () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getUser: jasmine.createSpy("getUser").and.returnValue(
        of({
          login: "testuser",
          name: "Test User",
          avatar_url: "https://example.com/avatar.png",
          created_at: "2020-01-01T00:00:00Z",
          url: "https://github.com/testuser",
        })
      ),
    };
    await TestBed.configureTestingModule({
      imports: [MainComponent, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch user", () => {
    //GIVEN
    const testUsername = "testuser";
    //WHEN
    component.fetchUser(testUsername);
    //THEN
    expect(userServiceMock.getUser).toHaveBeenCalledWith(testUsername);
    expect(component.user).toEqual({
      login: "testuser",
      name: "Test User",
      avatar_url: "https://example.com/avatar.png",
      created_at: "2020-01-01T00:00:00Z",
      url: "https://github.com/testuser",
    });
  });

  it("should handle error when fetching user", () => {
    userServiceMock.getUser.and.returnValue(
      throwError((err: string | undefined) => new Error(err))
    );
    component.fetchUser("invaliduser");

    expect(component.errorMessage).toBe("Somthing went wrong, Error");
  });
});
