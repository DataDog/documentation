---
aliases:
- /fr/agent/versions/upgrade_to_agent_v7/
- /fr/agent/upgrade/
description: Instructions pour la mise à niveau de Datadog Agent 5 ou 6 vers l'Agent
  7 sur les plateformes Linux, Windows, macOS et AIX, avec des notes sur la compatibilité
  avec Python 3.
further_reading:
- link: /agent/guide/python-3/
  tag: Documentation
  text: Migrez vos checks personnalisés de Python 2 vers Python 3
title: Passez à Datadog Agent 7
---
<div class="alert alert-info">
L'Agent 7 prend uniquement en charge les checks personnalisés Python 3. <a href="/agent/guide/python-3">Vérifiez si vos checks personnalisés sont compatibles avec Python 3</a> avant de passer à l'Agent 7.
</div>

## Depuis l'Agent 6 {#from-agent-6}

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

## Depuis l'Agent 5 {#from-agent-5}

{{< tabs >}}
{{% tab "Linux" %}}

Exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations v5 pendant la mise à niveau :

La commande suivante fonctionne sur Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Mettez à niveau votre Agent vers la version 6 en suivant le [processus de mise à niveau manuel][1].
2. Suivez les instructions de mise à niveau [De l'Agent v6 vers l'Agent v7](#from-agent-v6-to-agent-v7).

[1]: /fr/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Exécutez la commande d'installation de l'Agent avec les variables d'environnement `DD_AGENT_MAJOR_VERSION=7` et `DD_UPGRADE="true"` pour mettre à niveau votre Agent de la version 5 vers la version 7. L'installateur de l'Agent v7 peut convertir automatiquement les configurations v5 pendant la mise à niveau :

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{% tab "AIX" %}}

Sur AIX, l'Agent hérité est le Datadog UNIX Agent (basé sur l'Agent 5) ; l'Agent 6 n'a jamais été distribué sur AIX. Pour passer à l'Agent 7, suivez les [instructions de migration depuis l'UNIX Agent][4] : sauvegardez la configuration existante, désinstallez l'UNIX Agent avec `installp -u datadog-unix-agent`, puis [installez l'Agent 7][5].

[4]: /fr/agent/supported_platforms/aix/#migrate-from-the-unix-agent
[5]: /fr/agent/supported_platforms/aix/#install-the-agent
{{% /tab %}}
{{< /tabs >}}

**Remarque :** Le processus de mise à niveau ne déplacera pas automatiquement les checks d'Agent **personnalisés**. Ceci est intentionnel, car Datadog ne peut pas garantir une rétrocompatibilité complète par défaut. Consultez le guide [Migration d'un check personnalisé vers Python 3][1] pour découvrir comment migrer votre check personnalisé de Python 2 vers Python 3.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/python-3/