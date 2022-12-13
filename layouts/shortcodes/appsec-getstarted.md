In general, setting up Application Security Management (ASM) involves:

1. [Identifying which services][102] to enable ASM on.
2. Updating to the latest Datadog library (the most recent APM tracing library).
3. Enabling the library to collect the application security data from the services and send it to Datadog.
4. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment. 
- Datadog APM is configured for your application or service, and traces are being received by Datadog. 

[101]: https://app.datadoghq.com/account/settings#agent
[102]: /security/application_security/how-appsec-works/#identify-services-exposed-to-application-attacks