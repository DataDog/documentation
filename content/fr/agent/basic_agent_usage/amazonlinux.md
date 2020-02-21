---
title: "Utilisation de base de l'Agent pour Amazon\_Linux"
kind: documentation
platform: "Amazon\_Linux"
aliases:
  - /fr/guides/basic_agent_usage/amazonlinux/
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: /infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
## Présentation

Cette page présente les fonctionnalités de base de l'Agent Datadog pour Amazon Linux. Si vous n'avez pas encore installé l'Agent, vous trouverez des instructions dans la documentation relative à l'[intégration de l'Agent Datadog][1].

Les paquets sont disponibles en versions pour architectures x86 64 bits et Arm v8. Pour toute autre architecture, utilisez l'installation depuis les sources.

## Commandes

Dans les Agents v6 et v7, le gestionnaire de service fourni par le système d'exploitation est responsable du cycle de vie de l'Agent, tandis que les autres commandes doivent être exécutées directement via le binaire de l'Agent. Dans l'Agent v5, presque tout se fait par l'intermédiaire du gestionnaire de service.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Description                        | Commande                                                |
|------------------------------------|--------------------------------------------------------|
| Démarrer l'Agent en tant que service           | `sudo service datadog-agent start`                     |
| Arrêter l'Agent s'exécutant en tant que service    | `sudo service datadog-agent stop`                      |
| Redémarrer l'Agent s'exécutant en tant que service | `sudo service datadog-agent restart`                   |
| Statut du service de l'Agent            | `sudo service datadog-agent status`                    |
| Page de statut de l'Agent en cours d'exécution       | `sudo datadog-agent status`                            |
| Envoyer un flare                         | `sudo datadog-agent flare`                             |
| Afficher l'utilisation des commandes              | `sudo datadog-agent --help`                            |
| Exécuter un check                        | `sudo -u dd-agent -- datadog-agent check <NOM_CHECK>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Commande                                           |
|------------------------------------|---------------------------------------------------|
| Démarrer l'Agent en tant que service           | `sudo service datadog-agent start`                |
| Arrêter l'Agent s'exécutant en tant que service    | `sudo service datadog-agent stop`                 |
| Redémarrer l'Agent s'exécutant en tant que service | `sudo service datadog-agent restart`              |
| Statut du service de l'Agent            | `sudo service datadog-agent status`               |
| Page de statut de l'Agent en cours d'exécution       | `sudo service datadog-agent info`                 |
| Envoyer un flare                         | `sudo service datadog-agent flare`                |
| Afficher l'utilisation des commandes              | `sudo service datadog-agent`                      |
| Exécuter un check                        | `sudo -u dd-agent -- dd-agent check <NOM_CHECK>` |

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si le wrapper de `service` n'est pas disponible sur votre système, utilisez :

* Sur les systèmes basés sur `upstart` : `sudo initctl start/stop/restart/status datadog-agent`
* Sur les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart/status datadog-agent`

[En savoir plus sur les commandes de cycle de vie du service][2]

## Configuration

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/datadog-agent/datadog.yaml`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/datadog-agent/conf.d/`

[1]: /fr/integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/dd-agent/datadog.conf`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/dd-agent/conf.d/`

[1]: /fr/integrations
{{% /tab %}}
{{< /tabs >}}

## Dépannage

[Consultez la documentation relative au dépannage de l'Agent][3].

## Utilisation de l'Agent intégré

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/aws
[2]: /fr/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /fr/agent/troubleshooting
[4]: /fr/developers/guide/custom-python-package