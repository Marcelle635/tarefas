import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { leafOutline, pencilOutline, trashOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton]
})
export class ItemCardComponent {
  @Input() atividade: any;
  @Input() icone: string = 'leaf-outline'; // Ícone padrão caso não venha outro

  @Output() onEditar = new EventEmitter<any>();
  @Output() onDeletar = new EventEmitter<string>();

  constructor() {
    // Registra os ícones para que fiquem disponíveis no HTML do componente
    addIcons({ leafOutline, pencilOutline, trashOutline, add });
  }
}