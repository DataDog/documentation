---
title: Setting up ClickHouse
description: Setting up Database Monitoring on a ClickHouse database
disable_sidebar: true
aliases:
  - /database_monitoring/guide/clickhouse/
---

<div class="alert alert-info">
This feature is in preview and requires Datadog Agent v7.78 or later. Customers who participate in the Datadog Database Monitoring for ClickHouse preview <strong>will not be charged</strong> for usage incurred during the preview period. No additional enablement is required; follow the setup instructions below to get started.
</div>

### ClickHouse versions supported

|                              | Self-hosted | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |

### Setup instructions by hosting type

To learn how to set up Database Monitoring on a ClickHouse database, select your hosting type:

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Self-hosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}