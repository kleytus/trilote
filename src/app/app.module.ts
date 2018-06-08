import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { BlankPageComponent } from './blank-page/blank-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BlankPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
