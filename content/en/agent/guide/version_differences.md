---
title: Agent Version differences
aliases:
- /agent/versions
further_reading:
    - link: 'agent/versions/upgrade_to_agent_v7'
      tag: 'Documentation'
      text: 'Upgrade to Agent v7'
    - link: 'agent/versions/upgrade_to_agent_v6'
      tag: 'Documentation'
      text: 'Upgrade to Agent v6'
    - link: 'agent/versions/upgrade_between_agent_minor_versions'
      tag: 'Documentation'
      text: 'Upgrade Between Agent Minor Versions'
    - link: 'agent/faq/agent_v6_changes'
      tag: 'FAQ'
      text: 'Agent v6 Changes'
---

<div class="alert alert-info"><p>
Datadog recommends you update Datadog Agent with every minor and patch release, or, at a minimum, monthly. </p>
<p>
Upgrading to a major Datadog Agent version and keeping it updated is the only supported way to get the latest Agent functionality and fixes. The Agent has frequent update releases, though, and managing updates at enterprise scale can be challenging. That doesn't mean you should wait for major releases before updating. The right update cadence for your organization will depend on your infrastructure and your configuration management practices, but aim for monthly.</p>
<p>
To update the Datadog Agent core between two minor versions on a given host, run <a href="/agent/versions/upgrade_between_agent_minor_versions">the corresponding install command for your platform</a>.</p>
<p>
Datadog Agent release numbering follows <a href="https://semver.org/">SemVer</a> rules.</p>
</div>

## Changes between major Agent versions

{{< tabs >}}
{{% tab "Agent v7 vs v6" %}}

Agent v7 is the latest major version of the Datadog Agent. The only change from Agent v6 is that **this version only includes support for Python 3 for integrations and custom checks**.

See the [Upgrade to Agent v7 documentation][1] to learn how to upgrade your Agent to version 7. All official integrations support Python 3 out-of-the-box. Follow the [Python 3 Custom Check Migration guide][2] to migrate your custom checks to Python 3.

**Note**: You can test this migration with Agent v6, by [Using Python 3 with Datadog Agent v6][3].


[1]: /agent/versions/upgrade_to_agent_v7/
[2]: /agent/guide/python-3/
[3]: /agent/guide/agent-v6-python-3/
{{% /tab %}}
{{% tab "Agent v6 vs v5" %}}

**Agent version 6 main changes**:

The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Golang has allowed the Agent to take advantage of concurrency. In place of the three processes the Agent v5 used to run—_the Forwarder_, _the Collector_, and _DogStatsD_—there is now only one process: _the Agent_. It also comes with a number of other core improvements:

- Agent v6 has significantly improved resource usage over Agent v5:

  - Decreased CPU usage
  - Decreased memory usage
  - Fewer file descriptors
  - All around decreased footprint

- Agent 6 uses [two additional ports][1]:

  - `5000` to expose its runtime metrics.
  - `5001` for the [Agent CLI/GUI commands][2].

    **Note**: You can specify different ports for `expvar_port` and `cmd_port` in the `datadog.yaml` file.

- Custom build your Agent v6 and [DogStatsD][3] much easier and with many more configuration options, to include or exclude almost anything.

**Agent v6 new functionalities**:

To see all changes between Agent v5 and v6, consult the [Datadog Agent dedicated changes][4] documentation. The following are key differentiators:

- [Distributions metrics][5] can be performed on the server directly to calculate real, effective global percentiles.
- [DogStatsD][3] can be used over a Unix socket instead of over UDP.
- [Live Process monitoring is available for Windows][6].
- [Prometheus OpenMetrics is supported natively][7].
- [All your logs can be sent to Datadog for alerting, analysis, and correlation with metrics][8].


[1]: /agent/#agent-architecture
[2]: /agent/configuration/agent-commands/
[3]: /developers/dogstatsd/unix_socket/
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /metrics/types/?tab=distribution#metric-types
[6]: /infrastructure/process/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /logs/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
