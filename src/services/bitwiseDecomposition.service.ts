export function bitwiseDecomposition(baseB: number, exponent: number, modulus: number): number {
    if (exponent <= 0) {
        throw new Error("O módulo 'n' deve ser maior que 0.");
    }

    const bits = exponent.toString(2);
    const sizeBits = bits.length;
    const validRemains: number[] = [];

    let currentExponent = baseB % modulus;
    for (let i = 0; i < sizeBits; i++) {
        const bit = bits[sizeBits - 1 - i]; // Acessa os bits da direita para a esquerda
        
        if (bit === '1') {
            validRemains.unshift(currentExponent);
        }
        currentExponent = (currentExponent * currentExponent) % modulus; // Eleva ao quadrado para a próxima iteração
    }

    if (validRemains.length === 0) {
        return 0;
    }

    const result = validRemains.reduce((accumulator, currentValue) => {
        return (accumulator * currentValue) % modulus;
    }, 1);

    return result;
}