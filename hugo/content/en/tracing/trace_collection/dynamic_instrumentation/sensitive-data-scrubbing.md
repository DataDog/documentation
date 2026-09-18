---
title: Live Debugger Sensitive Data Scrubbing
description: Protect sensitive application data captured by Live Debugger.
aliases:
    - /dynamic_instrumentation/sensitive-data-scrubbing/
    - /tracing/dynamic_instrumentation/sensitive-data-scrubbing
further_reading:
- link: "/tracing/live_debugger/#setup"
  tag: "Documentation"
  text: "Setting Up Live Debugger"
- link: "/security/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

## Overview

[Live Debugger][5] captures logs and variable snapshots that can contain sensitive application data.

Choose the values you collect deliberately and understand where redaction occurs:

- **Identifier and type rules** redact matching values in your infrastructure, before upload.
- **Live Debugger redaction modes** control which captured values are visible. Strict Mode and Targeted Mode cannot be disabled. See [Live Debugger redaction modes][7].
- **Sensitive Data Scanner rules** redact matching data after it reaches Datadog. They are not a substitute for rules that prevent sensitive values from leaving your infrastructure.

## Redact based on identifiers

### Default behavior

Live Debugger automatically redacts values linked to sensitive identifiers, such as `password` and `accessToken`. See [redacted identifiers][1].

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

To create a [Sensitive Data Scanner][4] rule for Live Debugger, set it to filter on `source:dd_debugger`.

### Customizing Sensitive Data Scanner

You can disable or customize rules through the [Sensitive Data Scanner][4].

**Note**: Datadog Sensitive Data Scanner performs its redaction _after_ the information is uploaded to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[3]: /security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /tracing/live_debugger/
[7]: /tracing/live_debugger/#mode-based-redaction
