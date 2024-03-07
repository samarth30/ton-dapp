import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";

export function Jetton() {
  const { connected, wallet } = useTonConnect();
  const { jettonWalletAddress, balance, mint } = useJettonContract();

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>NFT Minting</h3>
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/1*t9A1nWJzafKidK1l1HkRyA.png"
          alt="NFT Monkey on TON Blockchain"
          width="300"
        ></img>
        <FlexBoxRow>
          Wallet
          <Ellipsis>
            {wallet ? Address.parse(wallet as string).toString() : "Loading..."}
          </Ellipsis>
        </FlexBoxRow>
        {/* <FlexBoxRow>
          Jetton Wallet
          <Ellipsis>
            {jettonWalletAddress ? jettonWalletAddress : "Loading..."}
          </Ellipsis>
        </FlexBoxRow> */}
        {/* <FlexBoxRow>
          Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow> */}
        <Button disabled={!connected} onClick={mint}>
          Mint NFT
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
