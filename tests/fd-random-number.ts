import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { FdRandomNumber } from "../target/types/fd_random_number";

describe("fd-random-number", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FdRandomNumber as Program<FdRandomNumber>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.getRandomNumber().rpc();
    console.log("Your transaction signature", tx);
  });
});
/*

// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
  it("Dropcoin", async () => {
    // Generate keypair for the new account
    const playerKp = new web3.Keypair();
    const enemyKp = new web3.Keypair();
    const poolGame = new web3.Keypair();
    const pdaDataDrop = new web3.Keypair();
    let pk_key = new web3.PublicKey("3CtbQkbQYXwhaWFqjVwuPt2Mj6f5YiPmeQAL9RXYTF76");
    let player_pk_key = new web3.PublicKey("9gHp96VBPMeCfhNizP14eoqosnBQ8JodMfC9iXdCPVVU");
    let enemy_pk_key = new web3.PublicKey("AUMbL5J7wQuNxV7tpj1mq4SzPxqReDA6VzfkCzpJjcUi");
    let firstWinPrivKey = []
    .slice(0,32);
     let firstWinWallet = web3.Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
    
    //let [pdaDataDrop] = await web3.PublicKey.findProgramAddressSync([Buffer.from("UserDropInfo")], pk_key);
   
     const [userStatsPDA, _] = await web3.PublicKey
      .findProgramAddress(
        [
          Buffer.from("drop"),
        ],
        pk_key
      );

  //console.log(userStatsPDA)
    // Send transaction
    const data = new BN(42);
    const txHash = await pg.program.methods
      .getRandomNumber()
      .accounts({
        pdaDataDrop: userStatsPDA,
        player: player_pk_key,
        enemy: enemy_pk_key,
        num: playerKp.publicKey,        
        poolGame: firstWinWallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([firstWinWallet])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    //const newAccount = await pg.program.account.userDropInfo.fetch(pdaDataDrop.publicKey);

    //console.log("On-chain data is:", newAccount.data.toString());

    // Check whether the data on-chain is equal to local 'data'
    //assert(data.eq(newAccount.data));
  });
});

*/