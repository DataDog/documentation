---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: Recueillez une multitude de métriques GCP et visualisez vos instances dans un host. map.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_platform/'
git_integration_title: google_cloud_platform
has_logo: true
integration_title: Google Cloud Platform
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_platform
public_title: Intégration Datadog/Google Cloud Platform
short_description: Recueillez une multitude de métriques GCP et visualisez vos instances dans a host map.
version: '1.0'
---
## Présentation

Associez votre solution Google Cloud Platform pour visualiser tous vos hosts Google Compute Engine (GCE) dans Datadog. Vos hosts apparaissent dans l'aperçu de l'infrastructure de Datadog. Vous pouvez les trier grâce aux tags de host GCE et aux étiquettes GCE qui leur sont automatiquement attribués par Datadog.

Les intégrations connexes comprennent :

|                           |                                                                         |
| -------------             | -------------                                                           |
| [App Engine][1]           | PaaS (plateforme en tant que service) permettant de développer des applications évolutives             |
| [Big Query][2]            | Entrepôt de données pour entreprise                                               |
| [CloudSQL][3]             | Service de base de données MySQL                                                  |
| [Cloud Run][4]           | Plateforme de calcul gérée qui exécute des conteneurs sans état via HTTP    |       
| [Compute Engine][5]       | Machines virtuelles puissantes                                       |
| [Container Engine][6]     | Kubernetes, gérés par Google                                           |
| [Datastore][7]            | Base de données NoSQL                                                          |
| [Firebase][8]             | Plateforme mobile pour le développement d'applications                             |
| [Functions][9]            | Plateforme d'informatique sans serveur pour la création de microservices basés sur des événements              |
| [Machine Learning][10]     | Services d'apprentissage automatique                                               |
| [Pub/Sub][11]             | Service de messagerie en temps réel                                             |
| [Spanner][12]             | Service de base de données relationnelle à évolutivité horizontale et à cohérence forte |
| [Stackdriver Logging][13] | Gestion et analyse de logs en temps réel                                   |
| [Storage][14]             | Stockage d'objets unifié                                                  |
| [VPN][15]                 | Fonctionnalité de réseau géré                                           |

## Implémentation
### Collecte de métriques
#### Installation

L'intégration Google Cloud <> Datadog utilise des comptes de service pour créer une connexion API entre Google Cloud et Datadog. Vous trouverez ci-dessous les instructions à suivre pour créer un compte de service et fournir à Datadog les identifiants du compte de service afin de commencer à effectuer des appels d'API en votre nom.

1. Consultez la [page des identifiants Google Cloud][16] pour le projet Google Cloud que vous souhaitez configurer dans le cadre de l'intégration Datadog.
2. Cliquez sur *Create credentials* et sélectionnez *Service account key*.

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount.png" alt="paramètres" responsive="true" popup="true" style="width:80%;">}}

3. Dans la liste déroulante *Service account*, sélectionnez *New service account*.
4. Saisissez un nom unique pour le compte de service.
5. Pour *Role*, sélectionnez *Compute engine —> Compute Viewer* et *Monitoring —> Monitoring Viewer*.

    Remarque : ces rôles vous permettent de recueillir des métriques, des tags, des événements et des étiquettes GCE en votre nom.

6. Sélectionnez *JSON* comme type de clé, puis cliquez sur *create*.
7. Notez l'emplacement de sauvegarde du fichier : vous en aurez besoin par la suite.
8. Accédez au [carré d'intégration Datadog/Google Cloud][17].
8. Sélectionnez *Upload Key File* pour intégrer ce projet à Datadog.
9. Si vous le souhaitez, vous pouvez utiliser des tags pour exclure des hosts de cette intégration. Vous trouverez des instructions détaillées à ce sujet [ci-dessous](#configuration).

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="paramètres" responsive="true" popup="true" style="width:80%;">}}

10. Cliquez sur *Install/Update*.
11. Répétez ces étapes pour chaque projet que vous souhaitez surveiller.

Vous devez avoir activé [Google Cloud Billing][18], l'[API Stackdriver Monitoring][19] et l'[API Compute Engine][20] pour le ou les projets que vous souhaitez surveiller.

#### Configuration

Si vous le souhaitez, vous pouvez limiter les instances GCE récupérées par Datadog en saisissant des tags dans la zone de texte **Limiter la collecte de métriques**. Seuls les hosts qui correspondent à l'un des tags définis sont alors importés dans Datadog. Vous pouvez utiliser des wildcards (`?` pour un caractère unique, `*` pour plusieurs caractères) pour inclure un grand nombre de hosts, ou encore `!` pour exclure certains hosts. L'exemple ci-dessous englobe toutes les instances de taille `c1*`, mais exclut les hosts de type staging :

```
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

### Collecte de logs

**Les logs peuvent uniquement être recueillis sur le site américain de Datadog.**

Pour les applications s'exécutant sur GCE ou GKE, l'Agent Datadog peut être utilisé pour la collecte de logs locale. Les logs de service GCP sont recueillis via Stackdriver avant d'être envoyés à un Cloud Pub/Sub grâce à un redirecteur Push HTTP. La collecte de logs repose sur quatre étapes :

1. [Créer un Cloud Pub/Sub](#creer-un-cloud-pub-sub)
2. [Valider votre domaine Datadog pour envoyer les logs de GCP à Datadog](#valider-le-domaine-datadog)
3. [Configurer le Pub/Sub pour transmettre les logs à Datadog](#configurer-le-pub-sub-pour-transmettre-les-logs-a-datadog)
4. [Configurer les exportations depuis les logs Stackdriver vers le Pub/Sub](#exporter-les-logs-de-stackdriver-vers-le-pub-sub).

#### Créer un Cloud Pub Sub

1. Accédez à la [console Cloud Pub Sub][21] et créez un sujet.

    {{< img src="integrations/google_cloud_platform/create_a_topic.png" alt="Créer un sujet" responsive="true" style="width:80%;">}}

2. Donnez un nom clair à ce sujet, comme `export-logs-to-datadog`, et cliquez sur *Save*.

#### Valider le domaine Datadog

Pour valider le domaine, vous devez demander à Google de générer un fichier HTML qui est utilisé comme identifiant unique. Cela permet à Google de valider l'endpoint Datadog et d'y transmettre les logs.

1. Connectez-vous à la [Google Search Console][22].
2. Dans la section `URL`, ajoutez `https://gcp-intake.logs.datadoghq.com/v1/input/<CLÉ_API>` ([vous trouverez votre clé d'API Datadog ici][23]).
3. Téléchargez le fichier HTML en local :

    {{< img src="integrations/google_cloud_platform/download_html_file.png" alt="Télécharger le fichier HTML" responsive="true" style="width:80%;">}}

4. Transmettez ce fichier HTML à Datadog avec la commande suivante :

    ```
    curl -X POST -H "Content-type: application/json" -d '{"file_contents": "google-site-verification: <GOOGLE_FILE_NAME>.html"}' "https://app.datadoghq.com/api/latest/integration/gcp_logs_site_verification?api_key=<DATADOG_API_KEY>&application_key=<DATADOG_APPLICATION_KEY>"
    ```

    Les informations à saisir pour `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` figurent dans la [section API Datadog][23]. Le résultat attendu de cette commande est `{}`.

5. Cliquez sur *Verify* dans la console Google et attendez que le message de confirmation s'affiche.
6. Accédez à la [page des identifiants de l'API dans la console GCP][24] et cliquez sur `add domain`.

    {{< img src="integrations/google_cloud_platform/credential_page.png" alt="Page des identifiants" responsive="true" style="width:40%;">}}

7. Saisissez le même endpoint qu'avant et cliquez sur `add` :

    {{< img src="integrations/google_cloud_platform/download_domain.png" alt="Télécharger le domaine" responsive="true" style="width:80%;">}}

Lorsque vous avez terminé, cliquez sur le lien `Search Console` de la fenêtre contextuelle pour confirmer l'activation :

{{< img src="integrations/google_cloud_platform/properly_enabled.png" alt="Propriété activée" responsive="true" style="width:70%;">}}

Le projet GCP peut désormais être configuré de façon à transmettre les logs du Pub/Sub à Datadog.

#### Configurer le Pub/Sub pour transmettre les logs à Datadog

1. Revenez sur le Pub/Sub créé plus tôt et ajoutez un `subscription` :

    {{< img src="integrations/google_cloud_platform/create_new_subscription.png" alt="Créer un abonnement" responsive="true" style="width:80%;">}}

2. Sélectionnez la méthode `Push` et saisissez `https://gcp-intake.logs.datadoghq.com/v1/input/<CLÉ_API_DATADOG>/`.

    {{< img src="integrations/google_cloud_platform/push_method.png" alt="Méthode Push" responsive="true" style="width:80%;">}}

3. Cliquez sur `Create` en bas.

Le Pub/Sub peut désormais recevoir des logs de Stackdriver et les transmettre à Datadog.

**Remarque** : si vous constatez une erreur à l'étape 3, cela signifie que le site Datadog n'a pas été validé. Consultez les [étapes de validation du domaine](#valider-le-domaine) pour vérifier qu'il est bien validé.

#### Exporter les logs de Stackdriver vers le Pub/Sub

1. Accédez à [la page Stackdriver][25] et filtrez les logs à exporter.
2. Cliquez sur `Create Export` et nommez le récepteur.
3. Choisissez `Cloud Pub/Sub` comme destination et sélectionnez le Pub/Sub créé à cette fin. Le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_platform/export_log_from_stackdriver.png" alt="Exporter un log de Stackdriver" responsive="true" style="width:80%;">}}

4. Cliquez sur `Create` et attendez que le message de confirmation s'affiche.

**Remarque** : il est possible de créer plusieurs exportations de Stackdriver vers le même Pub/Sub en utilisant plusieurs récepteurs.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_platform" >}}


### Événements

Tous les événements de service générés par votre Google Cloud Platform sont transférés à votre [flux d'événements Datadog][27]. Les autres événements enregistrés dans Stackdriver ne sont actuellement pas disponibles, mais le seront prochainement grâce au [produit Log Management de Datadog][28].

### Checks de service
L'intégration Google Cloud Platform n'inclut aucun check de service.

## Dépannage

### Mes métadonnées sont incorrectes pour les métriques *gcp.logging* définies par l'utilisateur

Pour les métriques *gcp.logging* non standard (c'est-à-dire les métriques qui ne correspondent pas aux [métriques de journalisation Datadog par défaut][29]), les métadonnées appliquées peuvent différer de celles de Stackdriver.

Dans ce cas, les métadonnées doivent être définies manuellement sur la [page de résumé de la métrique][30] : recherchez et sélectionnez la métrique en question, puis cliquez sur l'icône en forme de crayon à côté des métadonnées.

Besoin d'aide ? Contactez [l'assistance Datadog][31].

## Pour aller plus loin
### Base de connaissances
#### Tags attribués

Les tags sont automatiquement attribués selon différentes options de configuration relatives à Google Cloud Platform et Google Compute Engine. Voici la liste des tags automatiquement attribués :

* Zone
* Instance-type
* Instance-id
* Automatic-restart
* On-host-maintenance
* Project
* Numeric_project_id
* Name

En outre, tous les hosts avec les étiquettes `<key>:<value>` comportent les tags correspondants.


[1]: https://docs.datadoghq.com/fr/integrations/google_app_engine
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_big_query
[3]: https://docs.datadoghq.com/fr/integrations/google_cloudsql
[4]: https://docs.datadoghq.com/fr/integrations/google_cloud_run
[5]: https://docs.datadoghq.com/fr/integrations/google_compute_engine
[6]: https://docs.datadoghq.com/fr/integrations/google_container_engine
[7]: https://docs.datadoghq.com/fr/integrations/google_cloud_datastore
[8]: https://docs.datadoghq.com/fr/integrations/google_cloud_firebase
[9]: https://docs.datadoghq.com/fr/integrations/google_cloud_functions
[10]: https://docs.datadoghq.com/fr/integrations/google_cloud_ml
[11]: https://docs.datadoghq.com/fr/integrations/google_cloud_pubsub
[12]: https://docs.datadoghq.com/fr/integrations/google_cloud_spanner
[13]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging
[14]: https://docs.datadoghq.com/fr/integrations/google_cloud_storage
[15]: https://docs.datadoghq.com/fr/integrations/google_cloud_vpn
[16]: https://console.cloud.google.com/apis/credentials
[17]: http://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[18]: https://support.google.com/cloud/answer/6293499?hl=en
[19]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[20]: https://console.cloud.google.com/apis/library/compute.googleapis.com
[21]: https://console.cloud.google.com/cloudpubsub/topicList
[22]: https://search.google.com/search-console/welcome
[23]: https://app.datadoghq.com/account/settings#api
[24]: https://console.cloud.google.com/apis/credentials/domainverification
[25]: https://console.cloud.google.com/logs/viewer
[26]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_platform/google_cloud_platform_metadata.csv
[27]: https://app.datadoghq.com/event/stream
[28]: https://docs.datadoghq.com/fr/logs
[29]: https://docs.datadoghq.com/fr/integrations/google_stackdriver_logging/#metrics
[30]: https://app.datadoghq.com/metric/summary
[31]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}