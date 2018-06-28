---
title: Why don't I see the 'system.processes.open_file_descriptors' metric?
kind: faq
---

Users that enable the [process check][1] in a Datadog Agent running on Linux OSs notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default. This occurs when the process being monitored by the process check runs under a different user than the Agent - the `dd-agent` user doesn't have full access to all files in `/proc`, which is where the Agent looks to collect data for this metric.

Users can enable the `try_sudo` option in the process check configuration and add the appropriate sudoers rules:
```
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```
This allows the process check to use `sudo` to execute the `ls` command but only to the list of contents of the path `/proc/*/fd/`.


See the following Github issues for more info on this matter as well as other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /integrations/process
