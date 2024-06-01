'use client'
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import React, { createContext, useContext, useState } from 'react';
import { Corte } from '@/models/cortes';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';

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
    const [cortesOfDay, setCortesOfDay] = useState([]);
    const [cortesOfWeek, setCortesOfWeek] = useState([]);
    const [cortesOfMonth, setCortesOfMonth] = useState([]);
    const [billedToday, setBilledToday] = useState(0);
    const [billedWeek, setBilledWeek] = useState(0);
    const [billedMonth, setBilledMonth] = useState(0);

    const getCortes = async (type: 'barberia' | 'peluqueria' | 'belleza' = 'barberia') => {
        const cortes: Corte[] | any = [];
        let totalOfDay = 0
        let totalOfWeek = 0
        let totalOfMonth = 0
        const q = query(collection(db, 'cortes'), where('type', '==', type), orderBy('createdDate', 'desc'));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const corteData = doc.data();
                cortes.push(corteData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        const cortesHoy = cortes.filter(corte => isToday(new Date(corte.createdDate.seconds * 1000)));
        const cortesEstaSemana = cortes.filter(corte => isThisWeek(new Date(corte.createdDate.seconds * 1000), { weekStartsOn: 1 }));
        const cortesEsteMes = cortes.filter(corte => isThisMonth(new Date(corte.createdDate.seconds * 1000)));
        cortesHoy.forEach((op) => {
            const price = op?.price
            const cleanedString = price.replace(/\./g, '');
            totalOfDay = totalOfDay + Number(cleanedString)
        });
        cortesEstaSemana.forEach((op) => {
            const price = op?.price
            const cleanedString = price.replace(/\./g, '');
            totalOfWeek = totalOfWeek + Number(cleanedString)
        });
        cortesEsteMes.forEach((op) => {
            const price = op?.price
            const cleanedString = price.replace(/\./g, '');
            // console.log(cleanedString, op.id)
            totalOfMonth = totalOfMonth + Number(cleanedString)
        });
        const waiting = cortes.filter(corte => corte.status === 'En espera')
        const process = cortes.filter(corte => corte.status === 'En proceso')
        const done = cortes.filter(corte => corte.status === 'Terminado')

        setCortes(cortes)
        setCortesEnEspera(waiting)
        setCortesEnProceso(process)
        setCortesTerminados(done)
        setCortesOfDay(cortesHoy)
        setCortesOfWeek(cortesEstaSemana)
        setCortesOfMonth(cortesEsteMes)
        setBilledToday(totalOfDay)
        setBilledWeek(totalOfWeek)
        setBilledMonth(totalOfMonth)
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

    const getCorteByBarberId = async (barberId: string) => {
        const cortes: Corte[] | any = [];
        const q = query(collection(db, 'cortes'), where(barberId, '==', barberId))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const corteData = doc.data();
                cortes.push(corteData);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        return cortes
    }

    const updateCorte = async (corteId: string, data: any) => {
        const corteRef = doc(db, 'cortes', corteId)
        await updateDoc(corteRef, { ...data })
        await getCorteById(corteId)
        const cortesUpdated = await getCortes()
        return cortesUpdated
    }

    async function deleteCorte(corteId: string) {
        try {
            await deleteDoc(doc(db, 'cortes', corteId));
            await getCortes();
            console.log(`Documento con ID ${corteId} eliminado correctamente.`);
        } catch (error) {
            console.error("Error eliminando el documento: ", error);
        }
    }

    return {
        createCorte,
        getCorteById,
        updateCorte,
        getCortes,
        getCorteByBarberId,
        cortes,
        cortesEnEspera,
        cortesEnProceso,
        cortesTerminados,
        cortesOfDay,
        cortesOfWeek,
        cortesOfMonth,
        billedToday,
        billedWeek,
        billedMonth,
        setCortes,
        deleteCorte,
    }
}