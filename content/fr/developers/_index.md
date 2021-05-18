---
title: Développeurs
kind: documentation
description: 'Références sur le développement pour Datadog, avec des exemples de configuration et de code'
aliases:
  - /fr/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog'
further_reading:
  - link: /api
    tag: Documentation
    text: API Datadog
---
## Présentation

La section Développeurs contient des références sur le développement pour Datadog.

## Données

### Éléments non pris en charge

Les développeurs disposent de plusieurs options pour l'envoi des données non prises en charge à Datadog. La difficulté (la durée de développement) et le budget (le coût des métriques custom) constituent les principaux critères à prendre en compte.

| Type                | Difficulté | Métriques custom | Langage |
|---------------------|--------|----------------|----------|
| DogStatsD           | Minimale | Oui            | Tous      |
| Check custom        | Faible    | Oui            | Python   |
| Intégration privée | Moyenne | Oui            | Python   |
| Intégration publique  | Élevée   | Non             | Python   |

{{< whatsnext desc="Envoyez des métriques non prises en charge à Datadog :" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u> :  présentation des fonctionnalités de DogStatsD, y compris sa configuration, le format des datagrammes et l'envoi de données.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Check custom d'Agent</u> : découvrez comment transmettre des métriques, des événements et des checks de service à l'aide de votre propre check custom.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Check OpenMetrics personnalisé</u> : apprenez à transmettre vos propres métriques OpenMetrics avec un check custom d'Agent.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Intégrations</u> : pour gérer des tâches plus complexes, créez une intégration Datadog privée ou publique (qui peut être partagée avec la communauté).{{< /nextlink >}}
{{< /whatsnext >}}

### Types

{{< whatsnext desc="Familiarisez-vous avec les différents types de données que vous pouvez envoyer à Datadog :" >}}
    {{< nextlink href="/developers/metrics" >}}<u>Métriques custom</u> : plongez au cœur des métriques custom de Datadog et découvrez les différents types de métriques, ce qu'ils représentent, comment les envoyer et leur rôle au sein de l'écosystème Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/events" >}}<u>Événements</u> : découvrez comment envoyer des événements à Datadog avec des checks custom d'Agent, DogStatsD ou l'API Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>Checks de service</u> : apprenez à envoyer des checks de service à Datadog avec des checks custom d'Agent, DogStatsD ou l'API Datadog{{< /nextlink >}}
{{< /whatsnext >}}

## Communauté

{{< whatsnext desc="Collaborez avec la communauté de développeurs Datadog :" >}}
    {{< nextlink href="/developers/libraries" >}}<u>Bibliothèques</u> :  liste des bibliothèques client officielles et de la communauté pour l'API Datadog, le client DogStatsD, l'APM et le tracing distribué, et les intégrations de la communauté reposant sur des ressources extérieures pour une grande variété de plates-formes.{{< /nextlink >}}
    {{< nextlink href="/developers/office_hours" >}}<u>Heure de permanence</u> : échangez avec des ingénieurs à propos du développement pour Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>Guides</u> : articles d'aide supplémentaires sur des particularités techniques, exemples de code et documentation de référence.{{< /nextlink >}}
{{< /whatsnext >}}

## Other

{{< whatsnext desc="Autres ressources de développement :" >}}
    {{< nextlink href="/developers/marketplace" >}}<u>Marketplace</u> : créez de nouveaux services pour compléter la plate-forme Datadog et proposez-les à vos clients.{{< /nextlink >}}
    {{< nextlink href="/developers/amazon_cloudformation" >}}<u>Amazon CloudFormation</u> : utilisez des modèles pour décrire, configurer et provisionner simultanément toutes les ressources AWS de votre environnement.{{< /nextlink >}}
{{< /whatsnext >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}