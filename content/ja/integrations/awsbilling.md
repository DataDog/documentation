---
title: Datadog-AWS Billing Integration
integration_title: AWS Billing
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: amazon_billing
---

# Overview

Amazon Billing allows you to track your AWS infrastructure billing forecasts and costs.

Enable this integration to see in Datadog all your Billing metrics.

# Installation

In order to see AWS Budget metrics, the requirement for this integration is the permission `budgets:ViewBudget`.

Note: AWS Budget metrics can only be collected from the AWS master account.

# Metrics

<%= get_metrics_from_git() %>
