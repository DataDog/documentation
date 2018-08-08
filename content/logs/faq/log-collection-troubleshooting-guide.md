---
title: Log Collection Troubleshooting Guide
kind: faq
further_reading:
- link: "/logs/log_collection"
  tag: "Documentation"
  text: Learn how to collect your logs
- link: "/logs/explorer"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/"
  tag: "FAQ"
  text: Why do my logs not have the expected timestamp?
- link: "/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors/"
  tag: "FAQ"
  text: Why do my logs show up with an Info status even for Warnings or Errors?
---

There are a number of common issues that can get in the way when [sending new logs to Datadog][1] via the log collector in the dd-agent. If you experience issues sending new logs to Datadog, this list helps you troubleshoot. If you continue to have trouble, email [us][2] for further assistance.

## The Agent needs to be restarted

After you've made any configuration changes to the `datadog-agent`, the changes only take effect after you restart the dd-agent.

## No new logs have been written

The `datadog-agent` only collects logs that have been written after it has started trying to collect them (whether it be tailing or listening for them). In order to confirm whether log collection has been successfully set up, make sure that new logs have been written.

## Permission Issues While Tailing Log Files

The `datadog-agent` does not run as root (and we do not recommend that you make it run as root, as a general best-practice). For this reason, when you configure your `datadog-agent` to tail log files (for custom logs or for integrations) you need to take special care to ensure the `datadog-agent` user has read access to tail the log files you want to collect from.

If the `datadog-agent` user does not have read access to the files you configure it to tail, then a permissions error is captured in the `/var/log/datadog/agent.log`. The Agent requires to have an execute permission on the directory containing the files (this is the default permission required to be able to list the file contained in a directory).

**Note**: When adding the appropriate read permissions, make sure that these permissions are correctly set in your log rotation configuration. Otherwise, on the next log rotate, the Datadog Agent may lose its read permissions.
Set permissions as `644` in the log rotation configuration to make sure the agent has read access to the files.

## Outbound traffic on port 10516 is blocked

The log-agent within the `datadog-agent` sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the `agent.log` file to that effect.

Test manually your connection by running a telnet or openssl command like so (port 10514 would work too, but is less secure):

* openssl s_client -connect intake.logs.datadoghq.com:10516
* telnet intake.logs.datadoghq.com 10514

And then by sending a log like the following:

```
<API_KEY> this is a test message
```

## Configuration issues

These are a few of the common configuration issues that are work triple-checking in your `datadog-agent` setup:

1. Run the Agent status config to spot the major configuration issue: `datadog-agent status`.

2. Check if the api_key is defined in `datadog.yaml`.

3. By default the Agent do not collect any logs, make sure there is at least one .yaml file in the Agent's `conf.d/` directory that includes a logs section and the appropriate values.

4. You may have some .yaml parsing errors in your configuration files. Yaml is notoriously finicky, so when in doubt, a good [yaml validator][3] is worth referencing.

5. Check if you have `logs_enabled: true` in your `datadog.yaml`

### Check for errors in the logs

There might be an error in the logs that would explain the issue. So just run the following command and check for errors:

```
sudo cat /var/log/datadog/agent.log | grep logs
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /help
[3]: https://codebeautify.org/yaml-validator
