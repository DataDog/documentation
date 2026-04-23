---
title: Install the Worker
disable_toc: false
aliases:
    - /observability_pipelines/install_the_worker/
further_reading:
- link: "/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/"
  tag: "Documentation"
  text: "Advanced Worker configurations"
- link: "/observability_pipelines/configuration/secrets_management/"
  tag: "Documentation"
  text: "Learn more about Secrets Management in Observability Pipelines"
- link: "/observability_pipelines/monitoring_and_troubleshooting/worker_cli_commands/"
  tag: "Documentation"
  text: "Worker CLI commands"
- link: "/observability_pipelines/guide/environment_variables/"
  tag: "Documentation"
  text: "Environment variable for sources, processors, and components"
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
content_filters:
  - trait_id: interface
    option_group_id: op_pipelines_setup_method_options
    label: "Pipeline setup method"
  - trait_id: platform
    option_group_id: op_platform_options
    label: "Platform"
  - trait_id: secrets_source
    option_group_id: op_secrets_source_options
    label: "Secrets retrieval method"
---

## Overview

The Observability Pipelines Worker is software that runs in your environment to centrally aggregate and process your logs and metrics ({% glossary-tooltip term="preview" case="title" /%}), and then route them to different destinations.

{% if equals($platform, "kubernetes") %}
The Observability Pipelines Worker supports all major Kubernetes distributions, such as:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat Openshift
- Rancher
{% /if %}

See [Set Up the Worker in ECS Fargate][ecs-1] for instructions on how to configure the Worker in ECS Fargate.

**Note**: If you are using a proxy, see the `proxy` option in [Bootstrap options][1].

<!-- API or Terraform -->
{% if includes($interface, ["api","terraform"]) %}

## Install the Worker
<!-- Docker -->
{% if equals($platform, "docker") %}
{% if equals($secrets_source, "secrets_manager") %}
Run this command to install the Worker:
```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<DATADOG_SITE> \
    -v /path/to/local/bootstrap.yaml:/etc/observability-pipelines-worker/bootstrap.yaml \
    datadog/observability-pipelines-worker run
```

{% /if %}
{% if equals($secrets_source, "environment_variables") %}

Run this command to install the Worker:
```shell
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<DATADOG_SITE> \
    -e <SOURCE_ENV_VARIABLE> \
    -e <DESTINATION_ENV_VARIABLE> \
    -p 8088:8088 \
    datadog/observability-pipelines-worker run
```
{% /if %}
You must replace the placeholders with the following values, if applicable:
- `<DATADOG_API_KEY>`: Your Datadog API key.
    - **Note**: The API key must be [enabled for Remote Configuration][docker-api-tf-1].
- `<PIPELINE_ID>`: The ID of your pipeline.
- `<DATADOG_SITE>`: The [Datadog site][docker-api-tf-2].
- `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
    - For example: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - See [Environment Variables][3] for a list of source environment variables.
- `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
    - For example: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - See [Environment Variables][docker-api-tf-3] for a list of destination environment variables.

**Notes**:
- By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker's container port to a different port on the Docker host, use the `-p | --publish` option in the command:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
- Use the `VECTOR_HOSTNAME` environment variable to assign a unique hostname and help you identify the Worker.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

<!-- Docker - secrets_management -->
{% if equals($secrets_source, "secrets_manager") %}
### Connect the Worker to your secrets manager

1. Modify the Worker bootstrap file to connect the Worker to your secrets manager. See [Secrets Management][docker-api-tf-4] for more information.
1. Restart the Worker to use the updated bootstrap file:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```
{% /if %}
See [Update Existing Pipelines][docker-api-tf-5] if you want to make changes to your pipeline's configuration.

{% /if %}

<!-- Kubernetes -->
{% if equals($platform, "kubernetes") %}

1. Download the [Helm chart values file][k8s-api-tf-1]. See the [full list of configuration options][k8s-api-tf-5] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
1. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to ensure it is up to date:
    ```shell
    helm repo update
    ```

<!-- Kubernetes - secrets_management -->
{% if equals($secrets_source, "secrets_manager") %}

3. See [Secrets Management][k8s-api-tf-8] on how to configure your `values.yaml` file for your secrets manager.
4. Run this command to install the Worker:
    ```shell
    helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    datadog/observability-pipelines-worker
    ```
{% /if %}

<!-- Kubernetes - environment variables -->
{% if equals($secrets_source, "environment_variables") %}
3. Run this command to install the Worker:

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
        - **Note**: The API key must be [enabled for Remote Configuration][k8s-api-tf-3].
    - `<PIPELINE_ID>`: The ID of your pipeline.
    - `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
        - For example: `--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0' \`
        - See [Environment Variables][k8s-api-tf-4] for a list of source environment variables.
    - `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
        - For example: `--set env[1].name=DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL,env[1].value='https://hec.splunkcloud.com:8088' \`
        - See [Environment Variables][k8s-api-tf-4] for a list of destination environment variables.

    By default, the Kubernetes Service maps incoming port `<SERVICE_PORT>` to the port the Worker is listening on (`<TARGET_PORT>`). If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
{% /if %}
{% /if %}

<!-- Linux -->
{% if equals($platform, "linux") %}

{% alert level="warning" %}
For RHEL and CentOS, the Observability Pipelines Worker supports versions 8.0 or later.
{% /alert %}

Follow the steps below if you want to use the one-line installation script to install the Worker. Otherwise, see [Manually install the Worker](#manually-install-the-worker).

<!-- Linux - secrets_management -->

{% if equals($secrets_source, "secrets_manager") %}
1. Run this one-step command to install the Worker.
    ```bash
    DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
    ```
    You must replace the placeholders with the following values:
    - `<DATADOG_API_KEY>`: Your Datadog API key.
        - **Note**: The API key must be [enabled for Remote Configuration][linux-1].
    - `<PIPELINE_ID>`: The ID of your pipeline.
    - `<DATADOG_SITE>`: The [Datadog site][linux-2].
1. Modify the Worker bootstrap file to connect the Worker to your secrets manager. See [Secrets Management][linux-5] for more information.
1. Restart the Worker to use the updated bootstrap file:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

{% /if %}

<!-- Linux - environment_variables -->

{% if equals($secrets_source, "environment_variables") %}

Run this one-step command to install the Worker:
```bash
DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLE> <DESTINATION_ENV_VARIABLE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
```
You must replace the placeholders with the following values:
- `<DATADOG_API_KEY>`: Your Datadog API key.
    - **Note**: The API key must be [enabled for Remote Configuration][linux-1].
- `<PIPELINE_ID>`: The ID of your pipeline.
- `<DATADOG_SITE>`: The [Datadog site][linux-2].
- `<SOURCE_ENV_VARIABLE>`: The environment variables required by the source you are using for your pipeline.
    - For example: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - See [Environment Variables][linux-3] for a list of source environment variables.
- `<DESTINATION_ENV_VARIABLE>`: The environment variables required by the destinations you are using for your pipeline.
    - For example: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - See [Environment Variables][linux-3] for a list of destination environment variables.
**Notes**:
- The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

See [Update Existing Pipelines][linux-4] if you want to make changes to your pipeline's configuration.

{% /if %}
{% /if %}

<!-- Cloudformation -->
{% if equals($platform, "cloudformation") %}

1. Select one of the options in the dropdown to provide the expected log or metrics ({% glossary-tooltip term="preview" case="title" /%}) volume for the pipeline:
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

**Note**: See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

See [Update Existing Pipelines][linux-4] if you want to make changes to your pipeline's configuration.

[linux-4]: /observability_pipelines/configuration/update_existing_pipelines/

{% /if %}
{% /if %}

<!-- UI -->

{% if equals($interface, "ui") %}

## Install the Worker

{% img src="observability_pipelines/install_page_secrets.png"
alt="The install page in the UI with a dropdown menu to choose your installation platform and fields to enter environment variables"
style="width:100%;" /%}

After you set up your source, destinations, and processors on the Build page of the pipeline UI, follow the steps on the Install page to install the Worker.

<!-- UI - Docker -->
{% if equals($platform, "docker") %}

1. Select **Docker** as your installation platform.
{% if equals($secrets_source, "secrets_manager") %}
2. In **Review your secrets management**, ensure that your secrets are configured in your secrets manager.
{% /if %}
{% if equals($secrets_source, "environment_variables") %}
2. In **Review your secrets management**, enter the [environment variables][7] for your sources and destinations, if applicable.
{% /if %}
3. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][docker-ui-1].

{% if equals($secrets_source, "secrets_manager") %}

4. Run the command provided in the UI to install the Worker. The command points to the Worker bootstrap file that you configure to resolve secrets using your secrets manager.

5. Modify the Worker bootstrap file to connect the Worker to your secrets manager. See [Secrets Management][docker-ui-3] for more information.

6. Restart the Worker to use the updated bootstrap file:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

7. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{% /if %}

{% if equals($secrets_source, "environment_variables") %}
4. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.

5. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{% /if %}

**Notes**:
- By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker's container port to a different port on the Docker host, use the `-p | --publish` option in the command:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
- Use the `VECTOR_HOSTNAME` environment variable to assign a unique hostname and help you identify the Worker.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

See [Update Existing Pipelines][docker-ui-2] if you want to make changes to your pipeline's configuration.
{% /if %}

<!-- UI - Kubernetes -->

{% if equals($platform, "kubernetes") %}

1. Select **Kubernetes** as your installation platform.
{% if equals($secrets_source, "secrets_manager") %}
2. In **Review your secrets management**, ensure that your secrets are configured in your secrets manager.
{% /if %}
{% if equals($secrets_source, "environment_variables") %}
2. In **Review your secrets management**, enter the [environment variables][7] for your sources and destinations, if applicable.
{% /if %}
3. Download the [Helm chart values file][k8s-ui-1]. See the [full list of configuration options][k8s-ui-3] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
4. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][k8s-ui-4].
5. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to make sure it is up to date:
    ```shell
    helm repo update
    ```
{% if equals($secrets_source, "secrets_manager") %}
6. See [Secrets Management][k8s-ui-7] on how to configure your `values.yaml` file for your secrets manager.
7. Run this command to install the Worker:
    ```shell
    helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    datadog/observability-pipelines-worker
    ```

8. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{% /if %}
{% if equals($secrets_source, "environment_variables") %}

6. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
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
7. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{% /if %}
{% /if %}

<!-- UI - Linux -->
{% if equals($platform, "linux") %}

The steps below use the one-line installation script to install the Worker. 

1. Select **Linux** as your installation platform.
{% if equals($secrets_source, "secrets_manager") %}
2. In **Review your secrets management**, ensure that your secrets are configured in your secrets manager.
{% /if %}
{% if equals($secrets_source, "environment_variables") %}

2. In **Review your secrets management**, enter the [environment variables][7] for your sources and destinations, if applicable.
{% /if %}
3. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][linux-ui-2].

4. Run the one-step command provided in the UI to install the Worker. If you want to manually install the Worker, see [Manually install the Worker](#manually-install-the-worker).

{% if equals($secrets_source, "secrets_manager") %}
5. If you are using **Secrets Management**:
    1. Modify the Worker bootstrap file to connect the Worker to your secrets manager. See [Secrets Management][linux-ui-3] for more information.
    1. Restart the Worker to use the updated bootstrap file:
        ```
        sudo systemctl restart observability-pipelines-worker
        ```
6. Navigate back to the Observability Pipelines installation page and click **Deploy**.

{% /if %}

{% if equals($secrets_source, "environment_variables") %}

5. Navigate back to the Observability Pipelines installation page and click **Deploy**.

**Notes**:
- The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.
{% /if %}

See [Update Existing Pipelines][linux-ui-1] if you want to make changes to your pipeline's configuration.

{% /if %}

<!-- UI - Cloudformation -->
{% if equals($platform, "cloudformation") %}


1. Select **Cloudformation** as your installation platform.
{% if equals($secrets_source, "secrets_manager") %}
2. In **Review your secrets management**, ensure that your secrets are configured in your secrets manager.
{% /if %}
{% if equals($secrets_source, "environment_variables") %}
2. In **Review your secrets management**, enter the [environment variables][7] for your sources and destinations, if applicable.
{% /if %}
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
    - **Note**: The API key must be [enabled for Remote Configuration][cf-ui-2].
1. Click **Launch CloudFormation Template** to navigate to the AWS Console to review the stack configuration and then launch it. Make sure the CloudFormation parameters are as expected.
1. Select the VPC and subnet you want to use to install the Worker.
1. Review and check the necessary permissions checkboxes for IAM. Click **Submit** to create the stack. CloudFormation handles the installation at this point; the Worker instances are launched, the necessary software is downloaded, and the Worker starts automatically.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][cf-ui-1] if you want to make changes to your pipeline's configuration.

**Note**: See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

{% /if %}
{% /if %}

<!-- Kubernetes - UI, API, Terraform -->
{% if equals($platform, "kubernetes") %}

**Notes**:
- If you enable [disk buffering][k8s-api-tf-6] for destinations, you must enable Kubernetes [persistent volumes][k8s-api-tf-7] in the Observability Pipelines helm chart.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

See [Update Existing Pipelines][k8s-api-tf-2] if you want to make changes to your pipeline's configuration.

### Self-hosted and self-managed Kubernetes clusters

If you are running a self-hosted and self-managed Kubernetes cluster, and defined zones with node labels using `topology.kubernetes.io/zone`, then you can use the Helm chart values file as is. However, if you are not using the label `topology.kubernetes.io/zone`, you need to update the `topologyKey` in the `values.yaml` file to match the key you are using. Or if you run your Kubernetes install without zones, remove the entire `topology.kubernetes.io/zone` section.

### Kubernetes services created

When you install the Observability Pipelines Worker on Kubernetes, the Helm chart creates:

- A headless Service (`clusterIP: None`) that exposes the individual Worker Pods using DNS.
  This allows direct Pod-to-Pod communication and stable network identities for peer discovery or direct Pod addressing.
- A ClusterIP service that provides a single virtual IP and DNS name for the Worker.
  This enables load balancing across Worker Pods for internal cluster traffic.

### LoadBalancer service

If you set `service.type: LoadBalancer` in the Helm chart, Kubernetes provisions a load balancer in supported environments and exposes the Worker Service with an external IP/DNS name. For example, Amazon EKS with the [AWS Load Balancer Controller][k8s-api-tf-9] installed. Use this `LoadBalancer` service when traffic originates outside the cluster.

### Set the Worker name using the Pod and cluster name

By default, a Worker's hostname is the machine's hostname, such as `COMP-JLXPKWTGJF`. If you run your pipeline across multiple clusters or containers, assign each Worker a unique hostname based on the Pod name and cluster name to make them easier to identify.

In the Helm chart [`values.yaml`][101]

1. Configure the environment variable `POD_NAME` to be automatically set to the Pod's name.
In the Helm chart:
    ```yaml
    env:
      - name: POD_NAME
        valueFrom:
         fieldRef:
            fieldPath: metadata.name
    ```
1. Set the `CLUSTER_NAME` environment variable in the Helm chart.
    ```
    env:
      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"
    ```
1. Set the `VECTOR_HOSTNAME` to the `POD_NAME` and `CLUSTER_NAME`.
    ```yaml
    env:
      - name: POD_NAME
        valueFrom:
          fieldRef:
            fieldPath: metadata.name

      - name: CLUSTER_NAME
        value: "<MY_CLUSTER_NAME>"

      - name: VECTOR_HOSTNAME
        value: "$(CLUSTER_NAME)_$(POD_NAME)"
    ```
{% /if %}

<!-- Linux -->
{% if equals($platform, "linux") %}
### Manually install the Worker

Follow these steps to manually install the Worker, instead of running the one-line installation script.

{% tabs %}
{% tab label="APT" %}

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
1. If you are using:
    - **Secrets Management**: Add your API key, site (for example, `datadoghq.com` for US1), and pipeline ID to the Worker's environment file:
        ```shell
        sudo cat <<EOF > /etc/default/observability-pipelines-worker
        DD_API_KEY=<DATADOG_API_KEY>
        DD_OP_PIPELINE_ID=<PIPELINE_ID>
        DD_SITE=<DATADOG_SITE>
        EOF
        ```
    - **Environment variables**: Add your API key, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
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
{% /tab %}
{% tab label="RPM" %}

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
1. If you are using:
    - **Secrets Management**: Add your API key, site (for example, `datadoghq.com` for US1), and pipeline ID to the Worker's environment file:
        ```shell
        sudo cat <<-EOF > /etc/default/observability-pipelines-worker
        DD_API_KEY=<API_KEY>
        DD_OP_PIPELINE_ID=<PIPELINE_ID>
        DD_SITE=<SITE>
        EOF
        ```
    - **Environment variables**: Add your API key, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
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

{% /tab %}
{% /tabs %}

**Notes**:
- The environment variables used by the Worker in `/etc/default/observability-pipelines-worker` are not updated on subsequent runs of the install script. If changes are needed, update the file manually and restart the Worker.
- See [Add domains to firewall allowlist](#add-domains-to-firewall-allowlist) if you are using a firewall.

See [Update Existing Pipelines][1] if you want to make changes to your pipeline's configuration.

{% /if %}

## Upgrade the Worker

To upgrade the Worker to the latest version, run the following command:

{% tabs %}
{% tab label="APT" %}

```
sudo apt-get install --only-upgrade observability-pipelines-worker
```

{% /tab %}
{% tab label="RPM" %}

```
sudo yum install --only-upgrade observability-pipelines-worker
```

{% /tab %}
{% /tabs %}

## Uninstall the Worker

If you want to uninstall the Worker, run the following commands:

{% tabs %}
{% tab label="APT" %}

```
sudo apt-get remove --purge observability-pipelines-worker
```

{% /tab %}
{% tab label="RPM" %}

1.
    ```
    yum remove observability-pipelines-worker
    ```
1.
    ```
    rpm -q --configfiles observability-pipelines-worker
    ```

{% /tab %}
{% /tabs %}

## Index your Worker logs

Make sure your Worker logs are [indexed][9] in Log Management for optimal functionality. The logs provide deployment information, such as Worker status, version, and any errors, that is shown in the UI. The logs are also helpful for troubleshooting Worker or pipelines issues. All Worker logs have the tag `source:op_worker`.

## Add domains to firewall allowlist

If you are using a firewall, these domains must be added to the allowlist:

{% tabs %}
{% tab label="Docker and Kubernetes" %}


- `api.<DD_SITE>`
- `config.<DD_SITE>`
- `http-intake.<DD_SITE>`
- `keys.datadoghq.com`

{% /tab %}
{% tab label="Linux" %}

- `api.<DD_SITE>`
- `config.<DD_SITE>`
- `http-intake.<DD_SITE>`
- `install.<DD_SITE>`
- `yum.datadoghq.com`
- `keys.datadoghq.com`

{% /tab %}
{% /tabs %}

Replace `<DD_SITE>` with `{{< region-param key="dd_site" >}}`.

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

[docker-api-tf-1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[docker-api-tf-2]: /getting_started/site/
[docker-api-tf-3]: /observability_pipelines/guide/environment_variables/
[docker-api-tf-4]: /observability_pipelines/configuration/secrets_management
[docker-api-tf-5]: /observability_pipelines/configuration/update_existing_pipelines/
[k8s-api-tf-1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[k8s-api-tf-2]: /observability_pipelines/configuration/update_existing_pipelines
[k8s-api-tf-3]: https://app.datadoghq.com/organization-settings/remote-config/setup
[k8s-api-tf-4]: /observability_pipelines/guide/environment_variables/
[k8s-api-tf-5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[k8s-api-tf-6]: /observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[k8s-api-tf-7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L278
[k8s-api-tf-8]: /observability_pipelines/configuration/secrets_management/?tab=kubernetes#configure-the-worker-to-retrieve-secrets
[k8s-api-tf-9]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[linux-1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[linux-2]: /getting_started/site/
[linux-3]: /observability_pipelines/guide/environment_variables/
[linux-4]: /observability_pipelines/configuration/update_existing_pipelines
[linux-5]: /observability_pipelines/configuration/secrets_management

[docker-ui-1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[docker-ui-2]: /observability_pipelines/configuration/update_existing_pipelines/
[docker-ui-3]: /observability_pipelines/configuration/secrets_management

[k8s-ui-1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[k8s-ui-2]: /observability_pipelines/configuration/update_existing_pipelines/
[k8s-ui-3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[k8s-ui-4]: https://app.datadoghq.com/organization-settings/remote-config/setup
[k8s-ui-5]: /observability_pipelines/scaling_and_performance/buffering_and_backpressure/#destination-buffers
[k8s-ui-6]: https://github.com/DataDog/helm-charts/blob/23624b6e49eef98e84b21689672bb63a7a5df48b/charts/observability-pipelines-worker/values.yaml#L268
[k8s-ui-7]: /observability_pipelines/configuration/secrets_management/?tab=kubernetes#configure-the-worker-to-retrieve-secrets
[k8s-ui-8]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html

[linux-ui-1]: /observability_pipelines/configuration/update_existing_pipelines
[linux-ui-2]: https://app.datadoghq.com/organization-settings/remote-config/setup
[linux-ui-3]: /observability_pipelines/configuration/secrets_management

[cf-ui-1]: /observability_pipelines/configuration/update_existing_pipelines/
[cf-ui-2]: https://app.datadoghq.com/organization-settings/remote-config/setup

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml

[ecs-1]: /observability_pipelines/guide/set_up_the_worker_in_ecs_fargate/