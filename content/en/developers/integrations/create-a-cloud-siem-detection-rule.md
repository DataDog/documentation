---
title: Create a Cloud SIEM Detection Rule
description: Learn how to create a Cloud SIEM detection rule for your integration.
aliases:
- /developers/integrations/create-an-integration-detection-rule
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/log_detection_rules
  tag: Documentation
  text: Log Detection Rules
---

## Overview

[Datadog Cloud SIEM (Security Information and Event Management)][1] unifies developer, operation, and security teams through one platform. Datadog provides a set of out-of-the-box detection rules for many features and integrations. View these rules in your [SIEM Detection Rules list][2].

Create an out-of-the-box detection rule to help users find security insights through your Datadog integration. This guide provides steps for creating an Cloud SIEM detection rule and best practices to follow during the creation process.

To create a Datadog integration, see [Create a New Integration][3].

## Create a detection rule
### Build a detection rule JSON schema

1. From **Detection Rules**, [create a new rule][4].


2. Follow the [best practices](#configuration-best-practices) in this guide to configure your detection rule.
 
3. Click **Export to JSON**.

4. Save the JSON file and name it according to your detection rule title. For example, `your_integration_name_rule_name.json`.

5. In the detection rule JSON file, add and fill out the `partnerRuleId`, and remove the `isEnabled` attribute. For more information, see [Configuration best practices](#configuration-best-practices).

### Open a pull request

1. Save the detection rule JSON file to your integration's `assets/security` folder.

2. Open a pull request (PR) to update the corresponding integration folder in either the [`integrations-extras` GitHub repository][5] or [`Marketplace` Github repository][6]. The PR should include your detection rule JSON file, along with any new integration files.

3. Datadog approves and merges the PR, and your integration-recommended monitor is pushed to production.

## Verify your detection rule in production

To see the out-of-the-box detection rule, the relevant integration tile must be `Installed` in Datadog, and Cloud SIEM must be enabled. 

1. Find your detection rule in the [Detection Rules list][2], and expand it. 
2. Ensure that its logos render correctly.
3. Verify that the rule is enabled.

## Configuration best practices

In addition to the detection rule definition, the `partnerRuleId` field is required for partner contributed detection rules. The `isEnabled` field should be removed as it does not apply to partner contributed detection rules.

|      | Description    | Examples |
| ---  | ----------- | ----------- |
|partnerRuleId | Unique identifier for the rule, following the format `ext-00*-***` where * could be any alphanumeric characters. | `ext-003-bzd` |

### Example of a well-defined detection rule

Selecting a rule type and defining search queries:

{{< img src="developers/integrations/SIEM_detection_rule_top.png" alt="Steps 1-3 of a filled-out detection rule creation form" style="width:90%;" >}}

Setting rule cases and writing the notification message:

{{< img src="developers/integrations/SIEM_detection_rule_bottom.png" alt="Steps 4 and 5 of a filled-out detection rule creation form" style="width:90%;" >}}

For more information, see the documentation on [configuring a detection rule][7].

## Understanding validation messages

### Rule JSON parsing
```
File=<FILE_PATH> in collection=<COLLECTION> is an invalid JSON: error=<ERROR>
```
This error means that the JSON located at `<FILE_PATH>` is considered invalid JSON

### Rule ID/Rule name
```
partnerRuleId is empty for rule name="<RULE_NAME>" - partnerRuleId=<NEW_RULE_ID> is available
```
A `partnerRuleId` is required for each rule and is missing. Use the generated `<NEW_RULE_ID>`. 

```
partnerRuleId=<RULE_ID> is in the incorrect format for rule name="<RULE_NAME>", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId=<NEW_RULE_ID> is available
```
The rule name is not in the correct format. Use the generated `partnerRuleId: <NEW_RULE_ID>` to fix the issue.

```
Duplicate partnerRuleId=<RULE_ID> for rule name="<RULE_NAME>" - <RULE_ID_KEY> must be unique and it is already used in rule_ids="<RULE_IDS>" - <RULE_ID_KEY>=<NEW_RULE_ID> is available
```
Each `partnerRuleId` must be unique. The current ID is already being used. The newly generated `partnerRuleId` is available.

```
Duplicate name="<RULE_NAME>" for <RULE_ID_KEY>=<RULE_ID> - name must be unique.
```
Each rule name must be unique. The current name is already being used. Update the rule name to be unique.

### MITRE tags
```
The rule with partnerRuleId=<RULE_ID> contains a MITRE tag tactic but it does not contain the tag `security:attack`, please add it
```
When a rule contains a MITRE tag `tactic:<TAG_VALUE>`, the tag `security:attack` must be added to the list of tags.

```
The MITRE tactic/technique tag=<TAG> for partnerRuleId=<RULE_ID> appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
The listed tactic/technique tag `<TAG>` does not follow the [MITRE framework](https://attack.mitre.org/). Please select a valid MITRE tag.

### Cases
```
The case status <CASE_STATUS> for <RULE_ID_KEY>=<RULE_ID> is incorrect, it should be one of <STATUS_LIST>.
```
The case status must be either `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, or `INFO`.

```
The case ordering for partnerRuleId=<RULE_ID> is incorrect, please modify to order cases from the highest severity to the lowest.
```
Each rule definition must be ordered by decreasing severity. Please reorder the cases into `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, and `INFO`.

### Source tags
```
source=<SOURCE> in the tags of the rule with partnerRule=<RULE_ID> is not supported by Datadog documentation.
```
Reach out to Datadog to address the issue.

### Rule content validation/ rule update
```
<RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>" - error=<ERROR>
```
Reach out to Datadog to address the issue.

```
Internal failure for <RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>"- Contact Datadog Team
```
Reach out to Datadog to address the issue.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/security/cloud_siem/log_detection_rules
