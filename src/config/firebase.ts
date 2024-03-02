import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDUpWguAox0X_V2sAqw2xQb-i5ehsM3URs',
  authDomain: 'barber-app-efb28.firebaseapp.com',
  projectId: 'barber-app-efb28',
  storageBucket: 'barber-app-efb28.appspot.com',
  messagingSenderId: '419917614956',
  appId: '1:419917614956:web:ea1efc08eb50d50a592d49',
  measurementId: 'G-FQ9X23PGYY',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
