import { Component } from '@angular/core';
import { ColorModeComponent } from "../color-mode/color-mode.component";

@Component({
	selector: 'app-header',
	imports: [ColorModeComponent],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})
export class Header {

}
