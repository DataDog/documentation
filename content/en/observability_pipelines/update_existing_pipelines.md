---
title: Update Existing Pipelines
kind: documentation
disable_toc: false
---

## Overview

For existing pipelines in Observability Pipelines, you can update and deploy changes for source settings, destination settings, and processors in the Observability Pipelines UI. But if you want to update source and destination environment variables, you need to manually update the Worker with the new values.

## Update an existing pipeline

1. Navigate to [Observability Pipelines][1].
1. Select the pipeline you want to update.
1. Click **Edit Pipeline** in the top right corner.
1. Make changes to the pipeline.
	- If you are updating the source or destination settings shown in the tiles, or updating and adding processors, make the changes and then click **Deploy Changes**.
	- To update source or destination environment variables, click **Go to Worker Installation Steps** and see [Update source or destination variables](#update-source-or-destination-variables) for instructions.

### Update source or destination variables

On the the Worker installation page:
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. If you want to update source environment variables, update the information based on your selected logs source.
{{< tabs >}}
{{% tab "Datadog Agent" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}
1. If you want to update destination environment variables, update the information based on your selected logs destinations.
{{< tabs >}}
{{% tab "Datadog Archives" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives %}}

{{% /tab %}}
{{% tab "Datadog" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}
1. Follow the instructions for your environment to update the worker:
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/google_gke %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/configure_existing_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/observability-pipelines