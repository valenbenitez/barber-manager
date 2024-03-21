import React from 'react'
import style from './navbar.module.css'
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function NavBar() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <nav className={style.navbar}>
                <BottomNavigation
                    showLabels
                    sx={{
                        backgroundColor: '#f9f9fb',
                        width: '100%',
                        margin: '0 auto',
                        borderRadius: '12px',
                    }}
                >
                    <Link legacyBehavior href={'/dashboard'}>
                        <BottomNavigationAction
                            showLabel
                            label={<label style={labelStyle}>Inicio</label>}
                            icon={
                                <Image
                                    alt=""
                                    src={'/navbar-icons/home.svg'}
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                    </Link>
                    <Link legacyBehavior href={'/dashboard/facturacion'}>
                        <BottomNavigationAction
                            showLabel
                            label={<label style={labelStyle}>Facturacion</label>}
                            icon={
                                <Image
                                    alt=""
                                    src={'/navbar-icons/money.svg'}
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                    </Link>
                    <Link id="exchange_money_02" legacyBehavior href={'/dashboard/registrar-corte'}>
                        <BottomNavigationAction
                            icon={
                                <Image
                                    alt=""
                                    src={'/navbar-icons/add.svg'}
                                    width={38}
                                    height={38}
                                />
                            }
                            sx={{
                                position: 'absolute',
                                top: '-32px',
                                backgroundColor: '#bdd1de',
                                borderRadius: '140px',
                                padding: '16px',
                            }}
                        />
                    </Link>
                    <BottomNavigationAction
                        showLabel
                        label={<label style={labelStyle}>Nuevo corte</label>}
                        sx={{ marginTop: '18px' }}
                    />
                    <Link legacyBehavior href={'/dashboard/barberos'}>
                        <BottomNavigationAction
                            showLabel
                            label={<label style={labelStyle}>Barberos</label>}
                            icon={
                                <Image
                                    alt=""
                                    src={'/navbar-icons/users.svg'}
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                    </Link>

                    <Link legacyBehavior href={'/dashboard/products'}>
                        <BottomNavigationAction
                            showLabel
                            label={<label style={labelStyle}>Productos</label>}
                            icon={
                                <Image
                                    alt=""
                                    src={'/navbar-icons/products.svg'}
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                    </Link>
                </BottomNavigation>
            </nav>
        </div>
    );
}

const labelStyle = {
    fontFamily: 'Raleway',
    fontSize: '10px',
    color: '#000',
    fontWeight: 600,
};

export default NavBar