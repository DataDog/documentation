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
    - link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
      tag: "Blog"
      text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
    - link: "https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY"
      tag: "App"
      text: "Automate responses with Workflows security blueprints"
    - link: "/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/"
      tag: "Documentation"
      text: "AWS configuration guide for Cloud SIEM"
    - link: "/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/"
      tag: "Documentation"
      text: "Google Cloud configuration guide for Cloud SIEM"
    - link: "/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/"
      tag: "Documentation"
      text: "Azure configuration guide for Cloud SIEM"
    - link: "/security/notifications/variables/"
      tag: "Documentation"
      text: "Learn more about notification variables to customize notifications"
    - link: "https://dtdg.co/fe"
      tag: "Foundation Enablement"
      text: "Join an interactive session to elevate your security and threat detection"
    - link: "https://securitylabs.datadoghq.com/"
      tag: "Security Labs"
      text: "Read about security-related topics on Datadog's Security Labs"
    - link: "https://www.datadoghq.com/blog/content-packs/"
      tag: "Blog"
      text: "Easily ingest and monitor security logs with Cloud SIEM Content Packs"
---

## Overview

[Datadog Cloud SIEM][1] detects real-time threats to your application and infrastructure. These threats can include a targeted attack, a threat intel listed IP communicating with your systems, or an insecure configuration. Once detected, a signal is generated and a notification can be sent out to your team.

This guide walks you through best practices for getting started with Cloud SIEM.

## Phase 1: Setup

1. Configure [log ingestion][2] to collect logs from your sources. Review [Best Practices for Log Management][3].

    You can use [out-of-the-box integration pipelines][4] to collect logs for more than {{< translate key="integration_count" >}} integrations, or [create custom log pipelines][5] to send:

    - [Cloud Audit logs][6]
    - [Identity Provider logs][7]
    - SaaS and Workspace logs
    - Third-party security integrations (for example, Amazon GuardDuty)

2. Enable [Cloud SIEM][8].
3. Select and configure [Content Packs][9], which provide out-of-the-box content for critical security log sources.
4. Select and configure [additional log sources][10] you want Cloud SIEM to analyze.
5. Click **Activate**. A custom Cloud SIEM log index (`cloud-siem-xxxx`) is created.
6. If the Cloud SIEM setup page shows the warning "The Cloud SIEM index is not in the first position", follow the steps in the [Reorder the Cloud SIEM index](#reorder-the-cloud-siem-index) section.

### Reorder the Cloud SIEM index

{{< img src="getting_started/cloud_siem/cloud-siem-setup-warning.png" alt="A yellow warning box saying that the index configuration needs attention" style="width:80%;">}}

1. Click **Reorder index in Logs Configuration**.

2. Confirm the modal title says "Move cloud-siem-xxxx to..." and that the `cloud-siem-xxxx` text in the index column is light purple.

{{< img src="getting_started/cloud_siem/move-index-modal.png" alt="The Move cloud-siem-xxxx modal showing the list of indexes with cloud-siem-xxxx index as the last index" style="width:60%;">}}

3. To select the new placement of your index, click the top line of the index where you want `cloud-siem-xxxx` to go. For example, if you want to make the `cloud-siem-xxxx` index the first index, click on the line *above* the current first index. The new position is highlighted with a thick blue line.

{{< img src="getting_started/cloud_siem/move-index-highlight.png" alt="The Move cloud-siem-xxxx modal showing a blue line at the top of the first index" style="width:65%;">}}

4. The text confirms the position selected: "Select the new placement of your index: Position 1". Click **Move**.

5. Review the warning text. If you are satisfied with the change, click **Reorder**.

6. Review the index order and confirm that the `cloud-siem-xxxx` index is where you want it. If you want to move the index, click the **Move to** icon and follow steps 3 to 5.

7. Navigate back to the [Cloud SIEM setup page][11].

The Cloud SIEM index should be in the first index position now. If the setup page still displays a warning about the index position, wait a few minutes and refresh the browser.

After the index is moved to the first index position, review the settings and statuses for the [Content Packs][11] and [other log sources][11]. For each integration that shows a warning or an error, click on the integration and follow the instructions to fix it.

## Phase 2: Signal exploration

1. Review the [out-of-the-box detection rules][12] that begin detecting threats in your environment immediately. Detection rules apply to all processed logs to maximize detection coverage. See the [detection rules][13] documentation for more information.

2. Explore [security signals][14]. When a threat is detected with a detection rule, a security signal is generated. See the [security signals][15] documentation for more information.

    - [Set up notification rules][16] to alert when signals are generated. You can alert using Slack, Jira, email, webhooks, and other integrations. See the [notification rules][17] documentation for more information.
    - Subscribe to the weekly [threat digest][18] reports to begin investigation and remediation of the most important security threats discovered in the last seven days.

## Phase 3: Investigation

1. Explore the [Investigator][19] for faster remediation. See the [Investigator][20] documentation for more information.
2. Use [out-of-the-box-dashboards][21] or [create your own dashboards][22] for investigations, reporting, and monitoring.

## Phase 4: Customization

1. Set up [suppression rules][23] to reduce noise. 
2. Create [custom detection rules][24]. Review [Best Practices for Creating Detection Rules][25].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration/siem/log-sources
[3]: /logs/guide/best-practices-for-log-management/
[4]: /integrations/
[5]: /logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/landing
[9]: https://app.datadoghq.com/security/content-packs
[10]: https://app.datadoghq.com/security/configuration/siem/log-sources
[11]: https://app.datadoghq.com/security/configuration/siem/setup
[12]: /security/default_rules/#cat-cloud-siem-log-detection
[13]: /security/detection_rules/
[14]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[15]: /security/cloud_siem/investigate_security_signals
[16]: https://app.datadoghq.com/security/configuration/notification-rules
[17]: /security/notifications/rules/
[18]: https://app.datadoghq.com/security/configuration/reports
[19]: https://app.datadoghq.com/security/investigator/
[20]: /security/cloud_siem/investigator
[21]: https://app.datadoghq.com/dashboard/lists/preset/100
[22]: /dashboards/#overview
[23]: /security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[24]: /security/cloud_siem/log_detection_rules/
[25]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
