export const ALPHABET_MAP: Record<number, string> = {
    11: 'A', 12: 'B', 13: 'C', 14: 'D', 15: 'E', 16: 'F', 17: 'G', 18: 'H', 19: 'I', 21: 'J', 22: 'K', 23: 'L', 24: 'M', 25: 'N', 
    26: 'O', 27: 'P', 28: 'Q', 29: 'R', 31: 'S', 32: 'T', 33: 'U', 34: 'V', 35: 'W', 36: 'X', 37: 'Y', 38: 'Z',
    
    39: ' ',
    41: '-',
    42: ',',
    43: '!',
    44: '?'
}

export const ALPHABET_REVERSE_MAP: Record<string, number> = Object.entries(ALPHABET_MAP).reduce(
    (acc, [code, char]) => {
        acc[char] = Number(code);
        return acc;
    },
    {} as Record<string, number>
);