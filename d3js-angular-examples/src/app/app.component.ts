import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "Hat Trick's Online Buy vs Uber Decision Tool" ;

    examples = [
        {
            title: 'Step-1',
            route: '/step1'
        },
        {
            title: 'Step-2',
            route: '/step2'
        },
        {
            title: 'Step-3',
            route: '/step3'
        },
        {
            title: 'Step-4',
            route: '/step4'
        },
    ];

}
