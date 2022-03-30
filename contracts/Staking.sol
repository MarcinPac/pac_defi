// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract Staking is Ownable{
    using SafeMath for uint256;
    IERC20 public stakingToken;
    IERC20 public rewardsToken;
    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public lastUpdateTime;

    uint256 public percentagePerYear = 500;
    uint256 public totalStakingBalance;

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    function setRewardRate(uint _rate) public onlyOwner {
        percentagePerYear = _rate;
    }

    function getUserStakingBalance(address _user) public view returns(uint256){
        return stakingBalance[_user];
    }

    function getUserReward(address _user) public view returns(uint256) {
        return rewards[_user] + earned(_user);
    }

    modifier updateUserReward(address _user){
        rewards[_user] = rewards[_user] + earned(_user);
        lastUpdateTime[_user] = block.timestamp;
        _;
    }

    function earned(address _user) internal view returns (uint) {
        if(lastUpdateTime[_user] == 0) {
            return 0;
        }
        uint256 timeDiff = block.timestamp - lastUpdateTime[_user];
        uint256 minutesStaked = timeDiff / (1000 * 60);
        return calculateReward(minutesStaked, stakingBalance[_user], percentagePerYear);
    }

    function calculateReward(uint256 _minutesStaked, uint256 _balance, uint256 _percentagePerYear) public pure returns (uint256){
        return _balance * (
             ((_minutesStaked * 10 ** 12) / (365 * 24 * 60) * (_percentagePerYear * 10**4) / 100)) / 10**16 ;
    }

    function timestamp() public view returns(uint256) {
        return block.timestamp;
    }
    /**
    * @notice A method for staking tokens from sender account.
    * @param _amount Amount to unstake
    */
    function stakeTokens(uint256 _amount) external greaterThanZero(_amount) updateUserReward(msg.sender){
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        totalStakingBalance += _amount;
        (bool _isStaker, ) = isStaker(msg.sender);
        if(!_isStaker){
            stakers.push(msg.sender);
        }
        lastUpdateTime[msg.sender] = block.timestamp;
    }

    /**
    * @notice A method to unstake tokens to sender account.
    * @param _amount Amount to unstake
    */
    function unStakeTokens(uint256 _amount) external greaterThanZero(_amount) updateUserReward(msg.sender){
        (bool _isStaker, uint256 _stakerIndex ) = isStaker(msg.sender);
        require(_isStaker, "User is not staking any tokens");
        require(stakingBalance[msg.sender] >= _amount, "Not enough tokens to unstake");
        stakingToken.transfer(msg.sender, _amount);
        totalStakingBalance -= _amount;
        stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(_amount);
        if(stakingBalance[msg.sender] == 0) {
            delete stakers[_stakerIndex];
        }
    }

    /**
    * @notice A method for claiming rewards
    *
    */
    function claimRewards() external updateUserReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        rewardsToken.transfer(msg.sender, reward);
        rewards[msg.sender] = 0;
    }


    /**
    * @notice A method to check if an address is a staker.
    * @param _user The address to verify.
    * @return bool, uint256 Whether the address is a staker,
    * and if so its position in the stakers array.
    */
    function isStaker(address _user) internal view returns (bool, uint256){
        for(uint256 i = 0; i< stakers.length; i++){
            if(stakers[i] == _user){
                return (true, i);
            }
        }
        return (false, 0);
    }

    function getAllStakers() public view returns(StakingBoard memory) {
         Staker[] memory stakerList = new Staker[](stakers.length);
        for(uint i = 0 ; i < stakers.length; i++){
            address staker = stakers[i];
            stakerList[i] = Staker(staker, stakingBalance[staker]);
        }
        return StakingBoard(stakerList);
    }

    struct Staker {
        address _address;
        uint256 _amount;
    }

    struct StakingBoard {
        Staker[] stakerList;
    }

    modifier greaterThanZero(uint _amount){
        require(_amount > 0, "Amount has to be bigger than zero");
        _;
    }
}