---
title: Security Signals Explorer
kind: documentation
description: "Search through all of your security signals and perform Security Analytics"
further_reading:
  - link: "https://www.datadoghq.com/blog/announcing-security-monitoring/"
    tag: "Blog"
    text: "Security Monitoring"
  - link: "/security_monitoring/detection_rules"
    tag: "Documentation"
    text: "Detection Rules"
---

From the [Security Signals Explorer][4], correlate and triage security signals.

{{< img src="security_monitoring/explorer/security_signals_explorer_view.png" alt="Security Signals Explorer view" responsive="true" >}}


In this view, you can:

* Explore your Security Signals
* Inspect a Security Signal
* Visualize your Security Signal Analytics

## Context

Build up a context to explore your signals in your Security Signals Explorer view. First, select the proper time range. Then, use the [search](#search) bar to filter your signals.

### Time range

The time range feature allows you to display signals in the Security Signals Search or Security Signal Analytics views within a given time period. It appears directly under the search bar as a timeline. 

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="security_monitoring/explorer/timerange.png" alt="Time range" responsive="true" >}}


### Search

Use facets on entities, tags, or even [free text search][1] to filter your Security Signals Search or Security Signal Analytics with dedicated context. The search bar and url automatically reflect your selections.

{{< img src="security_monitoring/explorer/search_your_signals.png" alt="Search your signals" responsive="true" >}}

### Share views

Export your current security signal visualization with the *share* functionality:

{{< img src="security_monitoring/explorer/share_security_signals_view.png" alt="Share Security Signals view" responsive="true" style="width:60%;">}}


Use the *share* button to send your current Security Signal explorer view to a team member.


## Visualization

Switch between the Security Signals Table and the Security Signals Analytics modes by clicking on the *Signal Mode* button in the upper left corner of the page:

{{< img src="security_monitoring/explorer/visualization_switch.png" alt="Visualization switch" responsive="true" style="width:50%;">}}


The Security Signals Table displays the list of signals that match the selected context. A context is defined by a [search bar](#search) filter and a [time range](#time-range).


### Security Signals Table

The Security Signals search results are displayed in the Security Signals Table.

Configure the content of your Security Signals Table according to your needs and preferences with the **Options** button. All signal attributes are available for columns.

Security Signal results are sorted by date—the most recent on top by default. You can also inverse-sort by date, with the least recent (within the limits of the time range) on top.

{{< img src="security_monitoring/explorer/configure_display_table.png" alt="Configure Display Table" responsive="true" style="width:50%;">}}

### Security Signal Panel

Click on any Security Signal to open the Security Signal Panel and see more details about it: signal creation date, first seen date, last seen date, classification, tags, security signal message, and the samples that triggered the Security Signal.

{{< img src="security_monitoring/explorer/panel.png" alt="Security Signal Panel" responsive="true" style="width:80%;">}}

#### Explanation of the above example

- **Severity**: The `HIGH` indicator in the top left denotes the severity of the highest case matched.
- **Signal generation time**: Located to the right of the severity indicator, this denotes when any of the cases first matched. It is never updated.
- **Title**: `Account Take Over (ATO) - Potential successful brute-force` in the above example. The title of the signal, appended by the name of the highest case which matched.
- **First Seen**: The first seen time when a signal was matched during the [time window][2]. Unlike signal generation time, this timestamp is updated if the query and time window conditions are met. 
- **Last Seen**: The last seen time when a signal was matched during the [time window][2]. Unlike signal generation time, this timestamp is updated if the query and time window conditions are met. 
- **Class**: The classification of the security signal, derived from the `security:{classification}` tag.
- **Group By Values**: Shown here as `USR.NAME`, the group by name and value are displayed here. You can click on the group by value and choose to filter based on it, or create it as a facet if it is not already created.
- **Tags**: Tags associated with the Detection Rule are available here. Click on any of these tags and choose to filter on them, or create them as facets if they are not already created.
- **Message**: Shown here as the `Goal`, `Strategy`, and `Triage & Response` text fields, this Markdown formatted message is configured in the Detection Rule Editor for the rule that generated this signal.
- **Samples**: A set of samples that triggered the signal. Click on the sample to see the full sample.

Use the **Rule Editor** button in the upper right to edit the Detection Rule that generated this signal.
 
Use the **Share** button to share the Security Signal opened in side panel to a team member or any other Datadog notification integration. 

{{< img src="security_monitoring/explorer/share_signal.png" alt="Share Signal" responsive="true" style="width:50%;">}}

### Security Signals Analytics

After Security Signals are generated by the Security Rules Engine, you can graph Security Signal queries and see maximums, minimums, percentiles, unique counts, and more. 

Follow the [log graphing guide][3] to learn more about all the graphing options.

{{< img src="security_monitoring/explorer/security_signal_analytics.png" alt="Security Signal Analytics" responsive="true">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/explorer/search
[2]: /security_monitoring/detection_rules/#time-windows
[3]: /logs/explorer/analytics
[4]: https://app.datadoghq.com/security
