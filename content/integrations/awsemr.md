---
title: Datadog-AWS Elastic Map Reduce Integration
integration_title: AWS Elastic Map Reduce
kind: integration
git_integration_title: amazon_emr
newhlevel: true
---

# Overview

Amazon Elastic MapReduce (Amazon EMR) is a web service that makes it easy to quickly and cost-effectively process vast amounts of data.

Enable this integration to see in Datadog all your EMR metrics.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that EMR is checked under metric collection.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
