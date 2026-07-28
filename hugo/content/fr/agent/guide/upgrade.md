---
aliases:
- /fr/agent/versions/upgrade_to_agent_v7/
- /fr/agent/upgrade/
further_reading:
- link: /agent/guide/python-3/
  tag: Documentation
  text: Migrer vos checks custom de Python 2 vers Python 3
title: Mise à niveau vers la version 7 de l'Agent Datadog
---

<div class="alert alert-info">
L'Agent 7 prend uniquement en charge les checks custom écrits en Python 3. <a href="/agent/guide/python-3">Vérifiez si vos checks custom sont compatibles avec Python 3</a> avant de passer à l'Agent 7.
</div>

## Depuis l'Agent 6

{{< tabs >}}
{{% tab "Linux" %}}

Exécutez la commande d'installation suivante pour mettre à niveau votre Agent de la version 6 vers la version 7 :

La commande suivante fonctionne sur Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Téléchargez le programme d'installation de l'Agent Datadog][1].
2. Exécutez le programme d'installation (en tant qu'**administrateur**) en ouvrant `datadog-agent-7-latest.amd64.msi`.
3. Suivez les instructions à l'écran, acceptez l'accord de licence et entrez votre [clé d'API Datadog][2].
4. Une fois l'installation terminée, le programme vous propose de lancer Datadog Agent Manager.

**Remarque** : les liens vers les différentes versions du programme d'installation Windows sont [fournis au format JSON][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_AGENT_MAJOR_VERSION=7` pour passer de la version 6 à la version 7 :

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## Depuis l'Agent 5

{{< tabs >}}
{{% tab "Linux" %}}

Exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations de la version 5 pendant la mise à niveau :

La commande suivante fonctionne sur Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Passez à la version 6 de l'Agent en utilisant la [méthode manuelle][1].
2. Suivez les instructions indiquées à la section [Passer de l'Agent v6 à l'Agent v7](#passer-de-l-agent-v6-a-l-agent-v7).

[1]: /fr/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande d'installation de l'Agent avec les variables d'environnement `DD_AGENT_MAJOR_VERSION=7` et `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations de la version 5 pendant la mise à niveau :

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Remarque :** les checks **custom** de l'Agent ne sont pas automatiquement importés durant la mise à jour. Ce comportement est délibéré : nous ne pouvons pas garantir la compatibilité totale et immédiate de ces checks. Consultez le guide [Migration de checks custom vers Python 3][1] pour découvrir comment migrer vos checks custom de Python 2 vers Python 3.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/python-3/