---
title: Set Up the Observability Pipelines Worker
kind: documentation
type: multi-code-lang
aliases:
  - /getting_started/observability_pipelines/
  - /observability_pipelines/installation/
further_reading:
  - link: "/observability_pipelines/working_with_data/"
    tag: "Documentation"
    text: "Working with data in Observability Pipelines"
  - link: "/observability_pipelines/production_deployment_overview/"
    tag: "Documentation"
    text: "Deployment Design and Principles for the Observability Pipelines Worker"
  - link: "/observability_pipelines/architecture/"
    tag: "Documentation"
    text: "Production deployment design and principles for the Observability Pipelines Worker"
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs and metrics from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

There are several ways to get started with the Observability Pipelines Worker.

- [Quickstart](#quickstart): Install the Worker with a simple pipeline that emits demo data to get started quickly.
- [Datadog setup guide][2]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from your Datadog Agents to Datadog.
- [Splunk setup guide][3]: Install the Worker with an out-of-the-box pipeline for receiving and routing data from Splunk HEC to both Splunk and Datadog.

This document walks you through the quickstart installation steps and then provides resources for next steps.

## Prerequisites

To install the Observability Pipelines Worker, you need the following:

- A valid [Datadog API key][4].
- A pipeline ID.

To generate a new API key and pipeline:

1. Navigate to [Observability Pipelines][5].
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
[3]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart][1] for AWS EKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

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
[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Download the [Helm chart][1] for Azure AKS. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

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
[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Download the [Helm chart][1] for Google GKE. See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

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
[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "APT-based Linux" %}}

Install the Worker with the one-line install script or manually.
#### One-line installation script

1. Run the one-line install command to install the Worker. Replace `<DD_API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
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
[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "RPM-based Linux" %}}

Install the Worker with the one-line install script or manually.

#### One-line installation script

1. Run the one-line install command to install the Worker. Replace `<DD_API_KEY>` with your Datadog API key, `<PIPELINES_ID>` with your Observability Pipelines ID, and `<SITE>` with {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
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
[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Set up the Worker module in your existing Terraform using this sample configuration. Update the values in `vpc-id`, `subnet-ids`, and `region` to match your AWS deployment. Update the values in `datadog-api-key` and `pipeline-id` to match your pipeline.

See [Configurations][2] for more information about the source, transform, and sink used in the sample configuration.

```
module "opw" {
    source     = "https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## SOURCES: Data sources that Observability Pipelines Worker collects data from.
## For a Datadog use case, we will receive data from the Datadog agent.
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## The Datadog Agent natively encodes its tags as a comma-separated list
  ## of values that are stored in the string `.ddtags`. To work with
  ## and filter off of these tags, you need to parse that string into
  ## more structured data.
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## The `.status` attribute added by the Datadog Agent needs to be deleted, otherwise
  ## your logs can be miscategorized at intake.
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## Before sending data to the logs intake, you must re-encode the
  ## tags into the expected format, so that it appears as if the Agent is
  ## sending it directly.
  logs_finish_ddtags:
    type: remap
    inputs:
      - LOGS_YOUR_STEPS
    source: |
      .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  metrics_add_dd_tags:
    type: remap
    inputs:
      - datadog_agent.metrics
    source: |
      .tags.sender = "observability_pipelines_worker"
      .tags.opw_aggregator = get_hostname!()

## This buffer configuration is split into the following, totaling the 288GB
## provisioned automatically by the Terraform module:
## - 240GB buffer for logs
## - 48GB buffer for metrics
##
## This should work for the vast majority of OP Worker deployments and should rarely
## need to be adjusted. If you do change it, be sure to update the `ebs-drive-size-gb`
## parameter.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - logs_finish_ddtags
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
       type: disk
       max_size: 257698037760
  datadog_metrics:
    type: datadog_metrics
    inputs:
      - metrics_add_dd_tags
    default_api_key: "$${DD_API_KEY}"
    buffer:
      type: disk
      max_size: 51539607552
EOT
}
```

[2]: /observability_pipelines/configurations/
{{% /tab %}}
{{< /tabs >}}

See [Working with Data][6] for more information on transforming your data.

## Next steps

The quickstart walked you through installing the Worker and deploying a sample pipeline configuration. For instructions on how to install the Worker to receive and route data from your Datadog Agents to Datadog or to receive and route data from your Splunk HEC to Splunk and Datadog, select your specific use case:

{{< partial name="observability_pipelines/use_cases.html" >}}

For recommendations on deploying and scaling multiple Workers:

- See [Deployment Design and Principles][7] for information on what to consider when designing your Observability Pipelines architecture.
- See [Best Practices for OP Worker Aggregator Architecture][8].

## Deployment Modes

<div class="alert alert-warning">
  Remote configuration for Observability Pipelines is in private beta. Contact <a href="https://docs.datadoghq.com/help/">Datadog support</a> or your Customer Success Manager for access.
</div>

If you are enrolled in the private beta of [Remote Configuration][9], you can remotely roll out changes to your Workers from the Datadog UI, rather than make updates to your pipeline configuration in a text editor and then manually rolling out your changes. Choose your deployment method when you create a pipeline and install your Workers.

After deploying a pipeline, you can also switch deployment methods, such as going from a manually managed pipeline to a remote configuration enabled pipeline or vice versa. 

If you want to switch from a remote configuration deployment to a manually managed deployment:
1. Navigate to Observability Pipelines.
2. Click the settings cog.
3. In **Deployment Mode**, select **manual** to enable it.
4. Set the `DD_OP_REMOTE_CONFIGURATION_ENABLED` flag to `false` and restart the Worker. Workers that are not restarted with this flag continue to be remote configuration enabled, which means that the Workers are not updated manually through a local configuration file.

If you want to switch from manually managed deployment to a remote configuration deployment:
1. Navigate to Observability Pipelines.
2. Click the settings cog.
3. In **Deployment Mode**, select **Remote Configuration** to enable it.
4. Set the `DD_OP_REMOTE_CONFIGURATION_ENABLED` flag to `true` and restart the Worker. Workers that are not restarted with this flag are not polled for configurations deployed in the UI. 
6. Deploy a version in your version history, so that the Workers receive the new version configuration. Click on a version. Click **Edit as Draft** and then click **Deploy**. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /observability_pipelines/setup/datadog/
[3]: /observability_pipelines/setup/splunk/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /account_management/api-app-keys/#api-keys
[6]: /observability_pipelines/working_with_data/
[7]: /observability_pipelines/production_deployment_overview/
[8]: /observability_pipelines/architecture/
[9]: /agent/remote_config
