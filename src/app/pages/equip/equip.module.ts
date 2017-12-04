import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EquipComponent } from './equip.component';

import { NmodelModule } from '../nmodel/nmodel.module';

export const routes: Routes = [
  { path: '', component: EquipComponent, pathMatch: 'full' }
];

import { E1Component } from './e1/e1.component';
import { E2Component } from './e2/e2.component';
import { E3Component } from './e3/e3.component';
import { E4Component } from './e4/e4.component';
import { ElistComponent } from './elist/elist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NmodelModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [E1Component, E2Component, E3Component, E4Component, ElistComponent, EquipComponent]
})
export class EquipModule { }
