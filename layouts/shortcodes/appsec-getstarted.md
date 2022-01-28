In general, setting up Application Security monitoring involves:

1. Ensuring your installed Datadog Agent supports Application Security.
2. Installing the Datadog Library (the most recent APM tracing library) and enabling it within your services.
3. Enabling the Agent to collect the application security data from the services and send it to Datadog.
4. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment. If you haven't done this yet, see the [Agent in-app documentation][101].

[101]: https://app.datadoghq.com/account/settings#agent
