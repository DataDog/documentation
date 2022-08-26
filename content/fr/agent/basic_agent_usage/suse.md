---
aliases:
- /fr/guides/basic_agent_usage/suse/
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
kind: documentation
platform: SUSE
title: Utilisation basique de l'Agent pour SUSE
---

## Présentation

Cette page présente les fonctionnalités de base de l'Agent Datadog pour SUSE. Si vous n'avez pas encore installé l'Agent, vous trouverez des instructions dans la documentation relative à l'[intégration de l'Agent Datadog][1].

Les packages sont disponibles pour les architectures x86 64 bits. Pour toute autre architecture, utilisez l'installation depuis les sources.

**Remarque** : SUSE 11 SP4 et les versions ultérieures sont pris en charge par les versions de l'Agent antérieures à la v6.33.0/7.33.0. SLES 12 et les versions ultérieures et OpenSUSE 15 et les versions ultérieures sont pris en charge par l'Agent v6.33.0+/7.33.0+.

## Commandes

Avec les Agents v6 et v7, le gestionnaire de service fourni par le système d'exploitation est responsable du cycle de vie de l'Agent, tandis que les autres commandes doivent être exécutées directement via le binaire de l'Agent. Avec l'Agent v5, la grande majorité des opérations passent par le gestionnaire de service.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

### SUSE 12 et ultérieur

| Rôle                        | Commande                                                |
|------------------------------------|--------------------------------------------------------|
| Démarrer l'Agent en tant que service           | `sudo systemctl start datadog-agent`                   |
| Arrêter l'Agent s'exécutant en tant que service    | `sudo systemctl stop datadog-agent`                    |
| Redémarrer l'Agent s'exécutant en tant que service | `sudo systemctl restart datadog-agent`                 |
| Statut du service de l'Agent            | `sudo systemctl status datadog-agent`                  |
| Page de statut de l'Agent en cours d'exécution       | `sudo datadog-agent status`                            |
| Envoyer un flare                         | `sudo datadog-agent flare`                             |
| Afficher l'utilisation des commandes              | `sudo datadog-agent --help`                            |
| Exécuter un check                        | `sudo -u dd-agent -- datadog-agent check <NOM_CHECK>` |

### SUSE 11

| Rôle                        | Commande                                                |
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

| Rôle                        | Commande                                           |
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

* Sur les systèmes basés sur `upstart` : `sudo start/stop/restart/status datadog-agent`
* Sur les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart/status datadog-agent`

[En savoir plus sur les commandes de cycle de vie du service][2]

## Configuration

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/datadog-agent/datadog.yaml`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/datadog-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{% tab "Agent v5" %}}

Les fichiers et dossiers de configuration de l'Agent sont situés dans :

* `/etc/dd-agent/datadog.conf`

Fichiers de configuration pour les [intégrations][1] :

* `/etc/dd-agent/conf.d/`

[1]: /fr/integrations/
{{% /tab %}}
{{< /tabs >}}

## Dépannage

Consultez la [documentation relative au dépannage de l'Agent][3].

## Utilisation de l'Agent intégré

L'Agent intègre un environnement Python dans `/opt/datadog-agent/embedded/`. Les binaires courants comme `python` et `pip` se trouvent dans `/opt/datadog-agent/embedded/bin/`.

Pour en savoir plus, consultez les instructions relatives à l'[ajout de paquets à l'Agent intégré][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/suse
[2]: /fr/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands
[3]: /fr/agent/troubleshooting/
[4]: /fr/developers/guide/custom-python-package/