'use client'
import { useProducts } from '@/hooks/useProduct';
import React, { useState } from 'react'
import * as Styled from '../style'
import { Button, Form, Input } from 'antd';
import { Product } from '@/models/product';
import SimpleSnackbar from '@/components/SimpleSnackbar/SimpleSnackbar';
import { v4 as uuidv4 } from 'uuid';

const initialNewProduct = {
    id: '',
    name: '',
    description: '',
    category: '',
    priceOfPurchase: 0,
    priceOfSell: 0,
    stock: 0,
    provider: '',
    dateOfPurchase: new Date(),
}

export default function Page() {
    const [success, setSuccess] = useState(false)
    const [newProduct, setNewProduct] = useState<Product>(initialNewProduct)
    const { createProduct } = useProducts();

    async function onFinish() {
        try {
            const post = { ...newProduct, id: uuidv4() }
            await createProduct(post)
            setSuccess(true)
            setNewProduct(initialNewProduct)
            return
        } catch (error) {
            console.log(error)
            return alert('Ocurrio un error, intentalo de nuevo')
        }
    }

    function handleChange(e: any) {
        const value = e?.target.value
        const name = e?.target.name
        if (name === 'stock' || name === 'priceOfSell' || name === 'priceOfPurchase') {
            if (isNaN(value)) {
                return alert('Los precios y el stock deben ser numeros')
            }
            setNewProduct({
                ...newProduct,
                [name]: Number(value)
            })
        } else {
            setNewProduct({
                ...newProduct,
                [name]: value
            })
        }
    }

    function onFinishFailed() { }

    return (
        <Styled.Container>
            <Styled.ItemContainer>
                {/* <Styled.StartContainer> */}
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: '90%' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    onChange={handleChange}
                >
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Shampoo' name="name" value={newProduct.name} />
                    </Form.Item>
                    <Form.Item
                        label="Descripcion"
                        name="description"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Shampoo neutro' name="description" value={newProduct.description} />
                    </Form.Item>
                    <Form.Item
                        label="Categoria"
                        name="category"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Belleza' name="category" value={newProduct.category} />
                    </Form.Item>
                    <Form.Item
                        label="Precio de compra"
                        name="priceOfPurchase"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Ejemplo: 99' name="priceOfPurchase" type='number' value={newProduct.priceOfPurchase} />
                    </Form.Item>
                    <Form.Item
                        label="Precio de venta"
                        name="priceOfSell"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Ejemplo: 130' name="priceOfSell" type='number' value={newProduct.priceOfSell} />
                    </Form.Item>
                    <Form.Item
                        label="Stock disponible"
                        name="stock"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input placeholder='Ejemplo: 50' name="stock" type='number' value={newProduct.stock} />
                    </Form.Item>
                    <Form.Item
                        label="Proveedor"
                        name="provider"
                        rules={[{ required: true, message: 'Campo invalido' }]}
                    >
                        <Input name="provider" value={newProduct.provider} />
                    </Form.Item>
                </Form>
                <Button type="primary" htmlType="submit" onClick={onFinish} >
                    Submit
                </Button>
                {/* </Styled.StartContainer> */}
                <SimpleSnackbar open={success} setOpen={setSuccess} title='Producto registrado' />
            </Styled.ItemContainer>
        </Styled.Container>
    )
}
