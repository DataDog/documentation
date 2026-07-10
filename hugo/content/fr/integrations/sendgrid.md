---
app_id: sendgrid
app_uuid: 828968b6-254c-4c82-8736-998004d6e607
assets:
  dashboards:
    Sendgrid-Overview: assets/dashboards/Sendgrid-Overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: sendgrid.emails.requests
      metadata_path: metadata.csv
      prefix: sendgrid.emails.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: SendGrid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- metrics
- log collection
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sendgrid
integration_id: sendgrid
integration_title: SendGrid
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sendgrid
public_title: SendGrid
short_description: Recueillez des métriques SendGrid.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Web
  - Category::Metrics
  - Category::Log Collection
  configuration: README.md#Setup
  description: Recueillez des métriques SendGrid.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SendGrid
---

## Présentation

Recueillez des métriques et des logs SendGrid relatifs à l'envoi et à l'engagement de vos e-mails.

## Configuration

### Générer une clé d'API SendGrid

1. Connectez-vous à votre [compte SendGrid][1].
2. Ouvrez le menu déroulant **Settings**.
3. Cliquez sur **API Keys**.
4. Cliquez sur **Create API Key** en haut à droite.
5. Indiquez dans le champ _API Key Name_ le nom de la clé d'API. Sélectionnez **Full Access** ou, pour restreindre l'accès, **Stats** - **Read Access** et **User Account** - **Read Access**.
6. Enregistrez la clé d'API dans un emplacement sécurisé. Vous aurez besoin de la clé d'API pour configurer l'intégration SendGrid dans l'interface Datadog.

### Configuration

#### Envoyer des métriques

1. Accédez à l'onglet Configuration dans le [carré d'intégration SendGrid][2] de Datadog.
2. Saisissez un nom unique permettant d'identifier le compte SendGrid dans Datadog.
3. Collez la clé d'API générée lors des étapes précédentes.
4. Vous avez la possibilité d'ajouter des tags personnalisés afin de les associer à toutes les métriques recueillies par cette intégration.

#### Envoyer des logs

1. Copiez l'URL générée dans le [carré de l'intégration SendGrid][2] Datadog.
2. Accédez à votre [compte SendGrid][1].
3. Ouvrez le menu déroulant **Settings**.
4. Cliquez sur **Mail Settings**.
5. Cliquez sur **Edit** en regard du paramètre **Event Webhook**.
6. Collez l'URL générée lors de l'étape 1 dans le champ **HTTP Post URL**.
7. Vérifiez que **Authorization Method** est défini sur _None_.
8. Sélectionnez les événements d'envoi et d'engagement que vous souhaitez recevoir.
9. Activez l'option **Event Webhook Status**.
10. Cliquez sur **Save**.

## Données collectées

### Métriques
{{< get-metrics-from-git "sendgrid" >}}


### Logs

Les événements SendGrid relatifs à l'envoi et à l'engagement s'affichent sous la forme de logs provenant de la source `sendgrid`.

### Événements

L'intégration SendGrid n'inclut aucun événement.

### Checks de service

L'intégration SendGrid n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.sendgrid.com/
[2]: https://app.datadoghq.com/account/settings#integrations/sendgrid
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/sendgrid/metadata.csv
[4]: https://docs.datadoghq.com/fr/help