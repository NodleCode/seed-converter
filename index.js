const {
    mnemonicToMiniSecret,
    mnemonicValidate,
} = require('@polkadot/util-crypto');
const {u8aToHex} = require("@polkadot/util")
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
    .option('mnemonic', {
        alias: 'm',
        describe: 'BIP39 based string'
    })
    .demandOption(['mnemonic'], 'Please provide a BIP39 12 word phrase to work with this tool')
    .help()
    .argv

async function main () {
    // Get the BIP39 based mnemonic string from the arguments
    const mnemonic = argv.mnemonic;

   console.log(`For mnemonic: ${argv.mnemonic}`);

    // Validate the mnemonic string that was generated
    const isValidMnemonic = mnemonicValidate(argv.mnemonic);

    console.log(`isValidMnemonic: ${isValidMnemonic}`);

    // Create valid Substrate-compatible seed from mnemonic
    const seed = mnemonicToMiniSecret(argv.mnemonic);

    console.log(u8aToHex(seed));
}

main().catch(console.error).finally(() => process.exit());