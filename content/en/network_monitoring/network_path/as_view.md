---
title: Autonomous Systems View
description: Investigate the Network Path Autonomous Systems View
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/list_view"
  tag: "Documentation"
  text: "Learn more about the List View in Network Path"
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
- link: "/network_monitoring/network_path/glossary"
  tag: "Documentation"
  text: "Network Path terms and concepts"
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
---

<!-- [SME: Confirm the feature name. The project brief refers to a "BGP" view; the UI labels the tab "Autonomous Systems (AS)". This draft uses "Autonomous Systems (AS)" to match the UI and existing glossary terminology.] -->

## Overview

The Autonomous Systems (AS) View shows which Autonomous Systems carry your Network Path traffic, and how traffic flows between them. Use this view to identify which service providers handle your traffic and to examine the upstream and downstream relationships between Autonomous Systems.

Each network operator runs an Autonomous System, identified by an Autonomous System Number (ASN). Autonomous Systems exchange traffic through Border Gateway Protocol (BGP) routing relationships. A suboptimal route or a specific transit provider is often the root cause when performance degrades. The Autonomous Systems (AS) View maps these BGP relationships for the Autonomous Systems in your paths, so you can tell whether an issue originates with a particular provider.

## Autonomous Systems list

The Autonomous Systems (AS) View lists the Autonomous Systems associated with your monitored network paths. Each row includes:

ASN
: The Autonomous System Number.

Name
: The name of the service provider that operates the AS.

Country
: The country associated with the AS.

Prefixes Monitored
: The IP prefixes observed for the AS across your monitored paths.

Tests Found
: The number of tests traversing the AS.

Issues Detected
: Issues observed for the AS, such as latency spikes or packet loss.

Use the filter controls above the list to narrow the results by **AS Number**, **Country**, **Category**, or **Issues Detected**.

<!-- [PLACEHOLDER: Screenshot of the Autonomous Systems (AS) View list. Suggested alt: "The Autonomous Systems (AS) View showing a list of Autonomous Systems with columns for ASN, name, country, prefixes monitored, tests found, and issues detected."] -->

## Autonomous System details

Click an Autonomous System in the list to open its details.

The details header shows the Autonomous System's name and ASN, any detected issues (such as **Latency spikes** or **Packet loss**), and a **Tags, labels & annotations** row. Annotations include the `country` of the AS and its `as-type`, which identifies the provider category (for example, `hosting`).

The details view has two tabs: **Traffic** and **Neighbors**.

### Traffic

The **Traffic** tab shows a relational diagram of traffic flowing **Upstream** through the selected AS and to its **Downstream** destinations. Each column shows the number of occurrences and the corresponding percentage of traffic. Use the **Upstream AS** and **Downstream AS** filters to focus on specific neighbors.

Below the diagram, a table breaks down the individual paths through the AS, with the following columns:

Source
: The source of the path.

Destination
: The destination of the path.

Tags
: Tags associated with the path.

Protocol
: The protocol used for the path.

Port
: The port used for the path.

Avg Reachability
: The average reachability for the path.

Avg RTT
: The average round-trip time for the path.

<!-- [PLACEHOLDER: Screenshot of the Traffic tab. Suggested alt: "The Traffic tab for an Autonomous System, showing an upstream-to-downstream traffic flow diagram and a table of paths."] -->

### Neighbors

The **Neighbors** tab shows a graph of the Autonomous Systems that neighbor the selected AS. An **Upstream** group and a **Downstream** group flank the selected AS, with each neighboring Autonomous System listed by name. Each group shows one neighbor by default; expand a group to see all of its neighbors, and use the graph's zoom controls to adjust the view.

The **Upstream AS** and **Downstream AS** filters and the path table are also available on this tab.

<!-- [PLACEHOLDER: Screenshot of the Neighbors tab. Suggested alt: "The Neighbors tab for an Autonomous System, showing a graph of upstream and downstream neighboring Autonomous Systems around the selected AS."] -->

<!-- [SME: The following Summary section describes the AS View landing dashboard seen in the UI but not covered in the project brief. Confirm whether it should be included in the initial documentation. Sections below are drafted from a screenshot and need confirmation of labels and behavior.] -->

## Summary

<!-- [PLACEHOLDER: Confirm scope before finalizing. The Summary area of the Autonomous Systems (AS) View includes:
- Global Blast Radius: a world map showing latency residual by country.
- Traffic Categories: the distribution of traffic by AS type (for example, hosting, ISP, business, education, government).
- Traffic Distribution: the distribution of traffic by region.
- Need Attention: Autonomous Systems ranked by average latency change.
Add prose and screenshots after SME confirms these are in scope.] -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/network_path/glossary
