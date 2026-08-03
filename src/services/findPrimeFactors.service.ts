import { type PrimeFactors } from '../interfaces/primeFactors.interface';

export function findPrimeFactors(numberN: number): PrimeFactors {
    const factors: number[] = [];
    let tempN = numberN;

    while (tempN % 2 === 0) {
        factors.push(2);
        tempN = Math.floor(tempN / 2);
    }

    let divider = 3;
    while (divider * divider <= tempN) {
        while (tempN % divider === 0) {
            factors.push(divider);
            tempN = Math.floor(tempN / divider);
        }
        divider += 2;
    }

    if (tempN > 2) {
        factors.push(tempN);
    }

    if (factors.length !== 2) {
        throw new Error(
            `O valor n=${numberN} é inválido para RSA. Fatores encontrados: ${factors.join(', ')}`
        );
    }

    const p = factors[0];
    const q = factors[1];

    console.log(`Fatores primos encontrados para n=${numberN}: p=${p}, q=${q}`);

    return { primeP: p, primeQ: q };
}