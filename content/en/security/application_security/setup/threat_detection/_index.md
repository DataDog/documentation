---
title: Enabling AAP Threat Detection using Datadog Tracing Libraries
type: multi-code-lang
aliases:
- /security/application_security/enabling/tracing_libraries/threat_detection/
- /security/application_security/threats/threat_detection/
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog App and API Protection"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Tracking user activity"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works in Datadog"
---

## Prerequisites 

Before setting up Application & API Protection, ensure the following prerequisites are met:
- **Datadog Agent:** [Install the Datadog Agent][2] and configure it for your application's operating system or container, cloud, or virtual environment.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Application & API Protection capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Using AAP without APM tracing

If you want to use Application & API Protection without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][3].

Select your application language for details on how to enable AAP Threat Detection for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages.html" >}}</br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility
