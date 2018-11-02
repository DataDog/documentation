---
categories:
- Collaboration
- issue tracking
ddtype: crawler
dependencies: []
description: Consulter et discuter des cas nouveaux, ouverts, en attente et résolus dans votre flux d'événements.
  stream.
doc_link: https://docs.datadoghq.com/integrations/desk/
git_integration_title: desk
has_logo: true
integration_title: Desk
is_public: true
kind: integration
manifest_version: '1.0'
name: desk
public_title: Intégration Datadog-Desk
short_description: Consulter et discuter des cas nouveaux, ouverts, en attente et résolus dans votre flux d'événements.
  event stream.
version: '1.0'
---

## Présentation

Connecter Desk à Datadog pour:

  * Recevoir de nouveaux événements de cas dans le flux d'événements
  * Visualiser les statistiques de cas par utilisateur et état
  * Visualiser les tendances des tickets d'incident à côté des problèmes DevOps

## Implémentation
### Configuration

Depuis votre compte Desk, ajoutez une application API sur la page Settings -> API -> My Applications (vous avez besoin de privilèges d'administrateur).
Remplissez le formulaire comme indiqué, en laissant les deux derniers champs URL vides. Desk devrait ensuite générer une clé d'application, un secret d'application, un jeton d'accès à l'API et un secret de jeton d'accès à l'API.

{{< img src="integrations/desk/desk_config.png" alt="desk config" responsive="true" popup="true">}}

Ensuite, depuis votre compte Datadog, inscrivez les informations correspondantes dans le [carreau Desk][1]. Vous devrez entrer également le nom de domaine Desk unique de votre société.
Appuyez sur le bouton d'installation, puis vous êtes prêt ! Vous pourrez bientôt sélectionner des statistiques desk.* dans un tableau de bord personnalisé, ou les afficher dans la [tableau de bord Desk][2] fourni. (Vous pouvez lire davantage dans [notre blog](https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration/).)

## Données collectées
### Métriques
{{< get-metrics-from-git "desk" >}}


### Événements
L'intégration Desk n'inclut aucun événements pour le moment.

### Checks de service
L'intégration Desk n'inclut aucun check de service pour le moment.

## Dépannage
Besoin d'aide ? Contactez  [l'équipe support de Datadog][4].

[1]: https://app.datadoghq.com/account/settings#integrations/desk
[2]: https://app.datadoghq.com/screen/integration/desk
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[4]: https://docs.datadoghq.com/help/


{{< get-dependencies >}}
