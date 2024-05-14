'use client'
import React, { useEffect } from 'react'
import * as Styled from './style'
import { useProducts } from '@/hooks/useProduct'
import { Button, Card, Flex } from "antd";
import { useRouter } from 'next/navigation';

export default function Products() {
    const { getProducts, products, setProducts } = useProducts();
    const router = useRouter();

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await getProducts()
    }

    return (
        <Styled.Container>
            <Styled.ItemContainer>
                <Styled.StartContainer>
                    <Button type="primary" onClick={() => router.push('/dashboard/products/register-product')}>Registrar producto</Button>
                    {/* <Button type="default" onClick={() => router.push('/dashboard/products/sales')}>Registrar venta</Button> */}
                </Styled.StartContainer>
                <Flex wrap gap="small">
                    {Array.isArray(products) && products?.length > 0 && products.map(product => (
                        <Card key={product.id} title={product?.name || 'Product name'} bordered={false} style={{ width: 300 }}>
                            <p>{product.priceOfPurchase}</p>
                            <p>{product?.priceOfSell}</p>
                            <p>{product.description}</p>
                        </Card>
                    ))}
                </Flex>
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
