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
import { Product } from '@/models/product';

const ProductsContext = createContext<any>({})

export const ProductsProvider = ({ children }) => {
    const product = useProductsProvider()
    return <ProductsContext.Provider value={product} >{children}</ProductsContext.Provider>
}

export const useProducts = () => {
    return useContext(ProductsContext)
}

export const useProductsProvider = () => {
    const [products, setProducts] = useState([])

    const createProduct = async (productData: Product) => {
        console.log(productData)
        return setDoc(doc(db, 'products', productData.id), productData)
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getProducts = async () => {
        const products: Product[] | any = [];
        const q = query(collection(db, 'products'))
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const productData = doc.data();
                products.push(productData);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setProducts(products)
        return products
    }

    const getProductById = async (productId: string) => {
        return getDoc(doc(db, 'products', productId)).then(productData => {
            if (productData.exists()) {
                const corte = productData.data();
                return corte
            } else {
                return null
            }
        })
    }

    return {
        products,
        setProducts,
        createProduct,
        getProductById,
        getProducts,
    }
}
