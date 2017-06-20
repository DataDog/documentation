---
title: Datadog-AWS Kinesis Integration
integration_title: AWS Kinesis
kind: integration
newhlevel: true
git_integration_title: amazon_kinesis
---

# Overview

Amazon Kinesis is a fully managed, cloud-based service for real-time processing of large, distributed data streams.

Enable this integration to see in Datadog all your Kinesis metrics, and collect custom Kinesis tags.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that Kinesis is checked under metric collection.

# Metrics



Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
