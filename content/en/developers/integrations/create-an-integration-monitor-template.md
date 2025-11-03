---
aliases:
- /developers/integrations/create-an-integration-recommended-monitor
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: Documentation
  text: Configure Monitors
title: Create an Integration-Monitor Template
description: Learn how to create a monitor for your integration.
---
## Overview

This guide provides steps for creating a monitor template and best practices to follow during the creation process.

[Datadog Monitors][1] track key metrics, so you can efficiently monitor your infrastructure and integrations. Datadog provides a set of out-of-the-box monitors for many features and integrations. View these monitors in your [Monitors Template list][2].

Create an out-of-the-box monitor to help users find value in your Datadog integration. To create a Datadog integration, see [Create a New Integration][3].

## Create a monitor
In your Datadog sandbox, create a monitor.

{{< img src="developers/integrations/new_monitor.png" alt="The Monitors Template list in Datadog" style="width:100%;" >}}


Follow the [best practices](#configuration-best-practices) listed in this guide to configure your monitor.

## Upload your monitor 
Within your integration in the Integration Developer Platform, navigate to the Content tab. From there, select **import monitor** to choose from a list of available monitors. You can select up to 10 monitors to include with your integration.

{{< img src="developers/integrations/content_tab.png" alt="The Content tab in the Integration Developer Platform" style="width:100%;" >}}
 

## Verify your monitor in production

To see the out-of-the-box monitor:
1. Find your detection rule in the Monitor Template list, and click to expand it.
2. Ensure logos render correctly.
3. Verify that the monitor is enabled.

Find your monitor in the [Monitors Template list][2]. Ensure logos render correctly on the Monitors Template lists page.

## Configuration best practices

In addition to the monitor definition, the [Title](#title), [Description](#description), and Tags fields are required for monitor templates. Set tags to "integration:<app_id>", see other available monitor tags [here][8]. For more information, see the documentation on [configuring a monitor][7].

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
