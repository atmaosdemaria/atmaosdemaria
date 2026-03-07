// SUAS CREDENCIAIS DO FIREBASE - SUBSTITUA COM OS SEUS DADOS
const firebaseConfig = {
  apiKey: "AIzaSyCyIwCfZ0LxoWPF1UfjeIwSybnDuLixDLo",
  authDomain: "ateliemaosdemaria-9d4ac.firebaseapp.com",
  projectId: "ateliemaosdemaria-9d4ac",
  storageBucket: "ateliemaosdemaria-9d4ac.firebasestorage.app",
  messagingSenderId: "663766218606",
  appId: "1:663766218606:web:d6b725ff439a076c2b737f",
  measurementId: "G-267QFJGT8Z"
  
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências globais
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();