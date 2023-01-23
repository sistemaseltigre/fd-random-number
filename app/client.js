const anchor = require('@coral-xyz/anchor');
const web3 = require('@solana/web3.js');
const NodeWallet = require('@project-serum/anchor/dist/cjs/nodewallet');
const borsh = require('@project-serum/borsh');
const chai = require('chai');
const idl = require('./idl.json');
const programID = new web3.PublicKey("EFkvKfwfXMfGGU2MMT28LrvCeRc8WLZAENEPpwo47X4")
const numkp = new web3.Keypair();
const player_pk_key = new web3.PublicKey("9gHp96VBPMeCfhNizP14eoqosnBQ8JodMfC9iXdCPVVU");
const enemy_pk_key = new web3.PublicKey("AUMbL5J7wQuNxV7tpj1mq4SzPxqReDA6VzfkCzpJjcUi");
const firstWinPrivKey = [50,50,50,50].slice(0,32);
const firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
anchor.setProvider("https://newest-fabled-orb.solana-devnet.discover.quiknode.pro/7584b10951ab6be93c1f3a55c00ee6f46e74da8a/");


    //Create general Tx
    sendTransaction();

    //struct layout counter
    const countLayout = borsh.struct([
        borsh.u8('count'),
    ])

    //struct layout drop
    const dropInstructionLayout = borsh.struct([
    borsh.u64('random_number'),
    borsh.publicKey('player_pubkey_drop'),
    borsh.bool('is_initialized'),
    ])

    //function to send data to solana program in anchor
    async function sendTransaction() {    
       
        //define connection using Quicknode in devnet
        const connection = new web3.Connection(
            "https://newest-fabled-orb.solana-devnet.discover.quiknode.pro/7584b10951ab6be93c1f3a55c00ee6f46e74da8a/",
            'confirmed',
        );

        //create local wallet system
        let wallet = new NodeWallet.default(firstWinWallet);
        
        //define provider using connection, local wallet and options
        const provider = new anchor.AnchorProvider(
            connection, 
            wallet,  
            {
                commitment: "processed",
            },
        )
        
        //create const var to define program to use
        const program = new anchor.Program(idl, programID, provider);
    
        //verify PDA counter to create a new PDA for each enemykill
        const [counterPDA,__] = web3.PublicKey
            .findProgramAddressSync(
            [
                Buffer.from("enemykill"),
                player_pk_key.toBuffer(),
            ],
            programID
        );
        
        //Fetch data from the account counter to get number.
        let account = await program.account.counter.fetch(counterPDA);
        
        //create PDA to save a unique drop
        const [userStatsPDA,_] = web3.PublicKey
            .findProgramAddressSync(
            [
                Buffer.from("drop"),
                player_pk_key.toBuffer(),
                enemy_pk_key.toBuffer(),
                [account.count],
            ],
            programID
        );

        //create Tx to send data and store in blockchain
        const txHash = await program.methods
        .getrandomnumber()
        .accounts({
            pdaDataDrop: userStatsPDA,
            player: player_pk_key,
            enemy: enemy_pk_key,
            num: numkp.publicKey,        
            counter: counterPDA,        
            poolGame: firstWinWallet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        }).signers([firstWinWallet]).rpc(); 
        
        console.log(`Use 'solana confirm -v ${txHash}' to see the logs`); 

    }