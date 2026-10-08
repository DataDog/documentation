---
title: Setting up ClickHouse
description: Setting up Database Monitoring on a ClickHouse database
disable_sidebar: true
aliases:
  - /database_monitoring/guide/clickhouse/
further_reading:
- link: "/database_monitoring/guide/clickhouse_agent_upgrade"
  tag: "Documentation"
  text: "Upgrading the ClickHouse integration from Agent versions earlier than 7.84"
- link: "https://www.datadoghq.com/blog/database-monitoring-for-clickhouse/"
  tag: "Blog"
  text: "Monitor ClickHouse query performance with Datadog Database Monitoring"
---

<div class="alert alert-info">
This feature is in preview and requires Datadog Agent v7.84 or later. If you set up Database Monitoring for ClickHouse with an Agent version earlier than 7.84, see <a href="/database_monitoring/guide/clickhouse_agent_upgrade/">Upgrading the ClickHouse integration</a> to grant the additional permissions before you upgrade. Customers who participate in the Datadog Database Monitoring for ClickHouse preview <strong>will not be charged</strong> for usage incurred during the preview period. No additional enablement is required; follow the setup instructions below to get started.
</div>

### ClickHouse versions supported

|                              | Self-hosted | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 26.3              | {{< X >}}   | {{< X >}}        |

### Setup instructions by hosting type

To learn how to set up Database Monitoring on a ClickHouse database, select your hosting type:

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Self-hosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
