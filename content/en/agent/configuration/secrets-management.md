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

To reference a secret in your configuration, use the `ENC[<secret_id>]` notation. This tells the Agent to resolve the value using your configured secret retrieval executable. The secret is fetched and loaded into memory but is never written to disk or sent to the Datadog backend.

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

## Providing a secret retrieval executable

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

## Options for retrieving secrets

### Option 1: Using the built-in Script for Kubernetes and Docker

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

### Option 2: Using a prebuilt executable

If you're using a standard secrets provider like `AWS Secrets Manager`, `AWS SSM` or other, you can use the prebuilt [datadog-secret-backend][4] executable.

Here's an example showing how to set it up:

1. **Create your secret** in AWS Secrets Manager. The secrets `ARN` in AWS is the secrets handle. example:
  ```
  arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey
  ```
2. **Grant your EC2 instance IAM permissions** to read the secret:
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

3. Download the latest release of [datadog-secret-backend][5] on your EC2 instance and create its configuration `datadog-secret-backend.yaml` next to the binary. The following example shows a configuration for a backend of type `aws.secrets` under the name `staging-aws`:
   ```
   backends:
     staging-aws:
       backend_type: aws.secrets
   ```
4. Set the correct access rights for the binary as described in [Agent security requirements](#agent-security-requirements):
   ```sh
   chown dd-agent:dd-agent datadog-secret-backend
   chmod 500 datadog-secret-backend
   ```
5. Configure the Agent to use the binary to resolve secrets and use the AWS secret (here as the `api_key`):
   ```
   api_key: ENC[staging-aws:arn:aws:secretsmanager:us-east-2:111122223333:secret:AgentAPIKey]

   secret_backend_command: /path/to/datadog-secret-backend
   ```
   The `staging-aws:` prefix matches the key defined in your backend configuration.
6. Restart the Agent.

You can see which secrets the Agent has resolved by running the `datadog-agent secrets` command locally on your EC2 instance.

### Option 3: Creating your own custom executable

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

## Refreshing API/APP keys at runtime

Starting in Agent version v7.67, you can configure the Agent to refresh its API and APP keys at regular intervals without requiring a restart. This relies on the API key and APP key being pulled as secrets.

To enable this, set `secret_refresh_interval` (in seconds) in your `datadog.yaml` file:
```yaml
api_key: ENC[<secret_handle>]

secret_backend_command: /path/to/your/executable
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

### Enabling [DDOT collector](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/) refresh
If you are using DDOT collector and want to enable API/APP refresh you must add the following additional configuration to your `datadog.yaml` file:
```
agent_ipc:
  port: 5051
  config_refresh_interval: 3600
```

This ensures the DDOT collector remains in-sync with the Agent after secrets are refreshed. Just like the Agent periodically verifies its configuration state, the DDOT collector uses this setting to regularly check for updated values from the Agent.

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
