---
title: BigQuery
description: "Connect BigQuery to Datadog Data Observability to monitor data quality, track usage, and detect issues."
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Datasets'
---

## Overview

The BigQuery integration connects Datadog to your Google Cloud project to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your data stack.

## Set up your account in BigQuery

To set up your account in BigQuery, create a service account with the following permissions:

- [BigQuery Data Viewer][1] (`roles/bigquery.dataViewer`)
  - Provides visibility into datasets
- [BigQuery Resource Viewer][2] (`roles/bigquery.resourceViewer`)
  - Provides visibility into jobs
- [Job User][3] (`roles/bigquery.jobUser`)
  - Required to run data quality queries
- [Compute Viewer][4] (`roles/compute.viewer`)
  - Provides read-only access to get and list Compute Engine resources
- [Service Account Token Creator][5] (`roles/iam.serviceAccountTokenCreator`)
  - Required to provision short-lived access token for [service account impersonation][6] - a standard and recommended method for authenticating third party systems.

## Configure the BigQuery integration in Datadog

To configure the BigQuery integration in Datadog:

1. Navigate to [**Datadog Data Observability** > **Connect a Warehouse**][7].
2. Click the **Configure** button for the BigQuery option.
3. Follow the flow to use an existing Service Account or set up a new one.
4. Turn on the **Enable Data Observability** toggle and click **Add Account**.

## Next steps

After you save, Datadog begins syncing your information schema and query history in the background. Initial syncs can take several hours depending on the size of your BigQuery deployment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer
[2]: https://docs.cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[3]: https://docs.cloud.google.com/bigquery/docs/access-control#bigquery.jobUser
[4]: https://docs.cloud.google.com/compute/docs/access/iam
[5]: https://docs.cloud.google.com/iam/docs/service-account-permissions#token-creator-role
[6]: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation
[7]: https://app.datadoghq.com/datasets/settings/integrations