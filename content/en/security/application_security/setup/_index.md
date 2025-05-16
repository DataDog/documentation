---
title: App and API Protection Setup
disable_toc: false
---

## Prerequisites 

Before setting up App and API Protection (AAP), ensure the following prerequisites are met:
- **Datadog Agent:** [Install the Datadog Agent][4] and configure it for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports threat management capabilities for the language of your application or service. For more details, see the [Library Compatibility][1] page.

## Datadog Tracing Libraries

Add an environment variable or a new argument to your [Datadog Tracing Library configuration][3].

By following these steps, you'll successfully set up AAP for your application or service, monitoring services that are under attack and protecting them against attacks.

[1]: /security/application_security/setup/compatibility
[3]: /security/application_security/setup/threat_detection
[4]: /agent/