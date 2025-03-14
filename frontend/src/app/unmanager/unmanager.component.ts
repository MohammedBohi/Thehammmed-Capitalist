import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-unmanager',
  imports: [],
  templateUrl: './unmanager.component.html',
  styleUrl: './unmanager.component.css'
})
export class UnmanagerComponent {
  @Input() imageManager = '';
  @Input() nomManager = 'Dora';
  @Input() bonusManager = 'Bonus';
  @Input() prixManager = 'Il est trop cher pour toi';
  @Input() texte = "acheter";

}
