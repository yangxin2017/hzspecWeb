import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NheadComponent } from './nhead/nhead.component';
import { NinforComponent } from './ninfor/ninfor.component';
import { NrealComponent } from './nreal/nreal.component';
import { NlltjComponent } from './nlltj/nlltj.component';
import { NlbtjComponent } from './nlbtj/nlbtj.component';
import { NsjtjComponent } from './nsjtj/nsjtj.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NheadComponent, NinforComponent, NrealComponent, NlltjComponent, NlbtjComponent, NsjtjComponent
  ],
  declarations: [NheadComponent, NinforComponent, NrealComponent, NlltjComponent, NlbtjComponent, NsjtjComponent]
})
export class NmodelModule { }
