## Description :

Utility to fetch github user's contribution PR's and reviews done by him in a given time range.

<details>
<summary>Example out:</summary>

```bash
> tsx --env-file=.env src/index.ts

-----------------------------------------
scaffold-eth-2:

---- add foundry flatten script: https://github.com/scaffold-eth/scaffold-eth-2/pull/746
---- fix contract code tab in blockexplorer: https://github.com/scaffold-eth/scaffold-eth-2/pull/741
---- Cli backmerge: https://github.com/scaffold-eth/scaffold-eth-2/pull/740
---- add refresh reset at ContractUI: https://github.com/scaffold-eth/scaffold-eth-2/pull/739
---- Fix cursor stealing & display loading for AddressInput: https://github.com/scaffold-eth/scaffold-eth-2/pull/738
---- cli next template readme + foundry sepolia chains update: https://github.com/scaffold-eth/scaffold-eth-2/pull/731
---- latest cli back-merge: https://github.com/scaffold-eth/scaffold-eth-2/pull/728
---- add basic example to show connected address: https://github.com/scaffold-eth/scaffold-eth-2/pull/721
---- up rainbowkit version to 1.3.5: https://github.com/scaffold-eth/scaffold-eth-2/pull/719
---- use next-themes for handling theme: https://github.com/scaffold-eth/scaffold-eth-2/pull/712
---- Up usehooks ts: https://github.com/scaffold-eth/scaffold-eth-2/pull/707
---- Reviews: https://github.com/scaffold-eth/scaffold-eth-2/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3Atechnophile-04+merged%3A2024-02-01..2024-02-29+
-----------------------------------------



-----------------------------------------
abi.ninja:

---- add middlware to redirect /[contractAddress] requests to mainnet by default: https://github.com/BuidlGuidl/abi.ninja/pull/69
---- Improve structs UI : https://github.com/BuidlGuidl/abi.ninja/pull/68
---- Add base, scroll and ZkSync: https://github.com/BuidlGuidl/abi.ninja/pull/59
---- Remove hardhat package and update gh-actions file: https://github.com/BuidlGuidl/abi.ninja/pull/55
---- Reviews: https://github.com/BuidlGuidl/abi.ninja/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3Atechnophile-04+merged%3A2024-02-01..2024-02-29+
-----------------------------------------



-----------------------------------------
grants.buidlguidl.com:

---- Update Address component to acceipt link prop: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/49
---- Add status timpestamps: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/45
---- Tweak completed grants page: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/43
---- Stats tweaks : https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/42
---- Hero section minor tweaks: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/40
---- Ecosystem impact grants section: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/33
---- Community grants section: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/25
---- use swr for fetching and mutations: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/24
---- use route handler for applying of grants: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/20
---- Homepage skeleton: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/15
---- Seed data script and example: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/10
---- Submit grants page: https://github.com/BuidlGuidl/grants.buidlguidl.com/pull/8
---- Reviews: https://github.com/BuidlGuidl/grants.buidlguidl.com/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3Atechnophile-04+merged%3A2024-02-01..2024-02-29+
-----------------------------------------



-----------------------------------------
se-2-challenges:

---- Chall5: Make it autograder ready: https://github.com/scaffold-eth/se-2-challenges/pull/143
---- Chall4: Make it autograder ready: https://github.com/scaffold-eth/se-2-challenges/pull/142
---- Chall3: Make it autograder ready: https://github.com/scaffold-eth/se-2-challenges/pull/141
---- Reviews: https://github.com/scaffold-eth/se-2-challenges/pulls?q=is%3Apr+is%3Aclosed+reviewed-by%3Atechnophile-04+merged%3A2024-02-01..2024-02-29+
-----------------------------------------
```

</details>

## Pre-requisites :

- Node version >= 20
- pnpm

## Installation :

Clone the repo:

```bash
git clone https://github.com/technophile-04/fetch-my-gh-contributions.git
```

Install the dependencies:

```bash
pnpm install
```

## Setup :

Add github token in .env file

```bash
GIT_TOKEN=your-github-token
```

Checkout this guide on getting github token: [link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

## Run:

Run the utility:

```bash
pnpm run dev
```

TIP: Your can redirect the output to a file by using `>` operator

```bash
pnpm run dev >> output.txt
```
