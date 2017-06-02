---
title: Datadog-Slack Integration
integration_title: Slack
git_integration_title: slack
kind: integration
newhlevel: true
---

# Overview

Connect Slack to Datadog in order to help your team collaborate by:

* Sharing graphs with your colleagues in your team's channels.
* Receiving alerts and notifications from Datadog with in Slack.


# Installation

Slack is installed via its [integration tile](https://app.datadoghq.com/account/settings#integrations/slack) in the Datadog application.

# Configuration
1. In your Slack account  go to the [Applications page](https://slack.com/apps) and search for Datadog.
1. Click Install, followed by Add Integration.
1. Copy the Slack Service Hook and paste in the [service hook field for Slack in Datadog](https://app.datadoghq.com/account/settings#integrations/slack).
1  Add the channels you want to be able to post to.
1. If you would like to be notified for every comment on a graph tick the check box "Transfer all user comments" by each channel. If left unchecked (default) you will need to use the @slack-channel_name syntax for comments to be posted to slack.

If you wish to integrate with multiple Slack accounts, repeat the above steps and populate the Secondary Slack Account fields.

# Metrics

The Slack integration does not provide any metrics at this time.
