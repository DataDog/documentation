---
title: Utilisation de base de l'Agent
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/
  - /fr/agent/faq/where-is-the-configuration-file-for-the-agent/
  - /fr/agent/faq/log-location
further_reading:
  - link: agent/faq/how-datadog-agent-determines-the-hostname
    tag: FAQ
    text: Comment Datadog determine-t-il le hostname de l'Agent?
  - link: agent/faq/agent-commands
    tag: FAQ
    text: Liste de toutes les commandes de l'Agent
---
{{< partial name="platforms/platforms.html" >}}

## Outils de gestion de configurations

Gérez l'Agent Datadog et ses [intégrations][1] en utilisant des outils de gestion de configurations:

### Cookbook Chef
* [Github du projet Chef][2]
* [Installer l'Agent Datadog avec Chef][3]

### Puppet
* [Github du projet Puppet][4]
* [Installer l'Agent Datadog avec Puppet][5]

### Ansible
* [Github du projet Ansible][6]
* [Installer l'Agent Datadog avec Ansible][7]

### SaltStack

* [Installer l'Agent Datadog avec Saltstack][8]

## Fichier de configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| OS                                         | Agent v5                                                                   | Agent v6                             |
| :-------                                   | :--------                                                                  | :--------                            |
| [macOS][9]                                 | `~/.datadog-agent/datadog.conf`                                            | `~/.datadog-agent/datadog.yaml`      |
| [Linux][10]                                | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`    |
| [Source][11]                               | `~/.datadog-agent/agent/datadog.conf`                                      | `/etc/datadog-agent/datadog.yaml`    |
| [Windows Server 2008, Vista and newer][12] | `\\ProgramData\Datadog\datadog.conf`                                       | `\\ProgramData\Datadog\datadog.yaml` |
| [Windows Server 2003, XP or older][12]     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` | `n/a` _(OS non supporté)_             |

## Emplacement des logs

* Pour Linux et macOS, les logs de l'Agent Datadog se trouvent dans le dossier `/var/log/datadog/`
* Pour Windows, les logs de l'Agent Datadog se trouvent dans le dossier `c:\programdata\Datadog\logs`

Tous les 10MB les fichiers de logs de l'Agent Datadog sont archivés. Lors d'un archivage, un backup est gardé (par exemple: `agent.log.1`). Si un backup existe déjà, il est écrasé par un nouvel archivage.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations
[2]: https://github.com/DataDog/chef-datadog
[3]: https://app.datadoghq.com/account/settings#integrations/chef
[4]: https://github.com/DataDog/puppet-datadog-agent
[5]: https://app.datadoghq.com/account/settings#integrations/puppet
[6]: https://github.com/DataDog/ansible-datadog
[7]: https://app.datadoghq.com/account/settings#agent/ansible
[8]: https://github.com/DataDog/datadog-formula
[9]: /agent/basic_agent_usage/osx
[10]: /agent/basic_agent_usage/ubuntu
[11]: /agent/basic_agent_usage/source
[12]: /agent/basic_agent_usage/windows
