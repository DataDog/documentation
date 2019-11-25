---
categories:
  - cloud
  - os & system
  - google cloud
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des instances occupées et comparez les métriques d'utilisation de compte aux limites de quota.
doc_link: 'https://docs.datadoghq.com/integrations/google_compute_engine/'
git_integration_title: google_compute_engine
has_logo: true
integration_title: "Google\_Compute\_Engine"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_compute_engine
public_title: Intégration Datadog/Google Compute Engine
short_description: Surveillez des instances occupées et comparez les métriques d'utilisation de compte aux limites de limits.
version: '1.0'
---
## Présentation
Google Cloud Compute Engine fournit des machines virtuelles qui s'exécutent dans les centres de données innovants et sur le réseau de fibre optique mondial de Google.

Recueillez des métriques de Google Compute Engine pour :

* Visualiser les performances de vos machines virtuelles Compute Engine
* Corréler les performances de vos machines virtuelles Compute Engine avec vos applications

## Implémentation
### Collecte de métriques
#### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google Compute Engine sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Compute Engine depuis Stackdriver vers le Pub/Sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs de Google Compute Engine.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.

    {{< img src="integrations/google_compute_engine/export_gce_instance.png" alt="Exportation des logs Google Compute Engine vers Pub Sub" responsive="true">}}

4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

### Configuration
#### Limiter la collecte de hosts

Si vous souhaitez surveiller un sous-ensemble de vos instances GCE avec Datadog, appliquez un tag GCE tel que `datadog:true` aux instances GCE concernées. Indiquez ensuite ce tag dans la zone de texte **Optionally limit metrics collection** de votre [carré d'intégration Datadog/GCP][4]. Pour en savoir plus sur le filtrage des machines virtuelles par tag, consultez la [documentation principale de Google Cloud Platform][5].

#### Désactivation automatique pour GCE

Datadog peut désactiver de façon proactive des monitors dans le cadre d'un arrêt manuel d'instances Google Compute Engine (GCE) et d'une résiliation d'instance déclenchée par la mise à l'échelle automatique de GCE en fonction des statuts des hosts de l'API GCE. Les instances GCE automatiquement désactivées sont énumérées sur la page [Monitor Downtime][6] lorsque vous cochez l'option **Show automatically muted hosts**.

Pour désactiver les monitors en cas d'arrêt planifié d'une instance GCE, cochez la case **GCE automuting** dans le [carré d'intégration Google Cloud Platform][1].

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="Désactivation automatique GCE" responsive="true">}}

## Données collectées
### Métriques
{{< get-metrics-from-git "google_compute_engine" >}}


### Événements
L'intégration Google Cloud Compute n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Compute n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

* [Surveiller des métriques Google Compute Engine][9]
* [Comment recueillir des métriques Google Compute Engine][10]
* [Comment surveiller Google Compute Engine avec Datadog][11]


[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[5]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#configuration
[6]: https://app.datadoghq.com/monitors#downtime
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[10]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[11]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog


{{< get-dependencies >}}