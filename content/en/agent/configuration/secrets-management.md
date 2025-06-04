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

If you wish to avoid storing secrets in plaintext in the Agent's configuration files, you can configure the Agent to pull information from your secret management solution.

The Agent is able to call a user-provided executable to handle retrieval and decryption of secrets, which are then loaded in memory by the Agent. This approach allows users to rely on any secrets management backend (such as HashiCorp Vault or AWS Secrets Manager), and select their preferred authentication method to establish initial trust with it. As a convenience, containerized deployments of the Agent are pre-packaged with [Helper Scripts](#helper-scripts-for-autodiscovery) to use for this executable.

Starting with version 6.12, the secrets management package is generally available on Linux for metrics, APM, and process monitoring, as well as on Windows for metrics and APM.

## How it works as a whole

In the Agent or integrations configuration files you can signal that some field should be fetched from your secrets management solution by using the `ENC[]` notation (more on this in the [next section](#defining-secrets-in-configurations)). Those `ENC[]` notations contain the ID of the secret to fetch.

For each configuration the Agent executes a user-provided binary to do the actual fetching. That binary is in charge of establishing initial trust with your secrets solution, pulling the secrets value and returning it to the Agent. The Agent then replaces, in memory, the `ENC[]` notation by the secret value.

This means that no secrets are ever saved on disk, you stay in complete control of what the Agent has access to and the Agent can integrate with any system. It is also important to note that your secrets never leave your environment, they are ever sent to the Datadog backend nor stored anywhere.

Example implementation for AWS Secrets, AWS SSM, Azure keyvault and HashiCorp can be found [here](https://github.com/DataDog/datadog-secret-backend). You can find more detail on how to use those in the [XXXX] section.

## Using secrets

### Defining secrets in configurations

Use the `ENC[<secret ID>]` notation to denote a secret as the value of any YAML field in your configuration. The string
within the brackets is the ID for that secret.

Secrets are always strings, you cannot use them to set an integer or Boolean value in the configuration.

Example:

```yaml
instances:
  - server: db_prod
    # two valid secret handles
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"

    # The `ENC[]` handle must be the entire YAML value, which means that
    # the following is NOT detected as a secret handle:
    password2: "db-ENC[prod_password]"
```

Here, there are two secret IDs: `db_prod_user` and `db_prod_password`. These are the secrets' _handles_, and each uniquely identifies a secret within your secrets management backend.

Between the brackets, any character is allowed as long as the YAML configuration is valid. This means that quotes must be escaped. For instance:

```text
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

In the above example, the secret's handle is the string `{"env": "prod", "check": "postgres", "id": "user_password"}`.

There is no need to escape inner `[` and `]`. For instance:

```text
"ENC[user_array[1234]]"
```

In the above example, the secret's handle is the string `user_array[1234]`.

Secrets are resolved after [Autodiscovery][1] template variables are resolved, this means you can use them in a secret handle. For instance:

```yaml
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```


It's important to note that the Agent first loads the main configuration and then resolves the secrets. This means that
`ENC[]` notation cannot be used in the `secret_*` settings.

### Providing an executable

To retrieve secrets, you must provide an executable that is able to authenticate to and fetch secrets from your secrets management backend.

The Agent caches secrets internally in memory to reduce the number of calls (useful in a containerized environment for example). The Agent calls the executable every time it loads a configuration that contains at least one new secret handle.

APM and Process Monitoring run in their own process/service, and because processes don't share memory, each needs to be able to fetch secrets. Thus, if `datadog.yaml` contains secrets, each process calls the executable once. For example, storing the `api_key` as a secret in the `datadog.yaml` file with APM and Process Monitoring enabled might result in 3 calls to the secret backend.

By design, the user-provided executable needs to implement any error handling mechanism that a user might require. Conversely, the Agent needs to be restarted if a secret has to be refreshed in memory (for example, revoked password).

Relying on a user-provided executable has multiple benefits:

* Guaranteeing that the Agent does not attempt to load in memory parameters for which there isn't a secret handle.
* Ability for the user to limit the visibility of the Agent to secrets that it needs (for example, by restraining the accessible list of secrets in the key management backend)
* Freedom and flexibility in allowing users to use any secrets management backend without having to rebuild the Agent.
* Enabling each user to solve the initial trust problem from the Agent to their secrets management backend. This occurs in a way that leverages each user's preferred authentication method and fits into their continuous integration workflow.

#### Agent security requirements

The Agent runs the `secret_backend_command` executable as a sub-process. The execution patterns differ on Linux and Windows.

{{< tabs >}}
{{% tab "Linux" %}}

On Linux, the executable set as `secret_backend_command` must:

* Belong to the same user running the Agent (`dd-agent` by default, or `root` inside a container).
* Have no rights for group or other.
* Have at least exec rights for the owner.

{{% /tab %}}
{{% tab "Windows" %}}

On Windows, the executable set as `secret_backend_command` must:

* Have read/exec for `ddagentuser` (the user used to run the Agent).
* Have no rights for any user or group except for the `Administrators` group, the built-in Local System account, or the Agent user context (`ddagentuser` by default)
* Be a valid Win32 application so the Agent can execute it (a PowerShell or Python script would not work for example).

{{% /tab %}}
{{< /tabs >}}

**Note**: The executable shares the same environment variables as the Agent.

#### Option 1: Creating your own executable

##### The executable API

The executable respects a simple API: it reads JSON from the standard input and outputs JSON containing the fetched secrets to the standard output.

If the exit code of the executable is anything other than `0`, the configuration currently being resolved is considered erroneous and is dropped.

**API input**

The executable receives a JSON payload from the standard input, containing the list of secrets to fetch:

```json
{"version": "1.0", "secrets": ["secret ID 1", "secret ID 2"]}
```

* `version`: is a string containing the format version (currently 1.0).
* `secrets`: is a list of strings; each string is a handle from a configuration corresponding to a secret to fetch.

**API output**

The executable is expected to output to the standard output a JSON payload containing the fetched secrets:

```json
{
  "secret1": {"value": "secret_value", "error": null},
  "secret2": {"value": null, "error": "could not fetch the secret"}
}
```

The expected payload is a JSON object, where each key is one of the handles requested in the input payload. The value for each handle is a JSON object with 2 fields:

* `value`: a string; the actual secret value to be used in the check configurations (can be null in the case of error).
* `error`: a string; the error message, if needed. If error is anything other than null, the integration configuration that uses this handle is considered erroneous and is dropped.

**Never output sensitive information on `stderr`**. If the binary exits with a different status code than `0`, the Agent logs the standard error output of the executable to ease troubleshooting.

###### Example executables

Some sample dummy programs prefixing every secret with `decrypted_`:

{{< tabs >}}
{{% tab "Go" %}}
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
{{% /tab %}}
{{% tab "PowerShell" %}}
```powershell
$secretsJson = $input | ConvertFrom-Json
$secrets = @{}
for ($index = 0; $index -lt $secretsJson.secrets.count; $index++) {
    $secretKey = $secretsJson.secrets[$index]
    # Add code to fetch secret here
    # For example: $secretValue = Get-Secret -Name $secretKey -Vault SecretStore
    $secrets[$secretKey] = @{
        value = "decrypted_$($secretKey)"
        error = $null
    }
}
Write-Host ($secrets | ConvertTo-Json)
```
{{% /tab %}}
{{< /tabs >}}

This updates this configuration (in the check file):

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

to this (in the Agent's memory):

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```
#### Option 2: Out of the box support for Kubernetes and Docker

Starting with version 7.32.0, the [helper script][2] is available in the Agent's container image as `/readsecret_multiple_providers.sh`, and you can use it to fetch secrets from files in addition to Kubernetes Secrets. The two scripts provided in previous versions (`readsecret.sh` and `readsecret.py`) are supported, but can only read from files.

Many Datadog integrations require credentials to retrieve metrics. To avoid hardcoding these credentials in an [Autodiscovery template][1], you can use secrets management to separate them from the template itself.

The script `readsecret_multiple_providers.sh` can be used to read from both files as well as Kubernetes Secrets. These Secrets must follow the format `ENC[provider@some/path]`. For example:

| Provider               | Format                                           |
|------------------------|--------------------------------------------------|
| Read from files        | `ENC[file@/path/to/file]`                        |
| Kubernetes Secrets     | `ENC[k8s_secret@some_namespace/some_name/a_key]` |

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

###### Read from file example

The Agent can read a specified file relative to the path provided. This file can be brought in from [Kubernetes Secrets](#kubernetes-secrets), [Docker Swarm Secrets](#docker-swarm-secrets), or any other custom method.

If the Agent container has the file `/etc/secret-volume/password` whose contents are the plaintext password, you can reference this with a notation like `ENC[file@/etc/secret-volume/password]`.

**Kubernetes Secrets**

Kubernetes supports [exposing Secrets as files][3] inside a pod. Consider an example. A Secret, `Secret: test-secret`, has the data `db_prod_password: example`. This Secret is mounted to the Agent container according to the following configuration:
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
In this example, the Agent container contains the file `/etc/secret-volume/db_prod_password` with the contents of `example`. This is referenced in the configuration by using `ENC[file@/etc/secret-volume/db_prod_password]`.

**Notes:**
- The Secret must exist in the same namespace as the pod it is being mounted in.
- The script is able to access all subfolders, including the sensitive `/var/run/secrets/kubernetes.io/serviceaccount/token`. As such, Datadog recommends using a dedicated folder instead of `/var/run/secrets`.

**Docker Swarm secrets**

[Docker swarm secrets][4] are mounted in the `/run/secrets` folder. For example, the Docker secret `db_prod_passsword` is located in `/run/secrets/db_prod_password` in the Agent container. This would be referenced in the configuration with `ENC[file@/run/secrets/db_prod_password]`.

##### Read from Kubernetes Secret example

The following setup allows the Agent to directly read Kubernetes Secrets within both its own and *other* namespaces. Note that to do this, the Agent's `ServiceAccount` must be granted permissions with the appropriate `Roles` and `RoleBindings`.

If `Secret: database-secret` exists in `Namespace: database` and contains the data `password: example`, this is referenced in the configuration with `ENC[k8s_secret@database/database-secret/password]`. With this setup, the Agent pulls this Secret directly from Kubernetes, which can be helpful when referencing a Secret that exists in a different namespace than the Agent is in.

This requires additional permissions that are manually granted to the Agent's Service Account. For example, consider the following the RBAC policy:
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

In addition to these permissions, you need to enable the script to read from multiple providers `"/readsecret_multiple_providers.sh"` when using the Kubernetes Secrets provider.

##### (Legacy) Scripts for reading from files
Datadog Agent v7.32 introduces the `readsecret_multiple_providers.sh` script. Datadog recommends that you use this script instead of `/readsecret.py` and `/readsecret.sh` from Agent v6.12. Note that `/readsecret.py` and `/readsecret.sh` are still included and supported in the Agent to read files.

These scripts require a folder passed as an argument. Secret handles are interpreted as file names, relative to this folder. To avoid leaking sensitive information, these scripts refuse to access any file out of the root folder specified (including symbolic link targets).

These scripts are incompatible with [OpenShift restricted SCC operations][5] and require that the Agent runs as the `root` user.

**Docker**

[Docker Swarm secrets][4] are mounted in the `/run/secrets` folder. These can be read by passing the following environment variables to your Agent container:

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/run/secrets
```

With this setup, the Datadog Agent reads any secret files located in the `/run/secrets` directory. For example, the configuration `ENC[password]` would have the Agent search for the `/run/secrets/password` file.

**Kubernetes**
Kubernetes supports [exposing Secrets as files][3] inside a pod. For example, if your Secrets are mounted in `/etc/secret-volume`, use the following environment variables:

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```

With this setup, the Datadog Agent reads any secret files located in the `/etc/secret-volume` directory. For example, the configuration `ENC[password]` would have the Agent search for the `/etc/secret-volume/password` file.

#### Option 3: Using one of the example implementation

Default and example implementation for `AWS Secrets`, `AWS SSM`, `Azure keyvault` and `HashiCorp Vault` can be found
[here](https://github.com/DataDog/datadog-secret-backend).

### How to configure the secrets feature

To enable the secrets feature set the following variable in `datadog.yaml` to the path of your executable:

```yaml
secret_backend_command: <EXECUTABLE_PATH>
```

### End to end example

In the follwoing example we are going to pull the Agent API key from [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/) for an Linux EC2 instance.
This is a step by step example on how to set up secrets.

1. Set the Datadog API key you want your Agent to use in `AWS Secrets Manager`. The secrets `ARN` in AWS is the secrets ID, in our example this is `arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey`
2. We need to give our EC2 instance access to that specific secret. For this, we need to define an `IAM Permission Policy` similar to this and attach it to our EC2 instance ([AWS Secret documentation](https://docs.aws.amazon.com/secretsmanager)):
   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "secretsmanager:GetSecretValue"
         ],
         "Resource": [
           "arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey"
         ]
       }
     ]
   }
   ```
3. For our example, we are going to use the example implementation. Download the latest release of
   [datadog-secret-backend](https://github.com/DataDog/datadog-secret-backend) on your EC2 instance. We're going to save
   it at `/datadog-secret-backend`.
   Then we're going to create the configuration file it needs in `/datadog-secret-backend.yaml` (more information [here](https://github.com/DataDog/datadog-secret-backend/blob/main/docs/aws/secrets.md)):
   ```
   backends:
     staging-aws:
       backend_type: aws.secrets
   ```
   We are configuring one backend of type `aws.secrets` under the name `staging-aws`
4. We now need to set the correct access rights to our binary described [here](#agent-security-requirements):
   ```
   $> chown dd-agent:dd-agent /datadog-secret-backend
   $> chmod 500 /datadog-secret-backend
   ```
5. Configure the Agent to use our binary to resolve secrets. In `/etc/datadog-agent/datadog.yaml` set `secret_backend_command: /datadog-secret-backend`
6. Finally we need to define the API key as a secret. In `/etc/datadog-agent/datadog.yaml` set `api_key: ENC[staging-aws:arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey]`. Note that the
   [datadog-secret-backend](https://github.com/DataDog/datadog-secret-backend) binary uses a prefix to choose which
   backend to use from its configuration, which is why our secret handle starts with `staging-aws`. This is specific to the example implementation.
7. Restart the Agent.

The Agent pull the secret stored in AWS Secret under `arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey` and use it as its API key at startup.

You can see which secrets the Agent has resolved by running the `datadog-agent secrets` command locally on your EC2 instance.

## API and APP key refresh at runtime

Starting with Agent v7.67, the Agent can refresh its API and APP key at runtime (ie: without a restart).
This feature relies on the API key and APP key being pulled as secrets. When enaled, the Agent pulls at regular intervals your secret management solution to refresh its internal value.

To enable API/APP key refresh at runtime `secret_refresh_interval` in your `datadog.yaml` (the interval is expressed as a number of seconds).

The following `datadog.yaml` example would refresh the Agent API key every hour:
```
api_key: ENC[<secret handle for the API key>]
secret_backend_command: /path/to/the/secret/executable
secret_refresh_interval: 3600
```

**Note**: The Agent randomly spreads its first refresh within the specified `secret_refresh_interval` window. This means
that it resolves the API key at startup, then refresh it within 1 hour and every hour after that. This avoids a fleet of
Agents to all refresh their API/APP key at the same time. You can disable this behavior by setting `secret_refresh_scatter: false` in the `datadog.yaml`.

You can also trigger an API/APP key refresh manually by using the `secret refresh` command in the Agent CLI.

## Troubleshooting

### Listing detected secrets

The `secret` command in the Agent CLI shows any errors related to your setup. For example, if the rights on the executable are incorrect. It also lists all handles found, and where they are located.

On Linux, the command outputs file mode, owner and group for the executable. On Windows, ACL rights are listed.

{{< tabs >}}
{{% tab "Linux" %}}

Example on Linux:

```shell
$> datadog-agent secret
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
#### Linux

```bash
sudo -u dd-agent bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

The `dd-agent` user is created when you install the Datadog Agent.


{{% /tab %}}
{{% tab "Windows" %}}
#### Windows

##### Rights related errors

If you encounter one of the following errors, then something is missing in your setup. See the [Windows instructions](#windows).

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

Consider the previous [Kubernetes Secrets example](#read-from-kubernetes-secret-example), where the Secret `Secret:database-secret` exists in the `Namespace: database`, and the Service Account `ServiceAccount:datadog-agent` exists in the `Namespace: default`.

In this case, use the following command:

```
kubectl auth can-i get secret/database-secret -n database --as system:serviceaccount:default:datadog-agent
```

This command returns whether the permissions are valid for the Agent to view this Secret.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/integrations/
[2]: https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent/secrets-helper/readsecret_multiple_providers.sh
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[4]: https://docs.docker.com/engine/swarm/secrets/
[5]: https://github.com/DataDog/datadog-agent/blob/6.4.x/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[6]: /agent/configuration/agent-commands/#restart-the-agent


