---
title: Datadog-AWS Elastic Block Store Integration
integration_title: AWS Elastic Block Store
kind: integration
git_integration_title: amazon_ebs
newhlevel: true
---

# Overview

Amazon EBS provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud.

Enable this integration to see in Datadog all your EBS metrics.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that EBS is checked under metric collection.

# Metrics



Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
