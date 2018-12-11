---
title: Why don't I see the 'system.processes.open_file_descriptors' metric?
kind: faq
---

Users that enable the [process check][1] in a Datadog Agent running on a Linux OS notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default. This occurs when the process being monitored by the process check runs under a different user than the Agent (`dd-agent`). The user doesn't have full access to all files in `/proc`, which is where the Agent looks to collect data for this metric.

{{< tabs >}}
{{% tab "Agent v6.3+" %}}

Users can enable the `try_sudo` option in the process check configuration and add the appropriate sudoers rules:

```
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

This allows the process check to use `sudo` to execute the `ls` command but only to the list of contents of the path `/proc/*/fd/`.

If users see this line in the Datadog error.log: `sudo: sorry, you must have a tty to run sudo`, users should `visudo` and comment out the line `Default requiretty`.

{{% /tab %}}
{{% tab "Agent v6" %}}

If you are running Agent v6 less than 6.3, try updating the Agent and using the `try_sudo` option. If you are unable to update, a workaround for this issue is running the Agent as `root`.

**NOTE**: It is not recommended to run the Agent as `root`. This isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way, but it isn't recommended to run the daemon as `root` as this is best practice for most processes on Linux. If you have any personal cause for concern, the Agent is open source and may be audited by you or your team via the [Github repository][1].

1. [Stop the Agent][2]

2. Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user​` attribute under `[Service]`

3. [Start the Agent][3]


[1]: https://github.com/DataDog/datadog-agent
[2]: /agent/faq/agent-commands/?tab=agentv6#stop-the-agent
[3]: /agent/faq/agent-commands/?tab=agentv6#start-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

If you are running Agent v5, try updating to the latest version of Agent 6 and using the `try_sudo` option. If you are unable to update, a workaround for this issue is running the Agent as `root`.

**NOTE**: It is not recommended to run the Agent as `root`. This isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way, but it isn't recommended to run the daemon as `root` as this is best practice for most processes on Linux. If you have any personal cause for concern, the Agent is open source and may be audited by you or your team via the [Github repository][1].

1. [Stop the Agent][2]

2. Open `/etc/dd-agent/supervisor.conf` and replace `dd-agent` with `root` on [line 20][3] and [line 30][4]. Do this again if you upgrade or reinstall the Agent.

3. [Start the Agent][5]


[1]: https://github.com/DataDog/dd-agent
[2]: /agent/faq/agent-commands/?tab=agentv5#stop-the-agent
[3]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[4]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
[5]: /agent/faq/agent-commands/?tab=agentv5#start-the-agent
{{% /tab %}}
{{< /tabs >}}

See the following Github issues for more information and other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /integrations/process
