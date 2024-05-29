---
title: Cloud SIEM Entities
---

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of Entities Explorer page
</div>

## Overview

Cloud SIEM Entities consolidates multiple data sources, such as threats and vulnerabilities, into a profile representing a single security entity, such as a Cloudtrail session or IAM user.

With Cloud SIEM Entities, you can:

- Explore entities, sorting and filtering them by attributes such as risk score or tag.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as adding a global suppression or creating a global case for an entity.

## Explore Entities

### Query and sort entities

On the [Entities Explorer page][], you can view all entities that have at least one signal.

### Quickly build context on an entity

Click an entity in the [Explorer][] to open the entity panel.

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of the entity side panel
</div>

The top of the entity panel displays the count of related signals, identity risks, and so on, with links to the list view of each.

The **Entry Context** section displays entity's attributes, such as the entity type and the list of fired rules. 

Build additional context by scrolling the entry timeline, or by viewing related items, such as logs, IPs, and workflows.

### Triage and mitigate threats in bulk

The **Next steps** section of the entity panel includes the available mitigation steps and a link to the Investigator view.

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot with the next steps area highlighted and the "More actions" menu expanded
</div>

### See top threats in the Cloud SIEM Overview

The entity panels for the top 4 suspicious entities are also accessible from the [Cloud SIEM Overview page][3]:

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of relevant section of Cloud SIEM Overview page
</div>

## Prerequisites

- For coverage of AWS resources, [AWS must be configured for Cloud SIEM][1].
- To view associated Cloud Security Management (CSM) data in the entity panel, [CSM must be configured][2].

No other setup is required to use Cloud SIEM Entities.

## Risk scoring

An entity's risk score summarizes the entity's risk level over time. The risk score is calculated from the characteristics of the entity's associated signals, such as the severity level of the signal and how many times the signal has fired.

Only out-of-the-box signals from the past 14 days are included in the risk score calculation.

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security