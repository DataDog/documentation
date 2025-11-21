---
title: Risk Insights
aliases:
- /security/cloud_siem/entities_and_risk_scoring
further_reading:
    - link: "https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/"
      tag: Blog
      text: "Accelerate investigations with Datadog Cloud SIEM Risk-based Insights and AWS Entity Analytics"
---

<div class="alert alert-info">This feature is not available for the Legacy product.</a></div>

## Overview

[Cloud SIEM's Risk Insights][4] consolidates multiple data sources, such as SIEM threats and Cloud Security insights, into a profile representing a single security entity, such as an IAM user.

With Risk Insights, you can:

- Explore entities, filtering them by attributes such as [risk score severity](#risk-scoring) and configuration risks.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as creating a global suppression or creating a case for an entity.

## Prerequisites

- For Risk Insights coverage, either GitHub, [Azure][6], [GCP][5], or [AWS][1] must be configured for Cloud SIEM.
- (Optional) To view associated Cloud Security insights in the entity panel, [Cloud Security must be configured][2].


## Explore risk insights

### Query and filter entities

On the [Risk Insights Explorer][4], you can view all entities that have a non-zero risk score associated to them.

{{< img src="security/entities/entities-explorer3.png" alt="A list of entities and their risk scores in the Risk Insights Explorer" style="width:100%;" >}}

### Quickly build context on an entity

Click an entity in the [Explorer][4] to open the entity side panel.

{{< img src="security/entities/entity-side-panel3.png" alt="The side panel for an entity" style="width:90%;" >}}

The **What Happened** section of the panel summarizes the count of signals, misconfigurations, and identity risks and how they have contributed to the risk score, as well as any potential configuration risks.

The **What contributes to the score** section displays the list of fired signals, relevant misconfigurations, and identity risks.

### Triage and mitigate threats in bulk

The **Next steps** section of the entity side panel includes the available mitigation steps for SIEM signals, misconfigurations, and identity risks.

{{< img src="security/entities/entities-next-steps2.png" alt="The available next steps for an entity as shown in the entity side panel" style="width:80%;" >}}

## Risk scoring

An entity's risk score approximates the entity's risk level over the past 14 days of activity. 

The risk score is calculated from the characteristics of the entity's associated signals, such as the severity level of the signal and how many times the signal has fired.

### Signal's score impact

Each signal has a score impact. You can see a signal's score impact in the entity panel.

**Note**: A signal's score impact lasts for 2 weeks, after which the score drops to `0`.

| Signal Severity | Number of points |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` and `Info`| `0`              |

### Entity's severity threshold

The severity threshold of an entity is calculated by adding up the score impact for all signals associated with the entity.

| Entity's Severity Threshold | Sum of the score impact for all related signals  |
|-----------------------------| -------------------------------------------------|
| `Critical`                  | Greater than or equal to `100`.                   |
| `High`                      | Greater than or equal to `50` and less than `100`.|
| `Medium`                    | Greater than or equal to `25` and less than `50`. |
| `Low`                       | Greater than or equal to `10` and less than `25`. |
| `Info`                      | Less than `10`.                                   |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/entities
[5]: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
[6]: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem/
