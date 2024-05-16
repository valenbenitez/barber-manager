'use client'
import React, { useEffect, useState } from 'react'
import * as Styled from './style'
import { useProducts } from '@/hooks/useProduct'
import { Button, Card, Flex } from "antd";
import { useRouter } from 'next/navigation';
import { useSales } from '@/hooks/useSales';
import DataTable from 'react-data-table-component';

export default function Products() {
    const [sales, setSales] = useState([])
    const { getProducts, products, setProducts } = useProducts();
    const { getSales } = useSales();
    const router = useRouter();
    const columns = [
        {
            name: 'Vendedor',
            selector: row => row?.seller?.sellerName,
        },
        {
            name: 'Cliente',
            selector: row => row?.client?.clientName,
        },
        {
            name: 'Total',
            selector: row => row.totalSale,
        },
        {
            name: 'Productos',
            selector: row => Array.isArray(row.soldProducts) && (row.soldProducts.map(prod => `x${prod.quantityToSell} - ${prod.name},`))[0],
        },
        {
            name: 'Fecha',
            selector: row => formatDate(row.saleDate),
            sortable: true
        },
    ];

    useEffect(() => {
        fetchProducts()
    }, [])

    function formatDate(
        dateObject: { seconds: number; nanoseconds: number } | any
    ) {
        const unixTimestamp =
            dateObject?.seconds * 1000 + dateObject?.nanoseconds / 1000000; // Convertir a milisegundos
        const date = new Date(unixTimestamp);

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const fetchProducts = async () => {
        await getProducts()
        const sales = await getSales()
        setSales(sales)
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
                            <p>Precio de compra: ${product.priceOfPurchase}</p>
                            <p>Precio de venta: ${product?.priceOfSell}</p>
                            <p>Stock: {product?.stock}</p>
                            <p>Descripcion: {product.description}</p>
                        </Card>
                    ))}
                </Flex>
                <DataTable
                    columns={columns}
                    data={sales}
                />
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
