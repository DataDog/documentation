---
title: Pourquoi ne vois-je pas la métrique "system.processes.open_file_descriptors"?
kind: faq
---

Users that enable the [process check][1] in a Datadog agent running on Linux OSs notice that the `system.processes.open_file_descriptors` metric is not collected or reported by default. This occurs when the process being monitored by the process check runs under a different user than the agent - the 'dd-agent' user doesn't have full access to all files in '/proc', which is where the agent looks to collect data for this metric. A workaround for this can be achieved by running the agent as 'root'.

**NOTE**: We do not recommend running the agent as 'root'; this isn't specific to the Datadog agent or due to any concern that something untrustworthy is happening in any way. Instead, we don't recommend running the daemon as 'root' as this is best practice for most processes on Linux. If you have any personal cause for concern the agent is open source and may be audited by you or your team if you’d like to review or build it [from source yourselves][2].

Cela dit, si vous êtes d'accord pour élever les privilèges de l'agent Datadog, vous pouvez faire ce qui suit:

#### Agent v6 

* [Arrêter l'Agent:](/agent/faq/agent-commands)
* Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user​` attribute under `[Service]`​ 
* [Démarrer l'Agent](/agent/faq/agent-commands)

#### Agent v5

* [Arrêter l'Agent:](/agent/faq/agent-commands)
* Open `/etc/dd-agent/supervisor.conf` and replace 'dd-agent' with 'root' on both of these lines (Do this again if you upgrade or reinstall the agent):
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
* [Démarrer l'Agent][3]

See the following Github issues for more info on this matter as well as other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /integrations/process
[2]: https://github.com/DataDog/dd-agent
[3]: /agent/faq/agent-commands
