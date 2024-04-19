---
title: Sensitive Data Redaction for the Datadog Agent
kind: document
disable_toc: false
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks.

Use the Observability Pipelines to identify, tag, and optionally redact or hash sensitive information before routing logs to different destinations and outside of your infrastructure. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

{{< img src="observability_pipelines/use_cases/sensitive_data_redaction.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

This document walks you through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Connecting the Datadog Agent to the Observability Pipelines Worker](#connect-the-datadog-agent-to-the-observability-pipelines-worker)

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][1].
1. Select the **Sensitive Data Redaction** use case to create a new pipeline.
1. Select **Datadog Agent** as the source.

### Set up the source

{{% observability_pipelines/source_settings/datadog_agent %}}

### Set up the destination

Enter the following information based on your selected logs destination.

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

{{< img src="observability_pipelines/processors/sdr_processors.png" alt="The log processors available" width="40%" >}}

{{% observability_pipelines/processors/add_processors %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Edit fields" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{% tab "Sensitive Data Scanner" %}}

{{% observability_pipelines/processors/sensitive_data_scanner %}}

{{% /tab %}}
{{< /tabs >}}

### Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Datadog Agent address. This is the address and port where your Datadog Agent is sending its logging data. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations.
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}
1. Follow the instructions for your environment to install the Worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

[1]: https://app.datadoghq.com/observability-pipelines