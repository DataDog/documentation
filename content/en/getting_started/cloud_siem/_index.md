---
title: Getting Started with Cloud SIEM
kind: documentation
aliases:
    - /cloud-siem/getting_started/
    - /security_monitoring/getting_started/
    - /security_platform/security_monitoring/
    - /security_platform/security_monitoring/getting_started
    - /security_platform/getting_started/
    - /security_platform/cloud_siem/getting_started/
    - /security/cloud_siem/getting_started/
further_reading:
    - link: "https://learn.datadoghq.com/courses/intro-to-cloud-siem"
      tag: "Learning Center"
      text: "Introduction to Cloud SIEM course"
    - link: "https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/"
      tag: "Blog"
      text: "Automate end-to-end processes and quickly respond to events with Datadog Workflows"
    - link: "https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY"
      tag: "App"
      text: "Automate responses with Workflows security blueprints"
    - link: "/security/notifications/variables/"
      tag: "Documentation"
      text: "Learn more about notification variables to customize notifications"
---

## Overview

[Datadog Cloud SIEM][1] detects real-time threats to your application and infrastructure. These threats can include a targeted attack, a threat intel listed IP communicating with your systems, or an insecure configuration. Once detected, a signal is generated and a notification can be sent out to your team.

This guide walks you through best practices for getting started with Cloud SIEM.

## Phase 1: Setup

1. Configure [log ingestion][2] to collect logs from your sources. Review [Best Practices for Log Management][3].

    You can use [out-of-the-box integration pipelines][4] to collect logs for more than {{< translate key="integration_count" >}} integrations. 

    Or, [create custom log pipelines][5] to send:

    - [Cloud Audit logs][6]: See the [AWS Configuration Guide][7] for steps on setting up AWS Cloudtrail for Cloud SIEM.
    - [Identity Provider logs][8]
    - SaaS and Workspace logs
    - Third-party security integrations (for example, AWS GuardDuty)

2. Enable [Cloud SIEM][9].

## Phase 2: Signal exploration

1. Review the [out-of-the-box detection rules][10] that begin detecting threats in your environment immediately. Detection rules apply to all processed logs to maximize detection coverage. See the [detection rules][11] documentation for more information.

2. Explore [security signals][12]. When a threat is detected with a detection rule, a security signal is generated. See the [security signals][13] documentation for more information.

    - [Set up notification rules][14] to alert when signals are generated. You can alert using Slack, Jira, email, or webhooks. See the [notification rules][15] documentation for more information.

## Phase 3: Investigation

1. Explore the [Investigator][16] for faster remediation. See the [Investigator][17] documentation for more information.
2. Use [out-of-the-box-dashboards][18] or [create your own dashboards][19] for investigations, reporting, and monitoring.

## Phase 4: Customization

1. Set up [suppression rules][20] to reduce noise. 
2. Create [custom detection rules][21]. Review [Best Practices for Creating Detection Rules][22].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration
[3]: /logs/guide/best-practices-for-log-management/
[4]: /integrations/
[5]: /logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[8]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[9]: https://app.datadoghq.com/security/getting-started
[10]: /security/default_rules/#cat-cloud-siem-log-detection
[11]: /security/detection_rules/
[12]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[13]: /security/explorer
[14]: https://app.datadoghq.com/security/configuration/notification-rules
[15]: /security/notifications/rules/
[16]: https://app.datadoghq.com/security/investigator/
[17]: /security/cloud_siem/investigator
[18]: https://app.datadoghq.com/dashboard/lists/preset/100
[19]: /dashboards/#overview
[20]: /security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[21]: /security/cloud_siem/log_detection_rules/
[22]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
