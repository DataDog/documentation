---
title: Code Security Setup
disable_toc: false
aliases:
- /security/application_security/enabling/single_step/code_security/
- /security/application_security/enabling/tracing_libraries/code_security/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/security/code_security/iast"
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
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
3. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Code Security capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Using Datadog Tracing Libraries

Select your application language for details on how to enable Code Security for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages-code-security.html" >}}</br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /security/code_security/iast/setup/compatibility/
