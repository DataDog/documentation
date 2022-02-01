In general, setting up Application Security monitoring involves:

1. Installing the Datadog library (the most recent APM tracing library) and enabling it within your services.
2. Enabling the library to collect the application security data from the services and send it to Datadog.
3. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment. 
- Datadog APM is configured for your application or service, and traces are being received by Datadog. 

[101]: https://app.datadoghq.com/account/settings#agent
