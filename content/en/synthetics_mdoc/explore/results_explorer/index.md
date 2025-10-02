---
title: Synthetic Monitoring & Testing Results Explorer
description: Examine CI jobs executing Continuous Testing tests.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests >
  Synthetic Monitoring & Testing Results Explorer
sourceUrl: https://docs.datadoghq.com/synthetics/explore/results_explorer/index.html
---

# Synthetic Monitoring & Testing Results Explorer

## Overview{% #overview %}

The [Results Explorer](https://app.datadoghq.com/synthetics/explorer/) provides visibility into all test runs and CI batches for **Synthetic Monitoring** and **Continuous Testing**.

{% tab title="CI Batches" %}

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/explorer_ci_batches_1.d5b0a754d072c00ed09e370ad1949c98.png?auto=format"
   alt="Search and manage your CI batches in the Synthetic Monitoring & Testing Results Explorer" /%}

{% /tab %}

{% tab title="Test Runs" %}

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/explorer/explorer_test_runs_2.37e8970ab76f3bb962f5c1eb07889105.png?auto=format"
   alt="Search and manage your test runs in the Synthetic Monitoring & Testing Results Explorer" /%}

{% /tab %}

You can accomplish the following actions:

- Compare test runs executed against various devices and browsers to pinpoint cross-browser and device issues
- Examine performance issues with result timing facets and filter runs by failing status codes
- Try onboarding search queries to get started with searching in the Explorer

## Create a search query{% #create-a-search-query %}

Navigate to [**Digital Experience > Synthetic Monitoring & Testing** > **Continuous Testing**](https://app.datadoghq.com/synthetics/explorer/) and click on an out-of-the-box search query to start viewing your test batches or runs and create visualizations.

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/explorer_search_query_1.8a04a3d4e200584784d30a3bd57b4603.png?auto=format"
   alt="Out-of-the-box search queries available in the Explorer" /%}

- View failed tests running in a CI pipeline by filtering on their blocking status and confirming if they are blocking your new releases.
- Analyze failing test runs with HTTP error status codes to identify API tests with unexpected status codes.
- Examine test runs that initially failed and passed after a retry.
- Access test IDs to include in your CI pipeline.

For more information, see [Search Syntax](https://docs.datadoghq.com/continuous_testing/explorer/search_syntax/).

## Explore test runs{% #explore-test-runs %}

The Results Explorer displays all of your test runs from [Synthetic Monitoring](https://docs.datadoghq.com/synthetics/) and [Continuous Testing](https://docs.datadoghq.com/continuous_testing/). Every test corresponds to a test run for a particular test subtype, including fast retries. Click on a test in the Results Explorer to access the test run page.

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/api_test_run.aa9f2144afda601fbfbbeb503d6176b3.png?auto=format"
   alt="API test run details page" /%}

1. Click on a test run to navigate to the test results or details page.
1. Analyze your test run performance, or API and multistep API test performance.
1. Create a visualization such as a timeseries graph, top list, or table.

For more information about test runs, see [Search Test Runs](https://docs.datadoghq.com/continuous_testing/explorer/search_runs/).

## Explore test batches{% #explore-test-batches %}

The Results Explorer displays batches of tests run by [Continuous Testing and your CI/CD provider](https://docs.datadoghq.com/continuous_testing/cicd_integrations). Every batch corresponds with a call to the Datadog API (through one of your [CI/CD integrations](https://docs.datadoghq.com/continuous_testing/cicd_integrations), the [datadog-ci](https://www.npmjs.com/package/@datadog/datadog-ci) NPM package, or directly through the API endpoint) and triggers one or several test executions.

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/ci_execution_side_panel.f2c77c77277131164450900429c93d74.png?auto=format"
   alt="Side panel for a CI batch of test runs in the Synthetic Monitoring & Testing Results Explorer" /%}

1. Click on a batch to open a side panel containing batch CI/CD metadata and batch test results.
1. Explore the test executions performed as part of the batch and pinpoint test failures.
1. Click on a failing test result to see the detailed **Test Result** page and investigate the root cause of the issue.

For more information about test batches, see [Search Test Batches](https://docs.datadoghq.com/continuous_testing/explorer/search/).

## Export{% #export %}

You can [export test runs to CSV](https://docs.datadoghq.com/synthetics/explore/results_explorer/export/) from the Results Explorer for debugging, reporting, and integration with external systems.

You can also save your Results Explorer configuration as a [saved view](https://docs.datadoghq.com/continuous_testing/explorer/saved_views/) to quickly revisit it during future investigations.

## Further reading{% #further-reading %}

- [Incorporate Datadog Synthetic tests into your CI/CD pipeline](https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/)
- [Learn how to run Synthetic tests in a CI/CD pipeline](https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline)
- [Learn how to search through your test batches](https://docs.datadoghq.com/synthetics/explore/results_explorer/search/)
- [Learn how to search through your test runs](https://docs.datadoghq.com/synthetics/explore/results_explorer/search_runs/)
