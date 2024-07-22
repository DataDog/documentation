---
title: Agent 5 Debug Mode
---

## Overview

The Agent, by default, logs in `INFO` level. You can set the log level to `DEBUG` to get more information from your logs.

**Note**: Debug mode is meant for debugging purposes only. Datadog recommends only enabling `DEBUG` for a certain window of time as it increases the number of indexed logs. Set the log level back to `INFO` when done.

To enable the Agent full debug mode:

1. Modify your local `datadog.conf` file. See [Agent main configuration file][1] for OS specific details.
2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).
3. Restart the Datadog Agent. See [Agent Commands][2] for OS specific details.
4. Wait a few minutes to generate some logs. See [Agent Log Files][3] for OS specific details.

## Containerized Agent

When run in a container, the Agent cannot be restarted with `service datadog-agent restart` (or similar) which causes the container to be killed by Docker. Use supervisor to restart a containerized Agent:

```text
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

With the following commands, enable debug logging, restart the Agent, wait 60 seconds, then send a flare, in that order:

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

**Note**: When setting the log level to `'OFF'` in the configuration file, quotes are mandatory to prevent the value from being improperly parsed. Quotes are optional for other log levels.

[1]: /agent/guide/agent-5-configuration-files/
[2]: /agent/guide/agent-5-commands/
[3]: /agent/guide/agent-5-log-files/