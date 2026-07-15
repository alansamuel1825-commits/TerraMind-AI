'use client';

import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp 
} from 'firebase/firestore';
import { EnergySimulation } from '@/lib/energy-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveEnergySimulation(db: Firestore, userId: string, simulation: Omit<EnergySimulation, 'id' | 'timestamp'>) {
  const collectionRef = collection(db, 'energy_simulations');
  const data = {
    ...simulation,
    userId,
    timestamp: Date.now(),
    createdAt: serverTimestamp(),
  };

  addDoc(collectionRef, data).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'energy_simulations',
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteEnergySimulation(db: Firestore, simulationId: string) {
  const docRef = doc(db, 'energy_simulations', simulationId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
