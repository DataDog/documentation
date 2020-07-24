---
title: RUM Error Tracking
kind: documentation
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/analytics/"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< img src="real_user_monitoring/etracking_explorer.png" alt="Error Tracking Explorer"  >}}

<div class="alert alert-warning"> This service is in private beta. If you have any feedback or you want to request access, contact <a href="/help">Datadog support</a>.</div>

## What is error tracking?

Across the different products of its platform, namely [Real User Monitoring][/real_user_monitoring], [APM][/tracing] and [Log Management][/logs], Datadog collects a lot of errors. The monitoring of those errors is critical for the health of a system but there can be so many individual error events that it’s hard to identify which ones matter the most and should be fixed first. The goal of Error Tracking is to make this easy by:
* __Grouping similar errors into issues__ to reduce the noise and help identify the most important ones.
* __Following issues over time__ to know when they first started, if they are still ongoing and more importantly how often they are occurring.
* __Getting all the context needed in one place__ to facilitate the troubleshooting.

## Getting Started

Error Tracking processes for now __errors collected from the browser by the RUM SDK__ (errors with [source origin][/real_user_monitoring/data_collected/error#error-origins]). We plan to soon process errors from your mobile and back-end applications using errors already collected through the RUM and APM SDKs.

For Error Tracking to properly work, you must set the __version__, the __environment__ and the __service__ when initializing your different SDKs or when configuring your Datadog agent (for APM only, once supported). Refer to the dedicated documentation for more information:
* [Initialize the RUM SDK][/real_user_monitoring/installation/?tab=us#initialization-parameters]

__Important note__: you must download the `v1.11.5` version and onwards of the RUM SDK.

