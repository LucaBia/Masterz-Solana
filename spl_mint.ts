import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";
import { 
    getOrCreateAssociatedTokenAccount,
    createAssociatedTokenAccount,
    transfer,
    getAccount,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import wallet from "./wallet.json";
import mintAddress from "./mint.json";

// Usa la chiave privata per creare il keypair
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
// Crea una connessione alla rete devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// Crea un oggetto PublicKey per il mint del token
const mint = new PublicKey(mintAddress);

// Indirizzo dell'account token sorgente (associato al mint del token)
const fromAta = new PublicKey("AsUbzY5avaP4J6jDMcCZVnwFTHuEFQoz64feuHVvcovN");

// Genera una nuova coppia di chiavi per il destinatario
const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
    try {
        // Verifica l'account token sorgente
        const fromTokenAccount = await getAccount(connection, fromAta);
        console.log("From Token Account: ", fromTokenAccount.address.toBase58(), "Balance: ", fromTokenAccount.amount.toString());
        console.log("Mint of fromTokenAccount: ", fromTokenAccount.mint.toBase58());

        // Crea un nuovo account token associato per il destinatario
        const toAta = await createAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to.publicKey,
            keypair.publicKey,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        console.log("New Associated Token Account: ", toAta.toBase58());

        // Verifica l'account token di destinazione
        const toTokenAccount = await getAccount(connection, toAta);
        console.log("Mint of toTokenAccount: ", toTokenAccount.mint.toBase58());

        // Quantità di token da trasferire (esempio: 10 con 5 decimali)
        const amount = 10e5;

        // Esegui il trasferimento
        await transfer(
            connection,
            keypair,
            fromAta,
            toAta,
            keypair.publicKey,
            amount
        );

        console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
    } catch (error) {
        console.error("Errore durante il trasferimento dei token:", error);
    }
})();