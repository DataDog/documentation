---
categories:
  - cloud
  - google cloud
  - web
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez l'utilisation du réseau et de l'entrepôt de données attribuable à vos services Firebase.
doc_link: 'https://docs.datadoghq.com/integrations/google_cloud_firebase/'
draft: false
git_integration_title: google_cloud_firebase
has_logo: true
integration_title: Google Cloud Firebase
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_firebase
public_title: "Intégration Datadog/Google\_Cloud\_Firebase"
short_description: Surveillez l'utilisation du réseau et de l'entrepôt de données attribuable à vos services Firebase.
version: '1.0'
---
## Présentation

Firebase est une plateforme mobile qui vous aide à développer rapidement des applications de qualité supérieure, à étendre votre nombre d'utilisateurs et à accroître vos revenus.

Recueillez des métriques de Google Firebase pour :

- Visualiser les performances de vos bases de données Firebase et de vos services hébergés
- Corréler les performances de vos outils Firebase avec vos applications

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Google Cloud Platform][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de logs

Les logs Google FireBase sont recueillis avec Stackdriver et envoyés à un Cloud Pub/Sub via un redirecteur Push HTTP. Si vous ne l'avez pas déjà fait, configurez le [Cloud Pub/Sub à l'aide d'un redirecteur Push HTTP][2].

Une fois cette opération effectuée, exportez vos logs Google Firebase depuis Stackdriver vers le Pub/sub :

1. Accédez à la [page Stackdriver][3] et filtrez les logs Google Firebase.
2. Cliquez sur **Create Export** et nommez le récepteur.
3. Choisissez Cloud Pub/Sub comme destination et sélectionnez le Pub/Sub créé à cette fin. **Remarque** : le Pub/Sub peut se situer dans un autre projet.
4. Cliquez sur **Create** et attendez que le message de confirmation s'affiche.

## Données collectées

### Métriques
{{< get-metrics-from-git "google_cloud_firebase" >}}


### Événements

L'intégration Google Firebase n'inclut aucun événement.

### Checks de service

L'intégration Google Firebase n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/fr/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/