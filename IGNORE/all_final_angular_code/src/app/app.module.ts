import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { MatMenuModule, MatSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';

const appRoutes: Routes = [
    { path: 'step1', component: Step1Component },
    { path: 'step2', component: Step2Component },
    { path: 'step3', component: Step3Component },
    { path: 'step4', component: Step4Component },
    { path: 'step5', component: Step5Component },
    { path: '', redirectTo: '/step1',pathMatch: 'full'},
    { path: '**', component: Step1Component}
];

@NgModule({
    declarations: [
        AppComponent,
        Step1Component,
        Step2Component,
        Step3Component,
        Step4Component,
        Step5Component,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
        FormsModule,

        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
