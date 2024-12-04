---
title: Utilisation de base de l'Agent pour l'installation depuis les sources
platform: Source
aliases:
  - /fr/guides/basic_agent_usage/source/
further_reading:
  - link: /logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process/
    tag: Documentation
    text: Recueillir vos processus
  - link: /tracing/
    tag: Documentation
    text: Recueillir vos traces
---
## Présentation

Cette page présente les fonctionnalités de base de l'Agent Datadog. Si vous n'avez pas encore installé l'Agent, vous trouverez des instructions sur la [page relative à l'intégration de l'Agent Datadog][1].

Par défaut, votre Agent est installé dans sa propre sandbox à l'emplacement `~/.datadog-agent`. Vous pouvez déplacer ce dossier où vous le souhaitez. Toutefois, cet article part du principe que l'Agent est installé à son emplacement par défaut. Veillez donc à modifier les instructions en conséquence si vous avez décidé de le déplacer.

## Commandes

Vous pouvez utiliser quelques commandes avec l'Agent Datadog. Seules les _commandes de cycle de vie_, à savoir `start`, `stop`, `restart` et `status`, doivent être exécutées avec `sudo`.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Description                   | Commandes                                 |
| ----------------------------- | --------------------------------------- |
| Démarrer l'Agent                   | `sudo ./bin/agent/agent start`          |
| Arrêter l'Agent                    | `sudo ./bin/agent/agent  stop`          |
| Page de statut de l'Agent en cours d'exécution  | `sudo ./bin/agent/agent  info`          |
| Envoyer un flare                    | `sudo ./bin/agent/agent  flare`         |
| Afficher l'utilisation des commandes         | `sudo ./bin/agent/agent  help`          |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                   | Commandes                                 |
| ----------------------------- | --------------------------------------- |
| Démarrer l'Agent                   | `sudo ~/.datadog-agent/bin/agent start` |
| Arrêter l'Agent                    | `sudo ~/.datadog-agent/bin/agent stop`  |
| Page de statut de l'Agent en cours d'exécution  | `sudo ~/.datadog-agent/bin/agent info`  |
| Envoyer un flare                    | `sudo ~/.datadog-agent/bin/agent flare` |
| Afficher l'utilisation des commandes         | `sudo ~/.datadog-agent/bin/agent help`  |

{{% /tab %}}
{{< /tabs >}}

## Configuration

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/datadog-agent/datadog.yaml`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/datadog-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/dd-agent/datadog.conf`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/dd-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{< /tabs >}}

## Dépannage

Consultez la [documentation relative au dépannage de l'Agent][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: /fr/agent/troubleshooting/