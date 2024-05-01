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
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Corte } from '@/models/cortes';

const CortesContext = createContext<any>({})

export const CortesProvider = ({ children }) => {
    const corte = useCortesProvider()
    return <CortesContext.Provider value={corte}>{children}</CortesContext.Provider>
}

export const useCortes = () => {
    return useContext(CortesContext)
}

export const useCortesProvider = () => {
    const [cortes, setCortes] = useState([]);
    const [cortesEnEspera, setCortesEnEspera] = useState([]);
    const [cortesEnProceso, setCortesEnProceso] = useState([]);
    const [cortesTerminados, setCortesTerminados] = useState([]);



    const getCortes = async (type: 'barberia' | 'peluqueria' | 'belleza' = 'barberia') => {
        const cortes: Corte[] | any = [];
        const q = query(collection(db, 'cortes'), where('type', '==', type));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const corteData = doc.data();
                cortes.push(corteData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        let waiting = cortes.filter(corte => corte.status === 'En espera')
        let process = cortes.filter(corte => corte.status === 'En proceso')
        let done = cortes.filter(corte => corte.status === 'Terminado')
        setCortes(cortes)
        setCortesEnEspera(waiting)
        setCortesEnProceso(process)
        setCortesTerminados(done)
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
        await getCorteById(corteId)
        const cortesUpdated = await getCortes()
        return cortesUpdated
    }
    return {
        createCorte,
        getCorteById,
        updateCorte,
        getCortes,
        cortes,
        cortesEnEspera,
        cortesEnProceso,
        cortesTerminados,
        setCortes
    }
}