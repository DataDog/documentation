---
title: Synthetics and CI/CD
kind: documentation
description: Run Synthetic tests on-demand or at predefined intervals in your CI/CD pipelines.
aliases: 
  - /synthetics/ci
  - /synthetics/cicd_testing
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Synthetic tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/shift-left-testing-best-practices/"
  tag: "Blog"
  text: "Best practices for shift-left testing"
- link: "https://learn.datadoghq.com/enrol/index.php?id=37"
  tag: "Learning Center"
  text: "Learn how to run Synthetic tests in CI/CD pipelines"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/multistep"
  tag: "Documentation"
  text: "Configure a Multistep API Test"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"

---

## Overview

In addition to running tests at predefined intervals, you can run Datadog Synthetic tests on-demand by using the `@datadog/datadog-ci` package or the API. Run Datadog Synthetic tests in your continuous integration (CI) pipelines to block branches from being deployed and breaking your application in production.

Use Synthetics and CI/CD to also run tests as part of your continuous delivery (CD) process and evaluate the state of your applications and services in production immediately after a deployment finishes. You can detect potential regressions that may impact your users and automatically trigger a rollback when a critical test fails.

This functionality reduces time spent fixing issues in production by proactively catching bugs and regressions earlier in the process, allowing your engineering teams to focus on non-urgent work instead. 

To get started, see [Integrations](#integrations) and [use the API](#use-the-api) or the [open-source CLI package](#use-the-cli). 

## Integrations

{{< whatsnext desc="With Synthetics and CI/CD, you can run Synthetic tests in the CI platform provider of your choice:" >}}
    {{< nextlink href="synthetics/cicd_integrations/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/jenkins" >}}Jenkins{{< /nextlink >}}
{{< /whatsnext >}}

## Use the CLI

The [`@datadog/datadog-ci` package][1] allows you to run Synthetics tests directly within your CI/CD pipeline.

To use the [`@datadog/datadog-ci` NPM package][2], see [Configuration][3].

You can also trigger tests by searching with tags. For example: `"ci": "datadog-ci synthetics run-tests --config fileconfig.json -s 'tag:staging'"`.

**Note:** This command works as an argument. Do not use this in your configuration files.

## Use the API

The Synthetics API endpoints allow you to launch tests at any stage in your staging and deployment lifecycle. For example, after a canary deployment with an automated rollback.

Use the API endpoints to quickly verify that a new deployment does not introduce any regression. See the [Trigger tests from CI/CD pipelines][4] and [Get details of batch][5] endpoints to use them within your CI through cURL or a supported client.

### Trigger tests from CI/CD pipelines

The test triggering endpoint supports up to 100 tests in one request.

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: A JSON object containing the list of all tests to trigger and their configuration override.

#### Request data structure

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

The `TEST_TO_TRIGGER` objects compose of the required `public_id` for the test you want to trigger and the optional configuration overrides. For descriptions of each field, see [Configure tests][6].

A test's public identifier is either the identifier of the test found in the URL of a test's details page (for example: the identifier for `https://app.datadoghq.com/synthetics/details/abc-def-ghi` is `abc-def-ghi`) or the full URL of a test's details page (for example: `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

For more information, see the [Synthetics API endpoint documentation][4].

### Get details of batch

The get batch details endpoint retrieves results for the group of tests triggered in your CI/CD pipeline, otherwise known as a batch. You must provide the `batch_id` for the relevant CI execution.

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/ci/batch/{batch_id}`
* **Method**: `GET`
* **Parameters**: The `batch_id` for the batch of test results you want to inspect.

For more information, see the [Synthetics API endpoint documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /synthetics/cicd_integrations/configuration
[4]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[5]: /api/latest/synthetics/#get-details-of-batch
[6]: /synthetics/cicd_integrations/configuration#configure-tests
