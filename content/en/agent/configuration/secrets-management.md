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

The Datadog Agent helps you securely manage your secrets by integrating with the following secrets management solutions:
- AWS Secrets Manager
- AWS SSM
- Azure KeyVault
- HashiCorp Vault
- File JSON
- File YAML

Instead of hardcoding sensitive values like API keys or passwords in plaintext within configuration files, the Agent can retrieve them dynamically at runtime. The secret is fetched and loaded in memory but is never written to disk or sent to the Datadog backend.

**Note**: You cannot use the `ENC[]` syntax in `secret_*` settings like `secret_backend_command`.

## Options for retrieving secrets

### Option 1: Using native Agent support for fetching secrets

**Note**: This option is not available for FIPS-enabled agents at this time.

Starting in Agent version `7.70`, the Datadog Agent natively supports several secret management solutions. Two new settings have been introduced to `datadog.yaml`: `secret_backend_type` and `secret_backend_config`. 

`secret_backend_type` is used to specify which secret management solution to use, and `secret_backend_config` holds additional configuration relevant to that solution:

```yaml
# datadog.yaml

secret_backend_type: <backend_type>
secret_backend_config:
  <KEY_1>: <VALUE_1>
```


More specific setup instructions depend on the backend type used. Refer to the appropriate section bellow for further information: 


{{% collapse-content title="AWS Secrets" level="h4" expanded=false id="id-for-anchoring" %}}
The following AWS services are supported:

|"secret_backend_type" value                                | AWS Service                             |
|---------------------------------------------|-----------------------------------------|
|`aws.secrets` |[AWS Secrets Manager][1000]                 |

##### Set up an Instance profile

Datadog recommends using the [instance profile method][1006] of retrieving secrets, as AWS handles all environment variables and session profiles for you. More instructions on how to do this can be found at the official [AWS Secrets Manager documentation][1007].

#### Datadog.yaml configuration

Configure the DataDog Agent to user `AWS Secrets` to resolve secrets using the following configuration:

```yaml
# datadog.yaml
secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: {regionName}
```

After configuring the Agent to use AWS Secrets, you can refer to any secrets in your configurations with `ENC[secretId;secretKey]`. 

The ENC notation is composed of:
* `secretId`: either the secret "friendly name" (ex: `/DatadogAgent/Production`) or the ARN (ex: `arn:aws:secretsmanager:us-east-1:123456789012:secret:/DatadogAgent/Production-FOga1K`).
  - **Note**: The full ARN format is required when accessing secrets from a different account where the AWS credential or `sts:AssumeRole` credential is defined.
* `secretKey`: the JSON key from the AWS secret that you want to use.


The AWS Secrets Manager can store multiple key-value pairs within a single secret. A backend configuration using Secrets Manager has access to all the keys defined in a secret.

For example, assuming the secret ID `My-Secrets` contains the following 3 values:

```json
{
    "prodApiKey": "datadog api key to use",
    "anotherSecret1": "value2",
    "anotherSecret2": "value3",
}
```

Here would be a complete example of the `datadog.yaml` using the AWS Secrets to pull its API key from `My-Secrets`:

```yaml
api_key: ENC[My-Secrets;prodApiKey]

secret_backend_type: aws.secrets
secret_backend_config:
  aws_session:
    aws_region: us-east-1
```

<!-- SECRET MANAGER LINKS -->
[101]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1002]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html
[1003]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html 
[1004]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html
[1005]: https://docs.aws.amazon.com/managedservices/latest/userguide/defaults-instance-profile.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[1007]: https://aws.amazon.com/blogs/security/how-to-use-the-aws-secrets-manager-agent/

{{% /collapse-content %}} 

{{% collapse-content title="AWS SSM" level="h4" expanded=false id="id-for-anchoring" %}}
The following AWS services are supported:

|"secret_backend_type" value                                | AWS Service                             |
|---------------------------------------------|-----------------------------------------|
|`aws.ssm` |[AWS Systems Manager Parameter Store][1001] |

##### Set up an Instance profile

Datadog recommends using the [instance profile method][1006] of retrieving secrets, as AWS handles all environment variables and session profiles for you. More instructions on how to do this can be found at the official [AWS Secrets Manager documentation][1007].

#### Datadog.yaml configuration

The AWS System Manager Parameter Store supports a hierachical model. For example, assuming the following AWS System Manager Parameter Store paths:

```sh
/DatadogAgent/Production/ParameterKey1 = ParameterStringValue1
/DatadogAgent/Production/ParameterKey2 = ParameterStringValue2
/DatadogAgent/Production/ParameterKey3 = ParameterStringValue3
```

The parameters can be fetched like so:

```yaml
# datadog.yaml
secret_backend_type: aws.ssm
secret_backend_config:
  aws_session:
    aws_region: us-east-1

property1: "ENC[/DatadogAgent/Production/ParameterKey1]"
property2: "ENC[/DatadogAgent/Production/ParameterKey2]"
property3: "ENC[/DatadogAgent/Production/ParameterKey3]"
```

[200]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[201]: https://docs.aws.amazon.com/systems-manager/

[1000]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html
[1001]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
[1002]: https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html
[1003]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html 
[1004]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html
[1005]: https://docs.aws.amazon.com/managedservices/latest/userguide/defaults-instance-profile.html
[1006]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[1007]: https://docs.aws.amazon.com/systems-manager/latest/userguide/integration-ps-secretsmanager.html

{{% /collapse-content %}} 


{{% collapse-content title="Azure Keyvault Backend" level="h4" expanded=false id="id-for-anchoring" %}}

##### Supported backends

The following Azure services are supported:

| "secret_backend_type" value                            | Azure Service          |
| ----------------------------------------|------------------------|
| [azure.keyvault](#azure-authentication) | [Azure Keyvault][2000] |

##### Azure authentication

Datadog recommends using Managed Identities to authenticate with Azure. This allows you associate cloud resources with AMI accounts and removes the need to put sensitive information in your `datadog.yaml` configuration file.

##### Managed identity

To access your Key Vault, create a Managed Identity and assign it to your Virtual Machine. Then, configure the appropriate role assignment on the Key Vault to allow that identity to access its secrets.

#### Datadog.yaml configuration

The backend configuration for Azure Key Vault secrets is structured as YAML following this schema:

```yaml
# datadog.yaml
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

The backend secret is referenced in your Datadog Agent configuration file with `ENC`--here is an example where a plaintext secret needs to be retrieved:

```yaml
# datadog.yaml

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

If this semicolon is not present, the entire JSON is treated as a plaintext value of the secret.
When the semicolon is used, `SecretKey` refers to the specific JSON key whose value you want to retrieve from within `MySecret`:

```yaml
# datadog.yaml
api_key: "ENC[MySecret;ddapikey]"
app_key: "ENC[MySecret;ddappkey]"
property3: "ENC[MySecret;ddorgname]"
secret_backend_type: azure.keyvault
secret_backend_config:
  keyvaulturl: {keyVaultURL}
```

[2000]: https://docs.microsoft.com/en-us/Azure/key-vault/secrets/quick-create-portal

{{% /collapse-content %}} 


{{% collapse-content title="HashiCorp Vault Backend" level="h4" expanded=false id="id-for-anchoring" %}}
##### Supported backends

The following HashiCorp services are supported:

| "secret_backend_type" value                               | HashiCorp Service                                  |
| ------------------------------------------ | -------------------------------------------------- |
| [hashicorp.vault](#hashicorp-auth-session) | [HashiCorp Vault (Secrets Engine Version 1)][3000] |
| [hashicorp.vault](#hashicorp-auth-session) | [HashiCorp Vault (Secrets Engine Version 2)][3000] |

#### General instructions to set up HashiCorp Vault
1. Run your HashiCorp Vault. For more information, see the [official HashiCorp Vault documentation][3001]. 
2. Write a policy that gives the permission to pull secrets from your vault--create a `*.hcl` file, and include the following permission if using Secrets Engine Version 1:
```
path "<your mount path>/<additional subpath>" {
  capabilities = ["read"]
}
```
If using Secrets Engine Version 2, then the following permissions are needed:
```
path "<your mount path>/data/<additional subpath>" {
  capabilities = ["read"]
}

path "sys/mounts" {
  capabilities = ["read"]
}
```
3. Then, run `vault policy write <policy-name> <path to *.hcl file>`

4. Choose the method of authenticating to your vault. If using the AWS instance profile method, run `vault auth enable aws`. 

#### AWS instance profile instructions

Datadog recommends that you authenticate using the [instance profile method][3003] if you are running your HashiCorp Vault from an AWS-connected machine.

After this has been set up, run the following command to write an authentication-specific vault policy:

```
vault write auth/aws/role/<Name of AWS IAM Role> \
  auth_type=iam \
  bound_iam_principal_arn=arn:aws:iam::<AWS Account ID>:role/<Name of AWS IAM Role> \
  policies=<name of *.hcl file policy> \
  max_ttl=768h
```

#### Configuration example

In the following example, assume the HashiCorp Vault secret path prefix is `/Datadog/Production` with a parameter key of `api_key`:

```sh
/DatadogAgent/Production/api_key: (SecureString) "<your api key>"
```

Each of the following examples access the secret from the Datadog Agent configuration YAML file(s) as such:

```yaml
# datadog.yaml
api_key: "ENC[/Datadog/Production;apikey]" 

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
[3003]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
{{% /collapse-content %}} 

{{% collapse-content title="JSON or YAML File Secret Backends" level="h4" expanded=false id="id-for-anchoring" %}}

| "secret_backend_type" value                                 | File Service                             |
|---------------------------------------------|-----------------------------------------|
|[file.json](#json-backend-settings)          |[JSON][4001]                             |
|[file.yaml](#yaml-backend-settings)          |[YAML][4002]                             |

##### File permissions
The file backend only requires read permissions for the configured JSON or YAML files. These permissions must be granted to the local Datadog Agent user (`dd-agent` on Linux, `ddagentuser` on Windows).


{{< tabs >}}
{{% tab "JSON File Backend" %}}

##### Datadog.yaml configuration

You can use a JSON file to store secrets locally.

As an example if we have a JSON file in `/path/to/secret.json` containing:

```json
{
  "datadog_api_key": "your api key"
}
```

You can use the following configuration to pull secrets from it:

```yaml
# datadog.yaml
api_key: "ENC[{datadog_api_key}]"

secret_backend_type: file.json
secret_backend_config:
  file_path: /path/to/secret.json
```
{{% /tab %}}


{{% tab "YAML File Backend" %}}

##### Datadog.yaml Configuration

You can use a YAML file to store secrets locally.

As an example if we have a YAML file in `/path/to/secret.yaml` containing:

```yaml
datadog_api_key: your api key
```

You can use the following configuration to pull secrets from it:

```yaml
# datadog.yaml
api_key: "ENC[{datadog_api_key}]"
secret_backend_type: file.yaml
secret_backend_config:
  file_path: /path/to/secret.yaml
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

To retrieve secrets, the Agent uses an external executable that you provide. The executable is used when new secrets are discovered and are cached for the lifecycle of the Agent. If you need to update or rotate a secret, you must restart the Agent to reload it.

This allow you to use any secret management solution and gives you full control on how the Agent accesses secrets.

The Agent sends to this executable a JSON payload over standard input containing a list of secret handles to resolve. Your executable will fetch each secret and return them in a JSON format through a standard output.

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

If a secret fails to be resolved (either by returning a non-zero exit code or a non-null error), the related configuration is ignored by the Agent.

**Never output sensitive information on `stderr`**. If the binary exits with a different status code than `0`, the Agent logs the standard error output of your executable for troubleshooting.

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
secret_backend_command: /path/to/binary
```

### Agent security requirements

The Agent runs the provided executable as a sub-process. The execution patterns differ on Linux and Windows.

{{< tabs >}}
{{% tab "Linux" %}}

On Linux, your executable must:

* Belong to the same user running the Agent (`dd-agent` by default, or `root` inside a container).
* Have no rights for `group` or `other`.
* Have at least exec rights for the owner.

{{% /tab %}}
{{% tab "Windows" %}}

On Windows, your executable must:

* Have read/exec for `ddagentuser` (the user used to run the Agent).
* Have no rights for any user or group except for the `Administrators` group, the built-in `Local System` account, or the Agent user context (`ddagentuser` by default).
* Be a valid Win32 application so the Agent can execute it (for example, a PowerShell or Python script doesn't work).

{{% /tab %}}
{{< /tabs >}}

**Note**: Your executable shares the same environment variables as the Agent.

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

### Autodiscovery variables in secret handles

It's also possible to use [Autodiscovery][1] variables in secret handles. The Agent resolves these variables before resolving the secret. For example:
```
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/integrations/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[3]: https://docs.docker.com/engine/swarm/secrets/
[4]: https://github.com/DataDog/datadog-secret-backend
[5]: https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md
[6]: /agent/configuration/agent-commands/#restart-the-agent
[7]: /opentelemetry/setup/ddot_collector/
