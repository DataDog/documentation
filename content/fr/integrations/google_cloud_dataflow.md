---
categories:
  - cloud
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés de Google\_Cloud\_Dataflow."
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_dataflow/'
draft: false
git_integration_title: google_cloud_dataflow
has_logo: true
integration_title: "Google\_Cloud\_Dataflow"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_dataflow
public_title: "Intégration Datadog/Google\_Cloud\_Dataflow"
short_description: "Surveillez des métriques clés de Google\_Cloud\_Dataflow."
version: '1.0'
---
## Présentation

Cloud Dataflow est un service entièrement géré permettant de transformer et d'enrichir les données en mode flux (temps réel) ou lot (historique) avec une fiabilité et une expressivité égales.

Utilisez l'intégration Datadog/Google Cloud pour recueillir des métriques de Google Cloud Dataflow.

## Implémentation

### Collecte de métriques

#### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Cloud Dataflow sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Cloud Dataflow depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Cloud Dataflow.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

4. Cliquez sur **Create** et patientez jusqu'à ce que le message de confirmation apparaisse.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_dataflow" >}}


### Événements

L'intégration Google Cloud Dataflow n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Dataflow n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/