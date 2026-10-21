---
title: Electron Monitoring
description: Collect RUM and Error Tracking data from your Electron applications.
further_reading:
- link: /real_user_monitoring/application_monitoring/electron/advanced_configuration
  tag: Documentation
  text: RUM Electron Advanced Configuration
- link: https://github.com/DataDog/electron-sdk
  tag: "Source Code"
  text: Source code for electron-sdk
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
cascade:
    site_support_id: rum_electron
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

RUM for Electron monitors both layers of your application:

- The main process is monitored by the Electron SDK, which uses and configures dd-trace-js to collect traces.
- Renderer processes are monitored by the Browser SDK.

## Get started

To get started with RUM for Electron, create an application and configure the Electron SDK.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/setup">}}<u>Setup</u>: Learn how to set up the Electron SDK and send data to Datadog.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/error_tracking">}}<u>Error Tracking</u>: Track main process errors and crashes, and get deobfuscated stack traces.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/advanced_configuration">}}<u>Advanced Configuration</u>: Configure sampling, tracking consent, and event enrichment.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/data_collected">}}<u>Data Collected</u>: Review data collected by the RUM Electron SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/troubleshooting">}}<u>Troubleshooting</u>: Common setup and runtime issues.{{< /nextlink >}}
{{< /whatsnext >}}
