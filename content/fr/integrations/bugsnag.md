---
categories:
  - exceptions
  - notification
ddtype: crawler
dependencies: []
description: Surveillez de manière centralisée l'évolution des taux d'erreur au sein de l'ensemble de vos applications
doc_link: 'https://docs.datadoghq.com/integrations/bugsnag/'
draft: false
git_integration_title: bugsnag
has_logo: true
integration_title: Bugsnag
is_public: true
kind: integration
manifest_version: '1.0'
name: bugsnag
public_title: Intégration Datadog/Bugsnag
short_description: Surveillez de manière centralisée l'évolution des taux d'erreur au sein de l'ensemble de vos applications
version: '1.0'
---
## Présentation

Bugsnag fournit aux équipes logicielles une plateforme de détection automatisée des crashs pour leurs applications Web et mobiles. Bugsnag enregistre automatiquement les erreurs en temps réel et envoie des alertes à leur sujet. En intégrant Bugsnag à Datadog, vous recevrez des notifications d'erreur dans votre flux d'événements Datadog.

Utilisez cette intégration pour :

- Recevoir un résumé des erreurs dans votre flux d'événements Datadog
- Être informé des pics de taux d'erreur pour un projet
- Filtrer les notifications selon leur gravité et leur statut de lancement

## Configuration

### Installation

Aucune installation n'est requise.

### Configuration

Pour intégrer Bugsnag à Datadog :

1. Dans [Bugsnag][1], accédez à la section **Settings** du projet que vous souhaitez configurer pour envoyer des notifications à Datadog.
2. Sélectionnez **Team Notifications**, puis **Datadog**.
3. Choisissez les notifications qui s'afficheront dans Datadog en sélectionnant les déclencheurs de notification d'erreur.
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_notification_réglage" popup="true">}}

4. Appliquez des filtres personnalisés à vos déclencheurs de notification pour afficher les erreurs dotées d'un certain statut de lancement ou d'une certaine gravité.
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_filtres_réglage" popup="true">}}

5. Saisissez votre clé d'API Datadog.
6. Sélectionnez **Test Notification** pour tester la configuration. Cela affiche un test d'erreur Bugsnag dans votre application Datadog.
7. Enregistrez vos réglages.
8. Ajoutez plusieurs flux d'un même projet pour visualiser les événements d'erreur en fonction d'un autre ensemble de critères de notification.

## Données collectées

### Métriques

L'intégration Bugsnag n'inclut aucune métrique.

### Événements

L'intégration Bugsnag envoie les erreurs et les alertes Bugsnag configurées à votre flux d'événements Datadog.

### Checks de service

L'intégration Bugsnag n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/fr/help/