import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { ItemCardComponent } from '../components/item-card/item-card.component';
import { ApiService } from '../services/api';
import { DatabaseService } from '../services/database';

// 1. IMPORTANTE: Importar o addIcons e os ícones do Ionicons
import { addIcons } from 'ionicons';
import { add, leafOutline, createOutline, trashOutline } from 'ionicons/icons';

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
    // 2. IMPORTANTE: Registrar os ícones aqui no construtor da Home
    addIcons({ add, leafOutline, createOutline, trashOutline });
  }

  ngOnInit() {
    this.carregarDicaApi();
    this.carregarAtividadesFirebase();
  }

  carregarDicaApi() {
    // Chamada simulada do seu serviço de API RESTful
    this.apiService.getDadosPerfil().subscribe((resposta: any) => {
      // Exemplo pegando o nome da empresa/frase do JSONPlaceholder
      this.dicaDoDia = resposta?.company?.catchPhrase || 'Economize água hoje!';
    });
  }

  carregarAtividadesFirebase() {
    // Chamada para ler os dados do banco Firebase
    this.dbService.getAtividades().subscribe(dados => {
      this.listaAtividades = dados;
    });
  }

  irParaCriar() {
    this.router.navigate(['/detalhes']);
  }

  irParaEditar(atividade: any) {
    // Passa o objeto a ser editado através do estado da rota
    this.router.navigate(['/detalhes'], { state: { data: atividade } });
  }

  deletarItem(id: string) {
    this.dbService.deleteAtividade(id).then(() => {
      console.log('Atividade removida!');
    });
  }
}