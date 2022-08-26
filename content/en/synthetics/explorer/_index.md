---
title: CI Results Explorer
kind: documentation
description: Examine CI jobs executing Synthetic tests.
aliases: 
  - /synthetics/cicd_testing/ci_results_explorer
  - /synthetics/ci_results_explorer
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Synthetic tests into your CI/CD pipeline"
- link: "https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline"
  tag: "Learning Center"
  text: "Learn how to run Synthetic tests in a CI/CD pipeline"
- link: "/synthetics/search/"
  tag: "Documentation"
  text: "Learn how to search through your Synthetic objects"
  
---

## Overview

The [CI Results Explorer][1] provides visibility into the CI jobs executing your Synthetic tests. 

{{< img src="synthetics/ci_results_explorer/ci_results_explorer_1.png" alt="CI Results Explorer" style="width:100%;">}}

You can accomplish the following actions:

* Investigate every CI job execution to identify and troubleshoot failing test results
* Compare test results executed against various devices and browsers to pinpoint cross browser and device issues
* Keep track of the progress of your tests in CI pipelines
* Identify flaky tests to fix

## Explore test batches

The CI Results Explorer displays batches of tests run by [Synthetics and your CI/CD provider][2]. Every batch corresponds with a call to the Datadog API (through one of your [CI/CD integrations][2], the [datadog-ci][3] NPM package, or directly through the API endpoint) and triggers one or several test executions. 

1. Click on a batch to open a side panel containing batch CI metadata and batch test results. 
2. Explore the test executions performed as part of the batch and pinpoint test failures. 
3. Click on a failing test result to see the detailed **Test Result** page and investigate the root cause of the issue.

For more information about search, see [Search Test Batches][4].

## Create a search query

To start querying the CI Results Explorer data, see [Search Syntax][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /synthetics/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /synthetics/explorer/search/
[5]: /synthetics/explorer/search_syntax/
