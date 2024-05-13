import { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Asegúrate de que la ruta a tu configuración de Firebase es correcta
import {
    collection,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';

export const useCortesRealTime = (type = 'barberia') => {
    const [cortes, setCortes] = useState([]);
    const [cortesEnEsperaRealTime, setCortesEnEspera] = useState([]);
    const [cortesEnProcesoRealTime, setCortesEnProceso] = useState([]);
    const [cortesTerminadosRealTime, setCortesTerminados] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'cortes'), where('type', '==', type));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cortesUpdated: any = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            let waiting = cortesUpdated.filter(corte => corte.status === 'En espera')
            let process = cortesUpdated.filter(corte => corte.status === 'En proceso')
            let done = cortesUpdated.filter(corte => corte.status === 'Terminado')
            setCortes(cortesUpdated);
            setCortesEnEspera(waiting)
            setCortesEnProceso(process)
            setCortesTerminados(done)
        }, error => {
            console.error("Failed to fetch cortes: ", error);
        });

        // Limpieza de la suscripción al desmontar
        return () => unsubscribe();
    }, [type]); // Dependencia [type] para re-suscribirse si el tipo cambia

    return {
        cortes,
        cortesEnEsperaRealTime,
        cortesEnProcesoRealTime,
        cortesTerminadosRealTime
    };
}
