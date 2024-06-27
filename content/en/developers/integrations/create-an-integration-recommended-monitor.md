---
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentation
  text: Configure Monitors
kind: documentation
title: Create an Integration-Recommended Monitor
description: Learn how to create a monitor for your integration.
---
## Overview

[Datadog Monitors][1] track key metrics, so you can efficiently monitor your infrastructure and integrations. Datadog provides a set of out-of-the-box monitors for many features and integrations. View these monitors in your [Monitors Template list][2].

Create an out-of-the-box monitor to help users find value in your Datadog integration. This guide provides steps for creating an integration-recommended monitor and best practices to follow during the creation process.

To create a Datadog integration, see [Create a New Integration][3].

## Steps to create a recommended monitor
### Build a monitor JSON Schema

1. [Create a monitor][4].

2. Follow the [best practices](#configuration-best-practices) listed in this guide to configure your monitor.
 
3. Click **Export Monitor**.

4. Check **Select to export as a recommended monitor**.
    {{< img src="developers/integrations/monitor_json.png" alt="Monitor JSON modal to export as recommended monitor" style="width:100%;" >}}

5. Click **Copy** to use the JSON schema of your configured monitor.

6. Save the copied schema to a JSON file and name it according to your monitor title. For example, `your_integration_name_alert.json`.

7. In the monitor JSON file, fill out the Title, Description, and Tags. For more information, see [Configuration best practices](#configuration-best-practices). 

### Open a pull request

1. Save the monitor JSON file to your integration's `assets/monitors` folder. Add the asset to your `manifest.json` file. See [Integrations Assets Reference][5] for more information about your integration's file structure and manifest file.

2. Open a pull request (PR) to add your recommended monitor JSON file and updated manifest file to the corresponding integration folder either in the [`integrations-extras` GitHub repository][6] or [`Marketplace` GitHub repository][9]. 

3. After it's approved, Datadog merges the PR and your integration-recommended monitor is pushed to production.

## Verify your monitor in production

To see the out-of-the-box monitor, the relevant integration tile must be `Installed` in Datadog. 

Find your monitor in the [Monitors Template list][2]. Ensure logos render correctly on the Monitors Template lists page.

## Configuration best practices

In addition to the monitor definition, the [Title](#title), [Description](#description), and Tags fields are required for recommended monitors. Set tags to "integration:<app_id>", see other available monitor tags [here][8]. For more information, see the documentation on [configuring a monitor][7].

### Title

The title allows users to quickly understand the underlying failure mode the alert is covering.
- Use the active voice and start with an object followed by a verb. 
- Do not use template variables.

| Needs revision                                       | Better                                 | Best                                        |
| -----------                                          | -----------                            | -----------                                 |
|High Unacknowledged Messages reported on {{host.name}}| High Unacknowledged Messages reported  |Unacknowledged Messages are higher than usual|

### Description

Provides extra context around the failure mode and also about the impact this mode can have on the system. It should allow users to understand at a glance whether it is relevant or not for them to create a monitor out of it.

- This is not a copy of the title. 
- Define the problem stated by the title.
- Answer why this is an issue worth alerting on.
- Describe the impact of the problem.

| Needs revision                                         | Better                                       | Best                                    |
| -----------                                          | -----------                                  | -----------                             |
|Notify your team when unacked message are high. | Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages.|Unacked messages are those that have been delivered to a consumer but have not been acknowledged as processed or handled. This monitor tracks the ratio of unacked messages to avoid potential bottlenecks which could lead to delays in message processing.| 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/monitors/configuration/
[8]: https://docs.datadoghq.com/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace
