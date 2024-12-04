---
app_id: apptrail
app_uuid: 302b6db7-d1d6-445c-ae20-00743775cb6b
assets: {}
author:
  homepage: https://apptrail.com
  name: Apptrail
  sales_email: sales@apptrail.com
  support_email: support@apptrail.com
categories:
- log collection
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apptrail/README.md
display_on_public_website: true
draft: false
git_integration_title: apptrail
integration_id: apptrail
integration_title: Apptrail
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apptrail
public_title: Apptrail
short_description: Surveiller et analyser tous vos logs d'audit SaaS et générer des
  alertes avec Apptrail
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveiller et analyser tous vos logs d'audit SaaS et générer des alertes
    avec Apptrail
  media:
  - caption: Apptrail héberge un portail regroupant des logs d'audit pour les fournisseurs
      de SaaS. Les utilisateurs peuvent ainsi consulter, rechercher, configurer et
      exporter leurs logs d'audit.
    image_url: images/1-at-portal.png
    media_type: image
  - caption: Consultez tout l'historique des événements d'audit depuis le portail
      Apptrail. Recherchez et filtrez les données en fonction de paramètres temporels
      et de propriétés d'événement.
    image_url: images/2-at-events-history.png
    media_type: image
  - caption: Les événements d'audit Apptrail comportent des informations détaillées
      sur tous les différents aspects des activités enregistrées (utilisateur, emplacement,
      durée, etc.), ainsi que des informations contextuelles comme des adresses IP
      et des données d'événement personnalisées.
    image_url: images/3-at-log-detail.png
    media_type: image
  - caption: Créez des trails pour transmettre en continu et en temps réel des logs
      d'audit à des dizaines de destinations, par exemple à Datadog, afin d'archiver,
      de surveiller et d'analyser vos données.
    image_url: images/4-at-create-trail-sel.png
    media_type: image
  - caption: Les règles de trail vous permettent de filtrer et de sélectionner un
      sous-ensemble d'événements fournis par un trail.
    image_url: images/5-at-trail-detail.png
    media_type: image
  - caption: Les logs d'audit Apptrail sont exportés en continu et en temps réel vers
      Datadog. Vous pouvez donc les analyser, interroger et les surveiller depuis
      la plateforme Datadog.
    image_url: images/6-datadog-preview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Apptrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

[Apptrail][1] est une plateforme exhaustive proposant des logs d'audit pour les SaaS. Les fournisseurs de SaaS font appel à Apptrail pour intégrer à leur produit des logs d'audit avancés destinés aux utilisateurs. Ces derniers peuvent consulter, interroger, analyser et exporter des logs d'audit depuis leur SaaS grâce à Apptrail.

La fonctionnalité de flux d'événements d'audit d'Apptrail (les [_trails_][2]) vous permet de transmettre des logs d'audit à des dizaines de destinations.

Grâce à l'intégration Datadog/Apptrail, vous pouvez exporter en continu et en temps réel vos logs d'audit SaaS depuis Apptrail vers Datadog. Vous pouvez analyser, archiver et surveiller vos logs d'audit SaaS sur la plateforme Datadog, et générer des alertes à ce sujet.

## Formule et utilisation

Pour utiliser cette intégration, votre fournisseur de SaaS doit avoir activé la fonctionnalité Apptrail pour votre compte.

Pour commencer, créez un trail d'envoi sur le portail Apptrail et choisissez la destination configurée Datadog.

### Étapes

Consultez la section [Créer un trail][3] (en anglais) pour obtenir des informations sur la création de trails.

1. Accédez à la page [**Trails**][4] sur le portail Apptrail.
2. Cliquez sur le bouton **Create a new trail** en haut à droite.
3. Attribuez un **nom** à votre trail et configurez des **règles** si nécessaire.
4. Passez à l'étape suivante et sélectionnez **Datadog** parmi la liste de destinations.
5. Indiquez [le **site** ou la **région** Datadog][5] à utiliser, par exemple `EU` pour app.datadoghq.eu ou `US1` pour app.datadoghq.com.
6. Saisissez votre [clé d'API Datadog][6].
7. Cliquez sur **Create trail** pour créer le trail.

### Validation

Pour visualiser vos logs d'audit Apptrail dans Datadog, procédez comme suit :

1. Accédez à **Logs** > **Live Tail**.
2. Saisissez `source:apptrail` pour visualiser vos logs d'audit Apptrail

Pour en savoir plus, consultez la [documentation Apptrail sur l'envoi de logs à Datadog][7] (en anglais).

## Real User Monitoring

### APM

Les [trails][2] Apptrail avec une destination Datadog envoient en continu à Datadog tous les logs qui répondent aux [règles de trail][8] configurées. Pour vous familiariser avec le format des logs d'audit Apptrail, consultez la section [Format des événements][9] (en anglais).

## Agent

Besoin d'aide ? Contactez l'[assistance Datadog][10] ou l'[assistance Apptrail][11].

## Pour aller plus loin

- [Documentation Apptrail dédiée aux utilisateurs][12]
- [Documentation Apptrail sur l'envoi de logs à Datadog][7]
- [Format des logs d'audit Apptrail][9]
- [Trails pour l'envoi d'événements Apptrail][2]

[1]: https://apptrail.com
[2]: https://apptrail.com/docs/consumers/guide/event-delivery/#trails
[3]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#creating-a-trail
[4]: https://portal.apptrail.com/trails
[5]: https://docs.datadoghq.com/fr/getting_started/site/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://apptrail.com/docs/consumers/guide/event-delivery/integrations/datadog
[8]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#selecting-events-using-trail-rules
[9]: https://apptrail.com/docs/consumers/guide/event-format
[10]: https://docs.datadoghq.com/fr/help/
[11]: mailto:support@apptrail.com
[12]: https://apptrail.com/docs/consumers/guide