---
title: Permission Issues
kind: documentation
aliases:
  - /agent/faq/how-to-solve-permission-denied-errors
  - /agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
  - /agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
- link: "/agent/troubleshooting/debug_mode/"
  tag: "Documentation"
  text: "Agent Debug Mode"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
---

The Agent needs a specific set of permission in order to collect your data on your host, find below the most common permission issues and how to solve them:

* [Agent Logging permission issues](#agent-logging-permission-issues)
* [Agent Socket permission issues](#agent-socket-permission-issues)
* [Process Metrics permission issue](#process-metrics-permission-issue)
* [Further Reading](#further-reading)

## Agent logging permission issues

When running the Datadog Agent on a given host, you may encounter some permissions related issues that would prevent the Agent from logging properly, such as:

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Make sure that the Agent's log files as well as the directory that contains those files is owned by the Datadog Agent user: `dd-agent`. If not, the Agent isn't able to write log entries in those files. Find below the command that works on Unix systems to display files ownership information:

```text
ls -l /var/log/datadog/

total 52300
-rw-r--r-- 1 dd-agent dd-agent 5742334 Jul 31 11:49 collector.log
-rw-r--r-- 1 dd-agent dd-agent 10485467 Jul 28 02:45 collector.log.1
-rw-r--r-- 1 dd-agent dd-agent 1202067 Jul 31 11:48 dogstatsd.log
-rw-r--r-- 1 dd-agent dd-agent 10485678 Jul 28 07:04 dogstatsd.log.1
-rw-r--r-- 1 dd-agent dd-agent 4680625 Jul 31 11:48 forwarder.log
-rw-r--r-- 1 dd-agent dd-agent 10485638 Jul 28 07:09 forwarder.log.1
-rw-r--r-- 1 dd-agent dd-agent 1476 Jul 31 11:37 jmxfetch.log
-rw-r--r-- 1 dd-agent dd-agent 31916 Jul 31 11:37 supervisord.log
-rw-r--r-- 1 dd-agent dd-agent 110424 Jul 31 11:48 trace-agent.log
-rw-r--r-- 1 dd-agent dd-agent 10000072 Jul 28 08:29 trace-agent.log.1
```

If those files are **NOT** owned by the `dd-agent` user, change the ownership with the command below, then [restart the Agent][1]:

```text
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

[More information on the Agent logs locations][2].

## Agent socket permission issues

When starting the Agent, the following socket permission issue might appear:

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

At first glance, that might appear to indicate that the Agent is unable to connect to the appropriate sockets because they're already occupied. But if you've already double-checked that there are [no lingering Agent processes remaining][3], and if you can ensure that the [appropriate ports][4] are available to the Agent, sometimes this above error persists.

For Linux hosts, the `/opt/datadog-agent/run` directory must be owned by the `dd-agent` user to start correctly. On rare occasions, the ownership of this directory can get changed to something other than `dd-agent`. This causes the above error when starting the Agent. Double-check the ownership of this directory by running the following command:

```text
ls -al /opt/datadog-agent/run
```

If the owner of the file is **NOT** `dd-agent`, run the following command to fix it:

```text
chown dd-agent -R /opt/datadog-agent/run
```

After making this change, the [Agent Start command][5] should successfully be able to start the Agent. If you continue to see this issue despite having taken these steps, contact [Datadog support][6] for additional direction.

## Process metrics permission issue

If you enabled the [process check][7] in the Agent running on a Linux OS you may notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default.
This occurs when processes being monitored by the process check runs under a different user than the Agent user: `dd-agent`. In fact, `dd-agent` user doesn't have full access to all files in `/proc`, which is where the Agent looks to collect data for this metric.

{{< tabs >}}
{{% tab "Agent v6.3+" %}}

Enable the `try_sudo` option in the process check configuration and add the appropriate `sudoers` rules:

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

This allows the process check to use `sudo` to execute the `ls` command but only to the list of contents of the path `/proc/*/fd/`.

If you see this line in the Datadog `error.log` file: `sudo: sorry, you must have a tty to run sudo`, you should use `visudo` to comment out the line `Default requiretty` in your sudoers file.

{{% /tab %}}
{{% tab "Agent v6 & v7" %}}

If you are running Agent v6 less than v6.3, try updating the Agent and using the `try_sudo` option. If you are unable to update, a workaround for this issue is running the Agent as `root`.

**NOTE**: It is not recommended to run the Agent as `root`. This isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way, but it isn't recommended to run the daemon as `root` as this is best practice for most processes on Linux. If you have any personal cause for concern, the Agent is open source and may be audited by you or your team via the [GitHub repository][1].

1. [Stop the Agent][2]

2. Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user​` attribute under `[Service]`

3. [Start the Agent][3]

[1]: https://github.com/DataDog/datadog-agent
[2]: /agent/configuration/agent-commands/#stop-the-agent
[3]: /agent/configuration/agent-commands/#start-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

If you are running Agent v5, try updating to the [latest version of Agent 6][1] and using the `try_sudo` option. If you are unable to update, a workaround for this issue is running the Agent as `root`.

**NOTE**: It is not recommended to run the Agent as `root`. This isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way, but it isn't recommended to run the daemon as `root` as this is best practice for most processes on Linux. If you have any personal cause for concern, the Agent is open source and may be audited by you or your team via the [GitHub repository][2].

1. [Stop the Agent][3]

2. Open `/etc/dd-agent/supervisor.conf` and replace `dd-agent` with `root` on [line 20][4] and [line 30][5]. Do this again if you upgrade or reinstall the Agent.

3. [Start the Agent][6]

[1]: /agent/guide/upgrade-to-agent-v6/
[2]: https://github.com/DataDog/dd-agent
[3]: /agent/configuration/agent-commands/?tab=agentv5#stop-the-agent
[4]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[5]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
[6]: /agent/configuration/agent-commands/?tab=agentv5#start-the-agent
{{% /tab %}}
{{< /tabs >}}

See the following GitHub issues for more information and other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/
[2]: /agent/configuration/agent-log-files/
[3]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /agent/faq/network/
[5]: /agent/configuration/agent-commands/#start-the-agent
[6]: /help/
[7]: /integrations/process/
