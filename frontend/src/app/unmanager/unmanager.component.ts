import { Component, EventEmitter, Input, Output } from '@angular/core';
import { World } from '../models/world.model';

@Component({
  selector: 'app-unmanager',
  templateUrl: './unmanager.component.html',
  styleUrls: ['./unmanager.component.css'],
  standalone: true
})
export class UnmanagerComponent {
 

  @Input() imageManager = '';
  @Input() nomManager = '';
  @Input() bonusManager = '';
  @Input() prixManager = '';
  @Input() texte = 'Engager';
  @Input() isDisabled = false;

  @Output() onHire = new EventEmitter<void>();
}
