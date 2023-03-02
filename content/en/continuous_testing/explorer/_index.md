---
title: Synthetic Monitoring & Continuous Testing Explorer
kind: documentation
description: Examine CI jobs executing Continuous Testing tests.
aliases: 
  - /synthetics/cicd_testing/ci_results_explorer
  - /synthetics/ci_results_explorer
  - /synthetics/explorer
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
- link: "/continuous_testing/explorer/search_runs/"
  tag: "Documentation"
  text: "Learn how to search through your test runs"
---

## Overview

The [Explorer][1] provides visibility into all test runs and CI batches for **Synthetic Monitoring** and **Continuous Testing**. 

{{< tabs >}}
{{% tab "CI Batches" %}}
{{< img src="continuous_testing/explorer_ci_batches.png" alt="Search and manage your CI batches in the Synthetic Monitoring & Continuous Testing Explorer" style="width:100%;">}}
{{% /tab %}}
{{% tab "Test Runs" %}}
{{< img src="continuous_testing/explorer_test_runs.png" alt="Search and manage your test runs in the Synthetic Monitoring & Continuous Testing Explorer" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

You can accomplish the following actions:

* Compare test runs executed against various devices and browsers to pinpoint cross-browser and device issues
* Examine performance issues with result timing facets and filter runs by failing status codes
* Try onboarding search queries to get started with searching in the Explorer

## Create a search query

Navigate to [**UX Monitoring** > **Explorer**][1] and click on an out-of-the-box search query to start viewing your test batches or runs and creating visualizations.

{{< img src="continuous_testing/explorer_search_query.png" alt="Out-of-the-box search queries available in the Explorer" style="width:100%;">}}

- View failed tests running in a CI pipeline by filtering on their blocking status and confirming if they are blocking your new releases.
- Analyze failing test runs with HTTP error status codes to identify API tests with unexpected status codes.
- Examine test runs that initially failed and passed after a retry.
- Access test IDs to include in your CI pipeline. 

For more information, see [Search Syntax][5].

## Explore test runs

The Explorer displays all of your test runs from [Synthetic Monitoring][7] and [Continuous Testing][8]. Every test corresponds to a test run for a particular test subtype, including fast retries. Click on a test in the Explorer to access the test run page.

{{< img src="continuous_testing/api_test_run.png" alt="API test run details page" style="width:100%;">}}

1. Click on a test run to navigate to the test results or details page. 
2. Analyze your test run performance, or API and multistep API test performance.
3. Create a visualization such as a timeseries graph, top list, or table.

For more information about test runs, see [Search Test Runs][6].

## Explore test batches

The Explorer displays batches of tests run by [Continuous Testing and your CI/CD provider][2]. Every batch corresponds with a call to the Datadog API (through one of your [CI/CD integrations][2], the [datadog-ci][3] NPM package, or directly through the API endpoint) and triggers one or several test executions. 

{{< img src="continuous_testing/open_sidepanel.png" alt="Side panel in the CI Results Explorer" style="width:100%;">}}

1. Click on a batch to open a side panel containing batch CI/CD metadata and batch test results. 
2. Explore the test executions performed as part of the batch and pinpoint test failures. 
3. Click on a failing test result to see the detailed **Test Result** page and investigate the root cause of the issue.

For more information about test batches, see [Search Test Batches][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /continuous_testing/explorer/search/
[5]: /continuous_testing/explorer/search_syntax/
[6]: /continuous_testing/explorer/search_runs/
[7]: /synthetics/
[8]: /continuous_testing/