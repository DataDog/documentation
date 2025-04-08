---
title: Enabling ASM Threat Detection using Datadog Tracing Libraries
type: multi-code-lang
aliases:
- /security/application_security/enabling/tracing_libraries/threat_detection/
- /security/application_security/threats/threat_detection/
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
- **Datadog Agent:** [Install the Datadog Agent][2] and configure it for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Threat Management capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Using ASM without APM tracing

If you want to use Application Security Management without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by Application Security products.

For more details, see [Standalone Application Security][3].

## Language-specific configuration

Select your application language for details on how to enable ASM Threat Detection for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/setup/compatibility
[2]: /agent/
[3]: /security/application_security/guide/standalone_application_security/
