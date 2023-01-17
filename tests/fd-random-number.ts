import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { FdRandomNumber } from "../target/types/fd_random_number";

describe("fd-random-number", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.FdRandomNumber as Program<FdRandomNumber>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
