---
aliases:
- /fr/guides/azure/
- /fr/integrations/azure_storage/
categories:
- cloud
- azure
- log collection
dependencies: []
description: Recueillez des métriques à partir d'instances et de nombreux services
  Azure.
doc_link: https://docs.datadoghq.com/integrations/azure/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: Blog
  text: Explorer Azure App Service avec la vue Serverless Datadog
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: Blog
  text: Comment surveiller des machines virtuelles Azure Microsoft
- link: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/
  tag: Blog
  text: Surveiller vos machines virtuelles Microsoft Azure dotées de processeurs ARM
    Ampere Altra avec Datadog
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Recommandations pour la surveillance des logs de la plateforme Microsoft Azure
- link: https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/
  tag: Blog
  text: Surveiller des événements Azure Service Health avec Datadog
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Surveiller Azure Container Apps avec Datadog
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: Blog
  text: Surveiller Azure Government avec Datadog
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Datadog sur le portail Azure
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
git_integration_title: azure
has_logo: true
integration_id: azure
integration_title: Microsoft Azure
integration_version: ''
is_public: true

manifest_version: '1.0'
monitors:
  '[Azure] Integration Errors': assets/monitors/integration_errors.json
name: azure
public_title: Intégration Datadog/Microsoft Azure
short_description: Recueillez des métriques à partir d'instances et de nombreux services
  Azure.
version: '1.0'
---

## Présentation

L'intégration Azure de Datadog permet de recueillir des métriques et des logs à partir de votre environnement Azure. Les options de configuration disponibles varient selon le site Datadog que votre organisation utilise :

**Tous les sites** : tous les sites Datadog peuvent utiliser le processus d'inscription d'application afin de mettre en place la collecte des métriques. Ils peuvent également tous configurer un Event Hub de façon à envoyer les logs de la plateforme Azure.
**US3 :** si votre organisation utilise le site Datadog US3, vous pouvez tirer profit de l'intégration native Azure pour simplifier la gestion et la collecte des données de votre environnement Azure. Nous vous recommandons d'utiliser dès que possible cette méthode. Il vous suffit de configurer une ressource Datadog dans Azure afin d'associer vos abonnements Azure à votre organisation Datadog. Il n'est alors pas nécessaire d'utiliser le processus d'inscription d'application pour la collecte des métriques ni de configurer un Event Hub pour l'envoi des logs.

{{< site-region region="us,eu,us5,gov" >}}
<div class="alert alert-info"><strong>Sélectionnez le site US3 dans le volet latéral de cette page ou <a href="?site=us3">modifiez le sélecteur de site</a> pour vérifier que vous consultez bien la version de cette documentation dédiée au site US3.</strong></div>
{{< /site-region >}}

Connectez-vous à Microsoft Azure pour :
- Obtenir des métriques sur des machines virtuelles Azure sans avoir nécessairement à installer l'Agent Datadog.
- Recueillir les métriques d'Azure Monitor standard pour tous les services Azure : Application Gateway, App Service (Web et Mobile), Batch, Event Hubs, IoT Hub, Logic Apps, Cache pour Redis, batterie de serveurs (plan App Service), SQL Database, pools élastiques SQL, groupes de machines virtuelles identiques, et bien d'autres.
- Appliquer un tag à vos métriques Azure comportant des informations spécifiques à Azure à propos de la ressource associée, comme la région, le groupe de ressources ou des tags Azure personnalisés.
- Récupérer des métriques générées par Datadog afin d'obtenir des insights uniques sur votre environnement Azure.
- Corréler dans votre organisation Datadog les données de vos applications Azure pour l'ensemble des logs, métriques, traces APM, activités utilisateur, etc.

<div class="alert alert-warning">
L'intégration Azure de Datadog est conçue pour recueillir <a href="https://docs.microsoft.com/fr-fr/azure/azure-monitor/platform/metrics-supported">toutes les métriques en provenance d'Azure Monitor</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas à jour. <br>Les métriques <code>azure.*.status</code> et <code>azure.*.count</code> sont générées par Datadog à partir d'Azure Resource Health. Pour en savoir plus, consultez la page <a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric/">Statut et métriques count Azure</a>.
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
| [Coffre Recovery Services][33]    | Une entité qui stocke les sauvegardes et les points de récupération créés au fil du temps.                                  |
| [Redis Cache][34]               | Cache de données géré                                                                                        |
| [Relay][35]                     | Permet l'exposition sécurisée des services exécutés dans votre réseau d'entreprise sur le cloud public.                          |
| [Recherche cognitive][36]          | Un service de recherche basé sur le cloud qui fournit des outils permettant d'ajouter une expérience de recherche riche.             |
| Stockage                         | Stockage d'[objets blob][37], de [fichiers][38], de [files d'attente][39] et de [tables][40].                                      |
| [Stream Analytics][41]          | Un moteur de traitement d'événements pour analyser d'importants volumes de données diffusées à partir d'appareils.                        |
| [SQL Database][42]              | Base de données relationnelle fortement évolutive dans le cloud                                                          |
| [Pool élastique SQL Database][43] | Gestion des performances de plusieurs bases de données                                                              |
| [Utilisation et quotas][44]          | Surveillance de votre utilisation d'Azure.                                                                                  |
| [Machine virtuelle][45]           | Service de gestion de machines virtuelles                                                                        |
| [Virtual Machine Scale Sets][46] | Déploiement, gestion et mise à l'échelle automatique d'un groupe de machines virtuelles identiques                                                      |
| [Réseau virtuel][47]           | Permet aux ressources Azure de communiquer entre elles, avec Internet et avec les réseaux sur site en toute sécurité.    |

## Configuration

{{< site-region region="us,eu,gov,us5" >}}

**Remarque** : les instructions de configuration sont différentes pour l'intégration native Azure (disponible pour les clients utilisant le site Datadog US3). Si vous utilisez l'intégration native Azure, [modifiez le sélecteur de site][60] pour afficher les instructions propres au site US3. Pour en savoir plus, consultez la rubrique [Présentation][61].

### Installation

Intégrez votre compte Microsoft Azure à Datadog à l'aide de l'outil d'interface de ligne de commande Azure ou du portail Azure. Cette méthode d'intégration fonctionne automatiquement sur tous les clouds Azure : Public, Chine, Allemagne et Government.

Suivez les instructions ci-dessous afin que Datadog détecte automatiquement le type de cloud que vous utilisez pour terminer l'intégration.

#### Intégration via l'interface de ligne de commande Azure

Afin d'intégrer Datadog à Azure à l'aide de l'interface de ligne de commande Azure, assurez-vous que [celle-ci est bien installée][44].

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
{{% /tab %}}
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
{{% /tab %}}
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
2. [Donnez à l'application une autorisation de lecture](#accorder-un-acces-en-lecture-a-l-application) pour tous les abonnements que vous souhaitez surveiller.

##### Créer l'inscription d'application

1. Sous **Azure Active Directory**, accédez à **App Registrations** et cliquez sur **New application registration** :
2. Saisissez les informations suivantes et cliquez sur le bouton **Create**. Le nom et l'URL de connexion ne sont pas utilisés et sont seulement requis dans le cadre du processus de configuration.

    - Name : `Datadog Auth`
    - Supported Account Types : `Accounts in this organizational directory only (Datadog)`
    - Redirect URI : {{< region-param key="dd_full_site" code="true" >}}

{{< img src="integrations/azure/Azure_create_ad.png" alt="Création de l'app Azure" popup="true" style="width:80%;" >}}

##### Accorder un accès en lecture à l'application

1. Accédez à la section **Subscriptions** en utilisant la barre de recherche ou depuis la barre latérale de gauche :

    {{< img src="integrations/azure/subscriptions_icon.png" alt="Icône des abonnements" popup="true" style="width:25%">}}

2. Cliquez sur l'abonnement que vous souhaitez surveiller.
3. Sélectionnez **Access control (IAM)** dans le menu d'abonnement et cliquez sur **Add** -> **Add role assignment** :

    {{< img src="integrations/azure/azure-add-role.png" alt="Add Role Assignment" popup="true" style="width:80%">}}

4. Pour **Role**, sélectionnez **Monitoring Reader**. Sous **Select**, choisissez le nom de l'application que vous avez créée :

    {{< img src="integrations/azure/azure-select-role-app.png" alt="Sélection du rôle et de l'app" popup="true" style="width:60%">}}

5. Cliquez sur **Save**.
6. Répétez ce processus pour tout autre abonnement que vous souhaitez surveiller à l'aide de Datadog. **Remarque** : les utilisateurs d'Azure Lighthouse peuvent ajouter les abonnements des locataires clients.

**Remarque** : les diagnostics doivent être activés pour que les machines virtuelles déployées avec ARM puissent recueillir des métriques. Consultez la section [Activer les diagnostics][45].

##### Terminer l'intégration

1. Sous **App Registrations**, sélectionnez l'application que vous avez créée, copiez les valeurs **Application ID** et **Tenant ID**, puis collez-les dans le [carré d'intégration Azure de Datadog][46], sous **Client ID** et **Tenant ID**.
2. Pour cette même application, accédez à **Manage** -> **Certificates and secrets**.
3. Ajoutez un nouveau **Client Secret** intitulé `datadogClientSecret`, sélectionnez un intervalle pour **Expires**, puis cliquez sur **Add** :

    {{< img src="integrations/azure/Azure_client_secret.png" alt="Secret client Azure" popup="true" style="width:80%">}}

4. Une fois la valeur de la clé indiquée, collez-la dans le [carré d'intégration Azure de Datadog][46], sous **Client Secret**, puis cliquez sur **Install Integration** ou **Update Configuration**.

**Remarque** : les modifications apportées à la configuration Azure peuvent mettre jusqu'à 20 minutes à être appliquées dans Datadog.

### Configuration

Pour limiter la collecte de ressources pour des hosts Azure, ouvrez le carré d'intégration Azure, accédez à l'onglet **Configuration**, puis ouvrez **App Registrations**. Saisissez ensuite la liste des tags dans la zone de texte sous **Metric Collection Filters**.

Cette liste de tags au format `<KEY>:<VALUE>` est séparée par des virgules. Elle définit un filtre utilisé pour la collecte des métriques. Des wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés.

Seules les VM qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres VM sont ignorées. Ajoutez `!` devant un tag pour exclure la VM correspondant à ce tag. Exemple :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Surveiller le statut de l'intégration

Une fois l'intégration configurée, Datadog commence à appeler en continu les API Azure pour recueillir les données de surveillance critiques de votre environnement Azure. Ces appels renvoient parfois des erreurs (si les identifiants fournis ont expiré, par exemple). Ces erreurs peuvent empêcher Datadog de recueillir les données de surveillance.

En cas d'erreurs critiques, l'intégration Azure génère des événements dans l'Events Explorer de Datadog et les republie toutes les cinq minutes. Vous pouvez configurer un monitor d'événement pour qu'il se déclenche lors de la détection de ces événements et envoie une notification à l'équipe appropriée.

Datadog fournit un monitor conseillé que vous pouvez utiliser comme modèle pour commencer. Pour utiliser le monitor conseillé :

1. Dans Datadog, accédez à **Monitors** -> **New Monitor** et sélectionnez l'onglet [Recommended Monitors][58].
2. Sélectionnez le monitor conseillé nommé `[Azure] Integration Errors`.
3. Apportez les modifications voulues à la requête de recherche ou aux conditions d'alerte. Par défaut, le monitor se déclenche à chaque fois qu'une nouvelle erreur est détectée et se résout si l'erreur en question n'a pas été détectée au cours des 15 dernières minutes.
4. Modifiez les messages pour la notification initiale et les notifications suivantes selon vos besoins. Notez que les événements eux-mêmes contiennent des informations pertinentes qui seront automatiquement incluses dans la notification, notamment des informations détaillées concernant le contexte, l'erreur renvoyée et les actions courantes pour y remédier.
5. [Configurez les notifications][59] de sorte qu'elles soient envoyées via les canaux privilégiés (e-mail, Slack, PagerDuty ou autres) afin de garantir que votre équipe soit prévenue en cas de problèmes liés à la collecte des données Azure.

### Collecte de métriques

Une fois le carré d'intégration configuré, les métriques sont recueillies par un crawler. Pour recueillir des métriques supplémentaires, déployez l'Agent Datadog sur vos machines virtuelles :

#### Installation de l'Agent

Vous pouvez utiliser l'extension Azure pour installer l'Agent Datadog sur les machines virtuelles Windows, Linux x64 et Linux ARM.

1. Dans le [portail Azure][47], accédez à votre **machine virtuelle**, cliquez sur **Settings** > **Extensions** > **Add**, puis sélectionnez **Datadog Agent**.
2. Cliquez sur **Create**, saisissez votre [clé d'API Datadog][48] et cliquez sur **OK**.

Pour effectuer l'installation de l'Agent en fonction du système d'exploitation ou de l'outil CI/CD, consultez les [instructions d'installation de l'Agent Datadog][49].

**Remarque** : lors de l'installation de l'Agent Datadog avec l'extension Azure, les contrôleurs de domaine ne sont pas pris en charge.

#### Validation

Vous devrez peut-être patienter quelques minutes avant que les métriques des applications apparaissent sous le nouvel abonnement.

Accédez au [dashboard par défaut des machines virtuelles Azure][50] pour visualiser les données de votre infrastructure, qui s'ajoutent automatiquement au dashboard.

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="Screenboard de machines virtuelles Azure" popup="true" style="width:70%">}}

### Collecte de logs

**Remarque** : les instructions de configuration sont différentes pour l'intégration native Azure (disponible pour les clients utilisant le site Datadog US3). Si vous utilisez l'intégration native Azure, [modifiez le sélecteur de site][60] pour afficher les instructions propres au site US3. Pour en savoir plus, consultez la rubrique [Présentation][61].

Pour envoyer les logs depuis Azure vers Datadog, la meilleure approche consiste à utiliser l'Agent ou un DaemonSet. Si cela n'est pas possible pour certaines ressources, nous vous conseillons de créer un pipeline de transfert de logs à l'aide d'un Event Hub Azure pour recueillir [les logs de la plate-forme Azure][57]. Si une ressource ne prend pas en charge la diffusion des logs de la plate-forme Azure vers un Event Hub, vous pouvez les transférer via le service Stockage Blob Azure.

{{< tabs >}}

{{% tab "Installation automatisée" %}}

Pour commencer, cliquez sur le bouton ci-dessous et remplissez le formulaire sur le portail Azure. Les ressources Azure requises pour la transmission des logs d'activité à votre compte Datadog seront déployées pour vous.

[![Déployer sur Azure][1]](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fdatadog-serverless-functions%2Fmaster%2Fazure%2Fdeploy-to-azure%2Fparent_template.json)

Datadog met également à votre disposition deux scripts automatisés.

Le premier script crée et configure les ressources Azure requises pour que les logs d'activité soient diffusés vers votre compte Datadog. Ces ressources incluent les paramètres de diagnostic des logs d'activité, les fonctions Azure, les espaces de nommage d'Event Hub et l'Event Hub.

Le second script est une option plus générique qui déploie uniquement l'Event Hub et les fonctions Azure, sans aucun paramètre de diagnostic. Il peut être utilisé pour configurer les sources de diffusion. Dans les deux cas, les Event Hubs peuvent être utilisés par d'autres sources de diffusion.

**Exemple :**

Si vous souhaitez diffuser à la fois les logs d'activité et les logs de ressource provenant de `westus`, exécutez le premier script en spécifiant le paramètre facultatif `-ResourceGroupLocation westus` (les logs d'activité sont une source au niveau de l'abonnement, vous pouvez donc leur créer un pipeline dans n'importe quelle région). Une fois le script déployé, vous pouvez envoyer les logs de ressource via le même Event Hub en ajoutant les paramètres de diagnostic à vos ressources dans `westus`.

**Remarques :**

L'intégration ne recueille pas d'événement.

#### Envoyer des logs d'activité depuis Azure vers Datadog

*Étape 1 :** dans le portail Azure, accédez à votre **Cloud Shell**.

{{< img src="integrations/azure/azure_cloud_shell.png" alt="cloud shell azure" popup="true" style="width:100%">}}

**Étape 2 :** exécutez la commande ci-dessous pour télécharger le script d'automatisation dans votre environnement Cloud Shell.

{{< code-block lang="powershell" filename="Logs d'activité Étape 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1", "activity_logs_deploy.ps1")

{{< /code-block >}}

Vous pouvez également [afficher le contenu du script][2].

**Étape 3 :** invoquez le script en exécutant la commande ci-dessous, en ayant remplacé **`<clé_api>`** par votre [token d'API Datadog][3] et **`<id_abonnement>`** par votre ID d'abonnement Azure. Vous pouvez également ajouter des paramètres facultatifs supplémentaires pour configurer votre déploiement. Consultez la rubrique [Paramètres facultatifs](#parametres-facultatifs).

{{< code-block lang="powershell" filename="Logs d'activité Étape 2" >}}

./activity_logs_deploy.ps1 -ApiKey <clé_api> -SubscriptionId <id_abonnement>

{{< /code-block >}}

#### Envoyer des logs de la plate-forme Azure à Datadog

Une solution générique pour envoyer des logs de plateforme Azure, y compris les logs de ressource, consiste à déployer uniquement l'Event Hub et le forwarder de logs.
Une fois ce pipeline déployé, vous pouvez créer des paramètres de diagnostic pour chaque source de logs et les configurer pour qu'elles diffusent leur contenu vers Datadog.

*Étape 1 :** dans le portail Azure, accédez à votre **Cloud Shell**.

**Étape 2 :** exécutez la commande ci-dessous pour télécharger le script d'automatisation dans votre environnement Cloud Shell.

{{< code-block lang="powershell" filename="Logs de plateforme Étape 1" >}}

(New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/DataDog/datadog-serverless-functions/master/azure/eventhub_log_forwarder/resource_deploy.ps1", "resource_deploy.ps1")

{{< /code-block >}}

Vous pouvez également [afficher le contenu du script][4].

**Étape 3 :** invoquez le script en exécutant la commande ci-dessous, en ayant remplacé **`<clé_api>`** par votre [token d'API Datadog][3] et **`<id_abonnement>`** par votre ID d'abonnement Azure. Vous pouvez également ajouter des paramètres facultatifs supplémentaires pour configurer votre déploiement. Consultez la rubrique [Paramètres facultatifs](#parametres-facultatifs).

{{< code-block lang="powershell" filename="Logs de plateforme Étape 2" >}}

./resource_deploy.ps1 -ApiKey <clé_api> -SubscriptionId <id_abonnement>

{{< /code-block >}}

**Étape 4 :** créez des paramètres de diagnostic pour toutes les ressources Azure qui envoient des logs à Datadog. Configurez ces paramètres de diagnostic de façon à initier la diffusion des logs vers l'Event Hub que vous venez de créer.

**Remarque :** les ressources peuvent diffuser des logs uniquement aux Event Hubs qui se trouvent dans la même région Azure. Vous devez donc répéter l'étape 2 pour chaque région à partir de laquelle vous souhaitez diffuser des logs de ressource.

**Remarque :** les valeurs Ressource-Groupe-Emplacement sont ajoutées au nom par défaut de chaque ressource Azure déployée pour le pipeline de logs de plateforme. Exemple : `datadog-eventhub-westus`. Toutefois, vous pouvez modifier cette convention en remplaçant ce paramètre.

#### Paramètres facultatifs

**Remarque :** lorsque vous personnalisez les paramètres, assurez-vous que le nom de chacune de vos ressources personnalisées est unique. Vérifiez que le nom de la ressource ne figure pas déjà dans votre liste de ressources Azure.

| -Flag `<paramètre par défaut>`                                         | Description                                                                                                                                                           |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -DatadogSite `<datadoghq.com>`                                      | Personnalisez votre instance Datadog en ajoutant ce flag avec comme paramètre un autre site Datadog. Votre site Datadog est {{< region-param key="dd_site" code="true" >}}.    |
| -Environment `<AzureCloud>`                                         | Gérez le stockage des clouds Azure indépendants en ajoutant ce flag comme paramètre. Vous pouvez également utiliser les options `AzureChinaCloud`, `AzureGermanCloud` et `AzureUSGovernment`. |
| -ResourceGroupLocation `<westus2>`                                  | Vous pouvez sélectionner la région dans laquelle votre groupe de ressources et vos ressources Azure sont déployés en ajoutant ce flag avec la nouvelle région Azure.                     |
| -ResourceGroupName `<gr-forwarder-logs-datadog>`                     | Personnalisez le nom de votre groupe de ressources Azure en ajoutant ce flag avec un paramètre mis à jour.                                                                        |
| -EventhubNamespace `<datadog-ns-4c6c53b4-1abd-4798-987a-c8e671a5c25e>` | Personnalisez l'espace de nommage de votre Event Hub Azure en ajoutant ce flag avec un paramètre mis à jour. Par défaut, `datadog-ns-<ID-globale-unique>` est généré.                              |
| -EventhubName `<eventhub-datadog>`                                  | Personnalisez le nom de votre Event Hub Azure en ajoutant ce flag avec un paramètre mis à jour.                                                                             |
| -FunctionAppName `<datadog-functionapp-1435ad2f-7c1f-470c-a4df-bc7289d8b249>`                            | Personnalisez le nom de votre application de fonctions Azure en ajoutant ce flag avec un paramètre mis à jour. Par défaut, `datadog-functionapp-<ID-unique-globale>` est généré.                                                                         |
| -FunctionName `<fonction-datadog>`                                  | Personnalisez le nom de votre fonction Azure en utilisant ce flag avec un paramètre mis à jour.                                                                              |
| -DiagnosticSettingName `<paramètre-diagnostic-logs-activités-datadog>` | Personnalisez le nom de votre paramètre de diagnostic Azure en ajoutant ce flag avec un paramètre mis à jour. **Ce flag sert uniquement à envoyer des logs d'activité pertinents.**                      |

Si l'installation échoue, consultez la [section Dépannage](#depannage) pour résoudre rapidement les erreurs courantes.

[1]: https://aka.ms/deploytoazurebutton
[2]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/activity_logs_deploy.ps1
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/eventhub_log_forwarder/resource_deploy.ps1
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

1. Dans le portail Azure, accédez à la vue d'ensemble **Event Hubs** et cliquez sur **Create**.
2. Indiquez le nom, le niveau tarifaire, l'abonnement et le groupe de ressources.
3. Sélectionnez une région. **Remarque** : l'Event Hub doit se trouver dans la même région que la ressource dont les logs doivent être transférés. Pour les logs d'activité ou toute autre source de logs propres à l'ensemble du compte, la région n'a pas d'importance.
4. Sélectionnez les options de votre choix pour les unités de débit, les zones de disponibilité et l'inflation automatique.
5. Cliquez sur **Create**.

Ajoutez un Event Hub à votre espace de nommage Event Hub.

1. Dans le portail Azure, créez un espace de nommage ou accédez à un espace de nommage existant.
2. Cliquez sur **+ Event Hub**.
3. Sélectionnez les options de votre choix pour le nom, le nombre de partitions et la rétention des messages.
4. Cliquez sur **Create**.

#### Fonction Azure Datadog

Configurez la fonction Datadog/Azure [avec un déclencheur Event Hub][2] pour transmettre les logs à Datadog :

Créez une application de fonctions ou utilisez une application de fonctions existante et passez à la section suivante.

1. Dans le portail Azure, accédez à la vue d'ensemble **Function Apps** et cliquez sur **Create**.
2. Sélectionnez un abonnement, un groupe de ressources et une région, puis nommez votre application de fonctions.
3. Définissez **Publish sur Code, Runtime stack sur Node.js et Version sur 16 LTS**.
4. Sélectionnez un système d'exploitation et un type de plan.
5. Cliquez sur **Next:Hosting**.
6. Sélectionnez un compte de stockage.
7. Vérifiez les informations, puis créez votre application de fonctions.
8. Attendez que votre déploiement se termine.

Ajoutez une nouvelle fonction à votre application de fonctions en utilisant le modèle de déclencheur Event Hub.

1. Sélectionnez une application de fonctions nouvelle ou existante dans la liste des applications de fonctions.
2. Sélectionnez **Functions** dans le menu de fonctions et cliquez sur **Create**.
3. Sélectionnez un [déclencheur Event Hub Azure][2] dans le menu de modèles.
4. Sous **Event Hub connection**, sélectionnez votre espace de nommage et votre Event Hub.
5. Cliquez sur **Create**.

Pointez votre déclencheur Event Hub vers Datadog.

1. Sélectionnez votre nouveau déclencheur Event Hub dans la vue des fonctions.
2. Cliquez sur **Code + Test** dans le menu latéral pour les développeurs.
3. Ajoutez le [code de la fonction Datadog/Azure][4] à votre fichier index.js.
4. Ajoutez votre clé d'API en créant une variable d'environnement `DD_API_KEY` dans l'onglet de configuration de votre application de fonctions, ou copiez-la dans le code de la fonction en remplaçant `<CLÉ_API_DATADOG>` à la ligne 22.
5. Si vous n'utilisez pas le site Datadog US1, définissez votre [site Datadog][5] avec une variable d'environnement `DD_SITE` dans l'onglet de configuration de votre application de fonctions, ou copiez le paramètre de site dans le code de la fonction à la ligne 23.
6. Enregistrez la fonction.
7. Cliquez sur **Integration**, puis sur **Azure Event Hubs** sous le déclencheur et vérifiez les paramètres suivants :
    a. Event Parameter Name doit être défini sur `eventHubMessages`.
    b. Event Hub Cardinality doit être défini sur `Many`.
    c. Event Hub Data Type doit être vide.
8. Cliquez sur **Save**.
9. Vérifiez que votre configuration est valide en exécutant la fonction et en recherchant le message de test dans le [Log Explorer de Datadog][6].
**Remarque** : l'événement de log de test doit être dans un format JSON valide.

#### Logs d'activité

1. Dans le portail Azure, accédez à la section **Activity Log**.
2. Cliquez sur **Diagnostic Settings**.
3. Cliquez sur **Add diagnostic setting**.
4. Dans la section réservée aux catégories, sélectionnez les catégories de logs à envoyer à Datadog.
5. Dans la section réservée à la destination, sélectionnez **Stream to an event hub**.
6. Définissez l'espace de nommage et le nom de l'Event Hub. Ces derniers doivent correspondre à l'espace de nommage et au nom de l'Event Hub que vous avez utilisés pour créer votre déclencheur Event Hub.
7. Définissez la clé d'accès partagé. Celle-ci doit être configurée avec un accès en envoi ou en gestion.
8. Cliquez sur **Save**.
9. Vérifiez que les logs de cette ressource sont présents dans le [Log Explorer de Datadog][6] pour confirmer que votre configuration est valide.

#### Logs de ressource

Configurez vos services Azure de façon à ce que leurs logs soient envoyés au Event Hub à l'aide d'un nouveau [paramètre de diagnostic][3].

1. Dans le portail Azure, accédez à la ressource dont les logs doivent être envoyés à Datadog.
2. Dans la section relative à la surveillance du volet de la ressource, cliquez sur **Diagnostic settings**.
3. Cliquez sur **Add diagnostic setting**.
4. Dans la section réservée aux catégories, sélectionnez les catégories de logs à envoyer à Datadog.
5. Dans la section réservée à la destination, sélectionnez **Stream to an event hub**.
6. Définissez l'espace de nommage et le nom de l'Event Hub. Ces derniers doivent correspondre à l'espace de nommage et au nom de l'Event Hub que vous avez utilisés pour créer votre déclencheur Event Hub.
7. Définissez la clé d'accès partagé. Celle-ci doit être configurée avec un accès en envoi ou en gestion.
8. Cliquez sur **Save**.
9. Vérifiez que les logs de cette ressource sont présents dans le [Log Explorer de Datadog][6] pour confirmer que votre configuration est valide.


[1]: https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create
[2]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger
[3]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/diagnostic-settings
[4]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/activity_logs_monitoring/index.js
[5]: https://docs.datadoghq.com/fr/getting_started/site/
[6]: https://app.datadoghq.com/logs
{{% /tab %}}

{{% tab "Stockage Blob" %}}

Pour recueillir des logs à partir de l'ensemble de vos Azure App Services, suivez cette méthode globale :

1. Configurez [Stockage Blob Azure][1] depuis le [portail Azure][2], l'[Explorateur Stockage Azure][3], l'[interface de ligne de commande Azure][4] ou [Powershell][5].
2. [Configurez la fonction Datadog/Azure](#creer-une-fonction-stockage-blob-azure) chargée de transmettre les logs depuis votre stockage blob vers Datadog.
3. [Configurez vos Azure App Services de façon à transférer leurs logs à Stockage Blob][6].

#### Créer une fonction Stockage Blob Azure

Si vous n'avez jamais utilisé de fonction Azure, consultez l'article [Bien démarrer avec Azure Functions][7] pour découvrir comment créer votre première fonction.

1. Dans le [portail Azure][2], accédez à la vue d'ensemble **Function Apps** et cliquez sur **Create**.
2. Sélectionnez un abonnement, un groupe de ressources et une région, puis nommez vos applications de fonctions.
3. Définissez **Publish sur Code, Runtime stack sur Node.js et Version sur 16 LTS**.
4. Sélectionnez le système d'exploitation **Windows** et un type de plan.
5. Cliquez sur **Next:Hosting**.
6. Sélectionnez un compte de stockage.
7. Vérifiez les informations, puis créez votre fonction.
8. Une fois le déploiement terminé, sélectionnez votre nouvelle fonction dans la liste des applications de fonctions.
9. Choisissez de générer votre fonction **In-portal** et utilisez le modèle de déclencheur de Stockage Blob (sous **More templates…**). Si besoin, installez l'extension `Microsoft.Azure.WebJobs.Extensions.EventHubs`.
10. Sélectionnez ou ajoutez la **connexion du compte de stockage** et cliquez sur **Create**.
11. Créez un fichier `index.js` et ajoutez le [code de la fonction Datadog/Azure][8] (remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][9]).
12. Enregistrez la fonction.
13. Pour la section **Integrate**, définissez **Blob Parameter Name** sur `blobContent` et cliquez sur **Save**.
14. Vérifiez que vos logs apparaissent dans le [Log Explorer Datadog][10] pour confirmer que votre configuration est valide.


[1]: https://azure.microsoft.com/en-us/services/storage/blobs/
[2]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[4]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-cli
[5]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-powershell
[6]: https://docs.microsoft.com/en-us/learn/modules/store-app-data-with-azure-blob-storage/
[7]: https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://app.datadoghq.com/logs
{{% /tab %}}
{{< /tabs >}}

[44]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install
[45]: https://docs.datadoghq.com/fr/integrations/guide/azure-troubleshooting/#enable-diagnostics
[46]: https://app.datadoghq.com/account/settings#integrations/azure
[47]: https://portal.azure.com
[48]: https://app.datadoghq.com/organization-settings/api-keys
[49]: https://app.datadoghq.com/account/settings#agent
[50]: https://app.datadoghq.com/screen/integration/azure_vm
[52]: https://docs.datadoghq.com/fr/events/
[57]: https://docs.microsoft.com/en-us/azure/azure-monitor/platform/platform-logs-overview
[58]: https://app.datadoghq.com/monitors/recommended
[59]: /fr/monitors/notify/#notify-your-team
[60]: https://docs.datadoghq.com/fr/integrations/azure/?site=us3
[61]: https://docs.datadoghq.com/fr/integrations/azure/?tab=azurecliv20#overview
{{< /site-region >}}

{{< site-region region="us3" >}}

### Prérequis

#### Autorisations requises

Pour configurer l'intégration native Azure, vous devez bénéficier d'un accès **Owner** pour chacun des abonnements Azure que vous souhaitez associer, et d'un accès **Admin** pour l'organisation Datadog que vous leur associez. Vérifiez que c'est bien le cas avant de commencer la configuration.

#### Configuration SSO

_(Facultatif)_ Vous pouvez configurez l'[authentification unique (SSO)](#configuration-du-sso-saml) lors de la création d'une organisation dans Azure. Le SSO peut également est configuré ultérieurement. Pour effectuer la configuration dès la création initiale, commencez par créer une application de galerie professionnelle Datadog.

### Installation {#installation-us3}

Pour configurer l'intégration Azure, il est nécessaire de créer une ressource Datadog dans Azure. Ces ressources représentent la connexion ou le lien entre une organisation Datadog et un abonnement Azure. Vous devez créer une ressource Datadog pour chaque abonnement que vous souhaitez surveiller avec Datadog.

Deux options s'offrent à vous lors de la création d'une ressource Datadog dans Azure :

1. Associer un abonnement à une organisation Datadog existante. Il s'agit de la méthode la plus courante. Cela vous permet de configurer votre organisation Datadog afin de surveiller un abonnement Azure qui n'a pas encore été lié. Cette action n'a aucun impact sur votre offre Datadog.

2. Créer une nouvelle organisation Datadog. Ce processus est moins courant. Utilisez cette option si vous n'avez pas encore d'organisation Datadog et que vous souhaitez souscrire un abonnement payant via la Place de marché Azure. Ce flux crée une organisation Datadog, permet de sélectionner une offre et lie l'abonnement Azure associé afin qu'il puisse être surveillé.

**Remarque** : aucun essai n'est proposé via l'option **Create a new Datadog organization** dans Azure. Pour commencer un essai gratuit, [créez une organisation Datadog d'essai sur notre site US3][6], puis liez les abonnements que vous souhaitez surveiller.

Une fois que vous avez créé une ressource Datadog, la collecte des données commence pour l'abonnement associé. Consultez notre [guide][7] pour savoir comment utiliser cette ressource pour configurer, gérer et déployer Datadog.

#### Gestion automatique

Les instructions présentées sur cette page indiquent comment configurer l'intégration native Azure via le portail Azure. Si vous préférez utiliser des options automatiques, vous pouvez également consulter les ressources suivantes :

- [Azure CLI pour Datadog][62]

- [Fournisseur Terraform Azure pour Datadog][63] (veillez à inclure le [bloc d'attribution de rôle][64])

Si vous souhaitez surveiller de nombreux abonnements avec l'intégration native Azure, nous vous recommandons d'utiliser Terraform pour créer les ressources Datadog. Pour savoir comment configurer Terraform pour plusieurs abonnements, consultez cet article de blog dédié au [déploiement sur plusieurs abonnements Azure avec Terraform][65].

[62]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[63]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[64]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[65]: https://medium.com/codex/deploying-to-multiple-azure-subscriptions-using-terraform-81249a58a600

#### Créer une ressource Datadog

Pour commencer à surveiller un abonnement Azure, accédez à la [page Service de Datadog dans Azure][8], puis sélectionnez l'option permettant de créer une ressource Datadog :
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Service Datadog US3 Azure" responsive="true" style="width:90%;">}}

Choisissez **Link Azure subscription to an existing Datadog organization** ou **Create a new Datadog organization**. Associer un abonnement est l'action la plus courante. Cela vous permet de configurer la surveillance pour un abonnement Azure qui n'a pas encore été lié. Ne choisissez le flux **Create** que si vous n'êtes pas encore client Datadog et que vous souhaitez souscrire un abonnement payant.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Créer une ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

**Remarque** : les coûts associés aux nouvelles organisations Datadog créées via le portail Azure sont automatiquement intégrés à la facturation Azure. Les données d'utilisation associées seront prises en compte pour le calcul de l'[Engagement de consommation Microsoft Azure (MACC)][1], le cas échéant.

### Configuration {#configuration-us3}

{{< tabs >}}
{{% tab "Association" %}}

#### Éléments de base {#association-elements-de-base}

Après avoir choisi d'associer une organisation Datadog existante, le portail affiche un formulaire permettant de créer la ressource Datadog :
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Associer un abonnement Azure à une organisation Datadog existante" responsive="true" style="width:90%;">}}

Renseignez les champs suivants :

| Propriété             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | L'abonnement Azure à surveiller avec Datadog. La ressource Datadog figurera dans cet abonnement. Vous devez disposer d'un accès propriétaire.                                                                                       |
| Resource group       | Créez un groupe de ressources ou utilisez un groupe existant. Un [groupe de ressources][1] est un conteneur avec des ressources connexes pour une solution Azure.                                                                                 |
| Resource name        | Attribuez un nom à la ressource Datadog. Voici le format recommandé : `nom_abonnement-nom_org_datadog`.                                                                                                         |
| Emplacement             | La région est West US 2. Il s'agit de la région dans laquelle le site US3 de Datadog est hébergé dans Azure. Comme tous les [sites Datadog][2], le site US3 est entièrement SaaS et prend en charge la surveillance de toutes les régions Azure, ainsi que d'autres fournisseurs de cloud et des hosts sur site. |
| Datadog organization | Une fois l'étape d'authentification terminée, le nom de l'organisation Datadog est défini sur celui de l'organisation Datadog liée, et le site Datadog est défini sur US3.                                                                                                                                |

Cliquez sur **Link to Datadog organization** pour ouvrir une fenêtre d'authentification Datadog, puis connectez-vous à Datadog.

Par défaut, Azure associe votre organisation Datadog actuelle à votre ressource Datadog. Si vous souhaitez associer une autre organisation, sélectionnez-la dans la fenêtre d'authentification :

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Sélectionner l'organisation Datadog US3 Azure" responsive="true" style="width:90%;">}}

Une fois le fllux oauth terminé, vérifiez que le nom de votre organisation Datadog est correct.

Après avoir terminé la configuration de base, cliquez sur l'option **Next: Metrics and logs**.


[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[2]: https://docs.datadoghq.com/fr/getting_started/site/
{{% /tab %}}
{{% tab "Création" %}}

#### Éléments de base {#creation-elements-de-base}

Après avoir choisi de créer une organisation Datadog, le portail affiche un formulaire permettant de créer la ressource et l'organisation Datadog :
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Créer une ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

Renseignez les champs suivants :

| Propriété             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | L'abonnement Azure à surveiller avec Datadog. La ressource Datadog figurera dans cet abonnement. Vous devez disposer d'un accès propriétaire.                                                                                       |
| Resource group       | Créez un groupe de ressources ou utilisez un groupe existant. Un [groupe de ressources][1] est un conteneur avec des ressources connexes pour une solution Azure.                                                                                 |
| Resource name        | Le nom de la ressource Datadog. Ce nom est attribué à la nouvelle organisation Datadog.                                                                                                                                    |
| Emplacement             | La région est West US 2. Il s'agit de la région dans laquelle le site US3 de Datadog est hébergé dans Azure. Comme tous les [sites Datadog][2], le site US3 est entièrement SaaS et prend en charge la surveillance de toutes les régions Azure, ainsi que d'autres fournisseurs de cloud et des hosts sur site. |
| Datadog organization | Le nom de l'organisation Datadog correspond au nom de la ressource. Le site Datadog est défini sur US3.                                                                                                                                |
| Pricing plan         | La liste des offres tarifaires Datadog disponibles. Si vous utilisez une offre exclusive, celle-ci figure dans cette liste déroulante.                                                                                                                 |
| Billing term         | La facturation s'effectue mensuellement.                                                                                                                                                                                                                      |

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[2]: https://docs.datadoghq.com/fr/getting_started/site/
{{% /tab %}}

{{< /tabs >}}

#### Section Metrics and logs

##### Collecte de métriques

Par défaut, les métriques de toutes les ressources Azure incluses dans l'abonnement sont automatiquement recueillies. Pour envoyer toutes les métriques à Datadog, aucune action supplémentaire n'est requise.

###### Règles de tag pour l'envoi de métriques

Vous avez la possibilité de restreindre la collecte de métriques pour les VM Azure et les plans App Service. Pour ce faire, utilisez les tags Azure associés à vos ressources.

- Les machines virtuelles, les groupes de machines virtuelles identiques et les plans App Service qui possèdent des tags `include` envoient des métriques à Datadog.
- À l'inverse, les machines virtuelles, les groupes de machines virtuelles identiques et les plans App Service qui possèdent des tags `exclude` n'envoient pas de métriques à Datadog.
- En cas de conflit entre des règles d'inclusion et d'exclusion, la règle d'exclusion est prioritaire.
- Il n'est pas possible de limiter la collecte de métriques pour d'autres ressources.

##### Collecte de logs

Trois types de logs peuvent être envoyés par Azure à Datadog.

Les **logs au niveau de l'abonnement** fournissent des informations clés sur les opérations réalisées sur vos ressources dans le [plan de contrôle][2]. Les modifications apportées aux événements Service Health sont également incluses. Utilisez le log d'activité pour déterminer la nature des opérations d'écriture (PUT, POST et DELETE), la personne à leur origine et leur date.

Pour envoyer les logs au niveau de l'abonnement à Datadog, sélectionnez **Send subscription activity logs**. Si vous ne sélectionnez pas cette option, aucun log au niveau de l'abonnement ne sera envoyé à Datadog.

Les **logs de ressource Azure** fournissent des informations clés sur les opérations réalisées sur les ressources Azure dans le [plan de données][2]. Les opérations du plan de données consistent par exemple à récupérer un secret à partir d'un coffre de clés ou à transmettre une requête à une base de données. Le contenu de ces logs de ressources varie en fonction du service Azure et du type de ressource.

Pour envoyer des logs de ressource Azure à Datadog, sélectionnez **Send Azure resource logs for all defined resources**. Les types de logs de ressource Azure sont répertoriés dans les [catégories de logs de ressource d'Azure Monitor][4]. Si vous sélectionnez cette option, tous les logs de ressource seront envoyés à Datadog, y compris pour les nouvelles ressources créées dans l'abonnement.

Il est possible de filtrer l'ensemble des ressources Azure transmettant des logs à Datadog à l'aide de tags de ressource Azure.

###### Règles de tag pour l'envoi de logs

- Les ressources Azure qui possèdent des tags `include` envoient des logs à Datadog.
- Les ressources Azure qui possèdent des tags `exclude` n'envoient pas de logs à Datadog.
- En cas de conflit entre des règles d'inclusion et d'exclusion, la règle d'exclusion est prioritaire.

Par exemple, avec la règle de tag de la capture d'écran ci-dessous, seuls les machines virtuelles, groupes de machines virtuelles identiques et plans App Service avec le tag `Datadog = True` envoient des métriques et des logs à Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Créer des logs de ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

Les **logs Azure Active Directory (Azure AD)** contiennent l'historique des activités de connexion ainsi qu'une piste d'audit des modifications apportées dans Azure AD pour un client donné. Pour envoyer ces logs à Datadog, commencez par créer une ressource Datadog. Après avoir créé une ressource Datadog dans Azure, suivez la procédure de configuration indiquée dans le guide [Datadog sur le portail Azure][10].

Après avoir terminé la configuration des métriques et logs, sélectionnez l'option **Next: Security**.

#### Securité

Grâce à la solution [Cloud Security Posture Management][13] (CSPM), vous pouvez évaluer et visualiser facilement la posture de sécurité actuelle et historique de votre environnement cloud, automatiser la collecte de preuves pour l'audit et détecter les problèmes de configuration susceptibles de rendre votre organisation vulnérable face à d'éventuelles attaques.

Pour activer la solution CSPM, sélectionnez **Enable Datadog Cloud Security Posture Management**. Cela active la solution CSPM pour tous les abonnements associés à la ressource Datadog.

Après avoir terminé la configuration de la solution CSPM, sélectionnez l'option **Next: Single sign-on**.

#### Authentification unique

(Facultatif) Si vous utilisez le fournisseur d'identité Azure Active Directory, activez l'authentification unique depuis le portail Azure vers Datadog.

Si vous associez la ressource Datadog à une organisation Datadog existante, vous ne pouvez pas configurer l'authentification unique lors de cette étape. Vous devez d'abord créer la ressource Datadog. Pour en savoir plus, consultez la section [Reconfigurer l'authentification unique][3].

{{< img src="integrations/azure/azure-us3-create-dd-resource4.png" alt="Configurer l'authentification unique US3 Azure" responsive="true" style="width:90%;">}}

Pour effectuer l'authentification unique via Azure Active Directory, cochez la case **Enable single sign-on through Azure Active Directory**.

Le portail Azure récupère la ou les applications Datadog pertinentes depuis Azure Active Directory. Les apps d'entreprise Datadog créées avant de commencer le processus de création de la ressource Datadog sont répertoriées.

Sélectionnez l'application Datadog à utiliser. Si vous n'avez pas encore créé d'application, consultez la section de la documentation relative à la [création d'une app de galerie Azure AD](#configuration-du-sso-saml).

{{< img src="integrations/azure/azure-us3-create-dd-resource5.png" alt="Activer l'authentification unique US3 Azure" responsive="true" style="width:90%;">}}

Sélectionnez l'option **Next: Tags**.

#### Tags {#tags-us3}

(Facultatif) Configurer des tags personnalisés pour votre nouvelle ressource Datadog. Attribuez-leur un nom et des paires de valeurs pour les appliquer à la ressource Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource6.png" alt="Ajouter des tags à la ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

Après avoir ajouté les tags, sélectionnez l'option **Next: Review + create**.

#### Vérification et création

Vérifiez vos paramètres et les conditions d'utilisation. Une fois le processus de validation terminé, cliquez sur **Create**. Azure déploie alors la ressource Datadog. Cette dernière lie l'abonnement à votre compte Datadog et active un certain nombre de fonctionnalités pour la gestion continue de l'intégration. Vous trouverez de plus amples détails et des instructions dans notre [guide sur la gestion de Datadog sur le portail Azure][9].

{{< img src="integrations/azure/azure-us3-create-dd-resource7.png" alt="Validation des paramètres de la ressource Datadog US3 Azure" responsive="true" style="width:90%;">}}

Une fois le déploiement terminé, sélectionnez **Go to Resource** pour afficher votre ressource Datadog.

{{< img src="integrations/azure/azure-us3-deploy-complete.png" alt="Déploiement Datadog terminé US3 Azure" responsive="true" style="width:90%;">}}

### Accéder à Datadog

Maintenant que votre ressource Datadog est créée, accédez à l'organisation Datadog associée. La méthode à suivre varie selon que vous avez créé une nouvelle organisation ou associé une organisation existante.

{{< tabs >}}
{{% tab "Création" %}}

#### Avec le SSO

Si vous avez créé une nouvelle organisation Datadog en ayant pris soin de configurer le SSO, utilisez le lien dans le volet de la ressource Datadog pour vous identifier. Il s'agit d'un lien SAML qui vous permet de vous connecter directement à votre organisation Datadog depuis la ressource Datadog dans Azure.

{{< img src="integrations/azure/azure-us3-access-dd.png" alt="Accéder à Datadog US3 Azure" responsive="true" style="width:90%;">}}

#### Sans le SSO

Si vous avez créé une organisation Datadog sans configurer le SSO, utilisez le lien de l'organisation Datadog situé dans le volet de vue d'ensemble pour configurer votre mot de passe Datadog. Une fois votre mot de passe configuré, vous pouvez utiliser le lien, qui correspond à une [URL Datadog standard][1].


[1]: http://us3.datadoghq.com
{{% /tab %}}
{{% tab "Association" %}}

Si vous avez associé une organisation Datadog existante, la méthode d'accès à votre organisation demeure inchangée.

{{% /tab %}}
{{< /tabs >}}

### Surveiller le statut de l'intégration

Une fois l'intégration configurée, Datadog commence à appeler en continu les API Azure pour recueillir les données de surveillance critiques de votre environnement Azure. Ces appels renvoient parfois des erreurs (si les identifiants fournis ont expiré, par exemple). Ces erreurs peuvent empêcher Datadog de recueillir les données de surveillance.

En cas d'erreurs critiques, l'intégration Azure génère des événements dans l'Events Explorer de Datadog et les republie toutes les cinq minutes. Vous pouvez configurer un monitor d'événement pour qu'il se déclenche lors de la détection de ces événements et envoie une notification à l'équipe appropriée.

Datadog fournit un monitor conseillé que vous pouvez utiliser comme modèle pour commencer. Pour utiliser le monitor conseillé :

1. Dans Datadog, accédez à **Monitors** -> **New Monitor** et sélectionnez l'onglet [Recommended Monitors][11].
2. Sélectionnez le monitor conseillé nommé `[Azure] Integration Errors`.
3. Apportez les modifications voulues à la requête de recherche ou aux conditions d'alerte. Par défaut, le monitor se déclenche à chaque fois qu'une nouvelle erreur est détectée et se résout si l'erreur en question n'a pas été détectée au cours des 15 dernières minutes.
4. Modifiez les messages pour la notification initiale et les notifications suivantes selon vos besoins. Notez que les événements eux-mêmes contiennent des informations pertinentes qui seront automatiquement incluses dans la notification, notamment des informations détaillées concernant le contexte, l'erreur renvoyée et les actions courantes pour y remédier.
5. [Configurez les notifications][12] de sorte qu'elles soient envoyées via les canaux privilégiés (e-mail, Slack, PagerDuty ou autres) afin de garantir que votre équipe soit prévenue en cas de problèmes liés à la collecte des données Azure.

### Configuration du SSO SAML

Pour utiliser l'authentification unique (SSO) Security Assertion Markup Language (SAML) dans la ressource Datadog, vous devez configurer une application d'entreprise.

Pour ajouter une application d'entreprise, il est nécessaire d'avoir un rôle d'administrateur global, d'administrateur d'application dans le cloud, d'administrateur d'application ou de propriétaire du service principal.

Suivez les étapes ci-dessous pour configurer une application d'entreprise :
1. Accédez au portail Azure et sélectionnez **Azure Active Directory**.
2. Dans le volet de gauche, sélectionnez **Enterprise applications**.
3. Sélectionnez **New Application**.
4. Sous la section **Add from the gallery**, recherchez Datadog. Sélectionnez le résultat de recherche, puis cliquez sur **Add**.

    {{< img src="integrations/azure/azure-us3-dd-sso-add-app.png" alt="Ajouter l'application Datadog depuis la galerie" responsive="true" style="width:90%;">}}

5. Une fois l'application créée, accédez à **Properties** dans le volet latéral. Configurez **User assignment required?** sur No, puis cliquez sur **Save**.

    {{< img src="integrations/azure/azure-us3-dd-sso-app-prop.png" alt="User assignment required - définir sur No" responsive="true" style="width:90%;">}}

6. Accédez à **Single sign-on** dans le volet latéral, puis sélectionnez SAML.

    {{< img src="integrations/azure/azure-us3-dd-sso.png" alt="SSO - SAML" responsive="true" style="width:90%;">}}

7. Sélectionnez **Yes** pour enregistrer vos réglages d'authentification unique.

    {{< img src="integrations/azure/azure-us3-basic-saml.png" alt="Configuration SAML basique US3 Azure" responsive="true" style="width:90%;">}}

8. La configuration de l'authentification unique est désormais terminée.

[1]: https://docs.microsoft.com/en-us/azure/marketplace/azure-consumption-commitment-benefit
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[3]: https://docs.microsoft.com/en-us/azure/partner-solutions/datadog/manage#reconfigure-single-sign-on
[4]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[5]: https://docs.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[6]: https://us3.datadoghq.com/signup
[7]: https://docs.datadoghq.com/fr/integrations/guide/azure-portal/
[8]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[9]: https://docs.datadoghq.com/fr/integrations/guide/azure-portal/
[10]: https://docs.datadoghq.com/fr/integrations/guide/azure-portal/#azure-active-directory-logs
[11]: https://app.datadoghq.com/monitors/recommended
[12]: /fr/monitors/notify/#notify-your-team
[13]: https://docs.datadoghq.com/fr/security_platform/cspm/
{{< /site-region >}}

#### Implémentation

##### Archivage des logs

L'archivage de logs dans Stockage Blob Azure nécessite une inscription d'application même si vous utilisez l'intégration native Azure. Pour archiver des logs dans Stockage Blob Azure, choisissez `US` dans le menu `site` disponible à droite de cette page de documentation et suivez les instructions pour configurer l'intégration à l'aide d'une inscription d'application. Il n'est pas nécessaire d'attribuer le rôle `Monitoring Reader` aux inscriptions d'application créées à des fins d'archivage.

Après avoir configuré une inscription d'application, vous pouvez [créer une archive de logs][48] à enregistrer dans Stockage Blob Azure.

**Remarque** : si votre compartiment de stockage se trouve dans un abonnement surveillé via l'intégration native Azure, un avertissement indique dans le carré d'intégration Azure que l'inscription d'application est redondante. Vous pouvez ignorer cet avertissement.

## Données collectées

### Métriques

Toutes les métriques Azure Monitor standard, ainsi que des [métriques uniques générées par Datadog][49], sont recueillies.

Pour obtenir la liste détaillée des métriques, sélectionnez le service Azure pertinent dans la [section Présentation](#presentation).

### Événements

L'intégration Azure recueille automatiquement les événements Azure Service Health. Pour les visualiser dans Datadog, accédez à l'[Events Explorer][50] et appliquez un filtre basé sur l'espace de nommage `Azure Service Health`.

### Checks de service

L'intégration Azure n'inclut aucun check de service.

### Tags

Les métriques, événements et checks de service des intégrations Azure reçoivent les tags suivants :

| Intégration                             | Espace de nommage                                   | Clés de tag Datadog                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes les intégrations Azure                  | Tous                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (le cas échéant)                                                            |
| Intégrations VM Azure                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Plans Azure App Service                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Applications Web et Fonctions Azure App Services | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (applications web Linux uniquement), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure SQL Database                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Pour les liens de réplication uniquement :  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Utilisation et quotas Azure                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## Dépannage

Consultez le guide [Dépannage d'Azure][51].

Besoin d'aide ? Contactez l'[assistance Datadog][52].

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
[33]: https://docs.datadoghq.com/fr/integrations/azure_recovery_service_vault/
[34]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache/
[35]: https://docs.datadoghq.com/fr/integrations/azure_relay/
[36]: https://docs.datadoghq.com/fr/integrations/azure_search/
[37]: https://docs.datadoghq.com/fr/integrations/azure_blob_storage/
[38]: https://docs.datadoghq.com/fr/integrations/azure_file_storage/
[39]: https://docs.datadoghq.com/fr/integrations/azure_queue_storage/
[40]: https://docs.datadoghq.com/fr/integrations/azure_table_storage/
[41]: https://docs.datadoghq.com/fr/integrations/azure_stream_analytics/
[42]: https://docs.datadoghq.com/fr/integrations/azure_sql_database/
[43]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool/
[44]: https://docs.datadoghq.com/fr/integrations/azure_usage_and_quotas/
[45]: https://docs.datadoghq.com/fr/integrations/azure_vm/
[46]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set/
[47]: https://docs.datadoghq.com/fr/integrations/azure_virtual_networks/
[48]: https://docs.datadoghq.com/fr/logs/log_configuration/archives/?tab=azurestorage#configure-an-archive'
[49]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[50]: https://app.datadoghq.com/event/explorer
[51]: https://docs.datadoghq.com/fr/integrations/guide/azure-troubleshooting/
[52]: https://docs.datadoghq.com/fr/help/
