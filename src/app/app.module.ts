import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RepositoryService } from "./repository.service";
import { TodoItemsComponent } from "./todo-items";


@NgModule({
  declarations: [AppComponent, TodoItemsComponent],
  imports: [BrowserModule],
  providers: [RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
