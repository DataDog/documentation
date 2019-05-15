---
categories:
  - cloud
  - google cloud
ddtype: crawler
dependencies: []
description: 'Surveillez les temps d''exécution de fonctions min, max et moyenne.'
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_functions/'
git_integration_title: google_cloud_functions
has_logo: true
integration_title: Google Cloud Functions
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_functions
public_title: Intégration Datadog/Google Cloud Functions
short_description: 'Surveillez les temps d''exécution de fonctions min, max et moyenne.'
version: '1.0'
---
## Présentation
Google Cloud Functions est une solution de calcul asynchrone, légère et basée sur des événements qui vous permet de créer de petites fonctions à usage unique.

Recueillez des métriques de Google Functions pour :

* Visualiser les performances de vos fonctions
* Corréler les performances de vos fonctions avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_functions" >}}


### Événements
L'intégration Google Cloud Functions n'inclut aucun événement.

### Checks de service
L'intégration Google Cloud Functions n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}