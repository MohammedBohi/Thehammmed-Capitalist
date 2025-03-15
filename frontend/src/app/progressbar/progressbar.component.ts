import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebserviceService } from '../webservice.service';

export enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

@Component({
  selector: 'app-progressbar',
  imports: [CommonModule],
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  template: '<canvas style="height: 100%; width: 100%" #canvasRef></canvas>',
})
export class ProgressbarComponent implements OnInit, OnChanges, OnDestroy {
  isPopupOpen = true;
  @Input() frontcolor = '';
  backcolor = 'rgba(34, 34, 34, 0.1)';
  @Input() initialValue = 0; // valeur initiale de la barre
  @Input() vitesse = 60000; // durée totale en ms (ex. 60000 ms = 1 minute)
  @Input() orientation: Orientation = Orientation.horizontal;
  @Input() auto = true;
  @Input() run = true;

  @ViewChild('canvasRef') canvasRef: ElementRef | undefined;
  animationRef = { value: 0 };

  // Mémorisation du temps écoulé avant la pause (en ms)
  elapsedBeforePause: number = 0;
  // pour savoir quand l'animation a commencé.
  animationStartTime: number | undefined;

  constructor(
    private ngZone: NgZone,
    private service: WebserviceService,
  ) {}

  ngOnInit() {
    // Abonnement aux changements de la popup
    this.service.popupState.subscribe((value) => {
      this.isPopupOpen = value;
      if (!this.isPopupOpen) {
        // Quand la popup se ferme, on reprend l'animation
        setTimeout(() => {
          this.restartAnim();
        }, 200);
      }
    });
  }

  ngAfterViewInit() {
    // Au démarrage, on lance l'animation si "run" est activé
    if (this.run) {
      this.restartAnim();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.hasOwnProperty('initialValue') ||
      changes.hasOwnProperty('vitesse') ||
      changes.hasOwnProperty('run')
    ) {
      // Redémarre l'animation si une propriété change, sauf si la popup est ouverte
      if (!this.isPopupOpen) {
        setTimeout(() => {
          this.restartAnim();
        }, 200);
      }
    }
  }

  restartAnim() {
    if (this.vitesse > 0 && this.canvasRef) {
      // Si une animation précédente existe, on l'annule et on garde l'état de la progression.
      if (this.animationRef.value !== 0) {
        cancelAnimationFrame(this.animationRef.value);
      }

      // L'animation redémarre en tenant compte du temps déjà écoulé avant la pause
      this.ngZone.runOutsideAngular(() => {
        this.animate(
          this.canvasRef!,
          this.initialValue,
          this.orientation,
          this.vitesse,
          this.animationRef,
          this.auto,
          this.frontcolor,
          this.backcolor,
        );
      });
    }
  }

  ngOnDestroy() {
    // On annule l'animation si elle est en cours
    if (this.animationRef.value !== 0) {
      cancelAnimationFrame(this.animationRef.value);
    }
  }

  /**
   * Fonction qui démarre l'animation
   * Elle va continuer là où elle s'est arrêtée en tenant compte du temps de pause.
   */
  animate(
    canvasRef: ElementRef,
    initialValue: number,
    orientation: Orientation,
    vitesse: number,
    animationRef: { value: number },
    auto: boolean,
    frontcolor: string,
    backcolor: string,
  ) {
    const ctx = canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    let widthRef = 0;
    let reflength = canvasRef.nativeElement.width;
    if (orientation === Orientation.vertical) {
      reflength = canvasRef.nativeElement.height;
    }

    const draw = (timestamp: number) => {
      // Si c'est la première animation (pas encore démarrée), on initialise l'heure de départ
      if (this.animationStartTime === undefined) {
        // La première fois, on utilise le timestamp actuel comme point de départ
        this.animationStartTime = timestamp - this.elapsedBeforePause;
      }

      // Temps écoulé depuis le début de l'animation, y compris le temps de pause
      const elapsed = timestamp - this.animationStartTime;
      // Calcul du pourcentage d'avancement basé sur le temps écoulé
      const percent = (elapsed * 100) / vitesse;
      widthRef = (percent * reflength) / 100;

      // Dessin du fond
      const width = canvasRef.nativeElement.width;
      const height = canvasRef.nativeElement.height;
      ctx.fillStyle = backcolor || 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(0, 0, width, height);

      // Dessin de la barre de progression
      ctx.fillStyle = frontcolor || '#ffdcd7';
      if (orientation === Orientation.horizontal) {
        ctx.fillRect(0, 0, widthRef, height);
      } else {
        ctx.fillRect(0, height - widthRef, width, height);
      }

      // Si la barre est encore en progression, on continue l'animation
      if (widthRef < reflength) {
        animationRef.value = requestAnimationFrame(draw);
      } else {
        this.animationStartTime = undefined; // Redémarre l'animation à partir de zéro
        animationRef.value = requestAnimationFrame(draw);
      }
    };

    // Lancer l'animation
    animationRef.value = requestAnimationFrame(draw);
  }
}
