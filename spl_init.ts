import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    try {
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey,
            null,
            6, // Numero di decimali
        );

        console.log("Mint Address:", mint.toBase58());

        // Salviamo l'indirizzo del mint in un file
        const fs = require('fs');
        fs.writeFileSync('mint.json', JSON.stringify(mint.toBase58()));

    } catch (error) {
        console.error("Errore durante l'inizializzazione del mint:", error);
    }
})();