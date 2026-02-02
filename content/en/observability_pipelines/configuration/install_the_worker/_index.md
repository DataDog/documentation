---
title: Install the Worker
disable_toc: false
aliases:
    - /observability_pipelines/install_the_worker/
further_reading:
- link: "/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/"
  tag: "Documentation"
  text: "Advanced Worker configurations"
- link: "/observability_pipelines/monitoring_and_troubleshooting/worker_cli_commands/"
  tag: "Documentation"
  text: "Worker CLI commands"
- link: "/observability_pipelines/guide/environment_variables/"
  tag: "Documentation"
  text: "Environment variable for sources, processors, and components"
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
---

## Overview

The Observability Pipelines Worker is software that runs in your environment to centrally aggregate and process your logs and metrics ({{< tooltip glossary="preview" case="title" >}}), and then route them to different destinations.

**Note**: If you are using a proxy, see the `proxy` option in [Bootstrap options][1].

## Install the Worker

If you set up your pipeline using the [API][6] or [Terraform][8], see [API or Terraform pipeline setup](#api-or-terraform-pipeline-setup) on how to install the Worker.

If you set up your pipeline in the UI, see [Pipelines UI setup](#pipeline-ui-setup) on how to install the Worker.

### API or Terraform pipeline setup

After setting up your pipeline using the API or Terraform, follow the instructions below to install the Worker for your platform.

{{< tabs >}}
{{% tab "Docker" %}}

Run the below command to install the Worker.

```shell
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<DATADOG_SITE> \
    -e <SOURCE_ENV_VARIABLE> \
    -e <DESTINATION_ENV_VARIABLE> \
    -p 8088:8088 \
    datadog/observability-pipelines-worker run
```

You must replace the placeholders with the following values:
- `<DATADOG_API_KEY>`: Your Datadog API.
    - **Note**: The API key must be [enabled for Remote Configuration][1].
- `<PIPELINE_ID>`: The ID of your pipeline.
- `<DATADOG_SITE>`: The [Datadog site][2].
- `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
    - For example: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - See [Environment Variables][3] for a list of source environment variables.
- `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
    - For example: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - See [Environment Variables][3] for a list of destination environment variables.

**Note**: By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker's container port to a different port on the Docker host, use the `-p | --publish` option in the command:
```
-p 8282:8088 datadog/observability-pipelines-worker run
```

See [Update Existing Pipelines][3] if you want to make changes to your pipeline's configuration.

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /getting_started/site/
[3]: /observability_pipelines/environment_variables/

{{% /tab %}}
{{% tab "Kubernetes" %}}

The Observability Pipelines Worker supports all major Kubernetes distributions, such as:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat Openshift
- Rancher

1. Download the [Helm chart values file][1]. See the [full list of configuration options][5] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
1. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to ensure it is up to date:
    ```shell
    helm repo update
    ```
1. Run the below command to install the Worker.

    ```shell
    helm upgrade --install opw \
	-f values.yaml \
	--set datadog.apiKey=<DATADOG_API_KEY> \
	--set datadog.pipelineId=<PIPELINE_ID> \
	--set <SOURCE_ENV_VARIABLES> \
	--set <DESTINATION_ENV_VARIABLES> \
	--set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
	datadog/observability-pipelines-worker
    ```

    You must replace the placeholders with the following values:

    - `<DATADOG_API_KEY>`: Your Datadog API.
        - **Note**: The API key must be [enabled for Remote Configuration][3].
    - `<PIPELINE_ID>`: The ID of your pipeline.
    - `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
        - For example: `--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0' \`
        - See [Environment Variables][4] for a list of source environment variables.
    - `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
        - For example: `--set env[1].name=DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL,env[2].value='https://hec.splunkcloud.com:8088' \`
        - See [Environment Variables][4] for a list of destination environment variables.

    **Note**: By default, the Kubernetes Service maps incoming port `<SERVICE_PORT>` to the port the Worker is listening on (`<TARGET_PORT>`). If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:

    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```

See [Update Existing Pipelines][5] if you want to make changes to your pipeline's configuration.

**Note**: If you enable [disk buffering][6] for destinations, you must enable Kubernetes [persistent volumes][7] in the Observability Pipelines helm chart.

#### Self-hosted and self-managed Kubernetes clusters

If you are running a self-hosted and self-managed Kubernetes cluster, and defined zones with node labels using `topology.kubernetes.io/zone`, then you can use the Helm chart values file as is. However, if you are not using the label `topology.kubernetes.io/zone`, you need to update the `topologyKey` in the `values.yaml` file to match the key you are using. Or if you run your Kubernetes install without zones, remove the entire `topology.kubernetes.io/zone` section.

[1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[2]: /observability_pipelines/configuration/update_existing_pipelines
[3]: https://app.datadoghq.com/organization-settings/remote-config/setup
[4]: /observability_pipelines/environment_variables/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[6]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L278

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-warning">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

Follow the steps below if you want to use the one-line installation script to install the Worker. Otherwise, see [Manually install the Worker on Linux](#manually-install-the-worker-on-linux).

Run the one-step command below to install the Worker.

```bash
DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLE> <DESTINATION_ENV_VARIABLE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
```

You must replace the placeholders with the following values:

- `<DATADOG_API_KEY>`: Your Datadog API.
    - **Note**: The API key must be [enabled for Remote Configuration][1].
- `<PIPELINE_ID>`: The ID of your pipeline.
- `<DATADOG_SITE>`: The [Datadog site][2].
- `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
    - For example: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - See [Environment Variables][3] for a list of source environment variables.
- `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
    - For example: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - See [Environment Variables][3] for a list of destination environment variables.

**Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

See [Update Existing Pipelines][4] if you want to make changes to your pipeline's configuration.

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /getting_started/site/
[3]: /observability_pipelines/environment_variables/
[4]: /observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{% tab "CloudFormation" %}}

1. Select one of the options in the dropdown to provide the expected log or metrics ({{< tooltip glossary="preview" case="title" >}}) volume for the pipeline:
|   Option   | Description |
| ---------- | ----------- |
| Unsure | Use this option if you are not able to project the data volume or you want to test the Worker. This option provisions the EC2 Auto Scaling group with a maximum of 2 general purpose `t4g.large` instances. |
| 1-5 TB/day | This option provisions the EC2 Auto Scaling group with a maximum of 2 compute optimized instances `c6g.large`. |
| 5-10 TB/day | This option provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 5 compute optimized `c6g.large` instances. |
| >10 TB/day | Datadog recommends this option for large-scale production deployments. It provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 10 compute optimized `c6g.xlarge` instances. |

    **Note**: All other parameters are set to reasonable defaults for a Worker deployment, but you can adjust them for your use case as needed in the AWS Console before creating the stack.
1. Select the AWS region you want to use to install the Worker.
1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][1].
1. Click **Launch CloudFormation Template** to navigate to the AWS Console to review the stack configuration and then launch it. Make sure the CloudFormation parameters are as expected.
1. Select the VPC and subnet you want to use to install the Worker.
1. Review and check the necessary permissions checkboxes for IAM. Click **Submit** to create the stack. CloudFormation handles the installation at this point; the Worker instances are launched, the necessary software is downloaded, and the Worker starts automatically.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/configuration/update_existing_pipelines/

{{% /tab %}}
{{< /tabs >}}

### Pipeline UI setup

{{< img src="observability_pipelines/install_page.png" alt="The install page in the UI with a dropdown menu to choose your installation platform and fields to enter environment variables" style="width:100%;" >}}

After you set up your source, destinations, and processors on the Build page of the pipeline UI, follow the steps on the Install page to install the Worker.

1. Select the platform on which you want to install the Worker.
1. Enter the [environment variables][7] for your sources and destinations, if applicable.
1. Follow the instructions on installing the Worker for your platform. The command provided in the UI to install the Worker has the relevant environment variables populated.

{{< tabs >}}
{{% tab "Docker" %}}

1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][1].
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
    **Note**: By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker's container port to a different port on the Docker host, use the `-p | --publish` option in the command:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][2] if you want to make changes to your pipeline's configuration.

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /observability_pipelines/configuration/update_existing_pipelines/

{{% /tab %}}
{{% tab "Kubernetes" %}}

The Observability Pipelines Worker supports all major Kubernetes distributions, such as:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat Openshift
- Rancher

1. Download the [Helm chart values file][1]. See the [full list of configuration options][3] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][4].
1. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to make sure it is up to date:
    ```shell
    helm repo update
    ```
 1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    helm upgrade --install opw \
	-f values.yaml \
	--set datadog.apiKey=<DATADOG_API_KEY> \
	--set datadog.pipelineId=<PIPELINE_ID> \
	--set <SOURCE_ENV_VARIABLES> \
	--set <DESTINATION_ENV_VARIABLES> \
	--set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
	datadog/observability-pipelines-worker
    ```
    **Note**: By default, the Kubernetes Service maps incoming port `<SERVICE_PORT>` to the port the Worker is listening on (`<TARGET_PORT>`). If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][2] if you want to make changes to your pipeline's configuration.

**Note**: If you enable [disk buffering][5] for destinations, you must enable Kubernetes [persistent volumes][6] in the Observability Pipelines helm chart .

#### Self-hosted and self-managed Kubernetes clusters

If you are running a self-hosted and self-managed Kubernetes cluster, and defined zones with node labels using `topology.kubernetes.io/zone`, then you can use the Helm chart values file as is. However, if you are not using the label `topology.kubernetes.io/zone`, you need to update the `topologyKey` in the `values.yaml` file to match the key you are using. Or if you run your Kubernetes install without zones, remove the entire `topology.kubernetes.io/zone` section.

[1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[2]: /observability_pipelines/configuration/update_existing_pipelines/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[4]: https://app.datadoghq.com/organization-settings/remote-config/setup
[5]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior
[6]: https://github.com/DataDog/helm-charts/blob/23624b6e49eef98e84b21689672bb63a7a5df48b/charts/observability-pipelines-worker/values.yaml#L268

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-danger">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

Follow the steps below if you want to use the one-line installation script to install the Worker. Otherwise, see [Manually install the Worker on Linux](#manually-install-the-worker-on-linux).

1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][2].
1. Run the one-step command provided in the UI to install the Worker.

    **Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/configuration/update_existing_pipelines
[2]: https://app.datadoghq.com/organization-settings/remote-config/setup

{{% /tab %}}
{{% tab "ECS Fargate" %}}

See [Set Up the Worker in ECS Fargate][1] for instructions.

[1]: /observability_pipelines/guide/set_up_the_worker_in_ecs_fargate/

{{% /tab %}}
{{% tab "CloudFormation" %}}

1. Select one of the options in the dropdown to provide the expected log or metrics (in Preview) volume for the pipeline:
|   Option   | Description |
| ---------- | ----------- |
| Unsure | Use this option if you are not able to project the data volume or you want to test the Worker. This option provisions the EC2 Auto Scaling group with a maximum of 2 general purpose `t4g.large` instances. |
| 1-5 TB/day | This option provisions the EC2 Auto Scaling group with a maximum of 2 compute optimized instances `c6g.large`. |
| 5-10 TB/day | This option provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 5 compute optimized `c6g.large` instances. |
| >10 TB/day | Datadog recommends this option for large-scale production deployments. It provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 10 compute optimized `c6g.xlarge` instances. |

    **Note**: All other parameters are set to reasonable defaults for a Worker deployment, but you can adjust them for your use case as needed in the AWS Console before creating the stack.
1. Select the AWS region you want to use to install the Worker.
1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][2].
1. Click **Launch CloudFormation Template** to navigate to the AWS Console to review the stack configuration and then launch it. Make sure the CloudFormation parameters are as expected.
1. Select the VPC and subnet you want to use to install the Worker.
1. Review and check the necessary permissions checkboxes for IAM. Click **Submit** to create the stack. CloudFormation handles the installation at this point; the Worker instances are launched, the necessary software is downloaded, and the Worker starts automatically.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/configuration/update_existing_pipelines/
[2]: https://app.datadoghq.com/organization-settings/remote-config/setup

{{% /tab %}}
{{< /tabs >}}

### Manually install the Worker on Linux

If you prefer not to use the one-line installation script for Linux, follow these step-by-step instructions:

{{< tabs >}}
{{% tab "APT" %}}

1. Set up APT transport for downloading using HTTPS:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. Run the following commands to update your local `apt` repo and install the Worker:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

**Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{% tab "RPM" %}}

<div class="alert alert-danger">For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.</div>

1. Set up the Datadog `rpm` repo on your system with the below command.<br>**Note**: If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration below.
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. Update your packages and install the Worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

**Note**: The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

[1]: /observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

## Upgrade the Worker

To upgrade the Worker to the latest version, run the following command:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

```
sudo yum install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{< /tabs >}}


## Uninstall the Worker

If you want to uninstall the Worker, run the following commands:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get remove --purge observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

1.
    ```
    yum remove observability-pipelines-worker
    ```
1.
    ```
    rpm -q --configfiles observability-pipelines-worker
    ```

{{% /tab %}}
{{< /tabs >}}

## Index your Worker logs

Make sure your Worker logs are [indexed][9] in Log Management for optimal functionality. The logs provide deployment information, such as Worker status, version, and any errors, that is shown in the UI. The logs are also helpful for troubleshooting Worker or pipelines issues. All Worker logs have the tag `source:op_worker`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[2]: /observability_pipelines/sources/
[3]: /observability_pipelines/destinations/
[4]: /observability_pipelines/processors/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /observability_pipelines/guide/environment_variables/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[9]: /logs/log_configuration/indexes/
