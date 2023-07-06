# Allowlist Paymaster using ThirdWeb SDK

This is the implementation of Allowlist Paymaster, a paymaster that allows a list of `UserOperation` senders to be sponsored by the paymaster

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Features](#features)
-   [Doubts](#doubts)


## Installation

Clone the repo

```bash
git clone https://github.com/celo-academy/erc-4337-custom-paymaster.git
```

Install dependencies

```bash
yarn install
```

## Usage

### Step 1: Deploy the AllowlistPaymaster

-   Create a `.env` file and copy the contents of `.env.example` into it
-   Get the Private Key of the owner of the Paymaster and place it in the `.env` file
-   Open the file `scripts/deploy.js`, Entrypoint are frequently upgraded make sure the variable `ENTRYPOINT_ADDRESS` has the correct value
-   Run the deploy script to deploy the paymaster using the following command

```bash
npx hardhat run scripts/deploy.js --network alfajores
```

-   Copy the paymaster address that you get in the terminal, this is the value for `ALLOWLIST_PAYMASTER_ADDRESS`
-   Get `THIRDWEB_API_KEY` from the [ThirdWeb](https://thirdweb.com/settings) Dashboard
-   Place the key in `.env` file
-   Replace variables `PAYMASTER_OWNER` (this is the public key corresponding the private key of the paymaster owner), and `ALLOWLIST_PAYMASTER_ADDRESS` with the values you have

To run the transaction script and perform a `UserOperation` use the following command

```bash
yarn dev
```

Optional:

You can verify the paymaster by using your Celoscan key in `.env` file and use the following command

```bash
npx hardhat verify [PAYMASTER_ADDRESS] [ENTRYPOINT_ADDRESS] [PAYMASTER_OWNER_ADDRESS] --network alfajores
```

## Features

-   Customize the `allowList` in `index.js` to allow sponsorship of smart accounts by the paymaster

## Doubts

Join Office Hours in [Celo](https://discord.com/invite/celo) discord
