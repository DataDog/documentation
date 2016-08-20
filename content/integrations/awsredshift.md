---
title: Datadog-AWS Redshift Integration
integration_title: AWS Redshift
kind: integration
git_integration_title: amazon_redshift
newhlevel: true
doclevel: basic
---

# Overview

Amazon Redshift is a fast, fully managed, petabyte-scale data warehouse service that makes it simple and cost-effective to efficiently analyze all your data.

Enable this integration to see all your Redshift metrics in Datadog.

# Configuration

If you haven't already, set up the [Amazon Web Services integration](/integrations/aws) first. In [the Amazon Web Services integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that Redshift is checked under "Limit metric collection".

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
