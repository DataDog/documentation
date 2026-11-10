---
title: Electron Crash Reporting and Error Tracking
description: Set up Error Tracking for your Electron applications to get readable stack traces for main process and renderer errors.
further_reading:
- link: '/real_user_monitoring/investigate_problems/triage_errors_and_crashes/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/investigate_problems/triage_errors_and_crashes/explorer/'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'
- link: '/real_user_monitoring/guide/upload-javascript-source-maps/'
  tag: 'Documentation'
  text: 'Upload JavaScript source maps'
- link: 'https://github.com/DataDog/datadog-ci'
  tag: 'Source Code'
  text: 'datadog-ci'
- link: 'https://github.com/DataDog/electron-sdk'
  tag: 'Source Code'
  text: 'Source code for electron-sdk'
---

## Overview

Enable Error Tracking for your Electron application to surface, triage, and debug errors and crashes in [Error Tracking][1]. Errors are deduplicated and grouped into issues to help you prioritize the most impactful problems.

The Electron SDK collects:

- Uncaught errors in the main process.
- Native crashes. The SDK stores a crash report locally and sends it the next time the application launches.
- Errors you report manually with `addError`.

The Browser SDK collects errors from renderer processes.

## Setup

If you have not set up the RUM Electron SDK yet, follow the [setup instructions][2]. Error and crash collection is enabled after the SDK is initialized in the main process.

To report handled errors and upload source maps for readable stack traces, see [Track errors and crashes][3].

## Limitations

Symbols of native extensions (native Node.js modules and addons) are not supported, so frames from these modules are not symbolicated in native crash reports.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/investigate_problems/triage_errors_and_crashes/
[2]: /real_user_monitoring/setup/install/?platform=electron
[3]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=electron
