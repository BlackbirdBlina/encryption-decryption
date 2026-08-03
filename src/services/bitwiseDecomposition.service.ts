import type { BitwiseResult } from "../interfaces/bitwiseResult.interface";

export function bitwiseDecomposition(baseB: number, exponent: number, modulus: number): BitwiseResult {
    if (exponent <= 0) {
        throw new Error("O módulo 'n' deve ser maior que 0.");
    }

    const logs: string[] = [];

    const bits = exponent.toString(2);
    const sizeBits = bits.length;
    const validRemains: bigint[] = [];
    
    const logExponent = `Expoente: ${exponent}, Bits: ${bits}`;
    logs.push(logExponent);

    let currentExponent = BigInt(baseB % modulus);

    const logBase = `Base inicial: ${baseB}, Módulo: ${modulus}`;
    logs.push(logBase);

    const logInitial = `Exponente Atual Inicial: ${currentExponent}`;
    logs.push(logInitial);

    for (let i = 0; i < sizeBits; i++) {
        const bit = bits[sizeBits - 1 - i]; // Acessa os bits da direita para a esquerda
        
        if (bit === '1') {
            const logBit1 = `i: ${i}, Bit: ${bit}, Expoente atual: ${currentExponent}`;
            logs.push(logBit1);
            validRemains.unshift(currentExponent);
        }
        const logBeforeSquaring = `i: ${i}, Bit: ${bit}, Atual expoente antes da raíz quadrada: ${currentExponent}`;
        logs.push(logBeforeSquaring);
        
        const squaring = (currentExponent * currentExponent);

        const logSquaring = `i: ${i}, Bit: ${bit}, Raíz quadrada: ${squaring}`;
        logs.push(logSquaring);

        currentExponent = squaring % BigInt(modulus); // Eleva ao quadrado para a próxima iteração
    }

    if (validRemains.length === 0) {
        return {
            result: 0,
            logs
        };
    }

    validRemains.reverse();
    const result = validRemains.reduce((accumulator, currentValue) => {
        return (accumulator * currentValue) % BigInt(modulus);
    }, 1n);

    const logValidRemains = `Restos válidos: ${validRemains.map(v => v.toString()).join(', ')}`;
    logs.push(logValidRemains);

    const logResult = `Resultado: ${result}`;
    logs.push(logResult);
    
    return {
        result: Number(result),
        logs
    };
}