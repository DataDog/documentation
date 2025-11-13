---
title: Change Failure Detection
description: "Learn how to configure change failure detection in DORA Metrics using rollbacks, revert PRs, and custom PR filters."
aliases:
- /continuous_integration/dora_metrics/change_failure_detection/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
---

{{< callout url="" btn_hidden="true" header="Coming Soon!" >}}
Change Failure Detection is in Preview.
{{< /callout >}}

## Overview

Datadog Change Failure Detection automatically identifies deployments that remediate previously failed deployments. By connecting deployment data with failure events, it provides a complete view of delivery performance, helping teams balance release velocity with operational stability.

## Rollbacks

A deployment is classified as a rollback when it deploys a version that matches a previously deployed version but differs from the immediately preceding deployment.

## Revert PRs

Datadog detects when a deployment includes a pull request that reverts a previous change, helping you identify recovery actions made through Git.

## PR filters

Change Failure Detection lets you define PR filters to automatically classify recovery deployments based on repository or release metadata.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

