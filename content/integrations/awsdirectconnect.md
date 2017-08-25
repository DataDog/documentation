---
title: Datadog-AWS Direct Connect Integration
integration_title: AWS Direct Connect
kind: integration
git_integration_title: amazon_directconnect
doclevel: basic
---

## Overview

This integration collects metrics from AWS Direct Connect (e.g. Connection state, bit rate ingress and egress, packet rate ingress and egress, and more)

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that **Direct Connect** is checked under **metric collection**.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
