---
title: Installation
kind: Documentation
aliases:
    - /observability_pipelines/setup/
further_reading:
  - link: /observability_pipelines/production_deployment_overview/
    tag: Documentation
    text: Taking the Worker to production environments
---

{{< tabs >}}
{{% tab "Linux" %}}

## Overview

Install the Observability Pipelines Worker with the [Advanced Package Tool][1] (APT), a free package manager that handles the installation and removal of software on [Debian][2], [Ubuntu][3], and other [Linux][4] distributions.

## Prerequisites

Before installing, make sure you:

1. Are using one of the supported Linux Archs: x86_64 or AMD64
2. Have a valid [Datadog API key][5].
3. Have an Observability Pipelines Configuration ID.

## Installation

<!-- ### Automatic

Datadog provides a script that runs the necessary steps to install the Worker. Use the following command to run the script, replacing `DD_API_KEY` with your Datadog API key:

```
$ DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_observability_pipelines_worker.sh)"
``` -->

### Manual

1. Run the following commands to set up APT to download through HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Run the following commands to update your local `apt` repo and install the Worker:

    ```
    sudo apt-get update
    sudo apt-get install datadog-observability-pipelines-worker datadog-signing-keys
    ```

4. Start the Worker:

    ```
    DD_API_KEY= DD_OP_CONFIG_KEY= datadog-observability-pipelines-worker 
    ```

<!--

## Commands

| Description                       | Command                                                       |
| --------------------------------- | ------------------------------------------------------------- |
| Start the Worker                  | `sudo service datadog-observability-pipelines-worker start`   |
| Stop the Worker                   | `sudo service datadog-observability-pipelines-worker stop`    |
| Restart the Worker                | `sudo service datadog-observability-pipelines-worker restart` |
| Status of the Worker              | `sudo service datadog-observability-pipelines-worker status`  |
| Status page of the running Worker | `sudo datadog-observability-pipelines-worker status`          |
| Display command usage             | `sudo datadog-observability-pipelines-worker --help`          |
| Uninstall the Worker              | `sudo apt remove datadog-observability-pipelines-worker`      |

-->

## Configuration

- The configuration file for the Worker is located at `/etc/datadog-observability-pipelines-worker/observability-pipelines-worker.yaml`.
- See Configuration Reference for all configuration options.
- See [Working with Data][6] and Configuration Reference for configuration examples.

[1]: https://en.wikipedia.org/wiki/APT_%28software%29
[2]: https://debian.org/
[3]: https://ubuntu.com/
[4]: https://linux.org/
[5]: /account_management/api-app-keys/#api-keys
[6]: /observability_pipelines/working_with_data/

{{% /tab %}}
{{% tab "Helm" %}}

## Overview

Install the Observability Pipelines Worker in your Kubernetes environment with Helm Chart.

## Prerequisites

Before installing, make sure you have:

1. Kubernetes version 1.15.0-0 or above.
2. [Helm][1] for deploying the datadog-operator.
3. [Kubectl CLI][2] for installing the datadog-agent.
4. A valid [Datadog API key][3].
5. An Observability Pipelines Configuration ID.

## Installation

1. Run the following commands to add Datadog Observability Pipelines Worker repository to your Helm repositories: 

    ```
    $ helm repo add datadog https://helm.datadoghq.com
    $ helm repo update
    ```

2. Install the [Observability Pipelines Worker][4]:

    ```
    $ helm install opw datadog/observability-pipelines-worker
    ```

    If you want to install the chart with a specific release name, run the following command, replacing <RELEASE_NAME> with the specific release name:

    ```
    $ helm install --name <RELEASE_NAME> \
        --set datadog.apiKey=<DD_API_KEY> \
        --set datadog.configKey=<DD_OP_CONFIG_KEY> \
        datadog/observability-pipelines-worker
    ```

    You can set your Datadog site using the `datadog.site` option.

    ```
    $ helm install --name <RELEASE_NAME> \
        --set datadog.apiKey=<DD_API_KEY> \
        --set datadog.configKey=<DD_OP_CONFIG_KEY> \
        datadog/observability-pipelines-worker
    ```

    By default, this chart creates Secrets for your Observability Pipelines API and configuration keys. However, you can use manually created Secrets by setting the `datadog.apiKeyExistingSecret` and/or `datadog.appKeyExistingSecret` values. See the next step on how to create a Secret.

    **Note**: Make sure to name the key fields `api-key` and `config-key` when you create the Secret(s).

    After a few minutes, you should see your new pipeline active in Datadog.

3. Create and provide a Secret that contains your Datadog API and Configuration Keys. To create a Secret that contains your Datadog API key, replace the `<DATADOG_API_KEY>` below with the Datadog API key for your organization. This Secret is used in the manifest to deploy the Observability Pipelines Worker.

    ```
    export DATADOG_SECRET_NAME=datadog-secrets
    kubectl create secret generic $DATADOG_SECRET_NAME \
        --from-literal api-key="<DD_API_KEY>" \
        --from-literal config-key="<DD_OP_CONFIG_KEY>"
    ```

    **Note**: This creates a Secret in the default namespace. If you are using a custom namespace, update the namespace flag of the command before running it.

    The following installation command references the Secret:

    ```
    helm install --name <RELEASE_NAME> \
        --set datadog.apiKeyExistingSecret=$DATADOG_SECRET_NAME \
        --set datadog.configKeyExistingSecret=$DATADOG_SECRET_NAME \
        datadog/observability-pipelines-worker
    ```

## Values

See [this table][5] for the the list of values.

[1]: https://helm.sh/ 
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://artifacthub.io/packages/helm/datadog/observability-pipelines-worker
[5]: https://github.com/DataDog/helm-charts/tree/main/charts/observability-pipelines-worker#values

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

