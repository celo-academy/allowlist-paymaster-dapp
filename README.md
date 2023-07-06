<p align="center"> 
  <img width="100px" src="https://github.com/celo-org/celo-composer/blob/main/images/readme/celo_isotype.svg" align="center" alt="Celo" />
  <a href="https://thirdweb.com"><img src="https://github.com/thirdweb-dev/typescript-sdk/blob/main/logo.svg?raw=true" width="100" alt=""/></a>
 <h2 align="center">Allowlist Paymaster using ThirdWeb SDK</h2>
 <p align="center">
This is the implementation of Allowlist Paymaster, a paymaster that allows a list of `UserOperation` senders to be sponsored by the paymaster
</p>
</p>

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Features](#features)
-   [Doubts](#doubts)

## Installation

Clone the repo

```bash
git clone https://github.com/celo-academy/allowlist-paymaster-dapp.git
```

Install dependencies

```bash
yarn install
```

## Usage

### Step 1: Deploy the AllowlistPaymaster

#### `.env` setup in `packages/hardhat`

-   Go to `packages/hardhat` folder
-   Create a `.env` file and copy the contents of `.env.example` into it
-   Get the Private Key of the owner of the Paymaster and place it in the `.env` file
-   Open the file `scripts/deploy.js`, Entrypoint are frequently upgraded make sure the variable `ENTRYPOINT_ADDRESS` has the correct value
-   Run the deploy script to deploy the paymaster using the following command

```bash
npx hardhat run scripts/deploy.js --network alfajores
```

### Step 2: Start the App

#### `.env` setup in `packages/react-app`

-   Copy the paymaster address that you get in the terminal, this is the value for `ALLOWLIST_PAYMASTER_ADDRESS` in `packages/react-app/paymaster/index.js`
-   Create a `.env` file in `packages/react-app` and copy the contents of `.env.example` in `packages/react-app` into it
-   Get `NEXT_PUBLIC_THIRDWEB_API_KEY` from the [ThirdWeb](https://thirdweb.com/settings) Dashboard
-   Place the key in `.env` file in `packages/react-app`
-   Get `NEXT_PUBLIC_WC_PROJECT_ID` from WalletConnect dashboard
-   `PAYMASTER_SIGNER_KEY` is the same as the private key of the owner that you put in `.env` in `packages/hardhat`

To run the app

```bash
yarn dev
```

Optional:

You can verify the paymaster by using your Celoscan key in `.env` in `packages/hardhat` folder and use the following command

```bash
npx hardhat verify [PAYMASTER_ADDRESS] [ENTRYPOINT_ADDRESS] [PAYMASTER_OWNER_ADDRESS] --network alfajores
```

## Features

-   Customize the `allowList` in `index.js` in `packages/react-app/paymaster` to allow sponsorship of smart accounts by the paymaster

## Doubts

Join Office Hours in [Celo](https://discord.com/invite/celo) discord
