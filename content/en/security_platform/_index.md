---
title: Security Platform
kind: documentation
aliases:
  - compliance_monitoring
  - cloud_siem
further_reading:
- link: "/security_platform/cloud_siem/getting_started"
  tag: "Documentation"
  text: "Begin detecting threats with Cloud SIEM"
- link: "/security_platform/cspm/getting_started"
  tag: "Documentation"
  text: "Start tracking misconfigurations with Cloud Security Posture Management"
- link: "/security_platform/cloud_workload_security/getting_started"
  tag: "Documentation"
  text: "Uncover kernel-level threats with Cloud Workload Security"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not currently available in US1-FED.
</div>
{{< /site-region >}}

## Overview

Bring speed and scale to your production security operations. Datadog’s Security Platform delivers real-time threat detection, and continuous configuration audits across applications, hosts, containers, and cloud infrastructure. Coupled with the greater Datadog observability platform, the Datadog security platform brings unprecedented integration between security and operations aligned to your organizations shared goals.

The Datadog Security Platform includes [Cloud SIEM](#security-monitoring), [Cloud Security Posture Management (CSPM)](#cloud-security-posture-management), and [Cloud Workload Security (CWS)](#cloud-workload-security).

{{< vimeo 408512902 >}}
</br>

## Cloud SIEM

[Cloud SIEM][1] detects real-time threats to your application and infrastructure, like a targeted attack, an IP communicating with your systems which matches a threat intel list, or an insecure configuration. Cloud SIEM is powered by [Datadog Log Management][2]. With these areas combined, you can [automate remediation of threats detected by Datadog Cloud SIEM][3] to speed up your threat-response workflow.

{{< img src="security_platform/security_monitoring_overview.png" alt="Cloud SIEM sources analyzed view in Datadog" width="100%">}}

## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][4] tracks the security hygiene and compliance posture of your production environment, can automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks. See security posture scores across your infrastructure and trace each score back to the applicable benchmark or framework criteria.

{{< img src="security_platform/cspm_overview.png" alt="Cloud Security Posture Management scores in Datadog" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][5] monitors file and process activity across your environment to detect threats to your infrastructure, like AWS EC2 instances, and workloads, like Kubernetes clusters, in real time at the kernel level. Cloud Workload Security uses the unified Datadog Agent, so if you’re already using Datadog to monitor your environment, there’s no need to provision additional resources.

{{< img src="security_platform/cws_overview.png" alt="Cloud Workload Security coverage views in Datadog" width="100%">}}

To get started with the Datadog Security Platform, navigate to the [Setup & Configuration][6] section in the Datadog app, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/cloud_siem
[2]: /logs/
[3]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[4]: /security_platform/cspm/
[5]: /security_platform/cloud_workload_security/
[6]: https://app.datadoghq.com/security/configuration
