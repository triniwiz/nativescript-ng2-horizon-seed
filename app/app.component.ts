var Horizon = require("@horizon/client/dist/horizon");
import {Component, OnInit} from "@angular/core";
const SERVER_URL = '192.168.2.5:8181';
@Component({
    selector: "my-app",
    template: `
<StackLayout>
    <Label text="Tap the button" class="title"></Label>
    
    <Button text="TAP" (tap)="onTap()"></Button>

    <Label [text]="message" class="message" textWrap="true"></Label>
</StackLayout>
`,
})
export class AppComponent implements OnInit {
    public counter: number = 16;
    private horizon = Horizon({ host: SERVER_URL, authType: 'unauthenticated' });
    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }

    public onTap() {
        this.counter--;
    }
    ngOnInit() {
        this.horizon.status()
        .subscribe((status) => {
            if(status && status.type === 'ready'){
                alert('Horizon client is ready!!!!');
            }
           
        })
        this.horizon.connect();
    }
}
