'use client';

import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp 
} from 'firebase/firestore';
import { WasteAnalysis } from '@/lib/waste-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveWasteAnalysis(db: Firestore, userId: string, analysis: Omit<WasteAnalysis, 'id' | 'timestamp'>) {
  const collectionRef = collection(db, 'waste_analyses');
  const data = {
    ...analysis,
    userId,
    timestamp: Date.now(),
    createdAt: serverTimestamp(),
  };

  addDoc(collectionRef, data).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'waste_analyses',
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteWasteAnalysis(db: Firestore, analysisId: string) {
  const docRef = doc(db, 'waste_analyses', analysisId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
