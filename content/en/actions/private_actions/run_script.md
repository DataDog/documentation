---
title: Run a Script with the Private Action Runner
disable_toc: false
---

## Overview

This page explains how to use the private action runner (PAR), which allows you to run custom scripts and Linux binaries within your Datadog workflows and apps. Unlike standard private actions that call specific APIs or services, the script action gives you the flexibility to execute arbitrary commands, shell scripts, and command-line tools directly from the private action runner in your private network.

<div class="alert alert-warning">
<strong>Security Notice:</strong> The PAR script action runs within a containerized environment using a dedicated Linux user named `scriptuser` for enhanced security. Datadog enforces container sandboxing and only accepts signed tasks, but you decide which binaries and scripts are allowed. Always review every command you add to the script action allow-list, especially ones that take dynamic user input. Ensure that your actions are configured with the least privileged commands, and carefully review the permissions you share through connections. For more information, see <a href="/actions/connections/?tab=workflowautomation#connection-security-considerations">connection security considerations</a>.
</div>

## Use cases

The following table outlines supported and unsupported use cases for the script action:

| Use Case                                            | Supported | Notes                                                                                                                        |
|-----------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------|
| Running Linux binaries (`ls`, `rm`, `find`, `curl`) | Yes   | In order to run native Linux binaries, the relevant files must be accessible to the container.          |
| Running CLIs (`aws`, `terraform`, `kubectl`)        | Yes   | The CLI and your CLI credentials must be added to your custom image.                                                       |
| Running scripts (`bash`, `python`)                  | Yes   | Scripts can be mounted inside the container. Interpreters such as Python must be installed on your custom image. |
| Running privileged commands (`systemctl restart`)   | No    | Because the PAR runs inside a container, it does not have high privilege permissions on the host.                                         |
| Windows tools (PowerShell)                          | No    | Because the PAR runs inside a Linux container, native Windows tools are not supported.                                             |

## Prerequisites

To use the script action, you need:

- **Custom tools**: For CLI tools not included in the base image, you need to create a custom Docker image.
- **PAR Version**: 1.7.0 or later. To create a new PAR, see [Set Up a Private Action Runner][2]. To update your PAR version, see [Update the Private Action Runner][11].

## Set up a PAR script

### Create a script connection

1. Navigate to the **Private Action Runner** page in [Workflow Automation][4] or [App Builder][5].
1. Create a new script connection and associate it with your private action runner.
1. Select this connection when using the script action in your workflows or apps.

### Configure the action catalog

Navigate to the Action Catalog and select [**Run Predefined Script**][10]. This action is available for use in both workflows and apps.

## Configuration

Configure script actions through your runner's `config.yaml` file. If you create a new runner and select the script bundle, you get a default configuration.

### Basic configuration

```yaml
# Add the script action to the allowlist
actionsAllowlist:
  - com.datadoghq.script.runPredefinedScript

# Configure different scripts
bundles:
  "com.datadoghq.script":
    runPredefinedScript:
      echo:
        command: ["echo", "Hello world"]
      # Use workflow-like syntax to retrieve values from parameters
      echo-parametrized:
        command: ["echo", "{{ parameters.echoValue }}"]
      echo-nested-parametrized:
        command: ["echo", "{{ parameters.nested.echoValue }}"]
```

### Using the configured scripts

In your workflow or app, configure the action to use the `runPredefinedScript` with the script name you defined (for example, `echo` or `echo-parametrized`).

**Note**: There are two levels of variable resolution: one at the workflow level and one at the action level inside the runner.

## Advanced usage with custom images

For binaries not available in the base runner image, create a custom image:

```dockerfile
# Dockerfile example
FROM gcr.io/datadoghq/private-action-runner:v1.7.0
RUN apt update && apt install -y python3
```

You can mount complex scripts inside the runner:

```yaml
# docker-compose example
services:
  runner:
    image: gcr.io/datadoghq/private-action-runner:v1.7.0
    volumes:
      - "./config:/etc/dd-action-runner/config"
      - "./scripts:/etc/dd-action-runner-script/scripts:ro"
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

[1]: /actions/private_actions/use_private_actions/?tab=docker#supported-private-actions
[2]: /actions/private_actions/use_private_actions/#set-up-a-private-action-runner
[3]: https://hub.docker.com/r/datadog/private-action-runner-dev
[4]: https://app.datadoghq.com/workflow/
[5]: https://app.datadoghq.com/app-builder/
[6]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image
[7]: https://app.datadoghq.com/organization-settings/remote-config?resource_type=agents
[8]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml
[10]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.script.runPredefinedScript
[11]: /actions/private_actions/update_PAR/