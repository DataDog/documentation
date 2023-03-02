---
title: Notifications
kind: documentation
aliases:
  - /security_platform/notifications/
further_reading:
- link: "/security/notifications/rules/"
  tag: "Documentation"
  text: "Set up and configure notification rules"
- link: "/security/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about notification variables to customize notifications"
- link: "/security/detection_rules/"
  tag: "Documentation"
  text: "Explore security detection rules"
---

## Overview

A security signal is generated when a threat is detected in Datadog Security. You can send notifications to keep your team informed when these signals are generated. 

Notifications can be set up for specific [detection rules](#detection-rules-notifications) and also more broadly with [notification rules](#notification-rules). See [Notification Variables][1] to learn how to customize the notifications based on the signal's severity and specific context on the threat. 

## Notification channels

Send notifications through email, Slack, Jira, PagerDuty, or a webhook. 

### Email

{{% notifications-email %}}

### Integrations

{{% notifications-integrations %}}

## Detection Rule notifications

When you [create or modify a new detection rule][2], you can use the **Set rule case** and **Say what’s happening** section to define the notifications that are sent. 

### Set rule case

In the **Set rule case** section, add rule cases to determine when a detection rule triggers a security signal and the severity of the signal. Use the **Notify** dropdown to send signal notifications generated from that case to the [selected recipient(s)](#notification-channels). 

### Say what's happening

Use the **Say what's happening** section to determine the content that is sent when a signal is generated. 

#### Rule name

Add a rule name for your detection rule. The rule name appears in the **Detection Rules** list view, as well as the title of the signal. 

#### Message

Use standard Markdown and [notification variables][1] to provide specific details about the signal by referencing its tags and event attributes.

#### Tags

Use the **Tag resulting signals** dropdown to tag your signals with different tags. For example, `attack:sql-injection-attempt`. 

## Notification rules

Notification rules allow you to set general alerting preferences so that you don’t have to set up notification preferences for individual detection rules. For example, you can set up a notification rule to send a notification if any `CRITICAL` or `HIGH` severity signal is triggered. See [Notification Rules][3] for more information on setup and configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/variables/
[2]: /security/detection_rules/#creating-and-managing-detection-rules
[3]: /security/notifications/rules/
