# DISTRIBUTION FUNCTION



In probability theory, the probability function f(x) is used, also called probability density or probability distribution, which is defined by the proposals (discrete case, x ε N).



1. f(x) ≥ 0



2. ∑ f (x)=1



3. P(X = x) = f(x)



The distribution function F(x) is defined from the probability density according to the following:





F(x) = P(x ≤ x) = ∑ f (t)





Sometimes the distribution function is known as the cumulative distribution function, from the above equation it can be seen that the distribution function is obtained by adding probabilities.



It is possible to calculate the probability of an event from the distribution function. If x1, x2,…,xn are elements of the random variable X, the relationship is valid:



P(xi+1) = F(xi+1) – F(xi)



Which allows us to calculate the probability of an event known by the distribution function.



For the case at hand, we want to generate a random number but it comes from a known distribution function.



The shape of the desired distribution function is of the sigmoid type, as seen in the graph below:






# Solana Program
In this program generate a random number based on a distribution function

the main function that does this is called getrandomnumber, in the code you can see that 2 different arrays are required to generate the matrix, an initial "pseudo-random" number is also required in this case, we get this number directly from the clock of the blockchain.

We also manage some accounts that can be useful if you want to create a record on the blockchain and associate it with your users' accounts.

dropcoin
an account used to store the generated random number information and the associated account

If you want to try, you can copy the code from lib.rs and paste it at https://beta.solpg.io/ without installing anything on your computer




# special thanks
This mathematical logic was created thanks to Mario Cabrera, professional Master in Physics.