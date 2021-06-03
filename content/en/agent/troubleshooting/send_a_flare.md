---
title: Agent Flare
kind: documentation
aliases:
  - /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: "/agent/troubleshooting/debug_mode/"
  tag: "Agent Troubleshooting"
  text: "Agent Debug Mode"
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Agent Troubleshooting"
  text: "Get the Status of an Agent Check"
---

If you are running Agent 5.3+, you can send necessary troubleshooting information to the Datadog support team with one flare command.

`flare` gathers all of the Agent's configuration files and logs into an archive file. It removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings. **Confirm the upload of the archive to immediately send it to Datadog support**.

The Datadog Agent is completely open source, which allows you to [verify the code's behavior][1]. If needed, the flare can be reviewed prior to sending since the flare prompts a confirmation before uploading it.

In the commands below, replace `<CASE_ID>` with your Datadog support case ID if you have one, then enter the email address associated with it.

If you don't have a case ID, just enter your email address used to login in Datadog to create a new support case.

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

| Platform   | Command                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it datadog-agent agent flare <CASE_ID>`   |
| macOS      | `datadog-agent flare <CASE_ID>` or via the [web GUI][1] |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec <POD_NAME> -it agent flare <CASE_ID>`     |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Source     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | Consult the dedicated [Windows documentation][2]        |
| Heroku     | Consult the dedicated [Heroku documentation][3]         |

## Dedicated containers

When using Agent v7.19+ and using the Datadog Helm Chart with the [latest version][4] or a DaemonSet where the Datadog Agent and Trace Agent are in separate containers, you will deploy an Agent Pod containing:

* One container with the Agent process (Agent + Log Agent)
* One container with the process-agent process
* One container with the trace-agent process
* One container with the system-probe process

To get a flare from each container, run the following commands:

### Agent

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Trace Agent

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```
  
### System probe

The system-probe container cannot send a flare so get container logs instead:

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

[1]: /agent/basic_agent_usage/#gui
[2]: /agent/basic_agent_usage/windows/#agent-v6
[3]: /agent/faq/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}
{{% tab "Agent v5" %}}

| Platform   | Command                                                                 |
|------------|-------------------------------------------------------------------------|
| Docker     | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    |
| macOS      | `datadog-agent flare <CASE_ID>`                                         |
| CentOS     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Debian     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Kubernetes | `kubectl exec <POD_NAME> -it /etc/init.d/datadog-agent flare <CASE_ID>` |
| Fedora     | `sudo service datadog-agent flare <CASE_ID>`                            |
| Redhat     | `sudo service datadog-agent flare <CASE_ID>`                            |
| SUSE       | `sudo service datadog-agent flare <CASE_ID>`                            |
| Source     | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       |
| Windows    | Consult the dedicated [Windows documentation][1]                        |

**Note**: If you are using a Linux based system and the `service` wrapper command is not available, [consult the list of alternatives][2].

[1]: /agent/basic_agent_usage/windows/#agent-v5
[2]: /agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| Platform   | Command                                                             |
|------------|---------------------------------------------------------------------|
| Kubernetes | `kubectl exec <POD_NAME> -it datadog-cluster-agent flare <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## ECS Fargate

When using ECS Fargate platform v1.4.0, ECS tasks and services can be configured to allow access to running Linux containers by enabling [Amazon ECS Exec][5]. Once configured, run the following command to send a flare:

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**Note:** ECS Exec can only be enabled for new tasks. Existing tasks need to be recreated in order to use ECS Exec.

## Manual submission

The Agent flare protocol collects configurations and logs into an archive file first located in the local `/tmp` directory.
Manually obtain this file and provide it to support if there are any issues with Agent connectivity.

### Kubernetes
To obtain the archive file in Kubernetes, use the kubectl command:
```
kubectl cp datadog-<pod-name>:/tmp/datadog-agent-<date-of-the-flare>.zip flare.zip
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py
