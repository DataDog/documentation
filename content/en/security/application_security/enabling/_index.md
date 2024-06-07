---
title: Enabling ASM
kind: documentation
type: multi-code-lang
aliases:
  - /security_platform/application_security/getting_started/
  - /security/application_security/getting_started/
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog Application Security Management"
- link: "/security/application_security/enabling/compatibility/"
  tag: "Documentation"
  text: "Programming Language and Framework Compatibility"
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

{{< site-region region="gov" >}}
<div class="alert alert-warning">Application Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You can use Datadog Application Security Management products to: 

- Enable your application to [detect and protect against threats][1] targeting your production systems. 
- [Manage risks][2] in your code and its open source dependencies using the Datadog library for your application language. 
- Detect vulnerabilities and threats for apps hosted on a server, Docker, Kubernetes, Amazon ECS, or (for supported languages) AWS Fargate.

{{% appsec-getstarted %}}

## ASM enablement types

Use the following approaches to enable ASM products.

### ASM setup in the Datadog UI

To set up ASM products in your browser:

1. Go to [ASM Setup][5].
2. Follow the instructions for each of the ASM products.

Datadog also includes a [Getting Starting][6] guide to ASM products. Follow the guide to onboard with ASM.

### Single-step instrumentation

- [Single Step Instrumentation (Beta)][3]: Run a one-line install command to install the Datadog Agent, enable ASM, and protect all of your services on your Linux host, VM, or containers.

### Datadog tracing libraries

- [Datadog libraries][4]: Use Datadog tracing libraries to add and customize observability within Datadog.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/
[2]: /security/application_security/risk_management/
[3]: /security/application_security/enabling/single_step
[4]: /security/application_security/enabling/tracing_libraries
[5]: https://app.datadoghq.com/security/configuration/asm/setup
[6]: https://app.datadoghq.com/security/configuration/asm/onboarding