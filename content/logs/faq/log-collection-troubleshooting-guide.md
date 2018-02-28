---
title: Log Collection Troubleshooting Guide
kind: faq
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: Learn how to collect your logs
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers"
  tag: "FAQ"
  text: How to Send Logs to Datadog via External Log Shippers?
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
---

There are a number of common issues that can get in the way when [sending new logs to Datadog](/logs/) via the log collector in the dd-agent. If you experience issues sending new logs to Datadog, this list helps you troubleshoot. If you continue to have trouble, email [us](/help) for further assistance. 

## The agent needs to be restarted

After you've made any configuration changes to the dd-agent, the changes only take effect after you restart the dd-agent.

## No new logs have been written

The dd-agent only collects logs that have been written after it has started trying to collect them (whether it be tailing or listening for them. In order to confirm whether log collection has been successfully set up, make sure that new logs have been written.

## Permission Issues While Tailing Log Files

The dd-agent does not run as root (and we do not recommend that you make it run as root, as a general best-practice). For this reason, when you configure your dd-agent to tail log files (for custom logs or for integrations) you need to take special care to ensure the dd-agent user has read access to tail the log files you want to collect from.

If the dd-agent user does not have read access to the files you configure it to tail, then a permissions error is captured in the `/var/log/datadog/logs-agent.log`

N.B. when you add the appropriate read permissions, you want also to make sure that these permissions are correctly set on your log rotation configuration. Otherwise, when the log rotates next, the dd-agent may lose its read permissions.  

## Outbound traffic on port 10516 is blocked

The log-agent within the dd-agent sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the logs-agent.log to that effect. 

You can test your connection by running starting a telnet command like so (port 10514 would work too, but is less secure):
```
openssl s_client -connect intake.logs.datadoghq.com:10516
```
and then by sending a log like the following:
```
<API_KEY> this is a test message
```

## Configuration issues

These are a few of the common configuration issues that are work triple-checking in your dd-agent setup:

1. Your api_key option is not in your `conf.d/logs-agent.yaml` or does not match what is in your `datadog.yaml`

2. You do not have any .yaml file in your conf.d/ directory that includes a logs section and the appropriate values, or you have added these values only to the `logs-agent.yaml` (N.B. you want to keep the logs-agent.yaml configurations separate from the configuration files that determine where the dd-agent should look/listen for logs).

3. You may have some .yaml parsing errors in your configuration files. Yaml is notoriously finicky, so when in doubt, a good [yaml validator](https://codebeautify.org/yaml-validator) is worth referencing. 

### Check for errors in the logs

There might be an error in the logs that would explain the issue. So just run the following command and check for errors:

```
sudo cat /var/log/datadog/agent.log | grep log
```

#### Permission Issues While Tailing Log Files

The dd-agent does not run as root (and we do not recommend that you make it run as root, as a general best-practice). For this reason, when you configure your dd-agent to tail log files (for custom logs or for integrations) take special care to ensure the dd-agent user has read access to tail the log files you want to collect from.  

If the dd-agent user does not have read access to the files you configure it to tail, then a permissions error is captured in the `/var/log/datadog/agent.log`.  

**Note**: when you add the appropriate read permissions, make sure that these permissions are correctly set on your log rotation configuration. Otherwise, when the log rotates next, the dd-agent may lose its read permissions. 


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}