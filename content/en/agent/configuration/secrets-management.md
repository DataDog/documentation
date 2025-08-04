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

To reference a secret in your configuration, use the `ENC[<secret_id>]` notation. This tells the Agent to resolve the value using either the embedded [datadog-secret-backend][4] or your configured secret retrieval executable. The backend resolves the placeholder using your secret store and injects the plain-text value into the config at runtime. The secret is fetched and loaded into memory but is never written to disk or sent to the Datadog backend.

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

### Option 1: Using the datadog_secret_backend executable embedded in the Agent

Starting in Agent version 7.69, the [datadog-secret-backend][7] executable will be shipped within the Datadog Agent. The major change in this option is that the backend executable is now configured directly by setting the [secret_backend_type][8] and [secret_backend_config][9] options in the datadog.yaml file. 

`secret_backend_type` is where the type of the backend is specified, and `secret_backend_config` is where additional configuration relevant for pulling secrets is included. To use this embedded executable, in your datadog.yaml file, add:

```yaml
secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```

<!-- -------------------------------------------------------------------- START OF SECTION ------------------------------------------------------------------------------>

More specific setup instructions will depend on the backend type used. Refer to the appropriate link for further information: 

<!-- https://github.com/DataDog/datadog-secret-backend/tree/v1/docs -->

{{% collapse-content title="AWS Secret and SSM" level="h4" expanded=false id="id-for-anchoring" %}}
The `datadog-secret-backend` utility currently supports the following AWS services:

|Backend Type                                 | AWS Service                             |
|---------------------------------------------|-----------------------------------------|
|[aws.secrets](#aws-secrets-manager-backend)  |[AWS Secrets Manager][1]                 |
|[aws.ssm]()                                  |[AWS Systems Manager Parameter Store][2] |


<!-- ################## A W S - secrets ##################### -->
{{< tabs >}}
{{% tab "AWS Secrets" %}}

#### AWS Secrets Manager Backend

##### IAM Permission Policy (if using an Instance Profile)

Create a similar IAM Permission Policy as the example below to allow resources (EC2, ECS, etc. instances) to access your specified secrets. Please refer to the [AWS Secrets Manager official documentation][2000] for more details on allowing resources to access secrets. 

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

This is just one step in setting up the Instance Profile. Refer to the [Instance Profile Instructions][3000] in the AWS README to complete the setup.

##### Backend settings

| Setting           | Description                                  |
| ------------------|----------------------------------------------|
| `backend_type`    | Backend type                                 |
| `secret_id`       | Secret friendly name or Amazon Resource Name |
| `aws_session`     | AWS session configuration                    |

#### Backend configuration

<div class="alert alert-info">
Ensure that you have followed the instructions specified in the general <a href="https://github.com/DataDog/datadog-secret-backend/blob/v1/docs/aws/README.md"> AWS documentation</a> to avoid hardcoding any confidential information in your config file. The <strong>secret_backend_type</strong> must be set to <code>aws.secrets</code>.
</div>


The backend configuration for AWS Secrets Manager secrets has the following pattern:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}

```


Cross-account Secrets Manager secrets are supported and tested, but require appropriate permissions on the secret as well as a KMS customer managed key. See more details on this configuration in the [AWS Secrets Manager documentation][4000].

The backend secret is referenced in your Datadog Agent configuration file using the **ENC** notation, taking the form **ENC[secretId;secretKey]**. 

The **secretId** value can be either of the following:
- The secret friendly name. For example `/DatadogAgent/Production`
- The full ARN format. For example `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`.
  - **Note**: The full ARN format is required when accessing secrets from an a different account where the AWS credential (or `sts:AssumeRole` credential) is defined.
  
The **secretKey** is the json key referring to the actual secret that you are trying to pull the value of.

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: ENC[{secretId};{secretKey}]

```

The AWS Secrets Manager can hold multiple secret keys and values. A backend configuration using Secrets Manager will have access to all the secret keys defined on the secret. For example, assuming an AWS Secrets Manager secret id of `My-Secret-Backend-Secret`:

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

Multiple secret backends, of the same or different types, can be defined in your `datadog-secret-backend` yaml configuration. As a result, you can leverage multiple supported backends (file.yaml, file.json, aws.ssm, and aws.secrets) in your Datadog Agent configuration.

#### Configuration examples

In the following examples, assume the AWS Secrets Manager's **secret friendly** name is `/DatadogAgent/Production` with a **secret value** containing the Datadog Agent `api_key`:

```json
{
    "api_key": "••••••••••••0f83"
}
```

Each of the following examples will access the secret from the Datadog Agent configuration yaml file(s) as such:

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

##### AWS IAM User Access Key with Secrets Manager secret in same AWS account:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[2000]: https://docs.aws.amazon.com/secretsmanager/
[3000]: https://github.com/DataDog/datadog-secret-backend/blob/v1/docs/aws/README.md#instance-profile-instructions
[4000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_examples_cross.html

{{% /tab  %}}

<!-- ################## A W S - ssm ##################### -->

{{% tab "AWS SSM" %}}

#### AWS Systems Manager Parameter Store Backend

##### IAM Permission Policy (if using an Instance Profile)

Create a similar IAM Permission Policy as the following example to allow resources (EC2, ECS, etc. instances) to access your specified secrets. Please refer to the [AWS SSM official documentation][3100] for more details on allowing resources to access secrets. 

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

You can use a wildcard when specifying the parameter path `Resource` (for example, use `datadog/*` for all resources within in the `datadog` folder).

This is just one step in setting up the Instance Profile. Refer to the [Instance Profile Instructions][4100]in the AWS documentation to complete the setup.

##### Backend settings

| Setting           | Description                             |
| ------------------| ----------------------------------------|
|`backend_type`     | Backend type                            |
|`parameter_path`   | SSM parameters prefix, recursive        |
|`parameters`       | List of individual SSM parameters       |

#### Backend configuration

<div class="alert alert-info">
Ensure that you have followed the instructions specified in the general <a href="https://github.com/DataDog/datadog-secret-backend/blob/v1/docs/aws/README.md"> AWS documentation</a> to avoid hardcoding any confidential information in your config file. The <strong>secret_backend_type</strong> must be set to <code>aws.ssm</code>.
</div>

The backend configuration for [AWS SSM Parameter Store][2100] secrets has the following pattern:

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

and finally accessed in the Datadog Agent:

```yaml
# /etc/datadog-agent/datadog.yaml
property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
property3: "ENC[/DatadogAgent/Production/ParameterKey3]"
```

Currently, `StringList` parameter store values will be retained as a comma-separated list. `SecureString` is properly decrypted automatically, assuming that the `aws_session` credentials have appropriate rights to the KMS key used to encrypt the `SecureString` value.

## Configuration Examples

In the following examples, assume the AWS Systems Manager Parameter Store secret path prefix is `/DatadogAgent/Production` with a parameter key of `api_key`:

```sh
/DatadogAgent/Production/api_key: (SecureString) "••••••••••••0f83"
```

Each of the following examples will access the secret from the Datadog Agent configuration yaml file(s) as such:

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

##### AWS IAM User Access Key with SSM parameter_path recursive fetch:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: aws.ssm
secret_backend_config:
aws_session:
  aws_region: us-east-1
```


[2100]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[3100]: https://docs.aws.amazon.com/systems-manager/
[4100]: https://github.com/DataDog/datadog-secret-backend/blob/v1/docs/aws/README.md#instance-profile-instructions

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}} 






<!-- ######### A Z U R E ############ -->

{{% collapse-content title="Azure Keyvault Backend" level="h4" expanded=true id="id-for-anchoring" %}}

##### Supported backends

The `datadog-secret-backend` utility currently supports the following Azure services:

| Backend Type       | Azure Service          |
| -------------------|------------------------|
| [azure.keyvault]() | [Azure Keyvault][1200] |


##### Managed identity

To access your Key Vault, create a Managed Identity in your environment. Assign that Identity as a Role on your Virtual Machine, which will give it access to your Key Vault's secrets. 


#### Backend configuration settings

| Setting       | Description                |
|---------------|----------------------------|
| `keyvaulturl` | URL of the Azure keyvault  |

<div class="alert alert-info">
In your <code>datadog.yaml</code> config, the setting <code>secret_backend_type</code> must be set to <code>azure.keyvault</code>. The <strong>backend_type</strong> must be set to <code>azure.keyvault</code> and <strong>keyvaulturl</strong> must be set to your target Azure Key Vault URL.
</div>

The backend configuration for Azure Key Vault secrets has the following pattern:

```yaml
# /etc/datadog-agent/datadog.yaml
---
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

The backend secret is referenced in your Datadog Agent configuration file using the **ENC** notation.

```yaml
# /etc/datadog-agent/datadog.yaml

api_key: "ENC[{secretHandle}]"
```

Azure Keyvault can hold multiple secret keys and values using json. For example, assuming an Azure secret with a **Secret Name** of `MySecret`:

```json
{
    "ddapikey": "SecretValue1",
    "ddappkey": "SecretValue2",
    "ddorgname": "SecretValue3"
}
```

This can be accessed using a semicolon (`;`) to separate the Secret Name from the Key. The notation in the `datadog.yaml` config file looks like **ENC[SecretName;SecretKey]**. If this semicolon is not present, then the entire string will be treated as the plain text value of the secret. Otherwise, `SecretKey` is the json key referring to the actual secret that you are trying to pull the value of.

```yaml
# /etc/datadog-agent/datadog.yml
api_key: "ENC[MySecret;ddapikey]"
app_key: "ENC[MySecret;ddappkey]"
property3: "ENC[MySecret;ddorgname]"
```

[1200]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal

{{% /collapse-content %}} 






<!-- ######### H A S H I C O R P ############ -->
{{% collapse-content title="Azure Secret Backends" level="h4" expanded=true id="id-for-anchoring" %}}
{{% tab "Tab Name" %}}


[1]: /agent/guide/agent-commands/

{{% /tab %}}
{{% /collapse-content %}} 









<!-- ######### F I L E ############ -->

{{% collapse-content title="Azure Secret Backends" level="h4" expanded=true id="id-for-anchoring" %}}
{{% tab "Tab Name" %}}


[1]: /agent/guide/agent-commands/

{{% /tab %}}
{{% /collapse-content %}} 

<!-- ######### END ############ -->




<!-- https://github.com/DataDog/datadog-secret-backend/tree/v1/docs/aws -->
[AWS Secrets](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md), 
[AWS SSM](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/ssm.md), 


<!-- https://github.com/DataDog/datadog-secret-backend/tree/v1/docs/azure -->
[Azure Keyvault](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/azure/keyvault.md), 


<!-- https://github.com/DataDog/datadog-secret-backend/tree/v1/docs/hashicorp -->
[Hashicorp Vault](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/hashicorp/vault.md), 


<!-- https://github.com/DataDog/datadog-secret-backend/tree/v1/docs/file -->
[JSON](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/file/json.md), 
[YAML](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/file/yaml.md).





<!-- ------------------------------------------------------------------- END OF SECTION ---------------------------------------------------------------------------- -->





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

**Notes:**
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

Here's what the Agent sends to your executable on STDIN:
```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version` (string): the format version.
* `secrets` (list of strings): each string is a handle for a secret to fetch.


The executable should respond through STDOUT:
```
{
  "secret1": {"value": "decrypted_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

* `value` (string): the secret value to be used in the configurations. This can be `null` in the case of an error.
* `error` (string): an error message or `null`.

If a secret fails to resolve (either by returning a non-zero exit code or a non-null error), the related configuration is ignored by the Agent.

**Never output sensitive information on `stderr`**. If the binary exits with a different status code than `0`, the Agent logs the standard error output of the executable to ease troubleshooting.

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
* Have no rights for any user or group except for the `Administrators` group, the built-in `Local System` account, or the Agent user context (`ddagentuser` by default)
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
