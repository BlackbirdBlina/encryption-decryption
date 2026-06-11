import { type PrimeFactors } from '../interfaces/primeFactors.interface';

export function findPrimeFactors(numberN: number): PrimeFactors[] {
    const primeFactors: PrimeFactors[] = [];

    while (numberN % 2 === 0) {
        primeFactors.push({ primeP: 2, primeQ: 2 });
        numberN = Math.floor(numberN / 2);
    }

    let divider = 3;
    while (divider * divider <= numberN) {
        while (numberN % divider === 0) {
            primeFactors.push({ primeP: divider, primeQ: divider });
            numberN = Math.floor(numberN / divider);
        }
        divider += 2;
    }

    if (numberN > 2) {
        primeFactors.push({ primeP: numberN, primeQ: numberN });
    }

    return primeFactors;
}