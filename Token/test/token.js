
const {expect} = require("chai");


// describe("Token contract", function () {

//     it("Deploument should assigne the total supply of token to the owner", async function(){
//         const [owner] = await ethers.getSigners();
 
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken  = await Token.deploy();

//         const ownerBalance = await hardhatToken.CheckBalance(owner.address);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//     }); 


//     it("Should transfer token between accounts", async function(){
//         const [owner, addr1, addr2] = await ethers.getSigners();
 
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken  = await Token.deploy();

//         // Transfer 10 Token from Owner to addr1

//         await hardhatToken.transfer(addr1.address,10);
//         expect(await hardhatToken.CheckBalance(addr1.address)).to.equal(10);

//         // Transfer 5 Token from addr1 to addr2

//         await hardhatToken.connect(addr1).transfer(addr2.address,5);
//         expect(await hardhatToken.CheckBalance(addr2.address)).to.equal(5);
//     });
// });

describe("Token Contract", function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;
     
    beforeEach(async function (){
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function (){
        it("Should set the right owner", async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address); 
        });

        it("Should assign the total supply of token to the owner", async function(){
            const ownerBalance = await hardhatToken.CheckBalance(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    }); 
    
    describe("Transaction", function(){
        it("Should transfer token between accounts", async function(){
            //owner account to aadr1.address
            await hardhatToken.transfer(addr1.address, 5);
            const addr1Balance = await hardhatToken.CheckBalance(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2Balance = await hardhatToken.CheckBalance(addr2.address);
            expect(addr2Balance).to.equal(5);
        });

        it("Should fail if sender does not have enough token", async function(){
            const initialOwnerBalance =  await hardhatToken.CheckBalance(owner.address);
            await expect( hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough token");
            expect(await hardhatToken.CheckBalance(owner.address)).to.equal(initialOwnerBalance);
        }); 

        it("Should update balances after transfer", async function(){
            const initialOwnerBalance = await hardhatToken.CheckBalance(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address, 10);

            const finalOwnerBalance = await hardhatToken.CheckBalance(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);

            const addr1Balance = await hardhatToken.CheckBalance(addr1.address);
            expect(addr1Balance).to.equal(5);
            const addr2Balance = await hardhatToken.CheckBalance(addr2.address);
            expect(addr2Balance).to.equal(10);
        });
    });
}); 