---
title: Google Cloud Storage Destination
description: Learn how to send logs to a Google Cloud Storage bucket, optionally for archiving and rehydration in Datadog.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

<div class="alert alert-info">For Worker versions 2.7 and later, the Google Cloud destination supports <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">uniform bucket-level access</a>. Google <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">recommends</a> using uniform bucket-level access. <br>For Worker version older than 2.7, only <a href = "https://cloud.google.com/storage/docs/access-control/lists">Access Control Lists</a> is supported.</div>

Use the Google Cloud Storage destination to send your logs to a Google Cloud Storage bucket. If you want to send logs to Google Cloud Storage for [archiving][1] and [rehydration][2], you must [configure Log Archives](#configure-log-archives). If you do not want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destinations).

The Observability Pipelines Worker uses standard Google authentication methods. See [Authentication methods at Google][6] for more information about choosing the authentication method for your use case.

## Configure Log Archives

This step is only required if you want to send logs to Google Cloud Storage for [archiving][1] and [rehydration][2], and you don't already have a Datadog Log Archive configured for Observability Pipelines. If you already have a Datadog Log Archive configured or do not want to rehydrate your logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destinations).

If you already have a Datadog Log Archive configured for Observability Pipelines, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [Google Cloud Platform integration][3] installed to set up Datadog Log Archives.

### Create a storage bucket

1. Navigate to [Google Cloud Storage][16].
1. On the Buckets page, click **Create** to create a bucket for your archives..
1. Enter a name for the bucket and choose where to store your data.
1. Select **Fine-grained** in the **Choose how to control access to objects** section.
1. Do not add a retention policy because the most recent data needs to be rewritten in some rare cases (typically a timeout case).
1. Click **Create**.

### Create a service account to allow Workers to write to the bucket

1. Create a Google Cloud Storage [service account][17].
    - Grant the Service Account permissions to your bucket with `Storage Admin` and `Storage Object Admin` permissions.
    - If you want to authenticate with a credentials file, download the service account key file and place it under `DD_OP_DATA_DIR/config`. You reference this file when you set up the [Google Cloud Storage destination](#set-up-the-destinations) later on.
1. Follow these [instructions][18] to create a service account key. Choose `json` for the key type.

### Connect the storage bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][19].
1. Click **New archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **Google Cloud Storage**.
1. Select the service account your storage bucket is in.
1. Select the project.
1. Enter the name of the storage bucket you created earlier.
1. Optionally, enter a path.
1. Optionally, set permissions, add tags, and define the maximum scan size for rehydration. See [Advanced settings][20] for more information.
1. Click **Save**.

See the [Log Archives documentation][1] for additional information.

## Set up the destination for your pipeline {#set-up-the-destinations}

Configure the Google Cloud Storage destination when you [set up a pipeline][4]. You can set up a pipeline in the [UI][10], using the [API][11], or with [Terraform][12]. The steps in this section are configured in the UI.

After you select the Google Cloud Storage destination in the pipeline UI:

1. Enter the name of your Google Cloud storage bucket. If you configured Log Archives, it's the bucket you created earlier.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. If you configured Log Archives it's the credentials you downloaded [earlier](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][9] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][8].
1. Select the storage class for the created objects.
1. Select the access level of the created objects.

### Optional settings

#### Prefix to apply to all key objects

Enter a prefix that you want to apply to all key objects.

- Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
- See [template syntax][7] if you want to route logs to different object keys based on specific fields in your logs. This **Prefix** field is the only place to configure template syntax for this destination; the path you optionally enter when [configuring Log Archives](#configure-log-archives) must be a static string.
  - **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.

#### Metadata

1. Click {{< ui >}}Add Header{{< /ui >}} to add metadata.
1. Enter values for the header name and value.

#### Buffering

{{% observability_pipelines/destination_buffer %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers to configure.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## Health metrics

For [component metrics][13] and [destination buffer metrics][14] emitted by all destinations, see the [Pipelines Usage Metrics][15] documentation. To filter or group by Google Cloud Storage destination metrics, use the tag `component_type:datadog_archives_gcs`.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [Destinations event batching][5] for more information.

| Maximum Events | Maximum Size (MB) | Timeout (seconds)   |
|----------------|-------------------|---------------------|
| None           | 100               | 900                 |

[1]: /logs/log_configuration/archives/
[2]: /logs/log_configuration/rehydrating/
[3]: /integrations/google_cloud_platform/#setup
[4]: /observability_pipelines/configuration/set_up_pipelines/
[5]: /observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[15]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://console.cloud.google.com/storage
[17]: https://console.cloud.google.com/iam-admin/serviceaccounts
[18]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[19]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[20]: /logs/log_configuration/archives/?tab=awss3#advanced-settings
