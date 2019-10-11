---
aliases:
  - /fr/guides/azure/
  - /fr/integrations/azure_storage/
categories:
  - cloud
  - azure
  - log collection
ddtype: crawler
dependencies: []
description: Recueillez des métriques à partir d'instances et de nombreux services Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/'
    tag: Blog
    text: Comment surveiller des machines virtuelles Azure Microsoft
  - link: 'https://docs.datadoghq.com/integrations/faq/azure-troubleshooting/'
    tag: FAQ
    text: Dépannage Azure
  - link: 'https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/'
    tag: FAQ
    text: "Pourquoi installer l'Agent Datadog sur mes instances cloud\_?"
git_integration_title: azure
has_logo: true
integration_title: Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure
public_title: "Intégration Datadog/Microsoft\_Azure"
short_description: Recueillez des métriques à partir d'instances et de nombreux services Azure.
version: '1.0'
---
## Présentation

Associez Microsoft Azure pour :

* Obtenir des métriques sur des machines virtuelles Azure sans avoir nécessairement à installer l'Agent
* Appliquer un tag à vos machines virtuelles Azure comportant des informations spécifiques à Azure (p. ex, la localisation)
* Recueillir des métriques d'autres services : Application Gateway, App Service (Web et mobile), Batch Service, Event Hubs, IoT Hub, Logic App, Redis Cache, Server Farm (plan App Service), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, et bien d'autres encore.

Les intégrations connexes comprennent :

| Intégration                     | Description                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][41]         | Un service qui fournit des modèles de données dans le cloud.                                                         |
| [API Management][42]            | Un service pour publier, sécuriser, transformer, protéger et surveiller les API.                                      |
| [App Service][7]                | Un service de déploiement et de mise à l'échelle d'applications Web, mobiles, API et de logique métier                      |
| [Environnement APP Service][70]   | Un service qui fournit un environnement pour l'exécution sécurisée de vos applications App Service à grande échelle.               |
| [Plan App Service][69]          | Un ensemble de ressources de calcul nécessaires à l'exécution d'une application Web.                                                          |
| [Application Gateway][56]       | Un équilibreur de charge du trafic Web qui vous permet de gérer le trafic vers vos applications Web.                  |
| [Automation][43]                | Un service conçu pour faciliter la gestion de la configuration et l'automatisation au sein de vos environnements.                 |
| [Batch Service][8]              | Un planificateur et processeur de tâches gérés                                                                      |
| [Cognitive Services][44]        | Un ensemble d'API, de SDK et de services mis à votre disposition pour vous permettre de créer des applications sans connaissances en intelligence artificielle ou en science des données.       |
| [Container Instances][45]       | Un service qui vous permet de déployer des conteneurs sans avoir à approvisionner ou gérer l'infrastructure sous-jacente.     |
| [Container Service][52]         | Un cluster Kubernetes, DC/OS ou Docker Swarm prêt pour la production.                                            |
| [Cosmos DB][46]                 | Une base de données qui prend en charge les modèles de données clé/valeur, en colonnes, document et graphique.                   |
| [Customer Insights][47]         | Permet aux organisations de regrouper des jeux de données pour bénéficier d'une vue globale sur leurs clients.                |
| [Data Factory][48]              | Un service qui permet de composer des services de stockage, de déplacement et de traitement des données au sein de pipelines de données automatisés.       |
| [Data Lake Analytics][49]       | Un service d'analyse qui simplifie le traitement des tâches de Big Data.                                                        |
| [Data Lake Store][50]           | Une solution Data Lake sans limite qui améliore l'analytique Big Data.                                                     |
| [Database for MariaDB][51]      | Un service qui fournit une base de données MariaDB avec une communauté entièrement gérée et prête pour l'entreprise.                       |
| [Event Grid][54]                | Un service pour gérer le routage des événements qui permet une consommation d'événements uniforme à l'aide d'un modèle pub/sub.       |
| [Event Hubs][9]                  | Un service géré de flux de données à grande échelle                                                                   |
| [ExpressRoute][57]              | Un service pour étendre vos réseaux locaux dans le cloud.                                             |
| [HDInsights][55]                | Un service cloud conçu pour traiter d'importants volumes de données.                                                   |
| [IOT Hub][10]                   | Connexion, surveillance et gestion de milliards de ressources IoT                                                       |
| [Key Vault][53]                 | Un service qui protège et gère les clés de chiffrement et les secrets utilisés par les services et applications cloud. |
| [Load Balancer][58]             | Permet de mettre à l'échelle vos applications et d'assurer la haute disponibilité de vos services.                                    |
| [Logic App][11]                 | Conception de solutions d'intégration puissantes                                                                      |
| [Network Interfaces][59]        | Permet la mise en communication d'une machine virtuelle avec Internet, Azure et des ressources locales.                                 |
| [Notification Hubs][61]         | Un moteur de notifications Push qui vous permet d'envoyer des notifications vers toutes les plateformes depuis n'importe quel backend.                     |
| [Public IP Address][60]         | Une ressource qui permet d'effectuer des communications entrantes et une connectivité sortante à partir d'Internet.                |
| [Redis Cache][12]               | Cache de données géré                                                                                        |
| [Relay][62]                     | Permet l'exposition sécurisée des services exécutés dans votre réseau d'entreprise sur le cloud public.                          |
| [Search][63]                    | Un service de recherche basé sur le cloud qui fournit des outils permettant d'ajouter une expérience de recherche riche.             |
| Stockage                         | Stockage d'[objets blob][65], de [fichiers][66], de [files d'attente][67] et de [tables][68].                                      |
| [Stream Analytics][64]          | Un moteur de traitement d'événements pour analyser d'importants volumes de données diffusées à partir d'appareils.                        |
| [SQL Database][14]              | Base de données relationnelle fortement évolutive dans le cloud                                                          |
| [SQL Database Elastic Pool][15] | Gestion des performances de plusieurs bases de données                                                              |
| [Virtual Machine][16]           | Service de gestion de machines virtuelles                                                                        |
| [Virtual Machine Scale Set][17] | Déploiement, gestion et mise à l'échelle automatique d'un ensemble de machines virtuelles identiques                                                      |

## Implémentation
### Installation

Intégrez votre compte Microsoft Azure à Datadog à l'aide de l'outil d'interface de ligne de commande Azure ou du portail Azure. Cette méthode d'intégration fonctionne automatiquement sur tous les clouds Azure : Public, Chine, Allemagne et Government. Suivez les instructions ci-dessous afin que Datadog détecte automatiquement le type de cloud que vous utilisez pour terminer l'intégration.

#### Intégration via l'interface de ligne de commande Azure

Afin d'intégrer Datadog à Azure à l'aide de l'interface de ligne de commande Azure, assurez-vous que [celle-ci est bien installée][6].

{{< tabs >}}
{{% tab "CLI Azure v2.0" %}}

Commencez par vous connecter au compte Azure que vous souhaitez intégrer à Datadog :
```text
az login
```

Exécutez la commande « account show » :
```text
az account show
```

Saisissez la valeur `Tenant ID` générée dans le [carré d'intégration Azure de Datadog][1], sous **Tenant name/ID**.

Créez une application en tant que service principal à l'aide du format :
```text
az ad sp create-for-rbac --role reader --scopes /subscriptions/{id_abonnement}
```

* Cette commande accorde au service principal le rôle `reader` pour l'abonnement que vous souhaitez surveiller.
* La valeur `appID` générée à partir de cette commande doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.
* Ajoutez `--name <NOM_PERSONNALISÉ>` pour utiliser un nom personnalisé. Autrement, Azure générera un nom unique. Le nom n'est pas utilisé dans le processus de configuration.
* Ajoutez `--password <MOTDEPASSE_PERSONNALISÉ>` pour utiliser un mot de passe personnalisé. Autrement, Azure générera un mot de passe unique. Ce mot de passe doit être saisi dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**.

[1]: https://app.datadoghq.com/account/settings#integrations/azure

{{< tabs >}}
{{% tab "CLI Azure v1.0" %}}

Commencez par vous connecter au compte Azure que vous souhaitez intégrer à Datadog :
```text
azure login
```

Exécutez la commande « account show » :
```text
az account show
```

Saisissez la valeur `Tenant ID` générée dans le [carré d'intégration Azure de Datadog][1], sous **Tenant name/ID**.

Créez un nom et un mot de passe :
```text
azure ad sp create -n <NOM> -p <MOTDEPASSE>
```

* Le `<NOM>` n'est PAS utilisé et est seulement requis dans le cadre du processus de configuration.
* Le `<MOTDEPASSE>` choisi doit être saisi dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**.
* La valeur `Object Id` renvoyée par cette commande est utilisée pour `<ID_OBJET>` dans la prochaine commande.

Créez une application en tant que service principal à l'aide du format :
```text
azure role assignment create --objectId <ID_OBJET> -o Reader -c /subscriptions/<ID_ABONNEMENT>/
```

* Cette commande accorde au service principal le rôle `reader` pour l'abonnement que vous souhaitez surveiller.
* La valeur `Service Principal Name` générée à partir de cette commande doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.
* `<ID_ABONNEMENT>` correspond à l'abonnement Azure que vous souhaitez surveiller et est représenté par `ID` dans `azure account show` ou sur le portail.

[1]: https://app.datadoghq.com/account/settings#integrations/azure

{{< tabs >}}
{{% tab "CLI Azure antérieures à la v1.0" %}}

Commencez par vous connecter au compte Azure que vous souhaitez intégrer à Datadog :
```text
azure login
```

Exécutez la commande « account show » :
```text
az account show
```

Saisissez la valeur `Tenant ID` générée dans le [carré d'intégration Azure de Datadog][1], sous **Tenant name/ID**.

Créez un nom, home-page, identifier-uris et mot de passe :
```text
azure ad app create --name "<NOM>" --home-page "<URL>" --identifier-uris "<URL>" --password "<MOTDEPASSE>"
```

* Les valeurs `name`, `home-page` et `identifier-uris` ne sont PAS utilisées et sont seulement requises dans le cadre du processus de configuration.
* Le `password` que vous choisissez doit être saisi dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**.
* La valeur `AppId` renvoyée par cette commande est utilisée dans la prochaine commande et doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.

Créez un service principal avec :

Pour les interfaces de ligne de commande Azure < 0.10.2 :
```text
azure ad sp create {app-id}
```

Pour les interfaces de ligne de commande Azure >= 0.10.2 :
```text
azure ad sp create -a {app-id}
```

* La valeur `Object Id` renvoyée par cette commande est utilisée pour `<ID_OBJET>` dans la prochaine commande.

Créez une application Active Directory à l'aide du format :
```text
azure role assignment create --objectId <ID_OBJET> --roleName Reader --subscription <ID_ABONNEMENT>
```

* Cette commande accorde au service principal le rôle `reader` pour l'abonnement que vous souhaitez surveiller.
* `<ID_ABONNEMENT>` correspond à l'abonnement Azure que vous souhaitez surveiller et est représenté par `ID` dans `azure account show` ou sur le portail.


[1]: https://app.datadoghq.com/account/settings#integrations/azure

{{% /tab %}}
{{< /tabs >}}

#### Intégration via le portail Azure

1. [Créez une application Web](#creer-l-application-web) dans votre Active Directory et envoyez les bons identifiants à Datadog.
2. [Donnez à cette application une autorisation de lecture](#donner-des-autorisations-de-lecture-a-l-application) pour tous les abonnements que vous souhaitez surveiller.

##### Créer l'application Web

1. Sous **Azure Active Directory**, accédez à **Inscriptions d'applications** et cliquez sur **Nouvelle inscription** :

2. Saisissez les informations suivantes et cliquez sur le bouton **Créer**. **Remarque** : le nom et l'URL de connexion ne sont pas utilisés et sont seulement requis dans le cadre du processus de configuration. 
  * Nom : `Datadog Auth`
  * Types de compte pris en charge : `Accounts in this organizational directory only (Datadog)`
  * URI de redirection (facultatif) : `https://app.datadoghq.com`

{{< img src="integrations/azure/Azure_create_ad.png" alt="création d'app Azure" responsive="true" popup="true" style="width:80%;" >}}

##### Accorder un accès en lecture à l'application

1. Accédez à la section **Abonnements** en utilisant la barre de recherche ou depuis la barre latérale de gauche :

    {{< img src="integrations/azure/subscriptions_icon.png" alt="icône abonnements" responsive="true" popup="true" style="width:25%">}}

2. Cliquez sur l'abonnement que vous souhaitez surveiller.
3. Sélectionnez **Contrôle d'accès (IAM)** dans le menu d'abonnement, puis **Ajouter** -> **Ajouter une attribution de rôle** :

    {{< img src="integrations/azure/azure-add-role.png" alt="Ajouter une attribution de rôle" responsive="true" popup="true" style="width:80%">}}

4. Pour **Rôle**, sélectionnez *Lecteur*. Sous **Sélectionner**, choisissez le nom de l'application que vous avez créée :

    {{< img src="integrations/azure/azure-select-role-app.png" alt="Sélection du rôle et de l'app" responsive="true" popup="true" style="width:60%">}}

5. Cliquez sur **Enregistrer**.
6. Répétez ce processus pour tout autre abonnement que vous souhaitez surveiller à l'aide de Datadog. **Remarque** : les utilisateurs d'Azure Lighthouse peuvent ajouter les abonnements des locataires des clients.

**Remarque** : les diagnostics doivent être activés pour que les machines virtuelles déployées avec ARM puissent recueillir des métriques. Consultez la section [Activer les diagnostics][3].

##### Terminer l'intégration

1. Dans **Inscriptions d'applications**, sélectionnez l'application que vous avez créée, copiez les valeurs **ID d'application** et **ID de locataire*, puis collez-les dans le [carré d'intégration Azure de Datadog][1], sous **Client ID** et **Tenant ID**.

2. Pour cette même application, accédez à **Gérer** -> **Certificats et secrets**.
3. Ajoutez un nouveau *Clé secrète client* intitulée `datadogClientSecret`, sélectionnez un intervalle pour *Date d'expiration* et cliquez sur **Ajouter** :

    {{< img src="integrations/azure/Azure_client_secret.png" alt="client secret azure" responsive="true" popup="true" style="width:80%">}}

3. Une fois la valeur de la clé indiquée, collez-la dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**, puis cliquez sur **Install Integration** ou **Update Configuration**.

### Configuration

Vous pouvez choisir de limiter le nombre de machines virtuelles qui sont transmises à Datadog en ajoutant des tags sous **Optionally filter to VMs with tag**.

Cette liste de tags séparés par des virgules au format `<KEY>:<VALUE>` définit un filtre utilisé lors de la collecte de métriques. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés. Seules les machines virtuelles qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres machines virtuelles sont ignorées. Ajoutez `!` devant un tag pour exclure les machines virtuelles correspondant à ce tag. Par exemple : 

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Collecte de métriques

Une fois le carré d'intégration configuré, les métriques sont recueillies par un crawler. Pour recueillir des métriques supplémentaires, déployez l'Agent Datadog sur vos machines virtuelles :

#### Installation de l'Agent

1. Dans le [portail Azure][2], accédez à *Machine virtuelle -> Paramètres -> Extensions -> Ajouter* et sélectionnez l'Agent Datadog.
2. Cliquez sur **Créer**, saisissez votre [clé d'API Datadog][37] et cliquez sur **OK**.

Pour effectuer l'installation de l'Agent en fonction du système d'exploitation ou de l'outil CICD, consultez les [instructions d'installation de l'Agent Datadog][18] au sein de l'application.

#### Validation

Vous devrez peut-être patienter quelques minutes avant que les métriques des applications apparaissent sous le nouvel abonnement.

Accédez au [dashboard par défaut des machines virtuelles Azure][5] pour visualiser les données de votre infrastructure, qui s'ajoutent automatiquement au dashboard.

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Screenboard machines virtuelles azure" responsive="true" popup="true" style="width:70%">}}

### Collecte de logs

{{< tabs >}}
{{% tab "Event Hubs" %}}

Pour recueillir des logs à partir de l'ensemble de vos services Azure sauf App Services, suivez cette méthode globale :

1. Créez un [Azure Event Hub][1] depuis le [portail Azure][2], [Azure CLI][3] ou [Powershell][4]
2. [Configurez la fonction Datadog/Azure](#creer-une-fonction-azure) qui transmet les logs depuis votre Event Hub vers Datadog.
3. [Configurez vos services Azure pour transférer leurs logs au Event Hub][5].

#### Créer une fonction Azure Event Hub

Si vous n'avez jamais utilisé de fonction Azure, consultez la section [Créer votre première fonction à l'aide du portail Azure][6].

1. Dans le [portail Azure][2], accédez à *Applications de fonctions -> Fonctions* et cliquez sur **Nouvelle fonction** :
2. Choisissez de générer votre fonction **Dans le portail** et utilisez le modèle de déclencheur Event Hub (sous **Autres modèles…**). Si besoin, installez l'extension `Microsoft.Azure.WebJobs.Extensions.EventHubs`.
3. Nommez votre fonction sous le champ **Nom**.
4. Sélectionnez ou ajoutez votre **Connexion de l'Event Hub**.
5. Sélectionnez le language JavaScript dans le menu de droite.
6. Sélectionnez le **Groupe de consommateurs Event Hub** et le **Nom de l'Event Hub** à partir desquels vous souhaitez récupérer des logs.
7. Cliquez sur **Créer**.
8. Créez un fichier `index.js` et ajoutez le [code Datadog/Fonction Azure][7] (remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][8]).
9. Enregistrez la fonction.
10. Pour **Intégrer**, définissez **Nom du paramètre d'événement** sur `eventHubMessages`, et cliquez sur **Enregistrer**.
11. Vérifiez que vos logs sont présents dans le [Log Explorer de Datadog][9] pour confirmer que la fonction est bien configurée.

[1]: https://azure.microsoft.com/en-us/services/event-hubs
[2]: https://docs.microsoft.com/en-gb/azure/event-hubs/event-hubs-create
[3]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-cli
[4]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-powershell
[5]: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs
[6]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[7]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[8]: https://app.datadoghq.com/account/settings#api
[9]: https://app.datadoghq.com/logs

{{% /tab %}}

{{% tab "Stockage Blob" %}}

Pour recueillir des logs à partir de l'ensemble de vos services Azure sauf App Services, suivez cette méthode globale :

1. Configurez [Stockage Blob Azure][1] depuis le [portail Azure][2], [Explorer_Stockage_Azure][6], [Azure CLI][3], ou [Powershell][4].
2. [Configurez la fonction Datadog/Azure](#creer-une-fonction-stockage-blob-azure) qui transmet les logs depuis votre stockage blob vers Datadog.
3. [Configurez vos Azure App Services pour transférer leurs logs au Stockage Blob][5].

#### Créer une fonction Stockage Blob Azure

Si vous n'avez jamais utilisé de fonction Azure, consultez la section [Créer votre première fonction à l'aide du portail Azure][7].

1. Dans le [portail Azure][2], accédez à *Applications de fonctions -> Fonctions* et cliquez sur **Nouvelle fonction**.
2. Choisissez de générer votre fonction **Dans le portail** et utilisez le modèle de déclencheur de Stockage Blob (sous **Autres modèles…**). Si besoin, installez l'extension `Microsoft.Azure.WebJobs.Extensions.Storage`.
3. Nommez votre fonction sous le champ **Nom**.
4. Sélectionnez ou ajoutez votre **Connexion du compte de stockage**.
5. Sélectionnez le language JavaScript dans le menu de droite.
6. Cliquez sur **Créer**.
7. Créez un fichier `index.js` et ajoutez le [code Datadog/Fonction Azure][8] (remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][9]).
8. Enregistrez la fonction.
9. Pour **Intégrer**, définissez **Nom du paramètre Blob** sur `blobContent`, et cliquez sur **Save**.
10. Vérifiez que vos logs sont présents dans le [Log Explorer de Datadog][10] pour confirmer que la fonction est bien configurée.

[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[5]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[6]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Données collectées
### Métriques
{{< get-metrics-from-git "azure" >}}


### Événements
L'intégration Azure envoie tous vos événements Azure à votre [flux d'événements][30] Datadog.

### Checks de service
L'intégration Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][40].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: https://portal.azure.com
[3]: https://docs.datadoghq.com/fr/integrations/faq/azure-troubleshooting/#enable-diagnostics
[5]: https://app.datadoghq.com/screen/integration/azure_vm
[6]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[7]: https://docs.datadoghq.com/fr/integrations/azure_app_services
[8]: https://docs.datadoghq.com/fr/integrations/azure_batch
[9]: https://docs.datadoghq.com/fr/integrations/azure_event_hub
[10]: https://docs.datadoghq.com/fr/integrations/azure_iot_hub
[11]: https://docs.datadoghq.com/fr/integrations/azure_logic_app
[12]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache
[14]: https://docs.datadoghq.com/fr/integrations/azure_sql_database
[15]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool
[16]: https://docs.datadoghq.com/fr/integrations/azure_vm
[17]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set
[18]: https://app.datadoghq.com/account/settings#agent
[19]: https://github.com/DataDog/dogweb/blob/prod/integration/azure/azure_metadata.csv
[30]: https://docs.datadoghq.com/fr/graphing/event_stream/
[31]: https://docs.microsoft.com/en-gb/azure/event-hubs/event-hubs-create
[32]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-cli
[33]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-powershell
[34]: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs
[39]: https://azure.microsoft.com/en-us/services/event-hubs
[40]: https://docs.datadoghq.com/fr/help
[41]: https://docs.datadoghq.com/fr/integrations/azure_analysis_services
[42]: https://docs.datadoghq.com/fr/integrations/azure_api_management
[43]: https://docs.datadoghq.com/fr/integrations/azure_automation
[44]: https://docs.datadoghq.com/fr/integrations/azure_cognitive_services
[45]: https://docs.datadoghq.com/fr/integrations/azure_container_instances
[46]: https://docs.datadoghq.com/fr/integrations/azure_cosmosdb
[47]: https://docs.datadoghq.com/fr/integrations/azure_customer_insights
[48]: https://docs.datadoghq.com/fr/integrations/azure_data_factory
[49]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_analytics
[50]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_store
[51]: https://docs.datadoghq.com/fr/integrations/azure_db_for_mariadb
[52]: https://docs.datadoghq.com/fr/integrations/azure_container_service
[53]: https://docs.datadoghq.com/fr/integrations/azure_key_vault
[54]: https://docs.datadoghq.com/fr/integrations/azure_event_grid
[55]: https://docs.datadoghq.com/fr/integrations/azure_hd_insight
[56]: https://docs.datadoghq.com/fr/integrations/azure_application_gateway
[57]: https://docs.datadoghq.com/fr/integrations/azure_express_route
[58]: https://docs.datadoghq.com/fr/integrations/azure_load_balancer
[59]: https://docs.datadoghq.com/fr/integrations/azure_network_interface
[60]: https://docs.datadoghq.com/fr/integrations/azure_public_ip_address
[61]: https://docs.datadoghq.com/fr/integrations/azure_notification_hubs
[62]: https://docs.datadoghq.com/fr/integrations/azure_relay
[63]: https://docs.datadoghq.com/fr/integrations/azure_search
[64]: https://docs.datadoghq.com/fr/integrations/azure_stream_analytics
[65]: https://docs.datadoghq.com/fr/integrations/azure_blob_storage
[66]: https://docs.datadoghq.com/fr/integrations/azure_file_storage
[67]: https://docs.datadoghq.com/fr/integrations/azure_queue_storage
[68]: https://docs.datadoghq.com/fr/integrations/azure_table_storage
[69]: https://docs.datadoghq.com/fr/integrations/azure_app_service_plan
[70]: https://docs.datadoghq.com/fr/integrations/azure_app_service_environment


{{< get-dependencies >}}