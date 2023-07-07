In general, setting up Application Security Management (ASM) involves:

1. Identifying services that are vulnerable or are under attack, which would most benefit from ASM. Find them on [the Security tab of your Service Catalog][102].
2. Updating to the latest Datadog library (the most recent APM tracing library).
3. Enabling the library to collect the application security data from the services and send it to Datadog.
4. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- The [Datadog Agent][101] is installed and configured for your application's operating system or container, cloud, or virtual environment. 
- [Datadog APM][103] is configured for your application or service, and traces are being received by Datadog. 
- If your service is running with [an Agent with Remote Configuration enabled and a tracing library version that supports it][104], you can block attackers from the Datadog UI without additional configuration of the Agent or tracing libraries.

[101]: https://app.datadoghq.com/account/settings#agent
[102]: https://app.datadoghq.com/services?lens=Security
[103]: /tracing/trace_collection/dd_libraries/
[104]: /agent/guide/how_remote_config_works/#enabling-remote-configuration