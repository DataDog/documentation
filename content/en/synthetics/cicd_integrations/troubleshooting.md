---
title: CI/CD Integrations Troubleshooting
kind: documentation
description: Learn about Synthetics & CI/CD concepts and troubleshoot common errors.
further_reading:
- link: "/synthetics/cicd_integrations/configuration"
  tag: "Documentation"
  text: "Learn how to configure Synthetics and CI/CD"
---

## Overview

This page provides information to help you troubleshoot issues with Synthetics and CI/CD. If you need additional help, contact [Datadog support][1].

## Terminology

CI batch
: The group of Synthetic tests triggered through a continuous integration and continuous delivery (CI/CD) pipeline or the [Synthetic Monitoring API][2].

Test run
: A single run of a Synthetic test. If you have configured retries, they count as individual test runs. For example, a test with two retries can have up to three associated test runs.

Batch timeout
: A batch timeout occurs when your batch does not complete within a reasonable time based on the [polling timeout][3] set in your configuration file. 

Execution rule
: An [execution rule][4] defines the impact of a test failure on a CI pipeline from most to least impactful: `skipped`, `non_blocking`, and `blocking`. These options are weighted and defaults to the most impactful. If your test is configured as `skipped` in the UI and `blocking` in the configuration file, it is skipped during the test run. </br><br> You can set the execution rule in your tests' properties, global configuration file, or an individual test's override file. 

## Further reading
 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /synthetics/cicd_integrations/configuration/?tab=npm#additional-configuration
[4]: /synthetics/cicd_integrations/configuration/?tab=npm#execution-rule
