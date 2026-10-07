---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - issue tracking
  - collaboration
  - notification
  - monitoring
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/ilert/README.md
display_name: iLert
draft: false
git_integration_title: ilert
guid: 875497b9-a27e-4099-92e9-968a70c592fa
integration_id: ilert
integration_title: iLert
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@ilert.com
manifest_version: 1.0.0
metric_prefix: ilert.
metric_to_check: ''
name: ilert
public_title: Intégration iLert
short_description: Recevez une notification en cas d'alerte Datadog et prenez des mesures à l'aide d'iLert.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration [iLert][1] permet d'envoyer les alertes Datadog à iLert et de prendre facilement des mesures depuis la plateforme iLert.

Intégrez iLert à Datadog pour :

- Déclencher et résoudre des incidents depuis Datadog
- Traiter les incidents et configurer des politiques d'escalade en temps réel
- Être informé quotidiennement des personnes en service

## Configuration

### iLert

#### Créer une source d'alerte Datadog

1. Accédez à l'onglet **Alert Sources** et cliquez sur le bouton « Create new alert source »

2. Choisissez un nom et sélectionnez une chaîne d'escalade

3. Sélectionnez **Datadog** dans le champ Integration type et enregistrez.

   ![Nouvelle source d'alerte iLert][2]

4. Sur la page suivante, une **URL de webhook** est générée. Cette URL est requise au bas de l'écran de configuration dans Datadog.

   ![Source d'alerte iLert][3]

### Datadog

#### Ajouter iLert Webhook en tant que canal d'alertes

1. Accédez à la page Intégrations de Datadog et [**installez l'intégration Webhooks**][4] :
2. Cliquez sur une intégration Webhooks, faites défiler la page et ajoutez un nouveau webhook :

   ![Nouveau webhook Datadog][5]

3. Saisissez un nom, l'**URL de webhook Datadog** à partir de la source d'alerte iLert et la **charge utile du modèle** :

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Webhook Datadog][6]

4. Cliquez sur le bouton Save
5. L'intégration est maintenant configurée !

   Consultez la [documentation officielle][7] d'iLert pour en savoir plus sur la configuration.

## Données collectées

### Métriques

L'intégration iLert n'inclut aucune métrique.

### Événements

Vos événements iLert déclenchés/résolus s'affichent sur le dashboard de votre plateforme iLert.

### Checks de service

L'intégration iLert n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://www.ilert.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png
[7]: https://docs.ilert.com/integrations/datadog
[8]: https://docs.datadoghq.com/fr/help/