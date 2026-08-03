import { ALPHABET_MAP } from "../constants/alphabet.constant";
import type { DecryptionResult } from "../interfaces/decryptionResult.interface";
import { bitwiseDecomposition } from "./bitwiseDecomposition.service";

export class DecryptionService {
    private static findDecryptedBlocks(blockB: number, modularInverseD: number, keyN: number): { blockStr: string; logs: string[] }{

        const { result, logs } = bitwiseDecomposition(blockB, modularInverseD, keyN);

        return {
            blockStr: result.toString(),
            logs
        };
    }

    public static decryptMessage(encryptedMessage: string, modularInverseD: number, modulus: number, ): DecryptionResult {
        const codedChar: number[] = [];
        const cleanMessage = encryptedMessage.replace(/\s+/g, '');

        const reportLogs: string[] = [];
        const blocks = cleanMessage.split("-");
        let decryptedBlocks = "";
        let decryptedMessage = "";

        for (const block of blocks) {
            if (!block) continue;

            const { blockStr, logs } = DecryptionService.findDecryptedBlocks(parseInt(block, 10), modularInverseD, modulus);
            
            decryptedBlocks += blockStr;
            reportLogs.push(...logs);
        }

        for (let i = 0; i < decryptedBlocks.length; i += 2) {
            const block = decryptedBlocks.substring(i, i + 2);
            const resultBlock = parseInt(block);
            codedChar.push(resultBlock);
        }

        const charMappings: string[] = [];

        for (const charCode of codedChar) {
            const char = ALPHABET_MAP[charCode] || '?';

            charMappings.push(`${charCode}: "${char}"`);

            decryptedMessage += char;
        }

        const formattedCharSentence = charMappings.join(', ');
        reportLogs.push(formattedCharSentence);

        return {
            decryptedMessage,
            reportLogs
        };
    }
}