use anchor_lang::prelude::*;

declare_id!("");

#[program]
pub mod fd_random_number {
    use super::*;

    pub fn getrandomnumber(ctx: Context<Dropcoin>) -> Result<()> {
        msg!("Creating function distribution number...");           
    
        //Generate random number BEGIN
        let fd_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
        let fd_freq = [5,5,5,5,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
        let fd_n = fd_arr.len();
        
        let clock = Clock::get()?;
        let current_timestamp = clock.unix_timestamp as f64;
        msg!("timestamp: {}", current_timestamp);
    
        let mut prefix: [i32; 50] = [0; 50];
    
    
        prefix[0] = fd_freq[0];
        for i in 1..fd_n {
            prefix[i] = prefix[i - 1] + fd_freq[i];
        }
        
        let num_rand = current_timestamp % 0.9 ;
        
        msg!("num_rand: {}", num_rand);
        
        let rf =  (((num_rand * prefix[fd_n - 1] as f64)) ) as i32;
        let r = (rf + 1) as i32;
        msg!("let r: {}", r);
        
        let mut mid;
        let mut l = 0;
        let mut h = fd_n - 1;
    
        while l < h {
                mid = l + ((h - l) >> 1); 
                if r > prefix[mid]{
                    l = mid + 1;    
                } else {
                    h = mid;
                };
        }
        let mut random_value = 0;
        if prefix[l] >= r {
            random_value = l
        }
    
        let random_number = fd_arr[random_value];
      
        // Generate random number END
        let counter = &mut ctx.accounts.counter;
        msg!("Previous Count: { }", counter.count);
        counter.count = counter.count.checked_add(1).unwrap();
        msg!("Previous Count: { }", counter.count);
        msg!("number generated: {}", random_number);
        msg!("number generated: {}", ctx.accounts.pda_data_drop.key());
        ctx.accounts.pda_data_drop.random_number = random_number;
        ctx.accounts.pda_data_drop.player_pubkey_drop = ctx.accounts.player.key();
       
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Dropcoin<'info> {
   
    
    #[account(mut)]
    pub player: UncheckedAccount<'info>, // public key player
    pub enemy: UncheckedAccount<'info>, // enemy pda data
    pub num: UncheckedAccount<'info>, //account associed with pda counter enemyes die for this player
    #[account(
        init_if_needed,
        payer = pool_game,
        space = 8 + 8,
        seeds = ["enemykill".as_bytes().as_ref(), player.key().as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,
     // CHECK: Manual validation
    #[account(
        init_if_needed,
        payer = pool_game,
        space =  std::mem::size_of::<UserDropInfo>() + 8,
        seeds = ["drop".as_bytes().as_ref(), player.key().as_ref(), enemy.key().as_ref(), &[counter.count]], 
        bump
    )]
    pub pda_data_drop: Account<'info, UserDropInfo>,
    

     #[account(mut)]
    pub pool_game: Signer<'info>, // pool game sign tx 
    pub system_program: Program<'info, System>,
}
//#[derive(BorshDeserialize, BorshSerialize, Debug, Default, PartialEq)]
//pub struct ProgramAccountState {
  //  is_initialized: bool,

#[account]
pub struct UserDropInfo {
    pub random_number: u64,
    pub player_pubkey_drop: Pubkey,
    pub is_initialized: bool,
}

#[account]
pub struct PlayerInfo {
    pub player_pubkey: Pubkey,
}

#[account]
pub struct NumberInfo {
    pub random_number: u64,
}

#[account]
pub struct Counter {
    pub count: u8,
}