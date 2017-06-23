---
title: Datadog-AWS Firehose Integration
integration_title: AWS Firehose
kind: integration
git_integration_title: amazon_firehose
newhlevel: true
---

## Overview

Amazon Kinesis Firehose is the easiest way to load streaming data into AWS.

Enable this integration to see in Datadog all your Firehose metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that Firehose is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
