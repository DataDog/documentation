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

When a [Notification rule][1] sends security signals to a case project, Datadog creates a case for each signal. If the same detection fires multiple times for the same user or IP address, you get duplicate cases about the same activity.

With signal grouping, Datadog first looks for related signals that are already associated with a case. If it finds one, it adds the new signal to that case instead of creating a new one.

Signal grouping has two parts:

- **Grouping strategies** define when two signals are related to the same activity. You configure grouping strategies once for your organization.
- **Automatic case creation** uses the grouping strategies you configured to decide which case to associate a new signal with.

For example, a detection rule grouped by `@usr.id` fires three times in one hour for the same user. Without grouping, you get three cases. With grouping, you get one case with three signals associated with it.

## Grouping strategies

A grouping strategy defines when signals are related to the same activity.

### Repeated detection

By default, Datadog provides the repeated detection strategy, which groups signals that have all of the same:

- Detection rule
- Rule version
- Group-by values (for example, the same `@usr.id` or `@network.client.ip`)

Datadog looks for related signals in a time window, called the lookback, before the new signal. You can set the lookback to 1, 6, 24, or 48 hours. The default is 24 hours.

<div class="alert alert-info">
  <ul>
    <li>Repeated detection only applies to Cloud SIEM log detection signals that have group-by values. Signals without group-by values always get their own case.</li>
    <li>A new rule version counts as a different detection, because it can match different conditions. Signals from before and after a rule change are not grouped together.</li>
  </ul>
</div>

## Turn on signal grouping

### Permissions

| Action                                                | Required permissions                       |
|-------------------------------------------------------|--------------------------------------------|
| View grouping strategies                              | `Security Signals Read`                    |
| Change the configuration of a grouping strategy       | `Signal Grouping Strategies Write`         |
| View the strategies used by automatic case creation   | `Cases Read` and `Security Signals Read`   |
| Select the strategies used by automatic case creation | `Cases Write` and `Security Signals Write` |

See [Role Based Access Control][3] for more information.

### Configure a grouping strategy

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Grouping Strategies{{< /ui >}}.
1. Open {{< ui >}}Repeated detection{{< /ui >}} and select the lookback you want.

### Select strategies for automatic case creation

1. In Datadog, go to the Cloud SIEM [Security cases settings][2] page.
1. Select the grouping strategies that automatic case creation uses, and click {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-info">
  <ul>
    <li>If you don't have a grouping strategy selected, automatic case creation creates one case for each signal.</li>
    <li>The selected strategies apply to all case projects in your organization.</li>
    <li>Changes only apply to new signals. Existing cases don't change.</li>
  </ul>
</div>

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
| Related signals per strategy | Each strategy keeps the 99 most recent related signals it finds in the lookback, plus the new signal. |
| Signals per case | Signal grouping adds up to 100 signals to a case. A case is also full when it has 500 insights. When a case is full, Datadog creates a new rollover case for the remaining related signals. |

The limit of signals per case only applies to signal grouping. You can still add more signals to the case in other ways.

## See why a signal was grouped

When automatic case creation creates or updates a case, Datadog adds an entry to the case timeline. The entry title shows what happened:

| Entry | Message | When |
| --- | --- | --- |
| {{< ui >}}Case created{{< /ui >}} | Datadog automatically created this case from a signal. | Datadog created a new case. |
| {{< ui >}}Rollover case created{{< /ui >}} | Datadog automatically created this case from a signal because the original case reached its grouping limit of 100 signals. | The eligible case was full, so Datadog created a rollover case. |
| {{< ui >}}Signal added{{< /ui >}} | Datadog automatically added a signal to this case. | Datadog added the new signal to an existing case. |
| {{< ui >}}Signal added{{< /ui >}} | Datadog matched a signal that's already in this case. | The new signal was already in this case. |
| {{< ui >}}Case rolled over{{< /ui >}} | This case reached its grouping limit of 100 signals, so Signal Grouping now adds later signals to a new case. | This case was full, and Datadog created a rollover case. |

When related signals don't fit in one rollover case, Datadog creates more rollover cases. Their entry says that the signal that triggered the case isn't in it.

If grouping strategies are selected, the entry also shows what signal grouping found:

| Message | Meaning |
| --- | --- |
| Signal Grouping found no related signals based on the current settings. | No strategy found a related signal in the lookback, or the signal is missing a value the strategies need, such as group-by values. |
| Signal Grouping selected this case using N strategies and added N related signals. | A related signal was in this case, so Datadog added the new signal to it. |
| Signal Grouping added N related signals using N strategies. | Datadog added the related signals to a new case. |
| The search reached its limit, so some related signals may not be included. | A strategy found more related signals than its limit. See [Limits](#limits). |

Hover over the number of strategies to see which ones found related signals. Hover over the number of signals to see the signals Datadog added.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: https://app.datadoghq.com/security/configuration/siem/case-management
[3]: /account_management/rbac/
[4]: /security/cloud_siem/triage_and_investigate/investigate_security_signals/#manage-default-behavior-for-signals-and-security-cases
