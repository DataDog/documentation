---
title: Run a Script with the Private Action Runner
description: Learn how to use the Private Action Runner to run custom scripts and automate tasks inside your private network.
---

## Overview

This page explains how to use the private action runner (PAR) to run custom scripts within your Datadog workflows and apps. The script action gives you the flexibility to execute arbitrary commands, shell scripts, and command-line tools directly from the private action runner in your private network.

Script actions are supported on:
- **Agent-based runners**: Linux (bash scripts) and Windows (PowerShell scripts) via Datadog Agent 7.77.0 or later
- **Standalone runners**: Linux containers via Docker, Docker Compose, or Kubernetes

<div class="alert alert-danger">
<strong>Security Notice:</strong> Datadog enforces container sandboxing and only accepts signed tasks, but you decide which binaries and scripts are allowed. Always review every command you add to the script action allowlist, especially ones that take dynamic user input. Ensure that your actions are configured with the least privileged commands, and carefully review the permissions you share through connections. For more information, see <a href="/actions/connections/?tab=workflowautomation#connection-security-considerations">connection security considerations</a>.
</div>

## Use cases

The following table outlines supported use cases for the script action:

| Use Case                                            | Agent-based | Standalone | Notes                                                                                                                        |
|-----------------------------------------------------|-------------|------------|------------------------------------------------------------------------------------------------------------------------------|
| Running Linux binaries (`ls`, `rm`, `find`, `curl`) | Yes         | Yes        | For standalone runners, the relevant files must be accessible to the container.          |
| Running CLIs (`aws`, `terraform`, `kubectl`)        | Yes         | Yes        | For standalone runners, the CLI and credentials must be available in the image. For agent-based runners, tools must be installed on the host.                                                       |
| Running bash scripts                                | Yes         | Yes        | For standalone runners, scripts can be mounted inside the container. Use the [large image][1] to get access to the Python interpreter. |
| Running PowerShell scripts                          | Yes (Windows) | No       | Supported on agent-based Windows runners only.                                             |
| Running privileged commands (`systemctl restart`)   | Yes         | No         | For agent-based runners, grant permissions to the runner user. For standalone runners, container sandboxing prevents privileged host access.                                         |

## Prerequisites

**For agent-based runners:**
- Datadog Agent version `7.77.0` or later
- `com.datadoghq.script.runPredefinedScript` (Linux) or `com.datadoghq.script.runPredefinedPowershellScript` (Windows) in your actions allowlist
- See [Use Private Actions][2] for installation instructions

**For standalone runners:**
- PAR version 1.7.0 or later. To create a new PAR, see [Use Private Actions][2]. To update your PAR version, see [Update the Private Action Runner][3].
- For CLI tools not included in the base or the [large image][1], create a custom Docker image.

## Configuration

{{< tabs >}}
{{% tab "Agent-based (Linux)" %}}

### Configure scripts

Edit the `/etc/datadog-agent/private-action-runner/script-config.yaml` file:

```yaml
schemaId: script-credentials-v1
runPredefinedScript:
  echo:
    command: ["echo", "Hello World!"]
  echo-parametrized:
    command: ["echo", "{{ parameters.echoValue }}"]
  aws-sts-get-caller-identity:
    command: ["aws", "sts", "get-caller-identity"]
    allowedEnvVars: ["AWS_WEB_IDENTITY_TOKEN_FILE", "AWS_ROLE_ARN", "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI", "AWS_CONTAINER_CREDENTIALS_FULL_URI", "AWS_CONTAINER_AUTHORIZATION_TOKEN", "AWS_REGION", "AWS_DEFAULT_REGION"]
  restart-service:
    command: ["sudo", "systemctl", "restart", "{{ parameters.service }}"]
```

### Grant permissions

The private action runner executes scripts as the `dd-agent` user. If your scripts require elevated permissions, grant them to the `dd-agent` user:

```bash
echo "dd-agent ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx" > /etc/sudoers.d/dd-agent
chmod 440 /etc/sudoers.d/dd-agent
```

### Configure the connection

If you selected `com.datadoghq.script.runPredefinedScript` in your action allowlist, you should already have a "script" connection linked to your runner. Otherwise, create a new connection and specify `/etc/datadog-agent/private-action-runner/script-config.yaml` as the **path to file**. For more information, see [Handling Private Action Credentials][4].

[4]: /actions/private_actions/private_action_credentials

{{% /tab %}}

{{% tab "Agent-based (Windows)" %}}

### Configure scripts

Edit the `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` file:

```yaml
schemaId: script-credentials-v1
runPredefinedPowershellScript:
  helloWorld:
    script: |
      Write-Output "Hello World!"
  greet:
    script: |
      Write-Output "Run script from workflow called {{ parameters.name }} !"
    parameterSchema:
      properties:
        name:
          type: string
      required:
        - name
  showEnv:
    script: |
      Write-Output "This vm name is $env:COMPUTERNAME"
    allowedEnvVars:
      - COMPUTERNAME
  restartService:
    script: |
      Restart-Service -Name {{ parameters.serviceName }} -Force
      Write-Output "Restart triggered for service '{{ parameters.serviceName }}' at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    parameterSchema:
      properties:
        serviceName:
          type: string
      required:
        - serviceName
```

### Grant permissions

The private action runner executes scripts as `ddagentuser`. If your scripts require access to certain resources, grant `ddagentuser` elevated permissions to these resources:

```powershell
# Grant permissions to ddagentuser to your-file-path
icacls "C:\<your-file-path>" /grant "ddagentuser:(OI)(CI)RX" /T

# Verify permissions
icacls "C:\<your-file-path>"
```

### Configure the connection

If you selected `com.datadoghq.script.runPredefinedPowershellScript` in your action allowlist, you should already have a "script" connection linked to your runner. Otherwise, create a new connection and specify `C:\ProgramData\Datadog\private-action-runner\powershell-script-config.yaml` as the **path to file**. For more information, see [Handling Private Action Credentials][4].

[4]: /actions/private_actions/private_action_credentials

{{% /tab %}}

{{% tab "Standalone (Docker)" %}}

### Create a script connection

1. After [setting up a PAR][2], navigate to [**Connections**][5].
1. Click **New Connection**.
1. Select **Script**.
1. Enter a **Connection Name**.
1. In the **Private Action Runner** dropdown, select your PAR.
1. Copy and paste the credential file template into your PAR's configuration directory with the commands you want to run.
1. In **Path to file**, ensure the file path matches the path on your runner's filesystem (the default should be sufficient in most use cases).
1. Click **Next, Confirm Access**.
1. After configuring permissions, click **Create**.
1. Select this new connection when using the script action in your workflows or apps.

### Configure scripts

Configure script actions through your runner's `config.yaml` file and the script connection (`credentials/script.yaml` by default). If you create a new runner and select the script bundle, you get a default configuration.

```yaml
# Add the script action to the allowlist (config.yaml)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (credentials/script.yaml)
schemaId: script-credentials-v1
runPredefinedScript:
  # use "echo" as the "Script name" in the action configuration
  echo:
    # use an array to specify the command
    command: ["echo", "Hello world"]

  # another script
  echo-parametrized:
    # you can use workflow syntax to retrieve values from the parameters object
    command: [ "echo", "{{ parameters.echoValue }}" ]
    # you can use JSON schema to validate the parameters
    parameterSchema:
      properties:
        echoValue:
          type: string
          const: "world"
      required:
        - echoValue
```

[2]: /actions/private_actions/use_private_actions/
[5]: /service_management/app_builder/connections/

{{% /tab %}}

{{% tab "Standalone (Kubernetes)" %}}

### Configure scripts with Helm

When deploying the private action runner with Helm, configure scripts through your `values.yaml` file:

```yaml
# values.yaml
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

## Using the configured scripts

In your workflow or app, configure the action to use the script name you defined (for example, `echo` or `echo-parametrized`). For Linux runners, use `runPredefinedScript`. For Windows runners, use `runPredefinedPowershellScript`.

**Note**: There are two levels of variable resolution: one at the workflow level and one at the action level inside the runner.

{{< img src="service_management/par-script-variables.png" alt="The two levels of variables inside the runner." style="width:80%;" >}}

## Standalone runner options

The following options are available for standalone runners only.

### Large image

If you want to use tools like [Python][6], SSH, [AWS CLI][7], [Terraform][8], or the [gcloud CLI][9], use the `gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}-large` image instead of the default image.

### Custom images

For binaries not available in Datadog provided images, create a custom image:

```dockerfile
# Dockerfile example
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
    # image: <your_custom_published_image> # if you published your image to a registry
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

```yaml
# credentials/script.yaml
schemaId: script-credentials-v1
runPredefinedScript:
  python:
    command: ["python3", "/etc/dd-action-runner-script/scripts/script.py"]
  shell:
    command: [ "bash", "/etc/dd-action-runner-script/scripts/script.sh" ]
```
```shell
# scripts/script.sh
echo "Hello from the shell script!"
```
```python
# scripts/script.py
print("Hello from Python script!")
```

[1]: /actions/private_actions/run_script/#large-image
[2]: /actions/private_actions/use_private_actions/#set-up-a-private-action-runner
[3]: /actions/private_actions/update_private_action_runner/
[4]: /actions/private_actions/private_action_credentials
[5]: https://app.datadoghq.com/actions/connections
[6]: https://www.python.org/
[7]: https://aws.amazon.com/cli/
[8]: https://developer.hashicorp.com/terraform/cli/commands
[9]: https://docs.cloud.google.com/sdk/docs/install