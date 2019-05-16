---
categories:
  - cloud
  - google cloud
  - web
ddtype: crawler
dependencies: []
description: Surveillez l'utilisation du réseau et de l'entrepôt de données attribuable à vos services Firebase.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_firebase/'
git_integration_title: google_cloud_firebase
has_logo: true
integration_title: Google Cloud Firebase
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_firebase
public_title: Intégration Datadog/Google Cloud Firebase
short_description: Surveillez l'utilisation du réseau et de l'entrepôt de données attribuable à vos services Firebase. services.
version: '1.0'
---
## Présentation
Firebase est une plateforme mobile qui vous aide à développer rapidement des applications de qualité supérieure, à étendre votre nombre d'utilisateurs et à accroître vos revenus.

Recueillez des métriques de Google Firebase pour :

* Visualiser les performances de vos bases de données Firebase et de vos services hébergés
* Corréler les performances de vos outils Firebase avec vos applications

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

## Données collectées
### Métriques
{{< get-metrics-from-git "google_cloud_firebase" >}}


### Événements
L'intégration Google Firebase n'inclut aucun événement.

### Checks de service
L'intégration Google Firebase n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}