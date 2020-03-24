---
categories:
  - cloud
  - orchestration
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: 'Recueillez des métriques, des traces et des logs provenant de l''ensemble de vos clusters et analysez-les dans Datadog.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_run/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-google-cloud-run-with-datadog/'
    tag: Blog
    text: "Surveiller Google\_Cloud\_Run avec Datadog"
git_integration_title: google_cloud_run
has_logo: true
integration_title: "Google\_Cloud\_Run"
is_public: true
kind: intégration
manifest_version: '1.0'
name: google_cloud_run
public_title: "Intégration Datadog/Google\_Cloud\_Run"
short_description: 'Recueillez des métriques, des traces et des logs en provenance de l''ensemble de vos clusters et analysez-les dans Datadog.'
version: '1.0'
---
## Présentation

Cloud Run est une plateforme de calcul gérée qui vous permet d'exécuter des conteneurs sans état accessibles via des requêtes HTTP.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques et traces ainsi que tous vos logs Cloud Run.

## Implémentation

### Collecte de métriques

#### Installation

Si vous utilisez la version entièrement gérée de Cloud Run, il suffit de configurer [l'intégration Google Cloud Platform][1].

Si vous configurez Cloud Run sur GKE, activez [l'intégration Google Cloud Platform][1] puis déployez l'Agent Datadog sur vos clusters grâce au [DaemonSet Kubernetes][2].

**Remarque** : lors du déploiement du DaemonSet de l'Agent Datadog, assurez-vous que le paramètre `hostNetwork: true` est défini dans les spécifications du pod.

### Collecte de logs

Google Cloud Run expose également des [logs d'audit][3].
Les logs Google Cloud Run sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][4].

Une fois cette opération effectuée, exportez vos logs Google Cloud Run depuis Stackdriver vers le Pub/sub :

1. Accédez à la [page Stackdriver][5] et filtrez les logs Google Cloud Run.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

   {{< img src="integrations/google_cloud_run/export_cloud_run_revision.png" alt="Exporter les logs Google Cloud Run vers le Pub Sub">}}

4. Cliquez sur **Create** et patientez jusqu'à ce que le message de confirmation apparaisse.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_run" >}}


### Événements

L'intégration Google Cloud Functions n'inclut aucun événement.

### Checks de service

L'intégration Google Cloud Functions n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup
[3]: https://cloud.google.com/run/docs/audit-logging
[4]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[7]: https://docs.datadoghq.com/fr/help