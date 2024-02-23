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

## Présentation

Associez votre solution Google Cloud Platform pour visualiser tous vos hosts Google Compute Engine (GCE) dans Datadog. Vos hosts apparaissent dans l'aperçu de l'infrastructure de Datadog. Vous pouvez les trier grâce aux tags de host GCE et aux libellés GCE qui leur sont automatiquement attribués par Datadog.

<div class="alert alert-warning">
L'intégration GCP de Datadog est conçue pour recueillir <a href="https://cloud.google.com/monitoring/api/metrics_gcp">toutes les métriques Google Cloud</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas à jour.
</div>

| Intégration                       | Description                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| [App Engine][1]                   | PaaS (plateforme en tant que service) permettant de développer des applications évolutives             |
| [Big Query][2]                    | Entrepôt de données pour entreprise                                               |
| [Bigtable][3]                     | Service de base de données Big Data NoSQL                                         |
| [Cloud SQL][4]                    | Service de base de données MySQL                                                  |
| [API Cloud][5]                   | Interfaces de programmation pour tous les services Google Cloud Platform          |
| [Cloud Composer][6]               | Service d'orchestration de workflows entièrement géré                           |
| [Cloud Dataproc][7]               | Service cloud permettant d'exécuter des clusters Apache Spark et Apache Hadoop     |
| [Cloud Filestore][8]              | Stockage de fichiers entièrement géré hautes performances                            |
| [Cloud Firestore][9]              | Base de données flexible et évolutive pour le développement mobile, web et serveur   |
| [Cloud Interconnect][10]          | Connectivité hybride                                                     |
| [Cloud IoT][11]                   | Connexion et gestion de vos appareils en toute sécurité                                 |
| [Cloud Load Balancing][12]        | Répartition de ressources informatiques à équilibrage de charge                              |
| [Cloud Memorystore pour Redis][13] | Service de stockage de données en mémoire entièrement géré                            |
| [Cloud Router][14]                | Échange d'itinéraires entre votre VPC et les réseaux sur site à l'aide du protocole BGP  |
| [Cloud Run][15]                   | Plateforme de calcul gérée qui exécute des conteneurs sans état via HTTP    |
| [Cloud Tasks][16]                 | Files d'attente de tâches distribuées                                                 |
| [Cloud TPU][17]                   | Entraînement et exécution de modèles d'apprentissage automatique                                   |
| [Compute Engine][18]              | Machines virtuelles hautes performances                                       |
| [Container Engine][19]            | Kubernetes, géré par Google                                           |
| [Datastore][20]                   | Base de données NoSQL                                                          |
| [Firebase][21]                    | Plateforme mobile pour le développement d'applications                             |
| [Functions][22]                   | Plateforme sans serveur pour la création de microservices basés sur des événements              |
| [Kubernetes Engine][23]           | Gestionnaire de clusters et système d'orchestration                                |
| [Machine Learning][24]            | Services d'apprentissage automatique                                               |
| [Pub/Sub][25]                     | Service de messagerie en temps réel                                             |
| [Spanner][26]                     | Service de base de données relationnelle à évolutivité horizontale et à cohérence forte |
| [Cloud Logging][27]               | Gestion et analyse de logs en temps réel                                   |
| [Storage][28]                     | Stockage d'objets unifié                                                  |
| [VPN][29]                         | Fonctionnalité de réseau géré                                           |

## Configuration

### Collecte de métriques

#### Installation

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    L'emprunt d'identité de compte de service n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

Grâce à l'[emprunt d'identité de compte de service][30] et à la découverte automatique des projets, vous pouvez intégrer Datadog à [Google Cloud][31].

Cette approche vous permet de surveiller tous les projets accessibles depuis un compte de service, en attribuant des rôles IAM aux projets pertinents. Il est possible d'attribuer ces rôles à des projets spécifiques, mais aussi de les attribuer à l'échelle d'une organisation ou d'un dossier, afin de surveiller des groupes de projets. De cette façon, Datadog découvre et surveille automatiquement tous les projets d'un contexte donné, y compris les nouveaux projets qui intègrent ultérieurement le groupe.

##### Prérequis

* Si votre organisation restreint les identités en fonction de leur domaine, vous devez ajouter l'identité client Datadog à la liste blanche de votre stratégie. L'identité client de Datadog est `C0147pk0i`.

* Pour utiliser les fonctionnalités d'emprunt d'identité de compte de service et de découverte automatique des projets, et ainsi surveiller vos projets, il est nécessaire d'attribuer certains rôles et d'activer certaines API. Avant de commencer, vérifiez que les API suivantes sont activées pour les projets à surveiller :
  * [API Cloud Resource Manager][32]
  * [API Google Cloud Billing][33]
  * [API Cloud Monitoring][34]
  * [API Compute Engine ][35]
  * [API Cloud Asset][36]
  * [API IAM][37]

##### 1. Créer votre compte de service Google Cloud

1. Ouvrez votre [console Google Cloud][38].
2. Accédez à **IAM & Admin** > **Service Accounts**.
3. Cliquez sur **Create service account** en haut de la page.
4. Attribuez un nom unique au compte de service, puis cliquez sur **Create and continue**.
5. Ajoutez les rôles suivants au compte de service :
   * Monitoring Viewer
   * Compute Viewer
   * Cloud Asset Viewer
   * Browser
6. Cliquez sur **Continue**, puis sur **Done** pour terminer la création du compte de service.

{{< img src="integrations/google_cloud_platform/create-service-account.png" alt="Interface de la console Google Cloud, avec le processus de création de compte de service. Sous l'étape « Grant this service account access to project », les quatre rôles indiqués dans les instructions sont ajoutés." style="width:70%;">}}

##### 2. Ajouter le service principal Datadog à votre compte de service

1. Dans Datadog, accédez à [**Integrations** > **Google Cloud Platform**][39].
2. Cliquez sur **Add GCP Account**. SI vous n'avez pas encore configuré de projet, vous êtes automatiquement redirigé vers cette page.
3. Si vous n'avez pas généré de service principal Datadog pour votre organisation, cliquez sur le bouton **Generate Principal**.
4. Copiez votre service principal Datadog et conservez-le pour la prochaine section.
   {{< img src="integrations/google_cloud_platform/principal-2.png" alt="Interface Datadog, avec le processus d'ajout d'un nouveau compte GCP. La première étape, « Add Datadog Principal to Google », contient une zone de texte permettant à l'utilisateur de générer un service principal Datadog et de le copier dans son presse-papiers. La deuxième étape, « Add Service Account Email », inclut une zone de texte que l'utilisateur peut remplir lors de la section 3." style="width:70%;">}}
   Gardez cette fenêtre ouverte, car vous en aurez besoin lors de la [prochaine section](#3-terminer-la-configuration-de-l-integration-dans-datadog).
5. Dans la [console Google Cloud][38], sous le menu **Service Accounts**, recherchez le compte de service que vous avez créé lors de la [première section](#1-creer-votre-compte-de-service-google-cloud).
6. Accédez à l'onglet **Permissions**, puis cliquez sur **Grant Access**.
   {{< img src="integrations/google_cloud_platform/grant-access.png" alt="Interface de la console Google Cloud, avec l'onglet Permissions sous Service Accounts." style="width:70%;">}}
7. Collez votre service principal Datadog dans la zone **New Principals**.
8. Attribuez le rôle **Service Account Token Creator**, puis cliquez sur **Save**.
   {{< img src="integrations/google_cloud_platform/add-principals-blurred.png" alt="Interface de la console Google Cloud, avec les sections « Add principals » et « Assign roles »." style="width:70%;">}}

**Remarque** : si vous avez déjà configuré l'accès à l'aide d'un service principal Datadog partagé, vous pouvez révoquer l'autorisation pour ce service principal après avoir suivi ces étapes.

##### 3. Terminer la configuration de l'intégration dans Datadog

1. Dans votre console Google Cloud, accédez à l'onglet **Service Account** > **Details**, afin de consulter l'adresse e-mail associée à ce compte de service Google. Son format est `<nom-compte-service>@datadog-sandbox.iam.gserviceaccount.com`.
2. Copiez cette adresse e-mail.
3. Revenez sur le carré de configuration de l'intégration dans Datadog (là où vous avez copié votre service principal Datadog lors de la [section précédente](#2-ajouter-le-service-principal-datadog-a-votre-compte-de-service)).
4. Dans la zone de texte sous **Add Service Account Email**, collez l'adresse e-mail que vous avez précédemment copiée.
5. Cliquez sur **Verify and Save Account**.

Les métriques devraient s'afficher dans Datadog après environ 15 minutes.

##### 4. Attribuer des rôles à d'autres projets (facultatif)

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

#### Configuration

Si vous le souhaitez, vous pouvez limiter les instances GCE récupérées par Datadog. Pour ce faire, saisissez des tags dans la zone de texte **Limit Metric Collection** située dans le menu déroulant d'un projet donné. Seuls les hosts qui correspondent à l'un des tags définis sont alors importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un caractère unique, `*` pour plusieurs caractères) pour inclure un grand nombre de hosts, ou encore `!` pour exclure certains hosts. L'exemple ci-dessous englobe toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la [documentation Google][40] pour obtenir plus de renseignements sur la création et la gestion de libellés.

### Collecte de logs

Pour les applications exécutées sous GCE ou GKE, l'Agent Datadog peut être utilisé pour la collecte de logs en local. Les logs de service GCP sont recueillis par l'intermédiaire de Google Cloud Logging et envoyés à un Cloud Pub/Sub grâce à un redirecteur Push HTTP. La collecte de logs repose sur cinq étapes :

1. Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Google Cloud Platform](#installation).
2. [Créer un Cloud Pub/Sub](#creer-un-cloud-pub-sub)
3. [Configurer le Pub/Sub pour transmettre les logs à Datadog](#transmettre-les-logs-a-datadog)
4. [Configurer les exportations depuis les logs Google Cloud vers le Pub/Sub](#exporter-des-logs-depuis-google-cloud)

**Avertissement** : les Pub/Sub sont inclus dans les [quotas et limitations de Google Cloud][41]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs](#surveiller-la-redirection-de-logs) pour découvrir comment configurer un monitor afin de recevoir automatiquement une notification lorsque vous vous approchez de ces limites.

#### Créer un Cloud Pub/Sub

1. Accédez à la [console Cloud Pub/Sub][42] et créez un sujet.

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Créer un sujet" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur _Save_.

#### Transmettre les logs à Datadog

1. Revenez à la page de présentation des sujets Pub/Sub, puis sélectionnez `Subscriptions` dans le menu de navigation de gauche. Sélectionnez `Create Subscription`.
2. Créez un ID d'abonnement et sélectionnez le sujet que vous venez de créer.
3. Sélectionnez la méthode `Push` et saisissez ce qui suit : `https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp`

   Vous pouvez [créer une clé d'API][43] ou choisir une clé d'API existante en accédant à [Datadog Organization Settings -> API Keys][44].


4. Configurez des options supplémentaires si vous le souhaitez, telles que **Subscription expiration**, **Acknowledgment deadline**, **Message retention duration** ou **Dead lettering**.
5. Sous **Retry policy**, sélectionnez `Retry after exponential backoff delay`.
6. Cliquez sur `Create` en bas.

Le Pub/Sub peut désormais recevoir des logs de Google Cloud Logging et les transmettre à Datadog.

#### Exporter des logs depuis Google Cloud

1. Accédez à [la page Log Explorer][45] et filtrez les logs à exporter.
2. Dans l'onglet **Log Router**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez _Cloud Pub/Sub_ comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Cliquez sur **Create Sink** et patientez jusqu'à ce que le message de confirmation apparaisse.

**Remarque** : il est possible de créer plusieurs exportations depuis Google Cloud Logging vers le même Pub/Sub en utilisant plusieurs récepteurs.

**Avertissement** : les Pub/Sub sont inclus dans les [quotas et limitations de Google Cloud][41]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets. Consultez la [rubrique Surveiller la redirection de logs](#surveiller-la-redirection-de-logs) pour découvrir comment configurer un monitor afin de recevoir automatiquement une notification lorsque vous vous approchez de ces limites.

#### Surveiller la redirection de logs

Les Pub/Sub sont inclus dans les [quotas et limitations de Google Cloud][41]. Si votre nombre de logs dépasse ces limites, Datadog vous conseille de les répartir sur plusieurs sujets, en utilisant différents filtres.

Pour recevoir automatiquement une alerte lorsque vous atteignez ces quotas, activez [l'intégration Pub/Sub][25] et configurez un monitor sur la métrique `gcp.pubsub.subscription.num_outstanding_messages`. Filtrez ensuite ce monitor sur l'abonnement qui exporte les logs vers Datadog. L'exemple ci-dessous permet de s'assurer que le nombre de logs ne dépasse jamais 1 000 :

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Surveillance Pub Sub" style="width:80%;">}}

#### Échantillonner des logs

Vous avez la possibilité d'échantillonner les logs interrogés grâce à la [fonction sample][46]. Par exemple, pour inclure uniquement 10 % des logs, utilisez `sample(insertId, 0.1)`.

## Données collectées

### Métriques

Consultez les différentes pages des intégrations Google Cloud pour en savoir plus sur les métriques associées.

### Événements

Tous les événements de service générés par Google Cloud Platform sont transférés vers votre [flux d'événements Datadog][47].

### Checks de service

L'intégration Google Cloud Platform n'inclut aucun check de service.

### Tags

Les tags sont automatiquement attribués en fonction d'un ensemble d'options de configuration Google Cloud Platform et Google Compute Engine. Toutes les métriques bénéficient du tag `project_id`. Des tags supplémentaires sont recueillis à partir de la plateforme Google Cloud, le cas échéant. Les tags recueillis dépendent du type de métrique.

En outre, Datadog recueille les éléments suivants en tant que tags :

- Les hosts avec les libellés `<key>:<value>`
- Les libellés personnalisés de Google Pub/Sub, GCE, Cloud SQL et Cloud Storage

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques _gcp.logging_ définies par l'utilisateur

Pour les métriques _gcp.logging_ non standard, comme les métriques qui ne correspondent pas aux [métriques de journalisation Datadog par défaut][48], les métadonnées appliquées peuvent différer de celles de Google Cloud Logging.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][49] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][50].


[1]: https://docs.datadoghq.com/fr/integrations/google_app_engine/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_big_query/
[3]: https://docs.datadoghq.com/fr/integrations/google_cloud_bigtable/
[4]: https://docs.datadoghq.com/fr/integrations/google_cloudsql/
[5]: https://docs.datadoghq.com/fr/integrations/google_cloud_apis/
[6]: https://docs.datadoghq.com/fr/integrations/google_cloud_composer/
[7]: https://docs.datadoghq.com/fr/integrations/google_cloud_dataproc/
[8]: https://docs.datadoghq.com/fr/integrations/google_cloud_filestore/
[9]: https://docs.datadoghq.com/fr/integrations/google_cloud_firestore/
[10]: https://docs.datadoghq.com/fr/integrations/google_cloud_interconnect/
[11]: https://docs.datadoghq.com/fr/integrations/google_cloud_iot/
[12]: https://docs.datadoghq.com/fr/integrations/google_cloud_loadbalancing/
[13]: https://docs.datadoghq.com/fr/integrations/google_cloud_redis/
[14]: https://docs.datadoghq.com/fr/integrations/google_cloud_router/
[15]: https://docs.datadoghq.com/fr/integrations/google_cloud_run/
[16]: https://docs.datadoghq.com/fr/integrations/google_cloud_tasks/
[17]: https://docs.datadoghq.com/fr/integrations/google_cloud_tpu/
[18]: https://docs.datadoghq.com/fr/integrations/google_compute_engine/
[19]: https://docs.datadoghq.com/fr/integrations/google_container_engine/
[20]: https://docs.datadoghq.com/fr/integrations/google_cloud_datastore/
[21]: https://docs.datadoghq.com/fr/integrations/google_cloud_firebase/
[22]: https://docs.datadoghq.com/fr/integrations/google_cloud_functions/
[23]: https://docs.datadoghq.com/fr/integrations/google_kubernetes_engine/
[24]: https://docs.datadoghq.com/fr/integrations/google_cloud_ml/
[25]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub/
[26]: https://docs.datadoghq.com/fr/integrations/google_cloud_spanner/
[27]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/
[28]: https://docs.datadoghq.com/fr/integrations/google_cloud_storage/
[29]: https://docs.datadoghq.com/fr/integrations/google_cloud_vpn/
[30]: https://cloud.google.com/iam/docs/service-account-overview#impersonation
[31]: /fr/integrations/google_cloud_platform/
[32]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[33]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[34]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[35]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[36]: https://console.cloud.google.com/apis/library/cloudasset.googleapis.com
[37]: https://console.cloud.google.com/apis/library/iam.googleapis.com
[38]: https://console.cloud.google.com/
[39]: https://app.datadoghq.com/integrations/google-cloud-platform
[40]: https://cloud.google.com/compute/docs/labeling-resources
[41]: https://cloud.google.com/pubsub/quotas#quotas
[42]: https://console.cloud.google.com/cloudpubsub/topicList
[43]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[44]: https://app.datadoghq.com/organization-settings/api-keys
[45]: https://console.cloud.google.com/logs/viewer
[46]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
[47]: https://app.datadoghq.com/event/stream
[48]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[49]: https://app.datadoghq.com/metric/summary
[50]: https://docs.datadoghq.com/fr/help/