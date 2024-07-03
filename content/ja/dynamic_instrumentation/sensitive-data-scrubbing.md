---
further_reading:
- link: /dynamic_instrumentation/enabling/
  tag: Documentation
  text: Setting Up Dynamic Instrumentation
- link: /sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
title: Dynamic Instrumentation Sensitive Data Scrubbing
---

## 概要

Datadog Dynamic Instrumentation enhances the observability and debugging capabilities of your applications by capturing variable data at arbitrary code locations in production environments. It also can craft and evaluate expressions in real-time, and integrate their outputs into log messages or add them as span tags. 

While this functionality is powerful, it also presents the possibility of sensitive data leaks, both intentional and unintentional. Alongside the product's robust data capture capabilities, it also provides comprehensive measures to safeguard sensitive information. 

By understanding and properly configuring these redaction mechanisms, you can use Dynamic Instrumentation with confidence and security. 

## Redact based on identifiers

### Default behavior

Dynamic Instrumentation automatically redacts values linked to specific identifiers deemed sensitive, such as `password` and `accessToken`. See [the full list of redacted identifiers][1].

### Custom identifier redaction

You can further tailor redaction by specifying additional identifiers. In your application's environment (not on `datadog-agent`), set the  `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` environment variable to a comma-separated list of identifiers such as `firstName,lastName,phoneNumber`.

Redaction applies universally, regardless of how the identifier is used in the code (as method arguments, local variables, class attributes, dictionary keys, and so on). The associated values are redacted in your infrastructure and not uploaded to Datadog.

## Redact based on specific classes or types

Certain classes may inherently contain sensitive information (for example, a `UserCredentials` class). Again in your application's environment (not on `datadog-agent`), set the `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` environment variable to a comma-separated list of sensitive types, such as `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Class-based redaction:

- Redacts variables of the types listed. Their contents are not uploaded to Datadog.
- Stops probes from being set within any code location in the redacted classes.

## Redact based on variable values with Sensitive Data Scanner

[機密データスキャナー][3]は、特定の正規表現に基づいて機密情報を識別し、削除します。

### 初期設定

When you first access [Dynamic Instrumentation Setup][2], you can optionally set up default Sensitive Data Scanner rules for Dynamic Instrumentation. These cover common regular expressions for likely sensitive data such as email addresses or JWT tokens.

### Customizing Sensitive Data Scanner

You can disable the default rules or create other rules through the [Sensitive Data Scanner][4]. To create a new Sensitive Data Scanner rule for Dynamic Instrumentation, set it to filter on `source:dd_debugger`.

**Note**: Datadog Sensitive Data Scanner performs its redaction _after_ the information is uploaded to Datadog.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: /ja/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner