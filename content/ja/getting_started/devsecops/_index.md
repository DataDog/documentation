---
title: Getting Started with the DevSecOps Bundles
kind: documentation
---

This guide introduces the DevSecOps bundles with links to setup instructions to help you install and configure them.

## APM DevSecOps

The APM DevSecOps bundles combine [Application Performance Monitoring (APM)][4] with the [Software Composition Analysis][10] capabilities of [Application Security Management (ASM)][2].

{{< tabs >}}
{{% tab "APM DevSecOps" %}}

APM DevSecOps includes [APM][1], [Universal Service Monitoring][2], and the [Software Composition Analysis][3] capabilities of [ASM][4].

### セットアップ

To get started with APM DevSecOps, [install and configure the Datadog Agent][5] for APM and Universal Service Monitoring. For detailed instructions, see the following docs:

- [APM][6]
- [Universal Service Monitoring][7]

After you install the Agent, enable SCA for your environment.

- [Software Composition Analysis][10]

### Next steps

Learn more about the features included with APM DevSecOps:

- [APM Metrics][9]: Learn more about trace application metrics
- [Universal Service Monitoring][2]: Gain visibility into your service health metrics
- [Software Composition Analysis][3]: Detect vulnerabilities in your service's open source dependencies

[1]: /tracing/
[2]: /universal_service_monitoring/
[3]: /security/application_security/vulnerability_management/
[4]: /security/application_security
[5]: /agent/
[6]: /tracing/trace_collection/
[7]: /universal_service_monitoring/setup/
[8]: /security/application_security/enabling/
[9]: /tracing/metrics/
[10]: /getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{% tab "APM DevSecOps Pro" %}}

APM DevSecOps Pro includes [APM][1], [Universal Service Monitoring][2], [Data Streams Monitoring][3], and the [Software Composition Analysis][4] capabilities of [ASM][5].

### セットアップ

To get started with APM DevSecOps Pro, [install and configure the Datadog Agent][6] for APM, Universal Service Monitoring, and Data Streams Monitoring. For detailed instructions, see the following docs:

- [APM][7]
- [Universal Service Monitoring][8]
- [Data Streams Monitoring][9]

After you install the Agent, configure Software Composition Analysis for your environment.

- [Software Composition Analysis][10]

#### Next steps

Learn more about the features included with APM DevSecOps Pro:

- [APM Metrics][11]: Learn more about trace application metrics
- [Universal Service Monitoring][2]: Gain visibility into your service health metrics
- [Data Streams Monitoring][3]: Understand and manage your pipelines at scale
- [Software Composition Analysis][4]: Detect vulnerabilities in your service's open source dependencies

[1]: /tracing/
[2]: /universal_service_monitoring/
[3]: /data_streams/
[4]: /security/application_security/vulnerability_management/
[5]: /security/application_security
[6]: /agent/
[7]: /tracing/trace_collection/
[8]: /universal_service_monitoring/setup/
[9]: /data_streams/#setup
[10]: /getting_started/application_security/vulnerability_management/
[11]: /tracing/metrics/

{{% /tab %}}
{{% tab "APM DevSecOps Enterprise" %}}

APM DevSecOps Enterprise includes [APM][1], [Universal Service Monitoring][2], [Data Streams Monitoring][3], [Continuous Profiler][4], and the [Software Composition Analysis][5] capabilities of [ASM][6].

### セットアップ

To get started with APM DevSecOps Enterprise, [install and configure the Datadog Agent][7] for APM, Universal Service Monitoring, Continuous Profiler, and Data Streams Monitoring. For detailed instructions, see the following docs:

- [APM][8]
- [Universal Service Monitoring][9]
- [Data Streams Monitoring][10]
- [Continuous Profiler][11]

After you install the Agent, configure ASM for your environment.

- [Application Security Management][14]

### Next steps

Learn more about the features included with APM DevSecOps Enterprise:

- [APM Metrics][13]: Learn more about trace application metrics
- [Universal Service Monitoring][2]: Gain visibility into your service health metrics
- [Data Streams Monitoring][3]: Understand and manage your pipelines at scale
- [Continuous Profiler][4]: Optimize code performance in production
- [Software Composition Analysis][5]: Detect vulnerabilities in your service's open source dependencies

[1]: /tracing/
[2]: /universal_service_monitoring/
[3]: /data_streams/
[4]: /profiler/
[5]: /security/application_security/vulnerability_management/
[6]: /security/application_security
[7]: /agent/
[8]: /tracing/trace_collection/
[9]: /universal_service_monitoring/setup/
[10]: /data_streams/#setup
[11]: /profiler/enabling
[12]: /security/application_security/enabling/
[13]: /tracing/metrics/
[14]: /getting_started/application_security/vulnerability_management/

{{% /tab %}}
{{< /tabs >}}

<br>

## Infrastructure DevSecOps

The Infrastructure DevSecOps bundles combine infrastructure monitoring with the security capabilities of [Cloud Security Management (CSM)][3].

{{< tabs >}}
{{% tab "Infrastructure DevSecOps Pro" %}}

Infrastructure DevSecOps Pro includes [Containers][1], [Serverless][2], and [CSM Pro][3]. It also includes more than [750+ out-of-the-box integrations][4].

### セットアップ

To get started with Infrastructure DevSecOps Pro, [install and configure the Datadog Agent][5] for Containers and Serverless. You should also set up the integrations for your services. For detailed instructions, see the following docs:

- [Containers][1]
- [Serverless][2]
- [Integrations][4]

After you install the Agent, configure CSM Pro for your environment.

- [Cloud Security Management Pro][6]

### Next steps

Learn more about the features included with Infrastructure DevSecOps Pro:

- [Infrastructure List][7]: View activity on your hosts
- [Metrics][8]: Explore and understand your metrics
- [Host and Container Maps][9]: Visualize your hosts and containers
- [Live Containers][10]: Gain real-time visibility into all containers across your environment
- [Serverless][2]: Gain full visibility into all of the managed services that power your serverless applications
- [Cloud Security Management][11]: Real-time threat detection and continuous configuration audits across your entire cloud infrastructure

[1]: /containers/
[2]: /serverless/
[3]: /security/cloud_security_management/setup/
[4]: /integrations/
[5]: /agent/
[6]: /security/cloud_security_management/setup/csm_pro
[7]: /infrastructure/list/
[8]: /metrics/
[9]: /infrastructure/hostmap/
[10]: /infrastructure/containers/
[11]: /security/cloud_security_management/

{{% /tab %}}
{{% tab "Infrastructure DevSecOps Enterprise" %}}

Infrastructure DevSecOps Enterprise includes [Containers][1], [Serverless][2], [Live Processes][3], and [CSM Enterprise][4]. It also includes more than [750+ out-of-the-box integrations][5].

### セットアップ

To get started with Infrastructure DevSecOps Enterprise, [install and configure the Datadog Agent][6] for Containers, Serverless, and Live Processes. You should also set up the integrations for your services. For detailed instructions, see the following docs:

- [Containers][1]
- [Serverless][2]
- [Live Processes][7]
- [Integrations][5]

After you install the Agent, configure CSM Enterprise for your environment.

- [Cloud Security Management Enterprise][8]

### Next steps

Learn more about the features included with Infrastructure DevSecOps Enterprise:

- [Infrastructure List][9]: View activity on your hosts
- [Metrics][10]: Explore and understand your metrics
- [Metric Correlations][11]: Find potential root causes for an issue by searching for other metrics that exhibit irregular behavior
- [Host and Container Maps][12]: Visualize your hosts and containers
- [Live Containers][13]: Gain real-time visibility into all containers across your environment
- [Live Processes][14]: Gain real-time visibility into the process running on your infrastructure
- [Serverless][2]: Gain full visibility into all of the managed services that power your serverless 
- [Watchdog][15]: Automatically detect potential application and infrastructure issues
- [Cloud Security Management][16]: Real-time threat detection and continuous configuration audits across your entire cloud infrastructure

[1]: /containers/
[2]: /serverless/
[3]: /infrastructure/process/
[4]: /security/cloud_security_management/setup/
[5]: /integrations/
[6]: /agent/
[7]: /infrastructure/process/?tab=linuxwindows#installation
[8]: /security/cloud_security_management/setup/csm_enterprise
[9]: /infrastructure/list/
[10]: /metrics/
[11]: /dashboards/correlations/
[12]: /infrastructure/hostmap/
[13]: /infrastructure/containers/
[14]: /infrastructure/process/
[15]: /watchdog/
[16]: /security/cloud_security_management/

{{% /tab %}}
{{< /tabs >}}

[1]: /security/application_security/vulnerability_management/
[2]: /security/application_security
[3]: /security/cloud_security_management/
[4]: /tracing
[10]: /security/application_security/software_composition_analysis/