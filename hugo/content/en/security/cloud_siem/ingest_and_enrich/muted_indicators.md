---
title: Muted Indicators
description: Mute indicators of compromise that are benign for your organization so Cloud SIEM rates them as benign. Covers how muting changes log enrichment, Datadog-managed muted indicators, and how to mute, review, and unmute indicators.
disable_toc: false
further_reading:
- link: "/security/cloud_siem/triage_and_investigate/ioc_explorer/"
  tag: "Documentation"
  text: "Investigate indicators with the IOC Explorer"
- link: "/security/threat_intelligence/"
  tag: "Documentation"
  text: "Threat intelligence in Datadog Security"
- link: "/security/cloud_siem/ingest_and_enrich/threat_intelligence/"
  tag: "Documentation"
  text: "Bring your own threat intelligence to Cloud SIEM"
---

## Overview

Threat intelligence feeds can flag an indicator that is harmless for your organization, such as your corporate VPN egress IP address, a sanctioned cryptomining pool, or the domain of an internal tool. Muting an indicator tells Cloud SIEM to rate it as benign for your organization, so your team stops triaging the same false positives.

Muting does not remove threat intelligence. Muted indicators keep their enrichment and stay visible in the [IOC Explorer][1], so you can still search for them and see why they were flagged.

Indicators can be muted in two ways:

- **Datadog-managed**: Datadog maintains a list of known-benign indicators, such as widely used domains, and mutes them for every organization. This list is read-only.
- **Muted by your organization**: Indicators your team mutes. These mutes apply to your organization only, and you can unmute them at any time.

## How muting works

When an indicator is muted, Cloud SIEM changes how it enriches new logs that match the indicator:

- The [intention][2] of each eligible threat intelligence result changes to `benign`.
- The log keeps the rest of its threat intelligence enrichment, such as the source and category, and is marked with `has_been_muted: true`.
- The indicator's IOC score does not change.

Muting applies to logs that Cloud SIEM processes after the mute takes effect. Logs that were already processed keep their original enrichment.

### When a mute takes effect

- **IOC Explorer**: Shows the new mute state immediately.
- **Log enrichment**: May take up to an hour to catch up. During that time, new logs, and detections based on them, may still use the original rating.

Unmuting follows the same timing.

### Threat intelligence that muting does not change

Muting your organization's indicators does not change ratings from:

- threat intelligence you bring yourself through [reference tables][3]
- Threat Intelligence Platform (TIP) integrations: MISP, OpenCTI, and Anomali ThreatStream

## Prerequisites

- Your organization must subscribe to Cloud SIEM.
- To view muted indicators, you need the `security_monitoring_signals_read` [permission][4].
- To mute or unmute indicators, you need the `security_monitoring_signals_write` [permission][4].

## Mute indicators

You can mute IP addresses, domains, and SHA-256 file hashes. Mute single values only. CIDR ranges cannot be muted, so mute individual IP addresses instead.

### Mute an indicator

1. Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5].
1. Click an indicator to open its side panel.
1. Click {{< ui >}}Mute This IoC{{< /ui >}}.
1. Optionally, enter a reason, such as `Corporate VPN egress`. The reason can be up to 100 characters and appears on the Muted Indicators page.
1. Click {{< ui >}}Mute{{< /ui >}}.

### Mute multiple indicators

1. In the [IOC Explorer][5], select the checkboxes next to the indicators you want to mute. You can mute up to 100 indicators at a time.
1. In the bulk actions menu, click {{< ui >}}Mute{{< /ui >}}.
1. Optionally, enter a reason. The reason applies to every selected indicator.
1. Confirm the action.

Selected indicators that are already muted, by your organization or by Datadog, are left unchanged.

## Review muted indicators

The Muted Indicators page lists every active mute, from Datadog and from your organization. To open it, do either of the following:

- Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Muted Indicators{{< /ui >}}][6].
- In the [IOC Explorer][5], click {{< ui >}}Muted Indicators{{< /ui >}}. The list opens in a side panel. Click {{< ui >}}Open full page{{< /ui >}} to go to the settings page.

For each indicator, the list shows the indicator type, scope, and reason. Datadog-managed rows show the source feed. Rows muted by your organization show who muted the indicator and when. Use the search bar to filter by indicator, indicator type, scope (your organization or Datadog-managed), source, or reason.

### Find muted indicators in the IOC Explorer

In the IOC Explorer, the {{< ui >}}Custom mute{{< /ui >}} column shows {{< ui >}}Muted{{< /ui >}} for indicators your organization muted. To show only those indicators, filter with the {{< ui >}}Muted{{< /ui >}} facet.

The column and facet reflect your organization's mutes only. Indicators muted only by Datadog don't appear as muted in this column or facet. To see every mute, use the [Muted Indicators page](#review-muted-indicators).

### View mute history

The {{< ui >}}Conversation{{< /ui >}} tab in an indicator's side panel lists every mute and unmute event, with who performed it and when. These events appear alongside the indicator's comments and triage changes.

## Unmute indicators

You can unmute indicators that your organization muted. Datadog-managed mutes are read-only.

To unmute indicators, do one of the following:

- In the IOC Explorer, open the indicator's side panel and click {{< ui >}}Un-mute This IoC{{< /ui >}}.
- On the [Muted Indicators page][6], click {{< ui >}}Un-mute{{< /ui >}} on the indicator's row.
- On the Muted Indicators page, select up to 100 indicators and click {{< ui >}}Un-mute{{< /ui >}}.

If Datadog also mutes the indicator, unmuting removes only your organization's mute. The indicator stays rated as benign.

## Limits

| Limit | Value |
|---|---|
| Active mutes per organization | 10,000 |
| Indicators per mute or unmute action | 100 |
| Reason length | 100 characters |
| Supported indicator types | IP address, domain, SHA-256 file hash |

When your organization reaches 10,000 active mutes, unmute indicators you no longer need before you mute new ones.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/triage_and_investigate/ioc_explorer/
[2]: /security/threat_intelligence/#threat-intelligence-intents
[3]: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
[4]: /account_management/rbac/permissions/
[5]: https://app.datadoghq.com/security/siem/ioc-explorer
[6]: https://app.datadoghq.com/security/configuration/siem/muted-indicators
