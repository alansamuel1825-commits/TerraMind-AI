'use client';

import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp 
} from 'firebase/firestore';
import { AgriAnalysis } from '@/lib/agri-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveAgriAnalysis(db: Firestore, userId: string, analysis: Omit<AgriAnalysis, 'id' | 'timestamp'>) {
  const collectionRef = collection(db, 'agri_analyses');
  const data = {
    ...analysis,
    userId,
    timestamp: Date.now(),
    createdAt: serverTimestamp(),
  };

  addDoc(collectionRef, data).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'agri_analyses',
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteAgriAnalysis(db: Firestore, analysisId: string) {
  const docRef = doc(db, 'agri_analyses', analysisId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
