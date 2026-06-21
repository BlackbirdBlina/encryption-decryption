# Projeto de Criptografia

## Passo a passo para rodar o projeto

- Se não tiver a ferramenta de git, instale o git. **Obs:** *Comando para ubuntu*
```bash
sudo apt install git 
```
Pressione 'y' para a seguinte mensagem:

```bash
Do you want to continue? [Y/n]
```

- Em seguida clone o repositório usando o comando abaixo e entre na pasta gerada usando o cd [nome da pasta]:
```bash
git clone https://github.com/BlackbirdBlina/encryption-decryption.git
cd encryption-decryption
```
- É necessário ter o Nodejs instalado! Para tanto, faça os comandos abaixo:
```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 24

#Optional!!!
# Verify the Node.js version:
node -v # Should print "v24.17.0".

# Verify npm version:
npm -v # Should print "11.13.0".
```

Para mais detalhes acesse: [Node](https://nodejs.org/en/download)

- Instale as dependências do projeto:
```bash
npm install
```
## Como executar
```bash
npm run dev
```

Acesse [http://localhost:5173/](http://localhost:5173/) no navegador

## Aluna

- Sabrina da Silva Barbosa Venceslau

  - Perfil do Github: [Sabrina Venceslau](https://github.com/BlackbirdBlina)