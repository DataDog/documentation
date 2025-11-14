---
title: Run a Script with the Private Action Runner
disable_toc: false
---

## Overview

This page explains how to use the private action runner (PAR), which allows you to run custom scripts and Linux binaries within your Datadog workflows and apps. Unlike standard private actions that call specific APIs or services, the script action gives you the flexibility to execute arbitrary commands, shell scripts, and command-line tools directly from the private action runner in your private network.

<div class="alert alert-danger">
<strong>Security Notice:</strong> The PAR script action runs within a containerized environment using a dedicated Linux user named <code>scriptuser</code> for enhanced security. Datadog enforces container sandboxing and only accepts signed tasks, but you decide which binaries and scripts are allowed. Always review every command you add to the script action allow-list, especially ones that take dynamic user input. Ensure that your actions are configured with the least privileged commands, and carefully review the permissions you share through connections. For more information, see <a href="/actions/connections/?tab=workflowautomation#connection-security-considerations">connection security considerations</a>.
</div>

## Use cases

The following table outlines supported and unsupported use cases for the script action:

| Use Case                                            | Supported | Notes                                                                                                                        |
|-----------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------|
| Running Linux binaries (`ls`, `rm`, `find`, `curl`) | Yes   | In order to run native Linux binaries, the relevant files must be accessible to the container.          |
| Running CLIs (`aws`, `terraform`, `kubectl`)        | Yes   | The CLI and your CLI credentials must be available in the image.                                                       |
| Running scripts (`bash`, `python`)                  | Yes   | Scripts can be mounted inside the container. Use the [large image][12] to get access to the python interpreter. |
| Running privileged commands (`systemctl restart`)   | No    | Because the PAR runs inside a container, it does not have high privilege permissions on the host.                                         |
| Windows tools (PowerShell)                          | No    | Because the PAR runs inside a Linux container, native Windows tools are not supported.                                             |

## Prerequisites

To use the script action, you need:

- **Custom tools**: For CLI tools not included in the base or the [large image][12], you need to create a custom Docker image.
- **PAR Version**: 1.7.0 or later. To create a new PAR, see [Set Up a Private Action Runner][2]. To update your PAR version, see [Update the Private Action Runner][11].

## Set up a PAR script

### Create a script connection

1. After [setting up a PAR][1], navigate to [**Connections**][2].
1. Click **New Connection**.
1. Select **Script**.
1. Enter a **Connection Name**.
1. In the **Private Action Runner** dropdown, select your PAR. 
1. Copy and paste the credential file template into your PAR's configuration directory with the commands you want to run. 
1. In **Path to file**, ensure the file path matches the path on your runner's filesystem (the default should be sufficient in most use cases).
1. Click **Next, Confirm Access**. 
1. After configuring permissions, click **Create**.
1. Select this new connection when using the script action in your workflows or apps.

## Configuration

Configure script actions through your runner's `config.yaml` file and the script connection (`credentials/script.yaml` by default). If you create a new runner and select the script bundle, you get a default configuration.

```yaml
# Add the script action to the allowlist (`config.yaml`)
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript
```

```yaml
# Configure your script connection (`credentials/script.yaml`)
schemaId: script-credentials-v1
runPredefinedScript:
  # use "echo" as the "Script name" in the action configuration
  echo:
    # use an array to specify the command
    command: ["echo", "Hello world"]

  # another script
  echo-parametrized:
    # you can use workflow syntax (https://docs.datadoghq.com/actions/workflows/variables/) to retrieve values from the parameters object
    command: [ "echo", "{{ parameters.echoValue }}" ]
    # you can use JSON schema (https://json-schema.org/) to validate the parameters
    parameterSchema:
      properties:
        echoValue:
          type: string
          const: "world"
      required:
        - echoValue
```

### Using the configured scripts

In your workflow or app, configure the action to use the `runPredefinedScript` with the script name you defined (for example, `echo` or `echo-parametrized`).

**Note**: There are two levels of variable resolution: one at the workflow level and one at the action level inside the runner.

{{< img src="service_management/par-script-variables.png" alt="The two levels of variables inside the runner." style="width:80%;" >}}

## Large image

If you want to use tools like [Python](https://www.python.org/), SSH, [AWS CLI](https://aws.amazon.com/cli/), [Terraform](https://developer.hashicorp.com/terraform/cli/commands) or the [gcloud CLI](https://docs.cloud.google.com/sdk/docs/install) you can use the `gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}-large` image instead of the default image.

## Advanced usage with custom images

For binaries not available in Datadog provided images, create a custom image:

```dockerfile
# Dockerfile example
FROM gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
USER root
# Change this to install the tool of your choice
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

[1]: /actions/private_actions/use_private_actions/#set-up-a-private-action-runner
[2]: https://app.datadoghq.com/actions/connections
[3]: https://hub.docker.com/r/datadog/private-action-runner-dev
[4]: https://app.datadoghq.com/workflow/
[5]: https://app.datadoghq.com/app-builder/
[6]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image
[7]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[8]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[10]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.script.runPredefinedScript
[11]: /actions/private_actions/update_private_action_runner/
[12]: /actions/private_actions/run_script/#large-image