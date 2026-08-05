---
app_id: pingdom
app_uuid: bde11e46-65f6-4cee-b011-f0944c5fb5bb
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8
    source_type_name: API héritée Pingdom (V2.1)
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- monitors
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_legacy
integration_id: pingdom
integration_title: API héritée Pingdom (V2.1)
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pingdom_legacy
public_title: API héritée Pingdom (V2.1)
short_description: Gérez et migrez des configurations existantes d'endpoints de surveillance
  Pingdom obsolètes.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::Integration
  - Category::Metrics
  configuration: README.md#Setup
  description: Gérez et migrez des configurations existantes d'endpoints de surveillance
    Pingdom obsolètes.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: API héritée Pingdom (V2.1)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Section Overview

<div class='alert alert-danger'>
Cette intégration est obsolète et l'API sur laquelle elle repose peut ne plus être prise en charge à tout moment. Utilisez plutôt l'<a href="https://docs.datadoghq.com/integrations/pingdom_v3/" class="alert-link">intégration Datadog Pingdom V3</a>.
</div>

Surveillez les métriques de performance axées sur l'utilisateur de Pingdom dans Datadog, afin de les corréler avec d'autres événements et métriques pertinents.

Datadog surveille la métrique `response_time` pour tous les sites que vous configurez sur le site Web de Pingdom.

Les événements de Pingdom peuvent être ajoutés en configurant le [monitor de statut d'intégration][1] adéquat.

<div class="alert alert-info">
Les métriques peuvent uniquement être importées pour les clients Pingdom de niveau Starter ou supérieur.
</div>

## Configuration

### Installation

1. Ouvrez le carré d'intégration Pingdom.
2. Saisissez le nom d'utilisateur et le mot de passe de votre compte Pingdom. Si vous possédez un compte d'équipe, vous pouvez utiliser vos propres identifiants et spécifier le compte à partir duquel vous souhaitez effectuer des vérifications.
3. Vous pouvez ignorer certains checks en les décochant ou en ajoutant des tags aux événements qui seront générés.

## Données collectées

### Métriques
{{< get-metrics-from-git "pingdom_legacy" >}}


### Événements

L'intégration Pingdom n'inclut aucun événement.

### Checks de service

L'intégration Pingdom récupère les checks de transaction et les signale en tant que checks de service.

Pour le check `pingdom.status`, le tableau suivant présente les corrélations entre les checks de transaction Pingdom et les checks de service Datadog.

| Statut Datadog | Statut Pingdom      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## Dépannage

### Erreur lors de la mise à jour du nom d'utilisateur ou du mot de passe

Vous avez peut-être déjà rencontré l'erreur suivante lors de l'enregistrement de vos identifiants Pingdom :

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Ajoutez l'adresse e-mail du propriétaire de votre compte Pingdom dans le champ **(Optional) Account to query**, puis enregistrez-la.

[1]: https://app.datadoghq.com/monitors/create/integration
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom/pingdom_metadata.csv