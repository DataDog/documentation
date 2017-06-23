---
title: Datadog-AWS Internet of Things Integration
integration_title: AWS Internet of Things
kind: integration
git_integration_title: amazon_iot
newhlevel: true
---

## Overview

AWS IoT is a managed cloud platform that lets connected devices easily and securely interact with cloud applications and other devices.

Enable this integration to see in Datadog all your IOT metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that IOT is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
