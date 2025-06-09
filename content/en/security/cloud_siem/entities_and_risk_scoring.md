---
title: Risk Insights
further_reading:
    - link: "https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/"
      tag: Blog
      text: "Accelerate investigations with Datadog Cloud SIEM Risk-based Insights and AWS Entity Analytics"
---

## Overview

[Cloud SIEM's Risk Insights][4] consolidates multiple data sources, such as SIEM threats and Cloud Security insights, into a profile representing a single security entity, such as an IAM user.

With Risk Insights, you can:

- Explore entities, filtering them by attributes such as [risk score severity](#risk-scoring) and configuration risks.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk.
- Take mitigation steps such as creating a global suppression or creating a case for an entity.

## Prerequisites

- For Risk Insights coverage, either [Azure][6], [GCP][5], or [AWS must be configured for Cloud SIEM][1].
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/entities
[5]: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
[6]: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem/
