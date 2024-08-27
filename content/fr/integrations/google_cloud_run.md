---
categories:
- cloud
- containers
- google cloud
- log collection
- orchestration
dependencies: []
description: Recueillez des métriques, des traces et des logs provenant de l'ensemble
  de vos clusters et analysez-les dans Datadog.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-google-cloud-run-with-datadog/
  tag: Blog
  text: Surveiller Google Cloud Run avec Datadog
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: Documentation
  text: Google Cloud Run for Anthos
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_run
public_title: Intégration Datadog/Google Cloud Run
short_description: Recueillez des métriques, des traces et des logs provenant de l'ensemble
  de vos clusters et analysez-les dans Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Cloud Run est une plateforme de calcul gérée qui vous permet d'exécuter des conteneurs sans état accessibles via des requêtes HTTP.

Activez cette intégration et instrumentez votre conteneur pour visualiser dans Datadog toutes vos métriques et traces ainsi que tous vos logs Cloud Run.

Pour plus d'informations sur Cloud Run for Anthos, consultez la [documentation Google Cloud Run for Anthos][1].

## Configuration

### Collecte de métriques

#### Installation

Configurez lʼ[intégration Google Cloud Platform][2] pour commencer à recueillir des métriques prêtes à l'emploi. Pour configurer des métriques personnalisées, consultez la [documentation sur le sans serveur][3]. 

### APM

#### Intégration
Google Cloud Run expose également des [logs d'audit][4]. Les logs Google Cloud Run sont recueillis avec Google Cloud Logging et envoyés à une tâche Dataflow par le biais d'un sujet Cloud Pub/Sub. Si vous ne l'avez pas encore fait, [configurez la journalisation avec le modèle Dataflow Datadog][5].

Une fois cette opération effectuée, exportez vos logs Google Cloud Run depuis Google Cloud Logging vers la rubrique Pub/Sub :

1. Accédez à la [page Google Cloud Logging][6] et filtrez les logs Google Cloud Run.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez « Cloud Pub/Sub » comme destination et sélectionnez le sujet Pub/Sub créé à cette fin. **Remarque** : le sujet Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

#### Journalisation directe
Pour plus d'informations sur la journalisation directe des applications vers Datadog depuis vos services Cloud Run, consultez la [documentation sur lʼinformatique sans serveur][3].

### Tracing

Pour plus d'informations sur les instructions d'installation spécialisée de lʼAgent pour Google Cloud Run entièrement géré, consultez la [documentation sur lʼinformatique sans serveur][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_run" >}}


### Événements

L'intégration Google Cloud Functions n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Functions n'inclut aucun check de service.


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/fr/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/