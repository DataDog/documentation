---
title: Debug Mode
kind: documentation
disable_toc: true
aliases:
    - /agent/faq/how-to-get-more-logging-from-the-agent
    - /agent/faq/agent-5-container-more-log
further_reading:
- link: "/agent/troubleshooting/send_a_flare"
  tag: "Agent Troubleshooting"
  text: "Send an Agent Flare"
- link: "/agent/troubleshooting/agent_check_status"
  tag: "Agent Troubleshooting"
  text: "Get the Status of an Agent Check"
---

## Agent

To enable the Agent full debug mode:

{{< tabs >}}
{{% tab "Agent v6" %}}

1. Modify your local `datadog.yaml` file. See [Agent main configuration file][1] for OS specific details.

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.

4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[3]: /agent/guide/agent-log-files/?tab=agentv6
{{% /tab %}}
{{% tab "Agent v5" %}}

1. Modify your local `datadog.conf` file. See [Agent main configuration file][1] for OS specific details.

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.

4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

[1]: /agent/guide/agent-configuration-files/?tab=agentv5#agent-main-configuration-file
[2]: /agent/guide/agent-commands/?tab=agentv5#restart-the-agent
[3]: /agent/guide/agent-log-files/?tab=agentv5
{{% /tab %}}
{{< /tabs >}}

## Containerized Agent

{{< tabs >}}
{{% tab "Agent v6" %}}

**Set the `DD_LOG_LEVEL=debug` environment variable when starting your Agent.**

If your container is already running:

1. To prevent your process from being restarted by S6, run:

    `rm /var/run/s6/services/agent/finish`

2. Then stop the Agent:

    ```
    s6-svc -d /var/run/s6/services/agent/
    ```

3. Restart then the Agent with debug log level by running:

    ```
    DD_LOG_LEVEL=debug agent start
    ```

{{% /tab %}}
{{% tab "Agent v5" %}}

When run in a container, the Agent cannot be restarted via `service datadog-agent restart` (or similar) which causes the container to be killed by Docker. Use supervisor to restart a containerized Agent:

```
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

The following commands enable debug logging, restart the Agent, wait 60 seconds, then send a flare, in that order:

```
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <CASE_ID>
```

Debug logs can be disabled with:

```
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Or the container can be restarted.

{{% /tab %}}
{{< /tabs >}}

## Agent log level

The following Agent log levels are available for `log_level` or `DD_LOG_LEVEL`:

| Option  | Fatal logs | Error logs | Warn logs | Info logs | Debug logs | Trace logs | All logs  |
|---------|------------|------------|-----------|-----------|------------|------------|-----------|
| `OFF`   |            |            |           |           |            |            |           |
| `FATAL` | {{< X >}}  |            |           |           |            |            |           |
| `ERROR` | {{< X >}}  | {{< X >}}  |           |           |            |            |           |
| `WARN`  | {{< X >}}  | {{< X >}}  | {{< X >}} |           |            |            |           |
| `INFO`  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |           |
| `DEBUG` | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |           |
| `TRACE` | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |           |
| `ALL`   | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
