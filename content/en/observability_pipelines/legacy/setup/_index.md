---
title: (LEGACY) Set Up the Observability Pipelines Worker
type: multi-code-lang
aliases:
  - /getting_started/observability_pipelines/
  - /observability_pipelines/installation/
  - /observability_pipelines/setup/
further_reading:
  - link: "/observability_pipelines/legacy/working_with_data/"
    tag: "Documentation"
    text: "Working with data in Observability Pipelines"
  - link: "/observability_pipelines/legacy/production_deployment_overview/"
    tag: "Documentation"
    text: "Deployment Design and Principles for the Observability Pipelines Worker"
  - link: "/observability_pipelines/legacy/architecture/"
    tag: "Documentation"
    text: "Production deployment design and principles for the Observability Pipelines Worker"
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

There are several ways to get started with the Observability Pipelines Worker.

- [Quickstart](#quickstart): Install the Worker with a simple pipeline that emits demo data to get started quickly.
- [Datadog setup guide][2]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from your Datadog Agents to Datadog.
- [Datadog archiving setup guide][3]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from your Datadog Agents to Datadog and S3.
- [Splunk setup guide][4]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from Splunk HEC to both Splunk and Datadog.

This document walks you through the quickstart installation steps and then provides resources for next steps. Use and operation of this software is governed by the [End User License Agreement][5].

## Deployment Modes

{{% op-deployment-modes %}}

## Prerequisites

To install the Observability Pipelines Worker, you need the following:

- A valid [Datadog API key][7].
- A pipeline ID.

To generate a new API key and pipeline:

1. Navigate to [Observability Pipelines][6].
2. Click **New Pipeline**.
3. Enter a name for your pipeline.
4. Click **Next**.
4. Select the template you want and follow the instructions.

## Quickstart

Follow the below instructions to install the Worker and deploy a sample pipeline configuration that uses demo data.

### Install the Observability Pipelines Worker

{{< tabs >}}
{{% tab "Docker" %}}

The Observability Pipelines Worker Docker image is published to Docker Hub [here][1].

1. Download the [sample pipeline configuration file][2]. This configuration emits demo data, parses and structures the data, and then sends them to the console and Datadog. See [Configurations][3] for more information about the source, transform, and sink used in the sample configuration.

2. Run the following command to start the Observability Pipelines Worker with Docker:
    
    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    Replace `<API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines configuration ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}. **Note**: `./pipeline.yaml` must be the relative or absolute path to the configuration you downloaded in step 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[3]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart values file][1] for AWS EKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline and use {{< region-param key="dd_site" code="true" >}} for the `site` value. Then, install it in your cluster with the following commands:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Download the [Helm chart values file][1] for Azure AKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline and use {{< region-param key="dd_site" code="true" >}} for the `site` value. Then, install it in your cluster with the following commands:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f azure_aks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Download the [Helm chart values file][1] for Google GKE. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline and use {{< region-param key="dd_site" code="true" >}} for the `site` value. Then, install it in your cluster with the following commands:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f google_gke.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "APT-based Linux" %}}

Install the Worker with the one-line install script or manually.
#### One-line installation script

1. Run the one-line install command to install the Worker. Replace `<DD_API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

3. Start the worker:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### Manual installation

1. Run the following commands to set up APT to download through HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Run the following commands to update your local `apt` repo and install the Worker:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

6. Start the Worker:
    
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "RPM-based Linux" %}}

Install the Worker with the one-line install script or manually.

#### One-line installation script

1. Run the one-line install command to install the Worker. Replace `<DD_API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

3. Run the following command to start the Worker:
    
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### Manual installation

1. Run the following commands to set up the Datadog `rpm` repo on your system:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **Note:** If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration above.

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your keys and the site ({{< region-param key="dd_site" code="true" >}}) to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

5. Run the following command to start the Worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. Download the the [sample configuration][1]. 
1. Set up the Worker module in your existing Terraform using the sample configuration. Make sure to update the values in `vpc-id`, `subnet-ids`, and `region` to match your AWS deployment in the configuration. Also,update the values in `datadog-api-key` and `pipeline-id` to match your pipeline.

See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

[1]: /resources/yaml/observability_pipelines/quickstart/terraform_opw.tf
[2]: /observability_pipelines/legacy/configurations/
{{% /tab %}}
{{< /tabs >}}

See [Working with Data][8] for more information on transforming your data.

## Updating deployment modes

{{% op-updating-deployment-modes %}}

## Next steps

The quickstart walked you through installing the Worker and deploying a sample pipeline configuration. For instructions on how to install the Worker to receive and route data from your Datadog Agents to Datadog or to receive and route data from your Splunk HEC to Splunk and Datadog, select your specific use case:

{{< partial name="observability_pipelines/use_cases.html" >}}

For recommendations on deploying and scaling multiple Workers:

- See [Deployment Design and Principles][9] for information on what to consider when designing your Observability Pipelines architecture.
- See [Best Practices for OP Worker Aggregator Architecture][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /observability_pipelines/legacy/setup/datadog/
[3]: /observability_pipelines/legacy/setup/datadog_with_archiving/
[4]: /observability_pipelines/legacy/setup/splunk/
[5]: https://www.datadoghq.com/legal/eula/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /account_management/api-app-keys/#api-keys
[8]: /observability_pipelines/legacy/working_with_data/
[9]: /observability_pipelines/legacy/production_deployment_overview/
[10]: /observability_pipelines/legacy/architecture/
