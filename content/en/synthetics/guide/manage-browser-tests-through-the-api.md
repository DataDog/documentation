---
title: Manage Your Browser Tests Programmatically

further_reading:
- link: '/api/latest/synthetics'
  tag: 'API'
  text: 'Synthetics API'
- link: 'https://www.datadoghq.com/blog/private-synthetic-monitoring/'
  tag: 'Blog'
  text: 'Test on-premises applications with Datadog Synthetic private locations'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Learn about Browser Tests'
---

## Overview

Monitoring your application end-to-end is crucial to understanding your users' experience. The [Datadog test recorder][1] allows you to simplify configuration for these complex testing workflows. However, you may want to manage your Synthetics resources programmatically and define browser tests with the API or through [Terraform][14].

## Manage your browser tests with the API

Datadog recommends creating your browser tests in the Datadog UI first and retrieving your tests configurations with the API.

1. [Create a browser test][2] and [save a recording][3].
2. Use the [Get the list of all tests endpoint][4] to retrieve the list of all Synthetics tests.
3. Filter on `type: browser` and retrieve the `public_ids` of the browser tests you want to manage with the API. 
4. Use the [Get a browser test endpoint][5] to retrieve the configuration files of every browser test.

You can store the browser test configuration files for later usage or use them to duplicate, update, and delete your browser tests programmatically.

## Manage your browser tests with Terraform

You can use the [Datadog Terraform provider][6] to create and manage browser tests and associated synthetics resources programmatically through a Terraform configuration. You can also [import][7] your existing resources into your Terraform configuration, or reference existing resources as external [data sources][9].

### Browser tests

The [synthetic test resource][8], with `type` set to `browser`, can be used to create and manage your browser tests through Terraform. 

### Private locations

If you need to run your synthetic tests from custom or secured locations, you can use the [private location resource][10] to create and manage private locations to run your tests from. Learn more on the [private locations][11] page.

### Global and local variables

Use the [synthetics global variable resource][12] to create and manage synthetics global variables, which are variables that can be securely shared across tests. You can also create test-specific [local variables with builtins][15] by defining the [config_variable][16] nested schema with `type = "text"` in your synthetic test resources.

### Concurrency cap

The [synthetics concurrency cap resource][13] enables you to limit the number of synthetic tests run in parallel.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /getting_started/synthetics/browser_test#create-a-browser-test
[3]: /getting_started/synthetics/browser_test#create-recording
[4]: /api/latest/synthetics/#get-the-list-of-all-tests
[5]: /api/latest/synthetics/#get-a-browser-test
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[7]: https://developer.hashicorp.com/terraform/cli/import
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[9]: https://developer.hashicorp.com/terraform/language/data-sources
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[11]: /synthetics/private_locations
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[14]: https://www.terraform.io/
[15]: https://docs.datadoghq.com/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[16]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable