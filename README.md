# DISTRIBUTION FUNCTION
## _Solana random number, special to games drop_


In probability theory, the probability function f(x) is used, also called probability density or probability distribution, which is defined by the proposals (discrete case, x ε N).



1. f(x) ≥ 0



2. ![Image text](https://github.com/sistemaseltigre/fd-random-number/blob/main/app/3.png)



3. P(X = x) = f(x)



The distribution function F(x) is defined from the probability density according to the following:

![Image text](https://github.com/sistemaseltigre/fd-random-number/blob/main/app/2.png)



Sometimes the distribution function is known as the cumulative distribution function, from the above equation it can be seen that the distribution function is obtained by adding probabilities.



It is possible to calculate the probability of an event from the distribution function. If x1, x2,…,xn are elements of the random variable X, the relationship is valid:


![Image text](https://github.com/sistemaseltigre/fd-random-number/blob/main/app/1.png)



Which allows us to calculate the probability of an event known by the distribution function.



For the case at hand, we want to generate a random number but it comes from a known distribution function.



The shape of the desired distribution function is of the sigmoid type, as seen in the graph below:



![Image text](https://github.com/sistemaseltigre/fd-random-number/blob/main/app/graf.png)

> You can read more in  https://en.wikipedia.org/wiki/Cumulative_distribution_function

## Solana Program
In this program generate a random number based on a distribution function

the main function that does this is called "getrandomnumber", in the code you can see that 2 different arrays are required to generate the matrix, an initial "pseudo-random" number is also required in this case, we get this number directly from the clock of the blockchain and two aditional numbers "enemyid" & "rncli" these number are recive of client to create a new "pseudo-random" number.

We also manage some accounts that can be useful if you want to create a record on the blockchain and associate it with your users' accounts.

dropcoin
an account used to store the generated random number information and the associated account

If you want to try, you can copy the code from lib.rs and paste it at https://beta.solpg.io/ without installing anything on your computer

## Lifecycle

1 - Cliente get enemy number<br>
2 - Client create a pseudo-random number<br>
    2.1 - Send varibles to solana program function (getrandomnumber)<br>
		    2.1.1 example:<br>
		    
		const txHash = await program.methods.getrandomnumber(enemyid,rncli).accounts({
			drop: userStatsPDA,
		    player: player_pk_key,
		    enemy: enemy_pk_key,       
		    counter: counterPDA,        
		    poolGame: firstWinWallet.publicKey,
		    systemProgram: web3.SystemProgram.programId,
		})  
		.signers([firstWinWallet]).rpc();
	        
   2.2 - Function sum (timestamp + enemyid number + pseudo-random number) to create a main number<br>
   2.3 - Main number is used to calculate an acumulative function distribution<br>
   2.4 - Get randon number generated<br>
   2.5 - Get counter data<br>
   2.6 - Add new counter data<br>
   2.7 - Create a new account PDA and save random number and player key<br>
3 - You can create a fetch function to get a random number generated<br>
	3.1 example:
    
    let fdn_tx = await program.account.userdropinfo.fetch(userStatsPDA).catch((error) => {
        console.log(error);
    }); 

## Special thanks
This mathematical logic was created thanks to **Mario Cabrera**, professional Master in Physics.

## License

MIT
**Free Software, Build!**