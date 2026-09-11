---
title: Getting Started with Infrastructure DevSecOps
description: Introduction to Infrastructure DevSecOps bundles combining monitoring with Cloud Security for Pro and Enterprise tiers.
---

This guide introduces the Infrastructure Monitoring DevSecOps bundles, with links to setup instructions to help you install and configure them.

## Infrastructure DevSecOps

The Infrastructure DevSecOps bundles combine infrastructure monitoring with the security capabilities of [Cloud Security][3].

{{< tabs >}}
{{% tab "Infrastructure DevSecOps Pro" %}}

Infrastructure DevSecOps Pro includes [Containers][1], [Serverless][2], and [Cloud Security][3]. It also includes more than {{< translate key="integration_count" >}} [out-of-the-box integrations][4].

### Setup

To get started with Infrastructure DevSecOps Pro, [install and configure the Datadog Agent][5] for Containers and Serverless. You should also set up the integrations for your services. For detailed instructions, see the following docs:

- [Containers][1]
- [Serverless][2]
- [Integrations][4]

After you install the Agent, configure Cloud Security for your environment.

- [Cloud Security][3]

### Next steps

Learn more about the features included with Infrastructure DevSecOps Pro:

- [Infrastructure List][7]: View activity on your hosts
- [Metrics][8]: Explore and understand your metrics
- [Host and Container Maps][9]: Visualize your hosts and containers
- [Live Containers][10]: Gain real-time visibility into all containers across your environment
- [Serverless][2]: Gain full visibility into all of the managed services that power your serverless applications
- [Cloud Security][11]: Real-time threat detection and continuous configuration audits across your entire cloud infrastructure

[1]: /containers/
[2]: /serverless/
[3]: /security/cloud_security_management/setup/
[4]: /integrations/
[5]: /agent/
[7]: /infrastructure/list/
[8]: /metrics/
[9]: /infrastructure/hostmap/
[10]: /infrastructure/containers/
[11]: /security/cloud_security_management/

{{% /tab %}}
{{% tab "Infrastructure DevSecOps Enterprise" %}}

Infrastructure DevSecOps Enterprise includes [Containers][1], [Serverless][2], [Live Processes][3], and [Cloud Security][4]. It also includes more than {{< translate key="integration_count" >}} [out-of-the-box integrations][5].

### Setup

To get started with Infrastructure DevSecOps Enterprise, [install and configure the Datadog Agent][6] for Containers, Serverless, and Live Processes. You should also set up the integrations for your services. For detailed instructions, see the following docs:

- [Containers][1]
- [Serverless][2]
- [Live Processes][7]
- [Integrations][5]

After you install the Agent, configure Cloud Security for your environment.

- [Cloud Security][4]

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
- [Cloud Security][16]: Real-time threat detection and continuous configuration audits across your entire cloud infrastructure

[1]: /containers/
[2]: /serverless/
[3]: /infrastructure/process/
[4]: /security/cloud_security_management/setup/
[5]: /integrations/
[6]: /agent/
[7]: /infrastructure/process/?tab=linuxwindows#installation
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

[1]: /security/code_security/software_composition_analysis/
[2]: /security/application_security
[3]: /security/cloud_security_management/
[4]: /tracing
[10]: /security/code_security/software_composition_analysis/
