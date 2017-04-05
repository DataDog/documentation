---
title: Datadog-AWS CloudFront Integration
integration_title: AWS CloudFront
kind: integration
git_integration_title: amazon_cloudfront
newhlevel: true
---

# Overview

Amazon CloudFront is a global content delivery network (CDN) service that accelerates delivery of your websites, APIs, video content or other web assets.

Enable this integration to see in Datadog all your CloudFront metrics.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that CloudFront is checked under metric collection.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
