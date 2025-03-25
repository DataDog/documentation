---
title: Threat Management Setup
disable_toc: false
---

## Prerequisites

Before setting up Threat Management, ensure the following prerequisites are met:

- **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- Datadog APM Configuration: Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- Supported Tracing Library: The Datadog Tracing Library used by your application or service supports Threat Management capabilities for the language of your application or service. For more details, refer to the Library Compatibility page.

## Threat Management enablement types overview

There are two main approaches to enable Threat Management on your tracing libraries: Single-Step Instrumentation and Datadog Tracing Libraries.

## Single-Step Instrumentation

Run a one-line install command to install the Datadog Agent, and enable Threat Management with Single-Step Instrumentation.


## Datadog Tracing Libraries

Add an environment variable or a new argument to your Datadog Tracing Library configuration.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}