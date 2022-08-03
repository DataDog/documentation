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

A security signal is generated when a threat is detected in the Datadog Security Platform. You can send notifications to keep your team informed when these signals are generated. Customize the notifications based on the signal's severity and with specific context on the threat. Notifications can be set up for specific [Detection Rules](#detection-rules-notifications) and also more broadly with [Notification Rules](#notification-rules).

### Notification channels

Send notifications through email, Slack, Jira, PagerDuty, or a webhook. 

#### Email

* Notify an active Datadog user by email with `@<DD_USER_EMAIL_ADDRESS>`. **Note**: An email address associated with a pending Datadog user invitation or a disabled user is considered inactive and does not receive notifications.
* Notify any non-Datadog user by email with `@<EMAIL>`.

#### Integrations

Notify your team through connected integrations by using the format `@<INTEGRATION_NAME>-<VALUES>`. Below is a list of prefixes and example links:

| Integration    | Prefix       | Examples       |
|----------------|--------------|----------------|
| [Jira][1]      | `@jira`      | [Examples][2]  |
| [PagerDuty][3] | `@pagerduty` | [Examples][4]  |
| [Slack][5]     | `@slack`     | [Examples][6]  |
| [Webhooks][7]  | `@webhook`   | [Examples][8] |

**Note**: Handles that include parentheses (`(`, `)`) are not supported. When a handle with parentheses is used, the handle is not parsed and no alert is created.

## Detection Rule notifications

When you [create or modify a new Detection Rule][9], you can use the Set Rule Case or Say What’s Happening section to define the notifications that are sent. 

### Set rule case

In the Set Rule Case section, add rule cases to determine when a Detection Rule triggers a security signal and the severity of the signal. Use the Notify dropdown to send signal notifications generated from that case to the selected recipient(s). 

### Say what's happening

Use the Say What's Happening section to determine the content that is sent when a signal is generated. 

#### Rule name

Add a rule name for your detection rule. The rule name appears in the Detection Rules list view, as well as the title of the signal. 

#### Message

Use standard Markdown and [Notification Variables][10] to provide specific details about the signal by referencing its tags and event attributes.

#### Tags

Use the Tag Resulting Signals dropdown to tag your signals with different tags. For example, `attack:sql-injection-attempt`. 

## Notification rules

Notification Rules allow you to set general alerting preferences so that you don’t have to set up notification preferences for individual Detection Rules. For example, you can set up a Notification Rule to send you a notification if any `CRITICAL` or `HIGH` severity signal is triggered. See [Notification Rules][11] for more information on setup and configuration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/jira/
[2]: /integrations/jira/#usage
[3]: /integrations/pagerduty/
[4]: /integrations/pagerduty/#send-a-notification-to-a-specific-pagerduty-service
[5]: /integrations/slack/
[6]: /integrations/slack/#mentions-in-slack-from-monitor-alert
[7]: /integrations/webhooks/
[8]: /integrations/webhooks/#usage
[9]: /security_platform/detection_rules/#creating-and-managing-detection-rules
[10]: /security_platform/notifications/variables/
[11]: /security_platform/notifications/rules/
