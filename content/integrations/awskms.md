---
title: Datadog-AWS Key Management Service Integration
integration_title: AWS Key Management Service
kind: integration
git_integration_title: amazon_kms
newhlevel: true
---

## Overview

AWS Key Management Service (KMS) is a managed service that makes it easy for you to create and control the encryption keys used to encrypt your data.

Enable this integration to see in Datadog all your KMS metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that KMS is checked under metric collection.

## Metrics



Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
