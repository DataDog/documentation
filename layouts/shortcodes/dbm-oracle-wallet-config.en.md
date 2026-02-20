#### Configure the Agent to use a Wallet

Download the wallet zip file from the Oracle Cloud and unzip it. Set the `protocol` and `wallet` configuration parameters.

```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<SERVICE_NAME>" 
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```