---
title: Datadog-AWS Elastic File System Integration
integration_title: AWS Elastic File System
kind: integration
git_integration_title: amazon_efs
newhlevel: true
---

## Overview

Amazon EFS provides simple, scalable file storage for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EFS metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that EFS is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
