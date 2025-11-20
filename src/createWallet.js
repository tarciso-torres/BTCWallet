// importando as dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// definir a rede
// bitcoin - rede principal - mainnet
// bitcoin_testnet - rede de testes - testnet
const network = bitcoin.networks.testnet;

// derivação de carteiras HD
const path = "m/49'/1'/0'/0/0";

// criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// criando uma conta - par pvt-pub keys
let account = root.derivePath(path);

// O caminho de derivação BIP49 (m/49'...) gera endereços P2SH(P2WPKH)
// que são endereços SegWit compatíveis.
let btcAddress = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({ pubkey: account.publicKey, network: network }),
    network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", account.toWIF());
console.log("Mnemonic: ", mnemonic);
