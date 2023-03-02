---
title: Continuous Testing Settings
kind: documentation
further_reading:
- link: "/continuous_testing/cicd_integrations"
  tag: "Documentation"
  text: "Integrate your Continuous Testing tests in your CI/CD pipelines"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/guide/explore-rum-through-synthetics/"
  tag: "Documentation"
  text: "Explore RUM & Session Replay in Synthetics"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test"
  tag: "Terraform"
  text: "Create and manage tests with Terraform"
---
{{< jqmath-vanilla >}}

## Overview

You can access Continuous Testing settings on the [Synthetic Monitoring & Continuous Testing Settings page][1].

{{< img src="continuous_testing/continuous_testing_settings_default.png" alt="Default settings for Continuous Testing" style="width:100%;">}}

By default, all your tests running in CI/CD pipelines run sequentially (one after the other). To change this behavior, set a [parallelization value](#set-parallelization) and save your selection.

## Parallelization

Parallel tests are tests that run simultaneously in your continuous integration and continuous delivery (CI/CD) pipelines. 

{{< img src="continuous_testing/parallelization_explained.png" alt="A diagram that explains the benefits of parallelization vs. sequential test runs" style="width:100%;">}}

This ensures you can:

* Reduce pipeline duration and ship new features faster
* Increase development confidence and speed of delivery
* Have complete test coverage and reduce the volume of production-breaking bugs from reaching your codebase

### Estimate parallelization

Click **Estimate Parallelization** to see how many tests Datadog recommends running in parallel based on your Continuous Testing metrics. 

{{< img src="continuous_testing/estimated_parallelization.png" alt="Completing the Estimate Parallelization wizard in Continuous Testing Settings" style="width:60%;">}}

After specifying the expected duration for testing in your CI pipeline and, optionally, the average number of tests per CI batch, the **Estimated Parallelization** section calculates the amount of parallelization you want to set:

$$\text"estimated parallelization" = {\text"average numbers of tests per CI batch" * \text"average test duration"} / \text"expected duration in your CI pipeline"$$

### Set parallelization

1. Under **Set your preferences**, select the **Parallelization** option. 
2. Customize the parallelization you need based on how many tests you want to run in parallel.
3. Click **Save Selection**.
4. Confirm your selection.

{{< img src="continuous_testing/continuous_testing_settings_parallelization.png" alt="Setting parallelization for Continuous Testing" style="width:100%;">}}

## Permissions

In order to customize the parallelization for Continuous Testing, you must have the `billing_edit` permission. 

Otherwise, the following error displays: `You're missing edit permission for Continuous Testing settings. You can run your tests with a parallelization of X (up to X tests running at the same time at a given point during your CI). To increase this value, reach out to your administrator admin.email@datadoghq.com`.

For more information, see [Datadog Role Permissions][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/settings/
[2]: /account_management/rbac/permissions/#billing-and-usage
