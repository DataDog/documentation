---
app_id: rum-android
app_uuid: a70b6926-49a8-4f90-8190-315170e97e4f
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- monitoring
- network
- exceptions
- metrics
- alerting
- issue tracking
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_android/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_android
integration_id: rum-android
integration_title: Android
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: rum_android
public_title: Android
short_description: Surveiller des applications Android et générer des métriques avec
  la solution RUM Datadog
supported_os:
- android
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Android
  - Category::Monitoring
  - Category::Network
  - Category::Exceptions
  - Category::Metrics
  - Category::Alerting
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Surveiller des applications Android et générer des métriques avec la
    solution RUM Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Android
---



## Présentation

L'[intégration Android][1] Datadog vous permet de trier plus rapidement les problèmes que vous rencontrez et de consacrer davantage de temps au développement de nouvelles fonctionnalités. Vous pouvez ainsi :

- corriger les problèmes à l'origine des lenteurs et des crashs de vos applications dans les bibliothèques tierces, requêtes réseau ou fichiers multimédias volumineux ;
- améliorer la réactivité de vos applications, définir des SLI (Service Level Indicators) et résoudre des problèmes grâce aux dashboards prêts à l'emploi, métriques en temps réel et rapports de crash désobfusqués ;
- regrouper de façon intelligente les erreurs fréquentes de vos applications au sein d'un ensemble de problèmes uniques que vous pouvez gérer.

Corrélez l'incidence de l'expérience utilisateur avec vos activités grâce aux fonctionnalités suivantes :

- Analyse des données essentielles sur l'expérience utilisateur mobile, comme les interactions avec l'écran en fonction de facteurs démographiques, de la version ou de tout attribut personnalisé, afin d'atteindre plus facilement vos objectifs commerciaux
- Mise en corrélation automatique de chaque parcours utilisateur avec un calendrier d'événements de session et d'attributs, y compris l'ID, l'activité cellulaire, l'URL de référencement, etc.
- Mise en évidence des tendances liées au comportement des utilisateurs, grâce à des analyses et des cartes géographiques personnalisables

Surveillez également l'intégrité de votre application de bout en bout :

- Passez facilement des données sur l'expérience de vos utilisateurs aux traces backend, métriques runtime et logs, pour bénéficier d'un contexte exhaustif lors de la résolution de problèmes.
- Résolvez plus rapidement les crashs, en unifiant les métriques, traces et logs côté serveur et côté client.
- Unifiez la surveillance de l'ensemble de votre stack au sein d'une seule plateforme, afin d'aider vos équipes frontend et backend.

## Configuration

### Recueillir vos événements RUM

Pour commencer à recueillir des événements Real User Monitoring à partir de votre application, consultez la section [Surveillance Android et Android TV][2].

### Recueillir vos traces

Pour commencer à envoyer les traces de votre application Android à Datadog, consultez la section [Associer RUM à vos traces][3].

### Recueillir vos logs

Pour commencer à envoyer les logs de votre application Android à Datadog, consultez la section [Collecte de logs Android][4].

## Données collectées

### Métriques

L'intégration Android n'inclut aucune métrique. Pour générer des métriques custom à partir de votre application RUM, consultez la [documentation pertinente][5].

### Événements

Pour en savoir plus sur les événements et attributs, consultez la section [Données RUM recueillies (Android)][6].

### Checks de service

L'intégration Android n'inclut aucun check de service

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveillance Android et Android TV][8]

[1]: https://app.datadoghq.com/integrations/rum-android
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tabs=kotlin#setup
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/connect_rum_and_traces?tab=androidrum#setup-rum
[4]: https://docs.datadoghq.com/fr/logs/log_collection/android/?tab=kotlin
[5]: https://docs.datadoghq.com/fr/real_user_monitoring/generate_metrics
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/android/data_collected/
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://docs.datadoghq.com/fr/real_user_monitoring/android/