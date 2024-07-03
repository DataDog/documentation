---
aliases:
- /ja/security_platform/application_security/getting_started/
- /ja/security/application_security/getting_started/
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against Threats with Datadog Application Security Management
- link: /security/application_security/enabling/compatibility/
  tag: Documentation
  text: Programming Language and Framework Compatibility
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Tracking user activity
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: OOTB Application Security Management Rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshooting Application Security Management
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How Application Security Management Works in Datadog
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: Blog
  text: Secure serverless applications with Datadog ASM
title: Enabling ASM
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

## 前提条件

Before setting up Application Security capabilities, ensure the following prerequisites are met:
- **Datadog Agent installation:** The [Datadog Agent][5] is installed and configured for your application's operating system or container, cloud, or virtual environment.
- **Datadog APM configuration:** [Datadog APM][6] is configured for your application or service, and traces are being received by Datadog.
- **Supported tracing library:** The Datadog Tracing Library used by your application or service supports Software Composition Analysis capabilities for the language of your application or service. For more details, see [Library Compatibility][7].

## Application Security enablement types

There are two main approaches to enable Application Security on your applications: Single-Step Instrumentation or Datadog Tracing Library.

### Single-step instrumentation

Run a one-line installation command to install the Datadog Agent and enable Application Security capabilities with [Single Step Instrumentation (Beta)][3].

### Datadog tracing libraries

Add an environment variable or a new argument to your [Datadog Tracing Library][4] configuration.


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/threats/
[2]: /ja/security/application_security/risk_management/
[3]: /ja/security/application_security/enabling/single_step
[4]: /ja/security/application_security/enabling/tracing_libraries
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /ja/tracing/trace_collection/dd_libraries/
[7]: /ja/security/application_security/enabling/compatibility/