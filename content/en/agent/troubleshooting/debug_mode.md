---
title: Debug Mode
kind: documentation
aliases:
    - /agent/faq/how-to-get-more-logging-from-the-agent
    - /agent/faq/agent-5-container-more-log
further_reading:
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Documentation"
  text: "Get the Status of an Agent Check"
---

## Agent

The Agent, by default, logs in `INFO` level. You can set the log level to `DEBUG` to get more information from your logs.

**Note**: Debug mode is meant for debugging purposes only. Datadog recommends only enabling `DEBUG` for a certain window of time as it increases the number of indexed logs. Set the log level back to `INFO` when done.

To enable the Agent full debug mode:

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

1. Modify your local `datadog.yaml` file. See [Agent main configuration file][1] for OS specific details.

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.

4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /agent/configuration/agent-log-files/
{{% /tab %}}
{{% tab "Agent v5" %}}

1. Modify your local `datadog.conf` file. See [Agent main configuration file][1] for OS specific details.

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.

4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

[1]: /agent/configuration/agent-configuration-files/?tab=agentv5#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/?tab=agentv5#restart-the-agent
[3]: /agent/configuration/agent-log-files/?tab=agentv5
{{% /tab %}}
{{< /tabs >}}

## Containerized Agent

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

To enable debug mode for the container Agent, use `DD_LOG_LEVEL=debug` when starting your Agent.

For Agent v6.19+ / v7.19+, set the Agent log level at runtime using:

```shell
agent config set log_level debug
```

You **cannot** change the log level for the trace-agent container at runtime like you can do for the agent container. A redeployment after setting `DD_LOG_LEVEL` variable to `debug` is still necessary for the dedicated trace-agent container.

{{% /tab %}}
{{% tab "Agent v5" %}}

When run in a container, the Agent cannot be restarted via `service datadog-agent restart` (or similar) which causes the container to be killed by Docker. Use supervisor to restart a containerized Agent:

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

The following commands enable debug logging, restart the Agent, wait 60 seconds, then send a flare, in that order:

```shell
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <CASE_ID>
```

Debug logs can be disabled with:

```shell
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Or the container can be restarted.

{{% /tab %}}
{{< /tabs >}}

## Agent log level

The following Agent log levels are available for `log_level` or `DD_LOG_LEVEL`:

| Option     | Critical logs | Error logs | Warn logs | Info logs | Debug logs | Trace logs |
|------------|---------------|------------|-----------|-----------|------------|------------|
| `'OFF'`      |               |            |           |           |            |            |
| `'CRITICAL'` | {{< X >}}     |            |           |           |            |            |
| `'ERROR'`    | {{< X >}}     | {{< X >}}  |           |           |            |            |
| `'WARN'`     | {{< X >}}     | {{< X >}}  | {{< X >}} |           |            |            |
| `'INFO'`     | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |
| `'DEBUG'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |
| `'TRACE'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |

**Note**: When setting the log level to `'OFF'` in the configuration file quotes are mandatory to prevent the value for being improperly parsed. Quotes are optional for other log levels.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
