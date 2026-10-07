---
aliases:
- /fr/agent/basic_agent_usage/sccm/
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
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
- link: /agent/architecture
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurer les ports entrants
title: SCCM
---
Microsoft SCCM (System Center Configuration Manager) est une solution de gestion de configuration fournie avec la suite d'outils System Center de Microsoft. Cette page couvre l'installation et la configuration du Datadog Agent à l'aide de SCCM.

## Prérequis {#prerequisites}

- L'Agent prend en charge SCCM version 2103 ou ultérieure.
- Avant d'installer l'Agent, assurez-vous d'avoir installé et configuré les [points de distribution][1] dans Configuration Manager.

## Configuration {#setup}

### Créez une application Datadog Agent déployable {#create-a-deployable-datadog-agent-application}

1. Téléchargez le dernier fichier d'installation (MSI) du Datadog Agent pour Windows sur le serveur SCCM depuis la [page de l'Agent][2].
1. Dans SCCM, créez une application et utilisez l'emplacement du MSI du Datadog Agent.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="Créez une nouvelle application et utilisez le MSI du Datadog Agent comme MSI cible." style="height:100%;" >}}
1. Cliquez sur {{< ui >}}Next{{< /ui >}} jusqu'à atteindre la page {{< ui >}}General Information{{< /ui >}}.
1. Sous {{< ui >}}Installation program{{< /ui >}}, collez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API :

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   Pour plus d'options d'installation, consultez la liste complète des [variables d'installation][3].

1. Assurez-vous que {{< ui >}}Install behavior{{< /ui >}} est défini sur {{< ui >}}Install for system{{< /ui >}}.
1. Cliquez sur {{< ui >}}Next{{< /ui >}} et suivez les instructions pour créer l'application.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="Saisissez une commande de programme d'installation et assurez-vous que le comportement d'installation est défini sur installer pour le système." style="width:80%;" >}}
1. Pour vérifier que l'application a été créée, recherchez-la dans {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}}.

### Déployez l'application Datadog Agent {#deploy-the-datadog-agent-application}

<div class="alert alert-danger">Avant de déployer l'application Datadog Agent, assurez-vous d'avoir installé et configuré les <a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points">points de distribution</a> dans Configuration Manager</div>

1. Accédez à {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}} et sélectionnez l'application Datadog Agent que vous avez créée précédemment.
1. Depuis l'onglet {{< ui >}}Home{{< /ui >}} dans le groupe {{< ui >}}Deployment{{< /ui >}}, sélectionnez {{< ui >}}Deploy{{< /ui >}}.

### Agent configuration {#agent-configuration}

Les packages SCCM vous permettent de déployer des fichiers de configuration sur vos agents Datadog, en remplaçant leurs paramètres par défaut. Une configuration d'Agent se compose d'un fichier de configuration `datadog.yaml` et de fichiers `conf.yaml` facultatifs pour chaque intégration. Vous devez créer un package pour chaque fichier de configuration que vous souhaitez déployer.

1. Rassemblez vos fichiers `datadog.yaml` et `conf.yaml` dans un dossier local de la machine SCCM. Consultez l'[exemple de fichier de configuration d'Agent pour Windows][4] pour connaître toutes les options de configuration disponibles.
1. Créez un package SCCM et sélectionnez {{< ui >}}Standard program{{< /ui >}}.
1. Sélectionnez l'emplacement qui contient le fichier de configuration que vous souhaitez déployer sur vos agents.
1. Sélectionnez une [collection d'appareils][5] vers laquelle déployer les modifications.
1. Configurez les paramètres de déploiement pour préinstaller le package sur les cibles immédiatement.

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="L'écran du type de programme. Sélectionnez programme standard" style="width:80%;" >}}

### Redémarrez le Datadog Agent {#restart-the-datadog-agent}

Redémarrez le service du Datadog Agent pour observer vos modifications de configuration :
1. Créez un script PowerShell pour redémarrer le Datadog Agent à l'aide des [commandes de l'Agent][6].
1. Exécutez le script pour redémarrer le Datadog Agent.
1. Vérifiez la présence de nouvelles données dans l'interface utilisateur Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /fr/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /fr/agent/basic_agent_usage/windows/#agent-commands