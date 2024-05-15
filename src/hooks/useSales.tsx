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
        setSales(sales)
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
    }
}
