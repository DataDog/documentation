---
algolia:
  tags:
  - apm recommendations
  - apm recommendation
  - application performance monitoring
  - performance recommendations
  - reliability recommendations
  - tracing
description: Apprenez à optimiser les performances et la fiabilité de votre application
  avec les recommandations APM.
further_reading:
- link: /tracing/
  tag: Documentation
  text: Découvrez l'Application Performance Monitoring (APM)
- link: /tracing/guide/apm_dashboard/
  tag: Documentation
  text: Guide du dashboard APM
- link: /cloud_cost_management/recommendations/
  tag: Documentation
  text: Cloud Cost Recommendations
- link: /database_monitoring/recommendations/
  tag: Documentation
  text: Recommandations DBM
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: Blog
  text: Améliorez les performances et la fiabilité avec Proactive App Recommendations
- link: https://www.datadoghq.com/blog/apm-recommendations
  tag: Blog
  text: Améliorez les performances et la fiabilité avec APM Recommendations
multifiltersearch:
  data:
  - category: Performance
    recommendation_description: Une application backend appelle la même base de données
      séquentiellement au lieu de traiter les requêtes par lots.
    recommendation_prerequisite: APM
    recommendation_type: N+1 Queries on Database
    scope: Backend services
  - category: Performance
    recommendation_description: Une application backend effectue plusieurs appels
      vers la même API en aval séquentiellement au lieu de les exécuter en parallèle,
      augmentant inutilement la latence des requêtes et ralentissant les performances
      globales du service.
    recommendation_prerequisite: APM
    recommendation_type: Repeated Sequential API calls
    scope: Backend services
  - category: Performance
    recommendation_description: Une application backend effectue un nombre excessif
      de tentatives de réessai lors de l'appel d'une API en aval, prolongeant ainsi
      la durée de la requête et risquant d'entraîner des défaillances en cascade sous
      charge.
    recommendation_prerequisite: APM
    recommendation_type: Persistent Retries
    scope: Backend services
  - category: Performance
    recommendation_description: Le plan d'exécution de la requête effectue des analyses
      séquentielles coûteuses. Lorsqu'elle est détectée, Datadog recommande d'utiliser
      un index pour accélérer la requête.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Missing index
    scope: Databases
  - category: Performance
    recommendation_description: Un service effectue des requêtes en lecture seule
      vers une instance de base de données principale alors que des réplicas sont
      disponibles. Le routage de ces requêtes vers des réplicas peut réduire la charge
      principale et améliorer les performances.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Unbalanced Read Load
    scope: Databases
  - category: Reliability
    recommendation_description: Une application backend déclenche des tentatives de
      réessai rapides sans appliquer de backoff adéquat, maintenant une pression élevée
      sur les dépendances en difficulté et risquant des pannes prolongées en empêchant
      la récupération du système lors de défaillances transitoires.
    recommendation_prerequisite: APM
    recommendation_type: Aggressive Retries
    scope: Backend services
  - category: Reliability
    recommendation_description: Une application backend lance un nombre élevé d'exceptions
      servant de flux de contrôle, ajoutant une surcharge en CPU et en mémoire.
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: High Exception Volumes
    scope: Backend services
  - category: Reliability
    recommendation_description: Une application backend expire lors de l'appel d'une
      dépendance en aval car la dépendance répond trop lentement, provoquant des échecs
      de requête qui impactent les utilisateurs finaux et augmentent le risque de
      défaillances en cascade en amont.
    recommendation_prerequisite: APM + RUM
    recommendation_type: Dependency Timeouts
    scope: Backend services
  - category: Performance
    recommendation_description: Un service effectue un travail coûteux et répété sur
      le chemin de la requête qui pourrait être servi à partir d'un cache à courte
      durée de vie, réduisant la latence de suivi et la charge en aval.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Missing Cache
    scope: Backend services
  - category: Performance
    recommendation_description: Un service présente une latence de suivi extrême causée
      par des spans en aval lents sur le chemin critique, souvent en raison d'une
      latence de dépendance illimitée ou d'appels séquentiels qui pourraient s'exécuter
      simultanément.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Tail Latency
    scope: Backend services
  - category: Performance
    recommendation_description: Un service consacre une part importante du temps de
      requête à un travail de sérialisation ou de parsing lié au CPU, ajoutant une
      latence évitable et une surcharge de CPU.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Excessive Serialization
    scope: Backend services
  - category: Performance
    recommendation_description: Un service accepte des paramètres de requête sans
      limites de taille ou de plage, permettant à des entrées surdimensionnées d'entraîner
      un travail coûteux en aval, une latence de suivi et des délais d'attente.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Unbounded Payload
    scope: Backend services
  - category: Performance
    recommendation_description: Le traitement des requêtes est sérialisé derrière
      une primitive de synchronisation ou une section critique longue, provoquant
      une latence de suivi en cas de concurrence.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Resource Contention
    scope: Backend services
  - category: Reliability
    recommendation_description: Un service épuise de manière répétée son pool de connexions
      vers une dépendance en aval, mettant les requêtes en file d'attente et provoquant
      des pics de latence ou des échecs sous charge.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Connection Pool Exhaustion
    scope: Backend services
  - category: Reliability
    recommendation_description: Un service fait apparaître des résultats attendus
      sous forme d'erreurs dans APM, gonflant ainsi les taux d'erreur des endpoints
      et masquant de réelles régressions de fiabilité.
    recommendation_prerequisite: APM + AI Recs (Preview)
    recommendation_type: Error Misclassification
    scope: Backend services
  headers:
  - filter_by: true
    id: category
    name: Catégorie de recommandation
  - filter_by: true
    id: recommendation_type
    name: Type de recommandation
  - filter_by: true
    id: scope
    name: Périmètre de la recommandation
  - id: recommendation_description
    name: Description de la recommandation
  - filter_by: true
    id: recommendation_prerequisite
    name: Prérequis de la recommandation
site_support_id: apm_recommendations
title: APM Recommendations
---
APM Recommendations vous aident à améliorer les performances et la fiabilité de vos applications en mettant en évidence des opportunités d'optimisation issues de votre télémétrie collectée. Ces recommandations sont conçues pour :

- Identifier et résoudre les goulots d'étranglement de performance
- Améliorer la fiabilité et la disponibilité du service
- Améliorer l'expérience de l'utilisateur final

{{< img src="/tracing/recommendations/apm_recommendations-3.png" alt="APM Recommendations page avec des cartes récapitulatives pour les problèmes de fiabilité et de performance et une liste de recommandations à examiner" style="width:100%;" >}}

{{< callout url="https://www.datadoghq.com/product-preview/apm-ai-recommendations/" header="Rejoignez l'AI Recommendations Preview !" >}}
Des types de recommandations basés sur l'IA sont désormais disponibles, élargissant l'ensemble des [opportunités d'optimisation](?recommendation_prerequisite=APM+%2B+AI+Recs+%28Preview%29#supported-recommendations) que Datadog peut détecter.
{{< /callout >}}

## Prérequis {#prerequisites}

Certaines recommandations reposent sur des produits Datadog spécifiques. Utilisez le menu déroulant {{< ui >}}Recommendation Prerequisite{{< /ui >}} pour filtrer les recommandations par produits Datadog dans votre configuration.

Si vous prévoyez d'utiliser [Bits Code][3] pour mettre en œuvre les recommandations, complétez sa configuration en suivant [les instructions][4].

## Fonctionnement {#how-it-works}

Les recommandations sont basées sur des données collectées à partir de différentes parties de votre pile :

- Traces distribuées issues de l'Application Performance Monitoring (APM)
- Télémétrie de base de données issue du Database Monitoring (DBM)
- Sessions et parcours utilisateur issus du Real User Monitoring (RUM)

Datadog corrèle ces sources pour identifier les opportunités d'améliorer les performances, la fiabilité et l'expérience utilisateur.

Datadog classe les recommandations en calculant un score de priorité qui pondère l'impact potentiel d'un problème par rapport aux signaux de télémétrie, tels que le volume relatif des requêtes et les tendances de performance. Les informations les plus critiques pour améliorer la fiabilité et les performances du service apparaissent en premier.

## Utilisation des recommandations {#using-recommendations}

Pour examiner les recommandations qui nécessitent votre attention :

1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Recommendations{{< /ui >}}][1].
2. Filtrez vos recommandations par statut ou par type.
3. Sélectionnez une recommandation dans la liste pour voir une description détaillée du problème.
4. Examinez le problème, l'impact et la recommandation de Datadog pour le résoudre.
5. (Facultatif) Pour utiliser [Bits Code][3] afin de générer une correction de code, sous {{< ui >}}Next Steps{{< /ui >}}, cliquez sur {{< ui >}}Fix with Bits{{< /ui >}}.
6. (Facultatif) Pour suivre la correction dans Jira ou Work Management, sous {{< ui >}}Triage{{< /ui >}}, cliquez sur {{< ui >}}Add Jira Ticket{{< /ui >}} ou {{< ui >}}Add Work Item{{< /ui >}}.

Après avoir examiné la recommandation, vous pouvez utiliser le menu déroulant {{< ui >}}FOR REVIEW{{< /ui >}} pour changer le statut de la recommandation en {{< ui >}}REVIEWED{{< /ui >}}, {{< ui >}}IGNORED{{< /ui >}} ou {{< ui >}}RESOLVED{{< /ui >}}.

**Remarque** : Sur l'APM Home page[5], les sections {{< ui >}}Watchdog{{< /ui >}} et {{< ui >}}Error Tracking{{< /ui >}} respectent également le filtre de service sélectionné (ou vos services personnalisés lorsqu'aucun filtre n'est défini), correspondant à la manière dont les recommandations sont délimitées. Lorsqu'un service est sélectionné et qu'aucune alerte ou aucun problème ne correspond, la section affiche un état vide avec un bouton {{< ui >}}Clear filter{{< /ui >}}, et le lien Error Tracking {{< ui >}}View all{{< /ui >}} est pré-filtré sur ce service.

## Affichage des recommandations sur un dashboard {#viewing-recommendations-on-a-dashboard}

Ajoutez un widget Liste avec APM Recommendations comme source de données pour examiner les recommandations parallèlement aux métriques de performance de votre équipe.

{{< img src="tracing/recommendations/apm_recommendations_dashboard_widget.png" alt="Un widget Liste configuré avec APM Recommendations comme source de données, affichant les recommandations par priorité, service, summary, issue et status." style="width:100%;" >}}

1. Sur n'importe quel dashboard, créez un widget et sélectionnez {{< ui >}}List{{< /ui >}} comme visualisation.
2. Sélectionnez {{< ui >}}APM Recommendations{{< /ui >}} comme source de données.
3. Filtrez par environnement, service, équipe, type de recommandation et statut.

## Recommandations prises en charge {#supported-recommendations}

<!-- The table below is auto-generated. Add new entries in multifiltersearch with new recommendations as they become available. -->

{{< multifilter-search >}}

**Remarque** : Si vous utilisez à la fois APM et Database Monitoring (DBM), vous pourriez voir moins de Missing Index recommendations ici que sur la DBM Recommendations page [2]. APM Recommendations n'affichent que les Missing Index issues que Datadog peut associer à un service d'application instrumenté. Missing Index recommendations qui ne peuvent être associées à un service spécifique n'apparaissent que dans DBM.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
[2]: /fr/database_monitoring/recommendations/
[3]: /fr/bits_ai/bits_code/
[4]: /fr/bits_ai/bits_code/setup/
[5]: https://app.datadoghq.com/apm/home