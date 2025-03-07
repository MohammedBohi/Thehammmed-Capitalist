import { Component } from '@angular/core';
import { UnmanagerComponent} from '../unmanager/unmanager.component'

@Component({
  selector: 'app-managers',
  imports: [UnmanagerComponent],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent {
}
