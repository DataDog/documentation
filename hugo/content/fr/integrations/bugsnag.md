---
categories:
- notifications
dependencies: []
description: Surveillez de manière centralisée les taux d'erreur au sein de vos applications.
doc_link: https://docs.datadoghq.com/integrations/bugsnag/
draft: false
git_integration_title: bugsnag
has_logo: true
integration_id: bugsnag
integration_title: Bugsnag
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: bugsnag
public_title: Intégration Datadog/Bugsnag
short_description: Surveillez de manière centralisée l'évolution des taux d'erreur
  au sein de vos applications.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Bugsnag fournit aux équipes logicielles une plateforme de détection automatisée des crashs pour leurs applications Web et mobiles. Bugsnag enregistre automatiquement les erreurs en temps réel et envoie des alertes à leur sujet. Intégrez Bugsnag à Datadog pour recevoir des notifications d'erreur dans votre flux d'événements Datadog.

Utilisez cette intégration pour :

- Recevoir un résumé des erreurs dans votre flux d'événements Datadog
- Être informé des pics de taux d'erreur pour un projet
- Filtrer les notifications selon leur gravité et leur statut de lancement

## Formule et utilisation

### Liste des infrastructures

Aucune installation n'est requise.

### Dépannage de la solution Browser

Pour intégrer Bugsnag à Datadog :

1. Dans [Bugsnag][1], accédez à la section **Settings** du projet que vous souhaitez configurer pour envoyer des notifications à Datadog.
2. Sélectionnez **Team Notifications**, puis **Datadog**.
3. Choisissez les notifications qui s'afficheront dans Datadog en sélectionnant les déclencheurs de notification d'erreur.
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_notification_réglage" popup="true">}}

4. Appliquez des filtres personnalisés à vos déclencheurs de notification pour afficher uniquement les erreurs associées à une certaine phase de lancement ou présentant un certain niveau de gravité.
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_filtres_réglage" popup="true">}}

5. Saisissez votre clé d'API Datadog.
6. Sélectionnez **Test Notification** pour tester la configuration. Un test d'erreur Bugsnag s'affichera alors dans Datadog.
7. Enregistrez vos réglages.
8. Ajoutez plusieurs flux d'un même projet pour visualiser les événements d'erreur en fonction d'un autre ensemble de critères de notification.

## Real User Monitoring

### Analyse d'entonnoirs

L'intégration Bugsnag n'inclut aucune métrique.

### Aide

L'intégration Bugsnag envoie les erreurs et les alertes Bugsnag configurées dans votre flux d'événements Datadog.

### Aide

L'intégration Bugsnag n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/fr/help/