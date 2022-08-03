---
title: Notifications
kind: documentation
further_reading:
- link: "/security_platform/notifications/rules/"
  tag: "Documentation"
  text: "Set up and configure notification rules"
- link: "/security_platform/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about notification variables to customize notifications"
- link: "/security_platform/detection_rules/"
  tag: "Documentation"
  text: "Explore security detection rules"
---

## Overview

A security signal is generated when a threat is detected in the Datadog Security Platform. You can send notifications through email, Slack, Jira, PagerDuty, or a webhook to keep your team informed when these signals are generated. The notifications can be customized based on the signal's severity and with specific context on the threat. They can be set up for specific [Detection Rules](#detection-rules-notifications) and also more broadly with [Notification Rules](#notification-rules).

## Detection Rules notifications

When you [modify or create a new Detection Rule][1], you can use the Set Rule Case or Say What’s Happening section to define the notifications that are sent. 

In the Set Rule Case section, add rule cases to determine when a Detection Rule triggers a security signal and the severity of the signal. There is a `notify` option to add a notification so that signals generated from that case will send a notification to the selected target. 

Use the Say What's Happening section to determine the content that is sent when a signal is generated. The Rule Name section allows you to configure the detection rule name that appears in the rules list view, as well as the title of the signal. You can use [Notification Variables][2] to provide specific details about the signal by referencing its tags and event attributes.

## Notification Rules

Notification Rules allow you to set general alerting preferences so that you don’t have to set up notification preferences for individual Detection Rules. For example, you can set up a Notifications Rule to send you a notification if any `CRITICAL` or `HIGH` severity signal is triggered. See [Notification Rules][3] for more information on setup and configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /security_platform/detection_rules/#creating-and-managing-detection-rules
[2]: /security_platform/notifications/variables/
[3]: /security_platform/notifications/notification_rules/
