import * as bs58 from 'bs58';
import * as fs from 'fs';

const base58SecretKey = 'SECRET-ADDRESS';

const secretKey = bs58.decode(base58SecretKey);

fs.writeFileSync('wallet.json', JSON.stringify(Array.from(secretKey)));

console.log('Chiave privata convertita e salvata in wallet.json');