---
title: Clone Your Synthetic Tests
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Clone
  Your Synthetic Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/clone-test/index.html
---

# Clone Your Synthetic Tests

## Overview{% #overview %}

To clone a Synthetic Monitoring test, use the UI or API endpoints.

## Use the UI{% #use-the-ui %}

1. In a Synthetic Monitoring test, click the **Gear** icon on the right.
1. Click **Clone** in the dropdown menu.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/faq/clone-test.mp4" /%}

## Use the API{% #use-the-api %}

1. Retrieve your test configuration with the relevant endpoint. See [Get an API test](https://docs.datadoghq.com/api/latest/synthetics/#get-an-api-test) or [Get a browser test](https://docs.datadoghq.com/api/latest/synthetics/#get-a-browser-test).
1. Perform modifications as needed (such as changing the URL or tags).
1. Send your updated test configuration with the relevant endpoint. See [Create an API test](https://docs.datadoghq.com/api/latest/synthetics/#create-an-api-test) or [Create a browser test](https://docs.datadoghq.com/api/latest/synthetics/#create-a-browser-test).

## Further Reading{% #further-reading %}

- [Learn about Synthetic Monitoring](https://docs.datadoghq.com/synthetics/)
