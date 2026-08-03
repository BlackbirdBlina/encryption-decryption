import { ALPHABET_REVERSE_MAP } from "../constants/alphabet.constant";
import { bitwiseDecomposition } from "./bitwiseDecomposition.service";
import { totientFunction } from "./totientFunction.service";
import { findPrimeFactors } from "./findPrimeFactors.service";
import { extendedGCD } from "./extendedGCD.service";
import { gcd } from "./gcd.service";

export class EncryptService {
    public static calculateModularInverseKeyD(publicKeyE: number, modulusN: number): number {
        const primesFound = findPrimeFactors(modulusN);

        const p = primesFound.primeP;
        const q = primesFound.primeQ;

        if (!p || !q) {
            throw new Error(`Não foi possível extrair p e q. p=${p}, q=${q}`);
        }
        const phiN = totientFunction(p, q);

        if (gcd(publicKeyE, phiN) !== 1) {
            throw new Error("A chave E e φ(n) não são coprimos. Escolha outro valor para E.");
        }

        let keyD = extendedGCD(publicKeyE, phiN);

        if (keyD < 0) {
            keyD = (keyD % phiN + phiN) % phiN;
        }
        
        return keyD;
    }

    private static findEncryptedBlock(messageBlock: number, publicKeyE: number, keyN: number): string {
        const encryptedBlock = bitwiseDecomposition(messageBlock, publicKeyE, keyN);
        return encryptedBlock.toString();
    }

    public static encryptMessage(plainText: string, publicKeyE: number, modulusN: number): string {
        const cleanText = plainText.toUpperCase().replace(/\s+/g, '');
        const encryptedBlocks: string[] = [];

        for (const char of cleanText) {
            const charCode = ALPHABET_REVERSE_MAP[char];
            if (charCode !== undefined) {
                const encryptedVal = EncryptService.findEncryptedBlock(charCode, publicKeyE, modulusN);
                encryptedBlocks.push(encryptedVal);
            }
        }

        return encryptedBlocks.join("-");
    }
}