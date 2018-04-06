---
title: Troubleshooting de l'Agent
kind: documentation
aliases:
  - /fr/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
  - /fr/agent/faq/how-to-get-more-logging-from-the-agent
further_reading:
  - link: logs/
    tag: Documentation
    text: Collectez vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Collectez vos processus
  - link: tracing
    tag: Documentation
    text: Collectez vos traces
---
Si vous êtes arrivé sur cette page et que vous n'avez pas encore installé l'agent Datadog, [accédez à la page d'intégration de l'agent](https://app.datadoghq.com/account/settings#agent) pour obtenir des instructions d'installation. Si vous venez d'installer l'agent, cela peut prendre quelques instants avant que vous ne commenciez à voir apparaître des métriques. Le premier endroit où vous devriez vérifier l'envoi de métriques est la page [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

Si vous pensez que vous rencontrez des problèmes, la première chose à faire est [d'exécutez la commande info](/agent/faq/agent-commands/#agent-status-and-information) et vérifiez les [logs de l'agent](/agent/basic_agent_usage/#log-location).

Si vous n'êtes toujours pas sûr du problème, vous pouvez contacter [l'équipe support de Datadog](/help) avec [un flare](#send-a-flare) de votre agent.

## Obtenir plus de logs de l'agent

Pour activer le mode debug complet:

1. Modifiez votre fichier `datadog.yaml` local (consultez [cette page](/agent/#configuration-files) pour localiser ce fichier de configuration sur votre instance)

2. Remplacez `# log_level: INFO` par` log_level: DEBUG` (assurez-vous de vous débarrasser de # pour décommenter la ligne)

3. Redémarrez votre Agent Datadog (consultez [cette page](/agent/faq/agent-commands) pour trouver la commande de redémarrage en fonction de votre système d'exploitation)

4. Attendez quelques minutes pour générer des logs. [Consultez cette page](/agent/basic_agent_usage/#log-location) pour trouver l'emplacement des logs.

### Obtention des logs de debug à partir de l'agent conteneur

Ce processus concerne uniquement l'agent v6, pour l'agent v5, reportez-vous à [la documentation dédiée sur la façon de collecter plus de logs avec l'agent conteneur v5](/agent/faq/agent-5-container-more-log).

**Définissez la variable d'environnement `DD_LOG_LEVEL=debug` lors du démarrage de votre agent.**

Si votre conteneur est déjà en cours d'exécution:

1. Pour éviter que votre processus soit redémarré par S6, exécutez:

    `rm /var/run/s6/services/agent/finish`

2. Puis arrêtez l'agent:

    ```
    s6-svc -d /var/run/s6/services/agent/
    ```

3. Redémarrez ensuite l'agent avec le niveau de log de débug en exécutant:

    ```
    DD_LOG_LEVEL=debug agent start
    ```

## Envoyer un flare

Si vous exécutez la version 5.3 (ou supérieure) de l'agent, vous pouvez envoyer toutes les informations de dépannage nécessaires à notre équipe support, avec une commande flare!

`flare` rassemble tous les fichiers de configuration et les logs de l'agent dans un fichier d'archive. Il supprime les informations sensibles, y compris les mots de passe, les clés API, les informations d'identification proxy et les chaînes de communauté SNMP.
**Confirmez le téléchargement de l'archive pour l'envoyer immédiatement au support de Datadog**.
Puisque l'Agent Datadog est complètement open source, vous pouvez [vérifier le comportement du code](https://github.com/DataDog/dd-agent/blob/master/utils/flare.py). Vous pouvez également consulter l'archive avant de l'envoyer car le flare demande une confirmation avant envoi.

Dans les commandes ci-dessous, remplacez  `<CASE_ID>` par votre ID de ticket de support Datadog, si vous ne spécifiez pas d'ID de ticket, la commande demande l'adresse e-mail utilisée pour se connecter dans votre organisation et crée un nouveau ticket de support.

|Platformes|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux| `sudo /etc/init.d/datadog-agent flare <CASE_ID>` | `sudo -u dd-agent -- datadog-agent flare <CASE_ID>`|
|Docker|`docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`|`docker exec -it datadog-agent agent flare <CASE_ID>`|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent flare <CASE_ID>`||
|MacOS x|`datadog-agent flare <CASE_ID>`              | `datadog-agent flare <CASE_ID>` or web [web GUI](/agent/#using-the-gui)
|CentOS| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Debian| `sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Kubernetes|`kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>`|`kubectl exec <pod-name> -it agent flare <CASE_ID>`|
|Fedora|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Redhat|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Suse|`sudo service datadog-agent flare <CASE_ID>`              | `sudo datadog-agent flare <CASE_ID>`              |
|Source|`sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`|`sudo datadog-agent flare <CASE_ID>`|
|Windows|[Consultez notre document Windows dédié](/agent/basic_agent_usage/windows/#agent-v5)|[Consultez notre document Windows dédié](/agent/basic_agent_usage/windows/#agent-v6)|

## FAQ

* [Erreur d'installation 1721 de l'agent Windows ](/agent/faq/common-windows-agent-installation-error-1721)
* [Comment monitorer les périphériques SNMP?](/agent/faq/how-to-monitor-snmp-devices)
* [J'ai arrêté mon agent mais je vois toujours l'host sur mon compte Datadog.](/agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host)
* [Problèmes de décalage du protocole NTP (Network Time Protocol)](/agent/faq/network-time-protocol-ntp-offset-issues)
* [Comment résoudre les erreurs "Permission denied"?](/agent/faq/how-to-solve-permission-denied-errors)
* [Erreur lors du redémarrage de l'agent: écoute déjà sur un port configuré](/agent/faq/error-restarting-agent-already-listening-on-a-configured-port)
* [Les logs du Forwarder contiennent le code d'état 599](/agent/faq/forwarder-logs-contain-599-response-code)
* [Démarrage de Datadog Agent (en utilisant supervisord): Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)](/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13)
* [Pourquoi ne vois-je pas la métrique "system.processes.open_file_descriptors"?](/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric)
* [Comment la métrique 'system.mem.used' est-elle calculée?](/agent/faq/how-is-the-system-mem-used-metric-calculated)
* [Comment installer l'agent sur un serveur avec une connexion Internet limitée?](/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity)

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}