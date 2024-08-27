'use client'
import {
    collection,
    deleteDoc,
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
import { Appointment } from '@/models/appointment';

const AppointmentContext = createContext<any>({})

export const AppointmentsProvider = ({ children }) => {
    const appointment = useAppointmentsProvider()
    return <AppointmentContext.Provider value={appointment} >{children}</AppointmentContext.Provider>
}

export const useAppointments = () => {
    return useContext(AppointmentContext)
}

export const useAppointmentsProvider = () => {
    const [appointments, setAppointments] = useState([])

    const createAppointment = async (productData: Appointment) => {
        console.log(productData)
        return setDoc(doc(db, 'appointments', productData.id), productData)
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getAppointments = async () => {
        const products: Appointment[] | any = [];
        const q = query(collection(db, 'appointments'))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const productData = doc.data();
                products.push(productData);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setAppointments(products)
        return products
    }

    const getDatesBooked = async () => {
        const appointments: any = [];
        const q = query(collection(db, 'appointments'));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const date = data.appointmentDate.toDate();
                appointments.push(date);
            });
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
        return appointments;
    }

    const getAppointmentById = async (productId: string) => {
        return getDoc(doc(db, 'appointments', productId)).then(productData => {
            if (productData.exists()) {
                const corte = productData.data();
                return corte
            } else {
                return null
            }
        })
    }

    async function deleteAppointment(appointmentId: string) {
        try {
            await deleteDoc(doc(db, 'appointments', appointmentId));
            await getAppointments();
            console.log(`Documento con ID ${appointmentId} eliminado correctamente.`);
        } catch (error) {
            console.error("Error eliminando el documento: ", error);
        }
    }

    const updateAppointment = async (appointmentId: string, data: any): Promise<void> => {
        console.log({ userId: appointmentId, data });
        const appointmentRef = doc(db, 'appointments', appointmentId);
        await updateDoc(appointmentRef, { ...data });
        const newProduct = await getAppointments();
        console.log(newProduct);
        return;
    };

    return {
        appointments,
        setAppointments,
        createAppointment,
        getAppointmentById,
        getAppointments,
        deleteAppointment,
        updateAppointment,
        getDatesBooked,
    }
}
