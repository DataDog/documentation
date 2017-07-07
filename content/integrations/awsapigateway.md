---
title: Datadog-AWS API Gateway Integration
integration_title: AWS API Gateway
kind: integration
git_integration_title: amazon_api_gateway
newhlevel: true
---

# Overview

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

Enable this integration to see in Datadog all your API Gateway metrics.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that API Gateway is checked under metric collection.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
