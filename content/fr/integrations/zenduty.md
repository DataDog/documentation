---
app_id: zenduty
app_uuid: 0f2dea25-5757-477c-ad92-d459133d8b05
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: zenduty.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Zenduty
author:
  homepage: https://www.zenduty.com
  name: Zenduty
  sales_email: vishwa@zenduty.com
  support_email: shubham@zenduty.com
categories:
- alerting
- collaboration
- incidents
- issue tracking
- notification
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zenduty/README.md
display_on_public_website: true
draft: false
git_integration_title: zenduty
integration_id: zenduty
integration_title: Zenduty
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: zenduty
public_title: Zenduty
short_description: Utilisez Zenduty comme partenaire de notification et de résolution
  d'incidents pour les alertes Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notification
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Utilisez Zenduty comme partenaire de notification et de résolution
    d'incidents pour les alertes Datadog
  media:
  - caption: Un dashboard épuré, mais détaillé sur les incidents.
    image_url: images/incident_dashboard.png
    media_type: image
  - caption: Gérez tous les aspects de l'incident directement à partir de Slack ou
      de Teams
    image_url: images/slack_controls.png
    media_type: image
  - caption: Accélérez le processus de résolution des incidents par votre équipe grâce
      aux règles d'alerte personnalisées
    image_url: images/alert_rules.png
    media_type: image
  - caption: Des alertes fiables et pertinentes tout au long de votre cycle de gestion
      des incidents
    image_url: images/incident_timeline.png
    media_type: image
  - caption: Importez automatiquement vos playbooks dans vos incidents et recevez
      des instructions étape par étape jusqu'à la résolution de l'incident
    image_url: images/task_playbooks.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zenduty
---

## Présentation

Utilisez l'intégration Zenduty pour envoyer les alertes Datadog à l'équipe compétente, notifier les personnes en service, et les aider à résoudre les incidents rapidement. Envoyez les notifications par appel, SMS ou e-mail, via Slack ou Microsoft Teams, ou par le biais de messages push sur Android et iOS.

Associez Zenduty à Datadog pour :
- Déclencher et résoudre des incidents Zenduty, recevoir des alertes lors de la création d'un incident, et effectuer un suivi des problèmes à partir de Datadog.
- Déployer des horaires de service, des politiques d'escalade, des playbooks de gestion des incidents, des post-mortems et des analyses détaillées.
- Utiliser des règles d'alerte pour rediriger les alertes Datadog vers certains utilisateurs ou certaines équipes, écrire des règles de suppression et ajouter automatiquement des remarques, des personnes concernées par l'incident et des tâches liées à l'incident.

## Configuration

### Zenduty
Dans [Zenduty][1], suivez les étapes ci-dessous :

1. Accédez à **Teams**, puis cliquez sur l'équipe à laquelle vous souhaitez ajouter l'intégration.

2. Accédez à **Services**. Créez un service ou sélectionnez un service existant.

3. Accédez à **Integrations**, puis sélectionnez **Add New Integration**. Attribuez un nom à l'intégration, puis sélectionnez l'application **Datadog** dans le menu déroulant.

4. Accédez à **Configure** sous vos intégrations et copiez l'URL du webhook Datadog générée.

### Suivez les étapes indiquées ci-dessous dans Datadog :

5. Dans la barre latérale, accédez à **Integrations**. Recherchez **Webhooks** sur [cette page][2], puis cliquez sur le bouton d'ajout.

6. Faites défiler la page et cliquez sur le bouton <kbd>**+New**</kbd> dans la section Webhooks. Renseignez le nom, l'URL du webhook copiée à partir de Zenduty, puis collez le JSON suivant dans la case de la charge utile :
```json
{
  "alert_id": "$ALERT_ID",
  "hostname": "$HOSTNAME",
  "date_posix": "$DATE_POSIX",
  "aggreg_key": "$AGGREG_KEY",
  "title": "$EVENT_TITLE",
  "alert_status": "$ALERT_STATUS",
  "alert_transition": "$ALERT_TRANSITION",
  "link": "$LINK",
  "event_msg": "$TEXT_ONLY_MSG"
}
```

7. Cliquez sur **Save**. La configuration de l'intégration Zenduty pour Datadog est maintenant terminée.

Consultez la [documentation relative à Zenduty][3] pour en savoir plus sur cette intégration et découvrir comment en tirer pleinement parti.

**Remarque** : mentionnez le canal `@zenduty` sous **Notify your team** dans la configuration du monitor Datadog afin de recevoir des alertes via Zenduty lorsque des incidents Datadog sont créés ou résolus.

## Données collectées
### Métriques

L'intégration Zenduty n'inclut aucune métrique.

### Événements

Les événements déclenchés, réceptionnés et résolus sont affichés dans le dashboard de Zenduty.

### Checks de service

L'intégration Zenduty n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://www.zenduty.com
[2]: https://app.datadoghq.com/integrations/webhooks?search=webhook
[3]: https://docs.zenduty.com/docs/datadog
[4]: https://docs.datadoghq.com/fr/help/