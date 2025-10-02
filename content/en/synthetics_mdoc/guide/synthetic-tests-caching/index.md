---
title: Avoid Cache Issues In Synthetic Tests
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Avoid
  Cache Issues In Synthetic Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/synthetic-tests-caching/index.html
---

# Avoid Cache Issues In Synthetic Tests

## Overview{% #overview %}

This guide describes how you can avoid caching issues while using Synthetic tests.

## API tests{% #api-tests %}

### HTTP tests{% #http-tests %}

You can leverage [local variables](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables) to generate a random string and send it with your payload to ensure your [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests) do not use your caching systems.

## Browser tests{% #browser-tests %}

Browsers are killed after every test execution, which ensures that your browser tests do not experience cache-related issues on the client side.

## Further Reading{% #further-reading %}

- [Configure a Browser Test](https://docs.datadoghq.com/synthetics/browser_tests)
- [Configure an HTTP test](https://docs.datadoghq.com/synthetics/api_tests/http_tests)
- [Patterns for safe and efficient cache purging in CI/CD pipelines](https://www.datadoghq.com/blog/cache-purge-ci-cd/)
