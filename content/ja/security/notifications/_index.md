---
title: Notifications
aliases:
  - /security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: Documentation
  text: Set up and configure notification rules
- link: /security/notifications/variables/
  tag: Documentation
  text: Learn more about notification variables to customize notifications
- link: /security/detection_rules/
  tag: Documentation
  text: Explore security detection rules
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

## 概要

Notifications allow you to keep your team informed when a security signal is generated. A security signal is generated when at least one case defined in a [detection rule][2] is matched over a given period of time.

## Notification types

Notifications can be set up for individual [detection rules](#detection-rules) and also more broadly with [notification rules](#notification-rules).

### 検出ルール

When you [create or modify a detection rule][2], you can define the notifications that are sent. For example, you can add rule cases to determine when a detection rule triggers a security signal. You can also customize the notification message in the [**Say what's happening**](#say-whats-happening) section.

#### Say what's happening

Use the **Say what's happening** section to customize the notification message using Markdown and [notification variables][1]. This allows you to provide additional details about the signal by referencing its tags and event attributes. You can also add tags to the generated signal, for example, `attack:sql-injection-attempt`.

### 通知ルール

Notification rules allow you to set general alerting preferences that span across multiple detection rules and signals instead of having to set up notification preferences for individual detection rules. For example, you can set up a notification rule to send a notification if any `CRITICAL` or `HIGH` severity signal is triggered. See [Notification Rules][3] for more information on setup and configuration.

## 通知チャンネル

Notifications can be sent to individuals and teams through email, Slack, Jira, PagerDuty, webhooks, and more.

### Email

{{% notifications-email %}}

### インテグレーション

{{% notifications-integrations %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/variables/
[2]: /security/detection_rules/#creating-and-managing-detection-rules
[3]: /security/notifications/rules/
