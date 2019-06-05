---
categories:
  - cloud
  - os & system
  - google cloud
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
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.


### Configuration
#### Limiter la collecte de hosts

Si vous souhaitez surveiller un sous-ensemble de vos instances GCE avec Datadog, assignez une étiquette GCE, comme `datadog:true`, à ces instances GCE. Indiquez ensuite ce tag dans la zone de texte **Optionally limit metrics collection** de votre [carré d'intégration Datadog/GCP][2]. Pour obtenir plus d'informations sur comment filtrer les machines virtuelles par tag, consultez la [documentation principale de Google Cloud Platform][3].

#### Désactivation automatique pour GCE

Datadog peut désactiver de façon proactive des monitors dans le cadre d'un arrêt manuel d'instances Google Compute Engine (GCE) et d'une résiliation d'instance déclenchée par la mise à l'échelle automatique de GCE en fonction des statuts des hosts de l'API GCE. Les instances GCE automatiquement désactivées sont énumérées sur la page [Monitor Downtime][4] en cochant **Show automatically muted hosts**.

Pour désactiver les monitors lors des arrêts planifiés de l'instance GCE, cochez la case **GCE automuting** dans le [carré d'intégration Google Cloud Platform][1].

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="Désactivation automatique GCE" responsive="true">}}

## Données collectées
### Métriques
{{< get-metrics-from-git "google_compute_engine" >}}


### Événements
L'intégration Google Cloud Compute n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Compute n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

* [Surveiller des métriques Google Compute Engine][7]  
* [Comment recueillir des métriques Google Compute Engine][8]  
* [Comment surveiller Google Compute Engine avec Datadog][9]  


[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[3]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#configuration
[4]: https://app.datadoghq.com/monitors#downtime
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[6]: https://docs.datadoghq.com/fr/help
[7]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[8]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[9]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog


{{< get-dependencies >}}