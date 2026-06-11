import { useState } from 'react';
import { KeyInput } from './components/KeyInput';
import { FileDecryptor } from './components/FileDecryptor';
import { type CryptoKeys } from './interfaces/crypto.interface';

function App() {
  const [currentKeys, setCurrentKeys] = useState<CryptoKeys | null>(null);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#ff0055', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>FMC1 - RSA Decryptor</h1>
          <p style={{ color: '#888', margin: 0 }}>Simulador de recebimento de mensagens e inversão matemática modular</p>
        </header>

        <main>
          {!currentKeys ? (
            <KeyInput onKeysConfigured={(keys) => setCurrentKeys(keys)} />
          ) : (
            <FileDecryptor keys={currentKeys} onResetKeys={() => setCurrentKeys(null)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;