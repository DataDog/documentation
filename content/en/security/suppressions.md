---
title: Suppressions
kind: documentation
disable_toc: false
further_reading:
- link: "security/detection_rules/"
  tag: "Documentation"
  text: "Learn more about detection rules"
---

<div class="alert alert-warning">Suppressions are available for Cloud Security Management Threats and Cloud SIEM.</div>

## Overview

Suppressions are specific conditions for when a signal should not be generated, which can improve the accuracy and relevance of the signals that are generated.

## Suppression routes

You can set up a suppression query within an individual [detection rule](#detection-rules), or define a separate [suppression rule](#suppression-rules) to suppress signals across one or more detection rules.

### Detection rules

<div class="alert alert-warning">Suppression rules are replacing suppression queries in detection rules. The legacy suppression queries will be deprecated on April 1, 2024. See <a href="#migrate-legacy-suppression-queries-to-suppression-rules">Migrate legacy suppression queries to suppression rules</a> for more information. </div>

When you [create][1] or [modify][2] a detection rule, you can define a suppression query to prevent a signal from getting generated. For example, add a rule query to determine when a detection rule triggers a security signal. You can also customize the suppression query to suppress signals for a specific attribute value.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="The detection rule editor showing the add suppression query section" style="width:65%;" >}}

### Suppression rules

Use suppression rules to set general suppression conditions across multiple detection rules instead of setting up suppression conditions for each individual detection rule. For example, you can set up a suppression rule to suppress any signal that contains a specific IP.

## Suppressions configuration

### Suppression list

The [suppression list][3] provides a centralized and organized way for you to manage suppressions across multiple detection rules.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="The suppressions page showing a list of suppression rules" style="width:90%;" >}}

## Create a suppression rule

1. Navigate to the [Suppressions][3] page.
1. Click **+ New Suppression**.
1. Enter a name for the suppression query.
1. Add a description to provide context on why this suppression is being applied.
1. Optionally, add an expiration date on which this suppression will be deactivated.
1. Select the detection rules you want to apply this suppression to. You can select multiple detection rules.
1. In the **Add Suppression Query** section, you have the option to enter suppression queries so that a signal is not generated when the values are met. For example, if a user `john.doe` is triggering a signal, but their actions are benign and you no longer want signals triggered from this user, input the log query: `@user.username:john.doe`.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="The add suppression query with the query @user.username:john.doe" style="width:65%;" >}}
  **Note**: Suppression rule queries are based on signal attributes. If the query value you want to use is not a signal attribute, you have to add it as a facet in the logs platform. See [Log side panel][5] on how to create a facet.
  
## Migrate legacy suppression queries to suppression rules

<div class="alert alert-warning">The legacy suppression queries will be deprecated on April 1, 2024.</div>

Migrate your detection rules's legacy **Suppression Queries** to the new **Suppression Rules**. 

{{< img src="security/security_monitoring/suppressions/detection_rule_migration.png" alt="The add suppression query with the query @user.username:john.doe" style="width:75%;" >}}

To see a list of rules using the legacy suppression query and to migrate them:
1. Navigate to the [detection rules list][4].
1. Hover over **xx rules** in the yellow banner to see the list of rules that need to be migrated.
    {{< img src="security/security_monitoring/suppressions/migration.png" alt="A yellow banner saying that 28 rules with suppression queries need to be migrated to suppression rules" style="width:90%;" >}}
1. Click on a rule.
1. In the detection rule editor, scroll down to the legacy **Suppression Queries** section and review the information.
1. In the **Suppression Rules** section, fill in the information based on what is in the legacy **Suppression Queries** section.
1. Repeat steps 2 to 5 for each detection rule using legacy suppression queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/rules
