---
aliases:
- /fr/logs/guide/azure-logging-guide/
- /fr/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Meilleures pratiques pour surveiller les journaux de la plateforme Microsoft
    Azure
title: Configuration du transfert de journaux automatisé Azure
---
## Aperçu {#overview}

Utilisez ce guide pour configurer et gérer l'envoi automatique des journaux Azure. Vous pouvez configurer l'envoi des journaux directement dans Datadog ou le déployer avec un modèle de gestion des ressources Azure (ARM).

Le modèle ARM déploie des ressources à partir d'une série de services Azure (comptes de stockage et applications de fonction) dans vos abonnements, qui collectent et transmettent les journaux à Datadog. Ces services s'adaptent automatiquement à la hausse ou à la baisse en fonction du volume des journaux. L'évolutivité est gérée par un plan de contrôle, qui est un ensemble d'applications de fonction déployées dans un abonnement et une région de votre choix. Les comptes de stockage et les applications de fonction sont déployés dans chacun des abonnements et servent à transmettre les journaux à Datadog.

**Tous les sites** : Le transfert de journaux automatisé est disponible sur tous les [sites Datadog][4].

**Environnements Azure pris en charge** : Le transfert de journaux automatisé ne prend en charge que le cloud commercial (public) Azure. Azure Government et Azure China ne sont pas pris en charge. Si vous utilisez des sites gouvernementaux Datadog, vous ne pouvez utiliser cette fonctionnalité qu'avec des charges de travail dans le cloud commercial Azure.

## Comment choisir entre la configuration automatique et manuelle {#how-to-choose-between-automated-and-manual-setup}

Choisissez la méthode de configuration manuelle si vous souhaitez :
   - appliquer des balises personnalisées à vos ressources

Utilisez la méthode de configuration automatique si vous souhaitez :
   - automatiser le déploiement via le portail Azure
   - gérer votre infrastructure via des modèles déclaratifs
   - contrôler de manière centralisée l'accès, les balises et la facturation
   - redéployez vos ressources dans le bon ordre et de manière cohérente
   - Réduisez vos coûts en utilisant un compte de stockage plutôt qu'un hub d'événements.

## Configuration {#setup}

### Configurer le transfert de journaux {#configure-log-forwarding}

Utilisez le flux **Configurer le transfert de journaux** pour configurer de nouveaux transmetteurs de journaux ou gérer ceux existants directement dans Datadog. Vous pouvez utiliser ce flux pour déployer le transfert de journaux automatisé depuis le début ou mettre à jour une configuration existante, comme ajouter ou supprimer des abonnements ou modifier des filtres de journaux.

1. Dans Datadog, naviguez vers [{{< ui >}}Integrations > Azure{{< /ui >}}][16].
1. Cliquez sur {{< ui >}}Configure Log Forwarding{{< /ui >}}.
1. Choisissez de déployer une nouvelle configuration ou de mettre à jour une configuration existante.
1. Copiez la commande fournie et collez-la dans votre Azure Cloud Shell.
1. Sélectionnez les abonnements à partir desquels transférer des journaux.
1. Optionnellement, ajoutez ou supprimez des filtres de journaux.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Modèle ARM {#arm-template}

Alternativement, vous pouvez déployer le transfert de journaux automatisé avec un [modèle ARM public Azure][1]. Les sections ci-dessous fournissent des instructions pour compléter chaque page du modèle.

#### Bases {#basics}

1. Sous {{< ui >}}Project details{{< /ui >}}, sélectionnez le groupe de gestion. Ceci est nécessaire pour que le modèle ARM accorde des permissions aux abonnements que vous sélectionnez pour le transfert de journaux automatisé.
2. Sous {{< ui >}}Instance details{{< /ui >}}, sélectionnez des valeurs :
   - {{< ui >}}Region{{< /ui >}}. C'est ici que le plan de contrôle est déployé.
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}. Ce sont les abonnements à configurer pour le transfert de journaux.
   - {{< ui >}}Control Plane Subscription{{< /ui >}}. C'est l'abonnement auquel le plan de contrôle est déployé.
   - {{< ui >}}Resource Group Name{{< /ui >}}. C'est le groupe de ressources à utiliser par le plan de contrôle. Il est recommandé de choisir un nouveau nom de groupe de ressources inutilisé pour simplifier la gestion des services du plan de contrôle.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="La page de base du modèle ARM pour le transfert de journaux automatisé Azure." popup="true" style="width:100%">}}

3. Cliquez {{< ui >}}Next{{< /ui >}}.

#### Configuration de Datadog {#datadog-configuration}

1. Entrez la valeur de votre [clé API Datadog][2].
2. Sélectionnez votre [site Datadog][4].

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="La page de configuration de Datadog du modèle ARM pour le transfert de journaux automatisé Azure." popup="true" style="width:100%">}}

3. Cliquez {{< ui >}}Next{{< /ui >}}.

#### Déploiement {#deployment}

1. Cochez la case pour valider les avertissements de déploiement.
2. Cliquez {{< ui >}}Review + create{{< /ui >}}.

#### Examiner + créer {#review-create}

1. Examinez les détails de déploiement finalisés.
2. Cliquez {{< ui >}}Create{{< /ui >}}.

## Filtrage des balises de ressources {#resource-tag-filtering}

Vous pouvez utiliser des filtres de balises pour contrôler quelles ressources Azure ont leurs journaux transférés vers Datadog. Pour la syntaxe des filtres de balises, le support des jokers et des exemples, voir [Filtrage des balises de ressources][21] dans le guide de démarrage d'Azure.

## Espaces de travail Log Analytics {#log-analytics-workspaces}

Vous pouvez transférer des journaux des Espaces de travail Log Analytics Azure (LAWs) vers Datadog via le transmetteur de journaux automatisé. Auparavant, Datadog ne supportait que les journaux des [paramètres de diagnostic][13] des LAWs. Avec les [règles d'exportation de données][17], vous pouvez également transférer des journaux des tables de journaux LAW vers Datadog.

### Restrictions {#restrictions}

- Vous ne pouvez configurer le transfert que pour les ressources LAW situées dans la même région que le transmetteur de journaux.
- Vous pouvez avoir un maximum de 10 règles d'exportation de données sur un LAW. Si le LAW n'a plus de capacité pour une règle d'exportation de données, supprimez une règle existante pour faire de la place.
- Toutes les tables de journaux ne peuvent pas être exportées. Voir la liste de Microsoft des [tables non prises en charge][18].

### Transférer des journaux d'un espace de travail Log Analytics {#forward-logs-from-a-log-analytics-workspace}

1. Si vous n'avez pas encore créé de transmetteur de journaux automatisé, suivez les instructions de [Configuration](#setup). Si vous avez déjà un transmetteur de journaux, assurez-vous qu'il est mis à jour vers la dernière version.
2. Dans le [Portail Azure][19], accédez à l'espace de travail Log Analytics souhaité.
3. Sous {{< ui >}}Settings{{< /ui >}}, cliquez sur {{< ui >}}Data export{{< /ui >}}.
4. Cliquez sur {{< ui >}}New export rule{{< /ui >}}.
5. Nommez la règle, vérifiez {{< ui >}}Enable upon creation{{< /ui >}}, et cliquez sur {{< ui >}}Next{{< /ui >}}.
6. Sélectionnez les tables à exporter. Vous pouvez modifier cette sélection plus tard en éditant la règle d'exportation des données. Cliquez sur {{< ui >}}Next{{< /ui >}}.
7. Pour {{< ui >}}Destination type{{< /ui >}}, sélectionnez {{< ui >}}Storage Account{{< /ui >}}. Sélectionnez l'abonnement contenant votre transmetteur de journaux, et choisissez un compte de stockage pour le transmetteur de journaux. Ces comptes ont généralement le préfixe `ddlogstorage`. Cliquez sur {{< ui >}}Next{{< /ui >}}.
8. Examinez la règle et cliquez sur {{< ui >}}Create{{< /ui >}}. Les journaux du LAW commencent à apparaître dans Datadog dans quelques minutes.

### Dépannage {#troubleshooting}

#### Les journaux n'apparaissent pas dans Datadog {#logs-are-not-appearing-in-datadog}

Si vous avez créé une règle d'exportation des données mais que vous ne voyez pas de journaux dans Datadog :

1. Vérifiez que la règle d'exportation des données est activée.
1. Vérifiez que le compte de stockage de destination est celui créé par le transmetteur de journaux automatisé (le nom commence généralement par `ddlogstorage`).
1. Dans le compte de stockage, inspectez les conteneurs. Les conteneurs avec le préfixe `am-` indiquent des exportations LAW. Si vous ne voyez que des conteneurs avec le préfixe `insights-`, la règle d'exportation des données peut être mal configurée.
1. Vérifiez que le LAW a collecté de nouveaux journaux au cours des deux dernières heures.

Consultez la [FAQ de dépannage de l'exportation des données][20] de Microsoft pour des informations supplémentaires.

#### Sélection des journaux à exporter {#selecting-which-logs-are-exported}

La règle d'exportation des données vous permet de spécifier quelles tables de journaux de votre espace de travail Log Analytics sont exportées. Modifiez la règle d'exportation des données pour ajouter ou supprimer des tables.

#### Latence attendue {#expected-latency}

Les journaux LAW apparaissent généralement dans Datadog dans un délai de deux à cinq minutes, mais peuvent prendre jusqu'à 20 minutes pour apparaître pour la première fois. Les journaux LAW peuvent avoir des propriétés différentes de celles des journaux non-LAW.

## Architecture {#architecture}

### Services utilisés {#services-used}

- [Les applications Azure Function][15] sont utilisées pour découvrir des ressources dans vos abonnements Azure, faire évoluer les transmetteurs de journaux et configurer les paramètres de diagnostic sur les ressources détectées.
- [Azure Container Apps][8] sont utilisées pour collecter les journaux de ressources générés par les paramètres de diagnostic, suivre ceux qui ont déjà été traités et les soumettre à Datadog.
- [Les comptes de stockage Azure][9] sont utilisés pour stocker les journaux générés par vos ressources, ainsi qu'un petit cache de métadonnées telles que les ID d'abonnement, les ID de ressources et les régions.

### Architecture de haut niveau {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="Diagramme d'architecture montrant trois composants principaux de l'acheminement automatisé des journaux Azure : le plan de contrôle et le transmetteur de journaux (déployé par Datadog dans les environnements des clients) se connectant aux ressources Azure." style="width:100%">}}

Le modèle de déploiement configure un [plan de contrôle](#control-plane) et [des transmetteurs de journaux](#log-forwarders) dans vos abonnements sélectionnés.

#### Plan de contrôle {#control-plane}

Le plan de contrôle est un ensemble d'Azure Function apps et d'un compte de stockage pour la mise en cache. Un plan de contrôle est déployé dans votre abonnement choisi et effectue les tâches suivantes :
- Découverte des ressources dans vos abonnements choisis capables de générer des journaux via les paramètres de diagnostic.
- Configuration automatique des paramètres de diagnostic sur les ressources découvertes pour acheminer les journaux vers un compte de stockage suivi par les transmetteurs de journaux.
- Mise à l'échelle des transmetteurs de journaux dans les régions où se trouvent vos ressources, leur permettant d'ajuster dynamiquement le volume des journaux.

#### Transmetteurs de journaux {#log-forwarders}

Les transmetteurs de journaux se composent d'un job Azure Container Apps et d'un compte de stockage pour les journaux. Ils sont déployés par le plan de contrôle dans chaque abonnement que vous sélectionnez pour l'acheminement des journaux. Le nombre de transmetteurs de journaux déployés par abonnement évolue en fonction du volume de journaux générés par vos ressources. Les transmetteurs de journaux effectuent les tâches suivantes :
- Stocker temporairement les journaux générés par les paramètres de diagnostic de vos ressources dans un compte de stockage.
- Traiter les journaux stockés et les transmettre à Datadog.

Dans Azure, les paramètres de diagnostic d'une ressource ne peuvent cibler que les comptes de stockage dans la même région. Ainsi, les transmetteurs sont déployés dans chaque région où des ressources avec des paramètres de diagnostic existent.

Consultez la page [Paramètres de diagnostic dans Azure Monitor][13] d'Azure pour plus d'informations.

### Architecture détaillée {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Diagramme de flux de travail montrant le transfert automatisé de journaux Azure : le plan de contrôle découvre les ressources, met à l'échelle les transmetteurs de journaux dans les régions, configure les paramètres de diagnostic pour envoyer les journaux aux comptes de stockage, puis les Container Apps vérifient et transmettent les nouveaux journaux à Datadog Log Management." style="width:100%">}}

### Sécurité et autorisations {#security-and-permissions}

Le modèle ARM accorde au plan de contrôle uniquement les autorisations nécessaires pour gérer les transmetteurs de journaux et appliquer les paramètres de diagnostic sur vos ressources. Pour ce faire, des groupes de ressources sont créés et des autorisations sont accordées lors du déploiement du modèle ARM. Après cela, vous pouvez ajouter des autorisations pour d'autres abonnements en redéployant le modèle ARM.

#### Autorisations utilisées {#permissions-used}

- [Contributeur en surveillance][10] rôle au niveau de l'**abonnement** pour les abonnements sélectionnés.
   - Ceci est nécessaire pour découvrir des ressources avec des paramètres de diagnostic disponibles et activer la sortie des journaux vers le stockage.

- [Contributeur][11] rôle au niveau du **groupe de ressources**, pour les groupes de ressources de transfert de journaux dans les abonnements sélectionnés.
   - Cela est nécessaire pour gérer (créer et supprimer) les comptes de stockage des transmetteurs de journaux et les jobs Container Apps.

- Rôle de [Contributeur de site Web][12] au niveau du **groupe de ressources du plan de contrôle**, pour mettre à jour les Function Apps du plan de contrôle.

Aucune information sur vos ressources n'est exportée. Datadog ne demande que les informations nécessaires pour activer la sortie des journaux, et la seule sortie de cette architecture est les journaux envoyés à Datadog.

**Remarque** : En option, vous pouvez activer le plan de contrôle pour soumettre ses propres métriques de santé, journaux et événements à Datadog à des fins de débogage. Pour ce faire, définissez la variable d'environnement `DD_TELEMETRY=true` sur toute Function App ou Container App du plan de contrôle.

{{% azure-log-archiving %}}

## Désinstaller {#uninstall}

Commencez par ouvrir un [Azure Cloud Shell][5], et assurez-vous qu'il fonctionne en Azure CLI/Bash, pas en PowerShell.

Téléchargez et exécutez le script de désinstallation :
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

Le script découvre d'abord toutes les instances en cours d'exécution dans chaque abonnement, puis vous invite à sélectionner les instances à désinstaller. Confirmez les suppressions de ressources et attendez que les ressources soient supprimées.

## Lectures complémentaires {#further-reading}

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
[15]: https://learn.microsoft.com/azure/azure-functions/
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /fr/getting_started/integrations/azure/#resource-tag-filtering-for-logs