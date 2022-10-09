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

## Overview

The Continuous Testing settings can be found within the [Synthetic Monitoring settings page][1].

{{< img src="continuous_testing/continuous_testing_default.png" alt="Default settings for Continuous Testing" style="width:100%;">}}

You can run one test sequentially by default. You can change this behaviour by setting a [parallelization value](#parallelization).


## Parallelization

Parallel tests are tests that run simultaneously in your continuous integration and delivery pipelines. This ensure you can:

* Reduce pipeline duration and ship new features faster
* Increase development confidence and speed of delivery
* Have complete test coverage and reduce the volume of production-breaking bugs from reaching your codebase

{{< img src="continuous_testing/continuous_testing_setting_parallelization.png" alt="Setting parallelization for Continuous Testing" style="width:100%;">}}


### Set parallelization

* Select the parallelization option in the Continuous Testing settings page. 
* Customize the parallelization you need based on how many tests you need to run in parallel.
* Select `Save selection`
* Confirm your selection.

{{< img src="continuous_testing/continuous_testing_parallelization.png" alt="Parallelization turned on for Continuous Testing" style="width:100%;">}}

## Permissions

In order to customize the parallelization for Continuous Testing, you must have `BILLING_EDIT` permissions. If you do not, the following message will be displayed:

{{< img src="continuous_testing/continuous_testing_permissions.png" alt="Permissions in settings for Continuous Testing" style="width:100%;">}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/settings/
