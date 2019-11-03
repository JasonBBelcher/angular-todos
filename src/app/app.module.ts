import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RepositoryService } from "./repository.service";
import { TodoItemComponent } from "./todo-item";


@NgModule({
  declarations: [AppComponent, TodoItemComponent],
  imports: [BrowserModule],
  providers: [RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
