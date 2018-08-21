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
Si vous êtes arrivé sur cette page et que vous n'avez pas encore installé l'agent Datadog, [accédez à la page d'intégration de l'Agent][1] pour obtenir des instructions d'installation. Si vous venez d'installer l'agent, cela peut prendre quelques instants avant que vous ne commenciez à voir apparaître des métriques. Le premier endroit où vous devriez vérifier l'envoi de métriques est la page [Metrics Explorer][2].

Si vous pensez que vous rencontrez des problèmes, la première chose à faire est [d'exécutez la commande info][3] et vérifiez les [logs de l'agent][4].

Si vous n'êtes toujours pas sûr du problème, vous pouvez contacter [l'équipe support de Datadog][5] avec [un flare](#send-a-flare) de votre Agent.

## Obtenir plus de logs de l'Agent

Pour activer le mode debug complet:

1. Modifiez votre fichier `datadog.yaml` local (consultez [cette page](/agent/basic_agent_usage/#configuration-files) pour localiser ce fichier de configuration sur votre instance)

2. Remplacez `# log_level: INFO` par` log_level: DEBUG` (assurez-vous de vous débarrasser de # pour décommenter la ligne)

3. Redémarrez votre Agent Datadog (consultez [cette page](/agent/faq/agent-commands) pour trouver la commande de redémarrage en fonction de votre système d'exploitation)

4. Attendez quelques minutes pour générer des logs. [Consultez cette page][4] pour trouver l'emplacement des logs.

### Obtention des logs de debug à partir de l'Agent conteneur

Ce processus concerne uniquement l'Agent v6, pour l'Agent v5, reportez-vous à [la documentation dédiée sur la façon de collecter plus de logs avec l'agent conteneur v5][6].

**Définissez la variable d'environnement `DD_LOG_LEVEL=debug` lors du démarrage de votre Agent.**

Si votre conteneur est déjà en cours d'exécution:

1. Pour éviter que votre processus soit redémarré par S6, exécutez:

    `rm /var/run/s6/services/agent/finish`

2. Puis arrêtez l'Agent:

    ```
    s6-svc -d /var/run/s6/services/agent/
    ```

3. Redémarrez ensuite l'Agent avec le niveau de log de débug en exécutant:

    ```
    DD_LOG_LEVEL=debug agent start
    ```

## Envoyer un flare

Si vous exécutez la version 5.3 (ou supérieure) de l'Agent, vous pouvez envoyer toutes les informations de dépannage nécessaires à notre équipe support, avec une commande flare!

`flare` rassemble tous les fichiers de configuration et les logs de l'agent dans un fichier d'archive. Il supprime les informations sensibles, y compris les mots de passe, les clés API, les informations d'identification proxy et les chaînes de communauté SNMP.
**Confirmez le téléchargement de l'archive pour l'envoyer immédiatement au support de Datadog**.
Puisque l'Agent Datadog est complètement open source, vous pouvez [vérifier le comportement du code][7]. Vous pouvez également consulter l'archive avant de l'envoyer car le flare demande une confirmation avant envoi.

Dans les commandes ci-dessous, remplacez  `<CASE_ID>` par votre ID de ticket de support Datadog, si vous ne spécifiez pas d'ID de ticket, la commande demande l'adresse e-mail utilisée pour se connecter dans votre organisation et crée un nouveau ticket de support.

| Platformes        | Agent v5                                                                | Agent v6                                              |
| :--------       | :-----                                                                  | :--------                                             |
| Linux           | `sudo /etc/init.d/datadog-agent flare <CASE_ID>`                        | `sudo -u dd-agent -- datadog-agent flare <CASE_ID>`   |
| Docker          | `docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>`    | `docker exec -it datadog-agent agent flare <CASE_ID>` |
| Docker (Alpine) | `docker exec -it dd-agent /opt/datadog-agent/bin/agent flare <CASE_ID>` |                                                       |
| macOS           | `datadog-agent flare <CASE_ID>`                                         | `datadog-agent flare <CASE_ID>` or web [web GUI][8]   |
| CentOS          | `sudo service datadog-agent flare <CASE_ID>`                            | `sudo datadog-agent flare <CASE_ID>`                  |
| Debian          | `sudo service datadog-agent flare <CASE_ID>`                            | `sudo datadog-agent flare <CASE_ID>`                  |
| Kubernetes      | `kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>` | `kubectl exec <pod-name> -it agent flare <CASE_ID>`   |
| Fedora          | `sudo service datadog-agent flare <CASE_ID>`                            | `sudo datadog-agent flare <CASE_ID>`                  |
| Redhat          | `sudo service datadog-agent flare <CASE_ID>`                            | `sudo datadog-agent flare <CASE_ID>`                  |
| Suse            | `sudo service datadog-agent flare <CASE_ID>`                            | `sudo datadog-agent flare <CASE_ID>`                  |
| Source          | `sudo ~/.datadog-agent/bin/agent flare <CASE_ID>`                       | `sudo datadog-agent flare <CASE_ID>`                  |
| Windows         | [Consultez notre documentation Windows dédié][9]                                  | [Consultez notre documentation Windows dédié][10]               |

## FAQ

* [Erreur d'installation 1721 de l'agent Windows][11]
* [Comment monitorer les périphériques SNMP?][12]
* [J'ai arrêté mon Agent mais je vois toujours l'host sur mon compte Datadog][13].
* [Problèmes de décalage du protocole NTP (Network Time Protocol)][14]
* [Comment résoudre les erreurs "Permission denied"?][15]
* [Erreur lors du redémarrage de l'agent: écoute déjà sur un port configuré][16]
* [Les logs du Forwarder contiennent le code d'état 599][17]
* [Démarrage du Datadog Agent (en utilisant supervisord): Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)][18]
* [Pourquoi ne vois-je pas la métrique "system.processes.open_file_descriptors"?][19]
* [Comment la métrique 'system.mem.used' est-elle calculée?][20]
* [Comment installer l'Agent sur un serveur avec une connexion Internet limitée?][21]

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://app.datadoghq.com/metric/explorer
[3]: /agent/faq/agent-commands/#agent-status-and-information
[4]: /agent/basic_agent_usage/#log-location
[5]: /help
[6]: /agent/faq/agent-5-container-more-log
[7]: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py
[8]: /agent/#using-the-gui
[9]: /agent/basic_agent_usage/windows/#agent-v5
[10]: /agent/basic_agent_usage/windows/#agent-v6
[11]: /agent/faq/common-windows-agent-installation-error-1721
[12]: /agent/faq/how-to-monitor-snmp-devices
[13]: /agent/faq/i-stoped-my-agent-but-i-m-still-seeing-the-host
[14]: /agent/faq/network-time-protocol-ntp-offset-issues
[15]: /agent/faq/how-to-solve-permission-denied-errors
[16]: /agent/faq/error-restarting-agent-already-listening-on-a-configured-port
[17]: /agent/faq/forwarder-logs-contain-599-response-code
[18]: /agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
[19]: /agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
[20]: /agent/faq/how-is-the-system-mem-used-metric-calculated
[21]: /agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity
