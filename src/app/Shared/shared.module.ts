import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 @NgModule({ 
    imports: [
        CommonModule, 
        RouterModule,
        CdkStepperModule,
        ReactiveFormsModule,
        FormsModule
    ], 
    exports: [ 
        CdkStepperModule, 
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule { }