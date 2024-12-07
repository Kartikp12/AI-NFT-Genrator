import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

export const nftCollectionContractAddress = "0x4f77A182baD4F58B2D8DE6658F82b04cf69F47A4";

export const contract = getContract({
    client: client,
    chain: chain,
    address: nftCollectionContractAddress,
});