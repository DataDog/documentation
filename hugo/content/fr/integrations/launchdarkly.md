---
app_id: launchdarkly
app_uuid: 7144d0c5-42f2-4cc5-b562-5f77debc0c52
assets:
  dashboards:
    launchdarkly: dashboards/launchdarkly.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: launchdarkly_relay.connections_env_platformCategory_userAgent
      metadata_path: metadata.csv
      prefix: launchdarkly_relay.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: LaunchDarkly
author:
  homepage: https://launchdarkly.com
  name: LaunchDarkly
  sales_email: sales@launchdarkly.com
  support_email: support@launchdarkly.com
categories:
- notification
classifier_tags:
- Supported OS::Linux
- Supported OS::Mac OS
- Supported OS::Windows
- Category::Notification
- Offering::UI Extension
- Offering::Integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/launchdarkly/README.md
display_on_public_website: true
draft: false
git_integration_title: launchdarkly
integration_id: launchdarkly
integration_title: LaunchDarkly
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: launchdarkly
public_title: LaunchDarkly
short_description: Contrôlez en toute confiance la publication de vos fonctionnalités
  et les changements d'infrastructure.
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Contrôlez en toute confiance la publication de vos fonctionnalités
    et les changements d'infrastructure.
  media:
  - caption: Une courte présentation de LaunchDarkly.
    image_url: images/video-thumbnail.png
    media_type: video
    vimeo_id: 637675972
  - caption: Le dashboard LaunchDarkly configuré avec le widget de flags LaunchDarkly
      et l'intégration d'événements.
    image_url: images/dashboard.png
    media_type: image
  - caption: Le dashboard LaunchDarkly avec le volet latéral relatif aux changements
      de flag.
    image_url: images/toggle-flag.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: LaunchDarkly
---



## Présentation

LaunchDarkly propose les intégrations suivantes pour la plateforme Datadog :

### Intégration d'événements

L'intégration d'événements [LaunchDarkly][1] pour Datadog vous permet d'ajouter des marqueurs d'événement (flag) à vos dashboards de surveillance. Vous pouvez ainsi visualiser l'incidence de vos déploiements de fonctionnalités LaunchDarkly sur les services ou les systèmes de votre client. Si le déploiement d'une fonctionnalité entraîne le ralentissement d'un service, vous pouvez en détecter la cause dans Datadog.

### Widget de dashboard

Le widget de dashboard de LaunchDarkly vous permet d'épingler à vos dashboards Datadog un sous-ensemble de feature flags ciblant des bascules, afin de déployer une fonctionnalité et de surveiller ce déploiement depuis une interface unique.

### Intégration de métriques de proxy de relais

Si vous utilisez le [proxy de relais LaunchDarkly][2], vous pouvez le configurer de façon à exporter dans Datadog des métriques, notamment sur les connexions actives et simultanées.

## Configuration

### Intégration d'événements

L'intégration d'événements LaunchDarkly requiert une [clé d'API Datadog][3], qui peut être créée par un administrateur Datadog. Après avoir obtenu votre clé d'API, consultez la [documentation LaunchDarkly][4] (en anglais) pour découvrir comment configurer l'intégration d'événements LaunchDarkly sur Datadog.

### Widget de dashboard

1. Dans Datadog, accédez à un dashboard existant ou créez-en un.
2. Cliquez sur le bouton **Add Widgets** pour afficher le menu des widgets.
3. Dans la section **Apps** de ce menu, recherchez **LaunchDarkly** afin d'afficher le widget LaunchDarkly.
4. Cliquez sur l'icône du widget ou faites-la glisser pour l'ajouter à votre dashboard, puis ouvrez la fenêtre de l'**éditeur LaunchDarkly**.
5. Cliquez sur le bouton **Connect** pour associer votre compte LaunchDarkly. Vous êtes invité à autoriser Datadog dans la fenêtre qui s'ouvre.
6. Cliquez sur **Authorize**. Vous êtes alors redirigé vers Datadog.
7. Configurez ensuite les options suivantes pour le widget dans l'**éditeur LaunchDarkly** :

   - **LaunchDarkly project** : le nom du projet LaunchDarkly à associer au widget de dashboard.
   - **LaunchDarkly environment** : le nom de l'environnement LaunchDarkly à associer au widget de dashboard.
   - **Environment template variable** : une [template variable Datadog][5] facultative pouvant remplacer l'option **LaunchDarkly environment**.
   - **LaunchDarkly tag filter** : une liste facultative de tags séparés par des `+` permettant de filtrer les feature flags affichés dans le widget. Si vous ajoutez plusieurs tags, seuls les flags qui correspondent à **tous** les tags inclus s'affichent dans le widget. Si vous ne définissez pas ce paramètre, le widget présente tous les feature flags du projet.
   - **Sort** : l'ordre dans lequel les flags s'affichent dans le widget. Valeur par défaut : **Newest**.

8. Vous avez également la possibilité d'attribuer un titre au widget.
9. Cliquez sur **Save** pour terminer la configuration du dashboard Datadog.

### Métriques de proxy de relais

Suivez la [documentation sur les intégrations de métriques][6] du proxy de relais (en anglais) pour configurer cette fonctionnalité.

## Données collectées

### Métriques

Vous pouvez configurer le proxy de relais LaunchDarkly de façon à envoyer les métriques suivantes à Datadog :

- **`connections`** : le nombre de connexions de flux existantes entre les SDK et le proxy de relais.
- **`newconnections`** : le nombre cumulé de connexions de flux au proxy de relais depuis son lancement.
- **`requests`** : le nombre cumulé de requêtes reçues par tous les [endpoints de service][7] du proxy de relais (à l'exception du endpoint de statut) depuis son lancement.

### Événements

L'intégration d'événements LaunchDarkly envoie des événements sur les flags, projets et environnements de LaunchDarkly à Datadog.

### Checks de service

L'intégration LaunchDarkly n'inclut aucun check de service.

## Assistance

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

En savoir plus sur [LaunchDarkly][1] et l'[intégration d'événements Datadog][4].

[1]: https://launchdarkly.com
[2]: https://docs.launchdarkly.com/home/relay-proxy
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.launchdarkly.com/integrations/datadog/events
[5]: https://docs.datadoghq.com/fr/dashboards/template_variables/
[6]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/metrics.md
[7]: https://github.com/launchdarkly/ld-relay/blob/v6/docs/endpoints.md
[8]: https://docs.datadoghq.com/fr/help/