export function extendedGCD(a: number, m: number): number {
    const m0 = m;
    let y = 0;
    let x = 1;
    
    if (m === 1) {
        return 0;
    }

    while (a > 1) {
        if (m === 0) return 0;

        const q = Math.floor(a / m);

        let t = m;
        m = a % m;
        a = t;
        
        t = y;
        y = x - q * y;
        x = t;
    }

    if (x < 0) {
        x = (x % m0 + m0) % m0;
    }

    return x;
}