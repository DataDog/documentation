---
title: Permission Issues
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

The Agent needs a specific set of permission in order to collect your data on your host, find below the most common permission issues and how to solve them.

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
## Granting the Agent permission to read application log files (without changing file ownership)

Many application logs belong to other system users (for example nginx, postgres, or a custom application user). Changing file ownership can break the application, so Datadog recommends using POSIX ACLs instead. ACLs let you grant the Datadog Agent read access without modifying the original file owner.

The Agent requires:
	•	Read (r) permission on log files
	•	Execute (x) permission on directories, so it can traverse them to reach the files

Example: Allow the Agent to read logs from `/var/log/myapp/`

Grant the Datadog Agent recursive read and execute permissions:

```
sudo setfacl -R -m u:dd-agent:rx /var/log/myapp/
```
Ensure that new files created in this directory inherit the same ACL:
```
sudo setfacl -R -d -m u:dd-agent:rx /var/log/myapp/
```
You can verify ACLs by running:
```
getfacl /var/log/myapp/
```
You should see entries that grant dd-agent read and execute permissions.
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
sudo chown -R dd-agent:dd-agent /opt/datadog-agent/run
```

After making this change, the [Agent Start command][5] should successfully be able to start the Agent. If you continue to see this issue despite having taken these steps, contact [Datadog support][6] for additional direction.

## Process metrics permission issue

If you enabled the [process check][7] in the Agent running on a Linux OS you may notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default.
This occurs when processes being monitored by the process check runs under a different user than the Agent user: `dd-agent`. In fact, `dd-agent` user doesn't have full access to all files in `/proc`, which is where the Agent looks to collect data for this metric.

Enable the `try_sudo` option (available since Agent 6.3) in the process check configuration and add the appropriate `sudoers` rules:

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

This allows the process check to use `sudo` to execute the `ls` command but only to the list of contents of the path `/proc/*/fd/`.

If you see this line in the Datadog `error.log` file: `sudo: sorry, you must have a tty to run sudo`, you should use `visudo` to comment out the line `Default requiretty` in your sudoers file.

### Run Agent as root

If you are unable to use `try_sudo`, you can run the Agent as `root` as a workaround.

<div class="alert alert-info">Running a process daemon as <code>root</code> is not best practice on Linux. The Agent is open source and may be audited via the <a href="https://github.com/DataDog/datadog-agent">GitHub repository.</a></div>

To run the Agent as `root`:
1. [Stop the Agent][9]
2. Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user` attribute under `[Service]`
3. [Start the Agent][10]

See the following GitHub issues for more information and other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## Permissions issues when running the Agent as a system daemon on MacOS

If you installed the Agent as a system-wide launch daemon using the `DD_SYSTEMDAEMON_INSTALL` and `DD_SYSTEMDAEMON_USER_GROUP` options, verify that the user and group you used for `DD_SYSTEMDAEMON_USER_GROUP` are valid and have the correct permissions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/
[2]: /agent/configuration/agent-log-files/
[3]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /agent/faq/network/
[5]: /agent/configuration/agent-commands/#start-the-agent
[6]: /help/
[7]: /integrations/process/
[9]: /agent/configuration/agent-commands/#stop-the-agent
[10]: /agent/configuration/agent-commands/#start-the-agent
