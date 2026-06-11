import { ALPHABET_MAP } from "../constants/alphabet.constant";
import { bitwiseDecomposition } from "./bitwiseDecomposition.service";

export class DecryptionService {
    private static findDecryptedBlocks(blockB: number, modularInverseD: number, keyN: number): string {

        let decriptedBlock = bitwiseDecomposition(blockB, modularInverseD, keyN);

        return decriptedBlock.toString();
    }

    public static decryptMessage(encryptedMessage: string, modularInverseD: number, modulus: number): string {
        const codedChar: number[] = [];
        const cleanMessage = encryptedMessage.replace(/\s+/g, '');
        
        const blocks = cleanMessage.split("-");
        let decryptedBlocks = "";
        let decryptedMessage = "";

        for (const block of blocks) {
            let resultBlock = DecryptionService.findDecryptedBlocks(parseInt(block), modularInverseD, modulus);
            decryptedBlocks += resultBlock;
        }

        for (let i = 0; i < decryptedBlocks.length; i += 2) {
            const block = decryptedBlocks.substring(i, i + 2);
            const resultBlock = parseInt(block);
            codedChar.push(resultBlock);
        }

        for (const charCode of codedChar) {
            decryptedMessage += ALPHABET_MAP[charCode] || '?';
        }

        return decryptedMessage;
    }
}