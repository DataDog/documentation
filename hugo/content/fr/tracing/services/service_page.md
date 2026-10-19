---
algolia:
  tags:
  - service page
aliases:
- /fr/tracing/visualization/service/
description: Vue d'ensemble complète du service avec métriques de santé, dépendances,
  déploiements, suivi des erreurs et informations de sécurité.
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services qui envoient des rapports à Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajoutez l'URL de la page de service APM à votre presse-papiers
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security d'APM
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: Centre d'apprentissage
  text: Démarrer avec les métriques et les traces APM
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: Centre d'apprentissage
  text: Diagnostiquer les bugs d'application avec Datadog APM
title: Page Service
---
{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="Page de service détaillée" style="width:100%;">}}

## Présentation {#overview}

La sélection d'un service dans le Catalog vous mène à la page de service détaillée. Un service est un ensemble de processus effectuant la même tâche - par exemple, un framework web ou une base de données (en savoir plus sur la définition des services dans [Démarrer avec APM][1]).

Consultez sur cette page :

* [Santé du service](#service-health)
* [États des monitors de service](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [Cartes récapitulatives](#summary-cards)
{{< site-region region="ap1,us3,us5,eu,us,ap2,uk1" >}}
* [Dépendances](#dependencies)
{{< /site-region >}}
* [Graphiques prêts à l'emploi](#out-of-the-box-graphs)
* [Ressources associées à ce service][2]
* [Sections supplémentaires](#additional-sections)
    *  [Deployments](#deployments), [Error Tracking](#error-tracking), [Traces](#traces), [Security](#security) et plus encore

## Service health {#service-health}

**Service health** fournit un résumé en temps réel de l'état du service pour vous aider à identifier les services nécessitant une attention immédiate.

La santé du service intègre plusieurs signaux (monitors, incidents et Watchdog Insights) en une seule alerte. Voyez quels services sont dans un état critique pour détecter et résoudre les problèmes plus rapidement.

{{< img src="/tracing/services/service_page/service-health3.png" alt="État de santé du service sur la page de service et la carte des dépendances de service." style="width:100%;" >}}

La santé du service est disponible à plusieurs endroits dans Datadog :

1. [Catalog][23]
2. Pages de service
3. Cartes des dépendances de service, si Watchdog détecte qu'un problème s'étend sur plusieurs dépendances de service.
4. Pastilles de service

La santé du service affiche le statut de votre service comme *Critical* ou *Warning* si au moins l'une des conditions suivantes est remplie :

|   Statut    |                         Condition                          |
|-------------|------------------------------------------------------------|
|  **Critical**  | **Monitors** : <br>- Un monitor non mis en sourdine avec une configuration d'intégration de paging (PagerDuty ou Opsgenie) est dans un état `ALERT` et s'est déclenché au cours des `past 2 days`.<br><br>**Incidents** : <br>- Un incident de toute gravité est actif.<br><br>**Watchdog Insights** : <br>- Un déploiement défectueux est en cours.<br>- Une alerte de latence/taux d'erreur APM est en cours.  |
| **Warning** | **Monitors** : <br>- Un monitor d'avertissement non mis en sourdine avec une configuration d'intégration de paging (PagerDuty ou Opsgenie) est dans un état `WARN` et s'est déclenché au cours des `past 2 days`.<br><br>**Incidents** : <br>- Un incident de toute gravité est stable.<br><br>**Watchdog Insights** : <br>- Une alerte d'anomalie de log est en cours. |                                                                                                                                                                                                   |
|   **Ok**    |    Aucune alerte de l'état critique ou d'avertissement n'est active.     |                                                                                                                                                                       ||

## Service monitor{#service-monitor}

Le panneau Service monitor présente les Monitors et les tests Synthetic associés à votre service.
Datadog propose également une liste de Monitors en fonction de votre type de service :

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Activez-les directement ou créez vos propres [monitors APM][3].

**Remarque** : Les Monitors sont associés à un service APM si `service:<SERVICE_NAME>` est tagué dans les métadonnées, inclus dans la requête du monitor, ou si la requête est regroupée par service. Vous pouvez également taguer n'importe quel test Synthetic avec `service:<SERVICE_NAME>` pour l'associer à un service APM.

## Watchdog Insights{#watchdog-insights}

Le carrousel [Watchdog Insights][7] fait apparaître les anomalies et les singularités détectées sur des tags spécifiques, vous permettant d'enquêter sur la cause profonde d'un problème. Les aperçus sont découverts à partir des données APM, Continuous Profiler, Log Management et Infrastructure qui incluent le tag de service. Ces aperçus sont les mêmes que ceux qui apparaissent sur chacune des pages de produit. Par exemple, les mêmes singularités de logs sur la page de service peuvent être trouvées dans le [Log Explorer][19].

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

Cliquez sur une insight pour afficher plus de détails, notamment l'intervalle, les logs ou traces associés et les prochaines étapes suggérées.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Détails de Watchdog Insights" style="width:100%;">}}

## Cartes récapitulatives {#summary-cards}

La page de service propose des cartes récapitulatives avec des points saillants sur la santé du service. Repérez facilement les déploiements potentiellement défectueux, cliquez sur la carte pour afficher les détails ou les traces du dernier déploiement, ou affichez tous les déploiements sur ce service. Consultez les nouveaux problèmes signalés sur votre service grâce à notre intégration avec [Error Tracking][4], où les erreurs sont automatiquement regroupées en problèmes.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Cartes récapitulatives" style="width:100%;">}}

Nos résumés [Service Level Objectives (SLOs)][5] et [Incidents][6] vous permettent de surveiller le statut des SLO et les incidents en cours, afin que vous puissiez garder vos objectifs de performance à l'esprit. Cliquez sur les cartes pour créer un nouveau SLO sur le service ou déclarer un incident. Le résumé des [signaux de sécurité][18] met en évidence la façon dont vos services réagissent aux menaces applicatives.

## Graphiques prêts à l'emploi {#out-of-the-box-graphs}

Datadog fournit des graphiques prêts à l'emploi pour tout service donné. Utilisez le menu déroulant au-dessus de chaque graphique pour modifier les informations affichées.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Graphiques de service prêts à l'emploi" style="width:100%;">}}

{{% apm-ootb-graphs %}}

<div class="alert alert-tip">Lorsque vous survolez un pic de latence dans le graphique de latence, cliquez sur <strong>Investigate With Bits AI</strong> pour lancer une investigation automatisée. Bits AI analyse la divergence des tags et les goulots d'étranglement dans les traces affectées. Pour plus d'informations, consultez <a href="/bits_ai/bits_chat/">Bits Chat</a>.</div>

### Exporter {#export}

En haut à droite de chaque graphique, cliquez sur la flèche pour exporter votre graphique dans un [dashboard][10] existant :

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Enregistrer dans le dashboard" style="width:60%;">}}

## Ressources {#resources}

Consultez les graphiques des requêtes, de la latence et des erreurs ventilés par ressource pour identifier les ressources problématiques. Les ressources sont des actions particulières pour vos services (généralement des endpoints ou des requêtes individuelles).

Ci-dessous, vous trouverez une liste de [ressources][11] associées à votre service. Remarque : Si la ressource représente une interface externe d'un service HTTP, la liste affiche plutôt des endpoints.

Triez les ressources du service par requêtes, latence, erreurs ou temps pour identifier les zones à fort trafic ou les problèmes potentiels. Vous pouvez configurer ces colonnes de métriques, comme illustré dans l'exemple suivant :

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="Ressources" style="width:100%;">}}

Cliquez sur une ressource pour ouvrir un panneau latéral qui affiche les graphiques prêts à l'emploi de la ressource (concernant les requêtes, les erreurs et la latence), une carte des dépendances de la ressource et un tableau de résumé des spans. Utilisez les touches de navigation du clavier pour basculer entre les ressources de la liste {{< ui >}}Resources{{< /ui >}} et comparer les ressources d'un service. Pour afficher la page complète de la ressource, cliquez sur {{< ui >}}Open Full Page{{< /ui >}}.

[Consultez la documentation relative aux ressources pour en savoir plus][2].

### Colonnes {#columns}

Choisissez les informations à afficher dans votre liste de ressources :

* {{< ui >}}Requests{{< /ui >}}a: Nombre absolu de requêtes suivies (par seconde)
* {{< ui >}}Requests per second{{< /ui >}}a: Nombre absolu de requêtes suivies par seconde
* {{< ui >}}Total time{{< /ui >}}a: Somme de tout le temps passé dans cette ressource
* {{< ui >}}Avg/p75/p90/p95/p99/Max Latency{{< /ui >}}: La latence Avg/p75/p90/p95/p99/Max de vos requêtes suivies
* {{< ui >}}Errors{{< /ui >}}a: Nombre absolu d'erreurs pour une ressource donnée
* {{< ui >}}Error Rate{{< /ui >}}a: Pourcentage d'erreurs pour une ressource donnée

{{< img src="tracing/visualization/service/resource_columns.png" alt="Colonnes de ressources" style="width:40%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
## Dépendances {#dependencies}

Visualisez les dépendances en amont et en aval avec lesquelles le service interagit à partir de la carte des dépendances. La carte fonctionne grâce aux [métriques APM][1] pour faire apparaître le nombre précis de requêtes, les taux d'erreur et les chiffres de latence. La carte regroupe automatiquement les dépendances par nom d'opération. Par exemple, si un service appelle deux services en aval en utilisant gRPC, ces services sont regroupés. Le tableau sur le côté gauche de la carte montre les requêtes et les taux d'erreur au fil du temps, ce qui est utile pour identifier les dépendances défaillantes.

Les [dépendances de service déduites][2] comme les bases de données, les files d'attente ou les services tiers sont représentées par un nœud avec un arrière-plan violet.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Carte des dépendances de la page de service" style="width:100%;">}}

**Remarque** : Les [remplacements de service][3] s'affichent le long des bords (lignes de connexion) entre les nœuds dans la carte des dépendances pour conserver la visibilité sur le service distant, la base de données ou la file d'attente réelle avec laquelle le service interagit.

### Étude d'une dépendance de service spécifique{#investigating-a-specific-service-dependency}

Cliquez sur un nœud de service de dépendance pour examiner l'une des dépendances du service. Dans le panneau latéral, le nombre de requêtes, les erreurs et les métriques de latence sont limités aux requêtes allant du service vers la dépendance en aval.

Utilisez le tableau suivant pour voir quelles ressources sont invoquées lors des appels client du service vers la dépendance en aval. Par exemple, si le service appelle une base de données, consultez la répartition des requêtes effectuées vers la base de données et utilisez le tableau pour identifier les requêtes lentes ou en échec.

{{< img src="tracing/visualization/service/dependencies_side_panel.png" alt="Carte des dépendances de service de la page Service" style="width:100%;">}}

[1]: /fr/tracing/metrics/metrics_namespace/
[2]: /fr/tracing/services/inferred_services/
[3]: /fr/tracing/guide/service_overrides/
{{< /site-region >}}

## Sections supplémentaires{#additional-sections}

### Déploiements{#deployments}
Un service configuré avec des tags de version affichera les versions dans l'onglet Déploiement. La section des versions affiche toutes les versions du service qui étaient actives pendant l'intervalle de temps sélectionné, avec les versions actives en haut.

Les informations suivantes sont affichées par défaut :
* Les noms de version déployés pour ce service sur la période donnée.
* Les moments où les traces correspondant à cette version ont été vues pour la première et la dernière fois.
* Un indicateur de types d'erreurs, qui montre combien de types d'erreurs apparaissent dans chaque version et qui n'apparaissaient pas dans la version immédiatement précédente.

    **Remarque** : Cet indicateur montre les erreurs qui n'ont pas été vues dans les traces de la version précédente. Cela ne signifie pas que cette version a nécessairement introduit ces erreurs. L'examen des nouveaux types d'erreurs peut être un excellent moyen de commencer à enquêter sur les erreurs.

* Requêtes par seconde.
* Taux d'erreur en pourcentage du nombre total de requêtes.

Vous pouvez ajouter ou supprimer des colonnes de ce tableau de synthèse et vos sélections seront enregistrées. Les colonnes supplémentaires disponibles sont :

* Endpoints actifs dans une version qui ne l'étaient pas dans la version précédente.
* Durée d'activité, indiquant la durée entre la première trace et la dernière trace envoyée à Datadog pour cette version.
* Nombre total de requêtes.
* Nombre total d'erreurs.
* Latence mesurée par p50, p75, p90, p95, p99 ou max.

{{< img src="tracing/visualization/service/deployments_1.png" alt="Déploiements" style="width:90%;">}}

Pour en savoir plus sur les déploiements, consultez [la page Service][12].

### Error Tracking {#error-tracking}
Affichez les problèmes sur votre service, qui sont des erreurs similaires regroupées pour transformer un flux d'erreurs bruyant en problèmes gérables et vous aider à évaluer l'impact des erreurs de votre service. En savoir plus sur les problèmes dans [Error Tracking][4].

Cet onglet contient des graphiques de synthèse qui montrent quelles ressources ont le plus de problèmes et une liste des problèmes les plus courants survenant dans votre service. Cliquez sur un problème dans la liste pour voir les détails dans un panneau latéral, y compris sa trace de pile, les versions de code associées et le nombre total d'occurrences d'erreurs depuis le début.

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Onglet Error Tracking" style="width:90%;">}}

### Security {#security}
Comprenez la posture de sécurité du service, y compris les vulnérabilités connues exposées dans les bibliothèques du service et les signaux de sécurité sur votre service, qui sont créés automatiquement lorsque Datadog détecte des attaques d'application impactant vos services. Les signaux identifient des menaces significatives que vous pouvez examiner au lieu d'évaluer chaque tentative d'attaque individuelle. En savoir plus sur [App and API Protection][18].

La section supérieure de l'onglet Security contient des graphiques généraux qui indiquent le nombre de vulnérabilités et leur gravité, la chronologie des attaques, leur type ainsi que des informations à propos de la personne à l'origine de l'attaque (IP client ou utilisateur authentifié).

La section suivante du panneau répertorie toutes les vulnérabilités et tous les signaux concernant le service. Cliquez sur une vulnérabilité de sécurité pour ouvrir un panneau latéral avec les détails pertinents pour approfondir l'enquête et corriger la vulnérabilité. Cliquez sur un signal de sécurité pour obtenir des informations sur la menace détectée et les actions que vous pouvez entreprendre pour y remédier.

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="Security" style="width:90%;">}}

### Bases de données {#databases}
Affichez les détails du host, les requêtes, les recommandations et les dépendances de base de données en aval, et identifiez les singularités de latence et de charge.

#### Requêtes {#queries}
L'onglet Requêtes inclut une visualisation des durées des spans échantillonnés et une liste complète des requêtes de l'intervalle de temps sélectionné. Sélectionnez une requête dans le tableau pour ouvrir le panneau de requête et afficher les diagnostics, les détails des erreurs et les traces.

#### Bases de données {#databases-1}
L'onglet Bases de données inclut des visualisations des connexions actives et de la durée moyenne des requêtes pour aider à identifier les singularités, ainsi qu'une liste complète des hosts de base de données pour le service sélectionné. Sélectionnez un host de base de données dans la liste pour l'afficher dans Database Monitoring.

[En savoir plus sur la connexion de DBM et APM][21].

### Infrastructure {#infrastructure}
Si votre service s'exécute sur Kubernetes, vous pouvez voir un onglet Infrastructure sur la page du service. Le tableau des pods Kubernetes en direct affiche des informations détaillées sur vos pods, comme si l'utilisation de la mémoire est proche de sa limite, et vous permet d'améliorer l'allocation des ressources en voyant si les ressources de calcul provisionnées dépassent ce qui est requis pour une performance optimale de l'application.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Pods Kubernetes" style="width:90%;">}}

La section Kubernetes Metrics présente un résumé global de la santé de votre infrastructure pour une période donnée. Elle contient notamment des métriques sur le CPU, la mémoire, le réseau et le disque.

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Métriques Kubernetes" style="width:90%;">}}

Pour les environnements autres que Kubernetes (par exemple une installation basée sur un host), consultez la [documentation relative au unified service tagging][13].

### Métriques d'exécution {#runtime-metrics}
Si les métriques d'exécution sont activées dans le client de traçage, vous verrez un onglet Métriques d'exécution correspondant au langage d'exécution de votre service. En savoir plus dans [Métriques d'exécution][14].

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="Métriques runtime" style="width:90%;">}}

### Profilage {#profiling}
Vous verrez un onglet Profilage si le [Continuous Profiler][15] est configuré pour votre service.

Utilisez les informations de l'onglet {{< ui >}}Profiling{{< /ui >}} pour corréler un changement de latence et de débit à un changement de performance du code.

Dans cet exemple, vous pouvez voir comment la latence est liée à une augmentation de la contention de verrouillage sur `/GET train` qui est causée par la ligne de code suivante :

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="Passage de la page de service APM à la page de comparaison de profilage pour trouver la ligne de code causant la latence" video=true >}}

### Fuites de mémoire {#memory-leaks}
Si vous configurez le [Continuous Profiler][15] et que le service s'exécute dans un environnement conteneurisé, l'onglet [Memory Leaks][24] devient disponible.

Il vous guide à travers un workflow pour identifier les fuites de mémoire potentielles et affiche les données les plus exploitables.

{{< img src="profiler/apm_service_page_memory_leaks.png" alt="Fuites de mémoire" style="width:90%;">}}

### Traces {#traces}
Affichez la liste des traces associées au service dans l'onglet des traces, qui est déjà filtré sur votre service, votre environnement et le nom de l'opération. Approfondissez l'analyse des spans problématiques en utilisant les [facettes][16] principales telles que le statut, la ressource et le type d'erreur. Pour plus d'informations, cliquez sur un span pour afficher un graphique en flamme de sa trace et plus de détails.

{{< img src="tracing/visualization/service/traces_1.png" alt="Traces" style="width:90%;">}}

### Modèles de logs {#log-patterns}
Affichez les modèles courants dans les logs de votre service et utilisez des facettes comme le statut dans la barre de recherche pour filtrer la liste des modèles. Cliquez sur un modèle pour ouvrir le panneau latéral afin d'afficher plus de détails, comme les événements qui ont déclenché la cascade. En savoir plus dans [Modèles de logs][17].

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="Modèles de logs" style="width:90%;">}}

### Coûts {#costs}
Visualisez le coût associé à l'infrastructure de votre service utilisée dans l'onglet Coûts.
[En savoir plus sur Cloud Cost Management][22].

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="Coûts" style="width:90%;">}}

### Activité frontend {#frontend-activity}

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="Rejoignez la Preview !">}}
Rejoignez la Journey monitoring Preview pour commencer à utiliser la section Activité frontend !
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Rejoignez la Preview !">}}
Rejoignez la Operations monitoring Preview pour commencer à utiliser la section Activité frontend !
{{< /callout >}}

L'onglet Activité frontend connecte votre service backend aux parcours, opérations et vues [Real User Monitoring (RUM)][24] qui en dépendent. Utilisez-le pour comprendre comment les performances de votre service affectent l'expérience utilisateur finale et les résultats commerciaux, comme quels parcours utilisateur ralentissent ou échouent à convertir lorsque le service se dégrade.

{{< img src="/tracing/services/service_page/front-end-activity.png" alt="Le panneau latéral d'activité frontend affichant les détails du service, du parcours, de l'opération, de l'utilisation et les replays de session associés" style="width:90%;">}}

Les métriques de cet onglet sont calculées à partir de spans indexés qui sont corrélés avec les données RUM. L'en-tête indique sur combien de spans indexés la vue est basée, ainsi que la part du total des spans qui sont indexés.

#### Prérequis {#prerequisites}
- RUM est configuré pour votre application frontend.
- RUM et APM sont connectés, de sorte que les événements frontend sont corrélés avec les traces backend de ce service.
- Les parcours et opérations RUM sont activés pour votre organisation.

Pour renseigner les métriques Utilisateurs et Comptes, vos SDK RUM doivent envoyer les attributs `usr.id` et `account.id`. Sans ces attributs, les métriques de parcours, d'opération et de vue restent disponibles, mais Datadog ne peut pas attribuer l'activité à des utilisateurs ou des comptes spécifiques.

#### Filtrage de la vue {#filtering-the-view}

Utilisez les sélecteurs en cascade en haut de l'onglet pour délimiter les données, en passant du regroupement le plus large au plus spécifique :

- Parcours : une séquence d'étapes qu'un utilisateur effectue dans votre application, définie dans Journey Monitoring
- Opération : une opération utilisateur suivie au sein d'un parcours
- Vue : une vue RUM individuelle (page ou écran) associée aux opérations sélectionnées

#### Métriques récapitulatives {#summary-metrics}

Les cartes récapitulatives mettent en évidence l'impact global du frontend pour la sélection actuelle. Chaque carte affiche la valeur sur la période sélectionnée et le changement par rapport à la période précédente :

- Utilisateurs : nombre d'utilisateurs distincts (`usr.id`) actifs dans les parcours sélectionnés.
- Comptes : nombre de comptes distincts (`account.id`) actifs dans les parcours sélectionnés.
- Requêtes : nombre de requêtes frontend corrélées à ce service.
- Conversion moyenne : taux de conversion moyen sur les parcours sélectionnés.
- Latence p95 : 95e centile de latence subie par le frontend.
- Taux d'erreur : pourcentage de requêtes frontend ayant abouti à une erreur.

#### Enrichissement Product Analytics {#product-analytics-enrichment}

Si vous utilisez [Product Analytics][25], l'onglet Activité frontend affiche des détails enrichis sur les utilisateurs et les comptes impactés, vous offrant plus de contexte sur les personnes affectées lorsque le service se dégrade et vous aidant à hiérarchiser le travail en fonction de l'impact commercial.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/
[2]: /fr/tracing/services/resource_page/
[3]: /fr/monitors/types/apm/
[4]: /fr/tracing/error_tracking/
[5]: /fr/service_level_objectives/
[6]: /fr/incident_response/incident_management/
[7]: /fr/watchdog/
[8]: /fr/tracing/metrics/metrics_namespace/
[10]: /fr/dashboards/
[11]: /fr/tracing/glossary/#resources
[12]: /fr/tracing/services/deployment_tracking/#versions-deployed
[13]: /fr/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /fr/tracing/metrics/runtime_metrics/
[15]: /fr/profiler/
[16]: /fr/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /fr/security/application_security/how-it-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /fr/database_monitoring/connect_dbm_and_apm/
[22]: /fr/cloud_cost_management/
[23]: https://app.datadoghq.com/services
[24]: /fr/profiler/guide/solve-memory-leaks/
[25]: /fr/real_user_monitoring/
[26]: /fr/product_analytics/