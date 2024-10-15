---
title: Utilisation de base de l'Agent pour macOS
platform: OS X
os: osx
aliases:
  - /fr/guides/basic_agent_usage/osx/
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

Cette page présente les fonctionnalités de base de l'Agent Datadog pour macOS. Si vous n'avez pas encore installé l'Agent, vous trouverez des instructions dans la documentation relative à l'[intégration de l'Agent Datadog][1].

Par défaut, l'Agent est installé dans une sandbox à l'emplacement `/opt/datadog-agent`. Vous pouvez déplacer ce dossier où vous le souhaitez. Toutefois, cette documentation part du principe que l'emplacement d'installation par défaut est utilisé.

**Remarque** : macOS 10.12 et les versions ultérieures sont prises en charge par l'Agent v6. macOS 10.10 et les versions ultérieures sont prises en charge par l'Agent v5.

## Commandes

Avec les Agents v6 et v7, le gestionnaire de service `launchctl` fourni par le système d'exploitation est responsable du cycle de vie de l'Agent, tandis que les autres commandes doivent être exécutées directement par le biais du binaire de l'Agent. Les commandes de cycle de vie peuvent également être gérées via la barre des menus, et les autres commandes peuvent être exécutées via l'interface Web.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Description                        | Commande                                              |
|------------------------------------|------------------------------------------------------|
| Démarrer l'Agent en tant que service           | `launchctl start com.datadoghq.agent` ou barre des menus |
| Arrêter l'Agent s'exécutant en tant que service    | `launchctl stop com.datadoghq.agent` ou barre des menus  |
| Redémarrer l'Agent s'exécutant en tant que service | _exécuter `stop` puis `start`_ ou barre des menus             |
| Statut du service de l'Agent            | `launchctl list com.datadoghq.agent` ou barre des menus  |
| Page de statut de l'Agent en cours d'exécution       | `datadog-agent status` ou interface graphique Web                    |
| Envoyer un flare                         | `datadog-agent flare` ou interface graphique Web                     |
| Afficher l'utilisation des commandes              | `datadog-agent --help`                               |
| Exécuter un check                        | `datadog-agent check <NOM_CHECK>`                   |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Commande                            |
|------------------------------------|------------------------------------|
| Démarrer l'Agent en tant que service           | `datadog-agent start`              |
| Arrêter l'Agent s'exécutant en tant que service    | `datadog-agent stop`               |
| Redémarrer l'Agent s'exécutant en tant que service | `datadog-agent restart`            |
| Statut du service de l'Agent            | `datadog-agent status`             |
| Page de statut de l'Agent en cours d'exécution       | `datadog-agent info`               |
| Envoyer un flare                         | `datadog-agent flare`              |
| Afficher l'utilisation des commandes              | _pas implémenté_                  |
| Exécuter un check                        | `datadog-agent check <NOM_CHECK>` |

{{% /tab %}}
{{< /tabs >}}

## Configuration

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `~/.datadog-agent/datadog.yaml`

Fichiers de configuration pour les [intégrations][1] :

* `~/.datadog-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `~/.datadog-agent/datadog.conf`

Fichiers de configuration pour les [intégrations][1] :

* `~/.datadog-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{< /tabs >}}

## Dépannage

Consultez la [documentation relative au dépannage de l'Agent][2].

## Utilisation de l'Agent intégré

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /fr/agent/troubleshooting/
[3]: /fr/developers/guide/custom-python-package/