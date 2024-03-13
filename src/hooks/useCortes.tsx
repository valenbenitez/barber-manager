'use client'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import React, { createContext, useContext, useState } from 'react';

const CortesContext = createContext<any>({})

export const CortesProvider = ({ children }) => {
    const corte = useCortesProvider()
    return <CortesContext.Provider value={corte}>{children}</CortesContext.Provider>
}

export const useCortes = () => {
    return useContext(CortesContext)
}

export const useCortesProvider = () => {

    const getCortes = async () => {
        const cortes: any = [];
        const q = query(collection(db, 'cortes'));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                cortes.push(userData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        return cortes;
    }

    const createCorte = async (corte: any) => {
        return setDoc(doc(db, 'cortes', corte.id), corte)
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getCorteById = async (corteId: string) => {
        return getDoc(doc(db, 'cortes', corteId)).then(corteData => {
            if (corteData.exists()) {
                const corte = corteData.data();
                return corte
            } else {
                return null
            }
        })
    }

    const updateCorte = async (corteId: string, data: any) => {
        const corteRef = doc(db, 'cortes', corteId)
        await updateDoc(corteRef, { ...data })
        const newCorte = await getCorteById(corteId)
        return newCorte;
    }
    return {
        createCorte,
        getCorteById,
        updateCorte,
        getCortes,
    }
}