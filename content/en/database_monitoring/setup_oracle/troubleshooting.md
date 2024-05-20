---
title: Troubleshooting DBM Setup for Oracle
kind: documentation
description: Troubleshoot Database Monitoring setup for Oracle
---

This page details common issues with setting up and using Database Monitoring with Oracle, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Common issues

### "Connection refused" error
Check the connectivity between the Agent and the monitored database by running one of these commands on the machine where the Agent is running, then investigating any errors:

- `nc -v <DB_SERVER> <PORT>`
- `curl <DB_SERVER>:<PORT>`
- `telnet <DB_SERVER> <PORT>`

It's important to specify the exact values for `<DB_SERVER>` and `<PORT>` that are configured for that instance in the `oracle` configuration file.

Using the `telnet` command as an example, the expected output for a correctly configured connection is

{{< code-block lang="text" disable_copy="true" collapsible="true" >}}
Trying <DB_SERVER_IP_ADDRESS>...
Connected to <DB_SERVER_NAME>.
Escape character is '^]'.
{{< /code-block >}}

### Custom queries are not working properly
Ensure that the [recommended Agent version][2] for your hosting type is installed.

### Execution plan query takes seconds
Ensure that the [recommended Agent version][2] for your hosting type is installed.

### PGA memory or temp tablespace leak
Ensure that the [recommended Agent version][2] for your hosting type is installed.

### "Table or view does not exist" error in `agent.log`
Execute the permission grants listed in the **Grant permissions** step of the [setup instructions][3] for your hosting type.

[1]: /database_monitoring/setup_oracle/
[2]: /database_monitoring/setup_oracle#recommended-agent-version
[3]: /database_monitoring/setup_oracle#setup
