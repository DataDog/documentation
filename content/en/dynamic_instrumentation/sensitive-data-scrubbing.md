---
title: Dynamic Instrumentation Sensitive Data Scrubbing
kind: documentation
---

## Overview
Datadog Dynamic Instrumentation enhances the observability and debugging capabilities of your applications by allowing you to capture variable data at arbitrary code locations in production environments. It also supports crafting and evaluating expressions in real-time, integrating their outputs into log messages or adding them as span tags. However, this powerful tool raises concerns about data leakage, both intentional and unintentional. To mitigate this risk, Datadog provides several mechanisms for securing sensitive information.

### Redaction Based on Identifiers

#### Default Behavior
Dynamic Instrumentation automatically redacts values linked to specific identifiers deemed sensitive, such as `password` and `accessToken`. This list of identifiers which are redacted by default is [available for review][1].

#### Custom Identifier Redaction
You can further tailor redaction by specifying additional identifiers. To do so, set the  `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` environment variable in your application to a comma-separated list of identifiers (e.g., “firstName,lastName,phoneNumber”).

**Note:** This variable must be set in the application's environment, and not on `datadog-agent`.

Redaction applies universally, regardless of how the identifier is utilized in the code (method arguments, local variables, class attributes, dictionary keys, etc). The associated values are redacted in the customer's infrastructure and not uploaded to Datadog.

### Redaction Based on Specific Classes/Types

Certain classes may inherently contain sensitive information (e.g., a “UserCredentials” class). To handle this:, set the `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` environment variable in your application to a comma-separated list of sensitive types (e.g., “MyCompany.Authentication.UserCredential,MyCompany.BillingAddress”).

**Important:** Similar to identifier redaction, this environment variable needs to be set in the application's environment, and not on `datadog-agent`. 

Class-based redaction is two-fold:
- Variables of types listed are redacted, and their contents are not uploaded to Datadog.
- Probes cannot be set within any code location of the redacted classes.

### Redact Based on Variable Values with Sensitive Data Scanner

The Sensitive Data Scanner in Datadog is a feature designed to identify and redact sensitive information based on specific regular expressions.

- **Initial Setup:** Upon first accessing the [Dynamic Instrumentation Setup page][2], you are prompted to set up default Sensitive Data Scanner rules for Dynamic Instrumentation. These cover certain common regular expressions, such as ones that detect email addresses or JWT tokens.
- **Customization:** You can disable these rules or create new ones through the Sensitive Data Scanner page. To create a new Sensitive Data Scanner rule for Dynamic Instrumentation, ensure that it is set to filter on `source:dd_debugger`.

Note that the Datadog Sensitive Data Scanner is a backend component, and performs its redaction after the information has already been uploaded to Datadog.

## Conclusion
Datadog Dynamic Instrumentation offers robust data capture capabilities while providing comprehensive measures to safeguard sensitive information. By understanding and properly configuring these redaction mechanisms, you can leverage this powerful tool with confidence and security.

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
