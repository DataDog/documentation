---
categories:
- Collaboration
- issue tracking
ddtype: crawler
dependencies: []
description: Observez et discutez des cas nouveaux, ouverts, en attente et résolus
  dans votre flux d'événements.
doc_link: https://docs.datadoghq.com/integrations/desk/
draft: false
git_integration_title: desk
has_logo: true
integration_id: desk
integration_title: Desk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: desk
public_title: Intégration Datadog/Desk
short_description: Observez et discutez des cas nouveaux, ouverts, en attente et résolus
  dans votre flux d'événements.
team: web-integrations
version: '1.0'
---

## Présentation

Associez Desk à Datadog pour :

- Recevoir de nouveaux événements de cas dans le flux d'événements
- Visualiser les statistiques de cas par utilisateur et statut
- Visualiser les tendances des tickets d'incident en les comparant aux problèmes DevOps

## Configuration

### Procédure à suivre

Depuis votre compte Desk, ajoutez une application d'API en accédant à Settings -> API -> My Applications (privilèges administrateur potentiellement requis).
Remplissez le formulaire comme indiqué, en laissant les deux derniers champs d'URL vides. Desk génère alors une clé d'application, un secret d'application, un token d'accès à l'API et un secret de token d'accès à l'API.

{{< img src="integrations/desk/desk_config.png" alt="configuration desk" popup="true">}}

Depuis votre compte Datadog, saisissez ensuite ces informations dans le [carré Desk][1], ainsi que le nom de domaine Desk unique de votre organisation. Il ne vous reste plus qu'à cliquer sur le bouton Install.

Une fois l'intégration installée, vous pouvez sélectionnez des métriques `desk.*` dans un dashboard personnalisé ou les consulter depuis le [dashboard Desk][2] fourni. Pour en savoir plus, consultez l'article de blog [Tenez vos équipes d'assistance informées grâce à l'intégration Salesforce Desk][3] (en anglais).

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