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
---

## Overview

This page provides information to help you troubleshoot issues with Continuous Testing and CI/CD. If you need additional help, contact [Datadog support][1].

## Terminology

CI batch
: The group of Continuous Testing tests triggered through a continuous integration or continuous delivery (CI/CD) pipeline or the [Datadog Synthetic Monitoring API][2].

Test run
: A single run of a Continuuos Testing test. If you have configured retries, they count as individual test runs. For example, a test with two retries can have up to three associated test runs.

Batch timeout
: A batch timeout occurs when your batch does not complete within a reasonable time based on the [polling timeout][3] set in your configuration file. 

Execution rule
: An [execution rule][4] defines the impact of a test failure on a CI/CD pipeline from most to least impactful: `skipped`, `non_blocking`, and `blocking`. These options are weighted and defaults to the most impactful. If your test is configured as `skipped` in the UI and `blocking` in the configuration file, it is skipped during the test run. </br><br> You can set the execution rule in your tests' properties, global configuration file, or an individual test's override file. 

## Explorer

### CI metadata does not appear

Check whether you are using API endpoints to trigger your CI/CD test runs. In order to populate the CI Results Explorer with CI metadata, you must use one of Datadog's [native integrations][5], or the [NPM package][6].

## Further reading
 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /continuous_testing/cicd_integrations/configuration/?tab=npm#additional-configuration
[4]: /continuous_testing/cicd_integrations/configuration/?tab=npm#execution-rule
[5]: /continuous_testing/cicd_integrations
[6]: /continuous_testing/cicd_integrations#use-the-cli
