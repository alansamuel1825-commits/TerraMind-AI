'use client';

import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp 
} from 'firebase/firestore';
import { CitySimulation } from '@/lib/smart-city-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveCitySimulation(db: Firestore, userId: string, simulation: Omit<CitySimulation, 'id' | 'timestamp'>) {
  const collectionRef = collection(db, 'city_simulations');
  const data = {
    ...simulation,
    userId,
    timestamp: Date.now(),
    createdAt: serverTimestamp(),
  };

  addDoc(collectionRef, data).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'city_simulations',
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteCitySimulation(db: Firestore, simulationId: string) {
  const docRef = doc(db, 'city_simulations', simulationId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
