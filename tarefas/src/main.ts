import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

// 1. IMPORTANTE: Importar as funções do Angular Fire
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 2. Cole aqui as credenciais que você pegou no Console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDp4kQVKs4uw4G6BOkkhAMyC-KTtgO3hoM",
  authDomain: "tarefas-cc65b.firebaseapp.com",
  projectId: "tarefas-cc65b",
  storageBucket: "tarefas-cc65b.firebasestorage.app",
  messagingSenderId: "267136256792",
  appId: "1:267136256792:web:500cc4286677e0e36a6c6d"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    
    // 3. Inicializar os módulos do Firebase e do Banco Firestore
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
});