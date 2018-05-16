---
title: Utilisation basique de l'Agent pour l'installation source
kind: documentation
platform: Source
aliases:
  - /fr/guides/basic_agent_usage/source/
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

Cette page présente les fonctionnalités de base de l'agent Datadog. Si vous n'avez pas encore installé l'Agent, les instructions d'installation peuvent être trouvées [sur la page d'intégration de l'agent Datadog][1].

Par défaut, votre agent est installé dans sa propre sandbox à `~/.datadog-agent`. Vous êtes libre de déplacer ce dossier où vous le souhaitez. Cependant, cet article suppose que l'agent est installé dans son emplacement par défaut. Veillez donc à modifier les instructions en conséquence si vous avez décidé de le déplacer.

## Commandes

L'Agent Datadog possède quelques commandes. Seules les commandes _lifecycle_ (ie `start`/`stop`/`restart` /`status` sur l'Agent) doivent être exécutées avec `sudo`

| Agent v5                                        | Agent v6                                | Notes                         |
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo ~/.datadog-agent/bin/agent start`         | `sudo ./bin/agent/agent start`          | Démarrer l'Agent                   |
| `sudo ~/.datadog-agent/bin/agent stop`          | `sudo ./bin/agent/agent  stop`          | Stop Agent                    |
| `sudo ~/.datadog-agent/bin/agent info`          | `sudo ./bin/agent/agent  info`          | Page de statut de l'Agent  |
| `sudo ~/.datadog-agent/bin/agent flare`         | `sudo ./bin/agent/agent  flare`         | Envoyer un flare                    |
| `sudo ~/.datadog-agent/bin/agent help`          | `sudo ./bin/agent/agent  help`          | Affiche les commandes d'usage         |

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| Agent v5                     | Agent v6                          |
| :-----                       | :----                             |
| `/etc/dd-agent/datadog.conf` | `/etc/datadog-agent/datadog.yaml` |

Fichiers de configuration pour [les intégrations][2]:

| Agent v5                | Agent v6                     |
| :-----                  | :----                        |
| `/etc/dd-agent/conf.d/` | `/etc/datadog-agent/conf.d/` |

## Troubleshooting

Exécutez la commande info ou status pour voir l'état de l'Agent.
Les logs de l'Agent se trouvent dans le dossier `/var/log/datadog/`:

* Pour l'Agent v6, tous les logs se trouvent dans le fichier `agent.log`
* Pour l'Agent v5 les logs sont dans:

    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

Si vous rencontrez toujours des problèmes, [notre équipe de support][3] se fera un plaisir de vous aider.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: /integrations
[3]: /help