---
title: Agent Troubleshooting
kind: documentation
aliases:
    - /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
    - /agent/faq/how-to-get-more-logging-from-the-agent
    - /agent/faq/agent-5-container-more-log
further_reading:
- link: "/agent/faq/agent-commands/?tab=agentv6"
  tag: "FAQ"
  text: "List of all Agent commands"
- link: "/agent/faq/agent-configuration-files/?tab=agentv6"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "/agent/faq/common-windows-agent-installation-error-1721"
  tag: "FAQ"
  text: "Common Windows Agent Installation Error 1721"
- link: "/agent/faq/how-to-monitor-snmp-devices"
  tag: "FAQ"
  text: "How to monitor SNMP devices?"
- link: "/agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host"
  tag: "FAQ"
  text: "I stopped my Agent but I'm still seeing the host in my Datadog account."
- link: "/agent/faq/network-time-protocol-ntp-offset-issues"
  tag: "FAQ"
  text: "Network Time Protocol (NTP) Offset Issues"
- link: "/agent/faq/how-to-solve-permission-denied-errors"
  tag: "FAQ"
  text: "How to solve Permission denied errors?"
- link: "/agent/faq/error-restarting-agent-already-listening-on-a-configured-port"
  tag: "FAQ"
  text: "Error Restarting Agent: Already Listening on a Configured Port"
- link: "/agent/faq/forwarder-logs-contain-599-response-code"
  tag: "FAQ"
  text: "Forwarder logs contain 599 response code"
- link: "/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13"
  tag: "FAQ"
  text: "Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)"
- link: "/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric"
  tag: "FAQ"
  text: "Why don't I see the 'system.processes.open_file_descriptors' metric?"
- link: "/agent/faq/how-is-the-system-mem-used-metric-calculated"
  tag: "FAQ"
  text: "How is the 'system.mem.used' metric calculated?"
- link: "/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity"
  tag: "FAQ"
  text: "How do I install the Agent on a server with limited internet connectivity?"
---

If you have not yet installed the Datadog Agent, go [to the dedicated Agent integration page][1] for installation instructions. If you just installed the Agent, it may take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer][2].

If you think you might be experiencing issues, the first thing to do is [run the info command][3] and check the [Agent logs][4].

If you're still unsure about the issue, you may reach out to [Datadog support team][5] along with [a flare](#send-a-flare) of your Agent.

## Get more logging from the Agent

To enable the full debug mode:

1. Modify your local `datadog.yaml` file (see [this page][6] to locate this configuration file on your instance)

2. Replace `# log_level: INFO` with `log_level: DEBUG` (remove `#` to uncomment the line).

3. Restart the Datadog Agent. See the [Agent Commands][7] page for OS-specific details.

4. Wait a few minutes to generate some logs. [See the Agent][4] docuementation for the location of the logs.

### Obtaining debug logs from the container Agent

{{< tabs >}}
{{% tab "Agent v6" %}}

**Set the `DD_LOG_LEVEL=debug` environment variable when starting your Agent.**

If your container is already running:

1. To avoid that your process is restarted by S6, run:  
    
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
{{% tab "Docker Agent v5" %}}

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

## Send a flare

If you are running the 5.3 version (or higher) of the Agent, you're able to send all necessary troubleshooting information to the Datadog Support Team, with one flare command!

`flare` gathers all of the Agent's configuration files and logs into an archive file. It removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings.  
**Confirm the upload of the archive to immediately send it to Datadog support**.  
Datadog Agent is completely open source, which allows you to [verify the code's behavior][8]. If needed, the flare can be reviewed prior to sending since the flare prompts a confirmation before uploading it.  

In the commands below, replace `<CASE_ID>` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform     | Command                                                 |
| ------------ | ------------------------------------------------------- |
| Linux        | `sudo -u dd-agent -- datadog-agent flare <CASE_ID>`     |
| Docker       | `docker exec -it datadog-agent agent flare <CASE_ID>`   |
| macOS        | `datadog-agent flare <CASE_ID>` or via the [web GUI][1] |
| CentOS       | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian       | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes   | `kubectl exec <pod-name> -it agent flare <CASE_ID>`     |
| Fedora       | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat       | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse         | `sudo datadog-agent flare <CASE_ID>`                    |
| Source       | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows      | Consult the dedicated [Windows documentation][2]       |
| Heroku       | Consult the dedicated [Heroku documentation][3]        |


[1]: /agent/#using-the-gui
[2]: /agent/basic_agent_usage/windows/#agent-v6
[3]: /agent/basic_agent_usage/heroku/#send-a-flare
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform   | Command                                                                 |
|------------|-------------------------------------------------------------------------|
| Linux      | `sudo /etc/init.d/datadog-agent flare <CASE_ID>`                        |
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Suse       | `sudo service datadog-agent flare <CASE_ID>`                            |
| Source     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | Consult the dedicated [Windows documentation][1]                        |


**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][2].


[1]: /agent/basic_agent_usage/windows/#agent-v5
[2]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
{{% /tab %}}
{{% tab "Cluster Agent" %}}

| Platform   | Command                                                             |
|------------|---------------------------------------------------------------------|
| Kubernetes | `kubectl exec <pod-name> -it datadog-cluster-agent flare <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## Status of an Agent check

Agent checks must be called by the Agent. To test an Agent check, run:

{{< tabs >}}
{{% tab "Agent v6" %}}

```
sudo -u dd-agent datadog-agent check <CHECK_NAME>
```

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```
sudo -u dd-agent datadog-agent check <CHECK_NAME> --check-rate
```
 
{{% /tab %}}
{{% tab "Agent v5" %}}

```
sudo -u dd-agent dd-agent check <CHECK_NAME>
```

If you want to include rate metrics, add `--check-rate` to your command, for instance for Agent v6.x run:

```
sudo -u dd-agent dd-agent check <CHECK_NAME> --check-rate
```

{{% /tab %}}
{{< /tabs >}}

If your issue continues, [reach out to the Datadog Support team][5] with a [flare](#flare).

### Windows

{{< tabs >}}
{{% tab "Agent v6" %}}

Run the following script, with the proper `<CHECK_NAME>`:

```
C:\Program Files\Datadog\Datadog agent\embedded\agent.exe check <CHECK_NAME>
```

{{% /tab %}}
{{% tab "Agent v<=5.11" %}}

The Agent install includes a file called `shell.exe` in your `Program Files` directory for the Datadog Agent. This file can be used to run Python within the Agent environment. Once your check (called `<CHECK_NAME>`) is written and you have the `.py` and `.yaml` files in their correct places, run the following in shell.exe:

```
from checks import run_check
run_check('<CHECK_NAME>')
```

This outputs any metrics or events that the check returns.

{{% /tab %}}
{{% tab "Agent v>=5.12" %}}

Run the following script, with the proper `<CHECK_NAME>`:

`<INSTALL_DIR>/embedded/python.exe <INSTALL_DIR>agent/agent.py check <CHECK_NAME>`

For example, to run the disk check:

```
C:\Program' 'Files\Datadog\Datadog' 'Agent\embedded\python.exe C:\Program' 'Files\Datadog\Datadog' 'Agent\agent\agent.py check disk
```

{{% /tab %}}
{{< /tabs >}}

## Systemd

For [systems using systemd][9], use `journalctl` to assist with debugging.

{{< tabs >}}
{{% tab "Agent v6" %}}
The following command shows the status of the Datadog Agent. 

```
sudo systemctl status datadog-agent
```

If the Agent failed to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```
sudo journalctl -u datadog-agent.service
```

{{% /tab %}}
{{% tab "Agent v5" %}}
The following command shows the status of the Datadog Agent. 

```
sudo systemctl status dd-agent
```

If the Agent failed to start, and no further information is provided, use the following command to display all logs for the Datadog Agent service. If needed, use `-r` to print logs in reverse order.

```
sudo journalctl -u dd-agent.service
```

{{% /tab %}}
{{< /tabs >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /agent/faq/agent-commands/#agent-status-and-information
[4]: /agent/basic_agent_usage/#log-location
[5]: /help
[6]: /agent/faq/agent-configuration-files/?tab=agentv6
[7]: /agent/faq/agent-commands
[8]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py
[9]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
