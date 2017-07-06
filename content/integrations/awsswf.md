---
title: Datadog-AWS Simple Workflow Service Integration
integration_title: AWS Simple Workflow Service
kind: integration
git_integration_title: amazon_swf
newhlevel: true
---

# Overview

Amazon SWF helps developers build, run, and scale background jobs that have parallel or sequential steps.

Enable this integration to see in Datadog all your SWF metrics.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

# Configuration

In the Amazon Web Services integration tile, ensure that SWF is checked under metric collection.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
