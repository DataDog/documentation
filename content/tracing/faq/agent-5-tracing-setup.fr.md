---
title: Tracing distribué et APM avec l'Agent v5
kind: faq
private: true
---

## Débuter

APM is available as part of the Datadog Agent with versions 5.11+ as part of the one line install for the Linux and Docker Agents. Currently, [Mac][1] and [Windows][2] users must perform a manual install of the APM Agent (aka Trace Agent) via a separate install process.

The Agent can be enabled by including the following in your [Datadog Agent configuration file][3]:
```
apm_enabled: yes
```

<div class="alert alert-info">
APM is enabled by default after Datadog Agent 5.13 (on Linux and Docker), and can be disabled by adding the parameter: <code>apm_enabled: no</code> in your Datadog Agent configuration file.
</div>

### Installing the Agent

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog Agent. To enable tracing:

Install the latest [Datadog Agent][4] (version 5.11.0 or above is required).

### Running the Agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent][5] image (tagged version 11.0.5110 or higher) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page][6].

### Instrument your application

To instrument your application, select one of the following supported languages.

- [Go][7]
- [Java][8]
- [Python][9]
- [Ruby][10]

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API][11].

## Configuration

The Datadog Agent uses the configuration file for both infrastructure monitoring and APM configuration options.

Additionally, some configuration options may be set as environment variables. Note that options set as environment variables overrides the settings defined in the configuration file.

{{% table responsive="true" %}}
| Paramètre de fichier | variable d'environnement | Description |
|---|---|---|
| **main** |
| `apm_enabled` | `DD_APM_ENABLED` | L'agent Datadog accepte les métriques de trace lorsque la valeur est définie sur `true`. La valeur par défaut est `true`. |
| **trace.sampler** |
| `extra_sample_rate` | - | Utilisez ce réglage pour ajuster la fréquence d'échantillonnage des traces. La valeur doit être un float entre `0` (pas d'échantillonnage) et` 1` (taux d'échantillonnage normal). La valeur par défaut est `1` |
| `max_traces_per_second` | - | Le nombre maximum de traces à échantillonner par seconde. Pour désactiver la limite (*non recommandé*), réglez sur "0". La valeur par défaut est `10`.|
| **trace.receiver** |
| `receiver_port` | `DD_RECEIVER_PORT` | Le port sur lequel le récepteur de trace de l'agent Datadog doit écouter. La valeur par défaut est `8126`. |
| `connection_limit` | - | 
Le nombre de connexions client uniques à autoriser pendant une période de flottante de 30 secondes. La valeur par défaut est `2000`. |
| **trace.ignore** |
| `resource` | `DD_IGNORE_RESOURCE` | 
Une liste noire d'expressions régulières pour filtrer les traces en fonction de leur nom de ressource. |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page][12] or refer to the [`datadog.conf.example` file][13].

## Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel][14] in our Datadog Slack. Visit [http://chat.datadoghq.com][15] to join the Slack. We maintain a list of [community tracing libraries][16].

You can also reach our APM team via email at [tracehelp@datadoghq.com][17].

[1]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[2]: https://github.com/DataDog/datadog-trace-agent#run-on-windows
[3]: /agent/faq/where-is-the-configuration-file-for-the-agent
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent/
[6]: /tracing/docker
[7]: /tracing/setup/go
[8]: /tracing/setup/java
[9]: /tracing/setup/python
[10]: /tracing/setup/ruby
[11]: /api/?lang=console#traces
[12]: /agent/
[13]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[14]: https://datadoghq.slack.com/messages/apm
[15]: http://chat.datadoghq.com
[16]: /developers/libraries/#community-tracing-apm-libraries
[17]: mailto:tracehelp@datadoghq.com
