---
title: "Upgrade vers l'Agent\_v7 de Datadog"
kind: documentation
further_reading:
  - link: /agent/guide/python-3/
    tag: Documentation
    text: "Migrer vos checks custom de Python\_2 vers Python\_3"
---
<div class="alert alert-info">
L'Agent v7 prend uniquement en charge les checks custom écrits en Python 3. <a href="/agent/guide/python-3">Vérifiez si vos checks custom sont compatibles avec Python 3</a> avant de passer à l'Agent v7.
</div>

## Passer de l'Agent v6 à l'Agent v7

{{< tabs >}}
{{% tab "Linux" %}}

Pour passer de la version 6 à la version 7 de l'Agent, exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_AGENT_MAJOR_VERSION=7` :


Amazon Linux 
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

CentOS       
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Debian       
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Fedora       
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Red Hat      
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Ubuntu       
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

SUSE         
: `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Téléchargez le programme d'installation de l'Agent Datadog][1].
2. Exécutez le programme d'installation (en tant qu'**administrateur**) en ouvrant `datadog-agent-7-latest.amd64.msi`.
3. Suivez les instructions à l'écran, acceptez l'accord de licence et entrez votre [clé d'API Datadog][2].
4. Une fois l'installation terminée, le programme vous propose de lancer Datadog Agent Manager.

**Remarque** : les liens vers les différentes versions du programme d'installation Windows sont [fournis au format JSON][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "macOS" %}}

Pour passer de la version 6 à la version 7 de l'Agent, exécutez la commande d'installation de l'Agent avec la variable d'environnement `DD_AGENT_MAJOR_VERSION=7` :

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<CLÉ_API_DATADOG>" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## Passer de l'Agent v5 à l'Agent v7

{{< tabs >}}
{{% tab "Linux" %}}

Pour passer de la version 5 à la version 7 de l'Agent, exécutez la commande d'installation avec les variables d'environnement `DD_AGENT_MAJOR_VERSION=7` et `DD_UPGRADE="true"`. Le programme d'installation de l'Agent v7 peut automatiquement convertir les configurations v5 durant l'upgrade :

Amazon Linux 
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

CentOS       
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Debian       
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Fedora       
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Red Hat      
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

Ubuntu       
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

SUSE         
: `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Passez à la version 6 de l'Agent en utilisant la [méthode manuelle][1].
2. Suivez les instructions indiquées à la section [Passer de l'Agent v6 à l'Agent v7](#passer-de-l-agent-v6-a-l-agent-v7).

[1]: /fr/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Pour passer de la version 5 à la version 7 de l'Agent, exécutez la commande d'installation avec les variables d'environnement `DD_AGENT_MAJOR_VERSION=7` et `DD_UPGRADE="true"`. Le programme d'installation de l'Agent v7 peut automatiquement convertir les configurations v5 durant l'upgrade :

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Remarque :** les checks **custom** de l'Agent ne sont pas automatiquement importés durant la mise à jour. Ce comportement est délibéré : nous ne pouvons pas garantir la compatibilité totale et immédiate de ces checks. Consultez le guide [Migration de checks custom vers Python 3][1] pour découvrir comment migrer vos checks custom de Python 2 vers Python 3.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/guide/python-3/