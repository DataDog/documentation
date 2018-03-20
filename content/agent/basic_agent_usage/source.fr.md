---
title: Utilisation basique de l'Agent pour l'installation source
kind: documentation
platform: Source
aliases:
  - '/[object Object]/guides/basic_agent_usage/source/'
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
## Aperçu

Cette page présente les fonctionnalités de base de l'agent Datadog.
Si vous n'avez pas encore installé l'Agent, les instructions d'installation peuvent être trouvées [sur la page d'intégration de l'agent Datadog](https://app.datadoghq.com/account/settings#agent/source).

Par défaut, votre agent est installé dans sa propre sandbox à `~/.datadog-agent`. Vous êtes libre de déplacer ce dossier où vous le souhaitez. Cependant, cet article suppose que l'agent est installé dans son emplacement par défaut. Veillez donc à modifier les instructions en conséquence si vous avez décidé de le déplacer.


## Commandes

L'Agent Datadog possède quelques commandes. Seules les commandes _lifecycle_ (ie `start`/`stop`/`restart` /`status` sur le service Agent) doivent être exécutées avec `sudo service` /` sudo initctl` / `sudo systemctl`, toutes les autres commandes doivent être exécutées avec la commande `datadog-agent`.

{{% table responsive="true" %}}
| Agent v5                                  |  Agent v6                          | Notes
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo ~/.datadog-agent/bin/agent start`              | `sudo service datadog-agent start`      | Start Agent as a service |
| `sudo ~/.datadog-agent/bin/agent stop`               | `sudo service datadog-agent stop`       | Stop Agent running as a service |
| `sudo ~/.datadog-agent/bin/agent restart`            | `sudo service datadog-agent restart`    | Restart Agent running as a service |
| `sudo ~/.datadog-agent/bin/agent status`             | `sudo service datadog-agent status`     | Status of Agent service |
| `sudo ~/.datadog-agent/bin/info`               | `sudo datadog-agent status`             | Status page of running Agent |
| `sudo service datadog-agent flare`              | `sudo datadog-agent flare`              | Send flare |
| `sudo service datadog-agent`                    | `sudo datadog-agent --help`             | Display command usage |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check |
{{% /table %}}

Plus d'informations sur les métriques, les événements et les checks de service pour une [intégrations](/integrations) peuvent être récupérées avec la commande check:
```shell
sudo service datadog-agent check [integration]
```

Ajoutez l'argument check_rate pour avoir les valeurs les plus récentes pour les fréquences:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: Si `service` n'est pas disponible sur votre système, utilisez:

* pour les système basés sur `upstart`: `sudo start/stop/restart datadog-agent`
* pour les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart datadog-agent`
* pour les système basés sur `initctl`: `sudo initctl start/stop/restart datadog-agent`

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/datadog.conf`| `/etc/datadog-agent/datadog.yaml` |

Fichiers de configuration pour [les intégrations](/integrations):

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/conf.d/`|`/etc/datadog-agent/conf.d/`|

## Troubleshooting

Exécutez la commande info ou status pour voir l'état de l'Agent.
Les logs de l'Agent se trouvent dans le dossier `/var/log/datadog/`:

* Pour l'Agent v6, tous les logs se trouvent dans le fichier `agent.log`
* Pour l'Agent v5 les logs sont dans:

    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

Si vous rencontrez toujours des problèmes, [notre équipe de support](/help) se fera un plaisir de vous aider.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}