---
title: Pourquoi ne vois-je pas la métrique "system.processes.open_file_descriptors"?
kind: faq
---

Les utilisateurs qui activent le [check de processus][1] dans un Agent Datadog s'exécutant sur un système d'exploitation Linux peuvent remarquer que la métrique `system.processes.open_file_descriptors` n'est pas collectée ni envoyée par défaut. Cela se produit lorsque le processus surveillé par le check de processus s'exécute sous un utilisateur différent de l'Agent - l'utilisateur 'dd-agent' n'a donc pas un accès complet à tous les fichiers dans '/ proc', où l'Agent cherche à collecter données pour cette métrique. Une solution à ce problème serait d'exécuter l'Agent en tant que «root».

**NOTE**: We do not recommend running the Agent as `root`; this isn't specific to the Datadog Agent or due to any concern that something untrustworthy is happening in any way. Instead, we don't recommend running the daemon as 'root' as this is best practice for most processes on Linux. If you have any personal cause for concern the Agent is open source and may be audited by you or your team if you’d like to review or build it [from source yourselves][2].

Cela dit, si vous êtes d'accord pour élever les privilèges de l'Agent Datadog, vous pouvez faire ce qui suit:

#### Agent v6 

* [Arrêter l'Agent][3]
* Open `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` and change the `user​` attribute under `[Service]`​ 
* [Démarrer l'Agent][3]

#### Agent v5

* [Arrêter l'Agent][3]
* Open `/etc/dd-agent/supervisor.conf` and replace `dd-agent` with `root` on both of these lines (Do this again if you upgrade or reinstall the agent):
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
    * https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
* [Démarrer l'Agent][3]

See the following Github issues for more info on this matter as well as other potential methods of capturing this metric on Linux machines.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /integrations/process
[2]: https://github.com/DataDog/dd-agent
[3]: /agent/faq/agent-commands
