'use client';

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Firestore,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { ChatThread, Message } from '@/lib/ai-assistant-types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export async function createChatThread(db: Firestore, userId: string, firstMessage: Message): Promise<string | null> {
  const collectionRef = collection(db, 'chat_threads');
  const threadData = {
    userId,
    title: firstMessage.content.substring(0, 40) + (firstMessage.content.length > 40 ? '...' : ''),
    lastMessageAt: Date.now(),
    createdAt: serverTimestamp(),
    messages: [firstMessage]
  };

  try {
    const docRef = await addDoc(collectionRef, threadData);
    return docRef.id;
  } catch (error) {
    const permissionError = new FirestorePermissionError({
      path: 'chat_threads',
      operation: 'create',
      requestResourceData: threadData,
    });
    errorEmitter.emit('permission-error', permissionError);
    return null;
  }
}

export function updateChatThread(db: Firestore, threadId: string, messages: Message[]) {
  const docRef = doc(db, 'chat_threads', threadId);
  updateDoc(docRef, {
    messages,
    lastMessageAt: Date.now()
  }).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'update',
      requestResourceData: { messages },
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function renameChatThread(db: Firestore, threadId: string, newTitle: string) {
  const docRef = doc(db, 'chat_threads', threadId);
  updateDoc(docRef, { title: newTitle }).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'update',
      requestResourceData: { title: newTitle },
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}

export function deleteChatThread(db: Firestore, threadId: string) {
  const docRef = doc(db, 'chat_threads', threadId);
  deleteDoc(docRef).catch(async (error) => {
    const permissionError = new FirestorePermissionError({
      path: docRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
}
