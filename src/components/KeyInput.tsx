import React, { useState } from "react";
import { type CryptoKeys } from "../interfaces/crypto.interface";

interface KeyInputProps {
  onKeysConfigured: (keys: CryptoKeys) => void;
}

export const KeyInput: React.FC<KeyInputProps> = ({ onKeysConfigured }) => {
  const [keyType, setKeyType] = useState<"private" | "public">("private");
  const [keyN, setKeyN] = useState("");
  const [modularInverseD, setModularInverseD] = useState("");
  const [publicKeyE, setPublicKeyE] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keyN.trim()) {
      alert("Por favor, preencha o valor de n (Módulo).");
      return;
    }

    if (keyType === "private" && !modularInverseD.trim()) {
      alert("Por favor, preencha a chave privada D.");
      return;
    }

    if (keyType === "public" && !publicKeyE.trim()) {
      alert("Por favor, preencha a chave pública E.");
      return;
    }
    
    try {
      if (keyType === "private") {
        onKeysConfigured({
          keyN: Number(keyN.trim()),
          modularInverseD: Number(modularInverseD.trim()),
        });
      } else {
        onKeysConfigured({
          keyN: Number(keyN.trim()),
          publicKeyE: Number(publicKeyE.trim()),
        });
      }
    } catch (error) {
      alert("Erro ao configurar as chaves: " + (error as Error).message);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ff0055', 
      padding: '20px', 
      borderRadius: '8px', 
      background: '#0a0a0a', 
      color: '#fff' 
      }}>

      <h3 style={{ color: "#ff0055" }}>
        Configuração de Chaves RSA
      </h3>

      <p style={{ fontSize: '14px', color: '#aaa' }}>
        Selecione o tipo de chave que deseja inserir e consulte a tabela do PDF.
      </p>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          type="button"
          onClick={() => setKeyType("private")}
          style={{
            flex: 1,
            padding: "8px",
            background: keyType === "private" ? "#ff0055" : "#222",
            color: "#fff",
            border: "1px solid #ff0055",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: keyType === "private" ? "bold" : "normal",
          }}>
          Chave Privada (D, n)
        </button>

        <button
          type="button"
          onClick={() => setKeyType("public")}
          style={{
            flex: 1,
            padding: "8px",
            background: keyType === "public" ? "#ff0055" : "#222",
            color: "#fff",
            border: "1px solid #ff0055",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: keyType === "public" ? "bold" : "normal",
          }}>
          Chave Pública (E, n)
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {keyType === "public" && (
            <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Valor E (Chave Pública):
            </label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "8px",
                background: "#222",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
              }}
              placeholder="Ex: 7"
              value={publicKeyE}
              onChange={(e) => setPublicKeyE(e.target.value)}/>
          </div>
        )}

        {keyType === "private" && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Valor D (Chave Privada):
            </label>
            <input
              type="number"
              style={{
                width: "100%",
                padding: "8px",
                background: "#222",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
              }}
              placeholder="Ex: 641"
              value={modularInverseD}
              onChange={(e) => setModularInverseD(e.target.value)}/>
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Valor n (Módulo):
          </label>
          <input
            type="number"
            style={{
              width: "100%",
              padding: "8px",
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "4px",
            }}
            placeholder="Ex: 1147"
            value={keyN}
            onChange={(e) => setKeyN(e.target.value)}/>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 20px",
            background: "#ff0055",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}>
          Vincular {keyType === "private" ? "Chave Privada" : "Chave Pública"}
        </button>
      </form>
    </div>
  );
}