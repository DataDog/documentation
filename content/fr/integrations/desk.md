---
categories:
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: 'Observez et discutez des cas nouveaux, ouverts, en attente et résolus dans votre flux d''événements.'
doc_link: 'https://docs.datadoghq.com/integrations/desk/'
draft: false
git_integration_title: desk
has_logo: true
integration_title: Desk
is_public: true
kind: integration
manifest_version: '1.0'
name: desk
public_title: Intégration Datadog/Desk
short_description: 'Observez et discutez des cas nouveaux, ouverts, en attente et résolus dans votre flux d''événements.'
version: '1.0'
---
## Présentation

Associez Desk à Datadog pour :

- Recevoir de nouveaux événements de cas dans le flux d'événements
- Visualiser les statistiques de cas par utilisateur et statut
- Visualiser les tendances des tickets d'incident en les comparant aux problèmes DevOps

## Configuration

### Configuration

Depuis votre compte Desk, ajoutez une application d'API en accédant à Settings -> API -> My Applications (privilèges d'administrateur requis).
Remplissez le formulaire comme indiqué, en laissant les deux derniers champs d'URL vides. Desk génère alors une clé d'application, un secret d'application, un token d'accès à l'API et un secret de token d'accès à l'API.

{{< img src="integrations/desk/desk_config.png" alt="configuration desk" popup="true">}}

Depuis votre compte Datadog, saisissez ensuite les informations correspondantes dans le [carré Desk][1]. Vous devrez également saisir le nom de domaine Desk unique de votre entreprise.
Cliquez sur le bouton Install pour terminer le processus. Vous pourrez bientôt sélectionner des métriques desk.\* dans un dashboard personnalisé ou les visualiser dans le [dashboard Desk][2] fourni. Pour en savoir plus sur cette intégration, consultez [notre blog][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "desk" >}}


### Événements

L'intégration Desk n'inclut aucun événement.

### Checks de service

L'intégration Desk n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#integrations/desk
[2]: https://app.datadoghq.com/screen/integration/desk
[3]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/