---
title: Getting Started with the DevSecOps Bundles
kind: documentation
---

Intro the bundle (if you’ve bought x bundle), sections for APM/Infra followed by section for Security

*Different from APM bundles as these are for monitoring your infrastructure - there's not a direct linkage to a specific (primary) product like there is for the APM bundles.

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

install and configure the Agent on X. You can enable all of the products by doing X.

## APM DevSecOps

APM DevSecOps Pro includes [APM][1], [Universal Service Monitoring][2], and the [Application Vulnerability Management][5] capabilities of [Application Security Management (ASM)][6].

### Setup

To get started with APM DevSecOps Enterprise, [install and configure the Datadog Agent][7] for APM and Universal Service Monitoring.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}APM{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Universal Service Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you configure the Agent, enable ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

Collection of links to other articles to help users get started after they've installed the bundle.

- Metric collection for APM

## APM DevSecOps Pro

APM DevSecOps Pro includes [APM][1], [Universal Service Monitoring][2], [Data Streams Monitoring][3], and the [Application Vulnerability Management][5] capabilities of [Application Security Management (ASM)][6].

### Setup

To get started with APM DevSecOps Pro, [install and configure the Datadog Agent][7] for APM, Universal Service Monitoring, and Data Streams Monitoring.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}APM{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/data_streams/#setup" >}}Data Streams Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you configure the Agent, enable ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

Collection of links to other articles to help users get started after they've installed the bundle.

- Metric collection for APM

## APM DevSecOps Enterprise

APM DevSecOps Enterprise includes [APM][1], [Universal Service Monitoring][2], [Data Streams Monitoring][3], [Continuous Profiler][4], and the [Application Vulnerability Management][5] capabilities of [Application Security Management (ASM)][6].

### Setup

To get started with APM DevSecOps Enterprise, [install and configure the Datadog Agent][7] for APM, Universal Service Monitoring, Continuous Profiler, and Data Streams Monitoring.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}APM{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/data_streams/#setup" >}}Data Streams Monitoring{{< /nextlink >}}
    {{< nextlink href="/profiler/enabling" >}}Continuous Profiler{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you configure the Agent, enable ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

Collection of links to other articles to help users get started after they've installed the bundle.

- Metric collection for APM
- Includes Workflow Automation (both bundles?)

## Infrastructure DevSecOps Pro

Infrastructure DevSecOps Pro includes [Containers][8], [Serverless][9], and [Cloud Security Management Pro][11]. It also includes more than [650+ out-of-the-box integrations][13].

### Setup

To get started with Infrastructure DevSecOps Pro, [install and configure the Datadog Agent][7] for Containers and Serverless.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you configure the Agent, enable CSM Pro for your environment." >}}
    {{< nextlink href="/security/cloud_security_management/setup/csm_pro" >}}Cloud Security Management Pro{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

Deploy Agent to hosts.

Included with Infrastructure Pro/Enterprise bundles:

- CoScreen
- Containers
- Serverless
- *Metrics
- Live Processes (Enterprise only)
- Watchdog (Enterprise only)
- [Metrics Correlations (Enterprise only)][12]

## Infrastructure DevSecOps Enterprise

Infrastructure DevSecOps Enterprise includes [Containers][8], [Serverless][9], [Live Processes][10], and [Cloud Security Management Enterprise][11]. It also includes more than [650+ out-of-the-box integrations][13].

### Setup

To get started with Infrastructure DevSecOps Enterprise, [install and configure the Datadog Agent][7] for Containers, Serverless, and Live Processes.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/?tab=linuxwindows#installation" >}}Live Processes{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you configure the Agent, enable CSM Enterprise for your environment." >}}
    {{< nextlink href="/security/cloud_security_management/setup/csm_enterprise" >}}Cloud Security Management Enterprise{{< /nextlink >}}
{{< /whatsnext >}}

CIEM

### Next steps

- Infrastructure List
- Host Map
- Container Map
- Live Processes
- Live Containers
- Serverless

[1]: /tracing/
[2]: /universal_service_monitoring/
[3]: /data_streams/
[4]: /profiler/
[5]: /security/application_security/vulnerability_management/
[6]: /security/application_security
[7]: /agent/
[8]: /containers/
[9]: /serverless/
[10]: /infrastructure/process/
[11]: /security/cloud_security_management/setup/
[12]: /dashboards/correlations/
[13]: /integrations/