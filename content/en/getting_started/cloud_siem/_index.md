---
title: Getting Started with Cloud SIEM
kind: documentation
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

Datadog Cloud SIEM detects real-time threats to your application and infrastructure. These threats can include a targeted attack, a threat intel listed IP communicating with your systems, or an insecure configuration. Once detected, a signal is generated and a notification can be sent out to your team.

This guide walks you through best practices for getting started with Cloud SIEM.

## Phase 1: Setup

1. Configure [log ingestion][1] to collect logs from your sources. Review [Best Practices for Log Management][2].

    You can use [out-of-the-box integration pipelines][3] to collect logs for more than {{< translate key="integration_count" >}} integrations. 
    
    Or, [create custom log pipelines][4] to send:
   
    - [Cloud Audit logs][5]: See the [AWS Configuration Guide][6] for steps on setting up AWS Cloudtrail for Cloud SIEM.
    - [Identity Provider logs][7]
    - SaaS and Workspace logs
    - Third-party security integrations (for example, AWS GuardDuty)

2. Enable [Cloud SIEM][8].

## Phase 2: Signal exploration

1. Review the [200+ out-of-the-box detection rules][9] that begin detecting threats in your environment immediately. Detection rules apply to all processed logs to maximize detection coverage. See the [detection rules][10] documentation for more information.

2. Explore [security signals][11]. When a threat is detected with a detection rule, a security signal is generated. See the [security signals][12] documentation for more information.

    - [Set up notification rules][13] to alert when signals are generated. You can alert using Slack, Jira, email, or webhooks. See the [notification rules][14] documentation for more information.

## Phase 3: Investigation

1. Explore the [Investigator][15] for faster remediation. See the [Investigator][16] documentation for more information.
2. Use [out-of-the-box-dashboards][17] or [create your own dashboards][18] for faster investigations, reporting, and monitoring.

## Phase 4: Customization

1. Set up [suppression rules][19] to reduce noise. 
2. Create [custom detection rules][20]. Review [Best Practices for Creating Detection Rules][21].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration
[2]: /logs/guide/best-practices-for-log-management/
[3]: /integrations/
[4]: /logs/log_configuration/pipelines/
[5]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[6]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/getting-started
[9]: /security/default_rules/#cat-cloud-siem-log-detection
[10]: /security/detection_rules/
[11]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[12]: /security/explorer
[13]: https://app.datadoghq.com/security/configuration/notification-rules
[14]: /security/notifications/rules/
[15]: https://app.datadoghq.com/security/investigator/
[16]: /security/cloud_siem/investigator
[17]: https://app.datadoghq.com/dashboard/lists/preset/100
[18]: /dashboards/#overview
[19]: /security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[20]: /security/cloud_siem/log_detection_rules/
[21]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
