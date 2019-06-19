---
title: Utilisation de base de l'Agent pour CentOS
kind: documentation
platform: CentOS
aliases:
  - /fr/guides/basic_agent_usage/centos/
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
## Présentation

Cette page présente les fonctionnalités de base de l'Agent Datadog pour CentOS. Pour installer l'Agent Datadog, suivez les [instructions d'installation de l'Agent][1] pour CentOs.

**Remarque** : les versions 6 et supérieures de CentOS sont prises en charge.

## Commandes

Dans l'Agent v6, le gestionnaire de service fourni par le système d'exploitation est responsable du cycle de vie de l'Agent, tandis que d'autres commandes doivent être exécutées directement par le biais du binaire de l'Agent. Dans l'Agent v5, la majorité des processus passent par le gestionnaire de service.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Description                        | Commandes                                                |
| --------------------               | --------------------                                   |
| Démarrer l'Agent en tant que service           | `sudo service datadog-agent start`                     |
| Arrêter l'Agent s'exécutant en tant que service    | `sudo service datadog-agent stop`                      |
| Redémarrer l'Agent s'exécutant en tant que service | `sudo service datadog-agent restart`                   |
| Statut du service de l'Agent            | `sudo service datadog-agent status`                    |
| Page de statut de l'Agent qui s'exécute       | `sudo datadog-agent status`                            |
| Envoyer un flare                         | `sudo datadog-agent flare`                             |
| Afficher l'utilisation des commandes              | `sudo datadog-agent --help`                            |
| Exécuter un check                        | `sudo -u dd-agent -- datadog-agent check <nom_check>` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Description                        | Commandes                                           |
| --------------------               | --------------------                              |
| Démarrer l'Agent en tant que service           | `sudo service datadog-agent start`                |
| Arrêter l'Agent s'exécutant en tant que service    | `sudo service datadog-agent stop`                 |
| Redémarrer l'Agent s'exécutant en tant que service | `sudo service datadog-agent restart`              |
| Statut du service de l'Agent            | `sudo service datadog-agent status`               |
| Page de statut de l'Agent qui s'exécute       | `sudo service datadog-agent info`                 |
| Envoyer un flare                         | `sudo service datadog-agent flare`                |
| Afficher l'utilisation des commandes              | `sudo service datadog-agent`                      |
| Exécuter un check                        | `sudo -u dd-agent -- dd-agent check <nom_check>` |

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si le wrapper de `service` n'est pas disponible sur votre système, utilisez :

* Sur les systèmes basés sur `upstart` : `sudo initctl start/stop/restart/status datadog-agent`
* Sur les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart/status datadog-agent`

[En savoir plus sur les commandes de cycle de vie du service][2]

## Configuration

{{< tabs >}}
{{% tab "Agent v6" %}}
Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/datadog-agent/datadog.yaml` 

Fichiers de configuration pour les [intégrations][1] :

* `/etc/datadog-agent/conf.d/` 


[1]: /fr/integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

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

L'Agent comporte un environnement Python intégré dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` sont contenus dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions pour découvrir comment [ajouter des paquets à l'Agent intégré][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands
[3]: /fr/agent/troubleshooting
[4]: /fr/developers/guide/custom-python-package
