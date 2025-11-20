# Gerador de Carteira Bitcoin (Testnet)

Este é um projeto simples em Node.js para gerar uma carteira de Bitcoin para a rede de testes (Testnet). Ele utiliza as bibliotecas `bitcoinjs-lib`, `bip32` e `bip39` para criar uma carteira HD (Hierarchical Deterministic) e exibir as informações essenciais.

## Funcionalidades

- Gera um mnemônico de 12 palavras (BIP39).
- Cria uma carteira HD a partir do mnemônico.
- Deriva um endereço de Bitcoin para a Testnet usando o padrão **BIP49** (endereços P2SH-P2WPKH, que começam com `2`).
- Exibe o endereço da carteira, a chave privada no formato WIF (Wallet Import Format) e o mnemônico.

## Pré-requisitos

Antes de começar, você precisará ter o Node.js (que inclui o npm) instalado em sua máquina.

## Instalação

1.  Clone este repositório ou baixe os arquivos para um diretório local.

2.  Abra o terminal no diretório do projeto.

3.  Instale as dependências necessárias:

    ```bash
    npm install bip32 bip39 bitcoinjs-lib
    ```

## Como Usar

Para gerar uma nova carteira, execute o script principal a partir do seu terminal:

```bash
node src/createWallet.js
```

O script irá imprimir no console as seguintes informações:

```
Carteira gerada
Endereço:  2N5X...
Chave privada:  cT2L...
Mnemonic:  word1 word2 word3 ... word12
```

> **Atenção:** Cada vez que o script é executado, uma nova carteira (novo endereço, chave privada e mnemônico) é gerada.

---

## ⚠️ Aviso de Segurança

Este projeto foi criado para **fins educacionais** e está configurado para usar a **rede de testes (Testnet)** do Bitcoin.

**NÃO USE AS CHAVES GERADAS POR ESTE SCRIPT PARA ARMAZENAR FUNDOS REAIS NA REDE PRINCIPAL (MAINNET).**

Qualquer pessoa com acesso ao seu mnemônico ou à sua chave privada pode controlar os fundos da sua carteira. Guarde-os com segurança.
