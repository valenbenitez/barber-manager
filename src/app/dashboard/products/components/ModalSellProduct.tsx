import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Modal } from 'antd';
import { useProducts } from '@/hooks/useProduct';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import { useSales } from '@/hooks/useSales';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/hooks/useUser';

const ModalSellProduct = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: any }) => {
    const [productsSelected, setProductsSelected] = useState<any>([])
    const [totalSale, setTotalSale] = useState<any>(0)
    const [clients, setClients] = useState<any>([])
    const [employees, setEmployees] = useState<any>([])
    const [clientSelected, setClient] = useState<any>({})
    const [sellerSelected, setSeller] = useState<any>({})
    const { getProducts, products, updateProduct } = useProducts();
    const { createSale } = useSales();
    const { getUsersByRole, getUserById } = useUser();
    const options: SelectProps['options'] = [];
    Array.isArray(products) && products.map(prod => (
        options.push({ value: prod.id, label: prod.name })
    ))

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        calculateTotal()
    }, [productsSelected])

    const fetchProducts = async () => {
        const clientsArray: any = []
        const employeesArray: any = []
        const products = await getProducts()
        const clientsData = await getUsersByRole('client')
        const employeesData = await getUsersByRole('employee')
        if (Array.isArray(clientsData)) {
            clientsData.forEach(client => {
                clientsArray.push({ value: client.id, label: client.name });
            });
        }
        if (Array.isArray(employeesData)) {
            employeesData.forEach(client => {
                employeesArray.push({ value: client.id, label: client.name });
            });
        }
        setEmployees(employeesArray)
        setClients(clientsArray)
        Array.isArray(products) && products.map(prod => (
            options.push({ value: prod.id, label: prod.name })
        ))
    }

    const handleClientSelected = async (userId: string) => {
        const user = await getUserById(userId)
        setClient(user)
    }

    const handleSellerSelected = async (userId: string) => {
        const user = await getUserById(userId)
        setSeller(user)
    }

    const handleOk = async () => {
        try {
            const post = {
                id: uuidv4(),
                saleDate: new Date(),
                client: {
                    clientId: clientSelected.id,
                    clientName: sellerSelected.name,
                },
                seller: {
                    sellerId: sellerSelected.id,
                    sellerName: sellerSelected.name,
                },
                soldProducts: productsSelected,
                totalSale: totalSale,
                paymentMethod: 'efectivo'
            }
            for (const product of productsSelected) {
                const stockUpdated = product.stock - product.quantityToSell;
                await updateProduct(product.id, { stock: stockUpdated });
            }
            await createSale(post)
            setProductsSelected([])
            setTotalSale(0)
            setClient({})
            return
        } catch (error) {
            console.log(error)
            return alert('Ocurrio un error, intentalo de nuevo')
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string[]) => {
        let total = 0
        const productosSeleccionados = products.filter(producto =>
            value.includes(producto.id)
        ).map(producto => ({
            ...producto,
            quantityToSell: 1  // Agrega la propiedad quantityToSell a cada objeto producto
        }));
        productosSeleccionados.map(prod => {
            total = prod.priceOfSell + total
        })
        setTotalSale(total)
        setProductsSelected(productosSeleccionados)
    };

    const updateQuantity = (productId: string, increment: boolean) => {
        setProductsSelected(productsSelected.map((product: any) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantityToSell: increment ? product.quantityToSell + 1 : Math.max(0, product.quantityToSell - 1)
                };
            }
            return product;
        }));
        calculateTotal()
    };

    const handleTotal = (e: any) => {
        setTotalSale(Number(e.target.value))
    }

    const calculateTotal = () => {
        let total = 0;
        productsSelected.forEach(product => {
            if (product.quantityToSell > 1) {
                const amount = product.priceOfSell * product.quantityToSell;
                total = total + amount
            } else {
                total = total + product.priceOfSell
            }
        });
        setTotalSale(total)
        return total;
    };

    return (
        <>
            <Modal title="Registrar venta de producto" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Select
                    style={{ width: '100%' }}
                    onChange={handleSellerSelected}
                    placeholder='Seleccionar vendedor'
                    options={employees}
                />
                <br />
                <br />
                <Select
                    style={{ width: '100%' }}
                    onChange={handleClientSelected}
                    placeholder='Seleccionar cliente'
                    options={clients}
                />
                <br />
                <br />
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Selecciona los productos"
                    // defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    options={options}
                />
                <br />
                <br />
                <label>Productos seleccionados:</label>
                {Array.isArray(productsSelected) && productsSelected?.length > 0 && productsSelected.map((product: any) => (
                    <Card key={product.id} title={product?.name} style={{ width: 300, marginBottom: '2px' }}>
                        <p>Precio de venta: ${product.priceOfSell}</p>
                        <div>
                            <label>Cantidad: </label>
                            <Button type="primary" shape="circle" size='small' onClick={() => updateQuantity(product.id, false)}>
                                -
                            </Button>
                            <span> {product.quantityToSell} </span>
                            <Button type="primary" shape="circle" size='small' onClick={() => updateQuantity(product.id, true)}>
                                +
                            </Button>
                        </div>
                    </Card>
                ))}
                <br /><br />
                <label>Total:</label>
                <Input placeholder={`Total sugerido: $${totalSale}`} onChange={handleTotal} value={totalSale} />
            </Modal >
        </>
    );
};

export default ModalSellProduct;