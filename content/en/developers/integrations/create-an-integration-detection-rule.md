---
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/log_detection_rules
  tag: Documentation
  text: Log Detection Rules
kind: documentation
title: Create an Integration-Detection Rule
description: Learn how to create a detection rule for your integration.
---
## Overview

[Datadog Cloud SIEM (Security Information and Event Management)][1] unifies developer, operation, and security teams through one platform. Datadog provides a set of out-of-the-box detection rules for many features and integrations. View these rules in your [SIEM Detection Rules list][2].

Create an out-of-the-box detection rule to help users find value in your Datadog integration. This guide provides steps for creating an integration-detection rule and best practices to follow during the creation process.

To create a Datadog integration, see [Create a New Integration][3].

## Steps to create a detection rule
### Build a detection rule JSON Schema

1. Navigate to **[Security > Cloud SIEM > Detection Rules > New Rule][4]** and create a new rule.

2. Follow the [best practices](#configuration-best-practices) listed in this guide to configure your detection rule.
 
3. Click **Export to JSON**.

4. Save the JSON file and name it according to your detection rule title. For example, `your_integration_name_rule_name.json`.

5. In the detection rule JSON file, add and fill out the partnerRuleId, and remove the `isEnabled` attribute. For more information, see [Configuration best practices](#configuration-best-practices).

### Open a pull request

1. Save the detection rule JSON file to your integration's `assets/security` folder.  

2. Open a pull request (PR) with your integration files along with your detection rule JSON file to the corresponding integration folder in either the [`integrations-extras` GitHub repository][5] or [`Marketplace` Github repository][6]. 

3. After it's approved, Datadog merges the PR and your integration-recommended monitor is pushed to production.

## Verify your detection rule in production

To see the out-of-the-box detection rule, the relevant integration tile must be `Installed` in Datadog and Cloud SIEM must be enabled. 

Find your detection rule in the [Detection Rules list][2]. Ensure logos render correctly on the Detection Rules list page.

Enable the detection rule to ensure the rule triggers as expected. 

## Configuration best practices

In addition to the detection rule definition, the PartnerRuleId field is required for partner contributed detection rules. The `isEnabled` field should be removed as it does not apply to partner contributed detection rules.

|      | Description    | Examples |
| ---  | ----------- | ----------- |
|PartnerRuleId | Unique identifier for the rule, following the format `ext-00*-***` where * could be any alphanumeric characters. | `ext-003-bzd` |

Below is an example of a well-defined detection rule:

{{image to be included}}

For more information, see the documentation on [configuring a detection rule][7].

## Understanding Validation Messages

### Rule JSON Parsing
```
File={file_path} in collection={collection} is an invalid JSON: error={error}
```
This error means that the JSON located at {file_path} is considered invalid JSON

### RuleId/Rule Name
```
partnerRuleId is empty for rule name="{rule_name}" - partnerRuleId={new_rule_id} is available
```
A partnerRuleId is required for each rule and is missing. Use the generated ID. 

```
partnerRuleId={rule_id} is in the incorrect format for rule name="{rule_name}", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId={new_rule_id} is available
```
The rule name {rule_name} is in the incorrect format.  Use the generated partnerRuleId: {new_rule_id} to fix the issue.

```
Duplicate partnerRuleId={rule_id} for rule name="{rule_name}" - {rule_id_key} must be unique and it is already used in rule_ids="{rule_ids}" - {rule_id_key}={new_rule_id} is available
```
Each partnerRuleId must be unique. The current ID is already being used. The newly generated partnerRuleId is available.

```
Duplicate name="{rule_name}" for {rule_id_key}={rule_id} - name must be unique.
```
Each rule name must be unique. The current name is already being used. Update the rule name to be unique.

### MITRE Tags
```
The rule with partnerRuleId={rule_id} contains a MITRE tag tactic but it does not contain the tag `security:attack` is not present in, please add it
```
When a rule contains a MITRE tag `tactic:xxx`, the tag `security:attack` must be added to the list of tags.

```
The MITRE tactic/technique tag={tag} for partnerRuleId={rule_id} appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
The listed tactic/technique tag {tag} does not follow the [MITRE framework](https://attack.mitre.org/). Please select a different tag.

### Cases
```
The case status {case_status} for {rule_id_key}={rule_id} is incorrect, it should be one of {status_list}.
```
The case status must be either CRITICAL, HIGH, MEDIUM, LOW, or INFO.

```
The case ordering for partnerRuleId={rule_id} is incorrect, please modify to order cases from the highest severity to the lowest.
```
Each rule definition must be ordered by decreasing severity. Please re-order the cases into CRITICAL, HIGH, MEDIUM, LOW, and INFO.

### Source Tags
```
source={source} in the tags of the rule with partnerRule={rule_id} is not supported by Datadog documentation.
```
Reach out to Datadog to address the issue.

### Rule Content Validation/ Rule Update
```
{rule_id_key}={rule_id} name="{rule_name}" - error={error}
```
Reach out to Datadog to address the issue.

```
Internal failure for {rule_id_key}={rule_id} name="{rule_name}"- Contact Datadog Team
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
