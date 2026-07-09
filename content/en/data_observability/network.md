---
title: Network Requirements for Data Observability
description: "Understand the connectivity model, intake endpoints, and IP ranges required for Data Observability Quality Monitoring, Lineage, and Jobs Monitoring."
further_reading:
- link: '/data_observability/quality_monitoring/'
  tag: 'Documentation'
  text: 'Quality Monitoring'
- link: '/data_observability/jobs_monitoring/'
  tag: 'Documentation'
  text: 'Jobs Monitoring'
- link: '/agent/configuration/network/'
  tag: 'Documentation'
  text: 'Agent network traffic and destinations'
---

## Overview

Data Observability connectivity depends on the product. Traffic follows one of two directions:

- **Datadog connects to your data platform (agentless pull).** Datadog reads metadata and runs queries against your warehouse. If your warehouse restricts inbound access by IP, allowlist Datadog's IP ranges.
- **Telemetry is sent to Datadog (push).** Job runs and lineage are sent to a Datadog intake endpoint over HTTPS, either from an OpenLineage emitter or from the Datadog Agent running on your compute.

Use the sections below to determine what each product requires. To find the values for your [Datadog site][1], use the `DATADOG SITE` selector.

## Quality Monitoring and warehouse-based lineage

Quality Monitoring for data warehouses (Snowflake, Databricks, BigQuery, and Redshift), along with the lineage and query history derived from those warehouses, is agentless. Datadog connects out to your warehouse to read metadata and run metric queries. Only the computed results are returned to Datadog; table rows are not transferred.

If your warehouse or workspace restricts inbound access by IP, add the Datadog **webhooks** IP ranges to your allowlist. These are published in the `webhooks` section of the IP ranges list at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}.

There is no push intake endpoint to allowlist for this path.

## Lineage from OpenLineage emitters

Lineage sent from OpenLineage emitters (for example, Apache Airflow and dbt) is pushed to the Data Observability intake endpoint:

`data-obs-intake.`{{< region-param key="dd_site" code="true" >}}

Events are sent to the `/api/v1/lineage` path over HTTPS (port 443). Allowlist this domain for outbound traffic from the environment that runs your emitters. For setup details, see [Send OpenLineage events to Datadog][2].

## Jobs Monitoring

Jobs Monitoring uses different connectivity depending on how a job runs.

### OpenLineage-based sources (Airflow, dbt, custom)

Job runs are sent as OpenLineage events to `data-obs-intake.`{{< region-param key="dd_site" code="true" >}} on the `/api/v1/lineage` path. Job-run traces and metrics are derived from these events, so there is no separate metrics endpoint to allowlist for this path.

### Spark on classic compute (Databricks, EMR, Dataproc, Kubernetes)

Spark jobs on classic compute are instrumented with the Datadog Agent, installed through an init script. This path requires two things:

- **Outbound from the cluster:** The Agent sends Spark metrics, job traces, and (optionally) logs using the standard Datadog Agent endpoints. No Data Observability-specific endpoints are required. For the full list of destinations and IP ranges, see [Network Traffic][1].
- **Databricks API access:** To collect job execution traces, run history, and tags, Datadog reads the Databricks REST API. If your Databricks workspace has networking restrictions, add the Datadog **webhooks** IP ranges to your workspace allowlist. If you add workspaces through the Datadog UI, also allowlist the **API** IP ranges. Monitoring Databricks over Private Link requires a [Private Action Runner][3].

### Serverless Spark

Serverless jobs cannot run the Agent, so Datadog collects them through the Databricks API only. Add the Datadog **webhooks** IP ranges to your workspace allowlist. Log collection is not supported for serverless jobs.

## IP ranges

All Datadog intake domains are CNAME records pointing to a set of static IP addresses, published as JSON at `https://ip-ranges.`{{< region-param key="dd_site" code="true" >}}. The `webhooks` and `api` sections are the ones relevant to the agentless and Databricks API paths above. Allowlist the `data-obs-intake` domain by name for the push paths.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/network/
[2]: /data_observability/jobs_monitoring/openlineage/
[3]: /data_observability/jobs_monitoring/databricks/
