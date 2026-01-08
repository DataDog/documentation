---
title: Business Intelligence Integrations
description: "Connect your business intelligence tools to Datadog to visualize data lineage, monitor data quality, and understand downstream impact."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability'
---
## Overview

Datadog Data Observability connects directly to your business intelligence tools to help you understand how your data is delivered, transformed, and consumed across dashboards and reports.

By integrating with tools like Tableau, Sigma, and Metabase, Datadog automatically ingests metadata about dashboards, datasets, and fields, and builds complete end-to-end lineage between your data warehouse and BI layer. This enables data teams to trace issues upstream to their source and understand their downstream business impact.

Use these integrations to:
- **Visualize lineage** from warehouse tables and columns to BI dashboards, reports, and fields for impact analysis
- **Monitor data quality** and understand when stale or failed transformations affect downstream dashboards
- **Correlate BI performance and reliability issues** with upstream data pipeline incidents
- **Plan schema or transformation changes** with insight into which dashboards will be affected

{{< whatsnext desc="Connect to these business intelligence tools:" >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/tableau" >}}Tableau{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/sigma" >}}Sigma{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/metabase" >}}Metabase{{< /nextlink >}}
   {{< nextlink href="data_observability/quality_monitoring/business_intelligence/powerbi" >}}Power BI{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
