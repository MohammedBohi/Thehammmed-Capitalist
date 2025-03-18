import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() showManagersEvent = new EventEmitter<void>();
  @Output() showUnlocksEvent = new EventEmitter<void>();
  @Output() showUpgradesEvent = new EventEmitter<void>();
  @Output() showInvestorsEvent = new EventEmitter<void>();
  @Output() showStatsEvent = new EventEmitter<void>();
  @Output() showAngelUpgradesEvent = new EventEmitter<void>();
  
  
  openManagers() { this.showManagersEvent.emit(); }
  openUnlocks() { this.showUnlocksEvent.emit(); }
  openUpgrades() { this.showUpgradesEvent.emit(); }
  openInvestors() { this.showInvestorsEvent.emit(); }
  openStats() { this.showStatsEvent.emit(); }
  openAngelUpgrades() { this.showAngelUpgradesEvent.emit(); }
  
  
}
