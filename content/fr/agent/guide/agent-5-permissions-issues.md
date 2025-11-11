---
private: true
title: Problèmes d'autorisations de l'Agent 5
---

L'Agent nécessite un ensemble spécifique d'autorisations pour collecter vos données sur votre host. Vous trouverez ci-dessous les problèmes d'autorisations les plus courants et comment les résoudre.

## Problèmes d'autorisation liés à la journalisation de l'Agent

Lorsque vous exécutez l'Agent Datadog sur un host donné, vous pouvez rencontrer un certain nombre de problèmes entraînant une journalisation incorrecte de l'Agent. Par exemple :

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Assurez-vous que les fichiers de log de l'Agent, ainsi que le répertoire qui contient ces fichiers, appartiennent à l'utilisateur de l'Agent Datadog : `dd-agent`. Si ce n'est pas le cas, l'Agent ne pourra pas écrire les entrées de log dans ces fichiers. La commande ci-dessous permet d'afficher les informations sur la propriété des fichiers sur les systèmes Unix :

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

Si ces fichiers n'appartiennent **PAS** à l'utilisateur `dd-agent`, modifiez la propriété avec la commande ci-dessous, puis [redémarrez l'Agent][1] :

```text
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

[En savoir plus sur les emplacements des logs de l'Agent][2].

## Problèmes d'autorisation liés aux sockets de l'Agent

Lorsque vous démarrez l'Agent, le problème d'autorisation de sockets suivant peut se présenter :

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

À première vue, cela peut sembler indiquer que l'Agent n'est pas en mesure de se connecter aux sockets appropriés, car ils sont déjà occupés. Cependant, même si vous avez déjà vérifié qu'il n'existe [aucun processus persistant restant de l'Agent][3] et que les [ports appropriés][4] sont disponibles pour l'Agent, l'erreur ci-dessus peut continuer à s'afficher.

Pour les hosts Linux, le répertoire `/opt/datadog-agent/run` doit appartenir à l'utilisateur `dd-agent` pour démarrer correctement l'Agent. Dans de rares cas, la propriété de ce répertoire peut être modifiée et attribuée un utilisateur différent de `dd-agent`. Cela provoque l'erreur ci-dessus lors du démarrage de l'Agent. Vérifiez la propriété de ce répertoire en lançant la commande suivante :

```text
ls -al /opt/datadog-agent/run
```

Si le propriétaire du fichier n'est **PAS** `dd-agent`, lancez la commande suivante pour y remédier :

```text
chown dd-agent -R /opt/datadog-agent/run
```

Une fois cette modification effectuée, la [commande de démarrage de l'Agent][5] fonctionne correctement. Si vous continuez à voir ce problème après avoir suivi ces étapes, contactez l'[assistance Datadog][6] pour obtenir des instructions supplémentaires.

## Problème d'autorisation lié aux métriques de processus

Si vous avez activé le [check de processus][7] dans l'Agent qui s'exécute sur un système d'exploitation Linux, il se peut que la métrique `system.processes.open_file_descriptors` ne soit pas recueillie ni transmise par défaut.
Cela se produit lorsque des processus surveillés par le check de processus s'exécutent avec un utilisateur différent de l'utilisateur de l'Agent `dd-agent`. En réalité, l'utilisateur `dd-agent` ne dispose pas d'un accès complet à tous les fichiers dans `/proc`, l'emplacement dans lequel l'Agent effectue ses recherches pour recueillir les données de cette métrique.

Essayez de mettre à jour vers la [dernière version de l'Agent][8] et d'utiliser l'option `try_sudo`. Si vous ne pouvez pas effectuer la mise à jour, une solution de contournement pour ce problème consiste à exécuter l'Agent en tant que `root`.

<div class="alert alert-info">L'exécution d'un daemon de processus en tant que <code>root</code> n'est pas une bonne pratique sur Linux. L'Agent est open source et peut être audité via le <a href="https://github.com/DataDog/dd-agent">référentiel GitHub.</a></div>

1. [Arrêtez l'Agent][1]

2. Ouvrez `/etc/dd-agent/supervisor.conf` et remplacez `dd-agent` par `root` à la [ligne 20][11] et à la [ligne 30][12]. Refaites cela si vous mettez à niveau ou réinstallez l'Agent.

3. [Démarrez l'Agent][1]

Consultez les issues GitHub suivantes pour en savoir plus à ce sujet et pour découvrir d'autres méthodes pouvant être employées pour enregistrer cette métrique sur des machines Linux.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /fr/agent/guide/agent-5-commands/
[2]: /fr/agent/guide/agent-5-log-files/
[3]: /fr/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /fr/agent/faq/network/
[5]: /fr/agent/configuration/agent-5-commands/#start-the-agent
[6]: /fr/help/
[7]: /fr/integrations/process/
[8]: /fr/agent/guide/upgrade/
[11]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[12]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30