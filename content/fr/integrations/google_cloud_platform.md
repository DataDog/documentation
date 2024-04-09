---
aliases:
- /fr/integrations/gcp/
categories:
- cloud
- google cloud
- iot
- log collection
- network
dependencies: []
description: Recueillez une multitude de métriques GCP et visualisez vos instances sur une host map.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: Blog
  text: Améliorez la conformité et la sécurité de votre environnement Google Cloud avec Datadog
- link: https://www.datadoghq.com/blog/google-cloud-vertex-ai-monitoring-datadog/
  tag: Blog
  text: Surveiller Google Cloud Vertex AI avec Datadog
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: Blog
  text: Surveiller des pipelines Dataflow avec Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_gcp_sts
  tag: Terraform
  text: Créer et gérer votre intégration Google Cloud avec Terraform
- link: https://www.datadoghq.com/blog/track-bigquery-costs-performance/
  tag: Blog
  text: Surveiller BigQuery avec Datadog
git_integration_title: google_cloud_platform
has_logo: true
integration_id: google-cloud-platform
integration_title: Google Cloud Platform
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_platform
public_title: Intégration Datadog/Google Cloud Platform
short_description: Recueillez une multitude de métriques GCP et visualisez vos instances sur une host map.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Associez votre solution Google Cloud Platform pour visualiser tous vos hosts Google Compute Engine (GCE) dans Datadog. Vos hosts apparaissent dans l'aperçu de l'infrastructure de Datadog. Vous pouvez les trier grâce aux tags de host GCE et aux libellés GCE qui leur sont automatiquement attribués par Datadog.

<div class="alert alert-warning">
L'intégration GCP de Datadog est conçue pour recueillir <a href="https://cloud.google.com/monitoring/api/metrics_gcp">toutes les métriques Google Cloud</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas à jour.
</div>

| Presse-papiers Datadog                         | Description                                                                           |
|-------------------------------------|---------------------------------------------------------------------------------------|
| [App Engine][1]                     | PaaS (plateforme en tant que service) permettant de développer des applications évolutives                           |
| [Big Query][2]                      | Entrepôt de données pour entreprise                                                             |
| [Bigtable][3]                       | Service de base de données Big Data NoSQL                                                       |
| [Cloud SQL][4]                      | Service de base de données MySQL                                                                |
| [API Cloud][5]                     | Interfaces de programmation pour tous les services Google Cloud Platform                        |
| [Cloud Armor][6]                   | Service de sécurité sur le réseau protégeant contre le déni de service et les attaques web    |
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
| [Cloud Security Command Center][19] | Security Command Center est un service de signalement des menaces.                                |
| [Cloud Tasks][20]                   | Files d'attente de tâches distribuées                                                               |
| [Cloud TPU][21]                     | Entraînement et exécution de modèles d'apprentissage automatique                                                 |
| [Compute Engine][22]                | Machines virtuelles hautes performances                                                     |
| [Container Engine][23]              | Kubernetes, géré par Google                                                         |
| [Datastore][24]                     | Base de données NoSQL                                                                        |
| [Firebase][25]                      | Plateforme mobile pour le développement d'applications                                           |
| [Functions][26]                     | Plateforme sans serveur pour la création de microservices basés sur des événements                            |
| [Kubernetes Engine][27]             | Gestionnaire de clusters et système d'orchestration                                              |
| [Machine Learning][28]              | Services d'apprentissage automatique                                                             |
| [Private Service Connect][29]       | Accéder à des services gérés avec des connexions VPC privées
| [Pub/Sub][30]                       | Service de messagerie en temps réel                                                           |
| [Spanner][31]                       | Service de base de données relationnelle à évolutivité horizontale et à cohérence forte               |
| [Storage][32]                       | Stockage d'objets unifié                                                                |
| [Vertex AI][33]                     | Créer, former et déployer des modèles personnalisés dʼapprentissage automatique (ML).                          |
| [VPN][34]                           | Fonctionnalité de réseau géré                                                         |

## Configuration

Configurez lʼintégration Datadog/Google Cloud pour recueillir des métriques et des logs à partir de vos services Google Cloud.

### Prérequis

* Si votre organisation restreint les identités en fonction de leur domaine, vous devez ajouter l'identité client Datadog à la liste blanche de votre stratégie. L'identité client de Datadog est `C0147pk0i`.

* Pour utiliser les fonctionnalités d'emprunt d'identité de compte de service et de découverte automatique des projets, et ainsi surveiller vos projets, il est nécessaire d'attribuer certains rôles et d'activer certaines API. Avant de commencer, vérifiez que les API suivantes sont activées pour les projets à surveiller :
  * [API Cloud Resource Manager][35]
  * [API Google Cloud Billing][36]
  * [API Cloud Monitoring][37]
  * [API Compute Engine ][38]
  * [API Cloud Asset][39]
  * [API IAM][40]

### Collecte de métriques

#### Installation

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Lʼemprunt d'identité de compte de service nʼest pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Vous pouvez utiliser [lʼemprunt d'identité de compte de service][41] et la découverte automatique des projets pour intégrer Datadog avec [Google Cloud][42].

Cette méthode vous permet de surveiller tous les projets visibles par un compte de service en attribuant des rôles IAM dans les projets pertinents. Vous pouvez attribuer ces rôles à des projets de façon individuelle ou configurer Datadog pour surveiller des groupes de projets en attribuant ces rôles au niveau de lʼorganisation ou du dossier. Cette méthode dʼattribution des rôles permet à Datadog de découvrir et surveiller automatiquement tous les projets dʼune certaine sélection, y compris tous les nouveaux projets pouvant être ajoutés au groupe à lʼavenir.

#### 1. Créer un compte de service Google Cloud

1. Ouvrez votre [console Google Cloud][43].
2. Accédez à **IAM & Admin** > **Service Accounts**.
3. Cliquez sur **Create service account** en haut.
4. Attribuez un nom unique au compte de service, puis cliquez sur **Create and continue**.
5. Ajoutez les rôles suivants au compte de service :
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. Cliquez sur **Continue**, puis sur **Done** pour terminer la création du compte de service.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt=" Interface de la console Google Cloud, affichant le flux 'Create service account'. Sous 'Grant this service account access to project', les quatre rôles énoncés dans les instructions sont ajoutés." style="width:70%;">}}

#### 2. Ajouter le principal Datadog au compte de service

1. Dans Datadog, accédez à [**Integrations** > **Google Cloud Platform**][44].
2. Cliquez sur **Add GCP Account**. Si vous nʼavez configuré aucun projet, vous êtes automatiquement redirigé vers cette page.
3. Si vous nʼavez pas généré de principal Datadog pour votre organisation, cliquez sur le bouton **Generate Principal**.
4. Copiez votre principal Datadog et conservez-le pour la prochaine section.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interface de Datadog, affichant le flux 'Add New GCP Account'. La première étape, 'Add Datadog Principal to Google,' contient une zone de texte permettant à un utilisateur de générer un principal Datadog et de le copier dans son presse-papiers. La deuxième étape, 'Add Service Account Email,' contient une zone de texte que lʼutilisateur peut remplir dans la section 3." style="width:70%;">}}
   Gardez cette fenêtre ouverte pour la [prochaine section](#3-terminer-la-cofiguration-de-l-integration-dans-datadog).
5. Dans la [console Google Cloud][43], dans le menu **Service Acounts**, recherchez le compte de service que vous avez créé lors de la [première section](#1-creer-un-compte-de-service-google-cloud).
6. Accédez à lʼonglet **Permissions** et cliquez sur **Grant Access**.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt=" Interface de la console Google Cloud, affichant lʼonglet Permissions sous Service Accounts." style="width:70%;">}}
7. Collez votre principal Datadog dans la zone de texte **New principals**.
8. Attribuez le rôle de **Service Account Token Creator** et cliquez sur **Save**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt=" Interface de la console Google Cloud, affichant une zone 'Add principals' et une interface 'Assign roles'." style="width:70%;">}}

**Remarque** : si vous avez déjà configuré un accès à lʼaide dʼun principal Datadog partagé, vous pouvez révoquer lʼautorisation de ce principal après avoir terminé ces étapes.

#### 3. Terminer la configuration de lʼintégration dans Datadog

1. Dans votre console Google Cloud, accédez à lʼonglet **Service Account** > **Details**. Vous pourrez y trouver lʼe-mail associé à ce compte de service Google. Il ressemble à ceci `<sa-name>@<project-id>.iam.gserviceaccount.com`.
2. Copiez cet e-mail.
3. Revenez au carré de configuration de lʼintégration dans Datadog (où vous avez copié votre principal Datadog lors de la [section précédente](#2-ajouter-le-principal-datadog-au-compte-de-service)).
4. Dans la zone située sous **Add Service Account Email**, collez lʼe-mail que vous avez copié plus tôt.
5. Cliquez sur **Verify and Save Account**.

Une quinzaine de minutes après environ, les métriques sʼaffichent dans Datadog.

#### 4. Attribuer des rôles à dʼautres projets (facultatif)

La découverte automatique de projets permet de simplifier le processus dʼajout de projets à surveiller. Si vous permettez à votre compte de service dʼaccéder à dʼautres projets, dossiers ou organisations, Datadog découvre ces projets (et tous les projets imbriqués dans les dossiers ou organisations) et les ajoute automatiquement à votre carré dʼintégration.

1. Assurez-vous de posséder les autorisations adéquates pour attribuer des rôles au niveau désiré :
   * Project IAM Admin (or higher)
   * Folder Admin
   * Organization Admin
2. Dans la console Google Cloud, accédez à la page **IAM**.
3. Sélectionnez un projet, un dossier ou une organisation.
4. Pour attribuer un rôle à un principal qui ne possède pas encore dʼautres rôles dans la ressource, cliquez sur **Grant Access**, puis saisissez lʼe-mail du compte de service que vous avez créé plus tôt.
5. Attribuez les rôles suivants :
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer
   **Remarque** : le rôle Browser est uniquement requis dans le projet par défaut du compte de service.
6. Cliquez sur **Save**.

#### Configuration

Vous pouvez aussi choisir de limiter les instances GCE qui sont alimentées à Datadog en saisissant des tags dans la zone de texte **Limit Metric Collection** situés dans le menu déroulant dʼun certain projet. Seuls les hosts correspondants à lʼun des tags définis sont importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un seul caractère, `*` pour plusieurs caractères) pour faire correspondre de nombreux hosts, ou `!` pour en exclure certains. Cet exemple comprend toutes les instances de taille `c1*`, mais exclut les hosts en staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Référez-vous à la documentation de Google relative à la [création et la gestion dʼétiquettes][45] pour en savoir plus.

### Collecte de logs

Transférez des logs de vos services Google Cloud à Datadog à lʼaide de [Dataflow de Google Cloud][46] et du [modèle Datadog][47]. Cette méthode permet à la fois la compression et la mise en lot dʼévénements avant leur transfert vers Datadog. Suivez les instructions de cette section pour :   

[1](#1-creer-une-rubrique-et-un-abonnement-pubsub-cloud). Créez une [rubrique][48] Pub/Sub et des [abonnements pull][49] pour recevoir des logs provenant dʼun récepteur de log configuré  
[2](#2-creer-un-compte-de-service-de-worker-dataflow-personnalisé). Créez un compte de service de worker dataflow personnalisé afin de fournir [le minimum de privilèges][50] aux workers de vos pipelines Dataflow  
[3](#3-exporter-des-logs-depuis-la-rubrique-pubsub-de-google-cloud). Créez un [récepteur de log][51] pour publier des logs dans la rubrique Pub/Sub  
[4](#4-creer-et-executer-la-tache-dataflow). Créez une tâche Dataflow à lʼaide du [modèle Datadog][47] pour diffuser des logs à partir de lʼabonnement Pub/Sub auprès de Datadog  

Vous bénéficiez dʼun contrôle total sur les logs qui sont envoyés à Datadog via les filtres de logs que vous créez dans le récepteur de log, y compris les logs GCE et GKE. Référez-vous à la [page relative au langage des requêtes de création de logs][52] de Google pour en savoir plus sur la rédaction de filtres.

**Remarque** : vous devez activer lʼAPI Dataflow pour utiliser Dataflow de Google Cloud. Consultez la section [Activer des API][53] de la documentation de Google Cloud pour en savoir plus.

Pour récupérer des logs dʼapplications exécutées en GCE ou GKE, vous pouvez aussi utiliser [lʼAgent Datadog][54].

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La collecte de logs de Google Cloud avec un abonnement Push Pub/Sub

</a> est en train de devenir obsolète pour les raisons suivantes :

- Lʼabonnement Push ne peut pas accéder aux endpoints qui se situent en dehors dʼun VPC Google Cloud
- Lʼabonnement Push ne fournit aucune fonctionnalité de compression ni de regroupement des événements, et ne convient donc que pour un très petit nombre de logs

La documentation relative à lʼabonnement <strong>Push</strong> sert uniquement à dépanner ou modifier des configurations obsolètes. Préférez un abonnement <strong>Pull</strong> avec le Dataflow Datadog pour transférer vos logs Google Cloud à Datadog.
</div>

#### 1. Créer une rubrique et un abonnement Cloud Pub/Sub

1. Accédez à la [console Cloud Pub/Sub][55] et créez une nouvelle rubrique et un nouveau topic. Sélectionnez lʼoption **Add a default subscription** pour simplifier la configuration. 

   **Remarque** : vous pouvez aussi configurer un [abonnement Cloud Pub/Sub][56] manuellement avec le type de livraison **Pull**. Si vous créez manuellement votre abonnement Pub/Sub, ne cochez **pas** la case `Enable dead lettering`. Pour en savoir plus, référez-vous à la section [Fonctionnalités Pub/Sub non prises en charge][57].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="la page « Créer un sujet » dans la console Google Cloud avec la case « Ajouter un abonnement par défaut » cochée" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur *Create*.

3. Créez un autre sujet et un autre abonnement par défaut pour gérer tous les messages de logs rejetés par lʼAPI Datadog. Le nom de ce sujet est utilisé dans le modèle Dataflow Datadog, où il fait partie de la configuration du chemin pour le [paramètre de modèle][58] `outputDeadletterTopic`. Une fois que vous avez inspecté et corrigé tous les problèmes des messages dʼéchec, renvoyez-les au sujet `export-logs-to-datadog` dʼorigine en exécutant une tâche [Modèle Pub/Sub vers Pub/Sub][59]. 

4. Datadog recommande de créer un secret dans [Secret Manager][60] avec la valeur de votre clé dʼAPI Datadog valide, afin de lʼutiliser plus tard dans le modèle Dataflow Datadog.

**Avertissement** : les Pub/Sub Cloud sont inclus dans les [quotas et limitations de Google Cloud][61]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs Pub/Sub](#surveiller-la-redirection-de-logs-pubsub-cloud) pour découvrir comment configurer des notifications de monitor si vous vous approchez de ces limites.

#### 2. Créer un compte de service de worker Dataflow personnalisé

Par défaut, les workers de pipelines Dataflow utilisent le [compte de service Compute Engine par défaut][62] de votre projet, qui accorde des autorisations pour toutes les ressources du projet. Si vous transmettez des logs dʼun environnement **Production**, il est conseillé de privilégier la création dʼun compte de service de worker personnalisé nʼincluant que les rôles et les autorisations nécessaires, et dʼattribuer ce compte de service à vos workers de pipeline Dataflow.

1. Accédez à la page [Comptes de service][63] de la console Google Cloud et sélectionnez votre projet.
2. Cliquez sur **CREATE SERVICE ACCOUNT** et attribuez un nom  descriptif au compte de service. Cliquez sur **CREATE AND CONTINUE**.
3. Ajoutez les rôles dans le tableau des autorisations correspondant et cliquez sur **DONE**.

##### Autorisations requises

| Rôle                                 | Chemin                                 | Description                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][64]                 | `roles/dataflow.admin`               | Autoriser ce compte de service à effectuer des tâches administratives Dataflow                                                               |
| [Dataflow Worker][65]                | `roles/dataflow.worker`              | Autoriser ce compte de service à effectuer des opérations de tâches Dataflow                                                                     |
| [Pub/Sub Viewer][66]                 | `roles/pubsub.viewer`                | Autoriser ce compte de service à consulter des messages de lʼabonnement Pub/Sub avec vos logs Google Cloud                             |
| [Pub/Sub Subscriber][67]             | `roles/pubsub.subscriber`            | Autoriser ce compte de service à consommer des messages de lʼabonnement Pub/Sub avec vos logs Google Cloud                          |
| [Pub/Sub Publisher][68]              | `roles/pubsub.publisher`             | Autoriser ce compte de service à publier les messages échoués dans un abonnement distinct, permettant dʼanalyser et de renvoyer les logs |
| [Secret Manager Secret Accessor][69] | `roles/secretmanager.secretAccessor` | Autoriser ce compte de service à accéder à la clé dʼAPI Datadog dans Secret Manager                                                        |
| [Storage Object Admin][70]           | `roles/storage.objectAdmin`          | Autoriser ce compte de service à lire et écrire sur le compartiment de Cloud Storage indiqué pour les fichiers en staging                              |

**Remarque** : si vous ne créez par de compte de service pour les workers de pipeline Dataflow, assurez-vous que le compte de service Compute Engine par défaut possède les autorisations requises ci-dessus.

#### 3. Exporter des logs depuis le sujet Pub/Sub Google Cloud

1. Accédez à [la page Logs Explorer][71] dans la console Google Cloud.
2. Depuis lʼonglet **Log Router**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez _Cloud Pub/Sub_ comme destination et sélectionnez le sujet Cloud Pub/Sub créé à cette fin. **Remarque** : le sujet Cloud Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Choisissez les logs que vous souhaitez inclure dans le récepteur avec un filtre dʼinclusion ou dʼexclusion facultatif. Vous pouvez filtrer les logs avec une requête de recherche, ou utiliser [lʼexemple de fonction][72]. Par exemple, si vous souhaitez inclure seulement 10 % des logs avec `ERROR` comme niveau de `severity`, créez un filtre dʼinclusion avec `severity="ERROR" AND sample(insertId, 0.01)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="Le filtre dʼinclusion pour un récepteur de logs Google Cloud avec une requête ayant comme propriétés severity=ERROR et sample(insertId, 0.1)" >}}

6. Cliquez sur **Create Sink**.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même sujet Cloud Pub/Sub en utilisant plusieurs récepteurs.

#### 4. Créer et exécuter la tâche Dataflow

1. Accédez à la page [Créer une tâche à partir d'un modèle][73] dans la console Google Cloud.
2. Donnez un nom à la tâche et sélectionnez un endpoint régional Dataflow.
3. Sélectionnez `Pub/Sub to Datadog` dans la liste déroulante **Dataflow template**, et la section **Required parameters** apparaît.  
   a. Sélectionnez l'abonnement en entrée dans la liste déroulante **Pub/Sub input subscription**.  
   b. Saisissez les informations suivantes dans le champ **Datadog logs API URL** : 

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **Remarque** : assurez-vous que le sélecteur de site Datadog à droite de la page est défini sur votre [site Datadog][67] avant de copier l'URL ci-dessus.

   c. Sélectionnez le sujet créé pour recevoir les échecs de messages dans la liste déroulante **Output deadletter Pub/Sub topic**.  
   d. Indiquez un chemin d'accès pour les fichiers temporaires dans votre compartiement de stockage dans le champ **Temporary location**.  

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Paramètres requis dans le modèle Dataflow Datadog" style="width:80%;">}}  

4. Si vous avez créé un secret dans Secret Manager avec la valeur de votre clé API Datadog comme indiqué dans [étape 1](#1-creer-une-rubrique-et-un-abonnement-pubsub-cloud)), entrez le **nom de la ressource** du secret dans le champ **Google Cloud Secret Manager ID**.  

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec les champs de lʼID de Secret Manager dans Google Cloud et la source de la clé dʼAPI transmise mis en évidence" style="width:80%;">}}  

Consultez la section [Paramètres de modèle][58] dans le modèle Dataflow pour en savoir plus sur lʼutilisation des autres options disponibles :

   - `apiKeySource=KMS` avec `apiKeyKMSEncryptionKey` défini sur votre clé dʼID de [Cloud KMS][74] et `apiKey` défini sur la clé dʼAPI chiffrée
   - **Non conseillé** : `apiKeySource=PLAINTEXT` avec `apiKey` défini sur la clé dʼAPI en texte brut

5. Si vous avez créé un compte service de worker personnalisé, sélectionnez-le dans le menu déroulant **Service account email**.  

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec le menu déroulant de lʼe-mail du compte de service mis en évidence" style="width:80%;">}}

6. Cliquez sur **RUN JOB**.

**Remarque** : si vous possédez un VPC partagé, consultez la page [Spécifier un réseau et un sous-réseau][75] de la documentation Dataflow pour obtenir des instructions sur la spécification des paramètres `Network` et `Subnetwork`.

#### Validation

Les nouveaux événements de logs envoyés au sujet Cloud Pub/Sub apparaissent dans le [Log Explorer de Datadog][76].

**Remarque** : vous pouvez utiliser le [Calculateur de prix Google Cloud][77] pour calculer les coûts potentiels.

#### Surveiller la redirection des logs Cloud Pub/Sub

Lʼ[intégration Google Cloud Pub/Sub][30] fournit des métriques utiles pour surveiller l'état de la redirection des logs :

   - `gcp.pubsub.subscription.num_undelivered_messages` pour le nombre de messages en attente de livraison
   - `gcp.pubsub.subscription.oldest_unacked_message_age` pour l'âge du plus ancien message non acquitté dans un abonnement

Utilisez les métriques ci-dessus avec un [monitor de métriques][78] pour recevoir des alertes pour les messages dans vos abonnements en entrée et de messages non aboutis.

#### Surveiller le pipeline Dataflow

Utilisez [lʼintégration Google Cloud Dataflow][9] de Datadog pour surveiller tous les aspects de vos pipelines Dataflow. Vous pouvez voir toutes vos métriques Dataflow principales sur le dashboard prêt à l'emploi, doté de données contextuelles telles que des informations sur les instances GCE qui exécutent vos workloads Dataflow, et votre débit Pub/Sub.

Vous pouvez également utiliser un [monitor recommandé][79] préconfiguré pour configurer des notifications pour les augmentations du temps de backlog dans votre pipeline. Pour en savoir plus, lisez la section [Monitor your Dataflow pipelines with Datadog][80] (en anglais) dans le blog de Datadog.

## Données collectées

### Métriques

Consultez les différentes pages des intégrations Google Cloud pour en savoir plus sur les métriques associées.

#### Métriques cumulatives

Les métrique cumulatives sont importées dans Datadog avec une métrique `.delta` chaque nom de métrique. Une métrique cumulative est une métrique dont la valeur augmente constamment au fil du temps. Par exemple, une métrique pour `sent bytes` peut être cumulative. Chaque valeur enregistre le nombre total d'octets envoyés par un service à ce moment-là. La valeur delta représente la différence avec la mesure précédente.

Exemple :

 `gcp.gke.container.restart_count` est une métrique CUMULATIVE. Lors de l'importation de cette métrique en tant que métrique cumulative, Datadog ajoute la métrique `gcp.gke.container.restart_count.delta`, qui inclut les valeurs delta (par opposition à la valeur agrégée émise dans le cadre de la métrique CUMULATIVE). Référez-vous à a section [types de métriques Google Cloud][81] pour en savoir plus.

### Événements

Tous les événements de service générés par Google Cloud Platform sont transférés vers votre [Events Explorer Datadog][47].

### Checks de service

L'intégration Google Cloud Platform n'inclut aucun check de service.

### Récupérer l'utilisation horaire pour les invocations tracées lambda

Les tags sont automatiquement attribués en fonction d'un ensemble d'options de configuration Google Cloud Platform et Google Compute Engine. Toutes les métriques bénéficient du tag `project_id`. Des tags supplémentaires sont recueillis à partir de la plateforme Google Cloud, le cas échéant. Les tags recueillis dépendent du type de métrique.

En outre, Datadog recueille les éléments suivants en tant que tags :

- Les hosts avec les libellés `<key>:<value>`
- Les libellés personnalisés de Google Pub/Sub, GCE, Cloud SQL et Cloud Storage

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques _gcp.logging_ définies par l'utilisateur

Pour les métriques _gcp.logging_ non standard, comme les métriques qui ne correspondent pas aux [métriques de journalisation Datadog par défaut][83], les métadonnées appliquées peuvent différer de celles de Google Cloud Logging.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][84] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][85].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/fr/integrations/google_bigquery/
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
[35]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[37]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[38]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[39]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[40]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[41]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[42]: /fr/integrations/google_cloud_platform/
[43]: https://console.cloud.google.com/
[44]: https://app.datadoghq.com/integrations/google-cloud-platform
[45]: https://cloud.google.com/compute/docs/labeling-resources
[46]: https://cloud.google.com/dataflow
[47]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[48]: https://cloud.google.com/pubsub/docs/create-topic
[49]: https://cloud.google.com/pubsub/docs/create-subscription
[50]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[51]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[52]: https://cloud.google.com/logging/docs/view/logging-query-language
[53]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[54]: https://docs.datadoghq.com/fr/agent/
[55]: https://console.cloud.google.com/cloudpubsub/topicList
[56]: https://console.cloud.google.com/cloudpubsub/subscription/
[57]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[58]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[59]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[60]: https://console.cloud.google.com/security/secret-manager
[61]: https://cloud.google.com/pubsub/quotas#quotas
[62]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[63]: https://console.cloud.google.com/iam-admin/serviceaccounts
[64]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[65]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[66]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[67]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[68]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[69]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[70]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[71]: https://console.cloud.google.com/logs/viewer
[72]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[73]: https://console.cloud.google.com/dataflow/createjob
[74]: https://cloud.google.com/kms/docs
[75]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[76]: https://app.datadoghq.com/logs
[77]: https://cloud.google.com/products/calculator
[78]: https://docs.datadoghq.com/fr/monitors/types/metric/
[79]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[80]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[81]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[82]: https://app.datadoghq.com/event/stream
[83]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[84]: https://app.datadoghq.com/metric/summary
[85]: https://docs.datadoghq.com/fr/help/
