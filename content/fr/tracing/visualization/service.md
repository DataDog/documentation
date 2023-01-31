---
further_reading:
- link: /tracing/setup/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /tracing/visualization/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/visualization/resource/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/visualization/trace/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter une URL vers la page d'un service APM à votre presse-papiers
kind: documentation
title: Page Service
---

{{< img src="tracing/visualization/service/overview_service_page.png" alt="Page Service détaillée" style="width:100%;">}}

## Présentation

Lorsque vous sélectionnez un service sur la page Services, vous accédez aux détails concernant ce service. Un service est un ensemble de processus qui ont la même fonction, par exemple un framework Web ou une base de données (pour découvrir comment définir des services, consultez [Débuter avec l'APM][1]).

Cette page vous permet de consulter :

* Les [états des service monitors](#service-monitor)
* [Fiches récapitulatives et Watchdog Insights](#fiches-recapitulatives)
* Les [graphiques prêts à l'emploi](#Graphiques-prets-a-l-emploi)
* Les [ressources associées au service en question][2]
* [Onglets supplémentaires](#onglets-supplementaires)
    *  [Déploiements](#deploiements), [suivi des erreurs](#suivi-des-erreurs), [traces](#traces), etc.

## Service monitor

Datadog offre une liste de monitors en fonction de votre type de service :

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Activez-les directement ou créez vos propres [monitors d'APM][3].

**Remarque**: ajoutez un tag à un monitor avec `service:<NOM_SERVICE>` pour le lier à un service APM.

## Fiches récapitulatives

La page Service contient des fiches récapitulatives mettant en avant la santé de vos services. Sur cette page, vous pouvez détecter facilement tout éventuel déploiement défectueux, cliquer sur la fiche pour afficher les détails ou les traces du dernier déploiement, ou bien afficher tous les déploiements sur ce service. Grâce à notre intégration avec [suivi des erreurs][4], où les erreurs sont automatiquement classées par type de problème, vous pouvez découvrir les nouveaux problèmes signalés sur votre service.

{{< img src="tracing/visualization/service/summary_cards.jpg" alt="Fiches récapitulatives"  style="width:100%;">}}

Nos résumés des [Service Level Objectives (SLO)][5] et [Incidents][6] vous permettent de surveiller le statut des SLO et des incidents en cours, et ce, afin que vous puissiez toujours prendre en considération les objectifs de performance. Cliquez sur les fiches pour créer un nouveau SLO sur le service ou signaler un incident.

{{< img src="tracing/visualization/service/watchdog_insights.png" alt="Watchdog Insights"  style="width:70%;">}}

Le carrousel [Watchdog Insights][7] présente les anomalies détectées sur des tags spécifiques et vous permet ainsi de connaître directement la cause fondamentale d'un problème.

## Graphiques prêts à l'emploi

Datadog fournit des [graphiques par défaut][8] pour chaque service :

* Requêtes - Choisissez si vous voulez afficher :
    *  Le **nombre total de requêtes et d'erreurs**
    *  Le nombre **de requêtes et d'erreurs par seconde**
* Latence - Choisissez si vous voulez afficher :
    *  La latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées
    *  La **distribution de la latence**
    *  Le **score Apdex** des services Web. [En savoir plus sur Apdex][9]
* Erreur - Choisissez si vous voulez afficher :
    * Le **nombre total d'erreurs**
    * Le nombre **d'erreurs par seconde**
    * Le **taux d'erreur en %**
* Carte des dépendances :
    * La **carte des dépendances** présente les services en amont et en aval.
* **Sous-services** : lorsque plusieurs services sont impliqués, un quatrième graphique (dans la même option bascule que la carte des dépendances) est disponible. Il présente la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total, relatif et moyen passé par les traces dans les services en aval du service actuel par rapport aux autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui sont des opérations « finales » qui n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.
[Watchdog] [7] effectue une détection automatique des anomalies sur les graphiques Requests, Latency et Error. En cas d'anomalie, le graphique fait une superposition et une icône Watchdog apparait. Cliquez sur cette icône pour afficher les détails dans un panneau latéral.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Graphiques par défaut pour les services"  style="width:100%;">}}

### Exporter

En haut à droite de chaque graphique, cliquez sur la flèche pour exporter votre graphique dans un [dashboard][10] existant :

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Enregistrer le graphique dans un dashboard" style="width:60%;">}}

## Ressources

Consultez les graphiques Requests, Latency et Error ventilés par ressource pour identifier les ressources problématiques. Les ressources sont des actions particulières pour vos services (en général, des requêtes ou endpoints individuels). Pour en savoir plus, consultez la section [Débuter avec APM][1].

Vous trouverez ci-dessous une liste des [ressources][11] associées à votre service. Triez les ressources de ce service par requêtes, latence, erreurs et durée pour identifier les zones à trafic élevé ou les problèmes potentiels. Notez que ces colonnes de métrique peuvent être personnalisées (voir l'image ci-dessous).

{{< img src="tracing/visualization/service/resources_tab.jpg" alt="Ressources"  style="width:100%;">}}

[Consultez la documentation relative aux ressources pour en savoir plus][2].

### Colonnes

Choisissez ce que vous souhaitez afficher dans votre liste de ressources :

* **Requests** : le nombre absolu de requêtes tracées (par seconde)
* **Requests per second**: le nombre absolu de requêtes tracées par seconde
* **Total time**: le temps d'utilisation total de la ressource
* **Avg/p75/p90/p95/p99/Max Latency**: la latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées.
* **Errors**: le nombre absolu d'erreurs pour une ressource donnée
* **Error Rate**: le pourcentage d'erreur pour une ressource donnée

{{< img src="tracing/visualization/service/resource_columns.png" alt="Colonnes des ressources"  style="width:40%;">}}

## Onglets supplémentaires

### Déploiements
Lorsqu'un service est configuré avec des tags « version », les versions sont affichées dans l'onglet Déploiement. La section sur les versions affiche toutes les versions du service qui étaient actives pendant l'intervalle sélectionné, et les versions actives s'affichent en haut.

Voici les informations que vous verrez par défaut :
* Les noms des versions déployées pour ce service sur l'intervalle sélectionné.
* Quand les traces correspondant à cette version ont été observées pour la première fois et pour la dernière fois.
* Un indicateur Error Types, qui affiche le nombre de types d'erreur présents dans une version mais pas dans la version qui la précède.

  **Remarque** : cet indicateur affiche les erreurs qui n'ont pas été observées dans les traces de la version précédente ; cela ne signifie pas forcément que ces erreurs sont apparues dans cette version pour la première fois. Le nombre de nouveaux types d'erreurs est particulièrement utile pour commencer à analyser les erreurs.

* Les requêtes par seconde.
* Le taux d'erreur, exprimé en tant que pourcentage du nombre total de requêtes.

Vous avez la possibilité d'ajouter des colonnes au tableau ou d'en supprimer. Vos sélections seront enregistrées. Voici les colonnes supplémentaires disponibles :

* Endpoints actifs dans une version, mais qui ne l'étaient pas dans la version précédente.
* Durée d'activité, qui affiche le temps écoulé entre la première et la dernière trace envoyée à Datadog pour cette version.
* Nombre total de requêtes.
* Nombre total d'erreurs.
* Latence mesurée au p50, p75, p90, p95, p99, ou latence max.

{{< img src="tracing/visualization/service/deployments.png" alt="Déploiements"  style="width:90%;">}}

Pour en savoir plus sur les déploiements, consultez [la page Service][12].

### Suivi des erreurs
Cet onglet affiche les problèmes constatés sur votre service. En regroupant les erreurs similaires, il permet d'éviter les flux d'erreurs et ainsi, faciliter leur résolution. Il vous permet aussi d'évaluer l'impact des erreurs de votre service. Pour en savoir plus sur les problèmes, consultez la section [Suivi des erreurs][4].

Cet onglet présente des graphiques généraux indiquant les ressources les plus problématiques et une liste des problèmes les plus courants qui se produisent dans votre service. Cliquez sur un problème de la liste pour afficher notamment sa stack trace, les versions de code associées et le nombre total des occurrences d'erreurs depuis sa création dans un panneau latéral.

{{< img src="tracing/visualization/service/error_tracking_side_panel.jpg" alt="Onglet Error Tracking"  style="width:90%;">}}

### Infrastructure
Si votre service s'exécute sur Kubernetes, l'onglet Infrastructure est disponible sur la page Service. Le tableau des pods Kubernetes en direct fournit des informations détaillées sur vos pods, par exemple si l'utilisation de la mémoire est sur le point d'atteindre sa limite. Il vous permet également de savoir si les ressources informatiques allouées dépassent le minimum requis pour optimiser les performances de l'application, et ainsi, rendre plus efficace l'allocation des ressources.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Pods Kubernetes"  style="width:90%;">}}

La section Kubernetes Metrics présente un résumé global de la santé de votre infrastructure pour une période donnée et affiche notamment les métriques du CPU, de la Mémoire, du Réseau et du Disque.

{{< img src="tracing/visualization/service/infra_metrics.png" alt="Kubernetes Metrics"  style="width:90%;">}}

Pour les environnements autres que Kubernetes (tels que l'installation basée sur un host), consultez la [documentation relative au tagging de service unifié][13].

### Métriques runtime
Si les métriques runtime sont activées dans le client de tracing, L'onglet Runtime metrics dans la langue du runtime de votre service s'affiche. Pour en savoir plus, consultez la section [Métriques runtime][14].

{{< img src="tracing/visualization/service/runtime_metrics.png" alt="Métriques runtime"  style="width:90%;">}}

### Profiling
L'onglet Profiling s'affiche si le [Profileur en continu][15] est défini pour votre service. Les informations récapitulatives telles que les versions disponibles et la langue du runtime sont affichées en haut. Vous trouverez ci-dessous les métriques de profiling par défaut selon la version, l'endpoint et la méthode. Elles vous permettent d'identifier et de débugger les méthodes gourmandes en ressources. Cliquez sur n'importe quel graphique pour afficher les traces, les logs et d'autres données associés, ou ouvrez un flamegraph pour analyser le profil de code. [En savoir plus sur APM et le profileur en continu][15].

{{< img src="tracing/visualization/service/profiler.jpg" alt="Profiling"  style="width:90%;">}}

### Traces
L'onglet Traces présente la liste des traces associées au service, qui est déjà filtrée sur votre service, votre environnement et le nom de votre opération. Il vous permet d'accéder aux spans problématiques à l'aide de [facettes][16] de base telles que le statut, la ressource et le type d'erreur. Cliquez sur une span pour afficher un flamegraph de sa trace et obtenir plus de détails.

{{< img src="tracing/visualization/service/traces.png" alt="Traces"  style="width:90%;">}}

### Logs
Cet onglet présente les patterns courants dans les logs de votre service. Pour filtrer la liste des patterns, utilisez des facettes telles que le statut dans la barre de recherche. Cliquez sur un pattern pour afficher des informations, telles que les événements qui ont déclenché la cascade, dans un panneau latéral. Pour en savoir plus, consultez la section [Log Patterns] [17].

{{< img src="tracing/visualization/service/log_patterns.png" alt="Log patterns"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/
[2]: /fr/tracing/visualization/resource/
[3]: /fr/monitors/create/types/apm/
[4]: /fr/tracing/error_tracking/
[5]: /fr/monitors/service_level_objectives/
[6]: /fr/monitors/incident_management/
[7]: /fr/watchdog/
[8]: /fr/tracing/guide/metrics_namespace/
[9]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[10]: /fr/dashboards/
[11]: /fr/tracing/visualization/#resources
[12]: /fr/tracing/deployment_tracking/#versions-deployed
[13]: /fr/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /fr/tracing/runtime_metrics/
[15]: /fr/tracing/profiler/
[16]: /fr/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/