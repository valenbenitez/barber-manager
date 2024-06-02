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
import { Sale } from '@/models/sale';
import { isToday, isThisWeek, isThisMonth } from 'date-fns';

const SalesContext = createContext<any>({})

export const SalesProvider = ({ children }) => {
    const sale = useSalesProvider()
    return <SalesContext.Provider value={sale} >{children}</SalesContext.Provider>
}

export const useSales = () => {
    return useContext(SalesContext)
}

export const useSalesProvider = () => {
    const [sales, setSales] = useState([])
    const [salesOfDay, setSalesOfDay] = useState([]);
    const [salesOfWeek, setSalesOfWeek] = useState([]);
    const [salesOfMonth, setSalesOfMonth] = useState([]);
    const [salesTotalToday, setSalesTotalToday] = useState(0);
    const [salesTotalWeek, setSalesTotalWeek] = useState(0);
    const [salesTotalMonth, setSalesTotalMonth] = useState(0);

    const createSale = async (saleData: Sale) => {
        console.log(saleData)
        return setDoc(doc(db, 'sales', saleData.id), saleData)
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getSales = async () => {
        const sales: Sale[] | any = [];
        let totalOfDay = 0
        let totalOfWeek = 0
        let totalOfMonth = 0
        const q = query(collection(db, 'sales'))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const saleData = doc.data();
                sales.push(saleData);
            });
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
        const salesHoy = sales.filter(corte => isToday(new Date(corte.saleDate.seconds * 1000)));
        const salesEstaSemana = sales.filter(corte => isThisWeek(new Date(corte.saleDate.seconds * 1000), { weekStartsOn: 1 }));
        const salesEsteMes = sales.filter(corte => isThisMonth(new Date(corte.saleDate.seconds * 1000)));
        salesHoy.forEach((op) => {
            const price = op?.totalSale
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
            totalOfDay = totalOfDay + Number(cleanedString)
        });
        salesEstaSemana.forEach((op) => {
            const price = op?.totalSale
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
            totalOfWeek = totalOfWeek + Number(cleanedString)
        });
        salesEsteMes.forEach((op) => {
            const price = op?.totalSale
            const cleanedString = typeof price === 'string' ? price.replace(/\./g, '') : price;
            totalOfMonth = totalOfMonth + Number(cleanedString)
        });
        setSales(sales)
        setSalesOfDay(salesHoy)
        setSalesOfWeek(salesEstaSemana)
        setSalesOfMonth(salesEsteMes)
        setSalesTotalToday(totalOfDay)
        setSalesTotalWeek(totalOfWeek)
        setSalesTotalMonth(totalOfMonth)
        return sales
    }

    const getSaleById = async (saleId: string) => {
        return getDoc(doc(db, 'sales', saleId)).then(saleData => {
            if (saleData.exists()) {
                const sale = saleData.data();
                return sale
            } else {
                return null
            }
        })
    }

    return {
        sales,
        setSales,
        createSale,
        getSaleById,
        getSales,
        salesOfDay,
        salesOfWeek,
        salesOfMonth,
        salesTotalToday,
        salesTotalWeek,
        salesTotalMonth,
    }
}
