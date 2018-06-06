import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [CommonModule, BlankPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0JrpDZNJmHRd4YbrYOHOUdZsHL3QS-DU'
    })],
    declarations: [BlankPageComponent]
})
export class BlankPageModule {}
