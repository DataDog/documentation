---
app_id: google-cloud-platform
app_uuid: 8516e126-1eac-45e5-8e34-ff43db45f362
assets:
  dashboards:
    gce: assets/dashboards/gce.json
    gcp_overview: assets/dashboards/gcp_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: gcp.gce.instance.cpu.utilization
      metadata_path: metadata.csv
      prefix: gcp
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 61
    source_type_name: Google Cloud Platform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- iot
- log collection
- network
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_platform
integration_id: google-cloud-platform
integration_title: Google Cloud Platform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_platform
public_title: Google Cloud Platform
short_description: Google Cloud Platform est un ensemble de services web qui constituent
  une plateforme d'informatique en nuage.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::IoT
  - Category::Log Collection
  - Category::Network
  - Offering::Intégration
  configuration: README.md#Setup
  description: Google Cloud Platform est un ensemble de services web qui constituent
    une plateforme d'informatique en nuage.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  - resource_type: autres
    url: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  - resource_type: blog
    url: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/recent-changes-tab/
  support: README.md#Support
  title: Google Cloud Platform
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

{{< site-region region="gov" >}}
<div class="alert alert-danger"><a href="https://cloud.google.com/iam/docs/service-account-impersonation">L'usurpation de compte de service</a> n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}})</div>
{{< /site-region >}}


## Vue d'ensemble

Utilisez ce guide pour commencer à surveiller votre environnement Google Cloud. Cette approche simplifie la configuration des environnements Google Cloud comportant plusieurs projets, vous permettant de maximiser votre couverture de surveillance.

{{% collapse-content title="Voir la liste complète des intégrations Google Cloud" level="h4" %}}
<div class="alert alert-danger">
L'intégration Google Cloud de Datadog collecte <a href="https://cloud.google.com/monitoring/api/metrics_gcp">toutes les métriques Google Cloud</a>. Datadog met régulièrement à jour la documentation pour répertorier chaque intégration dépendante, mais cette liste peut ne pas refléter les derniers services ou métriques disponibles.

 Si vous ne voyez pas d'intégration pour un service Google Cloud spécifique, contactez <a href="https://www.datadoghq.com/support/">l'assistance Datadog</a>.
</div>

| Intégration                         | Rôle                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | PaaS (plateforme en tant que service) permettant de développer des applications évolutives                           |
| [BigQuery][2]                       | Entrepôt de données pour entreprise                                                             |
| [Bigtable][3]                       | Service de base de données Big Data NoSQL                                                       |
| [Cloud SQL][4]                      | Service de base de données MySQL                                                                |
| [API Cloud][5]                     | Interfaces de programmation pour tous les services Google Cloud Platform                        |
| [Cloud Armor][6]                   | Service de sécurité réseau conçu pour protéger contre les attaques par déni de service et les attaques web    |
| [Cloud Composer][7]                 | Service d'orchestration de workflows entièrement géré                                         |
| [Cloud Dataproc][8]                 | Service cloud permettant d'exécuter des clusters Apache Spark et Apache Hadoop                   |
| [Cloud Dataflow][9]                | Un service entièrement géré pour la transformation et l'enrichissement des données en mode flux et en mode batch. |
| [Cloud Filestore][10]                | Stockage de fichiers entièrement géré hautes performances                                          |
| [Cloud Firestore][11]                | Base de données flexible et évolutive pour le développement mobile, web et serveur                 |
| [Cloud Interconnect][12]            | Connectivité hybride                                                                   |
| [Cloud IoT][13]                     | Connexion et gestion de vos appareils en toute sécurité                                               |
| [Cloud Load Balancing][14]          | Répartition de ressources informatiques à équilibrage de charge                                            |
| [Cloud Logging][15]                 | Gestion et analyse de logs en temps réel                                                 |
| [Cloud Memorystore pour Redis][16]   | Service de stockage de données en mémoire entièrement géré                                          |
| [Cloud Router][17]                  | Échange d'itinéraires entre votre VPC et les réseaux sur site à l'aide du protocole BGP                |
| [Cloud Run][18]                     | Plateforme de calcul gérée qui exécute des conteneurs sans état via HTTP                  |
| [Cloud Security Command Center][19] | Security Command Center est un service de signalement des menaces                                |
| [Cloud Tasks][20]                   | Files d'attente de tâches distribuées                                                               |
| [Cloud TPU][21]                     | Entraînement et exécution de modèles d'apprentissage automatique                                                 |
| [Compute Engine][22]                | Machines virtuelles hautes performances                                                     |
| [Container Engine][23]              | Kubernetes, géré par Google                                                         |
| [Datastore][24]                     | Base de données NoSQL                                                                        |
| [Firebase][25]                      | Plateforme mobile pour le développement d'applications                                           |
| [Functions][26]                     | Plateforme sans serveur pour la création de microservices basés sur des événements                            |
| [Kubernetes Engine][27]             | Gestionnaire de clusters et système d'orchestration                                              |
| [Machine Learning][28]              | Services d'apprentissage automatique                                                             |
| [Private Service Connect][29]       | Accéder à des services gérés avec des connexions VPC privées                                  |
| [Pub/Sub][30]                       | Service de messagerie en temps réel                                                           |
| [Spanner][31]                       | Service de base de données relationnelle à évolutivité horizontale et à cohérence forte               |
| [Storage][32]                       | Stockage d'objets unifié                                                                |
| [Vertex AI][33]                     | Créer, former et déployer des modèles personnalisés dʼapprentissage automatique (ML)                          |
| [VPN][34]                           | Fonctionnalité de réseau géré                                                         |
{{% /collapse-content %}}

## Configuration

Configurez lʼintégration Datadog/Google Cloud pour recueillir des métriques et des logs à partir de vos services Google Cloud.

### Prérequis

1. Si votre organisation restreint les identités en fonction de leur domaine, vous devez ajouter l'identité client Datadog à la liste blanche de votre stratégie. L'identité client de Datadog est `C0147pk0i`.

2. Pour utiliser les fonctionnalités d'emprunt d'identité de compte de service et de découverte automatique des projets, et ainsi surveiller vos projets, il est nécessaire d'attribuer certains rôles et d'activer certaines API. Avant de commencer, vérifiez que les API suivantes sont activées pour **chacun des projets** à surveiller :

[Cloud Monitoring API][35] 
: Permet à Datadog d'interroger les données de métriques de Google Cloud.

[Compute Engine API][36] 
: Permet à Datadog de découvrir les données des instances de calcul.

[Cloud Asset API][37]
: Permet à Datadog de demander les ressources Google Cloud et d'associer les tags pertinents aux métriques.

[Cloud Resource Manager API][38] 
: Permet à Datadog d'ajouter des métriques avec les ressources et tags appropriés.

[IAM API][39]
: Permet à Datadog de s'authentifier auprès de Google Cloud.

[Cloud Billing API][40] 
: Permet aux développeurs de gérer la facturation de leurs projets Google Cloud Platform de manière programmatique. Consultez la documentation relative à [Cloud Cost Management (CCM)][41] pour plus d'informations.

3. Vérifiez que les projets surveillés ne sont pas configurés en tant que [projets de surveillance][42] récupérant des métriques à partir d'autres projets.

### Collecte de métriques

#### Installation

{{< tabs >}}
{{% tab "Org- and Folder-level project discovery" %}}


{{< site-region region="gov" >}}
La collecte de métriques au niveau de l'organisation n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
Une surveillance au niveau de l'organisation (ou du dossier) est recommandée pour assurer une couverture complète de tous les projets, y compris les projets futurs qui pourraient être créés dans l'organisation ou le dossier.

**Remarque** : votre compte utilisateur [Google Cloud Identity][408] doit disposer du rôle `Admin` assigné à la portée souhaitée (par exemple, `Organization Admin`) pour effectuer la configuration dans Google Cloud.

{{% collapse-content title="1. Créer un compte de service Google Cloud dans le projet par défaut" level="h5" %}}
1. Ouvrez votre [console Google Cloud][401].
2. Accédez à **IAM & Admin** > **Service Accounts**.
3. Cliquez sur **Create service account** en haut de la page.
4. Saisissez un nom unique pour le compte de service.
5. Cliquez sur **Done** pour finaliser la création du compte de service.

[401]: https://console.cloud.google.com/
{{% /collapse-content %}} 

{{% collapse-content title="2. Ajouter le compte de service au niveau de l'organisation ou d'un dossier" level="h5" %}}
1. Dans la console Google Cloud, accédez à la page **IAM**.
2. Sélectionnez un dossier ou une organisation.
3. Pour attribuer un rôle à un service principal qui ne possède pas encore de rôle pour la ressource, cliquez sur **Grant Access**, puis saisissez l'adresse e-mail du compte de service créé précédemment.
4. Saisissez l'adresse e-mail du compte de service.
5. Attribuez les rôles suivants :
  - [Compute Viewer][402] : fournit un accès **en lecture seule** pour obtenir et lister les ressources Compute Engine
  - [Monitoring Viewer][403] : fournit un accès **en lecture seule** aux données de monitoring disponibles dans votre environnement Google Cloud
  - [Cloud Asset Viewer][404] : fournit un accès **en lecture seule** aux métadonnées des ressources cloud
  - [Browser][405] : fournit un accès **en lecture seule** à la hiérarchie d'un projet
  - [Service Usage Consumer][406] (**optionnel**, pour les environnements multi-projets) : fournit l'[attribution des coûts et quotas d'API par projet](#attribution-des-couts-et-quotas-d-api-par-projet) après activation par l'assistance Datadog
6. Cliquez sur **Save**.

**Remarque** : le rôle `Browser` est requis uniquement dans le projet par défaut du compte de service. Les autres projets nécessitent uniquement les autres rôles listés.

[402]: https://cloud.google.com/compute/docs/access/iam#compute.viewer
[403]: https://cloud.google.com/monitoring/access-control#monitoring_roles
[404]: https://cloud.google.com/iam/docs/understanding-roles#cloudasset.viewer
[405]: https://cloud.google.com/resource-manager/docs/access-control-proj#browser
[406]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
{{% /collapse-content %}}

{{% collapse-content title="3. Ajouter le principal Datadog à votre compte de service" level="h5" %}}
**Remarque** : si vous avez précédemment configuré l'accès à l'aide d'un principal Datadog partagé, vous pouvez révoquer cette autorisation une fois les étapes suivantes terminées.

1. Dans Datadog, accédez à **Integrations** > [**Google Cloud Platform**][407].
2. Cliquez sur **Add Google Cloud Account**.
Si aucun projet n'est encore configuré, vous serez automatiquement redirigé vers cette page.
3. Copiez votre service principal Datadog et conservez-le pour la prochaine section.

{{< img src="integrations/google_cloud_platform/principal-2.png" alt="La page permettant d'ajouter un nouveau compte Google Cloud dans le carré d'intégration Google Cloud de Datadog" style="width:70%;">}}

**Remarque** : gardez cette fenêtre ouverte pour la section 4.

4. Dans la [console Google Cloud][409], dans le menu **Service Accounts**, recherchez le compte de service que vous avez créé à l'étape 1. 
5. Allez dans l'onglet **Permissions** et cliquez sur **Grant Access**.

{{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interface de la console Google Cloud, avec l'onglet Permissions sous Service Accounts." style="width:70%;">}}

6. Collez votre service principal Datadog dans la zone **New Principals**.
7. Attribuez le rôle **Service Account Token Creator**.
8. Cliquez sur **Save**.

[407]: https://app.datadoghq.com/integrations/google-cloud-platform
[409]: https://console.cloud.google.com/
{{% /collapse-content %}}

{{% collapse-content title="4. Finaliser la configuration de l'intégration dans Datadog" level="h5" %}}
1. Dans la console Google Cloud, accédez à l'onglet **Details** du **Service Account**. Sur cette page, trouvez l'adresse email associée à ce compte de service Google. Elle suit le format `<SA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com`.
2. Copiez cette adresse e-mail.
3. Revenez sur le carré de configuration de l'intégration dans Datadog (là où vous avez copié le principal Datadog lors de la section précédente).
4. Collez l'adresse email copiée dans le champ **Add Service Account Email**.
5. Cliquez sur **Verify and Save Account**.
{{% /collapse-content %}}

Les métriques apparaissent dans Datadog environ **15 minutes** après la configuration.

[408]: https://cloud.google.com/identity/docs/overview
{{< /site-region >}}


#### Bonnes pratiques pour la surveillance de plusieurs projets

##### Activer l'attribution des coûts et quotas d'API par projet

Par défaut, Google Cloud attribue les coûts liés aux appels d'API de monitoring ainsi que l'utilisation des quotas d'API au projet contenant le compte de service utilisé pour cette intégration. Dans les environnements Google Cloud comportant plusieurs projets, il est recommandé d'activer l'attribution des coûts et des quotas par projet. Lorsque cette option est activée, les coûts et l'utilisation des quotas sont attribués au projet *interrogé*, plutôt qu'au projet contenant le compte de service. Cela permet d'obtenir une meilleure visibilité sur les coûts de monitoring générés par chaque projet, tout en contribuant à éviter d'atteindre les limites de quotas d'API.

Pour activer cette fonctionnalité :
1. Assurez-vous que le compte de service Datadog dispose du rôle [Service Usage Consumer][1] à la portée souhaitée (dossier ou organisation).
2. Cliquez sur le bouton **Enable Per Project Quota** dans l'onglet **Projects** de la [page d'intégration Google Cloud][2].

[1]: https://cloud.google.com/service-usage/docs/access-control#serviceusage.serviceUsageConsumer
[2]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /tab %}}

{{% tab "Project-level metric collection" %}}


{{< site-region region="gov" >}}
L'intégration Google Cloud de Datadog pour le site {{< region-param key="dd_site_name" >}} utilise des comptes de service pour établir une connexion API entre Google Cloud et Datadog. Suivez les instructions ci-dessous pour créer un compte de service et fournir à Datadog les identifiants nécessaires pour exécuter des appels API en votre nom. 

La fonctionnalité [dʼemprunt d'identité de compte de service][201] n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.

**Remarque** : vous devez avoir activé [Google Cloud Billing][204], l'[API Cloud Monitoring][205], l'[API Compute Engine][206] et l'[API Cloud Asset][207] pour les projets que vous souhaitez surveiller.

1. Accédez à la [page des identifiants Google Cloud][202] pour le projet Google Cloud que vous souhaitez intégrer à Datadog.
2. Cliquez sur **Create credentials**.
3. Sélectionnez **Service account**.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="Paramètres" popup="true" style="width:80%;">}}

4. Saisissez un nom unique pour le compte de service et ajoutez éventuellement une description.
5. Cliquez sur **Create and continue**.
6. Ajoutez les rôles suivants :
    - Compute Viewer
    - Monitoring Viewer
    - Cloud Asset Viewer
7.  Cliquez sur **Done**.
    **Remarque** : vous devez être un administrateur clé de compte de service pour sélectionner les rôles Compute Engine et Cloud Asset. Tous les rôles sélectionnés permettent à Datadog de recueillir des métriques, des tags, des événements et des étiquettes dʼutilisateurs à votre place.
8. En bas de la page se trouvent vos comptes de service. Sélectionnez celui que vous venez de créer.
9. Cliquez sur **Add Key** -> **Create new key** et choisissez **JSON** comme type.
10. Cliquez sur **Create**. Un fichier de clé JSON est alors téléchargé sur votre ordinateur. Souvenez-vous de son emplacement, car vous en aurez besoin pour terminer lʼinstallation.
11. Accédez à la [page relative à lʼintégration Datadog/Google Cloud][203].
12. Dans l'onglet **Configuration**, sélectionnez **Upload Key File** pour intégrer ce projet à Datadog.
13. Si vous le souhaitez, vous pouvez utiliser des tags pour exclure des hosts de cette intégration. Vous trouverez des instructions détaillées à ce sujet dans la [section relative aux configurations](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="paramètres" popup="true" style="width:80%;">}}

14. Cliquez sur _Install/Update_.
15. Si vous souhaitez surveiller plusieurs projets, utilisez l'une des méthodes suivantes :

    - Répétez les étapes ci-dessus pour utiliser plusieurs comptes de service.
    - Utilisez le même compte de service en modifiant la valeur de `project_id` dans le fichier JSON téléchargé à l'étape 10. Importez ensuite le fichier dans Datadog, tel que décrit aux étapes 11 à 14.

[201]: https://cloud.google.com/iam/docs/service-account-impersonation
[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1" >}}
Grâce à l'[emprunt d'identité de compte de service][301] et à la découverte automatique des projets, vous pouvez intégrer Datadog à [Google Cloud][302].

Cette approche vous permet de surveiller tous les projets accessibles depuis un compte de service, en attribuant des rôles IAM aux projets pertinents. Il est possible d'attribuer ces rôles à des projets spécifiques, mais aussi de les attribuer à l'échelle d'une organisation ou d'un dossier, afin de surveiller des groupes de projets. De cette façon, Datadog découvre et surveille automatiquement tous les projets d'un contexte donné, y compris les nouveaux projets qui intègrent ultérieurement le groupe.

{{% collapse-content title="1. Créer un compte de service Google Cloud" level="h5" id="create-service-account" %}}
1. Ouvrez votre [console Google Cloud][303].
2. Accédez à **IAM & Admin** > **Service Accounts**.
3. Cliquez sur **Create service account** en haut de la page.
4. Attribuez un nom unique au compte de service, puis cliquez sur **Create and continue**.
5. Ajoutez les rôles suivants au compte de service :
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Navigateur
6. Cliquez sur **Continue**, puis sur **Done** pour terminer la création du compte de service.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Interface de la console Google Cloud, avec le processus de création de compte de service. Sous l'étape « Grant this service account access to project », les quatre rôles indiqués dans les instructions sont ajoutés." style="width:70%;">}}

[303]: https://console.cloud.google.com/
{{% /collapse-content %}} 

{{% collapse-content title="2. Ajouter le principal Datadog à votre compte de service" level="h5" id="add-principal-to-service-account" %}}
1. Dans Datadog, accédez à la page [**Integrations** > **Google Cloud Platform**][305].
2. Cliquez sur **Add GCP Account**. SI vous n'avez pas encore configuré de projet, vous êtes automatiquement redirigé vers cette page.
3. Si vous n'avez pas généré de service principal Datadog pour votre organisation, cliquez sur le bouton **Generate Principal**.
4. Copiez votre service principal Datadog et conservez-le pour la prochaine section.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interface Datadog, avec le processus d'ajout d'un nouveau compte GCP. La première étape, « Add Datadog Principal to Google », contient une zone de texte permettant à l'utilisateur de générer un service principal Datadog et de le copier dans son presse-papiers. La deuxième étape, « Add Service Account Email », inclut une zone de texte que l'utilisateur peut remplir lors de la section 3." style="width:70%;">}}

   **Remarque** : gardez cette fenêtre ouverte pour la section suivante.
5. Dans la [console Google Cloud][304] sous le menu **Service Accounts**, recherchez le compte de service que vous avez créé lors de la [première section](#creer-votre-compte-de-service).
6. Accédez à l'onglet **Permissions**, puis cliquez sur **Grant Access**.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interface de la console Google Cloud, avec l'onglet Permissions sous Service Accounts." style="width:70%;">}}
7. Collez votre service principal Datadog dans la zone **New Principals**.
8. Attribuez le rôle **Service Account Token Creator**, puis cliquez sur **SAVE**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Interface de la console Google Cloud, avec les sections « Add principals » et « Assign roles »." style="width:70%;">}}

**Remarque** : si vous avez déjà configuré l'accès à l'aide d'un service principal Datadog partagé, vous pouvez révoquer l'autorisation pour ce service principal après avoir suivi ces étapes.

[304]: https://console.cloud.google.com/
[305]: https://app.datadoghq.com/integrations/google-cloud-platform
{{% /collapse-content %}} 

{{% collapse-content title="3. Finaliser la configuration de l'intégration dans Datadog" level="h5" %}}
1. Dans votre console Google Cloud, accédez à l'onglet **Service Account** > **Details**, afin de consulter l'adresse e-mail associée à ce compte de service Google. Son format est `<sa-name>@<project-id>.iam.gserviceaccount.com`.
2. Copiez cette adresse e-mail.
3. Revenez sur le carré de configuration de l'intégration dans Datadog (là où vous avez copié votre service principal Datadog lors de la [section précédente](#ajouter-le-principal-a-votre-compte-de-service)).
4. Dans la zone de texte sous **Add Service Account Email**, collez l'adresse e-mail que vous avez précédemment copiée.
5. Cliquez sur **Verify and Save Account**.

Les métriques apparaîtront dans Datadog environ quinze minutes après la configuration.
{{% /collapse-content %}} 

[301]: https://cloud.google.com/iam/docs/service-account-impersonation
[302]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
{{< /site-region >}}


{{% /tab %}}
{{< /tabs >}}

#### Validation

Pour consulter vos métriques, utilisez le menu de gauche pour accéder à **Metrics** > **Summary**, puis recherchez `gcp` :

{{< img src="integrations/google_cloud_platform/gcp_metric_summary.png" alt="La page Metric Summary dans Datadog filtrée sur les métriques commençant par GCP" style="width:100%;" >}}

#### Configuration

{{% collapse-content title="Limiter la collecte de métriques par espace de noms" level="h5" %}}

Vous pouvez, si vous le souhaitez, choisir les services Google Cloud à surveiller avec Datadog. Configurer la collecte de métriques pour des services spécifiques vous permet d'optimiser les coûts liés à l'API Google Cloud Monitoring tout en conservant la visibilité sur vos services critiques.

Sous l'onglet **Metric Collection** de la page d'intégration Google Cloud dans la [page d'intégration Google Cloud][43] de Datadog, décochez les espaces de nommage des métriques à exclure. Vous pouvez également désactiver la collecte de tous les espaces de nommage.

{{< img src="integrations/google_cloud_platform/limit_metric_namespaces.png" alt="L'onglet Metric Collection dans la page d'intégration Google Cloud de Datadog" style="width:80%;" >}}{{% /collapse-content %}}

{{% collapse-content title="Limiter la collecte de métriques par tag" level="h5" %}}

Par défaut, toutes vos instances Google Compute Engine (GCE) apparaissent dans la vue d'ensemble de l'infrastructure de Datadog. Datadog les taggue automatiquement avec les tags d'hôte GCE ainsi que les éventuels labels GCE que vous avez ajoutés.

Vous pouvez éventuellement utiliser des tags pour limiter les instances importées dans Datadog. Dans l'onglet **Metric Collection** d'un projet, saisissez les tags dans le champ **Limit Metric Collection Filters**. Seuls les hosts correspondant à l'un des tags définis seront importés dans Datadog. Vous pouvez utiliser des jokers (`?` pour un caractère, `*` pour plusieurs caractères) pour cibler de nombreux hosts, ou `!` pour exclure certains hosts. Cet exemple inclut toutes les instances de type `c1*` mais exclut les hosts de staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la page [Organiser des ressources à l'aide d'étiquettes][44] de Google pour en savoir plus.

{{% /collapse-content %}}

#### Utiliser l'Agent Datadog

Utilisez l'[Agent Datadog][45] pour collecter les [métriques les plus granulaires et à faible latence][46] depuis votre infrastructure. Installez l'Agent sur tout host, y compris [GKE][47], afin d'obtenir une visibilité accrue grâce aux [traces][48] et aux [logs][49] qu'il peut collecter. Pour plus d'informations, consultez [Pourquoi installer l'Agent Datadog sur mes instances cloud ?][50]

## Collecte de logs

{{< tabs >}}
{{% tab "Dataflow Method (Recommended)" %}}

Transférez les logs de vos services Google Cloud vers Datadog en utilisant [Google Cloud Dataflow][1] et le [modèle Datadog][2]. Cette méthode permet la compression et le regroupement des événements avant leur envoi vers Datadog.

Vous pouvez utiliser le module [terraform-gcp-datadog-integration][3] pour gérer cette infrastructure via Terraform, ou suivre les étapes ci-dessous pour :

1. Créer un [sujet Pub/Sub][4] et un [abonnement pull][5] pour recevoir les logs depuis un récepteur de logs configuré
2. Créer un compte de service personnalisé pour Dataflow afin d'appliquer le principe du [moindre privilège][6] à vos workers Dataflow
3. Créer un [récepteur de logs][7] pour publier les logs sur la rubrique Pub/Sub
4. Créer un job Dataflow à l'aide du [modèle Datadog][2] pour diffuser les logs depuis l'abonnement Pub/Sub vers Datadog

Vous gardez un contrôle total sur les logs envoyés à Datadog grâce aux filtres que vous définissez dans le récepteur de logs, y compris pour les logs GCE et GKE. Consultez la page [Langage de requête Logging][8] de Google pour écrire vos filtres. Pour un aperçu complet de l'architecture mise en place, consultez [Stream logs from Google Cloud to Datadog (en anglais)][9] dans le Cloud Architecture Center.

**Remarque :** vous devez activer l'**API Dataflow** pour utiliser Google Cloud Dataflow. Consultez la rubrique [Activer des API][10] dans la documentation Google Cloud pour plus d'informations.

Pour collecter les logs d'applications exécutées sur GCE ou GKE, vous pouvez également utiliser l'[Agent Datadog][11].

#### 1. Créer un sujet et un abonnement Cloud Pub/Sub

1. Accédez à la [console Cloud Pub/Sub][12] et créez un nouveau sujet. Sélectionnez l'option **Add a default subscription** pour simplifier la configuration.

   **Remarque :** vous pouvez également configurer manuellement un [abonnement Cloud Pub/Sub][13] avec le type de livraison **Pull**. Si vous créez manuellement votre abonnement Pub/Sub, laissez la case `Enable dead lettering` **non cochée**. Pour plus de détails, consultez la section [Fonctionnalités Pub/Sub non compatibles][14].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="la page « Créer un sujet » dans la console Google Cloud avec la case « Ajouter un abonnement par défaut » cochée" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur *Create*.

3. Créez un autre sujet et un autre abonnement par défaut pour gérer tous les messages de log rejetés par lʼAPI Datadog. Le nom de ce sujet est utilisé dans le modèle Dataflow Datadog, où il fait partie de la configuration du chemin pour le [paramètre de modèle][10] `outputDeadletterTopic`. Une fois que vous avez inspecté et corrigé tous les problèmes des messages d'échec, renvoyez-les au sujet `export-logs-to-datadog` d'origine en exécutant une tâche [Modèle Pub/Sub vers Pub/Sub][15]. 

4. Datadog recommande de créer un secret dans [Secret Manager][16] avec la valeur de votre clé d'API Datadog valide, afin de l'utiliser plus tard dans le modèle Dataflow Datadog.

**Avertissement** : les Cloud Pub/Sub sont inclus dans les [quotas et limites de Google Cloud][7]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs Pub/Sub](#surveiller-la-redirection-des-logs-cloud-pubsub) pour découvrir comment configurer des notifications de monitor si vous vous approchez de ces limites.

#### 2. Créer un compte de service de worker Dataflow personnalisé

Par défaut, les workers de pipeline Dataflow utilisent le [compte de service Compute Engine par défaut][17] de votre projet, qui accorde des autorisations pour toutes les ressources du projet. Si vous transmettez des logs d'un environnement **Production**, il est conseillé de privilégier la création d'un compte de service de worker personnalisé n'incluant que les rôles et les autorisations nécessaires, et d'attribuer ce compte de service à vos workers de pipeline Dataflow.

1. Accédez à la page [Service Accounts][18] de la console Google Cloud et sélectionnez votre projet.
2. Cliquez sur **CREATE SERVICE ACCOUNT** et attribuez un nom descriptif au compte de service. Cliquez sur **CREATE AND CONTINUE**.
3. Ajoutez les rôles dans le tableau des autorisations correspondant et cliquez sur **DONE**.

##### Autorisations requises

[Administrateur Dataflow][19]   
: `roles/dataflow.admin` <br> Permet au compte de service d'effectuer des tâches administratives Dataflow.

[Nœud de calcul Dataflow][20]
: `roles/dataflow.worker` <br> Permet au compte de service d'effectuer des opérations de job Dataflow.

[Lecteur Pub/Sub][21] 
: `roles/pubsub.viewer` <br> Permet au compte de service de consulter les messages de l'abonnement Pub/Sub avec vos logs Google Cloud.

[Abonné Pub/Sub][22]
: `roles/pubsub.subscriber` <br> Permet au compte de service de consommer les messages de l'abonnement Pub/Sub avec vos logs Google Cloud.

[Éditeur Pub/Sub][1]
: `roles/pubsub.publisher`<br> Permet au compte de service de publier les messages ayant échoué dans un abonnement distinct, ce qui permet d'analyser ou de renvoyer les logs.

[Accesseur de secrets Secret Manager][23]
: `roles/secretmanager.secretAccessor` <br> Permet au compte de service d'accéder à la clé d'API Datadog dans Secret Manager.

[Administrateur des objets Storage][24]
: `roles/storage.objectAdmin`<br> permet au compte de service de lire et d'écrire sur le compartiment Cloud Storage indiqué pour les fichiers en staging.

**Remarque** : si vous ne créez par de compte de service pour les workers de pipeline Dataflow, assurez-vous que le compte de service Compute Engine par défaut possède les autorisations requises ci-dessus.

#### 3. Exporter des logs depuis le sujet Pub/Sub Google Cloud

1. Accédez à [la page Log Explorer][25] dans la console Google Cloud.
2. Depuis lʼonglet **Log Router**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez _Cloud Pub/Sub_ comme destination et sélectionnez le sujet Cloud Pub/Sub créé à cette fin. **Remarque** : le sujet Cloud Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Choisissez les logs que vous souhaitez inclure dans le récepteur avec un filtre d'inclusion ou d'exclusion facultatif. Vous pouvez filtrer les logs avec une requête de recherche, ou utiliser [l'exemple de fonction][5]. Par exemple, si vous souhaitez inclure seulement 10 % des logs avec `ERROR` comme niveau de `severity`, créez un filtre d'inclusion avec `severity="ERROR" AND sample(insertId, 0.1)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter_2.png" alt="Le filtre dʼinclusion pour un récepteur de logs Google Cloud avec une requête ayant comme propriétés severity=ERROR et sample(insertId, 0.1)" >}}

6. Cliquez sur **Create Sink**.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même sujet Cloud Pub/Sub en utilisant plusieurs récepteurs.

#### 4. Créer et exécuter la tâche Dataflow

1. Accédez à la page de [création d'une tâche à partir d'un modèle][17] dans la console Google Cloud.
2. Donnez un nom à la tâche et sélectionnez un endpoint régional Dataflow.
3. Sélectionnez `Pub/Sub to Datadog` dans la liste déroulante **Dataflow template**, et la section **Required parameters** apparaît.
   a. Sélectionnez l'abonnement en entrée dans la liste déroulante **Pub/Sub input subscription**.
   b. Saisissez les informations suivantes dans le champ **Datadog logs API URL** :
   <pre>https://{{< region-param key="http_endpoint" code="true" >}}</pre>

   **Remarque** : assurez-vous que le sélecteur de site Datadog à droite de la page est défini sur votre [site Datadog][22] avant de copier l'URL ci-dessus.

   c. Sélectionnez le sujet créé pour recevoir les échecs de messages dans la liste déroulante **Output deadletter Pub/Sub topic**.
   d. Indiquez un chemin d'accès pour les fichiers temporaires dans votre compartiment de stockage dans le champ **Temporary location**.

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Paramètres requis dans le modèle Dataflow Datadog" style="width:80%;">}}

4. Sous **Optional Parameters**, cochez `Include full Pub/Sub message in the payload`.

5. Si vous avez créé un secret dans Secret Manager avec la valeur de votre clé d'API Datadog comme indiqué dans [étape 1](#1-creer-un-sujet-et-un-abonnement-cloud-pubsub)), entrez le **nom de la ressource** du secret dans le champ **Google Cloud Secret Manager ID**.

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec les champs de lʼID de Secret Manager dans Google Cloud et la source de la clé dʼAPI transmise mis en évidence" style="width:80%;">}}

Consultez la rubrique [Paramètres de modèle][10] dans le modèle Dataflow pour en savoir plus sur l'utilisation des autres options disponibles :

   - `apiKeySource=KMS` avec `apiKeyKMSEncryptionKey` défini sur l'ID de votre clé [Cloud KMS][19] et `apiKey` défini sur la clé d'API chiffrée
   - **Non conseillé** : `apiKeySource=PLAINTEXT` avec `apiKey` défini sur la clé dʼAPI en texte brut

6. Si vous avez créé un compte service de worker personnalisé, sélectionnez-le dans le menu déroulant **Service account email**.

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec le menu déroulant de lʼe-mail du compte de service mis en évidence" style="width:80%;">}}

7. Cliquez sur **RUN JOB**.

**Remarque** : si vous possédez un VPC partagé, consultez la page [Spécifier un réseau et un sous-réseau][20] de la documentation Dataflow pour obtenir des instructions sur la spécification des paramètres `Network` et `Subnetwork`.

#### Validation

Les nouveaux événements de log envoyés au sujet Cloud Pub/Sub apparaissent dans le [Log Explorer de Datadog][24].

**Remarque** : vous pouvez utiliser le [simulateur de coût de Google Cloud][26] pour calculer les coûts potentiels.

#### Surveiller la redirection des logs Cloud Pub/Sub

Lʼ[intégration Google Cloud Pub/Sub][4] fournit des métriques utiles pour surveiller l'état de la redirection des logs :

   - `gcp.pubsub.subscription.num_undelivered_messages` pour le nombre de messages en attente de livraison
   - `gcp.pubsub.subscription.oldest_unacked_message_age` pour l'âge du plus ancien message non acquitté dans un abonnement

Utilisez les métriques ci-dessus avec un [monitor de métrique][72] pour recevoir des alertes pour les messages dans vos abonnements d'entrée et de lettres mortes.

#### Surveiller le pipeline Dataflow

Utilisez [lʼintégration Google Cloud Dataflow][28] de Datadog pour surveiller tous les aspects de vos pipelines Dataflow. Vous pouvez voir toutes vos métriques Dataflow principales sur le dashboard prêt à l'emploi, doté de données contextuelles telles que des informations sur les instances GCE qui exécutent vos workloads Dataflow, et votre débit Pub/Sub.

Vous pouvez également utiliser un [monitor recommandé][29] préconfiguré pour configurer des notifications pour les augmentations du temps de backlog dans votre pipeline. Pour en savoir plus, lisez la section [Monitor your Dataflow pipelines with Datadog][30] (en anglais) dans le blog de Datadog.


[1]: https://cloud.google.com/dataflow
[2]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[3]: https://github.com/GoogleCloudPlatform/terraform-gcp-datadog-integration
[4]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub/
[5]: https://cloud.google.com/pubsub/docs/create-subscription
[6]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[7]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[8]: https://cloud.google.com/logging/docs/view/logging-query-language
[9]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
[10]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[11]: https://docs.datadoghq.com/fr/agent/
[12]: https://console.cloud.google.com/cloudpubsub/topicList
[13]: https://console.cloud.google.com/cloudpubsub/subscription/
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[16]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[17]: https://console.cloud.google.com/dataflow/createjob
[18]: https://console.cloud.google.com/iam-admin/serviceaccounts
[19]: https://cloud.google.com/kms/docs
[20]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[21]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[22]: https://console.cloud.google.com/logs/viewer
[23]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[24]: https://app.datadoghq.com/logs
[25]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[26]: https://cloud.google.com/products/calculator
[27]: https://docs.datadoghq.com/fr/monitors/types/metric/
[28]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[29]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[30]: https://cloud.google.com/storage/docs/access-control/iam-roles/
{{% /tab %}}
{{% tab "Pub/Sub Push Method (Legacy)" %}}

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La collecte des logs Google Cloud à l'aide d'un abonnement Push Pub/Sub</a> est en cours de **dépréciation**.

La documentation ci-dessus relative à l'abonnement **Push** n'est maintenue que pour le dépannage ou la modification d'anciennes configurations.

Utilisez un abonnement **Pull** avec le modèle Dataflow de Datadog, comme décrit dans la [méthode Dataflow][1], pour transférer vos logs Google Cloud vers Datadog.


[1]: http://docs.datadoghq.com/integrations/google_cloud_platform/?tab=dataflowmethodrecommended
{{% /tab %}}
{{< /tabs >}}

## Surveillance étendue de BigQuery

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Join the Preview!" >}}
   La surveillance étendue de BigQuery est disponible en préversion. Utilisez ce formulaire pour vous inscrire et commencer à obtenir des informations sur les performances de vos requêtes. 
{{< /callout >}}

La surveillance étendue de BigQuery offre une visibilité granulaire sur vos environnements BigQuery.

### Surveillance des performances des jobs BigQuery

Pour surveiller les performances de vos jobs BigQuery, attribuez le rôle [BigQuery Resource Viewer][51] au compte de service Datadog pour chaque projet Google Cloud.

**Remarques** :
   - Vous devez avoir vérifié votre compte de service Google Cloud dans Datadog, comme indiqué dans la [section de configuration](#configuration).
   - Vous **n'avez pas** besoin de configurer Dataflow pour collecter les logs dans le cadre de la surveillance BigQuery étendue.

1. Dans la console Google Cloud, accédez à la [page IAM][52].
2. Cliquez sur **Accorder un accès**.
3. Saisissez l'adresse e-mail de votre compte de service dans **Nouveaux principaux**.
4. Attribuez le rôle [BigQuery Resource Viewer][51].
5. Cliquez sur **ENREGISTRER**.
6. Dans la [page d'intégration Google Cloud de Datadog][43], accédez à l'onglet **BigQuery**.
7. Cliquez sur le bouton **Enable Query Performance**.

### Surveillance de la qualité des données BigQuery

La surveillance de la qualité des données BigQuery fournit des métriques de qualité à partir de vos tables BigQuery (comme la fraîcheur ou les mises à jour du nombre de lignes et de la taille). Explorez en profondeur les données de vos tables sur la [page Surveillance de la qualité des données][53].

Pour collecter les métriques de qualité, attribuez le rôle [BigQuery Metadata Viewer][54] au compte de service Datadog pour chaque table BigQuery que vous utilisez.

**Remarque** : le rôle BigQuery Metadata Viewer peut être appliqué à une table, un ensemble de données, un projet ou une organisation.
   - Pour surveiller la qualité des données de toutes les tables d’un ensemble de données, attribuez l’accès au niveau de l’ensemble de données.
   - Pour surveiller la qualité des données de tous les ensembles de données d’un projet, attribuez l’accès au niveau du projet.

1. Accédez à [BigQuery][55].
2. Dans l'Explorer, recherchez la ressource BigQuery souhaitée. 
3. Cliquez sur le menu à trois points à côté de la ressource, puis cliquez sur ***Share -> Manage Permissions**.

{{< img src="integrations/google_cloud_platform/bigquery_manage_permissions.png" alt="L'option de menu Gérer les autorisations pour une ressource d'ensemble de données BigQuery" style="width:80%;">}} 

4. Cliquez sur **ADD PRINCIPAL**.
5. Dans la zone de nouveaux principaux, saisissez le compte de service Datadog configuré pour l'intégration Google Cloud.
6. Attribuez le rôle [BigQuery Metadata Viewer][54].
7. Cliquez sur **SAVE**.
8. Dans la [page d'intégration Google Cloud de Datadog][43], cliquez dans l'onglet **BigQuery**.
9. Cliquez sur le bouton **Enable Data Quality**.

### Rétention des logs de jobs BigQuery

Datadog recommande de créer un nouvel [index de logs][56] appelé `data-observability-queries`, et d'y indexer les logs de vos jobs BigQuery pendant 15 jours. Utilisez le filtre d'index suivant pour inclure les logs :

```bash
service:data-observability @platform:*
```

Consultez la [page de tarification de la gestion des logs][57] pour une estimation des coûts.

## Collecte de données sur les changements de ressource

{{< callout url="https://www.datadoghq.com/private-beta/recent-changes-tab/" >}}
  La <strong>collection Resource changes</strong> est en avant-première ! Pour demander l'accès, utilisez le formulaire ci-joint.
{{< /callout >}}

Sélectionnez **Enable Resource Collection** dans [l’onglet Resource Collection][58] de la page d’intégration Google Cloud. Cela vous permet de recevoir des événements de ressource dans Datadog lorsque l’[inventaire des ressources Cloud][59] de Google détecte des modifications dans vos ressources cloud.

Suivez ensuite les étapes ci-dessous pour transférer les événements de modification depuis un sujet Pub/Sub vers l’[Event Explorer][60] de Datadog.

{{% collapse-content title="Google Cloud CLI" level="h4" %}}
### Créer un sujet et un abonnement Cloud Pub/Sub

#### Créer un sujet

1. Sur la [page des sujets Pub/Sub Google Cloud][61], cliquez sur **CREATE TOPIC**.
2. Attribuez un nom descriptif au sujet.
3. **Décochez** l'option permettant d'ajouter un abonnement par défaut.
4. Cliquez sur **CREATE**.

#### Créer un abonnement

1. Sur la [page des abonnements Pub/Sub Google Cloud][62], cliquez sur **CREATE SUBSCRIPTION**.
2. Saisissez `export-asset-changes-to-datadog` pour le nom de l'abonnement.
3. Sélectionnez le sujet Cloud Pub/Sub précédemment créé.
4. Sélectionnez le type de diffusion **Pull**.
5. Cliquez sur **CREATE**.

### Autoriser l'accès

Pour pouvoir lire les données de l'abonnement Pub/Sub, le compte de service Google Cloud utilisé par l'intégration doit disposer de l'autorisation `pubsub.subscriptions.consume` pour l'abonnement. Le rôle par défaut **Pub/Sub subscriber** possède cette autorisation, en plus d'autres autorisations minimales. Suivez les étapes ci-dessous pour attribuer ce rôle :

1. Sur la [page des abonnements Pub/Sub Google Cloud][62], cliquez sur l'abonnement `export-asset-changes-to-datadog`.
2. Depuis le **volet d'informations** sur la droite de la page, cliquez sur l'onglet **Permissions**. Si vous ne voyez pas ce volet, cliquez sur **SHOW INFO PANEL**.
3. Cliquez sur **ADD PRINCIPAL**.
4. Saisissez l'**adresse e-mail du compte de service** utilisée par l'intégration Datadog/Google Cloud. Vos comptes de service sont répertoriés sur la gauche de l'onglet **Configuration**, sur la [page de l'intégration Google Cloud][43] dans Datadog.

### Créer un flux d'éléments

Exécutez la commande ci-dessous dans [Cloud Shell][63] ou dans la [CLI gcloud][64] pour créer un flux d'inventaire d'éléments cloud qui envoie les événements de changement au sujet Pub/Sub précédemment créé.

{{< tabs >}}

{{% tab "Project" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--project=<PROJECT_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ID_PROJET>` : ID de votre projet Google Cloud.
   - `<NOM_SUJET>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.

[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{% tab "Folder" %}}
```bash
gcloud asset feeds create <FEED_NAME>
--folder=<FOLDER_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ID_FOLDER>` : ID de votre dossier Google Cloud.
   - `<NOM_SUJET>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Organisation" %}}

```bash
gcloud asset feeds create <FEED_NAME>
--organization=<ORGANIZATION_ID>
--pubsub-topic=projects/<PROJECT_ID>/topics/<TOPIC_NAME>
--asset-names=<ASSET_NAMES>
--asset-types=<ASSET_TYPES>
--content-type=<CONTENT_TYPE>
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ID_ORGANISATION>` : ID de votre organisation Google Cloud.
   - `<NOM_SUJET>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title= "Terraform" level="h4" %}}
### Créer un flux d'éléments

Copiez le modèle Terraform suivant et remplacez les arguments nécessaires :

{{< tabs >}}
{{% tab "Projet" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_project_feed" "project_feed" {
  project      = local.project_id
  feed_id      = "<FEED_NAME>"
  content_type = "<CONTENT_TYPE>" # Facultatif. Supprimez cette ligne si non utilisée.

  asset_names = ["<ASSET_NAMES>"] # Facultatif si vous spécifiez asset_types. Supprimez cette ligne si non utilisée.
  asset_types = ["<ASSET_TYPES>"] # Facultatif si vous spécifiez asset_names. Supprimez cette ligne si non utilisée..

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<ID_PROJET>` : ID de votre projet Google Cloud.
   - `<TOPIC_NAME>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>` : adresse e-mail du compte de service utilisé par l’intégration Google Cloud de Datadog.
   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Dossier" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>" 
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_folder_feed" "folder_feed" {
  billing_project = local.project_id
  folder          = "<FOLDER_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Facultatif. Supprimez cette ligne si non utilisée.

  asset_names = ["<ASSET_NAMES>"] # Facultatif si vous spécifiez asset_types. Supprimez cette ligne si non utilisée.
  asset_types = ["<ASSET_TYPES>"] # Facultatif si vous spécifiez asset_names. Supprimez cette ligne si non utilisée.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<ID_PROJET>` : ID de votre projet Google Cloud.
   - <FOLDER_ID> : ID du dossier dans lequel créer ce flux.
   - `<TOPIC_NAME>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>` : adresse e-mail du compte de service utilisé par l’intégration Google Cloud de Datadog.
   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}

{{% tab "Organisation" %}}

```h
locals {
  project_id = "<PROJECT_ID>"
}

resource "google_pubsub_topic" "pubsub_topic" {
  project = local.project_id
  name    = "<TOPIC_NAME>"
}

resource "google_pubsub_subscription" "pubsub_subscription" {
  project = local.project_id
  name    = "export-asset-changes-to-datadog"
  topic   = google_pubsub_topic.pubsub_topic.id
}

resource "google_pubsub_subscription_iam_member" "subscriber" {
  project      = local.project_id
  subscription = google_pubsub_subscription.pubsub_subscription.id
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:<SERVICE_ACCOUNT_EMAIL>"
}

resource "google_cloud_asset_organization_feed" "organization_feed" {
  billing_project = local.project_id
  org_id          = "<ORGANIZATION_ID>"
  feed_id         = "<FEED_NAME>"
  content_type    = "<CONTENT_TYPE>" # Facultatif. Supprimez cette ligne si non utilisée.

  asset_names = ["<ASSET_NAMES>"] # Facultatif si vous spécifiez asset_types. Supprimez cette ligne si non utilisée.
  asset_types = ["<ASSET_TYPES>"] # Facultatif si vous spécifiez asset_names. Supprimez cette ligne si non utilisée.

  feed_output_config {
    pubsub_destination {
      topic = google_pubsub_topic.pubsub_topic.id
    }
  }
}
```

Remplacez les placeholders comme indiqué ci-dessous :

   - `<ID_PROJET>` : ID de votre projet Google Cloud.
   - `<TOPIC_NAME>` : le nom du sujet Pub/Sub associé à l'abonnement `export-asset-changes-to-datadog`.
   - `<SERVICE_ACCOUNT_EMAIL>` : adresse e-mail du compte de service utilisé par l’intégration Google Cloud de Datadog.
   - `<ID_ORGANISATION>` : ID de votre organisation Google Cloud.
   - `<NOM_FLUX>` : nom descriptif du flux d'inventaire d'éléments cloud.
   - `<ASSET_NAMES>` : liste des [noms complets][1] des ressources (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-types` est défini.
   - `<ASSET_TYPES>` : liste des [types d'éléments][2] (séparés par des virgules) d'où proviennent les événements de changement. **Facultatif** si `asset-names` est défini.
   - `<CONTENT_TYPE>` : [type de contenu][3] **facultatif** des éléments d'où proviennent les événements de changement.


[1]: https://cloud.google.com/asset-inventory/docs/resource-name-format
[2]: https://cloud.google.com/asset-inventory/docs/supported-asset-types
[3]: https://cloud.google.com/asset-inventory/docs/overview#content_types
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

Datadog vous conseille de définir le paramètre `asset-types` sur l'expression régulière `.*` afin de recueillir les changements concernant toutes les ressources.

**Remarque** : vous devez spécifier au moins une valeur pour le paramètre `asset-names` ou le paramètre `asset-types`.

Consultez la section [gcloud asset feeds create][65] (en anglais) pour obtenir la liste complète des paramètres configurables.

### Activer la collecte de données sur les changements de ressource

Cliquez sur **Enable Resource Changes Collection** dans [l’onglet Resource Collection][58] de la page d’intégration Google Cloud. 

{{< img src="integrations/google_cloud_platform/enable_resource_change_collection.png" alt="Le bouton Enable Resource Changes Collection dans le carré d'intégration Google Cloud de Datadog" popup="true" style="width:80%;">}}

#### Validation

Consultez vos événements de changement d'élément dans l'[Events Explorer Datadog][66].

## Private Service Connect 


{{< site-region region="us,us3,ap1,gov" >}}
<div class="alert alert-info">Private Service Connect n'est disponible que pour les sites US5 et EU de Datadog.</div>
{{< /site-region >}}


Utilisez l’[intégration Private Service Connect de Google Cloud][29] pour visualiser les connexions, les données transférées et les paquets rejetés via Private Service Connect. Cela vous permet de superviser les métriques clés de vos connexions PSC, qu’il s’agisse du côté producteur ou consommateur.
[Private Service Connect (PSC)][67] est un service de mise en réseau Google Cloud qui permet d’accéder à des [services Google Cloud][68], [services partenaires tiers][69] ou applications internes de manière privée depuis votre VPC (Virtual Private Cloud).

Pour plus d’informations, consultez [Access Datadog privately and monitor your Google Cloud Private Service Connect usage][70] (en anglais) sur le blog de Datadog.

## Données collectées

### Métriques

Consultez les différentes pages des intégrations Google Cloud pour en savoir plus sur les métriques associées.

#### Métriques cumulatives

Les métriques cumulatives sont importées dans Datadog avec une métrique `.delta` chaque nom de métrique. Une métrique cumulative est une métrique dont la valeur augmente constamment au fil du temps. Par exemple, une métrique pour `sent bytes` peut être cumulative. Chaque valeur enregistre le nombre total d'octets envoyés par un service à ce moment-là. La valeur delta représente la différence avec la mesure précédente.

Exemple :

 `gcp.gke.container.restart_count` est une métrique CUMULATIVE. Lors de l'importation de cette métrique en tant que métrique cumulative, Datadog ajoute la métrique `gcp.gke.container.restart_count.delta`, qui inclut les valeurs delta (par opposition à la valeur agrégée émise dans le cadre de la métrique CUMULATIVE). Référez-vous à a documentation relative aux [types de métriques de Google Cloud][71] pour en savoir plus.

### Événements

Tous les événements de service générés par Google Cloud Platform sont transférés vers l'[Events Explorer Datadog][72].

### Checks de service

L'intégration Google Cloud Platform n'inclut aucun check de service.

### Tags

Les tags sont automatiquement attribués en fonction d'un ensemble d'options de configuration Google Cloud Platform et Google Compute Engine. Toutes les métriques bénéficient du tag `project_id`. Des tags supplémentaires sont recueillis à partir de la plateforme Google Cloud, le cas échéant. Les tags recueillis dépendent du type de métrique.

En outre, Datadog recueille les éléments suivants en tant que tags :

- Les hosts avec les libellés `<key>:<value>`
- Les libellés personnalisés de Google Pub/Sub, GCE, Cloud SQL et Cloud Storage

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques _gcp.logging_ définies par l'utilisateur

Pour les métriques _gcp.logging_ non standard, comme les métriques qui ne correspondent pas aux [métriques de journalisation Datadog prêtes à l'emploi][73], les métadonnées appliquées peuvent différer de celles de Google Cloud Logging.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][74] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][75].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

- [Améliorez la conformité et la sécurité de votre environnement Google Cloud avec Datadog][76]
- [Surveiller Google Cloud Vertex AI avec Datadog][77]
- [Surveiller des pipelines Dataflow avec Datadog][78]
- [Créer et gérer votre intégration Google Cloud avec Terraform][79]
- [Surveiller BigQuery avec Datadog][80]
- [Troubleshoot infrastructure changes faster with Recent Changes in the Resource Catalog][81] (en angmais)
- [Stream logs from Google Cloud to Datadog][82] (en anglais)


[1]: https://docs.datadoghq.com/fr/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_bigquery/
[3]: https://docs.datadoghq.com/fr/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/fr/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/fr/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/fr/integrations/google_cloud_armor/
[7]: https://docs.datadoghq.com/fr/integrations/google_cloud_composer/
[8]: https://docs.datadoghq.com/fr/integrations/google_cloud_dataproc/
[9]: https://docs.datadoghq.com/fr/integrations/google_cloud_dataflow/
[10]: https://docs.datadoghq.com/fr/integrations/google_cloud_filestore/
[11]: https://docs.datadoghq.com/fr/integrations/google_cloud_firestore/
[12]: https://docs.datadoghq.com/fr/integrations/google_cloud_interconnect/
[13]: https://docs.datadoghq.com/fr/integrations/google_cloud_iot/
[14]: https://docs.datadoghq.com/fr/integrations/google_cloud_loadbalancing/
[15]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/
[16]: https://docs.datadoghq.com/fr/integrations/google_cloud_redis/
[17]: https://docs.datadoghq.com/fr/integrations/google_cloud_router/
[18]: https://docs.datadoghq.com/fr/integrations/google_cloud_run/
[19]: https://docs.datadoghq.com/fr/integrations/google_cloud_security_command_center/
[20]: https://docs.datadoghq.com/fr/integrations/google_cloud_tasks/
[21]: https://docs.datadoghq.com/fr/integrations/google_cloud_tpu/
[22]: https://docs.datadoghq.com/fr/integrations/google_compute_engine/
[23]: https://docs.datadoghq.com/fr/integrations/google_container_engine/
[24]: https://docs.datadoghq.com/fr/integrations/google_cloud_datastore/
[25]: https://docs.datadoghq.com/fr/integrations/google_cloud_firebase/
[26]: https://docs.datadoghq.com/fr/integrations/google_cloud_functions/
[27]: https://docs.datadoghq.com/fr/integrations/google_kubernetes_engine/
[28]: https://docs.datadoghq.com/fr/integrations/google_cloud_ml/
[29]: https://docs.datadoghq.com/fr/integrations/google_cloud_private_service_connect/
[30]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub/
[31]: https://docs.datadoghq.com/fr/integrations/google_cloud_spanner/
[32]: https://docs.datadoghq.com/fr/integrations/google_cloud_storage/
[33]: https://docs.datadoghq.com/fr/integrations/google_cloud_vertex_ai/
[34]: https://docs.datadoghq.com/fr/integrations/google_cloud_vpn/
[35]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[36]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[37]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[38]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[39]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[40]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[41]: https://docs.datadoghq.com/fr/cloud_cost_management/setup/google_cloud/
[42]: https://cloud.google.com/monitoring/settings#:~:text=A%20scoping%20project%20hosts%20a,is%20also%20a%20scoping%20project.
[43]: https://app.datadoghq.com/integrations/google-cloud-platform
[44]: https://cloud.google.com/compute/docs/labeling-resources
[45]: https://docs.datadoghq.com/fr/agent/
[46]: https://docs.datadoghq.com/fr/data_security/data_retention_periods/
[47]: https://docs.datadoghq.com/fr/integrations/gke/
[48]: https://docs.datadoghq.com/fr/tracing/
[49]: https://docs.datadoghq.com/fr/logs/
[50]: https://docs.datadoghq.com/fr/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[51]: https://cloud.google.com/bigquery/docs/access-control#bigquery.resourceViewer
[52]: https://console.cloud.google.com/iam-admin/
[53]: https://app.datadoghq.com/datasets/tables/explore
[54]: https://cloud.google.com/bigquery/docs/access-control#bigquery.metadataViewer
[55]: https://console.cloud.google.com/bigquery
[56]: https://app.datadoghq.com/logs/pipelines/indexes
[57]: https://www.datadoghq.com/pricing/?product=log-management#products
[58]: https://app.datadoghq.com/integrations/google-cloud-platform?panel=resources
[59]: https://cloud.google.com/asset-inventory/docs/monitoring-asset-changes
[60]: https://app.datadoghq.com/event/explorer
[61]: https://console.cloud.google.com/cloudpubsub/topicList
[62]: https://console.cloud.google.com/cloudpubsub/subscription/
[63]: https://cloud.google.com/shell
[64]: https://cloud.google.com/sdk/gcloud
[65]: https://cloud.google.com/sdk/gcloud/reference/asset/feeds/create
[66]: https://app.datadoghq.com/event/explorer?query=source%3Agoogle_cloud_asset_inventory
[67]: https://cloud.google.com/vpc/docs/private-service-connect
[68]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#google-services
[69]: https://cloud.google.com/vpc/docs/private-service-connect-compatibility#third-party-services
[70]: https://www.datadoghq.com/blog/google-cloud-private-service-connect/
[71]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[72]: https://app.datadoghq.com/event/stream
[73]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[74]: https://app.datadoghq.com/metric/summary
[75]: https://docs.datadoghq.com/fr/help/
[76]: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
[77]: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
[78]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[79]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
[80]: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
[81]: https://www.datadoghq.com/blog/recent-changes-tab/
[82]: https://cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog