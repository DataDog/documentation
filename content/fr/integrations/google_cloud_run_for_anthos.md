---
categories:
- cloud
- orchestration
- google cloud
- log collection
ddtype: crawler
dependencies: []
description: Recueillez des métriques et des logs depuis vos clusters Cloud Run for
  Anthos et analysez-les dans Datadog.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
draft: false
git_integration_title: google_cloud_run_for_anthos
has_logo: true
integration_id: google-cloud-run-for-anthos
integration_title: Google Cloud Run for Anthos
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_run_for_anthos
public_title: Intégration Datadog/Google Cloud Run for Anthos
short_description: Recueillez des métriques et des logs depuis vos clusters Cloud
  Run for Anthos et analysez-les dans Datadog.
version: '1.0'
---

## Présentation

Google Cloud Run for Anthos est une plateforme flexible de développement sans serveur pour les environnements hybrides et multicloud. Cloud Run for Anthos est l'offre [Knative][1] gérée par Google et entièrement compatible.

Utilisez l'intégration Datadog/Google Cloud Platform pour recueillir des métriques de Google Cloud Run for Anthos.

## Configuration

### Collecte de métriques

#### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord l'[intégration Google Cloud Platform][2].

Si vous authentifiez déjà vos services Cloud Run for Anthos à l'aide de Workload Identity, aucune étape supplémentaire n'est requise.

Si vous n'avez pas activé Workload Identity, vous devez adopter Workload Identity afin de commencer à recueillir des métriques Knative. Pour y parvenir, vous devez lier un compte de service Kubernetes à un compte de service Google et configurer Workload Identity pour chaque service à partir duquel vous souhaitez recueillir des métriques.

Pour obtenir des instructions de configuration détaillées, consultez la section [Utiliser Workload Identity de la documentation Google Cloud][3].

### Collecte de logs

Google Cloud Run for Anthos expose des [logs de service][4]. Les logs Google Cloud Run peuvent être recueillis avec Google Cloud Logging et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][5].

Une fois cette opération effectuée, exportez vos logs Google Cloud Run depuis Google Cloud Logging vers le Pub/Sub :

1. Accédez à [Cloud Run for Anthos][6], cliquez sur les services de votre choix, puis accédez à l'onglet **Logs**.
2. Cliquez sur **View in Logs Explorer** pour accéder à la **page Google Cloud Logging**.
2. Cliquez sur **Create Sink** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exporter les logs Google Cloud Pub/Sub vers le Pub Sub" >}}

4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_run_for_anthos" >}}


### Événements

L'intégration Google Cloud Run for Anthos n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Run for Anthos n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[3]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[4]: https://cloud.google.com/anthos/run/docs/logging
[5]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/anthos/run
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/