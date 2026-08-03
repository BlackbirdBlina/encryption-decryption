import React, { useState } from 'react';
import { type CryptoKeys } from '../interfaces/crypto.interface';
import { DecryptionService } from '../services/decryption.service';
import { EncryptService } from '../services/encrypt.service';

interface FileDecryptorProps {
    keys: CryptoKeys;
    onResetKeys: () => void;
}

export const FileDecryptor: React.FC<FileDecryptorProps> = ({ keys, onResetKeys }) => {
    const [inputText, setInputText] = useState('');  
    const [outputMessage, setOutputMessage] = useState('');
    const [reportLogs, setReportLogs] = useState<string[]>([]);
    const [showReport, setShowReport] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isPrivateKeyAvailable = keys.modularInverseD !== undefined;
    const isPublicKeyAvailable = keys.publicKeyE !== undefined;

    const handleProcess = () => {
        if (!inputText.trim()) return;
        setErrorMessage('');
        setShowReport(false);

        try {
            if (isPrivateKeyAvailable && keys.modularInverseD !== undefined) {
                const { decryptedMessage, reportLogs } = DecryptionService.decryptMessage(
                    inputText, 
                    keys.modularInverseD,
                    keys.keyN
                );
                setOutputMessage(decryptedMessage);
                setReportLogs(reportLogs);
                return;
            }

            if (isPublicKeyAvailable && keys.publicKeyE !== undefined) {
                const calculatedD = EncryptService.calculateModularInverseKeyD(keys.publicKeyE, keys.keyN);
                
                const { decryptedMessage, reportLogs } = DecryptionService.decryptMessage(
                    inputText, 
                    calculatedD,
                    keys.keyN
                );
                setOutputMessage(decryptedMessage);
                setReportLogs(reportLogs);
                return;
            }

            throw new Error("Nenhuma chave válida (D ou E) foi fornecida.");
        } catch (error: any) {
            console.error("Erro no processamento:", error);
            setErrorMessage(error.message || "Erro ao processar mensagem.");
            setOutputMessage('');
            setReportLogs([]);
        }
    };

    return (
      <div style={{ border: '1px solid #ff0055', padding: '20px', borderRadius: '8px', background: '#0a0a0a', color: '#fff' }}>
        <h3 style={{ color: '#ff0055' }}>Processador de Mensagens RSA</h3>
      
        <p style={{ fontSize: '13px', color: '#4af30b' }}>
            ✓ Parâmetros Ativos: 
            {isPrivateKeyAvailable && ` (D: ${keys.modularInverseD} | n: ${keys.keyN})`}
            {!isPrivateKeyAvailable && isPublicKeyAvailable && ` (E: ${keys.publicKeyE} | n: ${keys.keyN})`}
        </p>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
                Cole a sequência numérica (separada por hífens):
            </label>
            <textarea
                rows={4}
                style={{ 
                    width: '100%', 
                    padding: '8px', 
                    background: '#222', 
                    color: '#fff', 
                    border: '1px solid #444', 
                    fontFamily: 'monospace' }}
                placeholder="Ex: 630-980-1079-838..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}/>
      </div>

      <button 
          onClick={handleProcess} 
          style={{ 
            padding: '10px 20px', 
            background: '#4af30b', 
            color: '#000', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            marginRight: '10px' }}>
          Processar Fluxo
      </button>

        {reportLogs.length > 0 && (
            <button 
                onClick={() => setShowReport(!showReport)} 
                style={{ 
                    padding: '10px 20px', 
                    background: '#ff0055', 
                    color: '#fff', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    marginRight: '10px' }}>
                {showReport ? "Ocultar Relatório" : "Visualizar Relatório"}
            </button>
        )}

      <button 
        onClick={onResetKeys} 
        style={{ padding: '10px 20px', 
        background: '#333', 
        color: '#fff', 
        border: 'none', 
        cursor: 'pointer' }}>
          Mudar Chaves do Aluno
        </button>

        {errorMessage && (
          <div style={{ marginTop: '15px', color: '#ff0055', fontSize: '14px' }}>
            {errorMessage}
          </div>
        )}

        {outputMessage && (
            <div style={{ marginTop: '25px', borderTop: '1px solid #333', paddingTop: '15px' }}>
                <h4 style={{ color: '#4af30b' }}>Resultado Obtido:</h4>
                <div style={{ background: '#151515', padding: '15px', borderRadius: '4px', borderLeft: '4px solid #4af30b', letterSpacing: '1px', fontSize: '18px', fontFamily: 'monospace' }}>
                    {outputMessage}
                </div>
            </div>
        )}

        {showReport && reportLogs.length > 0 && (
            <div style={{ 
                marginTop: '25px', 
                borderTop: '1px solid #333', 
                paddingTop: '15px' }}>
                <h4 style={{ color: '#ff0055' }}>
                    Relatório Detalhado de Cálculo:
                </h4>
                <pre style={{ 
                    background: '#121212', 
                    padding: '15px', 
                    borderRadius: '6px', 
                    border: '1px solid #333',
                    color: '#00ff66', 
                    fontFamily: 'monospace', 
                    fontSize: '13px', 
                    maxHeight: '350px', 
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                }}>
                    {reportLogs.join('\n')}
                </pre>
            </div>
        )}
    </div>
  );
};