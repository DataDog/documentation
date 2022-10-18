---
title: Continuous Testing Explorer
kind: documentation
description: Examine CI jobs executing Continuous Testing tests.
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
- link: "/continuous_testing/explorer/search/"
  tag: "Documentation"
  text: "Learn how to search through your test batches"
  
---

## Overview

The [Continuous Testing Explorer][1] provides visibility into the CI/CD jobs executing your Continuous Testing tests. 

{{< img src="continuous_testing/explorer_ci_batches.png" alt="Continuous Testing Explorer" style="width:100%;">}}

You can accomplish the following actions:

* Investigate every CI/CD job execution to identify and troubleshoot failing test results
* Compare test results executed against various devices and browsers to pinpoint cross browser and device issues
* Keep track of the progress of your tests in CI/CD pipelines
* Identify flaky tests to fix

## Explore test batches

The Continuous Testing Explorer displays batches of tests run by [Continuous Testing and your CI/CD provider][2]. Every batch corresponds with a call to the Datadog API (through one of your [CI/CD integrations][2], the [datadog-ci][3] NPM package, or directly through the API endpoint) and triggers one or several test executions. 

1. Click on a batch to open a side panel containing batch CI/CD metadata and batch test results. 
2. Explore the test executions performed as part of the batch and pinpoint test failures. 
3. Click on a failing test result to see the detailed **Test Result** page and investigate the root cause of the issue.

{{< img src="continuous_testing/open_sidepanel.png" alt="Side panel in the CI Results Explorer" style="width:100%;">}}

For more information about search, see [Search Test Batches][4].

## Create a search query

To start querying the CI Results Explorer data, see [Search Syntax][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /continuous_testing/explorer/search/
[5]: /continuous_testing/explorer/search_syntax/
