"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Funcionarios.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Funcionarios() {
    const [data, setData] = useState({
        funcionarios: [],
        loading: true,
        current: 1,
        pageSize: 0,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        funcionario: null,
        departamento: null,
        loading: false,
    });

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const { data: funcionarios } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/funcionarios`,
                    {
                        headers: HEADERS,
                    }
                );
                setData({ funcionarios, loading: false, current: 1, pageSize: 5 });
            } catch {
                toast.error("Erro ao carregar FUNCIONARIOS!");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchFuncionarios();
    }, []);

    const openModal = async (funcionario) => {
        setModalInfo({ visible: true, funcionario, departamento: null, loading: true });
    
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error("A variável NEXT_PUBLIC_API_URL não está configurada.");
            toast.error("Erro na configuração da URL da API.");
            setModalInfo((m) => ({ ...m, loading: false }));
            return;
        }
    
        try {
            const { data: departamento } = await axios.get(
                `${apiUrl}/departamento/${funcionario.id}`,
                {
                    headers: HEADERS,
                }
            );
            console.log("Departamento recebido:", departamento);
            setModalInfo((m) => ({ ...m, departamento, loading: false }));
        } catch (error) {
            console.error("Erro ao buscar departamento:", error);
            toast.error("Erro ao carregar informações.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedFuncionarios = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.funcionarios.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <h1>Lista de Funcionários e Departamentos</h1>

            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.funcionarios.length}
                onChange={(page, size) =>
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
            />

            {data.loading ? (
                <Image
                    src="/images/loading.gif"
                    width={300}
                    height={200}
                    alt="Loading"
                />
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedFuncionarios().map((funcionario) => (
                        <Card
                            key={funcionario.id}
                            className={styles.card}
                            hoverable
                            onClick={() => openModal(funcionario)}
                            cover={
                                <Image
                                alt={funcionario.name}
                                src={funcionario.photo ? funcionario.photo : "/image/220.svg"}
                                width={220}
                                height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={funcionario.name}
                                description={`Cidade: ${funcionario.cidade}`}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Detalhes do Funcionário: ${modalInfo.funcionario?.name}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        funcionario: null,
                        departamento: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        funcionario: null,
                        departamento: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.departamento ? (
                    <div className={styles.departamentoInfo}>
                        <p>
                            <span className={styles.label}>Departamento:</span>{" "}
                            {modalInfo.departamento?.name || "Não informado"}
                        </p>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Informações do departamento não encontradas.</p>
                )}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}