---
title: Manage Your Browser Tests Programmatically
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Manage
  Your Browser Tests Programmatically
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/manage-browser-tests-through-the-api/index.html
---

# Manage Your Browser Tests Programmatically

## Overview{% #overview %}

Monitoring your application end-to-end is crucial to understanding your users' experience. The [Datadog test recorder](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa) allows you to simplify configuration for these complex testing workflows. However, you may want to manage your Synthetics resources programmatically and define browser tests with the API or through [Terraform](https://www.terraform.io/).

## Manage your browser tests with the API{% #manage-your-browser-tests-with-the-api %}

Datadog recommends creating your browser tests in the Datadog UI first and retrieving your tests configurations with the API.

1. [Create a browser test](https://docs.datadoghq.com/getting_started/synthetics/browser_test#create-a-browser-test) and [save a recording](https://docs.datadoghq.com/getting_started/synthetics/browser_test#create-recording).
1. Use the [Get the list of all tests endpoint](https://docs.datadoghq.com/api/latest/synthetics/#get-the-list-of-all-tests) to retrieve the list of all Synthetic Monitoring tests.
1. Filter on `type: browser` and retrieve the `public_ids` of the browser tests you want to manage with the API.
1. Use the [Get a browser test endpoint](https://docs.datadoghq.com/api/latest/synthetics/#get-a-browser-test) to retrieve the configuration files of every browser test.

You can store the browser test configuration files for later usage or use them to duplicate, update, and delete your browser tests programmatically.

## Manage your browser tests with Terraform{% #manage-your-browser-tests-with-terraform %}

You can use the [Datadog Terraform provider](https://registry.terraform.io/providers/DataDog/datadog/latest/docs) to create and manage browser tests and associated synthetics resources programmatically through a Terraform configuration. You can also [import](https://developer.hashicorp.com/terraform/cli/import) your existing resources into your Terraform configuration, or reference existing resources as external [data sources](https://developer.hashicorp.com/terraform/language/data-sources).

### Browser tests{% #browser-tests %}

The [synthetic test resource](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test), with `type` set to `browser`, can be used to create and manage your browser tests through Terraform.

### Private locations{% #private-locations %}

If you need to run your synthetic tests from custom or secured locations, you can use the [private location resource](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location) to create and manage private locations to run your tests from. Learn more on the [private locations](https://docs.datadoghq.com/synthetics/private_locations) page.

### Global and local variables{% #global-and-local-variables %}

Use the [synthetics global variable resource](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable) to create and manage synthetics global variables, which are variables that can be securely shared across tests. You can also create test-specific [local variables with builtins](https://docs.datadoghq.com/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables) by defining the [config_variable](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable) nested schema with `type = "text"` in your synthetic test resources.

### Concurrency cap{% #concurrency-cap %}

The [synthetics concurrency cap resource](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap) enables you to limit the number of synthetic tests run in parallel.

## Further Reading{% #further-reading %}

- [Synthetics API](https://docs.datadoghq.com/api/latest/synthetics)
- [Test on-premises applications with Datadog Synthetic private locations](https://www.datadoghq.com/blog/private-synthetic-monitoring/)
- [Learn about Browser Tests](https://docs.datadoghq.com/synthetics/browser_tests)
