---
title: Debug Mode
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

## Overview

The Agent, by default, logs in `INFO` level. You can set the log level to `DEBUG` to get more information from your logs.

**Note**: Debug mode is meant for debugging purposes only. Datadog recommends only enabling `DEBUG` for a certain window of time as it increases the number of indexed logs. Set the log level back to `INFO` when done.

To enable the Agent full debug mode:

1. Modify your local `datadog.yaml` file. See [Agent main configuration file][1] for OS specific details.

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.

4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

## Containerized Agent

To enable debug mode for the container Agent, use `DD_LOG_LEVEL=debug` when starting your Agent.

For Agent v6.19+ / v7.19+, set the Agent log level at runtime using:

```shell
agent config set log_level debug
```

You **cannot** change the log level for the trace-agent container at runtime like you can do for the agent container. A redeployment after setting `DD_LOG_LEVEL` variable to `debug` is still necessary for the dedicated trace-agent container.

If using [**Helm**][4], replace `logLevel: INFO` with `logLevel: DEBUG` in your `datadog-values.yaml` file and re-deploy.

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

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/helm-charts/blob/637472f105f42e8b444981ea2a38e955161c8e3a/charts/datadog/values.yaml#L125
