---
title: Run a script with the private action runner
description: Use the private action runner to run predefined scripts in your private network, including the configuration required for ownerless, Execution-Policy-authorized runners.
disable_toc: false
further_reading:
- link: "actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner in the Datadog Agent"
- link: "actions/private_actions/execution_policies"
  tag: "Documentation"
  text: "Execution Policies"
- link: "actions/private_actions/reference"
  tag: "Documentation"
  text: "Reference"
---

The private action runner can run **predefined scripts**: shell commands, scripts, and command-line
tools that you declare ahead of time in a script configuration file. Only scripts you have
predefined can run, so the runner never runs arbitrary inline commands from a workflow or app.

> **Security:** you decide which commands and binaries the runner is allowed to run. Review every
> command you add to the script configuration, especially those that accept parameters, grant the
> runner only the privileges it needs, and carefully review the permissions you share through
> connections. See [connection security considerations][5].

## Use cases

| Use case | Agent-based | Standalone | Notes |
|---|:---:|:---:|---|
| Running Linux binaries (`ls`, `rm`, `find`, `curl`) | Yes | Yes | For standalone runners, the relevant files must be accessible to the container. |
| Running CLIs (`aws`, `terraform`, `kubectl`) | Yes | Yes | For standalone runners, the CLI and credentials must be available in the image. For Agent-based runners, tools must be installed on the host. |
| Running bash scripts | Yes | Yes | For standalone runners, scripts can be mounted inside the container. Use the [large image](#large-image) for a Python interpreter. |
| Running PowerShell scripts | Yes (Windows) | No | Supported on Agent-based Windows runners only. |
| Running privileged commands (`systemctl restart`) | Yes | No | For Agent-based runners, grant permissions to the runner user. Container sandboxing prevents standalone runners from privileged host access. |

## Prerequisites

**For Agent-based runners:**
- Datadog Agent 7.81.0 or later. See [Set up a private action runner in the Datadog Agent][1].
- `com.datadoghq.script.runPredefinedScript` (Linux) or
  `com.datadoghq.script.runPredefinedPowershellScript` (Windows) in the runner's actions allowlist.

**For standalone runners:**
- A standalone runner. See [Set up a standalone private action runner][6].
- For CLI tools not included in the base or [large image](#large-image), a custom Docker image. See
  [Custom images](#custom-images).

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

In a workflow or app, reference a script by the name you defined (for example, `echo`). Use
`runPredefinedScript` on Linux runners and `runPredefinedPowershellScript` on Windows runners.

### Grant permissions

{{< tabs >}}
{{% tab "Linux" %}}

The runner executes scripts as the `dd-agent` user. If your scripts require elevated permissions,
grant them to the `dd-agent` user:

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

{{% /tab %}}
{{% tab "Windows" %}}

The runner executes scripts as `ddagentuser`. If your scripts require access to certain resources,
grant `ddagentuser` elevated permissions to them:

```powershell
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

{{% /tab %}}
{{< /tabs >}}

### Ownerless runner (Execution Policy-authorized)

When a runner is enrolled as ownerless and authorized by [Execution Policies][3], two things are
required in addition to the steps above:

- The **Script** integration must be authorized for the runner through an Execution Policy, in
  addition to the predefined-script action being in the runner's actions allowlist.
- The runner reads its predefined scripts from a **fixed path**, the same path used in
  [Configure scripts](#configure-scripts) above:

{{< tabs >}}
{{% tab "Linux" %}}

#### Fixed config path

`/etc/datadog-agent/private-action-runner/script-config.yaml`

{{% /tab %}}
{{% tab "Windows" %}}

#### Fixed config path

`C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`

{{% /tab %}}
{{< /tabs >}}

#### Delivering the config on Kubernetes

On Kubernetes, provide the script configuration file to the in-Agent runner as a ConfigMap, and
mount it into the runner container at the fixed path (the Cluster Agent runner uses the Linux path
above).

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

Then, on the `DatadogAgent` resource, allow the predefined-script action and mount the ConfigMap
into the runner container at the fixed path:

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

An ownerless runner's identity, and the credentials it uses to authenticate, can be rotated without
redeploying. See [Rotating private runner credentials][7].

### Owned runner (Connection-based)

{{< tabs >}}
{{% tab "Linux" %}}

#### Configure the connection

If you selected `com.datadoghq.script.runPredefinedScript` in the runner's actions allowlist, you
should already have a **Script** connection linked to your runner. Otherwise, create a
connection and specify `/etc/datadog-agent/private-action-runner/script-config.yaml` as the
**path to file**. For more information, see [Handling private action credentials][4].

{{% /tab %}}
{{% tab "Windows" %}}

#### Configure the connection

If you selected `com.datadoghq.script.runPredefinedPowershellScript` in the runner's actions
allowlist, you should already have a **Script** connection linked to your runner. Otherwise, create
a new connection and specify `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml`
as the **path to file**. For more information, see [Handling private action credentials][4].

{{% /tab %}}
{{< /tabs >}}

## Standalone

A standalone runner is always owned and authorized with [Connections][2].

{{< tabs >}}
{{% tab "Docker" %}}

1. After [setting up a runner][6], navigate to **Connections**.
1. Click **New Connection** and select **Script**.
1. Enter a connection name, and in the **Private Action Runner** dropdown, select your runner.
1. Copy the credential file template into your runner's configuration directory with the commands
   you want to run.
1. In **Path to file**, confirm the file path matches the path on your runner's file system (the
   default is sufficient in most cases).
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

If you want to use tools like Python, SSH, the AWS CLI, Terraform, or the gcloud CLI, use the
`gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}-large`
image instead of the default image.

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

In your workflow or app, configure the action to use the script name you defined (for example,
`echo` or `echo-parametrized`). For Linux runners, use `runPredefinedScript`. For Windows runners,
use `runPredefinedPowershellScript`.

There are two levels of variable resolution: one at the workflow level and one at the action level
inside the runner.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/set_up_agent_based/
[2]: /actions/connections/
[3]: /actions/private_actions/execution_policies/
[4]: /actions/connections/private_action_credentials/
[5]: /actions/connections/#connection-security-considerations
[6]: /actions/private_actions/set_up_standalone/
[7]: /actions/private_actions/enroll_runner/#rotating-private-runner-credentials
