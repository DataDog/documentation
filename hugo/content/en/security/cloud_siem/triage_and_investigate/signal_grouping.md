---
title: Group Signals into Cases
description: Add related signals to an existing case instead of opening a new case for each signal.
private: true
further_reading:
  - link: "/security/notifications/#cases"
    tag: "Documentation"
    text: "Create cases automatically with Notification Rules"
  - link: "/security/cloud_siem/triage_and_investigate/investigate_security_signals/"
    tag: "Documentation"
    text: "Investigate Security Signals"
  - link: "/incident_response/work_management/settings/"
    tag: "Documentation"
    text: "Case Management settings"
---

<div class="alert alert-info">Signal grouping is in Preview.</div>

## Overview

When a [Notification Rule][1] sends security signals to a case project, Datadog creates a case for each signal. If the same detection fires many times for the same user or IP address, you get many cases about the same activity.

With signal grouping, Datadog first looks for related signals that are already in a case. If it finds one, it adds the new signal to that case instead of creating a new one.

Signal grouping has two parts:

- **Grouping strategies** define when two signals are related. You configure them once for your organization.
- **Automatic case creation** uses the grouping strategies you select to decide which case a new signal goes to.

For example, a detection rule grouped by `@usr.id` fires three times in a few hours for the same user. Without grouping, you get three cases. With grouping, the three signals are in one case.

## Grouping strategies

A grouping strategy defines when two signals are related. Datadog provides the following strategy:

### Repeated detection

Repeated detection groups signals that have:

- the same detection rule,
- the same rule version, and
- the same group-by values, for example the same `@usr.id` or `@network.client.ip`.

Datadog looks for related signals in a time window before the new signal, called the lookback. You can set the lookback to 1, 6, 24, or 48 hours. The default is 24 hours.

Repeated detection only applies to Cloud SIEM log detection signals that have group-by values. Signals without group-by values always get their own case.

A new rule version counts as a different detection, because it can match different conditions. Signals from before and after a rule change are not grouped together.

## Turn on signal grouping

### Configure a grouping strategy

1. Navigate to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Grouping Strategies{{< /ui >}}.
1. Open {{< ui >}}Repeated detection{{< /ui >}} and select the lookback you want.

### Select strategies for automatic case creation

1. Navigate to the Cloud SIEM [Security cases settings][2] page.
1. Select the grouping strategies that automatic case creation uses, and save.

Some things to know:

- If no strategy is selected, automatic case creation creates one case for each signal.
- The selected strategies apply to all case projects in your organization.
- Changes only apply to new signals. Existing cases are not changed.

### Permissions

| Action | Required permissions |
| --- | --- |
| View grouping strategies | `Security Signals Read` |
| Change the configuration of a grouping strategy | `Signal Grouping Strategies Write` |
| View the strategies used by automatic case creation | `Cases Read` and `Security Signals Read` |
| Select the strategies used by automatic case creation | `Cases Write` and `Security Signals Write` |

See [Role Based Access Control][3] for more information.

## How Datadog picks a case

When a new signal is sent to a case project, Datadog:

1. Runs each selected grouping strategy to find related signals.
1. Looks at the cases of those related signals, and keeps the eligible ones. An eligible case:
   - is in the same case project,
   - has the status {{< ui >}}Open{{< /ui >}} or {{< ui >}}In Progress{{< /ui >}},
   - is not archived, deleted, or merged into another case.
1. Adds the new signal to the most recently updated eligible case. If there is none, Datadog creates a new case.

Datadog also adds the related signals that are not yet in an eligible case. Related signals that are already in an eligible case stay where they are.

Datadog follows these rules:

- Closed cases are never reopened. If the only related case is closed, Datadog creates a new case.
- If the new signal is already in an {{< ui >}}Open{{< /ui >}} or {{< ui >}}In Progress{{< /ui >}} case, it stays in that case.
- When a case is full, Datadog creates a new rollover case. See [Limits](#limits).
- Adding a signal does not change the case title, priority, or assignee.
- The [Signal Attachment Settings][4] still apply to the signals added to a case.

## Limits

| Limit | Value |
| --- | --- |
| Lookback for repeated detection | 1, 6, 24, or 48 hours. |
| Related signals per strategy | Each strategy keeps the 100 most recent related signals it finds in the lookback. |
| Signals per case | Signal grouping adds up to 100 signals to a case. When a case is full, Datadog creates a new rollover case for the remaining related signals. |

The limit of signals per case only applies to signal grouping. You can still add more signals to the case in other ways.

## See why a signal was grouped

Each case that automatic case creation creates or updates has an entry in its timeline. The entry shows the signal that triggered the update, the grouping strategies that ran and what they found, and the result. If a strategy found more related signals than its limit, the entry says so.

The result is one of the following:

| Result | Meaning |
| --- | --- |
| No grouping strategy selected | Datadog created one case for the signal. |
| Strategy does not apply | The signal is missing a value the strategy needs, such as group-by values or a rule version. Datadog created a new case. |
| No related signals found | No related signal was found in the lookback. Datadog created a new case. |
| New case with related signals | Related signals were found, but none were in an eligible case. Datadog created a new case and added them. |
| Existing case updated | A related signal was in an eligible case. Datadog added the signal to that case. |
| Previous case is full | The eligible case was full. Datadog created a new rollover case for the remaining related signals found. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: https://app.datadoghq.com/security/configuration/siem/case-management
[3]: /account_management/rbac/
[4]: /security/cloud_siem/triage_and_investigate/investigate_security_signals/#manage-default-behavior-for-signals-and-security-cases
