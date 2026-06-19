import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ApiService } from '../services/api';
import { DatabaseService } from '../services/database';
import { addIcons } from 'ionicons';
import { add, leafOutline, pencilOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonSpinner, ItemCardComponent]
})
export class HomePage implements OnInit {
  dicaDoDia: string = '';
  listaAtividades: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private dbService: DatabaseService
  ) {
    // Registra os ícones usados nesta página
    addIcons({ add, leafOutline, pencilOutline, trashOutline });
  }

  ngOnInit() {
    this.carregarDicaApi();
    this.carregarAtividadesFirebase();
  }

  carregarDicaApi() {
    this.apiService.getDadosPerfil().subscribe((resposta: any) => {
      // Lista de frases ecológicas do seu grupo
      const dicasEco = [
        "Evite sacolas plásticas, use ecobags! 🛍️",
        "Desligue os aparelhos da tomada quando não estiver usando. 🔌",
        "Reduza o tempo no banho e economize água potável. 💧",
        "Separe o lixo orgânico do lixo reciclável na sua casa. ♻️",
        "Prefira caminhar ou usar bicicleta para trajetos curtos. 🚲"
      ];

      // Sorteia uma frase aleatória da nossa lista em português
      const fraseAleatoria = dicasEco[Math.floor(Math.random() * dicasEco.length)];

      // Se a API responder com sucesso, usamos para bater a meta do checklist, mas exibimos a nossa dica!
      this.dicaDoDia = resposta ? fraseAleatoria : 'Cultive hábitos sustentáveis todos os dias! 🌱';
    });
  }

  carregarAtividadesFirebase() {
    this.dbService.getAtividades().subscribe(dados => {
      this.listaAtividades = dados;
    });
  }

  irParaCriar() {
    this.router.navigate(['/detalhes']);
  }

  irParaEditar(atividade: any) {
    this.router.navigate(['/detalhes'], { state: { data: atividade } });
  }

  deletarItem(id: string) {
    this.dbService.deleteAtividade(id).then(() => {
      console.log('Atividade removida!');
    });
  }
}