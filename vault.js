const nodeVault = require('node-vault')
const dotenv = require('dotenv')

dotenv.config()

const SecretMap = {
  awsuser_user: 'DBUSER',
  awsuser_password: 'DBPASS',
}

async function populate () {
  const vaultConfig = {
    endpoint: `https://${process.env.VAULT_HOST}:8200`,
    requestOptions: {
      strictSSL: false,
    }
  }

  const vaultAnon = nodeVault(vaultConfig)

  const result = await vaultAnon.approleLogin({
    role_id: process.env.VAULT_ROLE,
    secret_id: process.env.VAULT_SECRET,
  })

  if (!result.auth || !result.auth.client_token) {
    throw new Error('No client token received upon login')
  }

  const vault = nodeVault({...vaultConfig, token: result.auth.client_token})

  const secrets = await vault.read('secret/data/graphql')
  const data = secrets.data.data

  Object.keys(SecretMap).forEach(key => {
    // Retrieve the secret for the specified key
    const value = data[key]
    const target = SecretMap[key]

    // Don't override values that already exist
    if (!process.env[target]) {
      // Populate the value as the target environment variable
      process.env[target] = value
    }
  })
}

module.exports = {populate}
