
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

If you ended up at this page and have not yet installed the Datadog Agent, go [to the dedicated agent integration page][1] for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer][2].

If you think you might be experiencing issues, the first thing to do is [run the info command][3] and check the [Agent logs][4].

If you're still unsure about the issue, you may reach out to [Datadog support team][5] along with [a flare](#send-a-flare) of your agent.

## Get more logging from the agent

To enable the full debug mode:

1. Modify your local `datadog.yaml` file (see [this page][22] to locate this configuration file on your instance)

2. Replace `# log_level: INFO` with `log_level: DEBUG` (make sure to get rid of # to uncomment the line)

3. Restart your Datadog Agent (see [that page][3] to find the restart command depending on your OS)

4. Wait a few minutes to generate some logs. [Look here][4] to find the location of the logs.

### Obtaining debug logs from the container agent

This process covers agent v6 only, for agent v5 refer to [the dedicated documentation on how to collect more logs with the Datadog container agent v5][6]

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
Since the Datadog Agent is completely open source, you can [verify the code's behavior][7]. You can also review the archive prior to sending as the flare prompts a confirmation before uploading it.  

In the commands below, replace `` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

|Platform|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux| `sudo /etc/init.d/datadog-agent flare ` | `sudo -u dd-agent -- datadog-agent flare `|
|Docker|`docker exec -it dd-agent /etc/init.d/datadog-agent flare `|`docker exec -it datadog-agent agent flare `|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent flare `||
|MacOS x|`datadog-agent flare `              | `datadog-agent flare ` or web [web GUI][8]
|CentOS| `sudo service datadog-agent flare `              | `sudo datadog-agent flare `              |
|Debian| `sudo service datadog-agent flare `              | `sudo datadog-agent flare `              |
|Kubernetes|`kubectl exec  -it /etc/init.d/datadog-agent flare `|`kubectl exec  -it agent flare `|
|Fedora|`sudo service datadog-agent flare `              | `sudo datadog-agent flare `              |
|Redhat|`sudo service datadog-agent flare `              | `sudo datadog-agent flare `              |
|Suse|`sudo service datadog-agent flare `              | `sudo datadog-agent flare `              |
|Source|`sudo ~/.datadog-agent/bin/agent flare `|`sudo datadog-agent flare `|
|Windows|[Consult our dedicated windows doc][9]|[Consult our dedicated windows doc][10]|

## FAQ

* [Common Windows Agent Installation Error 1721][11]
* [How to monitor SNMP devices?][12]
* [I stopped my agent but I’m still seeing the host in my Datadog account.][13]
* [Network Time Protocol (NTP) Offset Issues][14]
* [How to solve Permission denied errors?][15]
* [Error Restarting Agent: Already Listening on a Configured Port][16]
* [Forwarder logs contain 599 response code][17]
* [Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)][18]
* [Why don't I see the 'system.processes.open_file_descriptors' metric?][19]
* [How is the 'system.mem.used' metric calculated?][20]
* [How do I install the agent on a server with limited internet connectivity?][21]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /agent/faq/agent-commands/#agent-status-and-information
[4]: /agent/#log-locations
[5]: /help
[6]: /agent/faq/agent-5-container-more-log
[7]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py
[8]: /agent/#using-the-gui
[9]: /agent/basic_agent_usage/windows/#agent-v5
[10]: /agent/basic_agent_usage/windows/#agent-v6
[11]: /agent/faq/common-windows-agent-installation-error-1721
[12]: /agent/faq/how-to-monitor-snmp-devices
[13]: /agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host
[14]: /agent/faq/network-time-protocol-ntp-offset-issues
[15]: /agent/faq/how-to-solve-permission-denied-errors
[16]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port
[17]: /agent/faq/forwarder-logs-contain-599-response-code
[18]: /agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
[19]: /agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
[20]: /agent/faq/how-is-the-system-mem-used-metric-calculated
[21]: /agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity
[22]: /agent/#configuration-files