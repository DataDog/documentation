---
title: Log Collection Troubleshooting Guide
kind: faq
customnav: lognav
beta: true
---

There are a number of common issues that can get in the way when [sending new logs to Datadog](/logs/) via the log collector in the dd-agent. If you experience issues sending new logs to Datadog, this list will help you troubleshoot. If you continue to have trouble, please email [us](/help) for further assistance. 

### The agent needs to be restarted

After you've made any configuration changes to the dd-agent, the changes will only take effect after you restart the dd-agent.

### No new logs have been written

The dd-agent only collects logs that have been written after it has started trying to collect them (whether it be tailing or listening for them. In order to confirm whether log collection has been successfully set up, please make sure that new logs have been written.

### Permission Issues While Tailing Log Files

The dd-agent does not run as root (and we do not recommend that you make it run as root, as a general best-practice). For this reason, when you configure your dd-agent to tail log files (for custom logs or for integrations) you will need to take special care to ensure the dd-agent user has read access to tail the log files you want to collect from.

If the dd-agent user does not have read access to the files you configure it to tail, then a permissions error will be captured in the /var/log/datadog/logs-agent.log

N.B. when you add the appropriate read permissions, you will want also to make sure that these permissions are correctly set on your log rotation configuration. Otherwise, when the log rotates next, the dd-agent may lose its read permissions.  

### Outbound traffic on port 10516 is blocked

The log-agent within the dd-agent sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs will fail to be sent and an error will be recorded in the logs-agent.log to that effect. 

You can test your connection by running starting a telnet command like so (port 10514 would work too, but is less secure):
```
openssl s_client -connect intake.logs.datadoghq.com:10516
```
and then by sending a log like the following:
```
<API_KEY> this is a test message
```

### Configuration issues

These are a few of the common configuration issues that are work triple-checking in your dd-agent setup:

1. Your api_key option is not in your `conf.d/logs-agent.yaml` or does not match what is in your `datadog.conf`

2. You do not have any .yaml file in your conf.d/ directory that includes a logs section and the appropriate values, or you have added these values only to the `logs-agent.yaml` (N.B. you will want to keep the logs-agent.yaml configurations separate from the configuration files that determine where the dd-agent should look/listen for logs).

3. You may have some .yaml parsing errors in your configuration files. Yaml is notoriously finicky, so when in doubt, a good [yaml validator](https://codebeautify.org/yaml-validator) is worth referencing. 