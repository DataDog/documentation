---
title: Risk Based Entity Insights for AWS
---

{{< callout url="https://datadoghq.com/private-beta/risk-based-entity-insights" header="Join the Beta!">}}
Risk Based Entity Insights is in private beta.
{{< /callout >}}

## Overview

[Cloud SIEM's Risk Based Entity Insights for AWS][4] consolidates multiple data sources, such as SIEM threats and CSM insights, into a profile representing a single security entity, such as an IAM user.

With Risk Based Entity Insights, you can:

- Explore entities, filtering them by attributes such as [risk score](#risk-scoring) or entity type.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as creating a global suppression or creating a case for an entity.

## Prerequisites

- For AWS entities coverage, [AWS must be configured for Cloud SIEM][1].
- To view associated Cloud Security Management (CSM) data in the entity panel, [CSM must be configured][2].

No other setup is required to use Cloud SIEM Entities.

## Explore entities

### Query and filter entities

On the [Entities Explorer page][4], you can view all entities that have at least one signal.

{{< img src="security/entities/entities-explorer.png" alt="A list of entities and their risk scores in the Entities Explorer" style="width:100%;" >}}

### Quickly build context on an entity

Click an entity in the [Explorer][4] to open the entity side panel.

{{< img src="security/entities/entity-side-panel.png" alt="The details panel for an entity" style="width:90%;" >}}

The **What Happened** section of the panel displays the count of related signals and how they have contributed to the risk score, as well as any potential configuration risks.

The **What contributes** section displays the list of fired signals, relevant misconfigurations, and identity risks.

### Triage and mitigate threats in bulk

The **Next steps** section of the entity details panel includes the available mitigation steps.

{{< img src="security/entities/entity-next-steps.png" alt="The available next steps for an entity as shown in the entity details panel" style="width:80%;" >}}

## Risk scoring

An entity's risk score summarizes the entity's risk level over time. 

The risk score is calculated from the characteristics of the entity's associated signals, such as the severity level of the signal and how many times the signal has fired. All signals fired in the past 14 days are used to calculate the risk score.

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/entities