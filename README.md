predy-bot-examples
=====

This is experimental code. Please try this on TESTNET only.
This bot code is using Defender Autotask.

## Running Locally

You can run the scripts locally, instead of in Autotask, via a Defender Relayer. Create a Defender Relayer on arbitrum rinkeby, write down the API key and secret, and create a `.env` file or copy `.env.example` in this folder with the following content.

```
API_KEY=yourapikey
API_SECRET=yourapisecret
```

Set your VAULT_ID and modify other params in `src/index.ts`.

Then run `npm run build` to compile source code, and `npm start` that'll run your script locally, connecting to the Relay via API.
