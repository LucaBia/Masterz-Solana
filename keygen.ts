import { Keypair } from '@solana/web3.js';
import * as bs58 from 'bs58';

// Creazione di una nuova chiave privata
const keypair = Keypair.generate();

// Esportazione della chiave privata in formato base58
const secretKey = bs58.encode(keypair.secretKey);

console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Secret Key:', secretKey);