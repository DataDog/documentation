---
title: Datadog-AWS Direct Connect Integration
integration_title: AWS Direct Connect
kind: integration
git_integration_title: amazon_directconnect
doclevel: basic
---

## Overview

AWS Direct Connect makes it easy to establish a dedicated network connection from your premises to AWS.

Enable this integration to see in Datadog all your Direct Connect metrics

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that Direct Connect is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
