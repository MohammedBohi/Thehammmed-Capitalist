import { Component, Input, Output, EventEmitter } from '@angular/core';
import { World } from '../models/world.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investors.component.html',
  styleUrl: './investors.component.css',
})
export class InvestorsComponent {
  @Input() world!: World;
  @Output() onClaim = new EventEmitter<void>();

  claimInvestors() {
    this.onClaim.emit();
  }
}
