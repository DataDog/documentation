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
description: Recueillez une multitude de métriques GCP et visualisez vos instances
  sur une host map.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/
  tag: Blog
  text: Améliorez la conformité et la sécurité de votre environnement Google Cloud
    avec Datadog
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
short_description: Recueillez une multitude de métriques GCP et visualisez vos instances
  sur une host map.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Associez votre solution Google Cloud Platform pour visualiser tous vos hosts Google Compute Engine (GCE) dans Datadog. Vos hosts apparaissent dans l'aperçu de l'infrastructure de Datadog. Vous pouvez les trier grâce aux tags de host GCE et aux libellés GCE qui leur sont automatiquement attribués par Datadog.

<div class="alert alert-warning">
L'intégration GCP de Datadog est conçue pour recueillir <a href="https://cloud.google.com/monitoring/api/metrics_gcp">toutes les métriques Google Cloud</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas à jour.
</div>

| Intégration                         | Description                                                                           |
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
| [Private Service Connect][29]       | Accéder à des services gérés avec des connexions VPC privées                                  |
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

{{< site-region region="gov" >}}

L'intégration Google Cloud/Datadog pour le site {{< region-param key="dd_site_name" >}} utilise des comptes de service pour créer une connexion API entre Google Cloud et Datadog. Vous trouverez ci-dessous les instructions à suivre pour créer un compte de service et fournir à Datadog les identifiants du compte de service afin de commencer à effectuer des appels d'API en votre nom.

La fonctionnalité [dʼemprunt d'identité de compte de service][209] n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.

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

### Configuration

Si vous le souhaitez, vous pouvez limiter les instances GCE récupérées par Datadog. Pour ce faire, saisissez des tags dans la zone de texte **Limit Metric Collection** située dans le menu déroulant d'un projet donné. Seuls les hosts qui correspondent à l'un des tags définis sont alors importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un caractère unique, `*` pour plusieurs caractères) pour inclure un grand nombre de hosts, ou encore `!` pour exclure certains hosts. L'exemple ci-dessous englobe toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la [documentation Google][208] pour obtenir plus de renseignements sur la création et la gestion de libellés.

[202]: https://console.cloud.google.com/apis/credentials
[203]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[204]: https://support.google.com/cloud/answer/6293499?hl=en
[205]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[206]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[207]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[208]: https://cloud.google.com/compute/docs/labeling-resources
[209]: https://cloud.google.com/iam/docs/service-account-impersonation

{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
Grâce à l'[emprunt d'identité de compte de service][301] et à la découverte automatique des projets, vous pouvez intégrer Datadog à [Google Cloud][302].

Cette approche vous permet de surveiller tous les projets accessibles depuis un compte de service, en attribuant des rôles IAM aux projets pertinents. Il est possible d'attribuer ces rôles à des projets spécifiques, mais aussi de les attribuer à l'échelle d'une organisation ou d'un dossier, afin de surveiller des groupes de projets. De cette façon, Datadog découvre et surveille automatiquement tous les projets d'un contexte donné, y compris les nouveaux projets qui intègrent ultérieurement le groupe.

#### 1. Créer votre compte de service Google Cloud

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

#### 2. Ajouter le service principal Datadog à votre compte de service

1. Dans Datadog, accédez à [**Integrations** > **Google Cloud Platform**][304].
2. Cliquez sur **Add GCP Account**. SI vous n'avez pas encore configuré de projet, vous êtes automatiquement redirigé vers cette page.
3. Si vous n'avez pas généré de service principal Datadog pour votre organisation, cliquez sur le bouton **Generate Principal**.
4. Copiez votre service principal Datadog et conservez-le pour la prochaine section.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interface Datadog, avec le processus d'ajout d'un nouveau compte GCP. La première étape, « Add Datadog Principal to Google », contient une zone de texte permettant à l'utilisateur de générer un service principal Datadog et de le copier dans son presse-papiers. La deuxième étape, « Add Service Account Email », inclut une zone de texte que l'utilisateur peut remplir lors de la section 3." style="width:70%;">}}
   Gardez cette fenêtre ouverte, car vous en aurez besoin lors de la [prochaine section](#3-terminer-la-configuration-de-l-integration-dans-datadog).
5. Dans la [console Google Cloud][38303 sous le menu **Service Accounts**, recherchez le compte de service que vous avez créé lors de la [première section](#1-creer-votre-compte-de-service-google-cloud).
6. Accédez à l'onglet **Permissions**, puis cliquez sur **Grant Access**.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interface de la console Google Cloud, avec l'onglet Permissions sous Service Accounts." style="width:70%;">}}
7. Collez votre service principal Datadog dans la zone **New Principals**.
8. Attribuez le rôle **Service Account Token Creator**, puis cliquez sur **Save**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Interface de la console Google Cloud, avec les sections « Add principals » et « Assign roles »." style="width:70%;">}}

**Remarque** : si vous avez déjà configuré l'accès à l'aide d'un service principal Datadog partagé, vous pouvez révoquer l'autorisation pour ce service principal après avoir suivi ces étapes.

#### 3. Terminer la configuration de l'intégration dans Datadog

1. Dans votre console Google Cloud, accédez à l'onglet **Service Account** > **Details**, afin de consulter l'adresse e-mail associée à ce compte de service Google. Son format est `<sa-name>@<project-id>.iam.gserviceaccount.com`.
2. Copiez cette adresse e-mail.
3. Revenez sur le carré de configuration de l'intégration dans Datadog (là où vous avez copié votre service principal Datadog lors de la [section précédente](#2-ajouter-le-service-principal-datadog-a-votre-compte-de-service)).
4. Dans la zone de texte sous **Add Service Account Email**, collez l'adresse e-mail que vous avez précédemment copiée.
5. Cliquez sur **Verify and Save Account**.

Les métriques devraient s'afficher dans Datadog après environ 15 minutes.

#### 4. Attribuer des rôles à d'autres projets (facultatif)

Grâce à la découverte automatique de projets, il est beaucoup plus simple d'ajouter de nouveaux projets à surveiller. SI vous attribuez à d'autres projets, dossiers ou organisations un accès à votre compte de service, Datadog découvre ces projets (ainsi que tous les projets imbriqués dans les dossiers ou organisations) et les ajoute automatiquement à votre carré d'intégration.

1. Vérifiez que vous avez configuré les bonnes autorisations, afin que les rôles attribués disposent de l'accès prévu :
   * Project IAM Admin (ou autorisation de plus haut niveau)
   * Folder Admin
   * Organization Admin
2. Dans la console Google Cloud, accédez à la page **IAM**.
3. Sélectionnez un projet, un dossier ou une organisation.
4. Pour attribuer un rôle à un service principal qui ne possède pas encore de rôle pour la ressource, cliquez sur **Grant Access**, puis saisissez l'adresse e-mail du compte de service créé précédemment.
5. Attribuez les rôles suivants :
   * Compute Viewer
   * Monitoring Viewer
   * Cloud Asset Viewer
   **Remarque** : le rôle Browser est uniquement requis pour le projet par défaut du compte de service.
6. Cliquez sur **Save**.

[301]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[302]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[303]: https://console.cloud.google.com/
[304]: https://app.datadoghq.com/integrations/google-cloud-platform

{{< /site-region >}}

#### Configuration

Si vous le souhaitez, vous pouvez limiter les instances GCE récupérées par Datadog. Pour ce faire, saisissez des tags dans la zone de texte **Limit Metric Collection** située dans le menu déroulant d'un projet donné. Seuls les hosts qui correspondent à l'un des tags définis sont alors importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un caractère unique, `*` pour plusieurs caractères) pour inclure un grand nombre de hosts, ou encore `!` pour exclure certains hosts. L'exemple ci-dessous englobe toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la [documentation Google][41] pour obtenir plus de renseignements sur la création et la gestion de libellés.

### Collecte de logs

Transmettez des logs à Datadog depuis vos services Google Cloud en utilisant [Google Cloud Dataflow][42] et le [modèle Datadog][43]. Cette méthode permet à la fois de compresser et de mettre en lots des événements avant de les transmettre à Datadog. Suivez les instructions indiquées dans cette section pour :  

[1](#1-creer-une-rubrique-pubsub-cloud-et-un-abonnement). Créer une [rubrique][44] Pub/Sub et un [abonnement pull][45] pour recevoir des logs provenant d'un récepteur de logs configuré.  
[2](#2-creer-un-compte-de-service-de-worker-dataflow-personnalise). Créer un compte de service de worker Datadog personnalisé pour accorder [le moindre privilège][46] aux workers de votre pipeline Dataflow.  
[3](#3-exporter-des-logs-depuis-une-rubrique-
-google-cloud-pubsub). Créer un [récepteur de logs][47] pour publier des logs dans la rubrique Pub/Sub.  
[4](#4-creer-et-executer-la-tache-dataflow). Créer une tâche Dataflow à lʼaide du [modèle Datadog][43] pour transmettre à Datadog des logs à partir de l'abonnement Pub/Sub. 

Vous contrôlez entièrement les logs qui sont envoyés à Datadog via filtres de journalisation que vous créez dans le récepteur de logs, y compris les logs GCE et GKE. Consultez la page [Langage de requête Logging][48] de Google pour en savoir plus sur l'écriture de filtres.

**Remarque** : vous devez activer l'API Dataflow pour utiliser Google Cloud Dataflow. Consultez la section [Activation des API][49] de la documentation de Google Cloud pour en savoir plus.

Vous pouvez également utiliser [lʼAgent Datadog][50] pour recueillir des logs à partir d'applications exécutées dans GCE ou GKE, .

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">La collecte de logs Google Cloud à l'aide d'un abonnement Push Pub/Sub</a> est sur le point d'être rendue obsolète pour les raisons suivantes :

- Si vous disposez d'un VPC Google Cloud, les nouveaux abonnements Push ne peuvent pas être configurés depuis des endpoints externes (consultez la page [Produits compatibles et limites][51] de Google Cloud pour en savoir plus).
- L'abonnement Push n'assure pas la compression ou la mise en lots dʼévénements, et n'est donc adapté qu'à un très faible volume de logs

La documentation relative à l'abonnement <strong>Push</strong>est uniquement conservée à des fins de dépannage ou de modification dʼanciennes configurations. Utilisez un abonnement <strong>Pull</strong> avec le modèle Dataflow de Datadog pour transmettre vos logs Google Cloud vers Datadog.
</div>

#### 1. Créer une rubrique et un abonnement Cloud Pub/Sub

1. Accédez à la [console Pub/Sub Cloud][52] et créez une rubrique. Sélectionnez l'option **Add a default subscription** pour simplifier la configuration. 

   **Remarque** : vous pouvez aussi configurer un [abonnement Cloud Pub/Sub][53] manuellement avec le type de livraison **Pull**. Si vous créez manuellement votre abonnement Pub/Sub, ne cochez **pas** la case `Enable dead lettering`. Pour en savoir plus, référez-vous à la section [Fonctionnalités Pub/Sub non prises en charge][54].

{{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="la page « Créer un sujet » dans la console Google Cloud avec la case « Ajouter un abonnement par défaut » cochée" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur *Create*.

3. Créez un autre sujet et un autre abonnement par défaut pour gérer tous les messages de logs rejetés par lʼAPI Datadog. Le nom de ce sujet est utilisé dans le modèle Dataflow Datadog, où il fait partie de la configuration du chemin pour le [paramètre de modèle][55] `outputDeadletterTopic`. Une fois que vous avez inspecté et corrigé tous les problèmes des messages dʼéchec, renvoyez-les au sujet `export-logs-to-datadog` dʼorigine en exécutant une tâche [Modèle Pub/Sub vers Pub/Sub][56]. 

4. Datadog recommande de créer un secret dans [Secret Manager][57] avec la valeur de votre clé dʼAPI Datadog valide, afin de lʼutiliser plus tard dans le modèle Dataflow Datadog.

**Avertissement** : les Pub/Sub Cloud sont inclus dans les [quotas et limitations de Google Cloud][58]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs Pub/Sub](#surveiller-la-redirection-de-logs-pubsub-cloud) pour découvrir comment configurer des notifications de monitor si vous vous approchez de ces limites.

#### 2. Créer un compte de service de worker Dataflow personnalisé

Par défaut, les workers de pipelines Dataflow utilisent le [compte de service Compute Engine par défaut][59] de votre projet, qui accorde des autorisations pour toutes les ressources du projet. Si vous transmettez des logs dʼun environnement **Production**, il est conseillé de privilégier la création dʼun compte de service de worker personnalisé nʼincluant que les rôles et les autorisations nécessaires, et dʼattribuer ce compte de service à vos workers de pipeline Dataflow.

1. Accédez à la page [Comptes de service][60] de la console Google Cloud et sélectionnez votre projet.
2. Cliquez sur **CREATE SERVICE ACCOUNT** et attribuez un nom  descriptif au compte de service. Cliquez sur **CREATE AND CONTINUE**.
3. Ajoutez les rôles dans le tableau des autorisations correspondant et cliquez sur **DONE**.

##### Autorisations requises

| Rôle                                 | Chemin                                 | Description                                                                                                                       |
|--------------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [Dataflow Admin][61]                 | `roles/dataflow.admin`               | Autoriser ce compte de service à effectuer des tâches administratives Dataflow                                                               |
| [Dataflow Worker][62]                | `roles/dataflow.worker`              | Autoriser ce compte de service à effectuer des opérations de tâches Dataflow                                                                     |
| [Pub/Sub Viewer][63]                 | `roles/pubsub.viewer`                | Autoriser ce compte de service à consulter des messages de lʼabonnement Pub/Sub avec vos logs Google Cloud                             |
| [Pub/Sub Subscriber][64]             | `roles/pubsub.subscriber`            | Autoriser ce compte de service à consommer des messages de lʼabonnement Pub/Sub avec vos logs Google Cloud                          |
| [Pub/Sub Publisher][65]              | `roles/pubsub.publisher`             | Autoriser ce compte de service à publier les messages échoués dans un abonnement distinct, permettant dʼanalyser et de renvoyer les logs |
| [Secret Manager Secret Accessor][66] | `roles/secretmanager.secretAccessor` | Autoriser ce compte de service à accéder à la clé dʼAPI Datadog dans Secret Manager                                                        |
| [Storage Object Admin][67]           | `roles/storage.objectAdmin`          | Autoriser ce compte de service à lire et écrire sur le compartiment de Cloud Storage indiqué pour les fichiers en staging                              |

**Remarque** : si vous ne créez par de compte de service pour les workers de pipeline Dataflow, assurez-vous que le compte de service Compute Engine par défaut possède les autorisations requises ci-dessus.

#### 3. Exporter des logs depuis le sujet Pub/Sub Google Cloud

1. Accédez à [la page Logs Explorer][68] dans la console Google Cloud.
2. Depuis lʼonglet **Log Router**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez _Cloud Pub/Sub_ comme destination et sélectionnez le sujet Cloud Pub/Sub créé à cette fin. **Remarque** : le sujet Cloud Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Choisissez les logs que vous souhaitez inclure dans le récepteur avec un filtre dʼinclusion ou dʼexclusion facultatif. Vous pouvez filtrer les logs avec une requête de recherche, ou utiliser [lʼexemple de fonction][69]. Par exemple, si vous souhaitez inclure seulement 10 % des logs avec `ERROR` comme niveau de `severity`, créez un filtre dʼinclusion avec `severity="ERROR" AND sample(insertId, 0.01)`.

    {{< img src="integrations/google_cloud_platform/sink_inclusion_filter.png" alt="Le filtre dʼinclusion pour un récepteur de logs Google Cloud avec une requête ayant comme propriétés severity=ERROR et sample(insertId, 0.1)" >}}

6. Cliquez sur **Create Sink**.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même sujet Cloud Pub/Sub en utilisant plusieurs récepteurs.

#### 4. Créer et exécuter la tâche Dataflow

1. Accédez à la page [Créer une tâche à partir d'un modèle][70] dans la console Google Cloud.
2. Donnez un nom à la tâche et sélectionnez un endpoint régional Dataflow.
3. Sélectionnez `Pub/Sub to Datadog` dans la liste déroulante **Dataflow template**, et la section **Required parameters** apparaît.  
   a. Sélectionnez l'abonnement en entrée dans la liste déroulante **Pub/Sub input subscription**.  
   b. Saisissez les informations suivantes dans le champ **Datadog logs API URL** : 

   ```shell
   https://{{< region-param key="http_endpoint" code="true" >}}

   ```
   **Remarque** : assurez-vous que le sélecteur de site Datadog à droite de la page est défini sur votre [site Datadog][64] avant de copier l'URL ci-dessus.

   c. Sélectionnez le sujet créé pour recevoir les échecs de messages dans la liste déroulante **Output deadletter Pub/Sub topic**.  
   d. Indiquez un chemin d'accès pour les fichiers temporaires dans votre compartiement de stockage dans le champ **Temporary location**.  

{{< img src="integrations/google_cloud_platform/dataflow_parameters.png" alt="Paramètres requis dans le modèle Dataflow Datadog" style="width:80%;">}}  

4. Si vous avez créé un secret dans Secret Manager avec la valeur de votre clé API Datadog comme indiqué dans [étape 1](#1-creer-une-rubrique-et-un-abonnement-pubsub-cloud)), entrez le **nom de la ressource** du secret dans le champ **Google Cloud Secret Manager ID**.  

{{< img src="integrations/google_cloud_platform/dataflow_template_optional_parameters.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec les champs de lʼID de Secret Manager dans Google Cloud et la source de la clé dʼAPI transmise mis en évidence" style="width:80%;">}}  

Consultez la section [Paramètres de modèle][55] dans le modèle Dataflow pour en savoir plus sur lʼutilisation des autres options disponibles :

   - `apiKeySource=KMS` avec `apiKeyKMSEncryptionKey` défini sur votre clé dʼID de [Cloud KMS][71] et `apiKey` défini sur la clé dʼAPI chiffrée
   - **Non conseillé** : `apiKeySource=PLAINTEXT` avec `apiKey` défini sur la clé dʼAPI en texte brut

5. Si vous avez créé un compte service de worker personnalisé, sélectionnez-le dans le menu déroulant **Service account email**.  

{{< img src="integrations/google_cloud_platform/dataflow_template_service_account.png" alt="Paramètres facultatifs dans le modèle Dataflow Datadog avec le menu déroulant de lʼe-mail du compte de service mis en évidence" style="width:80%;">}}

6. Cliquez sur **RUN JOB**.

**Remarque** : si vous possédez un VPC partagé, consultez la page [Spécifier un réseau et un sous-réseau][72] de la documentation Dataflow pour obtenir des instructions sur la spécification des paramètres `Network` et `Subnetwork`.

#### Validation

Les nouveaux événements de logs envoyés au sujet Cloud Pub/Sub apparaissent dans le [Log Explorer de Datadog][73].

**Remarque** : vous pouvez utiliser le [Calculateur de prix Google Cloud][74] pour calculer les coûts potentiels.

#### Surveiller la redirection des logs Cloud Pub/Sub

Lʼ[intégration Google Cloud Pub/Sub][30] fournit des métriques utiles pour surveiller l'état de la redirection des logs :

   - `gcp.pubsub.subscription.num_undelivered_messages` pour le nombre de messages en attente de livraison
   - `gcp.pubsub.subscription.oldest_unacked_message_age` pour l'âge du plus ancien message non acquitté dans un abonnement

Utilisez les métriques ci-dessus avec un [monitor de métriques][75] pour recevoir des alertes pour les messages dans vos abonnements en entrée et de messages non aboutis.

#### Surveiller le pipeline Dataflow

Utilisez [lʼintégration Google Cloud Dataflow][9] de Datadog pour surveiller tous les aspects de vos pipelines Dataflow. Vous pouvez voir toutes vos métriques Dataflow principales sur le dashboard prêt à l'emploi, doté de données contextuelles telles que des informations sur les instances GCE qui exécutent vos workloads Dataflow, et votre débit Pub/Sub.

Vous pouvez également utiliser un [monitor recommandé][76] préconfiguré pour configurer des notifications pour les augmentations du temps de backlog dans votre pipeline. Pour en savoir plus, lisez la section [Monitor your Dataflow pipelines with Datadog][77] (en anglais) dans le blog de Datadog.

## Données collectées

### Métriques

Consultez les différentes pages des intégrations Google Cloud pour en savoir plus sur les métriques associées.

#### Métriques cumulatives

Les métrique cumulatives sont importées dans Datadog avec une métrique `.delta` chaque nom de métrique. Une métrique cumulative est une métrique dont la valeur augmente constamment au fil du temps. Par exemple, une métrique pour `sent bytes` peut être cumulative. Chaque valeur enregistre le nombre total d'octets envoyés par un service à ce moment-là. La valeur delta représente la différence avec la mesure précédente.

Exemple :

 `gcp.gke.container.restart_count` est une métrique CUMULATIVE. Lors de l'importation de cette métrique en tant que métrique cumulative, Datadog ajoute la métrique `gcp.gke.container.restart_count.delta`, qui inclut les valeurs delta (par opposition à la valeur agrégée émise dans le cadre de la métrique CUMULATIVE). Référez-vous à a section [types de métriques Google Cloud][78] pour en savoir plus.

### Événements

Tous les événements de service générés par Google Cloud Platform sont transférés vers votre [Events Explorer Datadog][79].

### Checks de service

L'intégration Google Cloud Platform n'inclut aucun check de service.

### Tags

Les tags sont automatiquement attribués en fonction d'un ensemble d'options de configuration Google Cloud Platform et Google Compute Engine. Toutes les métriques bénéficient du tag `project_id`. Des tags supplémentaires sont recueillis à partir de la plateforme Google Cloud, le cas échéant. Les tags recueillis dépendent du type de métrique.

En outre, Datadog recueille les éléments suivants en tant que tags :

- Les hosts avec les libellés `<key>:<value>`
- Les libellés personnalisés de Google Pub/Sub, GCE, Cloud SQL et Cloud Storage

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques _gcp.logging_ définies par l'utilisateur

Pour les métriques _gcp.logging_ non standard, comme les métriques qui ne correspondent pas aux [métriques de journalisation Datadog par défaut][80], les métadonnées appliquées peuvent différer de celles de Google Cloud Logging.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][81] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][82].

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
[41]: https://cloud.google.com/compute/docs/labeling-resources
[42]: https://cloud.google.com/dataflow
[43]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[44]: https://cloud.google.com/pubsub/docs/create-topic
[45]: https://cloud.google.com/pubsub/docs/create-subscription
[46]: https://cloud.google.com/iam/docs/using-iam-securely#least_privilege
[47]: https://cloud.google.com/logging/docs/export/configure_export_v2#creating_sink
[48]: https://cloud.google.com/logging/docs/view/logging-query-language
[49]: https://cloud.google.com/apis/docs/getting-started#enabling_apis
[50]: https://docs.datadoghq.com/fr/agent/
[51]: https://cloud.google.com/vpc-service-controls/docs/supported-products#table_pubsub
[52]: https://console.cloud.google.com/cloudpubsub/topicList
[53]: https://console.cloud.google.com/cloudpubsub/subscription/
[54]: https://cloud.google.com/dataflow/docs/concepts/streaming-with-cloud-pubsub#unsupported-features
[55]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[56]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-pubsub
[57]: https://console.cloud.google.com/security/secret-manager
[58]: https://cloud.google.com/pubsub/quotas#quotas
[59]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[60]: https://console.cloud.google.com/iam-admin/serviceaccounts
[61]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[62]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[63]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[64]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[65]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[66]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[67]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[68]: https://console.cloud.google.com/logs/viewer
[69]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[70]: https://console.cloud.google.com/dataflow/createjob
[71]: https://cloud.google.com/kms/docs
[72]: https://cloud.google.com/dataflow/docs/guides/specifying-networks#shared
[73]: https://app.datadoghq.com/logs
[74]: https://cloud.google.com/products/calculator
[75]: https://docs.datadoghq.com/fr/monitors/types/metric/
[76]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[77]: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
[78]: https://cloud.google.com/monitoring/api/v3/kinds-and-types
[79]: https://app.datadoghq.com/event/stream
[80]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[81]: https://app.datadoghq.com/metric/summary
[82]: https://docs.datadoghq.com/fr/help/