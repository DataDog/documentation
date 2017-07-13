---
title: Datadog-AWS Storage Gateway Integration
integration_title: AWS Storage Gateway
kind: integration
git_integration_title: amazon_storage_gateway
newhlevel: true
---

## Overview

AWS Storage Gateway provides seamless and secure integration between an organization's IT environment and AWS's storage infrastructure.

Enable this integration to see in Datadog all your Storage Gateway metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that Storage Gateway is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
