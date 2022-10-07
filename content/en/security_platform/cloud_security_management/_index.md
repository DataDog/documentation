---
title: Cloud Security Management
kind: documentation
urther_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance"
    tag: "Release Notes"
    text: "See What's New in Datadog Security Compliance"
  - link: "/security_platform/cspm/getting_started"
    tag: "Documentation"
    text: "Start tracking misconfigurations with Cloud Security Posture Management"
  - link: "/security_platform/cloud_workload_security/getting_started"
    tag: "Documentation"
    text: "Uncover kernel-level threats with Cloud Workload Security"
  - link: "https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/"
    tag: "Blog"
    text: "Elevate AWS threat detection with Stratus Red Team"
  - link: "https://www.datadoghq.com/blog/kubernetes-security-best-practices/"
    tag: "Blog"
    text: "Best practices for securing Kubernetes applications"
---

## Overview

[Datadog Cloud Security Management][1] delivers real time threat detection and continuous configuration audits across your entire cloud infrastructure - in a unified view for seamless collaboration and faster remediation.  Powered by observability data, security teams can determine the impact of a threat quickly by tracing the full attack flow and easily identify the resource owner where a vulnerability was triggered.  Engineers are equipped to actively monitor their security risks by incorporating security metrics into their existing workflow.

Cloud Security Management includes [Cloud Security Posture Management (CSPM)](#cloud-security-posture-management), and [Cloud Workload Security (CWS)](#cloud-workload-security).

{{< img src="security_platform/csm_overview.png" alt="Cloud Security Management in Datadog" width="100%">}}


## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][2] tracks the security hygiene and compliance posture of your production environment, can automate audit evidence collection, and catch misconfigurations that leave your organization vulnerable to attacks. See security posture scores across your infrastructure and trace each score back to the applicable benchmark or framework criteria.

{{< img src="security_platform/cspm_overview.png" alt="Cloud Security Posture Management scores in Datadog" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][3] monitors file and process activity across your environment to detect threats to your infrastructure, like AWS EC2 instances, and workloads, like Kubernetes clusters, in real time at the kernel level. Cloud Workload Security uses the unified Datadog Agent, so if you're already using Datadog to monitor your environment, there's no need to provision additional resources.

{{< img src="security_platform/cws_overview.png" alt="Cloud Workload Security coverage views in Datadog" width="100%">}}

To get started with Datadog Security, navigate to the [Setup & Configuration][4] section in the Datadog app, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/csm
[2]: /security_platform/cspm/
[3]: /security_platform/cloud_workload_security/
[4]: https://app.datadoghq.com/security/configuration
