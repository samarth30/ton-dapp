import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { NftCollection } from "../wrappers/NftCollection";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useJettonContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [balance, setBalance] = useState<string | null>();

  const jettonContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    const contract = NftCollection.fromAddress(
      Address.parse("EQDw3OgILQoBkhmu_aQBOy36vwUGfNKXJIbZpulscUNiQjVf")
    );

    // @ts-ignore
    return client.open(contract) as OpenedContract<NftCollection>;
  }, [client, wallet]);

  //   const jettonWalletContract = useAsyncInitialize(async () => {
  //     if (!jettonContract || !client) return;

  //     const jettonWalletAddress = await jettonContract.getGetWalletAddress(
  //       Address.parse(Address.parse(wallet!).toString())
  //     );

  //     return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress));
  //   }, [jettonContract, client]);

  useEffect(() => {
    // async function getBalance() {
    //   if (false) return;
    //   setBalance(null);
    //   //   const balance = (await jettonWalletContract.getGetWalletData()).balance;
    //   setBalance(fromNano(balance));
    //   await sleep(5000);
    //   getBalance();
    // }
    // getBalance();
  }, [jettonContract]);

  return {
    // jettonWalletAddress: jettonWalletContract?.address.toString(),
    jettonWalletAddress: "",
    balance: 0,
    mint: () => {
      //   const message = {
      //     $$type: "Mint",
      //     amount: 150n,
      //   };
      const message = "Mint";
      // @ts-ignore
      jettonContract?.send(
        sender,
        {
          value: toNano("0.09"),
        },
        message
      );
    },
  };
}
