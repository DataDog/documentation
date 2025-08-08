---
title: Secrets Management
aliases:
  - /agent/faq/kubernetes-secrets
  - /agent/guide/secrets-management
further_reading:
- link: "/agent/autodiscovery/"
  tag: "Documentation"
  text: "Autodiscovery"
algolia:
  tags: ['secrets', 'secrets executable', 'secrets provider', 'list secrets']
---

## Overview

The Datadog Agent allows you to securely manage secrets by integrating with any external secrets management solution (such as HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or a custom solution). Instead of hardcoding sensitive values like API keys or passwords in plaintext within configuration files, the Agent can retrieve them dynamically at runtime.

### How it works

To reference a secret in your configuration, use `ENC[<secret_id>]`. This notation tells the Agent to resolve the value using either the natively supported executable or your configured secret retrieval executable. The secret executable resolves the placeholder using your secrets management solution. It then injects the plaintext value into the config at runtime. The secret is fetched and loaded into memory but is never written to disk or sent to the Datadog backend.

For example, the following configuration shows two secrets defined with `ENC[]`:
```
instances:
  - server: db_prod
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"
```

The secret handle must make up the full value of the YAML field and is always resolved as strings. This means configurations like `password: "db-ENC[prod_password]"` are not recognized as secrets.

You can use any characters inside the `ENC[]` brackets as long as the YAML is valid. If your secret ID includes special characters or is a JSON string, make sure to properly escape it. For example:
```
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

It's also possible to use [Autodiscovery][1] variables in secret handles. The Agent resolves these variables before resolving the secret. For example:
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

**Note**: You cannot use the `ENC[]` syntax in `secret_*` settings like `secret_backend_command`.

## Options for retrieving secrets

### Option 1: Using the Agent to resolve secrets from supported secret management solutions

*Note*: This option is not supported in Windows.

Starting in Agent version 7.69, the Datadog Agent includes a natively supported secret executable. This update allows you to configure the backend executable directly by setting the `secret_backend_type` and `secret_backend_config` options in the `datadog.yaml` file. 

`secret_backend_type` is where the type of the backend is specified, and `secret_backend_config` is where additional configuration relevant for pulling secrets is included. To use this embedded executable, add the following code to your `datadog.yaml` file:

```yaml
secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```


More specific setup instructions depend on the backend type used. Refer to the appropriate link for further information: 


{{% collapse-content title="AWS Secret and SSM" level="h4" expanded=false id="id-for-anchoring" %}}
The secret executable utility supports the following AWS services:

|Backend Type                                 | AWS Service                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

#### AWS session

Supported AWS backends can leverage the default credential provider chain as defined by the [AWS SDKs][1002] and [CLI][1003]. As a result, the following order of precedence is used to determine the AWS backend service credential:

1. **Environment variables**: Defined as environment variables within the Datadog Agent service configuration on the Datadog Agent host system

2. **CLI configuration file**: Only the default CLI configuration file of the Datadog Agent user, such as `${HOME}/.aws/config` or `%USERPROFILE%\.aws\config`, is supported. The Datadog Agent user is typically `dd-agent`.

3. **Instance profile credentials**: Container or EC2 hosts with an assigned [IAM instance profile][1004]

Using environment variables or session profiles are more complex. They must be configured within the service (daemon) environment configuration or the `dd-agent` user home directory on each Datadog Agent host. 

Using IAM user access keys or an EC2 instance profile are simpler configurations which do not require additional Datadog Agent host configuration.

##### Instance profile instructions

Datadog **strongly recommends** using the [instance profile method][1006] of retrieving secrets, as AWS handles all environment variables and session profiles for you. 

To use an instance profile, create an IAM role in the same account where your AWS services are running. When setting up the role, specify the **Trusted Entity Type** as **AWS Service**. Select the appropriate service, such as **EC2** if you're working with an EC2 instance. This IAM role is then available for use by instances of the selected service. 


Next, attach a permissions policy to the IAM role. The specific policy you need depends on whether you're using [AWS Secrets Manager][1000] or [AWS Systems Manager Parameter Store][1001]. 

Then, configure the trust policy for the role and be sure to replace `${Service}` with the name of the service you selected earlier:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "${Service}.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

Finally, for the instance that is retrieving secrets, assign the IAM role you just created. After assigning the role, restart the instance to apply the changes.


##### AWS session settings

The following `aws_session` settings are available on all supported AWS Service backends:

| Setting | Description |
| --- | --- |
| `aws_region` | AWS Region |
| `aws_profile` | AWS session profile |
| `aws_role_arn` | AWS sts:AssumeRole ARN |
| `aws_external_id` | AWS sts:AssumeRole ExternalId |
| `aws_access_key_id` | AWS IAM user access key ID |
| `aws_secret_access_key` | AWS IAM user access key secret |

<div class="alert alert-info">
In <i>most</i> cases, you only need to set the <code>aws_region</code> in the <code>aws_session</code> to match the region where the target Parameter Store (aws.ssm) or Secrets Manager (aws.secrets) secret is located.
</div>

When working with single strings, setting `force_string: true` in the backend configuration ensures the secret is treated as a string value.

{{< tabs >}}
{{% tab "AWS Secrets" %}}

##### IAM permission policy (if using an instance profile)

To allow resources such as EC2 or ECS instances to access your specified secrets, create an IAM permission policy similar to the following example. For more details on granting resource access to secrets, see the [AWS Secrets Manager official documentation][101]. 

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:${Region}:${Account}:secret:${SecretNameId}"
      ]
    }
  ]
}

```

After completing this step, follow the [instance profile instructions](#instance-profile-instructions) to complete the setup.

##### Backend settings

| Setting           | Description                                  |
| ------------------|----------------------------------------------|
| `backend_type`    | Backend type                                 |
| `secret_id`       | Secret friendly name or Amazon Resource Name |
| `aws_session`     | AWS session configuration                    |

#### Backend configuration

<div class="alert alert-info">
The <code>secret_backend_type</code> must be set to <code>aws.secrets</code>.
</div>


The backend configuration for AWS Secrets Manager secrets is structured as YAML following this schema:



```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}

```


If you grant the correct permissions on both the secret and the KMS customer-managed key, AWS tests cross-account access to Secrets Manager secrets. For more details, see the [AWS Secrets Manager documentation][101]


The backend secret is referenced in your Datadog Agent configuration file with `ENC`, taking the form of `ENC[secretId;secretKey]`. 

The `secretId` value can be either of the following:
- The secret friendly name, such as `/DatadogAgent/Production`
- The full ARN format, such as `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`
  - **Note**: The full ARN format is required when accessing secrets from a different account where the AWS credential or `sts:AssumeRole` credential is defined.
  
The **secretKey** is the JSON key referring to the actual secret that you are trying to pull the value of.

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: ENC[{secretId};{secretKey}]

```

The AWS Secrets Manager can store multiple key-value pairs within a single secret. A backend configuration using Secrets Manager has access to all the keys defined in the secret. For example, assuming an AWS Secrets Manager secret ID of `My-Secret-Backend-Secret`:

```json
{
    "SecretKey1": "SecretValue1",
    "SecretKey2": "SecretValue2",
    "SecretKey3": "SecretValue3"
}
```

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

```yaml
# /etc/datadog-agent/datadog.yaml
property1: ENC[My-Secret-Backend-Secret;SecretKey1]
property2: ENC[My-Secret-Backend-Secret;SecretKey2]
property3: ENC[My-Secret-Backend-Secret;SecretKey3]
```

You can define multiple secret backends, of the same or different types, in your yaml configuration. This allows you to use several supported backends (`file.yaml`, `file.json`, `aws.ssm`, and `aws.secrets`) within your Datadog Agent setup.

#### Configuration examples

In the following examples, assume the AWS Secrets Manager secret friendly name is `/DatadogAgent/Production` and its value contains the Datadog Agent `api_key`:

```json
{
    "api_key": "••••••••••••0f83"
}
```

Each of the following examples access the secret from the Datadog Agent configuration YAML file(s) as such:

```yaml
# /etc/datadog-agent/datadog.yaml

#########################
## Basic Configuration ##
#########################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: ENC[/DatadogAgent/Production;api_key] 
```

##### AWS IAM user access key with Secrets Manager secret in same AWS account:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```
<!-- SECRET MANAGER LINKS -->
[101]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab  %}}


{{% tab "AWS SSM" %}}

##### IAM permission policy (if using an instance profile)

To allow resources such as EC2 or ECS instances to access your specified secrets, create an IAM permission policy similar to the following example. For more details on granting resource access to secrets, see the [AWS Secrets Manager official documentation][201]. 

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
				"ssm:GetParameters",
				"ssm:GetParameter",
				"ssm:GetParametersByPath",
				"ssm:DescribeParameters"
			],
      "Resource": [
        "arn:aws:ssm:${Region}:${Account}:parameter/${ParameterPathWithoutLeadingSlash}"
      ]
    }
  ]
}

```

You can use a wildcard when specifying the parameter path `Resource`. For example, use `datadog/*` for all resources within the `datadog` folder.

After completing this step, follow the [instance profile instructions](#instance-profile-instructions) to complete the setup.

##### Backend settings

| Setting           | Description                             |
| ------------------| ----------------------------------------|
|`backend_type`     | Backend type                            |
|`parameter_path`   | SSM parameters prefix, recursive        |
|`parameters`       | List of individual SSM parameters       |

#### Backend configuration

<div class="alert alert-info">
The <code>secret_backend_type</code> must be set to <code>aws.ssm</code>.
</div>

The backend configuration for [AWS SSM Parameter Store][200] secrets is structured as YAML following this schema:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

The backend secret is referenced in your Datadog Agent configuration file using the **ENC** notation.

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: ENC[{parameter_full_path}]

```

The AWS System Manager Parameter Store supports a hierachical model. For example, assuming the following AWS System Manager Parameter Store paths:

```sh
/DatadogAgent/Production/ParameterKey1 = ParameterStringValue1
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

The parameters can be fetched like so:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

And then accessed in the Datadog Agent:

```yaml
# /etc/datadog-agent/datadog.yaml
property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
property3: "ENC[/DatadogAgent/Production/ParameterKey3]"
```

The `StringList` parameter stores values as a comma-separated list. `SecureString` values are automatically decrypted, provided that the `aws_session` credentials have the necessary permissions for the KMS key used in the encryption.

#### Configuration examples

In the following examples, assume the AWS Systems Manager Parameter Store secret path prefix is `/DatadogAgent/Production` with a parameter key of `api_key`:

```sh
/DatadogAgent/Production/api_key: (SecureString) "••••••••••••0f83"
```

Each of the following examples access the secret from the Datadog Agent configuration YAML file(s) as such:

```yaml
# /etc/datadog-agent/datadog.yaml

#########################
## Basic Configuration ##
#########################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: "ENC[/DatadogAgent/Production/api_key]" 
```

##### AWS IAM user access key with SSM parameter_path recursive fetch:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.ssm
secret_backend_config:
aws_session:
  aws_region: us-east-1
```

[200]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[201]: https://docs.aws.amazon.com/systems-manager/

{{% /tab %}}
{{< /tabs >}}

[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1002]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html
[1003]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html 
[1004]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html
[1005]: https://docs.aws.amazon.com/managedservices/latest/userguide/defaults-instance-profile.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html

{{% /collapse-content %}} 


{{% collapse-content title="Azure Keyvault Backend" level="h4" expanded=false id="id-for-anchoring" %}}

##### Supported backends

The secret executable utility supports the following Azure services:

| Backend Type                            | Azure Service          |
| ----------------------------------------|------------------------|
| [azure.keyvault](#azure-authentication) | [Azure Keyvault][2000] |

##### Azure authentication

Datadog recommends using Managed Identities to authenticate with Azure. This allows you associate cloud resources with AMI accounts and removes the need to put sensitive information in your `datadog.yaml` configuration file.

##### Managed identity

To access your Key Vault, create a Managed Identity and assign it to your Virtual Machine. Then, configure the appropriate role assignment on the Key Vault to allow that identity to access its secrets.



#### Backend configuration

| Setting       | Description                |
|---------------|----------------------------|
| `keyvaulturl` | URL of the Azure keyvault  |

<div class="alert alert-info">
In your <code>datadog.yaml</code> config, the <strong>secret_backend_type</strong> must be set to <code>azure.keyvault</code>, the <strong>backend_type</strong> must be set to <code>azure.keyvault</code> and the <strong>keyvaulturl</strong> must be set to your target Azure Key Vault URL.
</div>

The backend configuration for Azure Key Vault secrets is structured as YAML following this schema:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

The backend secret is referenced in your Datadog Agent configuration file with `ENC`:

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: "ENC[{secretHandle}]"
```

Azure Keyvault uses JSON to store multiple key-value pairs within a single secret. In the following example, assume there is an Azure secret named `MySecret`:

```json
{
    "ddapikey": "SecretValue1",
    "ddappkey": "SecretValue2",
    "ddorgname": "SecretValue3"
}
```

To reference a specific key within that secret, use a semicolon (`;`) to separate the secret name from the key. The notation in the `datadog.yaml` config file is `ENC[SecretName;SecretKey]`. 

If this semicolon is not present, the entire string is treated as the plaintext value of the secret.
When the semicolon is used, `SecretKey` refers to the specific JSON key whose value you want to retrieve from within `MySecret`:

```yaml
# /etc/datadog-agent/datadog.yml
api_key: "ENC[MySecret;ddapikey]"
app_key: "ENC[MySecret;ddappkey]"
property3: "ENC[MySecret;ddorgname]"
```

#### Configuration example

In the following example, assume the Azure secret's name is `MySecretName` and its value contains the Datadog Agent `api_key`:

```json
{
    "ddapikey": "••••••••••••0f83"
}
```

Assume also that the Key Vault's URL is `https://mykeyvault.vault.azure.net`.

The following example shows how to access the secret from the Datadog Agent configuration YAML file(s):

```yaml
# /etc/datadog-agent/datadog.yaml

#################################
## Datadog Agent Configuration ##
#################################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: "ENC[MySecretName;ddapikey]" 
...
...
...
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: https://mykeyvault.vault.azure.net
```

[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal

{{% /collapse-content %}} 


{{% collapse-content title="Hashicorp Vault Backend" level="h4" expanded=false id="id-for-anchoring" %}}
##### Supported backends

The secret executable utility supports the following Hashicorp services:

| Backend Type                               | Hashicorp Service                                  |
| ------------------------------------------ | -------------------------------------------------- |
| [hashicorp.vault](#hashicorp-auth-session) | [Hashicorp Vault (Secrets Engine Version 1)][3000] |

##### Hashicorp auth session

Hashicorp Vault supports a variety of authentication methods. The ones supported by this module are:

- **User Pass Auth**: A Vault username and password defined on the backend configuration's `vault_session` section

- **AWS instance profile**: If your machine has an attached AWS IAM role with the correct permissions, you don't need to define any secret credentials or passwords in your config. See the [AWS instance profile section](#aws-instance-profile-instructions) and the [official Hashicorp AWS auth method instructions][3002] for more information.

Using environment variables is more complex. The variables must be configured within the service (daemon) environment or in the `dd-agent` user's home directory on each Datadog Agent host. In contrast, using app roles and users (local or LDAP) is simpler. This method does not require additional configuration on each Datadog Agent host.

#### General instructions to set up Hashicorp Vault
1. Run your Hashicorp Vault. For more information, see the [official Hashicorp Vault documentation][3001]. 
2. When running the vault, it outputs the variables `VAULT_ADDR` and `VAULT_TOKEN`. Export these as environment variables.
3. To store your secrets in a certain path, run `vault secrets enable -path=<your path> -version=1 kv`. 
  - **Note**: Only version 1 of the Hashicorp Secrets Engine is supported at this time.
4. To add your key, run `vault kv put <your path> apikey=your_real_datadog_api_key`. To retrieve your key, run `vault kv get <your path>`.
5. To write a policy that gives the permission to pull secrets from your vault, create a `*.hcl` file, and include the following permission:
```
path "<your path>" {
  capabilities = ["read"]
}
```
6. Then, run `vault policy write <policy-name> <path to *.hcl file>`

7. Choose the method of authenticating to your vault. If using the AWS instance profile method, run `vault auth enable aws`. 

### AWS instance profile instructions

Datadog strongly recommends that you authenticate using the instance profile method if you are running your Hashicorp Vault from an AWS-connected machine. 

First, follow the setup in the [instruction profile instructions](#instance-profile-instructions) to attach a policy to your IAM role. Next, add the `sts:GetCallerPolicy` permission to this policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:GetCallerIdentity",
      "Resource": "*"
    }
  ]
}
```

Next, run the following command to write an authentication-specific vault policy:

```
vault write auth/aws/role/<Name of AWS IAM Role> \
  auth_type=iam \
  bound_iam_principal_arn=arn:aws:iam::<AWS Account ID>:role/<Name of AWS IAM Role> \
  policies=<name of *.hcl file policy> \
  max_ttl=768h
```

##### Backend Settings

| Setting | Description |
| --- | --- |
| `backend_type` | Backend type |
| `vault_address` | DNS/IP of the Hashicorp Vault system |
| `vault_tls_config` | TLS Configuration to access the Vault system |
| `vault_session` | Authentication configuration to access the Vault system |

###### vault_session Settings
The following `vault_session` settings are available:

| Setting | Description |
| --- | --- |
| `vault_role_id` | App Role ID from Vault |
| `vault_secret_id` | Secret ID for the app role |
| `vault_username` | Local Vault user |
| `vault_password` | Password for local vault user |
| `vault_ldap_username` | LDAP user with Vault access |
| `vault_ldap_password` | LDAP password for the LDAP user |
| `vault_auth_type` | The backend service if using an instance profile |
| `vault_aws_role` | The name of the IAM user if `vault_auth_type` is `aws` |
| `aws_region` | The AWS region of the machine if `vault_auth_type` is `aws` |

###### TLS Settings

| Setting | Description |
| --- | --- |
| `ca_cert` | Path to PEM-encoded CA cert file to verify the Vault server SSL certificate |
| `ca_path` | Path to directory of PEM-encoded CA cert files to verify the Vault server SSL certificate |
| `client_cert` | Path to the certificate for Vault communication |
| `client_key` | Path to the private key for Vault communication |
| `tls_server` | If set, is used to set the SNI host when connecting via TLS |
| `Insecure` | Enables or disables SSL verification (bool) |


#### Backend Configuration

<div class="alert alert-info">
The <code>backend_type</code> must be set to <code>hashicorp.vault</code>.
</div>

The path to the secret and the backend secret itself is referenced in your Datadog Agent configuration file with `ENC`. Use a semicolon to separate these two values, as seen in the example below.

The backend configuration for Hashicorp Vault is structured as YAML following this schema:

```yaml
# /etc/datadog-agent/datadog.yaml
---
api_key: "ENC[{secret_path};{secret}]"

secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_tls_config:
      # ... TLS settings if applicable
  vault_session:
    vault_auth_type: aws
    # ... additional session settings
```

#### Configuration examples

In the following examples, assume the Hashicorp Vault secret path prefix is `/Datadog/Production` with a parameter key of `api_key`:

```sh
/DatadogAgent/Production/api_key: (SecureString) "••••••••••••0f83"
```

Each of the following examples access the secret from the Datadog Agent configuration YAML file(s) as such:

```yaml
# /etc/datadog-agent/datadog.yaml

#########################
## Basic Configuration ##
#########################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: "ENC[/Datadog/Production;apikey]" 
```

#### Hashicorp Vault authentication with AWS instance profile

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: hashicorp.vault
secret_backend_config:
  vault_address: http://myvaultaddress.net
  vault_session:
    vault_auth_type: aws
    vault_aws_role: Name-of-IAM-role-attached-to-machine
    aws_region: us-east-1
```
<!-- HASHICORP LINKS -->
[3000]: https://learn.hashicorp.com/tutorials/vault/static-secrets
[3001]: https://www.hashicorp.com/en/products/vault
[3002]: https://developer.hashicorp.com/vault/docs/auth/aws#aws-auth-method
{{% /collapse-content %}} 

{{% collapse-content title="JSON or YAML File Secret Backends" level="h4" expanded=false id="id-for-anchoring" %}}

|Backend Type                                 | AWS Service                             |
|---------------------------------------------|-----------------------------------------|
|[file.json](#json-backend-settings)          |[JSON][4001]                             |
|[file.yaml](#yaml-backend-settings)          |[YAML][4002]                             |

##### File Permission 
The file backend only requires read permissions for the configured JSON or YAML files. These permissions must be granted to the local Datadog Agent user (`dd-agent` on Linux, `ddagentuser` on Windows).


{{< tabs >}}
{{% tab "JSON File Backend" %}}

##### JSON Backend settings
| Setting | Description |
| --- | --- |
| `backend_type` | Backend type |
| `file_path`| Absolute directory path to the JSON file |

##### Backend configuration
<div class="alert alert-info">
The <code>backend_type</code> must be set to <code>file.json</code>.
</div>

The backend configuration for JSON file secrets is structured as YAML following this schema:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/json/file
```

The backend secret is referenced in your Datadog Agent configuration file with `ENC`:

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: "ENC[{json_property_name}"

```

##### Configuration Examples

In the following examples, assume the JSON file is `/opt/production-secrets/secrets.json` and contains the Datadog Agent `api_key`:

```json
{
  "api_key": "••••••••••••0f83"
}
```

The following examples show how to access the JSON secret from the Datadog Agent configuration YAML file(s):

```yaml
# /etc/datadog-agent/datadog.yaml

#########################
## Basic Configuration ##
#########################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: "ENC[api_key]" 
```

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: file.json
secret_backend_config:
  file_path: /opt/production-secrets/secrets.json
```
{{% /tab %}}


{{% tab "YAML File Backend" %}}

##### YAML Backend Settings

| Setting | Description |
| --- | --- |
| `backend_type` | Backend type |
| `file_path`| Absolute directory path to the YAML file |

##### Backend Configuration
<div class="alert alert-info">
The <code>backend_type</code> must be set to <code>file.yaml</code>.
</div>

The backend configuration for JSON file secrets is structured as YAML following this schema:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/yaml/file
```

The backend secret is referenced in your Datadog Agent configuration file with `ENC`:

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: "ENC[{yaml_property_name}]"

```

##### Configuration Examples

In the following examples, assume the YAML file is named `/opt/production-secrets/secrets.yaml` and contains the Datadog Agent `api_key`:

```yaml
---
api_key: "••••••••••••0f83"
```

The following examples show how to access YAML secret from the Datadog Agent configuration YAML file(s):


```yaml
# /etc/datadog-agent/datadog.yaml

#########################
## Basic Configuration ##
#########################

## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key to associate your Agent's data with your organization.
## Create a new API key here: https://app.datadoghq.com/account/settings
#
api_key: "ENC[api_key]" 
```

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /opt/production-secrets/secrets.yaml
```

{{% /tab %}}
{{< /tabs >}}

[4001]: https://en.wikipedia.org/wiki/JSON
[4002]: https://en.wikipedia.org/wiki/YAML

{{% /collapse-content %}} 


### Option 2: Using the built-in Script for Kubernetes and Docker

For containerized environments, the Datadog Agent's container images include a built-in script `/readsecret_multiple_providers.sh` starting with version v7.32.0. This script supports reading secrets from:

* Files: using `ENC[file@/path/to/file]`
* Kubernetes Secrets: using `ENC[k8s_secret@namespace/secret-name/key]`

{{< tabs >}}
{{% tab "Helm" %}}

To use this executable with the Helm chart, set it as the following:
```yaml
datadog:
  [...]
  secretBackend:
    command: "/readsecret_multiple_providers.sh"
```

{{% /tab %}}
{{% tab "DaemonSet" %}}

To use this executable, set the environment variable `DD_SECRET_BACKEND_COMMAND` as follows:
```
DD_SECRET_BACKEND_COMMAND=/readsecret_multiple_providers.sh
```

{{% /tab %}}
{{< /tabs >}}

#### Example: Reading from mounted files

Kubernetes supports [exposing Secrets as files][2] inside a pod that the Agent can read to resolve secrets.

In Kubernetes, you can mount a Secret as a volume like this:
```yaml
  containers:
    - name: agent
      #(...)
      volumeMounts:
        - name: secret-volume
          mountPath: /etc/secret-volume
  #(...)
  volumes:
    - name: secret-volume
      secret:
        secretName: test-secret
```

You can then reference the secret like this:
```
password: ENC[file@/etc/secret-volume/password]
```

**Notes**:
- The Secret must exist in the same namespace as the pod it is being mounted in.
- The script is able to access all subfolders, including the sensitive `/var/run/secrets/kubernetes.io/serviceaccount/token`. As such, Datadog recommends using a dedicated folder instead of `/var/run/secrets`.

[Docker swarm secrets][3] are mounted in the `/run/secrets` folder. For example, the Docker secret `db_prod_passsword` is located in `/run/secrets/db_prod_password` in the Agent container. This would be referenced in the configuration with `ENC[file@/run/secrets/db_prod_password]`.

#### Example: Reading a Kubernetes secret across namespaces

If you want the Agent to read a Secret from a different namespace, use the `k8s_secret@` prefix. For example:
```
password: ENC[k8s_secret@database/database-secret/password]
```

In this case, you must manually configure RBAC to allow the Agent's Service Account to read the Secret:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: datadog-secret-reader
  namespace: database
rules:
  - apiGroups: [""]
    resources: ["secrets"]
    resourceNames: ["database-secret"]
    verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: datadog-read-secrets
  namespace: database
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    apiGroup: ""
    namespace: default
roleRef:
  kind: Role
  name: datadog-secret-reader
  apiGroup: ""
```

This `Role` gives access to the `Secret: database-secret` in the `Namespace: database`. The `RoleBinding` links up this permission to the `ServiceAccount: datadog-agent` in the `Namespace: default`. This needs to be manually added to your cluster with respect to your resources deployed.

### Option 3: Creating your own custom executable

To retrieve secrets, the Agent uses an external executable that you provide. The executable is used when new
secrets are discovered and are cached for the lifecycle of the Agent. If you need to update or rotate a secret, you must restart the Agent to reload it.

The Agent sends this executable a JSON payload over standard input containing a list of secret handles. The executable fetches each secret and returns them in a JSON format through standard output.

The following example shows what the Agent sends to your executable on STDIN:
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (string): The format version.
* `secrets` (list of strings): Each string is a handle for a secret to fetch.


The executable responds through the following STDOUT output:
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (string): The secret value to be used in the configurations. This can be `null` in the case of an error.
* `error` (string): An error message or `null`.

If a secret fails to resolve (either by returning a non-zero exit code or a non-null error), the related configuration is ignored by the Agent.

**Never output sensitive information on `stderr`**. If the binary exits with a different status code than `0`, the Agent logs the standard error output of the executable for troubleshooting.

You can also build your own secret retrieval executable using any language. The only requirement is that it follows the input/output format described previously.

Here is a Go example that returns dummy secrets:
```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "Could not read from stdin: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "could not serialize res: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

This transforms your configuration:

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

Into the following in memory:

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

You can configure the Agent to use the binary to resolve secrets by adding the following:
```
secret_backend_command: /path/to/datadog-secret-backend
```

### Agent security requirements

The Agent runs the provided executable as a sub-process. The execution patterns differ on Linux and Windows.

{{< tabs >}}
{{% tab "Linux" %}}

On Linux, the executable must:

* Belong to the same user running the Agent (`dd-agent` by default, or `root` inside a container).
* Have no rights for `group` or `other`.
* Have at least exec rights for the owner.

{{% /tab %}}
{{% tab "Windows" %}}

On Windows, the executable must:

* Have read/exec for `ddagentuser` (the user used to run the Agent).
* Have no rights for any user or group except for the `Administrators` group, the built-in `Local System` account, or the Agent user context (`ddagentuser` by default).
* Be a valid Win32 application so the Agent can execute it (for example, a PowerShell or Python script doesn't work).

{{% /tab %}}
{{< /tabs >}}

**Note**: The executable shares the same environment variables as the Agent.

## Refreshing API/APP keys at runtime

Starting in Agent version v7.67, you can configure the Agent to refresh its API and APP keys at regular intervals without requiring a restart. This relies on the API key and APP key being pulled as secrets.

To enable this, set `secret_refresh_interval` (in seconds) in your `datadog.yaml` file:
```yaml
api_key: ENC[<secret_handle>]

secret_refresh_interval: 3600  # refresh every hour
```

By default the Agent randomly spreads its first refresh within the specified `secret_refresh_interval` window. This
means that it resolves the API key at startup, then refreshes it within the first interval and every interval after that.
This avoids having a fleet of Agents refreshing their API/APP key at the same time.

To prevent downtime, only invalidate the previous API key and APP key when your entire fleet of Agents has
pulled the updated keys from your secret management solution. You can track usage of your API keys in the [Fleet
Management](https://app.datadoghq.com/fleet) page.

You can disable this behavior by setting:
```yaml
secret_refresh_scatter: false
```

To refresh manually, use:
```
datadog-agent secret refresh
```

### Enabling DDOT collector refresh
If you are using [DDOT collector][7] and want to enable API/APP refresh you must add the following additional configuration to your `datadog.yaml` file:
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

This ensures the DDOT collector remains in-sync with the Agent after secrets are refreshed. Similar to how the Agent periodically verifies its configuration state, the DDOT collector uses this setting to regularly check for updated values from the Agent.

## Troubleshooting

### Listing detected secrets

The `secret` command in the Agent CLI shows any errors related to your setup. For example, if the rights on the executable are incorrect. It also lists all handles found, and where they are located.

On Linux, the command outputs file mode, owner and group for the executable. On Windows, ACL rights are listed.

{{< tabs >}}
{{% tab "Linux" %}}

Example on Linux:

```sh
datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

{{% /tab %}}
{{% tab "Windows" %}}

Example on Windows (from an Administrator PowerShell):
```powershell
PS C:\> & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Seeing configurations after secrets were injected

To quickly see how the check's configurations are resolved, you can use the `configcheck` command:

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <obfuscated_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <obfuscated_password2>
~
===
```

**Note**: The Agent needs to be [restarted][6] to pick up changes on configuration files.

### Debugging your secret_backend_command

To test or debug outside of the Agent, you can mimic how the Agent runs it:

{{< tabs >}}
{{% tab "Linux" %}}
**Linux**

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

The `dd-agent` user is created when you install the Datadog Agent.

{{% /tab %}}
{{% tab "Windows" %}}

##### Rights-related errors

The following errors indicate that something is missing in your setup.

1. If any other group or user than needed has rights on the executable, a similar error to the following is logged:
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. If `ddagentuser` doesn't have read and execute right on the file, a similar error logged:
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. Your executable needs to be a valid Win32 application. If not, the following error is logged:
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

Datadog has a [Powershell script][8] to help you set the correct permission on your executable. Example on how to use it:

```powershell
.\Set-SecretPermissions.ps1 -SecretBinaryPath C:\secrets\decrypt_secrets.exe
ddagentuser SID: S-1-5-21-3139760116-144564943-2741514060-1076
=== Checking executable permissions ===
Executable path: C:\secrets\decrypt_secrets.exe
Executable permissions: OK, the executable has the correct permissions

Permissions Detail:

stdout:
Path   : Microsoft.PowerShell.Core\FileSystem::C:\secrets\decrypt_secrets.exe
Owner  : BUILTIN\Administrators
Group  : BUILTIN\Administrators
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         DESKTOP-V03BB2P\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:BAD:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200a9;;;S-1-5-21-3139760116-144564943-2741514
         060-1076)
stderr:


=== Secrets stats ===
Number of secrets resolved: 0
Secrets handle resolved:
```

##### Testing your executable

Your executable is executed by the Agent when fetching your secrets. The Datadog Agent runs using the `ddagentuser`. This user has no specific rights, but it is part of the `Performance Monitor Users` group. The password for this user is randomly generated at install time and is never saved anywhere.

This means that your executable might work with your default user or development user—but not when it's run by the Agent, since `ddagentuser` has more restricted rights.

To test your executable in the same conditions as the Agent, update the password of the `ddagentuser` on your dev box. This way, you can authenticate as `ddagentuser` and run your executable in the same context the Agent would.

To do so, follow those steps:

1. Remove `ddagentuser` from the `Local Policies/User Rights Assignement/Deny Log on locally` list in the `Local Security Policy`.
2. Set a new password for `ddagentuser` (since the one generated at install time is never saved anywhere). In PowerShell, run:
    ```powershell
    $user = [ADSI]"WinNT://./ddagentuser";
    $user.SetPassword("a_new_password")
    ```
3. Update the password to be used by `DatadogAgent` service in the Service Control Manager. In PowerShell, run:
    ```powershell
    sc.exe config DatadogAgent password= "a_new_password"
    ```

You can now login as `ddagentuser` to test your executable. Datadog has a [Powershell script][7] to help you test your
executable as another user. It switches user contexts and mimics how the Agent runs your executable.

Example on how to use it:

```powershell
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/secrets_tester.ps1
[8]: https://github.com/DataDog/datadog-agent/blob/master/docs/public/secrets/Set-SecretPermissions.ps1

{{% /tab %}}
{{< /tabs >}}

### Agent refusing to start

The first thing the Agent does on startup is to load `datadog.yaml` and decrypt any secrets in it. This is done before setting up the logging. This means that on platforms like Windows, errors occurring when loading `datadog.yaml` aren't written in the logs, but on `stderr`. This can occur when the executable given to the Agent for secrets returns an error.

If you have secrets in `datadog.yaml` and the Agent refuses to start:

* Try to start the Agent manually to be able to see `stderr`.
* Remove the secrets from `datadog.yaml` and test with secrets in a check configuration file first.

### Testing Kubernetes Permissions
When reading Secrets directly from Kubernetes you can double check your permissions with the `kubectl auth` command. The general form of this is:

```
kubectl auth can-i get secret/<SECRET_NAME> -n <SECRET_NAMESPACE> --as system:serviceaccount:<AGENT_NAMESPACE>:<AGENT_SERVICE_ACCOUNT>
```

Consider the previous [Kubernetes Secrets example](#example-reading-a-kubernetes-secret-across-namespaces), where the Secret `Secret:database-secret` exists in the `Namespace: database`, and the Service Account `ServiceAccount:datadog-agent` exists in the `Namespace: default`.

In this case, use the following command:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

This command returns whether the permissions are valid for the Agent to view this Secret.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[4]: https://github.com/DataDog/datadog-secret-backend
[5]: https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md
[6]: /agent/configuration/agent-commands/#restart-the-agent
[7]: /opentelemetry/setup/ddot_collector/
