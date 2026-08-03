export function bitwiseDecomposition(baseB: number, exponent: number, modulus: number): number {
    if (exponent <= 0) {
        throw new Error("O módulo 'n' deve ser maior que 0.");
    }

    const bits = exponent.toString(2);
    const sizeBits = bits.length;
    const validRemains: bigint[] = [];
    console.log(`Exponent: ${exponent}, Bits: ${bits}`);
    let currentExponent = BigInt(baseB % modulus);
    console.log(`Initial Base: ${baseB}, Modulus: ${modulus}`);
    console.log(`Initial Current Exponent: ${currentExponent}`);
    for (let i = 0; i < sizeBits; i++) {
        const bit = bits[sizeBits - 1 - i]; // Acessa os bits da direita para a esquerda
        
        if (bit === '1') {
            console.log(`i: ${i}, Bit: ${bit}, Current Exponent: ${currentExponent}`);
            validRemains.unshift(currentExponent);
        }
        console.log(`i: ${i}, Bit: ${bit}, Current Exponent before squaring: ${currentExponent}`);
        const squaring = (currentExponent * currentExponent);
        console.log(`i: ${i}, Bit: ${bit}, Squaring: ${squaring}`);
        currentExponent = squaring % BigInt(modulus); // Eleva ao quadrado para a próxima iteração
    }

    if (validRemains.length === 0) {
        return 0;
    }

    validRemains.reverse();
    const result = validRemains.reduce((accumulator, currentValue) => {
        return (accumulator * currentValue) % BigInt(modulus);
    }, 1n);

    console.log(`Valid Remains: ${validRemains.map(v => v.toString()).join(', ')}`);

    console.log(result);

    return Number(result);
}