---
title: Cloud SIEM Entities and Risk Scoring
---

{{< callout url="https://google.com" header="Join the Beta!">}}
Cloud SIEM Entities is in private beta.
{{< /callout >}}

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of Entities Explorer page
</div>

## Overview

Cloud SIEM Entities consolidates multiple data sources, such as SIEM threats and CSM insights, into a profile representing a single security entity, such as an IAM user.

With Cloud SIEM Entities, you can:

- Explore entities, sorting and filtering them by attributes such as [risk score](#risk-scoring) or environment.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as creating an automated workflow or creating a global case for an entity.

## Explore Entities

### Query and filter entities

On the [Entities Explorer page][], you can view all entities that have at least one signal.

### Quickly build context on an entity

Click an entity in the [Explorer][] to open the entity panel.

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of the entity side panel
</div>

The top of the entity panel displays the count of related signals, identity risks, and so on, with links to the list view of each.

The **Entity Context** section displays entity's attributes, such as the entity type and the list of fired signals. 

### Triage and mitigate threats in bulk

The **Next steps** section of the entity panel includes the available mitigation steps.

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot with the next steps area highlighted and the "More actions" menu expanded
</div>

## Prerequisites

- For coverage of AWS resources, [AWS must be configured for Cloud SIEM][1].
- To view associated Cloud Security Management (CSM) data in the entity panel, [CSM must be configured][2].

No other setup is required to use Cloud SIEM Entities.

## Risk scoring

An entity's risk score summarizes the entity's risk level over time. 

The risk score is calculated from the characteristics of the entity's associated signals, such as the severity level of the signal and how many times the signal has fired. All signals fired in the past 14 days are used to calculate the risk score.

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security