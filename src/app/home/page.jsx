"use client";
import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Image from 'next/image';
import Button from "../../components/Button";
import Link from "next/link";

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Image 
                    src="/icon/favicon.ico"
                    alt="Carregando..."
                    width={100}
                    height={100}
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.foto}>
                <Image 
                    src="/image/imagemTeste.jpg" 
                    alt="foto do kevin de perfilll" 
                    layout="responsive" 
                    width={30} 
                    height={30}
                    style={{ borderRadius: '50%' }}
                />
            </div>

            <div className={styles.info}>
                <h1>API Departamentos e Funcionários</h1>

                <h2>Kevin Lima</h2>
                <h3>TDS1</h3>
                <h3>Marcelo & Thiago</h3>
                <h4>Front End API Departamentos e Funcionários!</h4>
                <p>
                    Esta API permite gerenciar as entidades <strong>Funcionário</strong> e <strong>Departamento</strong>, 
                    estabelecendo uma relação onde cada funcionário pertence a um departamento. 
                    O propósito é facilitar a organização e consulta de informações corporativas.
                </p>
                <Link href="/funcionarios/">
                    <Button children="Clique aqui para acessar a API" />
                </Link>
            </div>
        </div>
    );
}
