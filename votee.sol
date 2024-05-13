// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract VotingSystem {
    struct CandidateInfo{
        uint256 id;
        string name;
        uint256 phno;
        uint256 totalvotes;
    }
    CandidateInfo[2] public Candidates;
     constructor() {
        Candidates[0] = CandidateInfo(1,"Rick",9988776655,0);
        Candidates[1] = CandidateInfo(2,"Seline",9944332211,0);
    }
    mapping(address => uint256) public voters;
    function vote(uint _id) public{
        require(voters[msg.sender]==0,"You have already voted");
        if(_id == 1){
        Candidates[0].totalvotes +=1;
        voters[msg.sender]=1;
        }
       else if(_id == 2){
        Candidates[1].totalvotes +=1;
        voters[msg.sender]=2;
       }
    }
    function getCandidate(uint256 _id) public view returns (uint, string memory, uint) {
        uint256 i = _id-1;
        return (Candidates[i].id, Candidates[i].name, Candidates[i].phno);
    }
    function getVotes(uint256 _id) public view returns (uint256) {
        return Candidates[_id-1].totalvotes;
    }
    function voteCast(address add) public view returns (uint256) {
        return voters[add];
    }
}