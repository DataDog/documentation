---
title: Send Splunk Logs to Datadog
kind: documentation
disable_toc: false
further_reading:
  - link: "https://www.datadoghq.com/blog/dual-ship-logs-with-log-pipelines-and-observability-pipelines/"
    tag: "Blog"
    text: "Send your logs to multiple destinations with Datadog's managed Log Pipelines and Observability Pipelines"
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

## Overview

[Flex Logs][1] decouples log storage and log query compute to provide a solution for long-term retention of logs without impacting query performance. This lets you centralize all of your logs in one platform regardless of the use case.

This guide walks you through how you can dual ship Splunk Universal/Heavy Forwarders and HEC logs to Datadog using the Observability Pipelines Worker.

{{% op-set-up-splunk-index %}}

{{< tabs >}}
{{% tab "Docker" %}}

## Install the Observability Pipelines Worker

{{% op-splunk-docker-rc-install-worker %}}
{{% op-splunk-docker-install-worker %}}

{{% /tab %}}
{{% tab "AWS EKS" %}}

## Install the Observability Pipelines Worker

{{% op-splunk-aws-eks-rc-install-worker %}}
{{% op-splunk-aws-eks-install-worker %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% op-splunk-azure-aks-install-worker %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% op-splunk-google-gke-install-worker %}}

{{% /tab %}}
{{% tab "APT-based Linux" %}}

{{% op-splunk-apt-linux-install-worker %}}

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

{{% op-splunk-rpm-linux-install-worker %}}

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-splunk-terraform-aws-install-worker %}}

{{% /tab %}}
{{< /tabs >}}

## Connect Splunk to the Worker

OP Worker v1.6 and later can receive Splunk logs using Splunk's Heavy/Universal forwarder and Splunk HEC collectors. OP Worker v1.6 and older only supports Splunk HEC collectors.

### Connect Splunk Heavy/Universal Forwarders to the Worker

Update your Splunk Heavy/Universal Forwarders to point to the IP/URL of the host (or load balancer) associated with the Observability Pipelines Worker. To point your forwarders at the Worker, add the following configuration to the forwarder's `etc/system/local/outputs.conf`:

```
[tcpout]
compressed=false
sendCookedData=false
defaultGroup=opw

[tcpout:opw]
server=<URL>:8099
```

For Terraform installs, the `lb-dns` output provides the necessary value. 

### Connect Splunk HEC collectors to the Worker

Configure your existing Splunk collectors to send logs to the Worker.

1. Update each Splunk collector to forward data to the IP/URL of the host (or load balancer) associated with the Worker.

1. Update each Splunk collector with the HEC token used for authentication, so that it matches the one specified in the Worker's list of `valid_tokens`.

    ```
    sources:
      splunk_receiver:
        type: splunk_hec
        address: 0.0.0.0:8088
          valid_tokens:
            - ${SPLUNK_TOKEN}
    ```

In the sample configuration you downloaded earlier, the same HEC token for the Splunk source and destination is used.

After updating the Splunk collector, observability data should be going into the Worker and be available for data processing. See your observability data in the your [pipeline][2].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/flex_logs/
[2]: https://app.datadoghq.com/observability-pipelines