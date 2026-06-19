import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }

  // READ (Listar em tempo real) - Substitui o Subject antigo
  getAtividades(): Observable<any[]> {
    const atividadesRef = collection(this.firestore, 'atividades');
    // O { idField: 'id' } garante que o ID gerado pelo Firebase venha junto no objeto do card
    return collectionData(atividadesRef, { idField: 'id' }) as Observable<any[]>;
  }

  // CREATE (Inserir no Cloud Firestore)
  addAtividade(atividade: any): Promise<any> {
    const atividadesRef = collection(this.firestore, 'atividades');
    return addDoc(atividadesRef, atividade);
  }

  // UPDATE (Atualizar um documento específico)
  updateAtividade(id: string, atividadeAtualizada: any): Promise<void> {
    const documentoRef = doc(this.firestore, `atividades/${id}`);
    return updateDoc(documentoRef, atividadeAtualizada);
  }

  // DELETE (Remover um documento do banco)
  deleteAtividade(id: string): Promise<void> {
    const documentoRef = doc(this.firestore, `atividades/${id}`);
    return deleteDoc(documentoRef);
  }
}