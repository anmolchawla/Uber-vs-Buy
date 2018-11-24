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
            title: 'Step-1: Market Exploration',
            route: '/step1'
        },
        {
            title: 'Step-2: Electric Cars',
            route: '/step2'
        },
        {
            title: 'Step-3: Car Selection ',
            route: '/step3'
        },
        {
            title: 'Step-4: Uber Cost  ',
            route: '/step4'
        },
        {
            title: 'Step-5: Uber vs Buy',
            route: '/step5'
        },
    ];

}
