---
aliases:
  - /fr/integrations/gcp/
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: Recueillez une multitude de métriques GCP et visualisez vos instances sur une host map.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/'
draft: false
git_integration_title: google_cloud_platform
has_logo: true
integration_title: Google Cloud Platform
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_platform
public_title: Intégration Datadog/Google Cloud Platform
short_description: Recueillez une multitude de métriques GCP et visualisez vos instances sur une host map.
version: '1.0'
---
## Présentation

Associez votre solution Google Cloud Platform pour visualiser tous vos hosts Google Compute Engine (GCE) dans Datadog. Vos hosts apparaissent dans l'aperçu de l'infrastructure de Datadog. Vous pouvez les trier grâce aux tags de host GCE et aux étiquettes GCE qui leur sont automatiquement attribués par Datadog.

<div class="alert alert-warning">
L'intégration GCP de Datadog est conçue pour recueillir <a href="https://cloud.google.com/monitoring/api/metrics_gcp">TOUTES les métriques en provenance de StackDriver</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas actuelle.
</div>

| Intégration                       | Description                                                             |
| --------------------------------- | ----------------------------------------------------------------------- |
| [App Engine][1]                   | PaaS (plateforme en tant que service) permettant de développer des applications évolutives             |
| [Big Query][2]                    | Entrepôt de données pour entreprise                                               |
| [Bigtable][3]                     | Service de base de données Big Data NoSQL                                         |
| [CloudSQL][4]                     | Service de base de données MySQL                                                  |
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
| [Machine Learning][23]            | Services d'apprentissage automatique                                               |
| [Pub/Sub][24]                     | Service de messagerie en temps réel                                             |
| [Spanner][25]                     | Service de base de données relationnelle à évolutivité horizontale et à cohérence forte |
| [Stackdriver Logging][26]         | Gestion et analyse de logs en temps réel                                   |
| [Storage][27]                     | Stockage d'objets unifié                                                  |
| [VPN][28]                         | Fonctionnalité de réseau géré                                           |

## Configuration

### Collecte de métriques

#### Installation

L'intégration Google Cloud <> Datadog utilise des comptes de service pour créer une connexion API entre Google Cloud et Datadog. Vous trouverez ci-dessous les instructions à suivre pour créer un compte de service et fournir à Datadog les identifiants du compte de service afin de commencer à effectuer des appels d'API en votre nom.

**Remarque** : vous devez avoir activé [Google Cloud Billing][29], l'[API Stackdriver Monitoring][30], l'[API Compute Engine][31] et l'[API Cloud Asset][32] pour le ou les projets que vous souhaitez surveiller.

1. Consultez la [page des identifiants Google Cloud][33] pour le projet Google Cloud que vous souhaitez configurer dans le cadre de l'intégration Datadog.
2. Cliquez sur _Create credentials_(en haut de la page) et sélectionnez _Service account_.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount2.png" alt="Paramètres" popup="true" style="width:80%;">}}

3. Saisissez un nom unique pour le compte de service, puis cliquez sur _Create_.
4. Ajoutez les rôles suivants : Compute Viewer, Monitoring Viewer et Cloud Asset Viewer. Cliquez sur_Done_.

   **Remarque** : vous devez être un administrateur clé de compte de service pour sélectionner les rôles Compute Engin et Cloud Asset. Tous les rôles sélectionnés permettent à Datadog de recueillir des métriques, des tags, des événements et des étiquettes utilisateur à votre place.

5. En bas de la page, parcourez vos comptes de service et sélectionnez celui que vous venez de créer. Cliquez sur _Add Key_ -> _Create new key_, puis sélectionnez le type _JSON_. Cliquez sur _Create_ et sur _Save_. Notez l'emplacement de sauvegarde du fichier : vous en aurez besoin par la suite.
6. Accédez au [carré d'intégration Datadog/Google Cloud][34].
7. Dans l'onglet **Configuration**, sélectionnez _Upload Key File_ pour intégrer ce projet à Datadog.
8. Si vous le souhaitez, vous pouvez utiliser des tags pour exclure des hosts de cette intégration. Vous trouverez des instructions détaillées à ce sujet [ci-dessous](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="paramètres" popup="true" style="width:80%;">}}

9. Cliquez sur _Install/Update_.
10. Si vous souhaitez surveiller plusieurs projets, utilisez l'une des méthodes suivantes :

    - Répétez les étapes ci-dessus pour utiliser plusieurs comptes de service.
    - Utilisez le même compte de service en modifiant la valeur de `project_id` dans le fichier JSON téléchargé à l'étape 6. Importez ensuite le fichier dans Datadog, tel que décrit aux étapes 7 à 10.

#### Configuration

Si vous le souhaitez, vous pouvez limiter les instances GCE récupérées par Datadog en saisissant des tags dans la zone de texte **Limiter la collecte de métriques**. Seuls les hosts qui correspondent à l'un des tags définis sont alors importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un caractère unique, `*` pour plusieurs caractères) pour inclure un grand nombre de hosts, ou encore `!` pour exclure certains hosts. L'exemple ci-dessous englobe toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Collecte de logs

Pour les applications exécutées sous GCE ou GKE, l'Agent Datadog peut être utilisé pour la collecte de logs en local. Les logs de service GCP sont recueillis via Stackdriver avant d'être envoyés à un Cloud Pub/Sub grâce à un redirecteur Push HTTP. La collecte de logs repose sur cinq étapes :

1. Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Google Cloud Platform](#installation).
2. [Créer un Cloud Pub/Sub](#creer-un-cloud-pub-sub)
3. [Configurer le Pub/Sub pour transmettre les logs à Datadog](#configurer-le-pub-sub-pour-transmettre-les-logs-a-datadog)
4. [Configurer les exportations depuis les logs Stackdriver vers le Pub/Sub](#exporter-les-logs-de-stackdriver-vers-le-pub-sub).

**Avertissement** : les Pub/Sub sont sujets aux [quotas et aux limitations de Google Cloud][35]. Si votre nombre de logs est supérieur à ces limitations, nous vous conseillons de les décomposer sur plusieurs sujets. Consultez la [section Surveiller la redirection de logs](#surveiller-la-redirection-de-logs) pour découvrir comment configurer un monitor de manière à être automatiquement notifié lorsque vous approchez ces limites.

#### Créer un Cloud Pub/Sub

1. Accédez à la [console Cloud Pub/Sub][36] et créez un sujet.

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Créer un sujet" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur _Save_.

#### Configurer le Pub/Sub pour transmettre les logs à Datadog

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Revenez à la page de présentation des sujets Pub/Sub, puis sélectionnez `Subscriptions` dans le menu de navigation de gauche. Sélectionnez `Create Subscription`.
2. Créez un ID d'abonnement et sélectionnez le sujet que vous venez de créer.
3. Sélectionnez la méthode `Push` et saisissez `https://gcp-intake.logs.datadoghq.com/v1/input/<CLÉ_API_DATADOG>/`.

  {{< img src="integrations/google_cloud_platform/select_push_method.png" alt="Méthode Push" style="width:80%;">}}

4. Configurez des options supplémentaires si vous le souhaitez, telles que **Subscription expiration**, **Acknowledgement deadline**, **Message retention duration** ou **Dead lettering**.
5. Cliquez sur `Create` en bas.

Le Pub/Sub peut désormais recevoir des logs de Stackdriver et les transmettre à Datadog.

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

1. Revenez à la page de présentation des sujets Pub/Sub, puis sélectionnez `Subscriptions` dans le menu de navigation de gauche. Sélectionnez `Create Subscription`.
2. Créez un ID d'abonnement et sélectionnez le sujet que vous venez de créer.
3. Sélectionnez la méthode `Push` et saisissez `https://gcp-intake.logs.datadoghq.eu/v1/input/<CLÉ_API_DATADOG>/`.

  {{< img src="integrations/google_cloud_platform/select_push_method.png" alt="Méthode Push" style="width:80%;">}}

4. Configurez des options supplémentaires si vous le souhaitez, telles que **Subscription expiration**, **Acknowledgement deadline**, **Message retention duration** ou **Dead lettering**.
5. Cliquez sur `Create` en bas.

{{% /tab %}}
{{< /tabs >}}

#### Exporter les logs de Stackdriver vers le Pub/Sub

1. Accédez à la [page Log Explorer][37] et filtrez les logs à exporter.
2. Depuis le menu **Action**, sélectionnez **Create Sink**.
3. Nommez le récepteur.
4. Choisissez _Cloud Pub/Sub_ comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

5. Cliquez sur **Create Sink** et patientez jusqu'à ce que le message de confirmation apparaisse.

**Remarque** : il est possible de créer plusieurs exportations de Stackdriver vers le même Pub/Sub en utilisant plusieurs récepteurs.

**Avertissement** : les Pub/Sub sont sujets aux [quotas et aux limitations de Google Cloud][35]. Si votre nombre de logs est supérieur à ces limitations, nous vous conseillons de les décomposer sur plusieurs sujets. Consultez la [section Surveiller la redirection de logs](#surveiller-la-redirection-de-logs) pour découvrir comment configurer un monitor de manière à être automatiquement notifié lorsque vous approchez ces limites.

#### Surveiller la redirection de logs

Les Pub/Sub sont sujets aux [quotas et aux limitations de Google Cloud][35]. Si votre nombre de logs est supérieur à ces limitations, nous vous conseillons de les décomposer sur plusieurs sujets, en utilisant différents filtres.

Pour être automatiquement notifié lorsque vous atteignez ces quotas, activez [l'intégration Métriques Pub/Sub][24] et configurez un monitor sur la métrique `gcp.pubsub.subscription.num_outstanding_messages`. Filtrez ce monitor sur l'abonnement qui exporte les logs vers Datadog. L'exemple ci-dessous permet de s'assurer que les logs ne dépassent jamais 1 Mo :

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Surveillance Pub Sub" style="width:80%;">}}

## Données collectées

### Métriques

Consultez les différentes pages des intégrations Google Cloud pour en savoir plus sur les métriques associées.

### Événements

Tous les événements de service générés par votre Google Cloud Platform sont transférés à votre [flux d'événements Datadog][38].

### Checks de service

L'intégration Google Cloud Platform n'inclut aucun check de service.

### Tags

Les tags sont automatiquement attribués selon différentes options de configuration relatives à Google Cloud Platform et Google Compute Engine. Voici la liste des tags automatiquement attribués :

- Zone
- Instance-type
- Instance-id
- Automatic-restart
- On-host-maintenance
- Project
- Numeric_project_id
- Nom

En outre, Datadog recueille les éléments suivants en tant que tags :

- Les hosts avec les étiquettes `<key>:<value>`.
- Les étiquettes personnalisées de Google Pub/Sub, GCE, CloudSQL et Cloud Storage.

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques _gcp.logging_ définies par l'utilisateur

Pour les métriques _gcp.logging_ non standard (c'est-à-dire les métriques qui ne correspondent pas aux [métriques de journalisation Datadog par défaut][39]), les métadonnées appliquées peuvent différer de celles de Stackdriver.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][40] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][41].


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
[23]: https://docs.datadoghq.com/fr/integrations/google_cloud_ml/
[24]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub/
[25]: https://docs.datadoghq.com/fr/integrations/google_cloud_spanner/
[26]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/
[27]: https://docs.datadoghq.com/fr/integrations/google_cloud_storage/
[28]: https://docs.datadoghq.com/fr/integrations/google_cloud_vpn/
[29]: https://support.google.com/cloud/answer/6293499?hl=en
[30]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[31]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[32]: https://console.cloud.google.com/apis/api/cloudasset.googleapis.com/overview
[33]: https://console.cloud.google.com/apis/credentials
[34]: http://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[35]: https://cloud.google.com/pubsub/quotas#quotas
[36]: https://console.cloud.google.com/cloudpubsub/topicList
[37]: https://console.cloud.google.com/logs/viewer
[38]: https://app.datadoghq.com/event/stream
[39]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[40]: https://app.datadoghq.com/metric/summary
[41]: https://docs.datadoghq.com/fr/help/