---
title: Getting Started with the DevSecOps Bundles
kind: documentation
---

Getting started

Options:

Direct users to the Agent setup page in the UI
Guide users on how to set up the various products that make up each bundle (w/links to docs)
Links to docs to help users get started
Combo of the above

*Infra DevSecOps bundles not available for US1-FED???
*Included with all three bundles
    - Error Tracking
    - Service Catalog
*Deployment Tracking is part of Serverless?
*APM DevSecOps isn't available for Fargate

## APM DevSecOps

{{< whatsnext desc="Configure your application to send traces to Datadog:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Sending Traces to Datadog{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Setting Up Universal Service Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

## APM DevSecOps Pro

{{< whatsnext desc="Configure your application to send traces to Datadog:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Sending Traces to Datadog{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Setting Up Universal Service Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Setup Data Streams Monitoring" >}}
    {{< nextlink href="/getting_started/cloud_security_management" >}}Data Streams Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

## APM DevSecOps Enterprise

Includes Profiler + DSM.
Includes Workflow Automation (both bundles)?

{{< whatsnext desc="Configure your application to send traces to Datadog:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Sending Traces to Datadog{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Setting Up Universal Service Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Set Up Data Streams Monitoring" >}}
    {{< nextlink href="/data_streams/" >}}Data Streams Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Set Up Continuous Profiler" >}}
    {{< nextlink href="/profiler/enabling" >}}Enabling the Profiler{{< /nextlink >}}
{{< /whatsnext >}}


## DevSecOps Pro

Deploy Agent to hosts.

Included with Infrastructure Pro/Enterprise bundles:

- CoScreen
- Containers
- Serverless
- *Metrics
- [Processes][1] (Enterprise only)
- Watchdog (Enterprise only)
- [Metrics Correlations (Enterprise only)][2]

## DevSecOps Enterprise

[1]: /infrastructure/process/?tab=linuxwindows
[2]: /dashboards/correlations/