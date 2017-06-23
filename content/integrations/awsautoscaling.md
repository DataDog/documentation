---
title: Datadog-AWS Auto Scaling Integration
integration_title: AWS Auto Scaling
kind: integration
git_integration_title: amazon_auto_scaling
newhlevel: true
---

## Overview

Amazon Auto Scaling is a service to launch or terminate EC2 instances automatically based on user-defined policies.

Enable this integration to see in Datadog all your Auto Scaling metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that Auto Scaling is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
