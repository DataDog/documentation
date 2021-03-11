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
draft: false
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

-   Obtenir des métriques sur des machines virtuelles Azure sans avoir nécessairement à installer l'Agent
-   Appliquer un tag à vos machines virtuelles Azure comportant des informations spécifiques à Azure (p. ex, la localisation)
-   Recueillir des métriques d'autres services : Application Gateway, App Service (Web et mobile), Batch Service, Event Hubs, IoT Hub, Logic App, Redis Cache, Server Farm (plan App Service), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, et bien d'autres encore.

<div class="alert alert-warning">
L'intégration Azure de Datadog est conçue pour recueillir <a href="https://docs.microsoft.com/fr-fr/azure/azure-monitor/platform/metrics-supported">TOUTES les métriques en provenance d'Azure Monitor</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas actuelle.<br>Les métriques <code>azure.*.status</code> et <code>azure.*.count</code> sont générées par Datadog à partir d'Azure Resource Health. <a href="https://docs.datadoghq.com/integrations/faq/azure-status-metric">En savoir plus sur ces métriques</a>.
</div>

| Intégration                     | Description                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][1]          | Un service qui fournit des modèles de données dans le cloud.                                                         |
| [Gestion des API][2]             | Un service pour publier, sécuriser, transformer, maintenir et surveiller les API.                                      |
| [App Service][3]                | Un service de déploiement et de mise à l'échelle d'applications Web, mobiles, API et de logique métier                      |
| [App Service Environment][4]    | Un service qui fournit un environnement pour l'exécution sécurisée de vos applications App Service à grande échelle.               |
| [Plan App Service][5]           | Un ensemble de ressources de calcul nécessaires à l'exécution d'une application Web.                                                          |
| [Application Gateway][6]        | Un équilibreur de charge du trafic Web qui vous permet de gérer le trafic vers vos applications Web.                  |
| [Automation][7]                 | Un service conçu pour faciliter la gestion de la configuration et l'automatisation au sein de vos environnements.                 |
| [Batch Service][8]              | Un planificateur et processeur de tâches gérés                                                                      |
| [Cognitive Services][9]         | Un ensemble d'API, de SDK et de services mis à votre disposition pour vous permettre de créer des applications sans connaissances en intelligence artificielle ou en science des données.       |
| [Container Instances][10]       | Un service qui vous permet de déployer des conteneurs sans avoir à provisionner ou gérer l'infrastructure sous-jacente.     |
| [Container Service][11]         | Un cluster Kubernetes, DC/OS ou Docker Swarm prêt pour la production.                                            |
| [Cosmos DB][12]                 | Un service de base de données qui prend en charge les bases de données clé-valeur, de documents, en colonnes et graphiques.                   |
| [Customer Insights][13]         | Permet aux organisations de consolider divers jeux de données pour bénéficier d'une vue globale sur leurs clients.                |
| [Data Explorer][14]             | Un service d'exploration de données rapide et hautement évolutif.                                                        |
| [Data Factory][15]              | Un service qui permet de composer des services de stockage, de déplacement et de traitement des données au sein de pipelines de données automatisés.       |
| [Data Lake Analytics][16]       | Un service d'analyse qui simplifie le traitement des tâches de Big Data.                                                        |
| [Data Lake Store][17]           | Une solution Data Lake sans limite qui améliore l'analytique Big Data.                                                     |
| [Database for MariaDB][18]      | Un service qui fournit une version communautaire entièrement gérée et prête à l'emploi de MariaDB.                       |
| [Event Grid][19]                | Un service pour gérer le routage des événements qui permet une consommation d'événements uniforme à l'aide d'un modèle pub/sub.       |
| [Event Hubs][20]                 | Un service géré de flux de données à grande échelle                                                                   |
| [ExpressRoute][21]              | Un service pour étendre vos réseaux sur site dans le cloud.                                             |
| [Pare-feu][22]                  | Un service de sécurité réseau basé sur le cloud pour protéger les ressources de votre réseau virtuel Azure.                            |
| [Functions][23]                 | Un service conçu pour exécuter du code sans serveur en réponse à un événement.                                      |
| [HDInsights][24]                | Un service cloud conçu pour traiter d'importants volumes de données.                                                   |
| [IoT Hub][25]                   | Connexion, surveillance et gestion de milliards de ressources IoT                                                       |
| [Key Vault][26]                 | Un service conçu pour protéger et gérer les clés de chiffrement et les secrets utilisés par les services et applications cloud. |
| [Load Balancer][27]             | Permet de mettre à l'échelle vos applications et d'assurer la haute disponibilité de vos services.                                    |
| [Logic Apps][28]                 | Conception de solutions d'intégration puissantes                                                                      |
| [Machine Learning][29]          | Service de machine learning pour l'entreprise permettant d'accélérer la création et le déploiement de modèles                              |
| [Network Interfaces][30]        | Permet à une machine virtuelle de communiquer avec des ressources Internet, Azure et locales.                                 |
| [Notification Hubs][31]         | Un moteur de notifications Push qui vous permet d'envoyer des notifications vers n'importe quelle plateforme depuis n'importe quel backend.                     |
| [Adresse IP publique][32]         | Une ressource qui permet d'assurer une connectivité entrante et une connectivité sortante à partir d'Internet.                |
| [Redis Cache][33]               | Cache de données géré                                                                                        |
| [Relay][34]                     | Permet l'exposition sécurisée des services exécutés dans votre réseau d'entreprise sur le cloud public.                          |
| [Recherche cognitive][35]          | Un service de recherche basé sur le cloud qui fournit des outils permettant d'ajouter une expérience de recherche riche.             |
| Stockage                         | Stockage d'[objets blob][36], de [fichiers][37], de [files d'attente][38] et de [tables][39].                                      |
| [Stream Analytics][40]          | Un moteur de traitement d'événements pour analyser d'importants volumes de données diffusées à partir d'appareils.                        |
| [SQL Database][41]              | Base de données relationnelle fortement évolutive dans le cloud                                                          |
| [Pool élastique SQL Database][42] | Gestion des performances de plusieurs bases de données                                                              |
| [Utilisation et quotas][43]          | Surveillance de votre utilisation d'Azure.                                                                                  |
| [Machine virtuelle][44]           | Service de gestion de machines virtuelles                                                                        |
| [Virtual Machine Scale Sets][45] | Déploiement, gestion et mise à l'échelle automatique d'un groupe de machines virtuelles identiques                                                      |
| [Réseau virtuel[45]           | Permet aux ressources Azure de communiquer entre elles, avec Internet et avec les réseaux sur site en toute sécurité.    |

## Configuration

### Installation

Intégrez votre compte Microsoft Azure à Datadog à l'aide de l'outil d'interface de ligne de commande Azure ou du portail Azure. Cette méthode d'intégration fonctionne automatiquement sur tous les clouds Azure : Public, Chine, Allemagne et Government. Suivez les instructions ci-dessous afin que Datadog détecte automatiquement le type de cloud que vous utilisez pour terminer l'intégration.

#### Intégration via l'interface de ligne de commande Azure

Afin d'intégrer Datadog à Azure à l'aide de l'interface de ligne de commande Azure, assurez-vous que [celle-ci est bien installée][47].

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
az ad sp create-for-rbac --role "Monitoring Reader" --scopes /subscriptions/{id_abonnement}
```

- Cette commande accorde au service principal le rôle `monitoring reader` pour l'abonnement que vous souhaitez surveiller.
- La valeur `appID` générée à partir de cette commande doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.
- Ajoutez `--name <NOM_PERSONNALISÉ>` pour utiliser un nom personnalisé. Autrement, Azure générera un nom unique. Le nom n'est pas utilisé dans le processus de configuration.
- Ajoutez `--password <MOTDEPASSE_PERSONNALISÉ>` pour utiliser un mot de passe personnalisé. Autrement, Azure générera un mot de passe unique. Ce mot de passe doit être saisi dans le [carré d'intégration Datadog/Azure][1], sous **Client Secret**.


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

- Le `<NOM>` n'est PAS utilisé et est seulement requis dans le cadre du processus de configuration.
- Le `<MOTDEPASSE>` choisi doit être saisi dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**.
- La valeur `Object Id` renvoyée par cette commande est utilisée pour `<ID_OBJET>` dans la prochaine commande.

Créez une application en tant que service principal à l'aide du format :

```text
azure role assignment create --objectId <ID_OBJET> -o "Monitoring Reader" -c /subscriptions/<ID_ABONNEMENT>/
```

- Cette commande accorde au service principal le rôle `monitoring reader` pour l'abonnement que vous souhaitez surveiller.
- La valeur `Service Principal Name` générée à partir de cette commande doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.
- `<ID_ABONNEMENT>` correspond à l'abonnement Azure que vous souhaitez surveiller et est représenté par `ID` dans `azure account show` ou sur le portail.


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

- Les valeurs `name`, `home-page` et `identifier-uris` ne sont PAS utilisées et sont seulement requises dans le cadre du processus de configuration.
- Le `password` que vous choisissez doit être saisi dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**.
- La valeur `AppId` renvoyée par cette commande est utilisée dans la prochaine commande et doit être saisie dans le [carré d'intégration Azure de Datadog][1], sous **Client ID**.

Créez un service principal avec :

Pour les interfaces de ligne de commande Azure < 0.10.2 :

```text
azure ad sp create {app-id}
```

Pour les interfaces de ligne de commande Azure >= 0.10.2 :

```text
azure ad sp create -a {app-id}
```

- La valeur `Object Id` renvoyée par cette commande est utilisée pour `<ID_OBJET>` dans la prochaine commande.

Créez une application Active Directory à l'aide du format :

```text
azure role assignment create --objectId <ID_OBJET> --roleName "Monitoring Reader" --subscription <ID_ABONNEMENT>
```

- Cette commande accorde au service principal le rôle `monitoring reader` pour l'abonnement que vous souhaitez surveiller.
- `<ID_ABONNEMENT>` correspond à l'abonnement Azure que vous souhaitez surveiller et est représenté par `ID` dans `azure account show` ou sur le portail.


[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{< /tabs >}}

#### Intégration via le portail Azure

1. [Créez une inscription d'application](#creer-l-inscription-d-application) dans votre Active Directory et envoyez les bons identifiants à Datadog.
2. [Donnez à cette application une autorisation de lecture](#donner-des-autorisations-de-lecture-a-l-application) pour tous les abonnements que vous souhaitez surveiller.

##### Créer l'inscription d'application

1. Sous **Azure Active Directory**, accédez à **Inscriptions des applications** et cliquez sur **Nouvelle inscription d'application** :
2. Saisissez les informations suivantes et cliquez sur le bouton **Créer**. **Remarque** : le nom et l'URL de connexion ne sont pas utilisés et sont seulement requis dans le cadre du processus de configuration. 

- Nom : `Datadog Auth`
- Types de compte pris en charge : `Accounts in this organizational directory only (Datadog)`
- URI de redirection : `https://app.datadoghq.com`. Si vous utilisez le site européen de Datadog : `https://app.datadoghq.eu`

{{< img src="integrations/azure/Azure_create_ad.png" alt="Création de l'app Azure" popup="true" style="width:80%;" >}}

##### Accorder un accès en lecture à l'application

1. Accédez à la section **Abonnements** en utilisant la barre de recherche ou depuis la barre latérale de gauche :

    {{< img src="integrations/azure/subscriptions_icon.png" alt="icône abonnements" popup="true" style="width:25%">}}

2. Cliquez sur l'abonnement que vous souhaitez surveiller.
3. Sélectionnez **Contrôle d'accès (IAM)** dans le menu d'abonnement, puis **Ajouter** -> **Ajouter une attribution de rôle** :

    {{< img src="integrations/azure/azure-add-role.png" alt="Add Role Assignment" popup="true" style="width:80%">}}

4. Pour **Rôle**, sélectionnez _Lecteur de surveillance_. Sous **Sélectionner**, choisissez le nom de l'application que vous avez créée :

    {{< img src="integrations/azure/azure-select-role-app.png" alt="Sélection du rôle et de l'app" popup="true" style="width:60%">}}

5. Cliquez sur **Save**.
6. Répétez ce processus pour tout autre abonnement que vous souhaitez surveiller à l'aide de Datadog. **Remarque** : les utilisateurs d'Azure Lighthouse peuvent ajouter les abonnements des locataires clients.

**Remarque** : les diagnostics doivent être activés pour que les machines virtuelles déployées avec ARM puissent recueillir des métriques. Consultez la section [Activer les diagnostics][48].

##### Terminer l'intégration

1. Dans **Inscriptions des applications**, sélectionnez l'application que vous avez créée, copiez les valeurs **ID d'application** et **ID de locataire**, puis collez-les dans le [carré d'intégration Azure de Datadog][49], sous **Client ID** et **Tenant ID**.
2. Pour cette même application, accédez à **Gérer** -> **Certificats et secrets**.
3. Ajoutez une nouvelle _Clé secrète client_ intitulée `datadogClientSecret`, sélectionnez un intervalle pour _Date d'expiration_ et cliquez sur **Ajouter** :

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Secret client Azure" popup="true" style="width:80%">}}

4. Une fois la valeur de la clé indiquée, collez-la dans le [carré d'intégration Azure de Datadog][49], sous **Client Secret**, puis cliquez sur **Install Integration** ou **Update Configuration**.

### Configuration

Vous pouvez choisir de limiter le nombre de machines virtuelles Azure qui sont transmises à Datadog en ajoutant des tags sous **Optionally filter to VMs with tag**.

Cette liste de tags séparés par des virgules au format `<KEY>:<VALUE>` définit un filtre utilisé lors de la collecte de métriques. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés. Seules les machines virtuelles qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres machines virtuelles sont ignorées. Ajoutez `!` devant un tag pour exclure les machines virtuelles correspondant à ce tag. Par exemple : 

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Collecte de métriques

Une fois le carré d'intégration configuré, les métriques sont recueillies par un crawler. Pour recueillir des métriques supplémentaires, déployez l'Agent Datadog sur vos machines virtuelles :

#### Installation de l'Agent

1. Dans le [portail Azure][50], accédez à _Machine virtuelle -> Paramètres -> Extensions -> Ajouter_ et sélectionnez l'Agent Datadog.
2. Cliquez sur **Créer**, saisissez votre [clé d'API Datadog][51] et cliquez sur **OK**.

Pour effectuer l'installation de l'Agent en fonction du système d'exploitation ou de l'outil CICD, consultez les [instructions d'installation de l'Agent Datadog][52] au sein de l'application.

**Remarque** : lors de l'installation de l'Agent Datadog avec l'extension Azure, les contrôleurs de domaine ne sont pas pris en charge.

#### Validation

Vous devrez peut-être patienter quelques minutes avant que les métriques des applications apparaissent sous le nouvel abonnement.

Accédez au [dashboard par défaut des machines virtuelles Azure][53] pour visualiser les données de votre infrastructure, qui s'ajoutent automatiquement au dashboard.

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Screenboard machines virtuelles azure" popup="true" style="width:70%">}}

### Collecte de logs

Le meilleur moyen d'envoyer les logs d'Azure à Datadog est d'utiliser l'Agent ou un DaemonSet. Si cela n'est pas possible pour une certaine ressource, Datadog vous conseille de créer un pipeline de transfert de logs en utilisant un Event Hub Azure pour recueillir [les logs de la plateforme Azure][54]. Si une ressource ne prend pas en charge la diffusion des logs de la plateforme Azure à un Event Hub, vous pouvez les transférer via le service Stockage Blob Azure.

{{< tabs >}}

{{% tab "Installation automatisée" %}}

Datadog met à votre disposition deux scripts automatisés.

Le premier script crée et configure les ressources Azure requises pour que les logs d'activité soient diffusés vers votre compte Datadog. Ces ressources incluent les paramètres de diagnostic des logs d'activité, les fonctions Azure, les espaces de nommage d'Event Hub et l'Event Hub.

Le second script est une option plus générique qui déploie uniquement l'Event Hub et les fonctions Azure, sans aucun paramètre de diagnostic. Il peut être utilisé pour configurer les sources de diffusion. Dans les deux cas, les Event Hubs peuvent être utilisés par d'autres sources de diffusion.

**Exemple :**

Si vous souhaitez diffuser à la fois les logs d'activité et les logs de ressources provenant de `westus`, exécutez le premier script en spécifiant le paramètre facultatif `-ResourceGroupLocation westus` (les logs d'activité sont une source au niveau de l'abonnement, vous pouvez donc leur créer un pipeline dans n'importe quelle région). Une fois le script déployé, vous pouvez envoyer les logs de ressource via le même Event Hub en ajoutant les paramètres de diagnostic à vos ressources dans `westus`.


#### Envoyer vos logs d'activité à Datadog depuis Azure :

*Étape 1 :** dans le portail Azure, accédez à votre **Cloud Shell**.

{{< img src="integrations/azure/azure_cloud_shell.png" alt="cloud shell azure" popup="true" style="width:100%">}}

**Étape 2 :** exécutez la commande ci-dessous pour télécharger le script d'automatisation dans votre environnement Cloud Shell.

{{< code-block lang="powershell" filename="Logs d'activité Étape 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

Vous pouvez également [afficher le contenu du script][1].

**Étape 3 :** invoquez le script en exécutant la commande ci-dessous, en ayant remplacé **`<clé_api>`**, par votre [token d'API Datadog][2], et **`<id_abonnement>`**, par votre ID d'abonnement Azure. Vous pouvez également ajouter des paramètres facultatifs supplémentaires pour configurer votre déploiement. Consultez [Paramètres facultatifs](#parametres-facultatifs).

{{< code-block lang="powershell" filename="Logs d'activité Étape 2" >}}

./activity_logs_deploy.ps1 -ApiKey <clé_api> -SubscriptionId <id_abonnement> 

{{< /code-block >}}

#### Envoyer vos logs de plateforme à Datadog depuis Azure :

Une solution générique pour envoyer des logs de plateforme Azure, y compris les logs de ressource, consiste à déployer uniquement l'Event Hub et le forwarder de logs.
Une fois ce pipeline déployé, vous pouvez créer des paramètres de diagnostic pour chaque source de log et les configurer pour qu'elles diffusent leur contenu vers Datadog.

*Étape 1 :** dans le portail Azure, accédez à votre **Cloud Shell**.

**Étape 2 :** exécutez la commande ci-dessous pour télécharger le script d'automatisation dans votre environnement Cloud Shell.

{{< code-block lang="powershell" filename="Logs de plateforme Étape 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

{{< /code-block >}}

Vous pouvez également [afficher le contenu du script](https://github.
com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1).

**Étape 3 :** invoquez le script en exécutant la commande ci-dessous, en ayant remplacé **`<clé_api>`**, par votre [token d'API Datadog][2], et **`<id_abonnement>`**, par votre ID d'abonnement Azure. Vous pouvez également ajouter des paramètres facultatifs supplémentaires pour configurer votre déploiement. Consultez [Paramètres facultatifs](#parametres-facultatifs).

{{< code-block lang="powershell" filename="Logs de plateforme Étape 2" >}}

./resource_deploy.ps1 -ApiKey <clé_api> -SubscriptionId <id_abonnement> 

{{< /code-block >}}

**Étape 4 :** créez des paramètres de diagnostic pour toutes les ressources Azure qui enverront des logs à Datadog. Configurez ces paramètres de diagnostic pour démarrer la diffusion des logs vers l'Event Hub que vous venez de créer.

**Remarque :** les ressources peuvent diffuser des logs uniquement aux Event Hubs qui se trouvent dans la même région Azure. Vous devrez donc répéter l'étape 2 pour chaque région à partir de laquelle vous souhaitez diffuser des logs de ressource.

**Remarque :** les valeurs Ressource-Groupe-Emplacement sont ajoutées au nom par défaut de chaque ressource Azure déployée pour le pipeline de logs de plateforme. Exemple : `datadog-eventhub-westus`. Toutefois, vous pouvez modifier cette convention en remplaçant ce paramètre.

#### Paramètres facultatifs

**Remarque :** lorsque vous personnalisez les paramètres, assurez-vous que le nom de chacune de vos ressources personnalisées est unique. Vérifiez que le nom de la ressource ne figure pas déjà dans votre liste de ressources Azure.

| -Flag `<paramètre par défaut>`                                           | Description                                                                                                                                                             |
|-----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite `<datadoghq.com>`                                        | Personnalisez votre instance Datadog en ajoutant ce flag avec une autre URL Datadog comme paramètre. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.            |
| -Environnement `<AzureCloud>`                                           | Gérez le stockage des clouds Azure indépendants en ajoutant ce flag comme paramètre. Vous pouvez également utiliser les options `AzureChinaCloud` `AzureGermanCloud` et `AzureUSGovernment`.               |
| -ResourceGroupLocation `<westus2>`                                    | Vous pouvez sélectionner la région dans laquelle votre groupe de ressources et vos ressources Azure sont déployés en ajoutant ce flag avec la nouvelle région Azure.                     |
| -ResourceGroupName `<gr-forwarder-logs-datadog>`                       | Personnalisez le nom de votre groupe de ressources Azure en ajoutant ce flag avec un paramètre mis à jour.                                                                                 |
| -EventhubNamespace `<espacedenommage-eventhub-datadog>`                     | Personnalisez l'espace de nommage de votre déploiement Event Hub Azure en ajoutant ce flag avec un paramètre mis à jour.                                                                                 |
| -EventhubName `<eventhub-datadog>`                                    | Personnalisez le nom de votre Event Hub Azure en utilisant ce flag avec un paramètre mis à jour.                                                                                      |
| -FunctionAppName `<application-fonction-datadog>`                              | Personnalisez le nom de votre application de Azure ajoutant ce flag avec un paramètre mis à jour.                                                                                   |
| -FunctionName `<fonction-datadog>`                                    | Personnalisez le nom de votre fonction Azure en utilisant ce flag avec un paramètre mis à jour.                                                                                       |
| -DiagnosticSettingName `<paramètre-diagnostic-logs-activités-datadog>`   | Personnalisez le nom de votre paramètre de diagnostic Azure en utilisant ce flag avec un paramètre mis à jour. **Ce flag sert uniquement à envoyer des logs d'activité pertinents uniquement pour l'envoi de logs d'activité.**                               |


Si l'installation échoue, consultez la [section Dépannage][3] pour résoudre rapidement les erreurs courantes.

[1]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/fr/integrations/azure/#troubleshooting
{{% /tab %}}

{{% tab "Installation manuelle" %}}

Pour envoyer des logs depuis Azure vers Datadog, suivez cette méthode globale :

1. Créez un [Event Hub Azure][1].
2. Configurez la fonction Datadog/Azure [avec un déclencheur Event Hub][2] pour transmettre les logs à Datadog.
3. Configurez vos services Azure de façon à ce que leurs logs soient envoyés au Event Hub à l'aide d'un nouveau [paramètre de diagnostic][3].

Les instructions qui suivent permettent d'effectuer une première configuration basique à l'aide du portail Azure. Toutes ces étapes peuvent être effectuées via l'interface de ligne de commande, Powershell ou des modèles de ressources. Pour ce faire, référez-vous à la documentation Azure.

#### Event Hub Azure

Créez un [Event Hub Azure][1] :

Créez un espace de nommage ou ajoutez un nouvel Event Hub à un espace de nommage existant en suivant les instructions ci-dessous.

1. Dans le portail Azure, accédez à la vue d'ensemble *Event Hubs* et cliquez sur **Ajouter**.
2. Indiquez le nom, le niveau tarifaire, l'abonnement et le groupe de ressources.
3. Sélectionnez une région. **Remarque** : l'Event Hub doit se trouver dans la même région que la ressource dont les logs doivent être transférés. Pour les logs d'activité ou toute autre source de logs propres à l'ensemble du compte, la région n'a pas d'importance.
4. Sélectionnez les options de votre choix pour les unités de débit, les zones de disponibilité et l'inflation automatique.
5. Cliquez sur **Créer**.

Ajoutez un Event Hub à votre espace de nommage Event Hub.

1. Dans le portail Azure, créez un espace de nommage ou accédez à un espace de nommage existant.
2. Cliquez sur **+ Event Hub**.
3. Sélectionnez les options de votre choix pour le nom, le nombre de partitions et la rétention des messages.
4. Cliquez sur **Créer**.


#### Fonction Datadog/Azure

Configurez la fonction Datadog/Azure [avec un déclencheur Event Hub][2] pour transmettre les logs à Datadog :

Créez une application de fonctions ou utilisez une application de fonctions existante et passez à la section suivante.

1. Dans le portail Azure, accédez à votre application de fonctions, cliquez sur *Fonctions*, puis sur **Ajouter**.
2. Sélectionnez un abonnement, un groupe de ressources et une région, puis nommez votre fonction. 
3. Définissez **Publier sur Code, Pile d'exécution sur Node.js et Version sur 12 LTS**.
4. Cliquez sur **Next:Hosting**.
5. Sélectionnez un compte de stockage et un type de plan, puis sélectionnez **Windows** comme système d'exploitation.
6. Vérifiez les informations, puis créez votre application de fonctions.
7. Attendez que votre déploiement se termine.

Ajoutez une nouvelle fonction à votre application de fonctions en utilisant le modèle de déclencheur Event Hub.

1. Sélectionnez une application de fonctions nouvelle ou existante dans la liste des applications de fonctions.
2. Sélectionnez **Fonctions** dans le menu des fonctions et cliquez sur **Ajouter**. 
3. Sélectionnez un [déclencheur Azure Event Hub][2] dans le menu des modèles et cliquez sur **Nouveau**.
4. Sélectionnez votre espace de nommage et votre Event Hub pour la connexion de l'Event Hub et cliquez sur **OK**.
5. Cliquez sur **Créer une fonction**.

Pointez votre déclencheur Event Hub vers Datadog.

1. Sélectionnez votre nouveau déclencheur Event Hub dans la vue des fonctions.
2. Cliquez sur **Code + Test** dans le menu latéral pour les développeurs.
3. Ajoutez le [code de la fonction Datadog/Azure][4] à votre fichier index.js.
4. Ajoutez votre clé d'API en créant une variable d'environnement `DD_API_KEY` dans l'onglet de configuration de votre application de fonctions, ou copiez-la dans le code de la fonction en remplaçant `<DATADOG_API_KEY>` à la ligne 22.
5. Enregistrez la fonction.
6. Cliquez sur **Integration**, puis sur **Azure Event Hubs** sous le déclencheur et vérifiez les paramètres suivants :
    a. Event Parameter Name doit être défini sur `eventHubMessages`.
    b. Event Hub Cardinality doit être défini sur `Many`.
    c. Event Hub Data Type doit être vide.
7. Cliquez sur **Enregistrer**.
8. Vérifiez que votre configuration est valide en exécutant la fonction et en recherchant le message de test dans le [Log Explorer Datadog][5].

#### Logs d'activité

1. Dans le portail Azure, accédez au *journal d'activité*.
2. Cliquez sur **Paramètres de diagnostic**.
3. Cliquez sur **Ajouter un paramètre de diagnostic**.
4. Dans la section réservée aux catégories, sélectionnez les catégories de logs à envoyer à Datadog.
5. Dans la section réservée à la destination, sélectionnez **Diffuser vers un Event Hub**.
6. Définissez l'espace de nommage et le nom de l'Event Hub. Ces derniers doivent correspondre à l'espace de nommage et au nom de l'Event Hub que vous avez utilisés pour créer votre déclencheur Event Hub.
7. Définissez la clé d'accès partagé. Celle-ci doit être configurée avec un accès en envoi ou en gestion.
8. Cliquez sur **Enregistrer**.
9. Vérifiez que les logs de cette ressource apparaissent dans le [Log Explorer Datadog][5] pour confirmer que votre configuration est valide.


#### Logs de ressource

Configurez vos services Azure de façon à ce que leurs logs soient envoyés au Event Hub à l'aide d'un nouveau [paramètre de diagnostic][3].

1. Dans le portail Azure, accédez à la ressource dont les logs doivent être envoyés à Datadog.
2. Dans la section Surveillance du volet de la ressource, cliquez sur **Paramètres de diagnostic**.
3. Cliquez sur **Ajouter un paramètre de diagnostic**.
4. Dans la section réservée aux catégories, sélectionnez les catégories de logs à envoyer à Datadog.
5. Dans la section Détails de la destination, sélectionnez **Diffuser vers un Event Hub**.
6. Définissez l'espace de nommage et le nom de l'Event Hub. Ces derniers doivent correspondre à l'espace de nommage et au nom de l'Event Hub que vous avez utilisés pour créer votre déclencheur Event Hub.
7. Définissez la clé d'accès partagé. Celle-ci doit être configurée avec un accès en envoi ou en gestion.
8. Cliquez sur **Enregistrer**.
9. Vérifiez que les logs de cette ressource apparaissent dans le [Log Explorer Datadog][5] pour confirmer que votre configuration est valide.


[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://app.datadoghq.com/logs
{{% /tab %}}

{{% tab "Stockage Blob" %}}

Pour recueillir des logs à partir de l'ensemble de vos Azure App Services, suivez cette méthode globale :

1. Configurez [Stockage Blob Azure][1] depuis le [portail Azure][2], l'[Explorateur Stockage Azure][3], l'[interface de ligne de commande Azure][4] ou [Powershell][5].
2. [Configurez la fonction Datadog/Azure](#creer-une-fonction-stockage-blob-azure) chargée de transmettre les logs depuis votre stockage blob vers Datadog.
3. [Configurez vos Azure App Services de façon à transférer leurs logs à Stockage Blob][6].

#### Créer une fonction Stockage Blob Azure

Si vous n'avez jamais utilisé de fonction Azure, consultez [le portail Azure][7] pour découvrir comment créer votre première fonction.

1. Dans le [portail Azure][2], accédez à _Applications de fonctions -> Fonctions_, puis cliquez sur **Ajouter**.
2. Sélectionnez un abonnement, un groupe de ressources et une région, puis nommez votre fonction. 
3. Définissez Publier sur **Code** et Pile d'exécution sur **Node.js.**
4. Cliquez sur **Next:Hosting**.
5. Sélectionnez un compte de stockage et un type de plan, puis sélectionnez **Windows** comme système d'exploitation.
6. Vérifiez les informations, puis créez votre fonction.
7. Une fois le déploiement terminé, sélectionnez votre nouvelle fonction dans la liste des applications de fonctions.
8. Choisissez de générer votre fonction **dans le portail** et utilisez le modèle de déclencheur de Stockage Blob (sous **Autres modèles…**). Si besoin, installez l'extension `Microsoft.Azure.WebJobs.Extensions.EventHubs`.
9. Sélectionnez ou ajoutez la **Connexion du compte de stockage** et cliquez sur **Créer**.
10. Créez un fichier `index.js` et ajoutez le [code de la fonction Datadog/Azure][8] (remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][9]).
11. Enregistrez la fonction.
12. Pour la section **Intégrer**, définissez **Nom du paramètre d'objet blob** sur `blobContent`, et cliquez sur **Enregistrer**.
13. Vérifiez que vos logs apparaissent dans le [Log Explorer Datadog][10] pour confirmer que votre configuration est valide.


[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[5]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[6]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
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

L'intégration Azure envoie tous vos événements Azure à votre [flux d'événements][56] Datadog.

### Checks de service

L'intégration Azure n'inclut aucun check de service.

### Tags

Les métriques, événements et checks de service des intégrations Azure reçoivent les tags suivants :

| Intégration                                           | Espace de nommage                                   | Clés de tag Datadog                                                                                                                                                                                                 |
|-------------------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes les intégrations Azure                                | Tous                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (le cas échéant)                                                            |
| Intégrations VM Azure                                 | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Plans Azure App Service                | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Applications Web et Fonctions Azure App Services | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (applications web Linux uniquement), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure SQL Database                 | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Pour les liens de réplication uniquement :  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                    | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Utilisation et quotas Azure                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## Dépannage

### Collecte de logs automatisée

#### Conflits de nommage

Lorsque des ressources Azure possèdent le même nom que l'un des paramètres par défaut, des conflits de nommage peuvent survenir. Azure n'accepte pas que des ressources partagent leur nom avec un abonnement individuel. Nous vous suggérons de renommer le paramètre par défaut avec un nom unique qui n'existe pas déjà dans l'environnement.

Par exemple, si vous possédez déjà un Event Hub `datadog-eventhub`, utilisez le flag -EventhubName pour changer le nom par défaut de la ressource Event Hub.

{{< code-block lang="powershell" filename="Exemple" >}}

./resource_deploy.ps1 -ApiKey <votre_clé_api> -SubscriptionId <votre_id_abonnement> -EventhubName <nouveau_nom>

{{< /code-block >}}

**Remarque :** accédez à la section [Paramètres facultatifs][57] pour trouver la liste des paramètres configurables. 

**Remarque :** si vous exécutez le script à nouveau après un conflit de nommage, il est également recommandé de supprimer tout le groupe de ressources afin de lancer une toute nouvelle exécution.


#### Fournisseur de ressources non enregistré

Si l'exécution de votre script échoue à cause de l'erreur **L'abonnement n'est pas inscrit pour utiliser l'espace de noms ‘Microsoft.EventHub’** :

Azure possède des fournisseurs de ressources pour chacun de ses services, par exemple `Microsoft.EventHub` pour Event Hub Azure. Si votre abonnement Azure n'est pas enregistré auprès de l'un des fournisseurs de services requis, le script échoue. Vous pouvez résoudre ce problème en vous enregistrant auprès du fournisseur de services. Exécutez la commande suivante dans CloudShell.

{{< code-block lang="powershell" filename="Exemple" >}}

az provider register --namespace Microsoft.EventHub

{{< /code-block >}}


#### Quota de logs dépassé

Vous avez bien installé le script, mais vous ne voyez toujours aucun log d'activité/plate-forme dans le Log Explorer ?

Assurez-vous que vous n'avez pas dépassé votre [quota quotidien][58] de rétention de logs. 

**Remarque :** Il est recommandé d'attendre au moins cinq minutes après l'exécution du script avant de commencer à chercher des logs dans le Log Explorer.




Besoin d'aide ? Contactez [l'assistance Datadog][59].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/azure_analysis_services/
[2]: https://docs.datadoghq.com/fr/integrations/azure_api_management/
[3]: https://docs.datadoghq.com/fr/integrations/azure_app_services/
[4]: https://docs.datadoghq.com/fr/integrations/azure_app_service_environment/
[5]: https://docs.datadoghq.com/fr/integrations/azure_app_service_plan/
[6]: https://docs.datadoghq.com/fr/integrations/azure_application_gateway/
[7]: https://docs.datadoghq.com/fr/integrations/azure_automation/
[8]: https://docs.datadoghq.com/fr/integrations/azure_batch/
[9]: https://docs.datadoghq.com/fr/integrations/azure_cognitive_services/
[10]: https://docs.datadoghq.com/fr/integrations/azure_container_instances/
[11]: https://docs.datadoghq.com/fr/integrations/azure_container_service/
[12]: https://docs.datadoghq.com/fr/integrations/azure_cosmosdb/
[13]: https://docs.datadoghq.com/fr/integrations/azure_customer_insights/
[14]: https://docs.datadoghq.com/fr/integrations/azure_data_explorer/
[15]: https://docs.datadoghq.com/fr/integrations/azure_data_factory/
[16]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_analytics/
[17]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_store/
[18]: https://docs.datadoghq.com/fr/integrations/azure_db_for_mariadb/
[19]: https://docs.datadoghq.com/fr/integrations/azure_event_grid/
[20]: https://docs.datadoghq.com/fr/integrations/azure_event_hub/
[21]: https://docs.datadoghq.com/fr/integrations/azure_express_route/
[22]: https://docs.datadoghq.com/fr/integrations/azure_firewall/
[23]: https://docs.datadoghq.com/fr/integrations/azure_functions/
[24]: https://docs.datadoghq.com/fr/integrations/azure_hd_insight/
[25]: https://docs.datadoghq.com/fr/integrations/azure_iot_hub/
[26]: https://docs.datadoghq.com/fr/integrations/azure_key_vault/
[27]: https://docs.datadoghq.com/fr/integrations/azure_load_balancer/
[28]: https://docs.datadoghq.com/fr/integrations/azure_logic_app/
[29]: https://docs.datadoghq.com/fr/integrations/azure_machine_learning_services/
[30]: https://docs.datadoghq.com/fr/integrations/azure_network_interface/
[31]: https://docs.datadoghq.com/fr/integrations/azure_notification_hubs/
[32]: https://docs.datadoghq.com/fr/integrations/azure_public_ip_address/
[33]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache/
[34]: https://docs.datadoghq.com/fr/integrations/azure_relay/
[35]: https://docs.datadoghq.com/fr/integrations/azure_search/
[36]: https://docs.datadoghq.com/fr/integrations/azure_blob_storage/
[37]: https://docs.datadoghq.com/fr/integrations/azure_file_storage/
[38]: https://docs.datadoghq.com/fr/integrations/azure_queue_storage/
[39]: https://docs.datadoghq.com/fr/integrations/azure_table_storage/
[40]: https://docs.datadoghq.com/fr/integrations/azure_stream_analytics/
[41]: https://docs.datadoghq.com/fr/integrations/azure_sql_database/
[42]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool/
[43]: https://docs.datadoghq.com/fr/integrations/azure_usage_and_quotas/
[44]: https://docs.datadoghq.com/fr/integrations/azure_vm/
[45]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set/
[46]: https://docs.datadoghq.com/fr/integrations/azure_virtual_networks/
[47]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[48]: https://docs.datadoghq.com/fr/integrations/faq/azure-troubleshooting/#enable-diagnostics
[49]: https://app.datadoghq.com/account/settings#integrations/azure
[50]: https://portal.azure.com
[51]: https://app.datadoghq.com/account/settings#api
[52]: https://app.datadoghq.com/account/settings#agent
[53]: https://app.datadoghq.com/screen/integration/azure_vm
[54]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[55]: https://github.com/DataDog/dogweb/blob/prod/integration/azure/azure_metadata.csv
[56]: https://docs.datadoghq.com/fr/events/
[57]: https://docs-staging.datadoghq.com/mitheysh.asokan/FAQ-Forwarder/integrations/azure/#optional-parameters
[58]: https://docs.datadoghq.com/fr/logs/indexes/#set-daily-quota
[59]: https://docs.datadoghq.com/fr/help/