---
title: Storage Management for Amazon S3, Google Cloud Storage, and Azure Blob Storage
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
aliases:
    - /integrations/guide/storage-monitoring-setup
---

## Overview

Storage Management for Amazon S3, Google Cloud Storage, and Azure Blob Storage provides deep, prefix-level analytics to help you understand exactly how your storage is being used. With Storage Management you can:
- **Pinpoint where spend is coming from in your bucket**: Break storage cost to the prefix so you know which workloads, teams, or environments drive growth.
- **Identify cold data**: Spot buckets with rarely accessed prefixes, and move cold data to lower-cost tiers.
- **Tune retention and lifecycle rules with data**: Read/write and age metrics show when objects were last used, so you can shift unused prefixes to Glacier, Intelligent-Tiering, and other low-cost classes.
- **Monitor data freshness**: Age metrics show how recently each prefix was updated, so you can confirm that backups and other time-sensitive data are landing in prefixes when they should.

You can access Storage Management in Datadog by navigating to **Infrastructure** > [**Storage Management**][1].

Use the guides below to set up Storage Management in Datadog for your cloud storage service.

{{< partial name="cloud_storage_monitoring/storage-monitoring-setup.html" >}}

[1]: https://app.datadoghq.com/storage-monitoring