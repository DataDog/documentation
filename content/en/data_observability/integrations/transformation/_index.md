---
title: Transformation Integrations
description: "Connect your transformation tools to Datadog to monitor job runs, track execution performance, and visualize data lineage."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability'
---
## Overview

Datadog Data Observability connects directly to your transformation layer to help you understand how your data is produced, transformed, and delivered across your pipelines.

For example, by integrating with dbt, Datadog automatically ingests metadata about model runs, execution performance, and lineage relationships, which allows you to trace data issues to their source and understand downstream impact.

Use these integrations to:
- **Monitor job runs** to track execution time, success rates, and model freshness
- **Correlate models and warehouse tables** to understand how transformations affect data health and usage
- **Visualize lineage** across transformations and your data warehouse for root-cause and impact analysis
- **Identify performance and reliability issues** in your transformation workflows before they reach downstream consumers

{{< whatsnext desc="Connect to these transformation tools:" >}}
   {{< nextlink href="data_observability/integrations/transformation/dbtcloud" >}}dbt Cloud{{< /nextlink >}}
   {{< nextlink href="data_observability/integrations/transformation/dbtcore" >}}dbt Core{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/airflow" >}}Airflow{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/emr" >}}Spark on Amazon EMR{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/dataproc" >}}Spark on Google Dataproc{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/kubernetes" >}}Spark on Kubernetes{{< /nextlink >}}
   {{< nextlink href="data_observability/jobs_monitoring/databricks" >}}Databricks{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
