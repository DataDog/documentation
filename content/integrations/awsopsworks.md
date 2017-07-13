---
title: Datadog-AWS OpsWorks Integration
integration_title: AWS OpsWorks
kind: integration
git_integration_title: amazon_ops_works
newhlevel: true
---

## Overview

AWS OpsWorks is an application management service that makes it easy to deploy and operate applications of all shapes and sizes.

Enable this integration to see in Datadog all your OpsWorks metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that OpsWorks is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
