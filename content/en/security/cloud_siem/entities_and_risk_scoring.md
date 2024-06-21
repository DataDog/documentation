---
title: Cloud SIEM Risk Based Entity Insights
---

{{< callout url=""https://datadoghq.com/private-beta/risk-based-entity-insights" header="Join the Beta!">}}
Risk Based Entity Insights is in private beta.
{{< /callout >}}

## Overview

[Cloud SIEM's Risk Based Entity Insights][4] consolidates multiple data sources, such as SIEM threats and CSM insights, into a profile representing a single security entity, such as an IAM user.

With Risk Based Entity Insights, you can:

- Explore entities, filtering them by attributes such as [risk score](#risk-scoring) or entity type.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as creating an automated workflow or creating a global case for an entity.

## Explore Entities

### Query and filter entities

On the [Entities Explorer page][4], you can view all entities that have at least one signal.

{{< img src="security/entities/entities-explorer.png" alt="A list of entities and their risk scores in the Entities Explorer" style="width:100%;" >}}

### Quickly build context on an entity

Click an entity in the [Explorer][4] to open the entity details panel.

{{< img src="security/entities/entity-side-panel.png" alt="The details panel for an entity" style="width:90%;" >}}

The top of the panel displays the count of related signals, identity risks, and so on, with links to the list view of each.

The **Entity Context** section displays entity's attributes, such as the entity type and the list of fired signals. 

### Triage and mitigate threats in bulk

The **Next steps** section of the entity details panel includes the available mitigation steps.

{{< img src="security/entities/entity-next-steps.png" alt="The available next steps for an entity as shown in the entity details panel" style="width:80%;" >}}

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
[4]: https://app.datadoghq.com/security/entities