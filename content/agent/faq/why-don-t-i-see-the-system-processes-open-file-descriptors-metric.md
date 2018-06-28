---
title: Why don't I see the 'system.processes.open_file_descriptors' metric?
kind: faq
---

Users that enable the [process check][1] in a Datadog Agent running on Linux OSs notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default. This occurs when the process being monitored by the process check runs under a different user than the Agent - the `dd-agent` user doesn't have full access to all files in `/proc`, which is where the Agent looks to collect data for this metric.

Users can enable the `try_sudo` option in the process check configuration and add the appropriate sudoers rules:
```
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```
This allows the process check to try using `sudo` to collect `system.processes.open_file_descriptors` metric.




An alternative is by running the Agent as `root`.

**NOTE**: We do not recommend running the Agent as `root`; this isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way. Instead, we don't recommend running the daemon as 'root' as this is best practice for most processes on Linux. If you have any personal cause for concern the Agent is open source and may be audited by you or your team if you’d like to review or build it [from source yourselves][2].

That said, if you're okay elevating the Datadog Agent privileges you could do the following:

#### Agent v6 

* [Stop the agent][3]
* Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user​` attribute under `[Service]`​ 
* [Start the agent][3]

#### Agent v5

* [Stop the agent][3]
* Open `/etc/dd-agent/supervisor.conf` and replace `dd-agent` with `root` on both of these lines (Do this again if you upgrade or reinstall the agent):
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
* [Start the Agent][3]

See the following Github issues for more info on this matter as well as other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /integrations/process
[2]: https://github.com/DataDog/dd-agent
[3]: /agent/faq/agent-commands
