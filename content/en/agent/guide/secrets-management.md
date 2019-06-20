---
title: Secrets Management
kind: documentation
---

If you wish to avoid storing secrets in plaintext in the Agent’s configuration files, you can use the secrets management package.

The Agent is able to leverage the `secrets` package to call a user-provided executable to handle retrieval and decryption of secrets, which are then loaded in memory by the Agent. This approach allows users to rely on any secrets management backend (such as HashiCorp Vault or AWS Secrets Manager), and select their preferred authentication method to establish initial trust with it.

Starting with version 6.12, the secrets management package is generally available on Linux for metrics, APM, and process monitoring, as well as on Windows for metrics and APM.

## Using secrets

### Defining secrets in configurations

Use the `ENC[]` notation to denote a secret as the value of any YAML field in your configuration.

Secrets are supported in any configuration backend (e.g. file, etcd, consul) and environment variables.

Secrets are also supported in `datadog.yaml`. The agent first loads the main configuration and reloads it after decrypting the secrets. This means that secrets cannot be used in the `secret_*` settings.

Secrets are always strings, i.e. you cannot use them to set an integer or Boolean value.

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

Here, there are two secrets: `db_prod_user` and `db_prod_password`. These are the secrets’ _handles_, and each uniquely identifies a secret within your secrets management backend.

Between the brackets, any character is allowed as long as the YAML configuration is valid. This means that quotes must be escaped. For instance:

```
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

In the above example, the secret’s handle is the string `{"env": "prod", "check": "postgres", "id": "user_password"}`.

There is no need to escape inner `[` and `]`. For instance:

```
“ENC[user_array[1234]]”
```

In the above example, the secret’s handle is the string `user_array[1234]`.

Secrets are resolved after [Autodiscovery][1] template variables are resolved, i.e. you can use them in a secret handle. For instance:

```
“ENC[db_prod_password_%%host%%]”
```

### Providing an executable

To retrieve secrets, you must provide an executable that is able to authenticate to and fetch secrets from your secrets management backend.

The Agent caches secrets internally in memory to reduce the number of calls (useful in a containerized environment for example). The Agent calls the executable every time it accesses a check configuration file that contains at least one secret handle for which the secret is not already loaded in memory. In particular, secrets that have already been loaded in memory do not trigger additional calls to the executable. In practice, this means that the Agent calls the user-provided executable once per file that contains a secret handle at startup, and might make additional calls to the executable later if the Agent or instance is restarted, or if the Agent dynamically loads a new check containing a secret handle (e.g. via Autodiscovery).

Since APM and Process Monitoring run in their own process/service, and since processes don't share memory, each needs to be able to load/decrypt secrets. Thus, if `datadog.yaml` contains secrets, each process might call the executable once. For example, storing the `api_key` as a secret in the `datadog.yaml` file with APM and Process Monitoring enabled might result in 3 calls to the secret backend.

By design, the user-provided executable needs to implement any error handling mechanism that a user might require. Conversely, the Agent needs to be restarted if a secret has to be refreshed in memory (e.g. revoked password).

#### Configuration

Set the following variable in `datadog.yaml`:

```
secret_backend_command: /path/to/your/executable
```

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
* Have no rights for any user or group except `Administrator` or `LocalSystem`.
* Be a valid Win32 application so the Agent can execute it.

{{% /tab %}}
{{< /tabs >}}

**Note**: The executable shares the same environment variables as the Agent.

Never output sensitive information on `stderr`. If the binary exits with a different status code than `0`, the Agent logs the standard error output of the executable to ease troubleshooting.

#### The executable API

The executable respects a simple API: it reads JSON from the standard input and outputs JSON containing the decrypted secrets to the standard output.

If the exit code of the executable is anything other than `0`, the integration configuration currently being decrypted is considered erroneous and is dropped.

**Input**:

The executable receives a JSON payload from the standard input, containing the list of secrets to fetch:

```
{
  "version": "1.0",
  "secrets": ["secret1", "secret2"]
}
```

* `version`: is a string containing the format version (currently 1.0).
* `secrets`: is a list of strings; each string is a handle from a configuration corresponding to a secret to fetch.

**Output**:

The executable is expected to output to the standard output a JSON payload containing the fetched secrets:

```
{
  "secret1": {
    "value": "secret_value",
    "error": null
  },
  "secret2": {
    "value": null,
    "error": "could not fetch the secret"
  }
}
```

The expected payload is a JSON object, where each key is one of the handles requested in the input payload. The value for each handle is a JSON object with 2 fields:

* `value`: a string; the actual secret value to be used in the check configurations (can be null in the case of error).
* `error`: a string; the error message, if needed. If error is anything other than null, the integration configuration that uses this handle is considered erroneous and is dropped.

**Example**:

The following is a dummy Go program prefixing every secret with `decrypted_`:

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

## Troubleshooting secrets

The Agent's public repository contains additional guidance on [troubleshooting secrets management][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery
[2]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets.md#troubleshooting
