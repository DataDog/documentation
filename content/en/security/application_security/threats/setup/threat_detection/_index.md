---
title: Enabling ASM Threat Detection using Datadog Tracing Libraries
type: multi-code-lang
aliases:
- /security/application_security/enabling/tracing_libraries/threat_detection/
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog Application Security Management"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Tracking user activity"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB Application Security Management Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Management"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works in Datadog"
- link: "https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/"
  tag: "Blog"
  text: "Secure serverless applications with Datadog ASM"
---

## Prerequisites 

Before setting up Threat Management, ensure the following prerequisites are met:
- **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Threat Management capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

Select your application language for details on how to enable ASM Threat Detection for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/setup/compatibility
