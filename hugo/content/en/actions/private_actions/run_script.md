---
title: Run a Script with the Private Action Runner
description: Use the private action runner to run predefined scripts in your private network, including the configuration required for ownerless, Execution-Policy-authorized runners.
further_reading:
- link: "/actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner in the Datadog Agent"
- link: "/actions/private_actions/execution_policies"
  tag: "Documentation"
  text: "Execution Policies"
- link: "/actions/private_actions/reference"
  tag: "Documentation"
  text: "Reference"
---

## Overview

The private action runner can run **predefined scripts**, which are shell commands, command-line tools, and scripts you declare ahead of time in a script configuration file. Only what you predefine can run, so the runner never runs arbitrary inline commands from a workflow or app.

<div class="alert alert-warning">You decide which commands and binaries the runner is allowed to run. Review every command you add to the script configuration, especially those that accept parameters, grant the runner only the privileges it needs, and carefully review the permissions you share through connections. See <a href="/actions/connections/#connection-security-considerations">connection security considerations</a>.</div>

## Use cases

| Use case | Agent-based | Standalone | Notes |
|---|:---:|:---:|---|
| Running Linux binaries (`ls`, `rm`, `find`, `curl`) | {{< X >}} | {{< X >}} | For standalone runners, the relevant files must be accessible to the container. |
| Running CLIs (`aws`, `terraform`, `kubectl`) | {{< X >}} | {{< X >}} | For standalone runners, the CLI and credentials must be available in the image. For Agent-based runners, tools must be installed on the host. |
| Running bash scripts | {{< X >}} | {{< X >}} | For standalone runners, scripts can be mounted inside the container. Use the [large image](#large-image) for a Python interpreter. |
| Running PowerShell scripts | {{< X >}} | | Supported on Agent-based Windows runners only. |
| Running privileged commands (`systemctl restart`) | {{< X >}} | | For Agent-based runners, grant permissions to the runner user. Container sandboxing prevents standalone runners from privileged host access. |

## Prerequisites

**For Agent-based runners:**
- Datadog Agent 7.81.0 or later. See [Set up a private action runner in the Datadog Agent][1].
- Add `com.datadoghq.script.runPredefinedScript` (Linux) or `com.datadoghq.script.runPredefinedPowershellScript` (Windows) to the runner's actions allowlist.

**For standalone runners:**
- A standalone runner. See [Set up a standalone private action runner][2].
- For CLI tools not included in the base or [large image](#large-image), a custom Docker image. See [Custom images](#custom-images).

## Agent-based

### Configure scripts

{{< tabs >}}
{{% tab "Linux" %}}

Edit the `/etc/datadog-agent/private-action-runner/script-config.yaml` file:

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

{{% /tab %}}
{{% tab "Windows" %}}

Edit the `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` file:

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello world!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

{{% /tab %}}
{{< /tabs >}}

In a workflow or app, reference a script by the name you defined (for example, `echo`). Use `runPredefinedScript` on Linux runners and `runPredefinedPowershellScript` on Windows runners.

### Allowed script configuration directories

<div class="alert alert-warning">Agent 7.86.0 and later only read script configuration files from allowed directories. Script actions whose <strong>Path to file</strong> is outside them fail with <code>could not load script credential file</code>. Before you upgrade, move the file into the default directory (recommended), or add its directory to <code>credential_file_allowed_roots</code>.</div>

Starting with Agent 7.86.0, the runner reads script configuration files only from allowed directories.

- By default, only the packaged configuration directory is allowed:
  - Linux: `/etc/datadog-agent/private-action-runner`
  - Windows: `C:\ProgramData\Datadog\private-action-runner`
- To allow other directories, set `private_action_runner.script.credential_file_allowed_roots`.
  - The list replaces the default. Include the default directory if you use [ownerless runners](#ownerless-runner-execution-policy-authorized) or the automatically created Script connection.
  - An empty list (`[]`) disables script configuration files.
  - Entries must be absolute paths to directories. The runner ignores invalid entries and logs a warning.
- The runner rejects paths that leave an allowed directory, for example through `..` or a symbolic link.

{{< tabs >}}
{{% tab "Host" %}}

In `datadog.yaml`:

```yaml
private_action_runner:
  script:
    credential_file_allowed_roots:
      - /etc/datadog-agent/private-action-runner
      - /opt/scripts/config
```

Alternatively, set the `DD_PRIVATE_ACTION_RUNNER_SCRIPT_CREDENTIAL_FILE_ALLOWED_ROOTS` environment variable to a comma-separated list:

```bash
DD_PRIVATE_ACTION_RUNNER_SCRIPT_CREDENTIAL_FILE_ALLOWED_ROOTS=/etc/datadog-agent/private-action-runner,/opt/scripts/config
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Add the setting to the `private-action-runner-configdata` annotation of each runner you configure (`agent.datadoghq.com/` for the node Agent, `cluster-agent.datadoghq.com/` for the Cluster Agent):

```yaml
metadata:
  annotations:
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        script:
          credential_file_allowed_roots:
            - /etc/datadog-agent/private-action-runner
            - /opt/scripts/config
```

{{% /tab %}}
{{% tab "Helm" %}}

Set the environment variable on the runner container, and on the Cluster Agent if it runs a runner:

```yaml
agents:
  containers:
    privateActionRunner:
      env:
        - name: DD_PRIVATE_ACTION_RUNNER_SCRIPT_CREDENTIAL_FILE_ALLOWED_ROOTS
          value: "/etc/datadog-agent/private-action-runner,/opt/scripts/config"
clusterAgent:
  env:
    - name: DD_PRIVATE_ACTION_RUNNER_SCRIPT_CREDENTIAL_FILE_ALLOWED_ROOTS
      value: "/etc/datadog-agent/private-action-runner,/opt/scripts/config"
```

{{% /tab %}}
{{< /tabs >}}

### Grant permissions

{{< tabs >}}
{{% tab "Linux" %}}

The runner executes scripts as the `dd-agent` user. If your scripts require elevated permissions, grant them to the `dd-agent` user:

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

The runner executes scripts as `ddagentuser`. If your scripts require access to certain resources, grant `ddagentuser` elevated permissions to them:

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### Ownerless runner (Execution Policy-authorized)

When a runner is enrolled as ownerless and authorized by [Execution Policies][3], two things are required in addition to the steps above:

- The **Script** integration must be authorized for the runner through an Execution Policy, in addition to the predefined-script action being in the runner's actions allowlist.
- The runner reads its predefined scripts from a **fixed path**, the same path used in [Configure scripts](#configure-scripts) above:

{{< tabs >}}
{{% tab "Linux" %}}

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

If you set `credential_file_allowed_roots`, include the directory of this fixed path. See [Allowed script configuration directories](#allowed-script-configuration-directories).

#### Delivering the config on Kubernetes

On Kubernetes, provide the script configuration file to the runner in the Datadog Agent as a ConfigMap. Mount it into the runner container at the fixed path. The Cluster Agent runner uses the Linux path above.

First, create a ConfigMap that holds your script configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: par-script-config
  namespace: datadog
data:
  script-config.yaml: |
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world!"]
```

Then, on the `DatadogAgent` resource, allow the predefined-script action and mount the ConfigMap into the runner container at the fixed path:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.script.runPredefinedScript"
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.remoteaction.*"
spec:
  override:
    nodeAgent:
      volumes:
        - name: par-script-config
          configMap:
            name: par-script-config
      containers:
        private-action-runner:
          volumeMounts:
            - name: par-script-config
              mountPath: /etc/datadog-agent/private-action-runner/script-config.yaml
              subPath: script-config.yaml
              readOnly: true
```

Finally, apply the manifest:

```bash
kubectl apply -f datadog-agent.yaml
```

### Owned runner (Connection-based)

{{< tabs >}}
{{% tab "Linux" %}}

#### Configure the connection

If you selected `com.datadoghq.script.runPredefinedScript` in the runner's actions allowlist, you should already have a **Script** connection linked to your runner. Otherwise, create a connection and specify `/etc/datadog-agent/private-action-runner/script-config.yaml` as the **path to file**. For more information, see [Handling private action credentials][4].

The path must be inside an [allowed directory](#allowed-script-configuration-directories).

{{% /tab %}}
{{% tab "Windows" %}}

#### Configure the connection

If you selected `com.datadoghq.script.runPredefinedPowershellScript` in the runner's actions allowlist, you should already have a **Script** connection linked to your runner. Otherwise, create a connection and specify `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` as the **path to file**. For more information, see [Handling private action credentials][4].

The path must be inside an [allowed directory](#allowed-script-configuration-directories).

{{% /tab %}}
{{< /tabs >}}

### Troubleshooting

If a script action fails with `could not load script credential file`, the runner could not read the script configuration file. Check that the file:

- Is inside an [allowed directory](#allowed-script-configuration-directories)
- Exists and is readable by the runner user (`dd-agent` on Linux, `ddagentuser` on Windows)
- Is a regular file, not empty, and no larger than 1 MB

## Standalone

A standalone runner is always owned and authorized with [Connections][5].

{{< tabs >}}
{{% tab "Docker" %}}

1. After [setting up a runner][2], navigate to **Connections**.
1. Click **New Connection** and select **Script**.
1. Enter a connection name, and in the **Private Action Runner** dropdown, select your runner.
1. Copy the credential file template into your runner's configuration directory with the commands you want to run.
1. In **Path to file**, confirm the file path matches the path on your runner's file system (the default is sufficient in most cases).
1. Click **Next, Confirm Access**, configure permissions, then click **Create**.
1. Select this connection when using the script action in your workflows or apps.

Configure script actions through your runner's `config.yaml` file and the script connection
(`credentials/script.yaml` by default):

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello world"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
    parameterSchema:
      properties:
        echoValue:
          type: string
      required:
        - echoValue
```

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

When deploying the runner with Helm, configure scripts through your `values.yaml` file:

```yaml
common:
  actionsAllowlist:
    - com.datadoghq.script.runPredefinedScript

credentials:
  script:
    schemaId: script-credentials-v1
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
        parameterSchema:
          properties:
            echoValue:
              type: string
          required:
            - echoValue
```

Deploy or upgrade the runner:

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Runner image options

The following options are available for standalone runners only.

#### Large image

If you want to use tools like Python, SSH, the AWS CLI, Terraform, or the gcloud CLI, use the `gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}-large` image instead of the default image.

#### Custom images

For binaries not available in the Datadog-provided images, create a custom image:

```dockerfile
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change the line below to install the tool of your choice
RUN apt update && apt install -y python3
USER dog
```

You can mount complex scripts inside the runner:

```yaml
# docker-compose example
services:
  runner:
    build: . # if you are using a local Dockerfile
    volumes:
      - "./config:/etc/dd-action-runner/config" # contains credentials for actions
      - "./scripts:/etc/dd-action-runner-script/scripts" # contains dependencies for script actions
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: ["bash", "/etc/dd-action-runner-script/scripts/script.sh"]
```

## Using the configured scripts

In your workflow or app, configure the action to use the script name you defined (for example, `echo` or `echo-parametrized`). For Linux runners, use `runPredefinedScript`. For Windows runners, use `runPredefinedPowershellScript`.

There are two levels of variable resolution: one at the workflow level and one at the action level
inside the runner.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/set_up_agent_based/
[2]: /actions/private_actions/set_up_standalone/
[3]: /actions/private_actions/execution_policies/
[4]: /actions/connections/private_action_credentials/
[5]: /actions/connections/
