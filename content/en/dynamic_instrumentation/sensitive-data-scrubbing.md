---
title: Dynamic Instrumentation Sensitive Data Scrubbing
kind: documentation
---

## Overview
Datadog Dynamic Instrumentation enhances the observability and debugging capabilities of your applications by allowing you to capture variable data at arbitrary code locations in production environments. It also supports crafting and evaluating expressions in real-time, integrating their outputs into log messages or adding them as span tags. While this functionality is powerful, it also presents the possibility of sensitive data leak, both intentional or unintentional. Datadog has put in place several measures to secure sensitive data against such risks.

### Redact Based on Identifiers

#### Default Behavior
Dynamic Instrumentation automatically redacts values linked to specific identifiers deemed sensitive, such as `password` and `accessToken`. The full list of identifiers which are redacted by default is [available for review][1].

#### Custom Identifier Redaction
You can further tailor redaction by specifying additional identifiers. To do so, set the  `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` environment variable in your application to a comma-separated list of identifiers (e.g., “firstName,lastName,phoneNumber”).

**Note:** This variable must be set in the application's environment, and not on `datadog-agent`.

Redaction applies universally, regardless of how the identifier is utilized in the code (method arguments, local variables, class attributes, dictionary keys, etc). The associated values are redacted in the customer's infrastructure and not uploaded to Datadog.

### Redact Based on Specific Classes/Types

Certain classes may inherently contain sensitive information (e.g., a “UserCredentials” class). To handle this, set the `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` environment variable in your application to a comma-separated list of sensitive types (e.g., “MyCompany.Authentication.UserCredential,MyCompany.BillingAddress”).

**Important:** Similar to identifier redaction, this environment variable needs to be set in the application's environment, and not on `datadog-agent`. 

Class-based redaction accomplishes two things:
- Variables of types listed are redacted, and their contents are not uploaded to Datadog.
- Probes cannot be set any code location within the redacted classes.

### Redact Based on Variable Values with Sensitive Data Scanner

The [Sensitive Data Scanner][4] is a product designed to identify and redact sensitive information based on specific regular expressions.

- **Initial Setup:** Upon first accessing the [Dynamic Instrumentation Setup page][2], you are prompted to set up default Sensitive Data Scanner rules for Dynamic Instrumentation. These cover certain common regular expressions, such as ones that detect email addresses or JWT tokens.
- **Customization:** You can disable these rules or create new ones through the [Sensitive Data Scanner page][3]. To create a new Sensitive Data Scanner rule for Dynamic Instrumentation, ensure that it is set to filter on `source:dd_debugger`.

Note that the Datadog Sensitive Data Scanner is a backend component, and performs its redaction after the information has already been uploaded to Datadog.

## Conclusion
Datadog Dynamic Instrumentation offers robust data capture capabilities while providing comprehensive measures to safeguard sensitive information. By understanding and properly configuring these redaction mechanisms, you can leverage this powerful tool with confidence and security.

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: https://www.datadoghq.com/product/sensitive-data-scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
