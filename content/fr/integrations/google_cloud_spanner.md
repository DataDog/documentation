---
categories:
  - cloud
  - data store
  - google cloud
ddtype: crawler
dependencies: []
description: Surveillez l'utilisation des ressources de vos instances Spanner.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_spanner/'
git_integration_title: google_cloud_spanner
has_logo: true
integration_title: "Google\_Spanner"
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_spanner
public_title: "Intégration Datadog/Google\_Spanner"
short_description: Surveillez l'utilisation des ressources de vos instances Spanner.
version: '1.0'
---
## Présentation
Google Cloud Spanner est le seul service de base de données relationnelle à disposer d'une cohérence forte et d'une évolutivité horizontale.

Recueillez des métriques de Google Spanner pour :

* Visualiser les performances de vos bases de données Spanner
* Corréler les performances de vos bases de données Spanner avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_spanner" >}}


### Événements
L'intégration Google Cloud Spanner n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Spanner n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}