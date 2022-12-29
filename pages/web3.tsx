import MainLayout from "../layouts/MainLayout";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { hashMessage } from "@ethersproject/hash";
import { Web3FormData } from "../types";

/*
 ** TODO:
 ** Add web3 functionality below
 ** Use Goerli test network
 ** Use any ethereum provider
 ** Example of the contract to interact with is in `./contract.example.sol`
 */

const initialFormData = {
  message: "",
  signedMessage: "",
};

const initialValidationStatuses = {
  success: false,
  fail: false,
};

function useWeb3Form() {
  const [data, setData] = useState<Web3FormData>(initialFormData);
  const [validationStatus, setValidationStatus] = useState(
    initialValidationStatuses
  );
  const [validBtnDisabled, setValidBtnDisabled] = useState(false);
  const [balance, setBalance] = useState(BigInt(0));
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress("" /* TODO: set account address */);

    setBalance(BigInt(0) /* TODO: set account balance */);
  }, ["" /* TODO: set account address */]);

  const handleSignMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const signedMessage = ""; /* TODO: sign 'data.message' */
    /* TODO: call 'write' method on 'contract' and pass 'signedMessage' as input parameter */

    setValidBtnDisabled(true);
  };

  const handleSignedMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const signedMessage = ""; /* TODO: call 'read' method on contract */

    setData((prev) => ({ ...prev, signedMessage }));
    setValidBtnDisabled(false);
  };

  const handleValidateClick = async () => {
    const hashedMessage = ""; /* TODO: hash the "data.message" */
    function isSignedMessageValid(
      originalAddress?: string,
      hashedMessage?: string,
      signedMessage?: string
    ) {
      return true; /* TODO: check if 'signedMessage' is signed by 'originalAddress' */
    }

    if (isSignedMessageValid(address, hashedMessage, data.signedMessage)) {
      setValidationStatus((prev) => ({ ...prev, success: true, fail: false }));
    } else {
      setValidationStatus((prev) => ({ ...prev, success: false, fail: true }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setValidationStatus(initialValidationStatuses);
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    data,
    validationStatus,
    balance,
    address,
    validBtnDisabled,
    handleSignMessageSubmit,
    handleSignedMessageSubmit,
    handleValidateClick,
    handleChange,
  };
}

export default function Web3Page() {
  const {
    data,
    validationStatus,
    balance,
    address,
    validBtnDisabled,
    handleSignMessageSubmit,
    handleSignedMessageSubmit,
    handleValidateClick,
    handleChange,
  } = useWeb3Form();

  return (
    <MainLayout>
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Web3 page</h1>
        <div className="space-y-4">
          <div>
            <p>Address: {address}</p>
            <p>Balance: {balance.toString() /*attention*/} ETH</p>
          </div>
          <form className="space-y-2" onSubmit={handleSignMessageSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Message"
              required
              value={data.message}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-500"
              type="submit"
            >
              Sign and Send Message
            </button>
          </form>
          <form className="space-y-2" onSubmit={handleSignedMessageSubmit}>
            <input
              className="w-full p-1 bg-white rounded-md disabled:opacity-40"
              type="text"
              name="signedMessage"
              placeholder="Signed Message"
              disabled
              value={data.signedMessage}
            />
            <button
              className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-500"
              type="submit"
            >
              Get Signed Message
            </button>
          </form>
          <div className="space-y-2">
            {validationStatus.success && (
              <h2 className="text-green-500">Signed message is valid</h2>
            )}
            {validationStatus.fail && (
              <h2 className="text-red-500">Signed message is not valid</h2>
            )}
            <button
              className="w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-500 disabled:bg-opacity-40"
              type="submit"
              disabled={validBtnDisabled}
              onClick={handleValidateClick}
            >
              Validate Signed Message
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
