---
categories:
- Collaboration
ddtype: crawler
description: Send Datadog alerts and graphs to your team's Slack channel.
doc_link: https://docs.datadoghq.com/integrations/slack/
git_integration_title: slack
has_logo: true
integration_title: Slack
is_public: true
kind: integration
manifest_version: '1.0'
name: slack
public_title: Datadog-Slack Integration
short_description: Send Datadog alerts and graphs to your team's Slack channel.
version: '1.0'
---

## Overview

Connect Slack to Datadog in order to help your team collaborate by:

* Sharing graphs with your colleagues in your team's channels.
* Receiving alerts and notifications from Datadog within Slack.

## Setup
### Installation

The Slack integration is installed via its [integration tile](https://app.datadoghq.com/account/settings#integrations/slack) in the Datadog application.

### Configuration
1. In your Slack account go to the [Applications page](https://slack.com/apps) and search for Datadog.
2. Click Install, followed by Add Integration.
3. Copy the Slack Service Hook and paste in the [service hook field for Slack in Datadog](https://app.datadoghq.com/account/settings#integrations/slack).
4.  Add the channels you want to be able to post to.
5. If you would like to be notified for every comment on a graph, tick the check box "Transfer all user comments" by each channel. If left unchecked (default) you will need to use the @slack-channel_name syntax for comments to be posted to slack.

If you wish to integrate with multiple Slack accounts, repeat the above steps and populate the Secondary Slack Account fields.

## Data Collected
### Metrics

The Slack integration does not provide any metrics at this time.

### Events

The Slack integration does not include any event at this time.

### Service Checks
The Slack integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
