---
title: Record Steps With A Custom User-Agent
description: Record browser test steps with a custom User-Agent string
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Record
  Steps With A Custom User-Agent
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/recording-custom-user-agent/index.html
---

# Record Steps With A Custom User-Agent

## Overview{% #overview %}

Some implementations lead applications to render a certain way only when using a specific `User-Agent` string (for example, when using a mobile `User-Agent`). In these cases, you need to set the `User-Agent` header to a custom string to be able to record your browser tests' steps in your application. To do so:

1. Open your application in a pop-up by clicking on **Open in Popup** in your browser test recorder.
1. Open your Chrome Developer Tools.
1. Click on the menu button with the three vertical dots.
1. Select the **More tools - Network conditions** option.
1. Go to the **Network conditions** tab and disable the **Select automatically** option.
1. Choose **Custom** and enter the `User-Agent` string of interest.

**Note:** You can override the [default `User-Agent` string](https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers) at test execution time by adding it as a header in your test configuration.

## Further Reading{% #further-reading %}

- [Learn about steps for browser tests](https://docs.datadoghq.com/synthetics/browser_tests/actions)
- [Configure advanced options for steps](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/)
