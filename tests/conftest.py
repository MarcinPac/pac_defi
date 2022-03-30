import pytest
from web3 import Web3
from scripts.utils import get_account

@pytest.fixture
def amount_staked():
    return Web3.toWei(1, "ether")

