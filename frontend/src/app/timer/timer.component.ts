import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() duration!: number;  // Temps en millisecondes reçu du parent
  timeLeft: string = '';
  private interval: any;

  ngOnInit(): void {
    if (this.duration && this.duration > 0) {
      this.startTimer();
    } else {
      this.timeLeft = 'Durée invalide';
    }
  }

  startTimer() {
    let remainingTime = this.duration;

    // Créer un timer qui répète toutes les secondes
    this.interval = timer(0, 1000).pipe(
      switchMap(() => {
        if (remainingTime <= 0) {
          remainingTime = this.duration;  // Réinitialise la durée à chaque fois qu'il atteint zéro
        }

        remainingTime -= 1000; // Décrémenter chaque seconde
        return [remainingTime];  // Retourne la nouvelle valeur restante
      })
    ).subscribe((remainingTime: number) => {
      // Calculer les heures, minutes et secondes
      const hours = Math.floor(remainingTime / 3600000);
      const minutes = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      // Formatage des chiffres pour afficher deux chiffres
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      this.timeLeft = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    });
  }

  ngOnDestroy(): void {
    // Nettoyage de l'abonnement lors de la destruction du composant
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }
}
