---
aliases:
- /fr/agent/faq/upgrade-between-agent-minor-versions
- /fr/agent/guide/upgrade-between-agent-minor-versions
- /fr/agent/versions/upgrade_between_agent_minor_versions/
- /fr/agent/guide/upgrade_between_minor_versions/
description: Guide de mise à niveau des versions de Datadog Agent à l'aide de la gestion
  à distance Fleet Automation, des scripts d'installation et des outils de gestion
  de configuration.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
- link: agent/
  tag: Documentation
  text: Le Datadog Agent
title: Mettez à niveau votre Datadog Agent
---
## Présentation {#overview}
Datadog vous recommande de mettre à jour votre Datadog Agent à chaque version [mineure ou corrective][6]. Ce guide vous explique comment déployer une nouvelle version de l'Agent sur vos hosts en quelques clics.


## Mise à niveau entre les versions mineures de l'Agent {#upgrade-between-minor-versions-of-the-agent}

### Mise à niveau à distance avec Fleet Automation {#upgrade-remotely-with-fleet-automation}

[Fleet Automation][2] vous permet de gérer de manière centralisée votre parc de Datadog Agents. Fleet Automation inclut la gestion à distance des Agents, ce qui vous permet de mettre à niveau à distance les Agents dans les environnements Linux et Windows non conteneurisés. Consultez [Mettre à niveau les Agents][7].

### Mise à niveau avec un script ou un outil de gestion de configuration {#upgrade-with-script-or-configuration-management-tooling}

Suivez les [instructions dans l'application][4] pour mettre à niveau les Datadog Agents dans les environnements conteneurisés, basés sur des hosts et gérés par des outils d'Infrastructure as Code (IaC). Le flux guidé génère une commande d'installation de l'Agent adaptée à votre plateforme pour la mise à niveau de l'Agent. Par défaut, la commande installe la dernière version de l'Agent. Pour effectuer une mise à niveau vers une version mineure spécifique, définissez `DD_AGENT_MINOR_VERSION=<TARGET_MINOR>` avant d'exécuter le script.

## Mise à niveau entre les versions majeures de l'Agent {#upgrade-between-major-versions-of-the-agent}

<div class="alert alert-info">
L'Agent 7 prend uniquement en charge les checks personnalisés Python 3. <a href="/agent/guide/python-3">Vérifiez si vos checks personnalisés sont compatibles avec Python 3</a> avant de passer à l'Agent 7.
</div>

### Mise à niveau de l'Agent 6 vers l'Agent 7 {#upgrade-from-agent-6-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Exécutez la commande d'installation de l'Agent suivante pour mettre à niveau votre Agent de la version 6 vers la version 7 :

La commande suivante fonctionne sur Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Téléchargez le programme d'installation de Datadog Agent][1].
2. Exécutez l'installateur (en tant que {{< ui >}}Administrator{{< /ui >}}) en ouvrant `datadog-agent-7-latest.amd64.msi`.
3. Suivez les invites, acceptez le contrat de licence et saisissez votre [clé d'API Datadog][2].
4. Une fois l'installation terminée, vous avez la possibilité de lancer Datadog Agent Manager.

**Remarque** : les liens vers toutes les versions disponibles de Windows Installer sont [fournis au format JSON][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_AGENT_MAJOR_VERSION=7` pour mettre à niveau votre Agent de la version 6 vers la version 7 :

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

### Mise à niveau de l'Agent 5 vers l'Agent 7 {#upgrade-from-agent-5-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations v5 pendant la mise à niveau :

La commande suivante fonctionne sur Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Mettez à niveau votre Agent vers la version 6 en suivant le [processus de mise à niveau manuel][1].
2. Suivez les instructions de mise à niveau [De l'Agent v6 vers l'Agent v7](#upgrade-from-agent-6-to-agent-7).

[1]: /fr/agent/guide/upgrade_to_agent_6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande d'installation de l'Agent avec les variables d'environnement `DD_AGENT_MAJOR_VERSION=7` et `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations v5 pendant la mise à niveau :

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Remarque :** Le processus de mise à niveau ne déplace pas automatiquement les checks d'Agent **personnalisés**. Ceci est intentionnel, car Datadog ne peut pas garantir une rétrocompatibilité complète par défaut. Consultez le guide [Migration d'un check personnalisé vers Python 3][1] pour découvrir comment migrer votre check personnalisé de Python 2 vers Python 3.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/python-3/
[2]: /fr/agent/fleet_automation/
[3]: /fr/agent/fleet_automation/#set-up-fleet-automation
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[5]: /fr/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/datadog-agent/releases?page=1
[7]: /fr/agent/fleet_automation/upgrade_agents/