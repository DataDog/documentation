---
title: Continuous Testing and CI/CD Troubleshooting
kind: documentation
description: Learn about Continuous Testing and CI/CD concepts and troubleshoot common errors.
aliases:
  - /synthetics/cicd_integrations/troubleshooting
further_reading:
- link: "/synthetics/cicd_integrations/configuration"
  tag: "Documentation"
  text: "Learn how to configure Continuous Testing and CI/CD"
- link: "https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/"
  tag: "Blog"
  text: "Best practices for continuous testing with Datadog"
---

## Overview

This page provides information to help you troubleshoot issues with Continuous Testing and CI/CD. If you need additional help, contact [Datadog support][1].

## Terminology

CI batch 
: The group of Continuous Testing tests triggered through a continuous integration or continuous delivery (CI/CD) pipeline or the [Datadog Synthetic Monitoring API][2].

Test run
: A single run of a Continuous Testing test, which can be an [API][7] or [browser test][8]. If you have configured retries, they count as individual test runs. For example, a test with two retries can have up to three associated test runs.

Parallel test
: A Continuous Testing test that is run at the same time as another Continuous Testing test in your CI/CD pipeline. To set how many tests you would like to run in parallel, configure parallelization on the [Continuous Testing Settings page][9].

Batch timeout
: A batch timeout occurs when your batch does not complete within a reasonable time based on the [polling timeout][3] set in your configuration file. 

Execution rule
: An [execution rule][4] defines the impact of a test failure on a CI/CD pipeline from most to least impactful: `skipped`, `non_blocking`, and `blocking`. These options are weighted and default to the most impactful. If your test is configured as `skipped` in the UI and `blocking` in the configuration file, it is skipped during the test run. </br><br> You can set the execution rule in your tests' properties, global configuration file, or an individual test's override file. 

## Results Explorer

### CI metadata does not appear

Check whether you are using API endpoints to trigger your CI/CD test runs. In order to populate the Synthetic Monitoring & Continuous Testing Results Explorer with CI metadata, you must use one of Datadog's [native integrations][5], or the [NPM package][6].

## Within your CI/CD pipeline

### My tests are timing out in my CI pipeline

The first thing to check is which failure mode flags you are passing in your [global configuration file][3]. For CI runs that contain multiple tests, some tests are queued based on the parallelization setting defined on the [Continuous Testing Settings page][9]. You may need to adapt both your configuration and parallelization based on your organizational needs.

## Further reading
 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[4]: /continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[5]: /continuous_testing/cicd_integrations
[6]: /continuous_testing/cicd_integrations#use-the-cli
[7]: /synthetics/api_tests/
[8]: /synthetics/browser_tests/?tab=requestoptions
[9]: /continuous_testing/settings
