from scripts.utils import get_account
from brownie import PacToken, DotToken, Staking
from web3 import Web3
import time

def main():
    account = get_account(1)
    owner = get_account(0)
    pac_token = deployPacToken()
    dot_token = deployDotToken()
    staking = deployStaking(dot_token, pac_token)

    amount = 10000
    tx = dot_token.transfer(account.address, Web3.toWei(amount, "ether"))
    tx.wait(1)
    dotBalance = dot_token.balanceOf(account.address)
    print(f"DOT balance {Web3.fromWei(dotBalance, 'ether')}")

    # reward =  staking.calculateReward(2, Web3.toWei(1000, "ether"), 50)
    # print(f"Reward is {reward} in wei")
    # print(f"Reward is {Web3.fromWei(reward, 'ether')}")

    amount_staked = Web3.toWei(amount, "ether");
    dot_token.approve(staking.address, amount_staked, {"from": account})
    staking.stakeTokens(amount_staked, {"from": account})
    print(f"Total staking balance {Web3.fromWei(staking.totalStakingBalance(), 'ether')}")
    balance = staking.getUserStakingBalance(account.address, {"from": account})
    print(f"User balance {Web3.fromWei(balance, 'ether')}")
    reward = staking.getUserReward(account.address, {"from": account})
    print(f"User reward {Web3.fromWei(reward, 'ether')}")
    dotBalance = dot_token.balanceOf(account.address)
    print(f"DOT balance {Web3.fromWei(dotBalance, 'ether')}")
    staking.unStakeTokens(Web3.toWei(400, "ether"), {"from": account})
    balance = staking.getUserStakingBalance(account.address, {"from": account})
    print(f"User balance {Web3.fromWei(balance, 'ether')}")
    dotBalance = dot_token.balanceOf(account.address)
    print(f"DOT balance {Web3.fromWei(dotBalance, 'ether')}")
    staking.unStakeTokens(Web3.toWei(600, "ether"), {"from": account})
    balance = staking.getUserStakingBalance(account.address, {"from": account})
    print(f"User balance {Web3.fromWei(balance, 'ether')}")
    dotBalance = dot_token.balanceOf(account.address)
    print(f"DOT balance {Web3.fromWei(dotBalance, 'ether')}")
    staking.claimRewards()
    pacBalance = pac_token.balanceOf(account.address)
    print(f"Pac balance {Web3.fromWei(pacBalance, 'ether')}")

def deployPacToken():
    account = get_account()
    pacToken = PacToken.deploy({"from" : account})
    return pacToken

def deployDotToken():
    account = get_account()
    dotToken = DotToken.deploy({"from" : account})
    return dotToken

def deployStaking(stakingToken, rewardToken):
    account = get_account()
    staking = Staking.deploy(stakingToken, rewardToken, {"from" : account})
    return staking;