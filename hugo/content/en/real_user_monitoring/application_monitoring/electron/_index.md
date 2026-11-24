---
title: Electron Monitoring
description: Collect RUM and Error Tracking data from your Electron applications.
further_reading:
- link: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=electron
  tag: Documentation
  text: RUM Electron Advanced Configuration
- link: https://github.com/DataDog/electron-sdk
  tag: "Source Code"
  text: Source code for electron-sdk
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

RUM for Electron monitors both layers of your application:

- The Electron SDK monitors the main process. It uses the Datadog Node.js tracer, `dd-trace-js`, to collect traces.
- The Browser SDK monitors renderer processes.

## Get started

To get started with RUM for Electron, create an application and configure the Electron SDK.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/setup/install/?platform=electron">}}<u>Setup</u>: Learn how to set up the Electron SDK and send data to Datadog.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/electron/error_tracking">}}<u>Error Tracking</u>: Track main process errors and crashes, and get deobfuscated stack traces.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=electron">}}<u>Advanced Configuration</u>: Configure initialization parameters and allowed renderer hosts.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/setup/data_collected/?platform=electron">}}<u>Data Collected</u>: Review data collected by the RUM Electron SDK.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/reference/troubleshooting/?platform=electron">}}<u>Troubleshooting</u>: Resolve common setup and runtime issues.{{< /nextlink >}}
{{< /whatsnext >}}
