---
title: Create a Cloud SIEM Detection Rule
description: Learn how to create a Cloud SIEM detection rule for your integration.
aliases:
- /developers/integrations/create-an-integration-detection-rule
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/detection_rules
  tag: Documentation
  text: Log Detection Rules
---

## Overview

This guide provides steps for creating a Cloud SIEM detection rule and outlines best practices for rule configuration.

[Datadog Cloud SIEM (Security Information and Event Management)][1] unifies developer, operation, and security teams through one platform. Datadog provides a set of out-of-the-box detection rules for many features and integrations. View these rules in your [SIEM Detection Rules list][2].

Datadog Cloud SIEM detection rules are out-of-the-box content that can be added to integrations and are ready to use upon installation.

To create a Datadog integration, see [Create a New Integration][3].

## Create a detection rule
### Build a detection rule
To enhance security insights for users, partners can create their own out-of-the-box detection rules as part of a Datadog integration. Detection rules can be added as an out-of-the-box asset for integrations.

In your Datadog sandbox, [create a new rule][4].

{{< img src="developers/integrations/detection_rule.png" alt="The Create a New Rule page in Datadog's Detection Rules area" style="width:100%;" >}}

Follow [best practices](#configuration-best-practices) outlined in this guide to configure the detection rule.

### Upload your Detection Rule

Within your integration in the Integration Developer Platform, navigate to the Content tab. From here, select **Import Detection Rule** to choose from a list of available detection rules. You can select up to 10 detection rules to include with your integration.

{{< img src="developers/integrations/content_tab.png" alt="The Content tab in the Developer Platform" style="width:100%;" >}}


## Verify your detection rule in production

To see the out-of-the-box detection rule, the relevant integration tile must be `Installed` in Datadog, and Cloud SIEM must be enabled. 

1. Find your detection rule in the [Detection Rules list][2], and click to expand it. 
2. Ensure that its logos render correctly.
3. Verify that the rule is enabled.

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
[7]: https://docs.datadoghq.com/security/cloud_siem/detection_rules
