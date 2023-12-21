---
title: Suppressions
kind: documentation
disable_toc: false
further_reading:
- link: "security/detection_rules/"
  tag: "Documentation"
  text: "Learn more about detection rules"
---

<div class="alert alert-warning">Suppressions are available for Cloud Workload Security and Cloud SIEM.</div>

## Overview

Suppressions are specific conditions for when a signal should not be generated, which can improve the accuracy and relevance of the signals that are generated.

## Suppression routes

Suppressions can be set up for individual detection rules and also more broadly across multiple detection rules with suppression rules.

### Detection rules

When you [create][1] or [modify][2] a detection rule, you can define a suppression query to prevent a signal from getting generated. For example, add a rule query to determine when a detection rule triggers a security signal. You can also customize the suppression query to suppress signals for a specific attribute value.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="The detection rule editor showing the add suppression query section" style="width:65%;" >}}

### Suppression rules

Use suppression rules to set general suppression conditions across multiple detection rules and signals instead of setting up suppression conditions for each individual detection rules. For example, you can set up a suppression rule to suppress any signal that contains a specific IP.

## Supressions configuration

### Suppression list

The [suppression list][3] provides a centralized and organized way for you to manage suppressions across multiple detection rules.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="The suppressions page showing a list of suppression rules" style="width:90%;" >}}

## Create a suppression

1. Navigate to the [Suppressions][3] page.
1. Click **+ New Suppression**.
1. Enter a name for the suppression query.
1. Add a description to provide context on why this suppression is being applied.
1. Optionally, add an expiration date on which this suppression will be deactivated.
1. Select the detection rules you want to apply this suppression to. You can select multiple detection rules.
1. In the **Add Suppression Query** section, you have the option to enter suppression queries so that a signal is not generated when the values are met. For example, if a user `john.doe` is triggering a signal, but their actions are benign and you no longer want signals triggered from this user, input the log query: `@user.username:john.doe`.

{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="The add suppression query with the query @user.username:john.doe" style="width:65%;" >}}

## Migrate suppression queries to suppression rules

<div class="alert alert-warning">Suppression rules are replacing suppression queries. Suppression queries will be deprecated on April 1, 2024.</div>

Migrate your legacy suppression queries to suppression rules. To see a list of rules using the legacy suppression and to migrate them:
1. Navigate to the [detection rules list][4].
1. Hover over the **xx rules** in the yellow banner to see the list of rules that need to be migrated.
    {{< img src="security/security_monitoring/suppressions/migration.png" alt="A yellow banner saying that 28 rules with suppression queries need to be migrated to suppression rules" style="width:90%;" >}}
1. Click on a rule.
1. In the detection rule editor, scroll down to the **Suppression Queries** section. Click **Move Your Suppression Queries** in the yellow banner to migrate the suppression queries to suppression rules.
1. Repeat steps 2 to 4 for each detection rule using legacy suppression queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/rules
