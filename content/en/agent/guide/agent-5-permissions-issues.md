---
title: Agent 5 Permission Issues
---

The Agent needs a specific set of permissions in order to collect your data on your host, find the most common permission issues below and how to solve them.

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

Try updating to the [latest version of the Agent][8] and using the `try_sudo` option. If you are unable to update, a workaround for this issue is running the Agent as `root`.

<div class="alert alert-info">Running a process daemon as <code>root</code> is not best practice on Linux. The Agent is open source and may be audited through the <a href="https://github.com/DataDog/dd-agent">GitHub repository.</a></div>

1. [Stop the Agent][1]

2. Open `/etc/dd-agent/supervisor.conf` and replace `dd-agent` with `root` on [line 20][11] and [line 30][12]. Do this again if you upgrade or reinstall the Agent.

3. [Start the Agent][1]

See the following GitHub issues for more information and other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /agent/guide/agent-5-commands/
[2]: /agent/guide/agent-5-log-files/
[3]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /agent/faq/network/
[5]: /agent/configuration/agent-5-commands/#start-the-agent
[6]: /help/
[7]: /integrations/process/
[8]: /agent/guide/upgrade/
[11]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[12]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
