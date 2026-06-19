import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // Lista simulada de atividades locais (CRUD)
  private atividadesIniciais = [
    { id: '1', titulo: 'Reciclagem de Plástico', descricao: 'Separar garrafas PET para o ponto de coleta.', data: '2026-06-19' },
    { id: '2', titulo: 'Plantio de Mudas', descricao: 'Plantar mudas de árvores nativas no jardim da faculdade.', data: '2026-06-20' }
  ];

  private atividadesSubject = new BehaviorSubject<any[]>(this.atividadesIniciais);

  constructor() { }

  // READ (Listar) - Usado na Home
  getAtividades(): Observable<any[]> {
    return this.atividadesSubject.asObservable();
  }

  // CREATE (Inserir) - Usado nos Detalhes
  addAtividade(atividade: any): Promise<void> {
    return new Promise((resolve) => {
      const listaAtual = this.atividadesSubject.value;
      atividade.id = Math.random().toString(36).substring(2, 9); // Gera ID temporário
      listaAtual.push(atividade);
      this.atividadesSubject.next(listaAtual);
      resolve();
    });
  }

  // UPDATE (Atualizar) - Usado nos Detalhes
  updateAtividade(id: string, atividadeAtualizada: any): Promise<void> {
    return new Promise((resolve) => {
      const listaAtual = this.atividadesSubject.value;
      const index = listaAtual.findIndex(item => item.id === id);
      
      if (index !== -1) {
        listaAtual[index] = { ...listaAtual[index], ...atividadeAtualizada };
        this.atividadesSubject.next(listaAtual);
      }
      resolve();
    });
  }

  // DELETE (Excluir) - Usado na Home
  deleteAtividade(id: string): Promise<void> {
    return new Promise((resolve) => {
      const listaAtual = this.atividadesSubject.value;
      const listaFiltrada = listaAtual.filter(item => item.id !== id);
      this.atividadesSubject.next(listaFiltrada);
      resolve();
    });
  }
}