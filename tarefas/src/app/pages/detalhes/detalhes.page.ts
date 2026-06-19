import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { DatabaseService } from '../../services/database';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton]
})
export class DetalhesPage implements OnInit {
  isEditando: boolean = false;
  idAtividade: string = '';
  
  // Modelo do formulário
  tarefa: any = {
    titulo: '',
    descricao: '',
    data: ''
  };

  constructor(
    private router: Router,
    private dbService: DatabaseService
  ) {
    // Captura os dados passados por parâmetro via Router State (Navegação)
    const navegacao = this.router.getCurrentNavigation();
    if (navegacao?.extras.state && navegacao.extras.state['data']) {
      const dadosAtividade = navegacao.extras.state['data'];
      this.tarefa = { ...dadosAtividade };
      this.idAtividade = dadosAtividade.id;
      this.isEditando = true;
    }
  }

  ngOnInit() {}

  salvar() {
    if (!this.tarefa.titulo || !this.tarefa.descricao) {
      alert('Por favor, preencha o título e a descrição!');
      return;
    }

    if (this.isEditando) {
      // Executa o UPDATE no serviço
      this.dbService.updateAtividade(this.idAtividade, this.tarefa).then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      // Executa o CREATE no serviço
      this.dbService.addAtividade(this.tarefa).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}