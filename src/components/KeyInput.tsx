import React, { useState } from "react";
import { type CryptoKeys } from "../interfaces/crypto.interface";

interface KeyInputProps {
  onKeysConfigured: (keys: CryptoKeys) => void;
}

export const KeyInput: React.FC<KeyInputProps> = ({ onKeysConfigured }) => {
  const [keyN, setKeyN] = useState("");
  const [modularInverseD, setmodularInverseD] = useState("");
  
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyN || !modularInverseD) {
      alert("Por favor, preencha ambas as chaves.");
      return;
    }
    try {
      onKeysConfigured({ 
        modularInverseD: Number(modularInverseD.trim()),
        keyN: Number(keyN.trim())  
      });
    } catch (error) {
      alert("Chaves devem ser números inteiros válidos.");
    }
  };

  return (
    <div style={{ border: '1px solid #ff0055', padding: '20px', borderRadius: '8px', background: '#0a0a0a', color: '#fff' }}>
      <h3 style={{ color: '#ff0055' }}>Chaves Privadas do Aluno</h3>
      <p style={{ fontSize: '14px', color: '#aaa' }}>Consulte a tabela do PDF para pegar seus valores de D e n.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Valor D (Chave Privada):</label>
          <input
            type="number"
            style={{ width: '100%', padding: '8px', background: '#222', color: '#fff', border: '1px solid #444' }}
            placeholder="Ex: 641"
            value={modularInverseD}
            onChange={(e) => setmodularInverseD(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Valor n (Módulo):</label>
          <input
            type="number"
            style={{ width: '100%', padding: '8px', background: '#222', color: '#fff', border: '1px solid #444' }}
            placeholder="Ex: 1147"
            value={keyN}
            onChange={(e) => setKeyN(e.target.value)}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#ff0055', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Vincular Par de Chaves
        </button>
      </form>
    </div>
  );
}