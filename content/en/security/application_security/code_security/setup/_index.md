---
title: Code Security Setup
disable_toc: false
aliases:
- /security/application_security/enabling/tracing_libraries/code_security/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/security/application_security/code_security"
  tag: "Documentation"
  text: "Code Security"
- link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Code Security"
- link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
  tag: "Blog"
  text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
---

## Prerequisites
Before setting up Code Security, ensure the following prerequisites are met:

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and traces are being received by Datadog.
3. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Software Composition Analysis capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Code Security Enablement Types

There are two main approaches to enable Code Security on your tracing libraries: Single-Step Instrumentation and Datadog Tracing Libraries.

### Single-Step Instrumentation

Run a one-line install command to install the Datadog Agent, and enable Code Security with [Single-Step Instrumentation][2].

### Datadog Tracing Libraries
Add an environment variable or a new argument to your Datadog Tracing Library configuration.

By following these steps, you'll successfully set up Code Security for your application or service, ensuring comprehensive monitoring and identification of code-level vulnerabilities at runtime.

#### Using Datadog Tracing Libraries

Select your application language for details on how to enable Code Security for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages-code-security.html" >}}</br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /security/application_security/enabling/compatibility/
[2]: /security/application_security/enabling/single_step/code_security/?tab=linuxhostorvm
