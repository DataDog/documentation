You already have the Datadog Agent installed to collect and route your logs to [Datadog Log Management][2001]. If you do not have Datadog Agents set up, see the [Datadog Agent documentation][2002] for more information.

You have the following information available:
- The Datadog Agent address, including the port. The Observability Pipelines Worker listens on this bind address to receive logs from your Datadog Agents.
- A Datadog API key with [Remote Configuration enabled][2003].
- Your Datadog [`Site URL`][2004]. For example, `datadoghq.com` for the site `US1`.

[2001]: /logs/
[2002]: /agent/
[2003]: /agent/remote_config/?tab=configurationyamlfile#setup
[2004]: /getting_started/site/
