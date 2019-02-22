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
    text: "Comment Datadog détermine-t-il le hostname de l'Agent\_?"
  - link: agent/faq/agent-commands
    tag: FAQ
    text: Liste de toutes les commandes de l'Agent
  - link: agent/faq/agent-configuration-files
    tag: FAQ
    text: Emplacement de l'ensemble des fichiers de configuration de l'Agent
---
{{< partial name="platforms/platforms.html" >}}

## Outils de gestion de configurations

Gérez l'Agent Datadog et les [intégrations][1] grâce aux outils de gestion de configurations :

{{< tabs >}}
{{% tab "Chef Cookbook" %}}

* [Projet Chef GitHub][1]
* [Installation de l'Agent Datadog avec Chef][2]


[1]: https://github.com/DataDog/chef-datadog
[2]: https://app.datadoghq.com/account/settings#integrations/chef
{{% /tab %}}
{{% tab "Puppet" %}}

* [Projet Puppet GitHub][1]
* [Installation de l'Agent Datadog avec Puppet][2]


[1]: https://github.com/DataDog/puppet-datadog-agent
[2]: https://app.datadoghq.com/account/settings#integrations/puppet
{{% /tab %}}
{{% tab "Ansible" %}}

* [Projet Ansible GitHub][1]
* [Installation de l'Agent Datadog avec Ansible][2]


[1]: https://github.com/DataDog/ansible-datadog
[2]: https://app.datadoghq.com/account/settings#agent/ansible
{{% /tab %}}
{{% tab "SaltStack" %}}

* [Installation de l'Agent Datadog avec Saltstack][1]


[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}
{{< /tabs >}}

## Concepts avancés de l'Agent Datadog

### Fichiers de configuration

[Consultez la documentation relative aux fichiers de configuration de l'Agent][2].

### Site de Datadog

Pour envoyer vos données de l'Agent au [site Datadog Europe][3], modifiez le [principal fichier de configuration de l'Agent][4] `datadog.yaml` et définissez le paramètre `dd_site` sur :

`dd_site:datadoghq.eu`

### Emplacement des logs

[Consultez la documentation relative aux fichiers de log de l'Agent][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations
[2]: /fr/agent/faq/agent-configuration-files
[3]: https://app.datadoghq.eu
[4]: /fr/agent/faq/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[5]: /fr/agent/faq/agent-log-files