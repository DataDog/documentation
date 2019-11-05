---
title: Archives on Google Cloud Storage
kind: Documentation
description: "Forward all your Datadog logs to GCS for long term storage."
aliases:
  - /logs/gcs/
---

<div class="alert alert-warning">
    GCS Archives are in private beta. Request early access by contacting <a href="/help">Datadog Support</a>. GCS Archives do not yet support rehydration.
</div>

## Overview

Keeping your logs in a storage-optimized archive for longer periods of time enables you to meet compliance requirements, and to keep auditability for ad hoc investigations within budget. Once your logs are archived for the long term, you have access to them should you ever need to investigate something unexpected—or that might have happened a long time ago.

This guide shows you how to set up an archive for forwarding ingested logs to your own bucket in Google Cloud Storage (GCS). 

## Create and Configure a GCS Bucket

1. Go to your [GCP account][1] and [create a GCS bucket][2] to send your archives to. Under "Choose how to control access to objects", select "Set object-level and bucket-level permissions."

2. Set up the [GCP integration][3] for the project that holds your GCS storage bucket, if you haven’t already. This involves [creating a GCS Service Account that Datadog can use][4] to integrate with.

3. Next, grant your Datadog GCP Service Account sufficient permissions to write your archives to your bucket. If you’re creating a new Service Account, this can be done from the [GCP Credentials page][5]. If you’re updating an existing Service Account, this can be done from the [GCP IAM Admin page][6]). Add the role under **Storage** called **Storage Object Creator**. 

  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Add the Storage Object Creator role to your Datadogh GCP Service Account." responsive="true" style="width:75%;">}}

4. Go to your [Archives page][7] in Datadog, and select the **Add a new archive** option at the bottom. Only Datadog users with admin status can complete this and the following step.

5. Select the GCS archive type, and the GCS Service Account that has permissions to write on your storage bucket. Input your bucket name. Optional: input a prefix directory for all the content of your log archives. Then save your archive. 

  {{< img src="logs/archives/archive_select_gcs.png" alt="Add the Storage Object Creator role to your Datadogh GCP Service Account." responsive="true" style="width:75%;">}}

Once your archive settings are successfully configured in your Datadog account, your processing pipelines begin to enrich all the logs that Datadog ingests. These logs are subsequently forwarded to your archive.

However, after creating or updating your archive configurations, it can take several minutes before the next archive upload is attempted, so **you should check back on your storage bucket in 15 minutes** to make sure the archives are successfully being uploaded from your Datadog account.

## Format of the Archives

The log archives that Datadog forwards to your storage bucket are in compressed JSON format (`.json.gz`). Under whatever prefix you indicate (or `/` if there is none), the archives are stored in a directory structure that indicates on what date and at what time the archive files were generated, like so:

`/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz`

This directory structure simplifies the process of querying your historical log archives based on their date.

Within the zipped JSON file, each event’s content is formatted as follows:

```
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": " ... log message content ... ",
    "attributes": { ... log attributes content ... }
}
```

**Note**: Archives only include log content, which consists of the message, custom attributes, and reserved attributes of your log events. The log tags (metadata that connects your log data to related metrics and traces) are not included.

## Multiple Archives

Admins can route specific logs to an archive by adding a query in the archive’s filter field. Logs enter the first archive whose filter they match on, so it is important to order your archives carefully.

For example, if you create a first archive filtered to the `env:prod` tag and a second archive without any filter (the equivalent of `*`), all your production logs would go to one storage bucket/path, and the rest would go to the other.

Logs enter the first archive whose filter they match on.

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="Logs enter the first archive whose filter they match on." responsive="true" style="width:75%;">}}

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[4]: /integrations/google_cloud_platform/?tab=datadogussite#setup
[5]: https://console.cloud.google.com/apis/credentials
[6]: https://console.cloud.google.com/iam-admin/iam
[7]: https://app.datadoghq.com/logs/pipelines/archives
