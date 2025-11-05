---
title: Respond (SOAR) and Report
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/soar/"
  tag: "Blog"
  text: "Automate identity protection, threat containment, and threat intelligence with Datadog SOAR workflows"
- link: "https://www.datadoghq.com/blog/security-operational-metrics/"
  tag: "Blog"
  text: "Measure and optimize security team efficiency with Cloud SIEM security operational metrics"
---

## Overview

Datadog Security Orchestration, Automation, and Response (SOAR) helps you orchestrate security operations, investigate signals, and remediate threats using [Workflow Automation][1]. For example, you can [run a workflow][2] to:

- Block an IP address from your environment.
- Disable a user account.
- Look up an IP address with a third-party threat intelligence provider.
- Send Slack messages to your colleagues to get help with your investigation.
- Assign signals for investigation.
- Automatically enrich cases and close duplicate cases.

SOAR also includes ready-to-use customizable [blueprints][4] to help you build workflows for remediating threats. For example:

- An Identity and Access Management (IAM) workflow that automates responses to suspicious logins and account compromises.
- An Endpoint Detection and Response (EDR) workflow that speeds up the investigation and containment of endpoint threats.
- A Threat Intelligence Enrichment workflow that enriches alerts with external data so you can prioritize and respond more effectively.

Cloud SIEM also provides [security operational metrics][3], so you can determine the efficiency and effectiveness of your security processes.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /actions/workflows/
 [2]: /security/cloud_siem/investigate_security_signals#run-workflow-automation
 [3]: /security/cloud_siem/security_operational_metrics/
 [4]: /actions/workflows/build/#build-a-workflow-from-a-blueprint
