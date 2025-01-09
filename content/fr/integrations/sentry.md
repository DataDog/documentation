---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: Visualisez des exceptions Sentry dans votre flux d'événements Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Visualisez des exceptions Sentry dans votre flux d'événements Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Sentry
---

## Présentation

Associez Sentry à Datadog pour :

- Visualiser des exceptions en temps réel dans le flux d'événements
- Rechercher des exceptions sur vos graphiques
- Discuter des exceptions avec votre équipe

## Implémentation

### Installation

Implémentation de l'intégration Sentry :

1. Connectez-vous à Sentry.
2. Accédez à **Settings > Projects** et sélectionnez le projet pertinent.
3. À gauche de la page, sélectionnez **Legacy Integrations**.
4. Faites défiler la page vers le bas jusqu'à l'**intégration Webhooks**, cliquez sur le bouton coulissant pour l'activer, puis cliquez sur **Configure Plugin**.
5. Sous **Callback URLs**, saisissez l'URL de rappel copiée à partir du carré de l'intégration.
6. Cliquez sur **Save changes**.
7. Activez l'intégration si nécessaire en cliquant sur **Enable Plugin**.

Par défaut, Sentry ping le Webhook avec les données d'événement chaque fois qu'une nouvelle exception se produit (contrairement à une nouvelle instance d'une exception déjà loguée). Si vous souhaitez utiliser des déclencheurs différents (ou supplémentaires), vous pouvez les configurer dans la section Alerts des paramètres de votre projet.

### Ajouter un hostname aux erreurs (facultatif)

Il arrive parfois que le nom de serveur envoyé par Sentry ne corresponde pas au hostname reconnu par Datadog. Pour résoudre ce problème, définissez une valeur personnalisée pour le tag `server_name` associé à chaque événement.

Pour utiliser un hostname différent tout en conservant la valeur `server_name` par défaut de Sentry, définissez un tag `hostname` sur vos événements. Pour en savoir plus, consultez la section [Personnalisation des tags][1] de la documentation Sentry (en anglais) pour votre langage.

## Dépannage

### Erreurs Sentry manquantes dans Datadog

Si vos erreurs Sentry ne s'affichent pas dans Datadog, il est probable que votre webhook Sentry ne se déclenche pas. Cela peut se produire pour différentes raisons :

**Les alertes sont uniquement envoyées lorsqu'une règle est déclenchée** :<br>
Par exemple, si la condition de règle est « lorsqu'un événement se produit pour la première fois », aucune alerte ne se déclenche tant qu'un nouveau problème n'a pas été créé. L'envoi d'une alerte peut donc prendre un certain temps, en fonction du nombre de problèmes uniques que votre projet reçoit.

**L'intégration de notification est désactivée** :<br>
Assurez-vous que l'intégration de notification est bien activée dans les actions de règle, soit en tant que service spécifique, soit dans la section « All enabled services ».

[1]: https://docs.sentry.io/platforms/java/enriching-events/tags/