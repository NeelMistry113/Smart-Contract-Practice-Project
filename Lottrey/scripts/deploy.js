
async function main() {

  const [deployer] = await ethers.getSigners();


  const Lottrey = await ethers.getContractFactory("Lottrey");
  const lottrey = await Lottrey.deploy();

  console.log("Lottrey addresh:", lottrey.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
