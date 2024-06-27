---
categories:
- cloud
- notification
dependencies: []
description: L'intégration Segment permet de recueillir des métriques de diffusion
  d'événements pour les destinations de votre espace de travail.
doc_link: https://docs.datadoghq.com/integrations/segment/
draft: false
git_integration_title: segment
has_logo: true
integration_id: ''
integration_title: Segment
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: segment
public_title: Intégration Datadog/Segment
short_description: Recueille les métriques de diffusion d'événements de Segment.
team: web-integrations
version: '1.0'
---

## Présentation

Associez Segment pour :

- Visualiser des métriques de diffusion d'événements pour les destinations en mode cloud.
- Analyser des données (comme la répartition des métriques par espace de travail ou par destination) à l'aide du système de tags de Datadog.

**Remarque** : ces métriques ont été conçues pour diffuser des événements à des destinations comme Snowflake ou Amplitude. Elles ne servent pas à diffuser des événements depuis des applications instrumentées vers Segment.

## Implémentation

### Installation

Accédez au [carré d'intégration][1] et accordez à Datadog un accès `workspace:read` à un espace de travail en cliquant sur le lien `Add WorkSpace` pour lancer un processus d'authentification via Oauth2.
L'utilisateur Segment qui accorde à Datadog un accès à cet espace de travail doit avoir le rôle `workspace owner`.

## Données collectées

### Métriques
{{< get-metrics-from-git "segment" >}}


### Événements

L'intégration Segment n'inclut aucun événement.

### Checks de service

L'intégration Segment n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/