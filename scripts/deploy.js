const hre = require("hardhat");

async function main() {
  const PAYMENT_TOKEN = "0x6dcEae9Afd6E76eFEb8B0fB27803c1dfFb06E9A6"; // SLR on Arbitrum Sepolia
  const FEE_RECIPIENT = "0xa8CF95F9b16A783A1a4E8160Bd75fFF864C5D067";
  const FEE_BPS = 200; // 2%
  const BASE_URI = ""; 

  console.log("Deploying LocalVouchers with:");
  console.log("paymentToken:", PAYMENT_TOKEN);
  console.log("feeRecipient:", FEE_RECIPIENT);
  console.log("feeBps:", FEE_BPS);

  const LocalVouchers = await hre.ethers.getContractFactory("LocalVouchers");
  const localVouchers = await LocalVouchers.deploy(
    PAYMENT_TOKEN,
    FEE_RECIPIENT,
    FEE_BPS,
    BASE_URI
  );

  await localVouchers.waitForDeployment();

  console.log("LocalVouchers deployed to:", await localVouchers.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // Contract Address: 0x3de371b87d6EfbB0842Ed7346EdD6cfe41b4b6bF