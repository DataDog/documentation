---
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: "Collaborez, partagez et suivez les performances de votre environnement avec des groupes Office\_365 et Datadog."
doc_link: 'https://docs.datadoghq.com/integrations/office_365_groups/'
draft: true
git_integration_title: office_365_groups
has_logo: true
integration_title: "Groupes Office\_365"
is_public: false
custom_kind: integration
manifest_version: '1.0'
name: office_365_groups
public_title: "Intégration Datadog/Groupes Office\_365"
short_description: "Collaborez, partagez et suivez les performances de votre environnement avec des groupes Office\_365 et Datadog."
version: '1.0'
---
## Présentation

L'intégration Groupes Office 365 vous permet d'accéder aux événements, aux annotations de graphiques et aux notifications de surveillance Datadog directement depuis les groupes Office 365.
Vous pourrez ainsi tenir votre équipe informée des problèmes de performance, partager des graphiques et envoyer des alertes ou des événements aux groupes Office 365 de votre choix. Le connecteur vous offre un moyen de tenir automatiquement toute votre équipe informée : il suffit de [mentionner le nom du canal de l'équipe dans le flux Datadog][1] pour relayer des informations aux personnes concernées. Annotez un graphique dans un dashboard en mentionnant une équipe pour partager un snapshot avec ses membres.

## Implémentation

### Configuration

Pour activer l'intégration Datadog/Groupes Office 365 :

1. Autorisez Datadog à se connecter à Office 365 via l'[intégration Datadog/Office 365][2].
2. Spécifiez les noms et les [URL des webhooks][3] des groupes vers lesquels vous souhaitez que les informations de Datadog soient envoyées.

## Données collectées

### Métriques

L'intégration Groupes Office 365 n'inclut aucune métrique.

### Événements

L'intégration Groupes Office 365 n'inclut aucun événement.

### Checks de service

L'intégration Groupes Office 365 n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[2]: https://app.datadoghq.com/account/settings#integrations/office_365_groups
[3]: https://docs.microsoft.com/en-us/outlook/actionable-messages/send-via-connectors#get-a-connector-webhook-url-for-your-inbox
[4]: https://docs.datadoghq.com/fr/help/