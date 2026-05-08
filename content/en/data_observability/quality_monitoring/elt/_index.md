---
title: ELT Integrations
description: "Connect your ELT tools to Datadog to visualize data lineage from source systems to your data warehouse."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
---

## Overview

Datadog Data Observability connects to your ELT (Extract, Load, Transform) tools to help you understand how data flows from external sources into your data warehouse.

By integrating with tools like Fivetran, Datadog automatically ingests metadata about connectors and schema mappings, and builds end-to-end column-level lineage between your source systems and destination warehouse tables. This enables data teams to trace data quality issues back to their origin and understand the impact of upstream source changes.

Use these integrations to:
- **Visualize lineage** from source tables and columns to destination warehouse tables for impact analysis
- **Identify data freshness issues** caused by failed or delayed ELT syncs
- **Understand upstream dependencies** when warehouse tables change or fail quality checks

{{< whatsnext desc="Connect to these ELT tools:" >}}
   {{< nextlink href="data_observability/quality_monitoring/elt/fivetran" >}}Fivetran{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
