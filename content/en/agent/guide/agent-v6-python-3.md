---
title: Use Python 3 with Datadog Agent v6
kind: guide
disable_toc: true
further_reading:
- link: "agent/version/upgrade_to_agent_v7"
  tag: "Documentation"
  text: "Upgrade to Agent v7"
---

Starting with v6.14.0, the Agent integrates both Python 2 and Python 3 runtimes. This means that Agent Checks can be run either with Python 2 or Python 3, depending on the Agent configuration.

By default, the Agent v6 uses the Python 2 runtime. To switch to the Python 3 runtime:

{{< tabs >}}
{{% tab "Host Agent" %}}

1. Set the `python_version` configuration option [in your `datadog.yaml` configuration file][1]:

    ```yaml
    python_version: 3
    ```

2. [Restart the Agent][2].

Alternatively, the `DD_PYTHON_VERSION` environment variable can be set to `2` or `3` to choose which Python runtime is used. If it is set, the `python_version` option in `datadog.yaml` is ignored.

This is an Agent-wide configuration option: **all Python checks launched by an Agent use the same Python runtime**.



[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized Agent" %}}

The official Containerized Agent images only include one of the two Python runtimes. To switch to one of the other runtime, choose the appropriate Agent image:

* **Python 2** runtime: Agent v6 images have the following format: `datadog/agent:<AGENT_VERSION>`, or `datadog/agent:<AGENT_VERSION>-jmx` for images supporting JMX checks.
* **Python 3** runtime: Agent v6 images have the following format: `datadog/agent:<AGENT_VERSION>-py3`, or `datadog/agent:<AGENT_VERSION>-py3-jmx` for images supporting JMX checks.

For example, for the Containerized Agent v6.14.0, select the `datadog/agent:6.14.0` or `datadog/agent:6.14.0-jmx` images to use the default Python runtime (Python 2), and select the `datadog/agent:6.14.0-py3` or `datadog/agent:6.14.0-py3-jmx` images to use the Python 3 runtime.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
