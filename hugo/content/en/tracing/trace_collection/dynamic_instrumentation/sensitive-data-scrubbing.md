---
title: Sensitive Data Scrubbing for Live Debugger and Dynamic Instrumentation
description: Understand where sensitive data is redacted and configure identifier, type, and value-based scrubbing.
aliases:
    - /dynamic_instrumentation/sensitive-data-scrubbing/
    - /tracing/dynamic_instrumentation/sensitive-data-scrubbing
further_reading:
- link: "/dynamic_instrumentation/#enable-dynamic-instrumentation"
  tag: "Documentation"
  text: "Setting Up Dynamic Instrumentation"
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

## Overview

[Live Debugger][5] captures logs and variable snapshots for investigations. [Dynamic Instrumentation][6] adds metrics, spans, and span tags. Both can read application values that contain sensitive information.

Choose the values you collect deliberately and understand where redaction occurs:

- **Identifier and type rules** redact matching values in your infrastructure, before upload.
- **Live Debugger redaction modes** control which captured values are visible. Strict Mode and Targeted Mode cannot be disabled. See [Live Debugger redaction modes][7].
- **Sensitive Data Scanner rules** redact matching data after it reaches Datadog. They are not a substitute for rules that prevent sensitive values from leaving your infrastructure.

## Redact based on identifiers

### Default behavior

The SDK automatically redacts values linked to sensitive identifiers, such as `password` and `accessToken`. See [the Java SDK's redacted identifiers][1]. Built-in rules and configuration support can vary by SDK.

### Custom identifier redaction

You can further tailor redaction by specifying additional identifiers. In your application's environment (not on `datadog-agent`), set the  `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` environment variable to a comma-separated list of identifiers such as `firstName,lastName,phoneNumber`.

To exclude specific identifiers from the default redaction list, set the `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` environment variable to a comma-separated list of identifiers that should not be redacted, such as `cookie,sessionid`.

Redaction applies universally, regardless of how the identifier is used in the code (as method arguments, local variables, class attributes, dictionary keys, and so on). The associated values are redacted in your infrastructure and not uploaded to Datadog.

## Redact based on specific classes or types

Certain classes may inherently contain sensitive information (for example, a `UserCredentials` class). Again in your application's environment (not on `datadog-agent`), set the `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` environment variable to a comma-separated list of sensitive types, such as `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Class-based redaction:

- Redacts variables of the types listed. Their contents are not uploaded to Datadog.
- Stops probes from being set within any code location in the redacted classes.

## Redact based on variable values with Sensitive Data Scanner

[Sensitive Data Scanner][3] identifies and redacts sensitive information based on specific regular expressions.

### Initial setup

When you first access [Dynamic Instrumentation Setup][2], you can optionally set up default Sensitive Data Scanner rules for Dynamic Instrumentation. These cover common regular expressions for likely sensitive data such as email addresses or JWT tokens.

### Customizing Sensitive Data Scanner

You can disable or customize these Sensitive Data Scanner rules through the [Sensitive Data Scanner][4]. This does not disable Live Debugger's Strict or Targeted redaction mode. To apply a rule to Live Debugger logs, set its filter to `source:dd_debugger`.

**Note**: Datadog Sensitive Data Scanner performs its redaction _after_ the information is uploaded to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: /security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /tracing/live_debugger/
[6]: /dynamic_instrumentation/
[7]: /tracing/live_debugger/#mode-based-redaction
