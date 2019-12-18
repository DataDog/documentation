---
title: Usage metering
type: apicontent
order: 35
external_redirect: /api/#usage-metering
---

## Usage metering

This API is available to all Pro and Enterprise customers. Python and Ruby clients are not yet supported. Usage is only accessible for [parent-level organizations][1].

The usage metering end-point allows you to:

* Get Hourly Usage For Hosts and Containers
* Get Hourly Usage For Logs
* Get Hourly Usage For Custom Metrics
* Get Top Custom Metrics By Hourly Average
* Get Hourly Usage For Trace Search
* Get Hourly Usage For Synthetics Checks
* Get Hourly Usage For Fargate Tasks

Usage data is delayed by up to 72 hours from when it was incurred. It is retained for the past 15 months.

[1]: /account_management/multi_organization/
