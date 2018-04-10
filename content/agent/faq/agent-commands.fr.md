---
title: Commandes de l'Agent
kind: faq
aliases:
  - /fr/agent/faq/agent-status-and-information
  - /fr/agent/faq/start-stop-restart-the-datadog-agent
---
## Démarrer/Arrêter/Redémarrer l'Agent
### Démarre l'Agent

|Platforme|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent start`|`sudo service datadog-agent start`|
|MacOS x|`/usr/local/bin/datadog-agent start`|`launchctl start com.datadoghq.agent` or systray app |
|Source|`sudo ~/.datadog-agent/bin/agent start`|`sudo service datadog-agent start`|
|Windows|[Consultez notre document Windows dédié][1]|[Consult our dedicated windows doc][1]|

### Stop the Agent

|Platforme|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent stop`|`sudo service datadog-agent stop`|
|MacOS x|`/usr/local/bin/datadog-agent stop` |`launchctl stop com.datadoghq.agent` or systray app  |
|Source|`sudo ~/.datadog-agent/bin/agent stop`|`sudo service datadog-agent stop`|
|Windows|[Consultez notre document Windows dédié][1]|[Consultez notre document Windows dédié][1]|
### Redémarer l'Agent

|Platformes|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent restart`|`sudo service datadog-agent restart`|
|MacOS x|`/usr/local/bin/datadog-agent restart `|_run `stop` then `start`_ or systray app|
|Source|`sudo ~/.datadog-agent/bin/agent restart`|`n/a`|
|Windows|[Consultez notre document Windows dédié][1]|[Consultez notre document Windows dédié][1]|

## Status et Informations de l'Agent

### Status du service

|Platformes|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent status`|`sudo datadog-agent status`|
|Docker (Debian)|`sudo docker exec -it dd-agent /etc/init.d/datadog-agent status`|`sudo docker exec -it agent s6-svstat /var/run/s6/services/agent/`|
|Docker (Alpine)|`sudo docker exec -it dd-agent supervisorctl -c /opt/datadog-agent/agent/supervisor.conf status`|`n/a`|
|MacOS x|`datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app|
|Source|`sudo ~/.datadog-agent/bin/agent status`|`sudo service datadog-agent status`|
|Windows|[Consult our dedicated windows doc][2]|[Consult our dedicated windows doc][2]|

### Information sur l'Agent

L'exécution d'une commande info affiche l'état de votre Agent Datadog et des intégrations activées.

Une intégration correctement configurée indiquera "OK" comme indiqué ci-dessous:

```
  Checks
  ======

    network
    -------
      - instance #0 [OK]
      - Collected 15 metrics, 0 events & 1 service check
```

Le `[OK]` dans le retour de l'Agent implique que la vérification a été configurée/exécutée correctement mais ne fait pas référence à la valeur renvoyée par le check.

|Platforme|Agent v5 |Agent v6|
|:--------|:-----|:--------|
|Linux|`sudo service datadog-agent info`|`sudo datadog-agent status`|
|Docker|`sudo docker exec -it dd-agent /etc/init.d/datadog-agent info`|`sudo docker exec -it datadog-agent agent status`|
|Docker (Alpine)|`docker exec -it dd-agent /opt/datadog-agent/bin/agent`|`n/a`|
|MacOS x|`datadog-agent info`               | `datadog-agent status` or [web GUI][3]                    |
|Source|`sudo ~/.datadog-agent/bin/info`|`sudo datadog-agent status`|
|Windows|[Consult our dedicated windows doc][2]|[Consult our dedicated windows doc][2]|

[1]: /agent/basic_agent_usage/windows
[2]: /agent/basic_agent_usage/windows/#status-and-information
[3]: /agent/#using-the-gui
