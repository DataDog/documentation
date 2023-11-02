---
title: Getting Started with the DevSecOps Bundles
kind: documentation
---

The APM DevSecOps and Infrastructure DevSecOps bundles combine application performance monitoring and infrastructure monitoring with security capabilities of Application Security Management (ASM) and Cloud Security Management (CSM).

This guide provides an introduction to the bundles with links to setup instructions to help guide you as you get setup with the various products that make up each bundle.

*Infra DevSecOps bundles not available for US1-FED???
*Included with all three bundles
    - Error Tracking
    - Service Catalog
*Deployment Tracking is part of Serverless?
*APM DevSecOps isn't available for Fargate

Deploy Agent to hosts.

Included with Infrastructure Pro/Enterprise bundles:

- CoScreen
- Containers
- Serverless
- *Metrics
- Live Processes (Enterprise only)
- Watchdog (Enterprise only)
- [Metrics Correlations (Enterprise only)][12]
 Includes Workflow Automation (both bundles?) <- APM or Infra or both?

## APM DevSecOps

APM DevSecOps Pro includes [APM][1], [Universal Service Monitoring][2], and the [Application Vulnerability Management][5] capabilities of [Application Security Management (ASM)][6].

### Setup

To get started with APM DevSecOps Enterprise, [install and configure the Datadog Agent][7] for APM and Universal Service Monitoring.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}APM{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Universal Service Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you install the Agent, enable ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

{{< whatsnext desc="Learn more about the features included with APM DevSecOps:" >}}
    {{< nextlink href="/tracing/metrics/" >}}APM Metrics{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/security/application_security/vulnerability_management/" >}}Application Vulnerability Management{{< /nextlink >}}
{{< /whatsnext >}}

## APM DevSecOps Pro

APM DevSecOps Pro includes [APM][1], [Universal Service Monitoring][2], [Data Streams Monitoring][3], and the [Application Vulnerability Management][5] capabilities of [Application Security Management (ASM)][6].

### Setup

To get started with APM DevSecOps Pro, [install and configure the Datadog Agent][7] for APM, Universal Service Monitoring, and Data Streams Monitoring.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/tracing/trace_collection/" >}}APM{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/setup/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/data_streams/#setup" >}}Data Streams Monitoring{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you install the Agent, configure ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

{{< whatsnext desc="Learn more about the features included with APM DevSecOps Pro:" >}}
    {{< nextlink href="/tracing/metrics/" >}}APM Metrics{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/data_streams/" >}}Data Streams Monitoring{{< /nextlink >}}
    {{< nextlink href="/security/application_security/vulnerability_management/" >}}Application Vulnerability Management{{< /nextlink >}}
{{< /whatsnext >}}

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

{{< whatsnext desc="After you install the Agent, configure ASM for your environment." >}}
    {{< nextlink href="/tracing/trace_collection/" >}}Application Security Management{{< /nextlink >}}
{{< /whatsnext >}}

### Next steps

{{< whatsnext desc="Learn more about the features included with APM DevSecOps Enterprise:" >}}
    {{< nextlink href="/tracing/metrics/" >}}APM Metrics{{< /nextlink >}}
    {{< nextlink href="/universal_service_monitoring/" >}}Universal Service Monitoring{{< /nextlink >}}
    {{< nextlink href="/data_streams/" >}}Data Streams Monitoring{{< /nextlink >}}
    {{< nextlink href="/profiler/" >}}Continuous Profiler{{< /nextlink >}}
    {{< nextlink href="/security/application_security/vulnerability_management/" >}}Application Vulnerability Management{{< /nextlink >}}
{{< /whatsnext >}}

## Infrastructure DevSecOps Pro

Infrastructure DevSecOps Pro includes [Containers][8], [Serverless][9], and [Cloud Security Management Pro][11]. It also includes more than [650+ out-of-the-box integrations][13].

### Setup

To get started with Infrastructure DevSecOps Pro, [install and configure the Datadog Agent][7] for Containers and Serverless.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you install the Agent, configure CSM Pro for your environment." >}}
    {{< nextlink href="/security/cloud_security_management/setup/csm_pro" >}}Cloud Security Management Pro{{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Note</strong>: The CSM Vulnerabilities capabilities of CSM Pro are in beta. For setup instructions, see <a href="/security/infrastructure_vulnerabilities/setup/">Setting up Cloud Security Management Vulnerabilities</a>.</div>

### Next steps

{{< whatsnext desc="Learn more about the features included with Infrastructure DevSecOps Pro:" >}}
    {{< nextlink href="/infrastructure/list/" >}}Infrastructure List{{< /nextlink >}}
    {{< nextlink href="/metrics/" >}}Metrics{{< /nextlink >}}
    {{< nextlink href="/infrastructure/hostmap/" >}}Host and Container Maps{{< /nextlink >}}
    {{< nextlink href="/infrastructure/containers/" >}}Live Containers{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management" >}}Cloud Security Management{{< /nextlink >}}
{{< /whatsnext >}}

## Infrastructure DevSecOps Enterprise

Infrastructure DevSecOps Enterprise includes [Containers][8], [Serverless][9], [Live Processes][10], and [Cloud Security Management Enterprise][11]. It also includes more than [650+ out-of-the-box integrations][13].

*Cloud or Agent integrations? Or both?

### Setup

To get started with Infrastructure DevSecOps Enterprise, [install and configure the Datadog Agent][7] for Containers, Serverless, and Live Processes.

{{< whatsnext desc="For detailed instructions, see the following docs:" >}}
    {{< nextlink href="/containers/" >}}Containers{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/?tab=linuxwindows#installation" >}}Live Processes{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="After you install the Agent, configure CSM Enterprise for your environment." >}}
    {{< nextlink href="/security/cloud_security_management/setup/csm_enterprise" >}}Cloud Security Management Enterprise{{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>Note</strong>: The CSM Identity Risks and CSM Vulnerabilities capabilities of CSM Enterprise are in beta. For setup instructions, see <a href="/security/identity_risks/#setup">Cloud Security Management Identity Risks</a> and <a href="/security/infrastructure_vulnerabilities/setup/">Setting up Cloud Security Management Vulnerabilities</a>.</div>

### Next steps

{{< whatsnext desc="Learn more about the features included with Infrastructure DevSecOps Enterprise:" >}}
    {{< nextlink href="/infrastructure/list/" >}}Infrastructure List{{< /nextlink >}}
    {{< nextlink href="/metrics/" >}}Metrics{{< /nextlink >}}
    {{< nextlink href="/dashboards/correlations/" >}}Metric Correlations{{< /nextlink >}}
    {{< nextlink href="/infrastructure/hostmap/" >}}Host and Container Maps{{< /nextlink >}}
    {{< nextlink href="/infrastructure/containers/" >}}Live Containers{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/" >}}Live Processes{{< /nextlink >}}
    {{< nextlink href="/serverless/" >}}Serverless{{< /nextlink >}}
    {{< nextlink href="/watchdog/" >}}Watchdog{{< /nextlink >}}
    {{< nextlink href="/security/cloud_security_management" >}}Cloud Security Management{{< /nextlink >}}
{{< /whatsnext >}}

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
[13]: /integrations/