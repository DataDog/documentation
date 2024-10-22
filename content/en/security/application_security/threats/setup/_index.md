---
title: Threat Management Setup
disable_toc: false
---

## Prerequisites 

Before setting up Threat Management, ensure the following prerequisites are met:
- **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Threat Management capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Threat Management Enablement Types

There are two main approaches to enable Threat Management on your tracing libraries: Single-Step Instrumentation and Datadog Tracing Libraries.

### Single-Step Instrumentation

Run a one-line install command to install the Datadog Agent, and enable [Threat Management with Single-Step Instrumentation][2].

### Datadog Tracing Libraries

Add an environment variable or a new argument to your [Datadog Tracing Library configuration][3].

By following these steps, you'll successfully set up Threat Management for your application or service, monitoring services that are under attack and protecting them against attacks.

[1]: /security/application_security/threats/setup/compatibility
[2]: /security/application_security/threats/setup/single_step
[3]: /security/application_security/threats/setup/threat_detection
