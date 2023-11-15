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

## Steps to create a detection rule
### Build a detection rule JSON Schema

1. Navigate to **[Security > Cloud SIEM > Detection Rules > New Rule][4]** and create a new rule.

2. Follow the [best practices](#configuration-best-practices) listed in this guide to configure your detection rule.
 
3. Click **Export to JSON**.

4. Save the JSON file and name it according to your detection rule title. For example, `your_integration_name_rule_name.json`.

### Open a pull request

1. Save the detection rule JSON file to your integration's `assets/security` folder.  

2. Open a pull request (PR) with your integration files along with your detection rule JSON file to the corresponding integration folder in either the [`integrations-extras` GitHub repository][5] or [`Marketplace` Github repository][6]. 

3. After it's approved, Datadog merges the PR and your integration-recommended monitor is pushed to production.

## Verify your detection rule in production

To see the out-of-the-box detection rule, the relevant integration tile must be `Installed` in Datadog and Cloud SIEM must be enabled. 

Find your detection rule in the [Detection Rules list][2]. Ensure logos render correctly on the Detection Rules list page.

Enable the detection rule to ensure the rule triggers as expected. 

## Configuration best practices

Below is an example of a well-defined detection rule:

{{image to be included}}

For more information, see the documentation on [configuring a detection rule][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/security/cloud_siem/log_detection_rules
