// importando as dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const readline = require('readline');

// definir a rede
// bitcoin - rede principal - mainnet
// bitcoin_testnet - rede de testes - testnet
const network = bitcoin.networks.testnet;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Quantos palavras você gostaria para o seu mnemônico? (12, 15, 18, 21 ou 24): ', (wordCount) => {
    const strengthMap = {
        '12': 128,
        '15': 160,
        '18': 192,
        '21': 224,
        '24': 256
    };

    const strength = strengthMap[wordCount];

    if (!strength) {
        console.log('Opção inválida. Por favor, escolha entre 12, 15, 18, 21 ou 24.');
        rl.close();
        return;
    }

    // derivação de carteiras HD
    const path = "m/49'/1'/0'/0/0";

    // criando o mnemonic para a seed (palavras de senha)
    const mnemonic = bip39.generateMnemonic(strength);
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // criando a raiz da carteira HD
    const root = bip32.fromSeed(seed, network);

    // criando uma conta - par pvt-pub keys
    const account = root.derivePath(path);

    // O caminho de derivação BIP49 (m/49'...) gera endereços P2SH(P2WPKH)
    // que são endereços SegWit compatíveis.
    const btcAddress = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: account.publicKey, network: network }),
        network: network,
    }).address;

    console.log("\nCarteira gerada com sucesso!");
    console.log("Endereço: ", btcAddress);
    console.log("Chave privada: ", account.toWIF());
    console.log(`Mnemonic (${wordCount} palavras): `, mnemonic);

    rl.close();
});
