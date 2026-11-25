---
aliases:
- /fr/logs/guide/azure-logging-guide/
- /fr/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Bonnes pratiques pour la surveillance des journaux de la plateforme Microsoft
    Azure
title: Configuration du Log Forwarding automatisé Azure
---
## Présentation {#overview}

Utilisez ce guide pour configurer et gérer le transfert automatisé de journaux Azure. Vous pouvez configurer le transfert de journaux directement dans Datadog ou le déployer avec un modèle Azure Resource Manager (ARM).

Le modèle ARM déploie des comptes de stockage et des travaux Azure Container Apps dans vos abonnements. Ces ressources collectent et transfèrent les journaux vers Datadog, et s'adaptent automatiquement au volume des journaux, qu'il augmente ou diminue. La mise à l'échelle est gérée par un plan de contrôle, qui est un ensemble de travaux Container Apps déployés dans un abonnement et une région de votre choix. Les comptes de stockage et les travaux Container Apps sont déployés dans chacun des abonnements transférant des journaux vers Datadog.

**Remarque** : Depuis le 2026-08-03, les nouveaux déploiements exécutent par défaut le plan de contrôle sur des travaux Azure Container Apps. Les déploiements créés avant cette date conservent leur plan de contrôle Azure Function app, et la mise à jour d'un déploiement ne modifie pas son type de plan de contrôle. Le transfert de journaux fonctionne de la même manière avec l'un ou l'autre des plans de contrôle. Pour migrer un déploiement existant vers des travaux Container Apps, utilisez le [script de migration][25].

**Environnements Azure pris en charge** : Le transfert automatisé de journaux ne prend en charge que le cloud commercial (public) Azure. Azure Government et Azure China ne sont pas pris en charge.

## Prérequis {#prerequisites}

Vous devez disposer des autorisations nécessaires sur le groupe d'administration pour déployer le transfert automatisé de journaux avec le modèle ARM.

## Comment choisir entre une configuration automatisée et manuelle {#how-to-choose-between-automated-and-manual-setup}

Choisissez la méthode de configuration manuelle si vous souhaitez :
   - appliquer des tags personnalisés à vos ressources

Utilisez la méthode de configuration automatisée si vous souhaitez :
   - automatiser le déploiement via le portail Azure
   - gérer votre infrastructure à l'aide de modèles déclaratifs
   - contrôler de manière centralisée les accès, les tags et la facturation
   - redéployer vos ressources dans le bon ordre et de manière cohérente
   - réaliser des économies en utilisant un compte de stockage plutôt qu'un hub d'événements

## Configuration {#setup}

### Configure Log Forwarding {#configure-log-forwarding}

Utilisez le flux **Configure Log Forwarding** pour configurer de nouveaux redirecteurs de logs ou gérer les redirecteurs existants directement dans Datadog. Vous pouvez utiliser ce flux pour déployer le transfert de logs automatisé à partir de zéro ou mettre à jour une configuration existante, comme l'ajout ou la suppression d'abonnements ou la modification de filtres de logs.

1. Dans Datadog, accédez à [{{< ui >}}Integrations > Azure{{< /ui >}}][16].
1. Cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Choisissez de déployer une nouvelle configuration ou de mettre à jour une configuration existante.
1. Copiez la commande fournie et collez-la dans votre Azure Cloud Shell.
1. Sélectionnez les abonnements à partir desquels transférer les logs.
1. Optionnellement, ajoutez ou supprimez des filtres de logs.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Modèle ARM {#arm-template}

Vous pouvez également déployer le transfert automatisé des logs à l’aide d’un [modèle ARM public Azure][1]. Les sections ci-dessous fournissent des instructions pour remplir chaque page du modèle.

#### Basics {#basics}

1. Sous {{< ui >}}Project details{{< /ui >}}, sélectionnez un groupe d'administration. Ce champ est obligatoire. Le modèle ARM utilise le groupe d'administration pour accorder des autorisations aux abonnements que vous sélectionnez pour le transfert de logs automatisé.
2. Sous {{< ui >}}Instance details{{< /ui >}}, sélectionnez des valeurs pour :
   - {{< ui >}}Region{{< /ui >}}. C'est ici que le plan de contrôle est déployé.
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}. Il s'agit des abonnements à configurer pour le transfert de logs.
   - {{< ui >}}Control Plane Subscription{{< /ui >}}. Il s'agit de l'abonnement sur lequel le plan de contrôle est déployé.
   - {{< ui >}}Resource Group Name{{< /ui >}}. Il s'agit du groupe de ressources à utiliser pour le plan de contrôle. Datadog vous recommande de choisir un nom de groupe de ressources nouveau et inutilisé pour simplifier la gestion des services du plan de contrôle.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="La page Basics du modèle ARM pour le transfert automatisé des logs Azure" popup="true" style="width:100%">}}

3. Cliquez sur {{< ui >}}Next{{< /ui >}}.

#### Configuration Datadog {#datadog-configuration}

1. Saisissez la valeur de votre [clé d'API Datadog][2].
2. Sélectionnez votre [Datadog Site][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="La page de configuration Datadog du modèle ARM pour le transfert automatisé de logs Azure" popup="true" style="width:100%">}}

3. Cliquez sur {{< ui >}}Next{{< /ui >}}.

#### Déploiement {#deployment}

1. Cochez la case pour confirmer que vous avez pris connaissance des avertissements relatifs au déploiement.
2. Cliquez sur {{< ui >}}Review + create{{< /ui >}}.

#### Review + create {#review-create}

1. Examinez les détails finaux du déploiement.
2. Cliquez sur {{< ui >}}Create{{< /ui >}}.

## Filtrage par tag de ressource {#resource-tag-filtering}

Vous pouvez utiliser des filtres de tag pour déterminer quelles ressources Azure verront leurs logs transférés vers Datadog. Pour la syntaxe des filtres de tag, la prise en charge des caractères génériques et des exemples, consultez [Filtrage par tag de ressource][21] dans le guide de démarrage d'Azure.

## Log Analytics Workspaces {#log-analytics-workspaces}

Vous pouvez transférer des logs depuis des Azure Log Analytics Workspaces (LAWs) vers Datadog via le forwarder de logs automatisé. Auparavant, Datadog ne prenait en charge que les logs de [paramètres de diagnostic][13] provenant des LAW. Avec les [règles d'exportation de données][17], vous pouvez également transférer des logs depuis des tables de logs LAW vers Datadog.

### Restrictions {#restrictions}

- Vous pouvez uniquement configurer le transfert pour les ressources LAW situées dans la même région que le forwarder de logs.
- Vous pouvez avoir un maximum de 10 règles d'exportation de données sur un LAW. Si le LAW n'a plus de capacité pour une règle d'exportation de données, supprimez une règle existante pour libérer de l'espace.
- Toutes les tables de logs ne peuvent pas être exportées. Consultez la liste des [tables non prises en charge][18] de Microsoft.

### Transférer des logs depuis un Log Analytics Workspace {#forward-logs-from-a-log-analytics-workspace}

1. Si vous n'avez pas encore créé de forwarder de logs automatisé, suivez les instructions de [Configuration](#setup). Si vous disposez déjà d'un forwarder de logs, assurez-vous qu'il est mis à jour vers la dernière version.
2. Dans l'[Azure Portal][19], accédez au Log Analytics Workspace souhaité.
3. Sous {{< ui >}}Settings{{< /ui >}}, cliquez sur {{< ui >}}Data export{{< /ui >}}.
4. Cliquez sur {{< ui >}}New export rule{{< /ui >}}.
5. Nommez la règle, cochez {{< ui >}}Enable upon creation{{< /ui >}} et cliquez sur {{< ui >}}Next{{< /ui >}}.
6. Sélectionnez les tables à exporter. Vous pouvez modifier cette sélection ultérieurement en modifiant la règle d'exportation de données. Cliquez sur {{< ui >}}Next{{< /ui >}}.
7. Pour {{< ui >}}Destination type{{< /ui >}}, sélectionnez {{< ui >}}Storage Account{{< /ui >}}. Sélectionnez l'abonnement contenant votre forwarder de logs et choisissez un compte de stockage pour le forwarder de logs. Ces comptes ont généralement le préfixe `ddlogstorage`. Cliquez sur {{< ui >}}Next{{< /ui >}}.
8. Examinez la règle et cliquez sur {{< ui >}}Create{{< /ui >}}. Les logs du LAW commencent à apparaître dans Datadog en quelques minutes.

### Dépannage {#troubleshooting}

#### Les logs n'apparaissent pas dans Datadog {#logs-are-not-appearing-in-datadog}

Si vous avez créé une règle d'exportation de données mais que vous ne voyez pas les logs dans Datadog :

1. Vérifiez que la règle d'exportation de données est activée.
1. Vérifiez que le compte de stockage de destination est bien celui créé par le forwarder de logs automatisé (le nom commence généralement par `ddlogstorage`).
1. Dans le compte de stockage, inspectez les Containers. Les Containers avec le préfixe `am-` indiquent des exportations LAW. Si vous ne voyez que des Containers avec le préfixe `insights-`, la règle d'exportation de données est peut-être mal configurée.
1. Vérifiez que le LAW a collecté de nouveaux logs au cours des deux dernières heures.

Consultez la [FAQ sur le dépannage de l'exportation de données][20] de Microsoft pour plus d'informations.

#### Sélection des logs à exporter {#selecting-which-logs-are-exported}

La règle d'exportation de données vous permet de spécifier quelles tables de logs de votre Log Analytics Workspace sont exportées. Modifiez la règle d'exportation de données pour ajouter ou supprimer des tables.

#### Latence attendue {#expected-latency}

Les journaux LAW apparaissent généralement dans Datadog en deux à cinq minutes, mais peuvent mettre jusqu'à 20 minutes avant d'apparaître pour la première fois. Les journaux LAW peuvent avoir des propriétés différentes de celles des journaux non-LAW.

## Architecture {#architecture}

### Services utilisés {#services-used}

- Les jobs [Azure Container Apps][8] exécutent le plan de contrôle, qui découvre les ressources dans vos abonnements Azure, adapte le nombre de Forwarders de journaux et configure les paramètres de diagnostic sur les ressources détectées.
- Les jobs Azure Container Apps exécutent également les Forwarders de journaux, qui collectent les journaux de ressources générés par les paramètres de diagnostic, suivent les journaux qui ont été traités et les soumettent à Datadog.
- [Azure Storage Accounts][9] sont utilisés pour stocker les journaux générés par vos ressources, ainsi qu'un petit cache de métadonnées telles que les ID d'abonnement, les ID de ressource et les régions.

### Architecture de haut niveau {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Diagramme d'architecture montrant trois composants principaux du transfert automatique de journaux Azure : le plan de contrôle et le Forwarder de journaux (déployés par Datadog dans les environnements clients) se connectant aux ressources Azure" style="width:100%">}}

Le modèle de déploiement configure un [plan de contrôle](#control-plane) et des [Forwarders de journaux](#log-forwarders) dans vos abonnements sélectionnés.

#### Plan de contrôle {#control-plane}

Le plan de contrôle se compose d'un ensemble de jobs Azure Container Apps et d'un compte de stockage pour la mise en cache. Un plan de contrôle est déployé dans votre abonnement choisi et effectue les tâches suivantes :
- Découverte des ressources dans vos abonnements choisis capables de journaliser via les paramètres de diagnostic.
- Configuration automatique des paramètres de diagnostic sur les ressources découvertes pour acheminer le flux de journaux vers un compte de stockage suivi par les Forwarders de journaux.
- Mise à l'échelle des Forwarders de journaux dans les régions où se trouvent vos ressources, pour leur permettre de s'adapter dynamiquement au volume de journaux.

#### Forwarders de journaux {#log-forwarders}

Les Forwarders de journaux se composent d'un job Azure Container Apps et d'un compte de stockage pour les journaux. Ils sont déployés par le plan de contrôle dans chaque abonnement que vous sélectionnez pour le transfert de journaux. Le nombre de Forwarders de journaux déployés par abonnement s'adapte en fonction du volume de journaux générés par vos ressources. Les Forwarders de journaux effectuent les tâches suivantes :
- Stocker temporairement les journaux générés par les paramètres de diagnostic de vos ressources dans un compte de stockage.
- Traiter les journaux stockés et les transférer vers Datadog.

Dans Azure, les paramètres de diagnostic d'une ressource ne peuvent cibler que des comptes de stockage situés dans la même région. Par conséquent, les Forwarders sont lancés dans chaque région où se trouvent des ressources dotées de paramètres de diagnostic.

Consultez la page [Paramètres de diagnostic dans Azure Monitor][13] d'Azure pour plus d'informations.

### Architecture détaillée {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagramme de workflow montrant le transfert automatisé de logs Azure : le plan de contrôle découvre les ressources, met à l'échelle les transmetteurs de logs entre les régions, configure les paramètres de diagnostic pour envoyer les logs vers des comptes de stockage, puis les Container Apps vérifient et transfèrent les nouveaux logs vers Datadog Log Management." style="width:100%">}}

### Security et autorisations {#security-and-permissions}

Le modèle ARM accorde au plan de contrôle uniquement les autorisations nécessaires pour gérer les Forwarders et configurer les paramètres de diagnostic sur vos ressources. Pour y parvenir, des groupes de ressources sont créés et des autorisations sont accordées lors du déploiement du modèle ARM. Après cela, vous pouvez ajouter des autorisations pour d'autres abonnements en redéployant le modèle ARM.

#### Autorisations utilisées {#permissions-used}

- Rôle [Monitoring Reader][22] au niveau de l’**abonnement** pour les abonnements sélectionnés.
   - Ceci est nécessaire pour lister les ressources dans les abonnements sélectionnés.

- Rôle [Monitoring Contributor][10] au niveau de l’**abonnement** pour les abonnements sélectionnés.
   - Ceci est nécessaire pour découvrir les ressources avec des paramètres de diagnostic disponibles et activer la sortie des journaux vers le stockage.

- Rôle [Contributor][11] au niveau du **groupe de ressources**, pour les groupes de ressources de transfert de journaux dans les abonnements sélectionnés.
   - Ceci est nécessaire pour gérer (créer et supprimer) les comptes de stockage des Forwarders et les jobs Container Apps.

- Rôle [Reader and Data Access][23] au niveau du **groupe de ressources**, pour les groupes de ressources de transfert de journaux dans les abonnements sélectionnés.
   - Ceci est nécessaire pour créer des paramètres de diagnostic qui envoient des journaux aux comptes de stockage des Forwarders, ce qui nécessite l'autorisation `listKeys` sur ces comptes de stockage.

- Rôle [Container Apps Jobs Contributor][24] au niveau du **groupe de ressources du plan de contrôle**.
   - Ceci est nécessaire pour mettre à jour les jobs Container Apps du plan de contrôle. Les déploiements avec un plan de contrôle d'application de fonction utilisent plutôt le rôle [Website Contributor][12].

Aucune information sur vos ressources n'est exportée. Datadog demande uniquement les informations nécessaires pour activer la sortie des journaux, et la seule sortie de cette architecture est constituée des journaux envoyés à Datadog.

**Remarque** : Vous pouvez éventuellement autoriser le plan de contrôle à envoyer ses propres métriques d'intégrité, journaux et événements à Datadog à des fins de débogage. Pour ce faire, définissez la variable d'environnement `DD_TELEMETRY=true` sur n'importe quel job Container Apps dans le plan de contrôle. Pour un plan de contrôle d'application de fonction, définissez-la sur n'importe quelle application de fonction.

{{% azure-log-archiving %}}

## Désinstallez {#uninstall}

Commencez par ouvrir un [Azure Cloud Shell][5] et assurez-vous qu'il s'exécute dans Azure CLI/Bash, et non dans PowerShell.

Téléchargez et exécutez le script de désinstallation :
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

Le script détecte d'abord toutes les instances en cours d'exécution dans chaque abonnement, puis vous invite à sélectionner la ou les instances à désinstaller. Confirmez les suppressions de ressources et attendez que les ressources soient supprimées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/getting_started/site/
[5]: https://learn.microsoft.com/en-us/azure/cloud-shell/overview
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings
[14]: https://app.datadoghq.com/integrations/azure/add?config_azure-new-onboarding=true
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /fr/getting_started/integrations/azure/#resource-tag-filtering-for-logs
[22]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/monitor#monitoring-reader
[23]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#reader-and-data-access
[24]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/containers#container-apps-jobs-contributor
[25]: https://github.com/DataDog/integrations-management/tree/main/azure/lfo_container_app_migration