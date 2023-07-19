---
title: Set Up Observability Pipelines in your Splunk Environment
kind: documentation
aliases:
  - /integrations/observability_pipelines/splunk
further_reading:
  - link: "/observability_pipelines/working_with_data/"
    tag: "Documentation"
    text: "Working with data using Observability Pipelines"
  - link: /observability_pipelines/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
  - link: "https://dtdg.co/d22op"
    tag: "Learning Center"
    text: "Safe and Secure Local Processing with Observability Pipelines"
---

<div class="alert alert-info">At this time, Observability Pipelines only supports Splunk's HTTP Event Collector (HEC) protocol.</div>

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs and metrics from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring Splunk to send logs through the Worker, to dual-write to Datadog.

{{< img src="observability_pipelines/guide/splunk/setup.png" alt="A diagram of a couple of Splunk Heavy Forwarders sending their data through the Observability Pipelines aggregator." >}}

## Assumptions
* You are using a log collector that is compatible with the Splunk HTTP Event Collector (HEC) protocol.
* You have administrative access to the collectors and the Splunk index where logs will be sent to.
* You have administrative access to the clusters where the Observability Pipelines Worker is going to be deployed.
* You have a common tools or security cluster for your environment to which all other clusters are connected.

## Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key][2].
* A Pipeline ID.

You can generate both of these in [Observability Pipelines][3].


### Provider-specific requirements
{{< tabs >}}
{{% tab "AWS EKS" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

* The [AWS Load Balancer controller][1] is required. To see if it is installed, run the following command and look for `aws-load-balancer-controller` in the list:

  ```shell
  helm list -A
  ```
* Datadog recommends using Amazon EKS >= 1.16.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
{{% /tab %}}
{{% tab "Azure AKS" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.
{{% /tab %}}
{{% tab "Google GKE" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
There are no provider-specific requirements for APT-based Linux.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
There are no provider-specific requirements for RPM-based Linux.
{{% /tab %}}
{{< /tabs >}}

## Setting up the Splunk index

<div class="alert alert-info">Observability Pipelines supports acknowledgements when you enable the <strong>Enable Indexer Acknowledgements</strong> setting on the input.</div>
To receive logs from the Observability Pipelines Worker, you must provision a HEC input and HEC token on the index.


1. In Splunk, navigate to **Settings** > **Data Inputs**.
2. Add a new HTTP Event Collector input and assign it a name.
3. Select the indexes where you want the logs to be sent.

After you add the input, Splunk creates a token for you. The token is typically in a UUID format. In the sample configurations provided in later sections in this article, you will add this token to the configuration so that the Observability Pipelines Worker can authenticate itself.

## Installing the Observability Pipelines Worker

{{< tabs >}}
{{% tab "AWS EKS" %}}
1. Download the [Helm chart][1] for AWS EKS.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values as follows:
  ```yaml
  datadog:
    apiKey: "<datadog_api_key>"
    pipelineId: "<observability_pipelines_configuration_id>"
    site: "datadoghq.com"
  ```

3. replace the values for `SPLUNK_ENDPOINT` and `SPLUNK_HEC_TOKEN` to match your Splunk deployment, including the token you created in [Setting up the Splunk Index](#setting-up-the-splunk-index):
  ```yaml
  env:
    - name: SPLUNK_HEC_ENDPOINT
      value: <https://your.splunk.index:8088/>
    - name: SPLUNK_TOKEN
      value: <a_random_token_usually_a_uuid>
  ```

4. Install the Helm chart in your cluster with the following commands:

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

[1]: /resources/yaml/observability_pipelines/splunk/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Download the [Helm chart][1] for Azure AKS.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values as follows:
  ```yaml
  datadog:
    apiKey: "<datadog_api_key>"
    pipelineId: "<observability_pipelines_configuration_id>"
    site: "datadoghq.com"
  ```

3. replace the values for `SPLUNK_ENDPOINT` and `SPLUNK_HEC_TOKEN` to match your Splunk deployment, including the token you created in [Setting up the Splunk Index](#setting-up-the-splunk-index):
  ```yaml
  env:
    - name: SPLUNK_HEC_ENDPOINT
      value: <https://your.splunk.index:8088/>
    - name: SPLUNK_TOKEN
      value: <a_random_token_usually_a_uuid>
  ```

4. Install the Helm chart in your cluster with the following commands:

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

[1]: /resources/yaml/observability_pipelines/splunk/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Download the [Helm chart][1] for Google GKE.

2. In the Helm chart, replace the `datadog.apiKey` and `datadog.pipelineId` values as follows:
  ```yaml
  datadog:
    apiKey: "<datadog_api_key>"
    pipelineId: "<observability_pipelines_configuration_id>"
    site: "datadoghq.com"
  ```

3. replace the values for `SPLUNK_ENDPOINT` and `SPLUNK_HEC_TOKEN` to match your Splunk deployment, including the token you created in [Setting up the Splunk Index](#setting-up-the-splunk-index):
  ```yaml
  env:
    - name: SPLUNK_HEC_ENDPOINT
      value: <https://your.splunk.index:8088/>
    - name: SPLUNK_TOKEN
      value: <a_random_token_usually_a_uuid>
  ```

4. Install the Helm chart in your cluster with the following commands:

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

[1]: /resources/yaml/observability_pipelines/splunk/google_gke.yaml
{{% /tab %}}
{{% tab "APT-based Linux" %}}
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
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Add your keys and Splunk information to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

5. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

6. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/linux.yaml
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
1. Run the following commands to set up the Datadog `rpm` repo on your system:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
    EOF
    ```

   **Note:** If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration above.

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your keys and Splunk information to the Worker's environment variables:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

4. Download the [sample configuration file][1] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/linux.yaml
{{% /tab %}}
{{< /tabs >}}

### Load balancing

{{< tabs >}}
{{% tab "AWS EKS" %}}
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Use the load balancer URL given to you by Helm when you configure your existing collectors.

NLBs provisioned by the [AWS Load Balancer Controller][1] are used.

#### Cross-availability-zone load balancing
The provided Helm configuration tries to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen.

The sample configurations do not enable the cross-zone load balancing feature available in this controller. To enable it, add the following annotation to the `service` block:

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

See [AWS Load Balancer Controller][2] for more details.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Use the load balancer URL given to you by Helm when you configure your existing collectors.

#### Cross-availability-zone load balancing
The provided Helm configuration tries to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen.
{{% /tab %}}
{{% tab "Google GKE" %}}
Use the load balancers provided by your cloud provider.
They adjust based on autoscaling events that the default Helm setup is configured for. The load balancers are internal-facing,
so they are only accessible inside your network.

Use the load balancer URL given to you by Helm when you configure your existing collectors.

#### Cross-availability-zone load balancing
The provided Helm configuration tries to simplify load balancing, but you must take into consideration the potential price implications of cross-AZ traffic. Wherever possible, the samples try to avoid creating situations where multiple cross-AZ hops can happen.

Global Access is enabled by default since that is likely required for use in a shared tools cluster.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
No built-in support for load-balancing is provided, given the single-machine nature of the installation. You will need to provision your own load balancers using whatever your company's standard is.
{{% /tab %}}
{{< /tabs >}}

### Buffering
Observability Pipelines includes multiple buffering strategies that allow you to increase the resilience of your cluster to downstream faults. The provided sample configurations use disk buffers, the capacities of which are rated for approximately 10 minutes of data at 10Mbps/core for Observability Pipelines deployments. That is often enough time for transient issues to resolve themselves, or for incident responders to decide what needs to be done with the observability data.

{{< tabs >}}
{{% tab "AWS EKS" %}}
For AWS, Datadog recommends using the `io2` EBS drive family. Alternatively, the `gp3` drives could also be used.
{{% /tab %}}
{{% tab "Azure AKS" %}}
For Azure AKS, Datadog recommends using the `default` (also known as `managed-csi`) disks.
{{% /tab %}}
{{% tab "Google GKE" %}}
For Google GKE, Datadog recommends using the `premium-rwo` drive class because it is backed by SSDs. The HDD-backed class, `standard-rwo`, might not provide enough write performance for the buffers to be useful.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
By default, the Observability Pipelines Worker's data directory is set to `/var/lib/observability-pipelines-worker` - if you are using the sample configuration, you should ensure that this has at least 288GB of space available for buffering.

Where possible, it is recommended to have a separate SSD mounted at that location.
{{% /tab %}}
{{< /tabs >}}

## Connect forwarders to the Worker
After you install and configure the Observability Pipelines Worker to send logs to your Splunk index, you must update your existing collectors to point to the Worker.

For most collectors, changing the URL to the load balancer provisioned by these configurations, and updating the token, should suffice.

At this point, your logs should be going to the Worker and be available for processing. The next section goes through what process is included by default, and the additional options that are available.

## Working with data
The sample Observability Pipelines configuration does the following:
- **Collects** logs being sent from the Splunk forwarder to the Observability Pipelines Worker. 
- **Transforms** logs by adding tags to data that has come through the Observability Pipelines Worker. This helps determine what traffic still needs to be shifted over to the Worker as you update your clusters. These tags also show you how logs are being routed through the load balancer, in case there are imbalances.
- **Routes** the logs by dual-shipping the data to both Splunk and Datadog. This demonstrates how easy it is to write to multiple destinations!

- **Tag logs coming through the Observability Pipelines Worker.** This helps determine what traffic still needs to be shifted over to the Worker as you update your clusters. These tags also show you how logs are being routed through the load balancer, in case there are imbalances.
- **Dual-writes to Datadog.** This demonstrates how easy it is to write to multiple destinations.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
