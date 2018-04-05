---
title: Agent Troubleshooting
kind: documentation
aliases:
    - /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
    - /agent/faq/how-to-get-more-logging-from-the-agent
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

If you ended up at this page and have not yet installed the Datadog Agent, go [to the dedicated agent integration page](https://app.datadoghq.com/account/settings#agent) for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

If you think you might be experiencing issues, the first thing to do is [run the info command](/agent/faq/agent-commands/#agent-status-and-information) and check the [Agent logs](/agent/basic_agent_usage/#log-location).

If you're still unsure about the issue, you may reach out to [Datadog support team](/help) along with [a flare](#send-a-flare) of your agent.

## Get more logging from the agent

To enable the full debug mode:

1. Modify your local `datadog.yaml` file (see [this page](/agent/#configuration-files) to locate this configuration file on your instance)

2. Replace `# log_level: INFO` with `log_level: DEBUG` (make sure to get rid of # to uncomment the line)

3. Restart your Datadog Agent (see [that page](/agent/faq/agent-commands) to find the restart command depending on your OS)

4. Wait a few minutes to generate some logs. [Look here](/agent/basic_agent_usage/#log-location) to find the location of the logs.

### Obtaining debug logs from the container agent

This process covers agent v6 only, for agent v5 refer to [the dedicated documentation on how to collect more logs with the Datadog container agent v5](/agent/faq/agent-5-container-more-log)

**Set the `DD_LOG_LEVEL=debug` environment variable when starting your agent.**

If your container is already running:

1. To avoid that your process is restarted by S6, run:  
    
    `rm /var/run/s6/services/agent/finish`

2. Then stop the agent:
    
    ```
    s6-svc -d /var/run/s6/services/agent/
    ```

3. Restart then the agent with debug log level by running:
    
    ```
    DD_LOG_LEVEL=debug agent start
    ```

## Send a flare

If you are running the 5.3 version (or higher) of the agent, you're able to send all necessary troubleshooting information to our Support Team, with one flare command!

`flare` gathers all of the agent's configuration files and logs into an archive file. It removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings.  
**Confirm the upload of the archive to immediately send it to Datadog support**.  
Since the Datadog Agent is completely open source, you can [verify the code's behavior](https://github.com/DataDog/dd-agent/blob/master/utils/flare.py). You can also review the archive prior to sending as the flare prompts a confirmation before uploading it.  

In the commands below, replace `<CASE_ID>` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux| `sudo /etc/init.d/datadog-agent flare <CASE_ID>` | `sudo -u dd-agent -- datadog-agent flare <CASE_ID>`|
|Docker|`docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`|`docker exec -it datadog-agent agent flare <CASE_ID>`|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent flare <CASE_ID>`||
|MacOS x|`datadog-agent flare <CASE_ID>`              | `datadog-agent flare <CASE_ID>` or web [web GUI](/agent/#using-the-gui)
|CentOS| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Debian| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Kubernetes|`kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>`|`kubectl exec <pod-name> -it agent flare <CASE_ID>`|
|Fedora|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Redhat|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Suse|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Source|`sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`|`sudo datadog-agent flare <CASE_ID>`|
|Windows|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#agent-v5)|[Consult our dedicated windows doc](/agent/basic_agent_usage/windows/#agent-v6)|

## FAQ

* [Common Windows Agent Installation Error 1721](/agent/faq/common-windows-agent-installation-error-1721)
* [How to monitor SNMP devices?](/agent/faq/how-to-monitor-snmp-devices)
* [I stopped my agent but I’m still seeing the host in my Datadog account.](/agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host)
* [Network Time Protocol (NTP) Offset Issues](/agent/faq/network-time-protocol-ntp-offset-issues)
* [How to solve Permission denied errors?](/agent/faq/how-to-solve-permission-denied-errors)
* [Error Restarting Agent: Already Listening on a Configured Port](/agent/faq/error-restarting-agent-already-listening-on-a-configured-port)
* [Forwarder logs contain 599 response code](/agent/faq/forwarder-logs-contain-599-response-code)
* [Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)](/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13)
* [Why don't I see the 'system.processes.open_file_descriptors' metric?](/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric)
* [How is the 'system.mem.used' metric calculated?](/agent/faq/how-is-the-system-mem-used-metric-calculated)
* [How do I install the agent on a server with limited internet connectivity?](/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
