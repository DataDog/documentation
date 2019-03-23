---
aliases:
  - /fr/guides/azure/
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
    text: "Pourquoi installer l'Agent Datadog sur mes instances dans le cloud\_?"
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

Connectez-vous à Microsoft Azure pour :

* Obtenir des métriques sur des machines virtuelles Azure sans avoir nécessairement à installer l'Agent
* Appliquer un tag à vos machines virtuelles Azure comportant des informations spécifiques à Azure (p. ex, la localisation)
* Recueillir des métriques d'autres services : Application Gateway, App Service (Web et mobile), Batch Service, Event Hubs, IoT Hub, Logic App, Redis Cache, Server Farm (plan App Service), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, et bien d'autres encore.

Les intégrations connexes comprennent :

| Intégration                     | Description                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------|
| [App Service][7]                | Un service de déploiement et de mise à l'échelle d'applications Web, mobiles, API et de logique métier |
| [Batch Service][8]              | Un planificateur et processeur de tâches gérés                                                 |
| [Event Hubs][9]                  | Un service géré de flux de données à grande échelle                                              |
| [IOT Hub][10]                   | Connexion, surveillance et gestion de milliards de ressources IoT                                  |
| [Logic App][11]                 | Conception de solutions d'intégration puissantes                                                 |
| [Redis Cache][12]               | Cache de données géré                                                                   |
| [Stockage][13]                   | Stockage de tables, de files d'attente, de fichiers et de blobs                                                 |
| [SQL Database][14]              | Base de données relationnelle fortement évolutive dans le cloud                                     |
| [SQL Database Elastic Pool][15] | Gestion des performances de plusieurs bases de données                                         |
| [Machine virtuelle][16]           | Service de gestion de machines virtuelles                                                   |
| [Virtual Machine Scale Set][17] | Déploiement, gestion et mise à l'échelle automatique d'un ensemble de machines virtuelles identiques                                 |

## Implémentation
### Installation

Intégrez votre compte Microsoft Azure à Datadog à l'aide de l'outil d'interface de ligne de commande Azure ou du portail Azure. Cette méthode d'intégration fonctionne automatiquement sur tous les clouds Azure : Public, Chine, Germany et Government. Suivez les instructions ci-dessous afin que Datadog détecte automatiquement le type de cloud que vous utilisez pour terminer l'intégration.

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


1. [Obtenez le nom de votre locataire](#obtenir-le-nom-de-votre-locataire) et transmettez-le à Datadog.
2. [Créez une application Web](#creer-l-application-web) dans votre Active Directory et envoyez les bons identifiants à Datadog.
3. [Donnez à cette application une autorisation de lecture](#donner-des-autorisations-de-lecture-a-l-application) pour tous les abonnements que vous souhaitez surveiller.

##### Obtenir le nom de votre locataire

1. Accédez au site [portal.azure.com][2].
2. Dans la barre latérale de gauche, sélectionnez **Azure Active Directory**.
3. Sous **Propriétés**, collez la valeur de **ID de répertoire** :

    {{< img src="integrations/azure/Azure_tenant_name.png" alt="Nom de locataire Azure" responsive="true" popup="true" style="width:70%;" >}}

4. Collez la valeur `ID de répertoire` dans le [carré d'intégration Azure de Datadog][1], sous **Tenant name/ID**.

    {{< img src="integrations/azure/tenant_name_form.png" alt="formulaire du nom de locataire" responsive="true" popup="true" style="width:70%;" >}}

##### Créer l'application Web

1. Sous **Azure Active Directory**, accédez à **Inscriptions d'applications** et cliquez sur **Nouvelle inscription d'application** :

    {{< img src="integrations/azure/Azure_create_ad.png" alt="Création d'app Azure" responsive="true" popup="true" style="width:70%;" >}}

2. Saisissez les informations suivantes et cliquez sur le bouton **Créer**. **Remarque** : le nom et l'URL de connexion ne sont pas utilisés et sont seulement requis dans le cadre du processus de configuration. 
  * Nom : `Datadog Auth`
  * Type d'application : `Web app / API`
  * URL de connexion : `https://app.datadoghq.com`

##### Donner des autorisations de lecture à l'application

1. Accédez à la section **Abonnements** en utilisant la barre de recherche ou depuis la barre latérale de gauche :

    {{< img src="integrations/azure/subscriptions_icon.png" alt="icône abonnements" responsive="true" popup="true" style="width:25%">}}

2. Cliquez sur l'abonnement que vous souhaitez surveiller.
3. Sélectionnez **Contrôle d'accès (IAM)** dans le menu d'abonnement, puis **Ajouter** -> **Ajouter une attribution de rôle** :

    {{< img src="integrations/azure/azure-add-role.png" alt="Ajouter une attribution de rôle" responsive="true" popup="true" style="width:80%">}}

4. Pour **Rôle**, sélectionnez *Lecteur*. Sous **Sélectionner**, choisissez le nom de l'application que vous avez créée :

    {{< img src="integrations/azure/azure-select-role-app.png" alt="Sélection du rôle et de l'app" responsive="true" popup="true" style="width:80%">}}

5. Cliquez sur **Enregistreer**.

**Remarque** : les diagnostics doivent être activés pour que les machines virtuelles déployées avec ARM puissent recueillir des métriques. Consultez la section [Activer les diagnostics][3].

##### Terminer l'intégration

1. Sous **Inscriptions d'applications**, sélectionnez l'app que vous avez créée, copiez la valeur **ID d'application**, puis collez-la dans le [carré d'intégration Azure de Datadog][1], sous **ID client**.

    {{< img src="integrations/azure/Azure_client_id.png" alt="id client azure" responsive="true" popup="true" style="width:70%;" >}}

    {{< img src="integrations/azure/client_id_form.png" alt="formulaire id client" responsive="true" popup="true" style="width:70%;" >}}

2. Pour cette même app, accédez à **Paramètres** -> **Clés**, ajoutez une clé portant le nom *Secret client* et cliquez sur **Enregistrer** :

    {{< img src="integrations/azure/Azure_client_secret.png" alt="secret client azure" responsive="true" popup="true" style="width:70%">}}

3. Une fois la valeur de la clé indiquée, collez-la dans le [carré d'intégration Azure de Datadog][1], sous **Client Secret**, puis cliquez sur **Install Integration** ou **Update Configuration**.

    {{< img src="integrations/azure/client_secret_form.png" alt="client secret" responsive="true" popup="true" style="width:70%">}}

### Configuration

Vous pouvez choisir de limiter le nombre de machines virtuelles Azure qui sont transmises à Datadog en ajoutant des tags sous **Optionally filter to VMs with tag** :

{{< img src="integrations/azure/filter_form.png" alt="formulaire_filtre" responsive="true" popup="true" style="width:70%">}}

Cette liste de tags séparés par des virgules au format `<KEY>:<VALUE>` définit un filtre utilisé lors de la collecte de métriques. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés. Seules les machines virtuelles qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres machines virtuelles sont ignorées. Ajoutez `!` devant un tag pour exclure les machines virtuelles correspond à ce tag. Par exemple : 

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Collecte de métriques

Une fois le carré d'intégration configuré, les métriques sont recueillies par un crawler. Pour recueillir des métriques supplémentaires, déployez l'Agent Datadog sur vos machines virtuelles :

#### Installation de l'Agent

1. Dans le [portail Azure][2], accédez à *Machine virtuelle -> Paramètres -> Extensions -> Ajouter* et sélectionnez l'Agent Datadog.
2. Cliquez sur **Créer**, saisissez votre [clé d'API Datadog][37] et cliquez sur **OK**.

Pour effectuer l'installation de l'Agent en fonction du système d'exploitation ou de l'outil CICD, consultez les [instructions d'installation de l'Agent Datadog][18] au sein de l'application.

### Validation

Vous devrez peut-être patienter quelques minutes avant que les métriques des applications apparaissent sous le nouvel abonnement.

Accédez au [dashboard par défaut des machines virtuelles Azure][5] pour visualiser les données de votre infrastructure, qui s'ajoutent automatiquement au dashboard.

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Screenboard machines virtuelles azure" responsive="true" popup="true" style="width:70%">}}

### Collecte de logs

Pour recueillir des logs à partir de l'un de vos services Azure, suivez cette méthode globale :

1. Créez un [Azure Event Hub][39] depuis le [portail Azure][31], l’[interface de ligne de commande Azure][32] ou [Powershell][33].
2. [Configurez la fonction Datadog/Azure](#creer-une-fonction-azure) qui transmet les logs depuis votre Event Hub vers Datadog.
3. [Configurez vos services Azure pour transférer leurs logs au Event Hub][34].

#### Créer une fonction Azure

Si vous n'avez jamais utilisé de fonction Azure, consultez la section [Créer votre première fonction à l'aide du portail Azure][35].

1. Dans le [portail Azure][2], accédez à *Applications de fonctions -> Fonctions* et cliquez sur **Nouvelle fonction** :

    {{< img src="integrations/azure/azure-function-app.png" alt="Nouvelle fonction" responsive="true" style="width:70%">}}

2. Sélectionnez le déclencheur d'Event Hub. Si besoin, installez l'extension `Microsoft.Azure.WebJobs.Extensions.EventHubs`.

    {{< img src="integrations/azure/event_hub_selector.png" alt="Sélecteur Event hub" responsive="true" style="width:70%">}}

3. Nommez votre fonction sous le champ **Nom**.
4. Sélectionnez ou ajoutez votre **Connexion de l'Event Hub**.
5. Sélectionnez le **Groupe de consommateurs Event Hub** et le **Nom de l'Event Hub** à partir desquels vous souhaitez récupérer des logs.
6. Cliquez sur **Créer** :

    {{< img src="integrations/azure/azure-new-function.png" alt="Nouvelle fonction" responsive="true" style="width:35%">}}

7. Créez un fichier `index.js` et ajoutez le [code de la fonction Datadog/Azure][36] (remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][37]).
8. Enregistrez la fonction.
9. Pour **Intégrer**, définissez **Nom du paramètre d'événement** sur `eventHubMessages`, et cliquez sur **Save**.

    {{< img src="integrations/azure/azure-trigger-integrate.png" alt="Déclencheur Intégrer" responsive="true" style="width:70%">}}

10. Vérifiez que vos logs sont présents dans le [Log Explorer de Datadog][38] pour confirmer que la fonction est bien configurée.

## Données collectées
### Métriques
{{< get-metrics-from-git "azure" >}}


Visualisez les métriques spécifiques que nous recueillons pour chaque intégration Azure Service :

* [App Service][20]
* [Batch Service][21]
* [Event Hubs][22]
* [IOT Hub][23]
* [Logic App][24]
* [Redis Cache][25]
* [SQL Database][26]
* [SQL Database Elastic Pool][27]
* [Machine virtuelle][28]
* [Virtual Machine Scale Set][29]

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
[6]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/
[7]: https://docs.datadoghq.com/fr/integrations/azure_app_services
[8]: https://docs.datadoghq.com/fr/integrations/azure_batch
[9]: https://docs.datadoghq.com/fr/integrations/azure_event_hub
[10]: https://docs.datadoghq.com/fr/integrations/azure_iot_hub
[11]: https://docs.datadoghq.com/fr/integrations/azure_logic_app
[12]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache
[13]: https://docs.datadoghq.com/fr/integrations/azure_storage
[14]: https://docs.datadoghq.com/fr/integrations/azure_sql_database
[15]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool
[16]: https://docs.datadoghq.com/fr/integrations/azure_vm
[17]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set
[18]: https://app.datadoghq.com/account/settings#agent
[19]: https://github.com/DataDog/dogweb/blob/prod/integration/azure/azure_metadata.csv
[20]: https://docs.datadoghq.com/fr/integrations/azure_app_services#metrics
[21]: https://docs.datadoghq.com/fr/integrations/azure_batch#metrics
[22]: https://docs.datadoghq.com/fr/integrations/azure_event_hub#metrics
[23]: https://docs.datadoghq.com/fr/integrations/azure_iot_hub#metrics
[24]: https://docs.datadoghq.com/fr/integrations/azure_logic_app#metrics
[25]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache#metrics
[26]: https://docs.datadoghq.com/fr/integrations/azure_sql_database#metrics
[27]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool#metrics
[28]: https://docs.datadoghq.com/fr/integrations/azure_vm#metrics
[29]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set#metrics
[30]: https://docs.datadoghq.com/fr/graphing/event_stream/
[31]: https://docs.microsoft.com/en-gb/azure/event-hubs/event-hubs-create
[32]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-cli
[33]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-quickstart-powershell
[34]: https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-stream-monitoring-data-event-hubs
[35]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[36]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[37]: https://app.datadoghq.com/account/settings#api
[38]: https://app.datadoghq.com/logs
[39]: https://azure.microsoft.com/en-us/services/event-hubs/
[40]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}