---
title: Datadog-AWS Web Application Firewall Integration
integration_title: AWS Web Application Firewall
kind: integration
git_integration_title: amazon_waf
newhlevel: true
---

## Overview

AWS WAF is a web application firewall that helps protect your web applications from common web exploits.

Enable this integration to see in Datadog all your WAF metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). There are no other installation steps that need to be performed.

## Configuration

In the Amazon Web Services integration tile, ensure that WAF is checked under metric collection.

## Metrics



Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.
