from brownie import network, exceptions

from scripts.utils import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    INITIAL_PRICE_FEED_VALUE,
    DECIMALS,
    get_account,
    get_contract,
)

from scripts.deploy import deployPacToken, deployDotToken, deployStaking

def test_staking(amount_staked):
    account = get_account()
    pac_token = deployPacToken()
    dot_token = deployDotToken()
    staking = deployStaking(dot_token, pac_token)

    dot_token.approve(staking.address, amount_staked, {"from": account})
    staking.stakeTokens(amount_staked, {"from": account})

    assert staking.stakingBalance(account.address) == amount_staked
    assert staking.stakers(0) == account.address

    dot_token.approve(staking.address, amount_staked, {"from": account})
    staking.stakeTokens(amount_staked, {"from": account})
    assert staking.stakingBalance(account.address) == 2 * amount_staked
    assert staking.totalStakingBalance() == 2 * amount_staked

    staking.unStakeTokens(amount_staked, {"from": account})
    assert staking.stakingBalance(account.address) == amount_staked
    staking.unStakeTokens(amount_staked, {"from": account})
    assert staking.totalStakingBalance() == 0
