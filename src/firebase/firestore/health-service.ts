'use client';

import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp 
} from 'firebase/firestore';
import { EnvironmentalReport } from '@/lib/health-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveEnvironmentalReport(db: Firestore, userId: string, report: Omit<EnvironmentalReport, 'id' | 'timestamp'>) {
  const collectionRef = collection(db, 'environmental_reports');
  const data = {
    ...report,
    userId,
    timestamp: Date.now(),
    createdAt: serverTimestamp(),
  };

  addDoc(collectionRef, data).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: 'environmental_reports',
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteEnvironmentalReport(db: Firestore, reportId: string) {
  const docRef = doc(db, 'environmental_reports', reportId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
