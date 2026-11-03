---
title: Advanced S3 Monitoring
further_reading:
    - link: "/cloud_cost_management/advanced_s3_monitoring/setup/"
      tag: "Documentation"
      text: "Set up Advanced S3 Monitoring"
    - link: "/cloud_cost_management/recommendations/"
      tag: "Documentation"
      text: "Cloud Cost Recommendations"
    - link: "https://www.datadoghq.com/blog/datadog-storage-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot cloud storage at scale with Storage Monitoring"
    - link: "https://www.datadoghq.com/blog/storage-monitoring-recommendations/"
      tag: "Blog"
      text: "Reduce cloud storage costs and improve operational efficiency with Datadog Storage Monitoring"
---

## Overview

Advanced S3 Monitoring provides deep, prefix-level analytics for Amazon S3 to help you understand exactly how your storage is being used. With Advanced S3 Monitoring you can:
- **Pinpoint where spend is coming from in your bucket**: Break storage cost down to the prefix so you know which workloads, teams, or environments drive growth.
- **Identify cold data**: Spot buckets with rarely accessed prefixes, and move cold data to lower-cost tiers.
- **Tune retention and lifecycle rules with data**: Read/write and age metrics show when objects were last used, so you can shift unused prefixes to Glacier, Intelligent-Tiering, and other low-cost classes.
- **Monitor data freshness**: Age metrics show how recently each prefix was updated, so you can confirm that backups and other time-sensitive data are landing in prefixes when they should.

You can access Advanced S3 Monitoring in Datadog by navigating to **Cloud Cost** > **Summarize** > **Storage**.

To enable Advanced Monitoring on your S3 buckets, open the [Amazon S3 integration tile][1] and go to the **Configure** tab. The **Advanced Monitoring** section is where you enable buckets and manage their settings. For step-by-step instructions, see [Set up Advanced S3 Monitoring][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations?search=s3&integrationId=amazon-s3
[2]: /cloud_cost_management/advanced_s3_monitoring/setup/
