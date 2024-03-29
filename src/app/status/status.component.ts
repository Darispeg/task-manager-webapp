import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  encapsulation   : ViewEncapsulation.None,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class StatusComponent {
  constructor() {}
}
