import { Component } from '@angular/core';
import { routes } from '../../../../core/core.index';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ui-modals',
    templateUrl: './ui-modals.component.html',
    styleUrl: './ui-modals.component.scss',
    imports: [RouterLink]
})
export class UiModalsComponent {
  public routes = routes;
}
