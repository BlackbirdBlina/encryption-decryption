import React, { useState } from 'react';
import { type CryptoKeys } from '../interfaces/crypto.interface';
import { DecryptionService } from '../services/decryption.service';

interface FileDecryptorProps {
    keys: CryptoKeys;
    onResetKeys: () => void;
}

export const FileDecryptor: React.FC<FileDecryptorProps> = ({ keys, onResetKeys }) => {
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');

    const handleDecrypt = () => {
        if (!encryptedMessage) return;

        try {
            const decrypted = DecryptionService.decryptMessage(
              encryptedMessage, 
              keys.modularInverseD,
              keys.keyN
            );
            setDecryptedMessage(decrypted);
        } catch (error) {
            console.error("Erro ao descriptografar a mensagem:", error);
            setDecryptedMessage("Erro ao descriptografar a mensagem.");
        }
    };

    return (
      <div style={{ border: '1px solid #ff0055', padding: '20px', borderRadius: '8px', background: '#0a0a0a', color: '#fff' }}>
      <h3 style={{ color: '#ff0055' }}>Descriptografar Código do Cliente</h3>
      <p style={{ fontSize: '13px', color: '#4af30b' }}>✓ Sistema matemático parametrizado (D: {keys.modularInverseD.toString()} | n: {keys.keyN.toString()})</p>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Cole a sequência numérica (separada por hífens):</label>
        <textarea
          rows={4}
          style={{ width: '100%', padding: '8px', background: '#222', color: '#fff', border: '1px solid #444', fontFamily: 'monospace' }}
          placeholder="Ex: 630-980-1079-838..."
          value={encryptedMessage}
          onChange={(e) => setEncryptedMessage(e.target.value)}
        />
      </div>

      <button onClick={handleDecrypt} style={{ padding: '10px 20px', background: '#4af30b', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>
        Processar Fluxo Matemático
      </button>

      <button onClick={onResetKeys} style={{ padding: '10px 20px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Mudar Chaves do Aluno
      </button>

      {decryptedMessage && (
        <div style={{ marginTop: '25px', borderTop: '1px solid #333', paddingTop: '15px' }}>
          <h4 style={{ color: '#4af30b' }}>Mensagem do Professor Revelada:</h4>
          <div style={{ background: '#151515', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #4af30b', letterSpacing: '1px', fontSize: '18px', fontFamily: 'monospace' }}>
            {decryptedMessage}
          </div>
        </div>
      )}
    </div>
  );
};