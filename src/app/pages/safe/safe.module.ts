import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SafeComponent } from './safe.component';

import { NmodelModule } from '../nmodel/nmodel.module';
import { BjglComponent } from './bjgl/bjgl.component';
import { LdsmComponent } from './ldsm/ldsm.component';
import { EyljComponent } from './eylj/eylj.component';

export const routes: Routes = [
  { path: '', component: SafeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NmodelModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SafeComponent, BjglComponent, LdsmComponent, EyljComponent]
})
export class SafeModule { }
