---
title: Log Collection Troubleshooting Guide
kind: guide
aliases:
  - /logs/faq/log-collection-troubleshooting-guide
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/"
  tag: "FAQ"
  text: "Why do my logs not have the expected timestamp?"
- link: "/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors/"
  tag: "FAQ"
  text: "Why do my logs show up with an Info status even for Warnings or Errors?"
---

There are a number of common issues that can get in the way when [sending new logs to Datadog][1] via the log collector in the `dd-agent`. If you experience issues sending new logs to Datadog, this list helps you troubleshoot. If you continue to have trouble, [contact Datadog support][2] for further assistance.

## Restart the Agent

Changes in the configuration of the `datadog-agent` won't be taken into account until you have [restarted the Agent][3].

## Outbound traffic on port 10516 is blocked

The Datadog Agent sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the `agent.log` file to that effect.

Test manually your connection by running a telnet or openssl command like so (port 10514 would work too, but is less secure):

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

And then by sending a log like the following:

```text
<API_KEY> this is a test message
```

- If opening the port 10514 or 10516 is not an option, it is possible to configure the Datadog Agent to send logs through HTTPS by adding the following in `datadog.yaml`:

```yaml
logs_config:
  use_http: true
```

See the [HTTPS log forwarding section][4] for more information.

## Check the status of the Agent

Often, checking the [Agent status command][5] results will help you troubleshoot what is happening.

## No new logs have been written

The Datadog Agent only collects logs that have been written after it has started trying to collect them (whether it be tailing or listening for them). In order to confirm whether log collection has been successfully set up, make sure that new logs have been written.

## Permission issues tailing log files

The `datadog-agent` does not run as root (and we do not recommend that you make it run as root, as a general best-practice). For this reason, when you configure your `datadog-agent` to tail log files (for custom logs or for integrations) you need to take special care to ensure the `datadog-agent` user has read access to tail the log files you want to collect from.

In that case, you should see an error message when checking the [Agent status][5]:

```text
==========
Logs Agent
==========

  test
  ----
    Type: file
    Path: /var/log/application/error.log
    Status: Error: file /var/log/application/error.log does not exist
```

Run the `namei` command to obtain more information about the file permissions:

```text
> namei -m /var/log/application/error.log
> f: /var/log/application/error.log
 drwxr-xr-x /
 drwxr-xr-x var
 drwxrwxr-x log
 drw-r--r-- application
 -rw-r----- error.log
```

In this example, the `application` directory is not executable, therefore the Agent cannot list its files. Furthermore, the Agent does not have read permissions on the `error.log` file.
Add the missing permissions via the [chmod command][6].

{{< img src="logs/agent-log-permission-ok.png" alt="Permission OK"  style="width:70%;">}}

**Note**: When adding the appropriate read permissions, make sure that these permissions are correctly set in your log rotation configuration. Otherwise, on the next log rotate, the Datadog Agent may lose its read permissions.
Set permissions as `644` in the log rotation configuration to make sure the Agent has read access to the files.

## Permission issue and Journald

When collecting logs from Journald, make sure that the Datadog Agent user is added in the systemd group as shown in the [Journald integration][7].

**Note**: Journald sends an empty payload if the file permissions are incorrect. Accordingly, it is not possible to raise or send an explicit error message in this case.

## Configuration issues

These are a few of the common configuration issues that are worth triple-checking in your `datadog-agent` setup:

1. Check if the `api_key` is defined in `datadog.yaml`.

2. Check if you have `logs_enabled: true` in your `datadog.yaml`

3. By default the Agent does not collect any logs, make sure there is at least one .yaml file in the Agent's `conf.d/` directory that includes a logs section and the appropriate values.

4. You may have some .yaml parsing errors in your configuration files. YAML can be finicky, so when in doubt rely on a [YAML validator][8].

### Check for errors in the Agent logs

There might be an error in the logs that would explain the issue. Run the following command to check for errors:

```shell
sudo cat /var/log/datadog/agent.log | grep ERROR
```

## Docker environment

See the [Docker Log Collection Troubleshooting Guide][9]

## Serverless environment

See the [Lambda Log Collection Troubleshooting Guide][10]

## Unexpectedly dropping logs

Check if logs appear in the [Datadog Live Tail][11]. If they appear in the Live Tail, check the Indexes configuration page for any [exclusion filters][12] that could match your logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /help/
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: /agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: https://en.wikipedia.org/wiki/Chmod
[7]: /integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /logs/indexes/#exclusion-filters
