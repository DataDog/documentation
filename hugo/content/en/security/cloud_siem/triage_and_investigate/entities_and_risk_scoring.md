---
title: Entity Risks
aliases:
- /security/cloud_siem/entities_and_risk_scoring
further_reading:
    - link: "https://www.datadoghq.com/blog/risk-prioritization-entity-analytics/"
      tag: Blog
      text: "Accelerate investigations with Datadog Cloud SIEM Risk-based Insights and AWS Entity Analytics"
    - link: "https://www.datadoghq.com/blog/ai-powered-threat-analysis"
      tag: "Blog"
      text: "AI in cloud security investigations: The role of UEBA and better telemetry"
    - link: "https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026"
      tag: "Blog"
      text: "What's new in Cloud SIEM: AI-powered investigations, enhanced threat intelligence, and scalable security operations"
---

## Overview

[Cloud SIEM's Entity Risks][4] consolidates multiple data sources, such as SIEM threats and Cloud Security insights, into a profile representing a single security entity, such as an IAM user.

With Entity Risks, you can:

- Explore entities, filtering them by attributes such as entity provider, entity type, entity name, [risk score severity](#risk-scoring), risk score, and configuration risks.
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Configure notifications so you can address risky entities as they emerge.
- Triage relevant items in bulk.
- Take mitigation steps such as creating a global suppression or creating a case for an entity.

## Prerequisites

- To use Entity Risks, configure at least one of the following supported log sources to send logs to Cloud SIEM, with an active Open Cybersecurity Schema Framework (OCSF) pipeline:
  - **Sources that provide identity and resource entities** (such as users, service identities, assumed roles, compute instances, and storage containers): AWS, Azure, GCP, GitHub, Microsoft 365, and Okta.
  - **Sources that provide user entities identified by email address**: 1Password, Cisco Duo, Cloudflare, CrowdStrike, Google Workspace, JumpCloud, LastPass, Salesforce, Slack, and Zscaler Internet Access (ZIA).
- Many supported sources use an [out-of-the-box OCSF pipeline][8] that requires no additional configuration. If a supported source is not producing entities, confirm that its out-of-the-box OCSF pipeline is active. Pipelines that predate OCSF support, and customized pipelines, may not include the required OCSF processing.
- (Optional) To group risk by user identity and to configure user identity notifications, configure an Entity Pack for your identity provider (Okta, Google Workspace, or Microsoft Entra ID) on the [Content Packs][9] page. See [Risk grouped by user identity](#risk-grouped-by-user-identity).
- (Optional) To view associated Cloud Security insights in the entity panel, [Cloud Security must be configured][2].


## Explore Entity Risks

### Query and filter entities

On the [Entity Risks][4] page, you can view all entities that have a non-zero risk score associated to them.

{{< img src="security/entities/entities-explorer3.png" alt="A list of entities and their risk scores in Entity Risks" style="width:100%;" >}}

### Risk grouped by user identity

In a federated environment, one person typically acts through many separate entities, such as several email aliases, an IAM user, assumed roles, and a code repository account. Viewed individually, none of these entities shows that person's total risk.

When you configure an Entity Pack for your identity provider on the [Content Packs][9] page, Cloud SIEM syncs user identities from that provider and resolves the entities that belong to each one. Entities that resolve to one person are grouped under a single user identity row, named for that person, whose risk score is the sum of the risk scores of the entities beneath it. Grouping is applied automatically whenever an identity provider is connected.

To investigate a user identity:

1. In [Entity Risks][4], find a row with an expand arrow and a count of associated entities.
1. Click the arrow to expand the row and see each entity resolved to that user identity, along with its own risk score, type, source, and signal count.
1. Click an entity to open its side panel and continue investigating, as described in [Quickly build context on an entity](#quickly-build-context-on-an-entity).

<div class="alert alert-info">Only entities that resolve unambiguously to a user identity are grouped. Entities that cannot be resolved continue to appear as individual rows, so the same person may still appear more than once.</div>

### Quickly build context on an entity

Click an entity in [Entity Risks][4] to open the entity side panel.

{{< img src="security/entities/entity-side-panel3.png" alt="The side panel for an entity" style="width:90%;" >}}

The {{< ui >}}What Happened{{< /ui >}} section of the panel summarizes the count of signals, misconfigurations, and identity risks and how they have contributed to the risk score, as well as any potential configuration risks.

The {{< ui >}}What contributes to the score{{< /ui >}} section displays the list of fired signals, relevant misconfigurations, and identity risks.

### Triage and mitigate threats in bulk

The {{< ui >}}Next steps{{< /ui >}} section of the entity side panel includes the available mitigation steps for SIEM signals, misconfigurations, and identity risks.

{{< img src="security/entities/entities-next-steps2.png" alt="The available next steps for an entity as shown in the entity side panel" style="width:80%;" >}}

## Configure notifications for Entity Risks

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Notification rules are not supported for the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

You can configure Datadog to send you notifications as soon as it detects new threats that match your criteria.

1. Navigate to the {{< ui >}}Create a new Entity Risks notification{{< /ui >}} page. There are two ways to do this:
   - In Datadog, go to the [Entity Risks][4] page, then click {{< ui >}}Create Notification Rule{{< /ui >}}.
   - In Datadog, go to {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}. Under {{< ui >}}Products{{< /ui >}}, in the {{< ui >}}Cloud SIEM{{< /ui >}} section, click [{{< ui >}}Entity Risks{{< /ui >}}][7]; then, under {{< ui >}}Notification rules{{< /ui >}}, click {{< ui >}}New notification rule{{< /ui >}}.
1. Under {{< ui >}}Group risk by{{< /ui >}}, choose what the rule measures:
   - {{< ui >}}Individual entity{{< /ui >}}: The rule evaluates each entity's own risk score. This is the default.
   - {{< ui >}}User identity{{< /ui >}}: The rule evaluates a user identity's rolled-up risk score, which is the sum of the scores of all entities resolved to that person. This option is available after you configure an Entity Pack and user identities are syncing. See [Notify on rolled-up user identity risk](#notify-on-rolled-up-user-identity-risk).

   <div class="alert alert-warning">You cannot change a rule's grouping after you create the rule. Create a new rule instead.</div>
1. Under {{< ui >}}Define entity attributes{{< /ui >}}, specify the attributes that should trigger notifications when Datadog detects them on an entity. Beside {{< ui >}}Entities matching{{< /ui >}}, start typing entity attributes and values. As you type, the preview table dynamically displays the entities that match your criteria.
   <div class="alert alert-info">This step is optional, but if you don't enter any attributes, the notification defaults to sending alerts for all entities.</div>
1. Under {{< ui >}}Set notification conditions{{< /ui >}}, set the trigger condition based on entity severity or risk score value:
   - {{< ui >}}Entity severity{{< /ui >}}: Triggers a notification when an entity reaches a certain severity level. Select an operator, then select a severity level. For the risk score that corresponds to each severity level, see [Entity severity thresholds](#entity-severity-thresholds).
   - {{< ui >}}Risk score value{{< /ui >}}: Triggers a notification when the entity's risk score crosses a specified threshold. Specify the threshold for notifications.
1. Under {{< ui >}}Configure notification{{< /ui >}}, enter a name for the notification, add a custom message body, and specify recipients to send it to.
   - Optionally, you can also turn on re-notifications, and specify the period of time that should pass before Datadog re-notifies the recipients that the entity still meets the criteria you specified.
1. To verify your setup, click {{< ui >}}Test Notification{{< /ui >}} to send a test notification to the configured recipients.
1. Click {{< ui >}}Save Notification{{< /ui >}}.

### Notify on rolled-up user identity risk

A rule grouped by {{< ui >}}User identity{{< /ui >}} notifies you when one person's total risk across all of their entities crosses a threshold. This catches risk that is spread across several entities, where no single entity crosses your individual entity threshold.

Rules grouped by user identity differ from individual entity rules in the following ways:

- **Matching attributes are user attributes.** Instead of entity attributes, you query the attributes of the resolved user identity, consistent with what you see in User Inventory. For example, you can query by identity provider, user type, department, job title, or office location. The preview table shows the matching user identities and their rolled-up risk scores.
- **Conditions evaluate the rolled-up score.** As with individual entity rules, you can trigger on either an entity severity level or a risk score value, and the same [entity severity thresholds](#entity-severity-thresholds) apply. In both cases, the condition is evaluated against the user identity's rolled-up risk score rather than any single entity's score.
- **Notifications fire on threshold crossing.** Datadog notifies you when a user identity enters the above-threshold state, not on every evaluation while it remains above it. A user identity that is already above the threshold when you create the rule notifies once. Use re-notifications to be reminded while the user identity stays above the threshold.
- **Message content is person-centric.** Template variables include the user identity's display name, identity provider, rolled-up risk score, the number of contributing entities, and the top contributing entities with their scores.
- **The notification links to User Inventory.** The notification's primary link opens the user identity's side panel in User Inventory.

Rules grouped by user identity and rules grouped by individual entity coexist, and the rules list labels each rule with its grouping. Both kinds of rule count toward the same limit of 100 notification rules per organization.

## Risk scoring

An entity's risk score approximates the entity's risk level over the past 14 days of activity. Datadog calculates the risk score from the characteristics of the entity's associated signals, such as the severity level of the signal, and how many times the signal has fired.

### View and customize signal score impacts

Each signal has a score impact based on its severity. Datadog assigns a default number of points to each signal severity. To view or override the default score impacts for your organization, as well as impacts for misconfigurations and identity risks, go to the [Entity Risks settings page][7].

If you change the score impacts, Datadog immediately and retroactively applies them to all existing entity risk scores. You can use the updated scores to assess the impact of your changes on your Entity Risks notifications moving forward, so you can reduce the noise and increase the signal they provide.

<div class="alert alert-info">A signal's score impact lasts for 14 days, after which the score drops to <code>0</code>.</div>

| Signal Severity | Number of points |
|-----------------|------------------|
| `Critical`      | `100`            |
| `High`          | `50`             |
| `Medium`        | `5`              |
| `Low` and `Info`| `0`              |

### Entity severity thresholds

The severity threshold of an entity is calculated by adding up the score impact for all signals associated with the entity. The same thresholds apply to a user identity: its severity is derived from its rolled-up risk score, which is the sum of the risk scores of every entity resolved to it.

| Severity Threshold          | Risk score                                         |
|-----------------------------|----------------------------------------------------|
| `Critical`                  | Greater than or equal to `100`.                    |
| `High`                      | Greater than or equal to `50` and less than `100`. |
| `Medium`                    | Greater than or equal to `25` and less than `50`.  |
| `Low`                       | Greater than or equal to `10` and less than `25`.  |
| `Info`                      | Less than `10`.                                    |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://docs.datadoghq.com/security/cloud_security_management/setup
[3]: https://app.datadoghq.com/security
[4]: https://app.datadoghq.com/security/siem/entity-risks
[7]: https://app.datadoghq.com/security/configuration/siem/risk-insights
[8]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/#supported-out-of-the-box-ocsf-pipelines
[9]: /security/cloud_siem/ingest_and_enrich/content_packs
