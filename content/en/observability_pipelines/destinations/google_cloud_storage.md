---
title: Google Cloud Storage Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

<div class="alert alert-info">For Worker versions 2.7 and later, the Google Cloud destination supports <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">uniform bucket-level access</a>. Google <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">recommends</a> using uniform bucket-level access. <br>For Worker version older than 2.7, only <a href = "https://cloud.google.com/storage/docs/access-control/lists">Access Control Lists</a> is supported.</div>

Use the Google Cloud Storage destination to send your logs to a Google Cloud Storage bucket. If you want to send logs to Google Cloud Storage for [archiving][1] and [rehydration][2], you must [configure Log Archives](#configure-log-archives). If you do not want to rehydrate logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destinations).

The Observability Pipelines Worker uses standard Google authentication methods. See [Authentication methods at Google][6] for more information about choosing the authentication method for your use case.

## Configure Log Archives

This step is only required if you want to send logs to Google Cloud Storage for [archiving][1] and [rehydration][2], and you don't already have a Datadog Log Archive configured for Observability Pipelines. If you already have a Datadog Log Archive configured or do not want to rehydrate your logs in Datadog, skip to [Set up the destination for your pipeline](#set-up-the-destinations).

If you already have a Datadog Log Archive configured for Observability Pipelines, skip to [Set up the destination for your pipeline](#set-up-the-destination-for-your-pipeline).

You need to have Datadog's [Google Cloud Platform integration][3] installed to set up Datadog Log Archives.

{{% observability_pipelines/configure_log_archive/google_cloud_storage/instructions %}}

## Set up the destination for your pipeline {#set-up-the-destinations}

Set up the Google Cloud Storage destination and its environment variables when you [set up an Archive Logs pipeline][4]. The information below is configured in the pipelines UI.

1. Enter the name of your Google Cloud storage bucket. If you configured Log Archives, it's the bucket you created earlier.
1. If you have a credentials JSON file, enter the path to your credentials JSON file. If you configured Log Archives it's the credentials you downloaded [earlier](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). The credentials file must be placed under `DD_OP_DATA_DIR/config`. Alternatively, you can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to provide the credential path.
    - If you're using [workload identity][9] on Google Kubernetes Engine (GKE), the `GOOGLE_APPLICATION_CREDENTIALS` is provided for you.
    - The Worker uses standard [Google authentication methods][8].
1. Select the storage class for the created objects.
1. Select the access level of the created objects.
1. Optionally, enter in the prefix.
    - Prefixes are useful for partitioning objects. For example, you can use a prefix as an object key to store objects under a particular directory. If using a prefix for this purpose, it must end in `/` to act as a directory path; a trailing `/` is not automatically added.
    - See [template syntax][7] if you want to route logs to different object keys based on specific fields in your logs.
     - **Note**: Datadog recommends that you start your prefixes with the directory name and without a lead slash (`/`). For example, `app-logs/` or `service-logs/`.
1. Optionally, click **Add Header** to add metadata.
{{% observability_pipelines/destination_buffer_numbered %}}

### Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers to configure.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][5] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------| ----------------| --------------------|
| None           | 100,000,000     | 900                 |

[1]: /logs/log_configuration/archives/
[2]: /logs/log_configuration/rehydrating/
[3]: /integrations/google_cloud_platform/#setup
[4]: /observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity