---
title: Data Lake Integrations
description: "Connect your data lake to Datadog to monitor Iceberg table metadata, freshness, and quality."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
---
## Overview

Datadog Data Observability connects to your data lake catalogs to monitor the health of your Iceberg tables. When connected, Datadog syncs table metadata including schemas, freshness, row counts, and table sizes.

Use these integrations to:
- **Sync your Iceberg table metadata** to keep Datadog in sync with your data lake structure
- **Monitor data freshness** to detect stale or delayed data
- **Track table metrics** such as row counts and table sizes over time

{{< whatsnext desc="Connect to these data lake catalogs:" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_lakes/aws_glue" >}}Iceberg Tables (AWS Glue){{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
