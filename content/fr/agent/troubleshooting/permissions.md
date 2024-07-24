---
title: Problèmes d'autorisation
aliases:
  - /fr/agent/faq/how-to-solve-permission-denied-errors
  - /fr/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
  - /fr/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
  - link: /agent/troubleshooting/debug_mode/
    tag: Dépannage de l'Agent
    text: Mode debugging de l'Agent
  - link: /agent/troubleshooting/send_a_flare/
    tag: Dépannage de l'Agent
    text: Envoyer un flare de l'Agent
---
L'Agent a besoin d'un ensemble d'autorisations spécifique pour recueillir vos données sur votre host. Vous trouverez ci-dessous les problèmes courants liés aux autorisations ainsi que des solutions :

* [Problèmes d'autorisation liés à la journalisation de l'Agent](#problemes-d-autorisation-lies-a-la-journalisation-de-l-Agent)
* [Problèmes d'autorisation liés aux sockets de l'Agent](#problemes-d-autorisation-lies-aux-sockets-de-l-Agent)
* [Problème d'autorisation lié aux métriques de processus](#probleme-d-autorisation-lie-aux-metriques-de-processus)
* [Pour aller plus loin](#pour-aller-plus-loin)

## Problèmes d'autorisation liés à la journalisation de l'Agent

Lorsque vous exécutez l'Agent Datadog sur un host donné, vous pouvez rencontrer un certain nombre de problèmes entraînant une journalisation incorrecte de l'Agent. Par exemple :

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Assurez-vous que les fichiers de log de l'Agent, ainsi que le répertoire qui contient ces fichiers, appartiennent à l'utilisateur de l'Agent Datadog : `dd-agent`. Si ce n'est pas le cas, l'Agent ne peut pas rédiger des entrées de log dans ces fichiers. La commande ci-dessous permet d'afficher les informations sur la propriété des fichiers sur les systèmes Unix :

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

{{< tabs >}}
{{% tab "Agent v6.3 et ultérieur" %}}

Activez l'option `try_sudo` dans la configuration du check de processus et ajoutez les règles `sudoers` appropriées :

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

Cela permet au check de processus d'utiliser `sudo` pour exécuter la commande `ls`, mais uniquement sur la liste de contenu du chemin `/proc/*/fd/`.

Si la ligne `sudo: sorry, you must have a tty to run sudo` s'affiche dans le fichier `error.log` Datadog, vous devez utiliser `visudo` et mettre en commentaire la ligne `Default requiretty`.

{{% /tab %}}
{{% tab "Agents v6 et v7" %}}

Si vous exécutez un Agent v6 antérieur à 6.3, essayez de mettre à jour l'Agent et d'utiliser l'option `try_sudo`. Si vous ne parvenez pas à effectuer la mise à jour, vous pouvez toujours exécuter l'Agent en tant que `root`.

**REMARQUE** : il n'est pas conseillé d'exécuter l'Agent en tant que `root`. Cette recommandation n'est pas spécifique à l'Agent Datadog et n'est pas due à un problème de confiance. Pour suivre les meilleures pratiques en matière de processus sur Linux, il est généralement déconseillé d'exécuter le daemon en tant que `root`. Si vous avez des préoccupations personnelles quant à la sécurité de l'Agent, sachez qu'il est disponible en open source et que votre équipe ou vous-même pouvez l'auditer via le [référentiel GitHub][1].

1. [Arrêtez l'Agent][2].

2. Ouvrez `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` et modifiez l'attribut `user​` sous `[Service]`.

3. [Démarrez l'Agent][3].

[1]: https://github.com/DataDog/datadog-agent
[2]: /fr/agent/guide/agent-commands/#stop-the-agent
[3]: /fr/agent/guide/agent-commands/#start-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

Si vous exécutez l'Agent v5, essayez d'effectuer une mise à jour vers la [dernière version de l'Agent 6][1] et d'utiliser l'option `try_sudo`. Si vous ne parvenez pas à effectuer la mise à jour, vous pouvez toujours exécuter l'Agent en tant que `root`.

**REMARQUE** : il n'est pas conseillé d'exécuter l'Agent en tant que `root`. Cette recommandation n'est pas spécifique à l'Agent Datadog et n'est pas due à un problème de confiance. Pour suivre les meilleures pratiques en matière de processus sur Linux, il est généralement déconseillé d'exécuter le daemon en tant que `root`. Si vous avez des préoccupations personnelles quant à la sécurité de l'Agent, sachez qu'il est disponible en open source et que votre équipe ou vous-même pouvez l'auditer via le [référentiel GitHub][2].

1. [Arrêtez l'Agent][2].

2. Ouvrez `/etc/dd-agent/supervisor.conf` et remplacez `dd-agent` par `root` à la [ligne 20][4] et la [ligne 30][5]. Effectuez à nouveau cette opération en cas de mise à niveau ou de réinstallation de l'Agent.

3. [Démarrez l'Agent][6].

[1]: /fr/agent/guide/upgrade-to-agent-v6/
[2]: https://github.com/DataDog/dd-agent
[3]: /fr/agent/guide/agent-commands/?tab=agentv5#stop-the-agent
[4]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[5]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
[6]: /fr/agent/guide/agent-commands/?tab=agentv5#start-the-agent
{{% /tab %}}
{{< /tabs >}}

Consultez les issues GitHub suivantes pour en savoir plus à ce sujet et pour découvrir d'autres méthodes pouvant être employées pour enregistrer cette métrique sur des machines Linux.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/agent-commands/
[2]: /fr/agent/guide/agent-log-files/
[3]: /fr/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /fr/agent/faq/network/
[5]: /fr/agent/guide/agent-commands/#start-the-agent
[6]: /fr/help/
[7]: /fr/integrations/process/