---
title: Utilisation de base de l'Agent
kind: documentation
further_reading:
- link: "/agent/faq/how-datadog-agent-determines-the-hostname"
  tag: "FAQ"
  text: "Comment Datadog determine-t-il le hostname de l'Agent?"
- link: "/agent/faq/agent-commands"
  tag: "FAQ"
  text: "Liste de toutes les commandes de l'Agent"
---

{{< partial name="platforms/platforms.html" >}}

## Outils de gestion de configurations

Gérez l'Agent Datadog et ses [intégrations](/integrations) en utilisant des outils de gestion de configurations:

### Cookbook Chef
* [Github du projet Chef](https://github.com/DataDog/chef-datadog)
* [Installer l'Agent Datadog avec Chef](https://app.datadoghq.com/account/settings#integrations/chef)

### Puppet
* [Github du projet Puppet](https://github.com/DataDog/puppet-datadog-agent)
* [Installer l'Agent Datadog avec Puppet](https://app.datadoghq.com/account/settings#integrations/puppet)

### Ansible
* [Github du projet Ansible](https://github.com/DataDog/ansible-datadog)
* [Installer l'Agent Datadog avec Ansible](https://app.datadoghq.com/account/settings#agent/ansible)

### SaltStack

* [Installer l'Agent Datadog avec Saltstack](https://github.com/DataDog/datadog-formula)

## Fichier de configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

{{% table responsive="true" %}}
| OS                                                                       | Agent v5                                                                   |  Agent v6                       |
| :-------                                                                 | :--------                                                                  | :--------                       |
| [Mac OS X](/agent/basic_agent_usage/osx)                                 | `~/.datadog-agent/datadog.conf`                                            | `~/.datadog-agent/datadog.yaml` |
| [Linux](/agent/basic_agent_usage/ubuntu)                                 | `/etc/dd-agent/datadog.conf`                                               | `/etc/datadog-agent/datadog.yaml`                                |
| [Source](/agent/basic_agent_usage/source)                                | `~/.datadog-agent/agent/datadog.conf`                                      | `/etc/datadog-agent/datadog.yaml`                                |
| [Windows Server 2008, Vista and newer](/agent/basic_agent_usage/windows) | `\\ProgramData\Datadog\datadog.conf`                                       | `n/a`                                |
| [Windows Server 2003, XP or older](/agent/basic_agent_usage/windows)     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` | `n/a`                                |
{{% /table %}}

## Emplacement des logs

* Pour Linux et Mac OS X, les logs de l'Agent Datadog se trouvent dans le dossier `/var/log/datadog/`
* Pour Windows, les logs de l'Agent Datadog se trouvent dans le dossier `c:\programdata\Datadog\logs`

Tous les 10MB les fichiers de logs de l'Agent Datadog sont archivés. Lors d'un archivage, un backup est gardé (par exemple: `agent.log.1`). Si un backup existe déjà, il est écrasé par un nouvel archivage.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}