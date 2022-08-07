
async function main() {

  const EventOrganization = await hre.ethers.getContractFactory("EventOrganization");
  const eventOrganization = await Lock.deploy();

  console.log("EventOrganizer addres:", eventOrganization.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
