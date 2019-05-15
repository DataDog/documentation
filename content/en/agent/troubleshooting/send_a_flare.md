---
title: Send a Flare
kind: documentation
aliases:
  - /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
---

If you are running Agent 5.3+, you can send necessary troubleshooting information to the Datadog support team with one flare command.

`flare` gathers all of the Agent's configuration files and logs into an archive file. It removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings.
**Confirm the upload of the archive to immediately send it to Datadog support**.
Datadog Agent is completely open source, which allows you to [verify the code's behavior][1]. If needed, the flare can be reviewed prior to sending since the flare prompts a confirmation before uploading it.

In the commands below, replace `<CASE_ID>` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Platform     | Command                                                 |
| ------------ | ------------------------------------------------------- |
| AIX          | `datadog-agent flare <CASE_ID>`                         |
| Docker       | `docker exec -it datadog-agent agent flare <CASE_ID>`   |
| macOS        | `datadog-agent flare <CASE_ID>` or via the [web GUI][1] |
| CentOS       | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian       | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes   | `kubectl exec <pod-name> -it agent flare <CASE_ID>`     |
| Fedora       | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat       | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse         | `sudo datadog-agent flare <CASE_ID>`                    |
| Source       | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows      | Consult the dedicated [Windows documentation][2]        |
| Heroku       | Consult the dedicated [Heroku documentation][3]         |


[1]: /agent/#using-the-gui
[2]: /agent/basic_agent_usage/windows/#agent-v6
[3]: https://docs.datadoghq.com/agent/faq/heroku-troubleshooting/#send-a-flare
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform     | Command                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| Docker       | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`      |
| macOS        | `datadog-agent flare <CASE_ID>`                                           |
| CentOS       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Debian       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Kubernetes   | `kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>`   |
| Fedora       | `sudo service datadog-agent flare <CASE_ID>`                              |
| Redhat       | `sudo service datadog-agent flare <CASE_ID>`                              |
| SUSE         | `sudo service datadog-agent flare <CASE_ID>`                              |
| Source       | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                         |
| Windows      | Consult the dedicated [Windows documentation][1]                          |


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

[1]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py
