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
import { isToday, isThisWeek, isThisMonth, parseISO, isSameDay, isSameMonth, isSameWeek } from 'date-fns';

const CortesContext = createContext<any>({})

export const CortesProvider = ({ children }) => {
    const corte = useCortesProvider()
    return <CortesContext.Provider value={corte}>{children}</CortesContext.Provider>
}

export const useCortes = () => {
    return useContext(CortesContext)
}

export const useCortesProvider = () => {
    const [cortes, setCortes] = useState<any>([]);
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
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
            totalOfDay = totalOfDay + Number(cleanedString)
        });
        cortesEstaSemana.forEach((op) => {
            const price = op?.price
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
            totalOfWeek = totalOfWeek + Number(cleanedString)
        });
        cortesEsteMes.forEach((op) => {
            const price = op?.price
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
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

    const getCortesByBarberId = async (barberId: string) => {
        const cortes: Corte[] | any = [];
        const q = query(collection(db, 'cortes'), where('barberId', '==', barberId), orderBy('createdDate', 'desc'))
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

    const filterCortesByDate = async (filterDate: string = '') => {
        const date = filterDate ? parseISO(filterDate) : null;
        const cortes: Corte[] | any = [];
        const sameDay: Corte[] | any = [];
        const sameWeek: Corte[] | any = [];
        const sameMonth: Corte[] | any = [];
        let totalOfDay = 0
        let totalOfWeek = 0
        let totalOfMonth = 0
        const q = query(collection(db, 'cortes'), orderBy('createdDate', 'desc'));
        try {
            const querySnapshot = await getDocs(q);
            if (date) {
                querySnapshot.forEach((doc: any) => {
                    const corteData = doc.data();
                    const createdDate = new Date(corteData.createdDate.seconds * 1000);
                    if (isSameDay(createdDate, date)) {
                        sameDay.push(corteData);
                    }
                    if (isSameWeek(createdDate, date)) {
                        sameWeek.push(corteData);
                    }
                    if (isSameMonth(createdDate, date)) {
                        sameMonth.push(corteData);
                    }
                });
            } else {
                querySnapshot.forEach((doc) => {
                    const corteData = doc.data();
                    cortes.push(corteData);
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }

        if (!date) {
            const cortesHoy = cortes.filter(corte => isToday(new Date(corte.createdDate.seconds * 1000)));
            const cortesEstaSemana = cortes.filter(corte => isThisWeek(new Date(corte.createdDate.seconds * 1000), { weekStartsOn: 1 }));
            const cortesEsteMes = cortes.filter(corte => isThisMonth(new Date(corte.createdDate.seconds * 1000)));
            cortesHoy.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
                totalOfDay = totalOfDay + Number(cleanedString)
            });
            cortesEstaSemana.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
                totalOfWeek = totalOfWeek + Number(cleanedString)
            });
            cortesEsteMes.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
                totalOfMonth = totalOfMonth + Number(cleanedString)
            });
            setCortesOfDay(cortesHoy)
            setCortesOfWeek(cortesEstaSemana)
            setCortesOfMonth(cortesEsteMes)
            setBilledToday(totalOfDay)
            setBilledWeek(totalOfWeek)
            setBilledMonth(totalOfMonth)
        } else {
            sameDay.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
                totalOfDay = totalOfDay + Number(cleanedString)
            });
            sameWeek.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
                totalOfWeek = totalOfWeek + Number(cleanedString)
            });
            sameMonth.forEach((op) => {
                const price = op?.price
                const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price
                totalOfMonth = totalOfMonth + Number(cleanedString)
            });
            setCortesOfDay(sameDay)
            setCortesOfWeek(sameWeek)
            setCortesOfMonth(sameMonth)
            setBilledToday(totalOfDay)
            setBilledWeek(totalOfWeek)
            setBilledMonth(totalOfMonth)
        }
    }

    return {
        createCorte,
        getCorteById,
        updateCorte,
        getCortes,
        getCortesByBarberId,
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
        filterCortesByDate,
    }
}