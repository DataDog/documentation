---
aliases:
- /fr/tracing/visualization/resource/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing d'APM avec votre application
- link: /tracing/services/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
title: Page Ressource
---

{{< img src="tracing/visualization/resource/ressource.png" alt="Ressource"  >}}

Une ressource est une action particulière pour un [service][1] donné (généralement, un endpoint ou une requête). Découvrez davantage d'informations sur les ressources sur la page [Débuter avec l'APM][2]. Pour chaque ressource, l'APM génère automatiquement une page de dashboard avec les éléments suivants :

* Métriques de santé clés
* Le statut de tous les monitors associés à ce service
* La liste et les métriques pour toutes les ressources associées à ce service

## Graphiques prêts à l'emploi

Datadog fournit des graphiques prêts à l'emploi pour chaque ressource :

* Requêtes - Choisissez si vous voulez afficher :
    *  Le **nombre total de requêtes**
    *  Le nombre de **requêtes par seconde**
* Latence - Choisissez si vous voulez afficher :
    *  La latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées
* Erreur - Choisissez si vous voulez afficher :
    * Le **nombre total d'erreurs**
    * Le nombre **d'erreurs par seconde**
    * Le **taux d'erreur en %**
* Sous-services : lorsque plusieurs services sont impliqués, un quatrième graphique est disponible. Il présente la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total/relatif/moyen passé par les [traces][3] du service actuel par rapport aux autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui sont des opérations « finales » qui n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Graphiques par défaut des ressources" style="width:90%;">}}

### Exporter un graphique dans un dashboard

En haut à droite de chaque graphique, cliquez sur la flèche vers le haut pour exporter votre graphique dans un [dashboard][4] existant :

### Distribution de la latence

La page ressource affiche également un graphique représentant la distribution des latences sur les ressources :

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Distribution de la latence"  style="width:100%;">}}

Utilisez les sélecteurs en haut à droite pour zoomer sur un centile donné, ou passez votre curseur sur la barre latérale pour voir les marqueurs de centile.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="Sélecteur de distribution de la latence"  style="width:50%;">}}

## Carte des dépendances

Vous pouvez également consulter une carte représentant l'ensemble des dépendances de service en amont et en aval d'une ressource. Cette carte vous permet de visualiser en quelques secondes le flux de services dont les spans passent par une ressource précise (comme des endpoints ou des requêtes de base de données), avec une vue de bout en bout.

La carte des dépendances n'est disponible que pour les ressources contenant des spans d'entrée de service.

{{<img alt="resource dependency map" src="tracing/visualization/resource/resource_dependency_map.png" style="width:100%;">}}

Passez le curseur sur un nœud pour afficher les métriques de chaque service, notamment le nombre de métriques par seconde, le taux d'erreur et la latence moyenne.

La couleur en regard de chaque nœud représente le [statut du monitor][5] du service. Si plusieurs monitors ont été configurés pour un service, le statut du monitor avec la gravité la plus forte est indiqué.

{{<img src="tracing/visualization/resource/resource_dependency_map_hover.mp4" video="true" alt="Utilisateur passant son curseur sur un nœud de la carte des dépendances d'une ressource et cliquant dessus" style="width:100%;">}}

Cliquez sur un nœud pour ouvrir un menu contextuel. Celui-ci vous permet de consulter la page Service, les traces associées, et plus encore.

## Résumé des spans

Vous pouvez consulter une analyse détaillée des [spans][6] d'une ressource donnée pour toutes les traces correspondantes :

{{< img src="tracing/visualization/resource/span_stats.png" alt="Statistiques des spans" style="width:80%;">}}

Voici la signification des métriques affichées pour chaque span :

`Avg Spans/trace`
: Le nombre moyen d'occurrences de la span pour les traces qui incluent la ressource actuelle et où la span est présente au moins une fois.

`% of Traces`
: Le pourcentage de traces qui incluent la ressource actuelle et où la span est présente au moins une fois.

`Avg Duration`
: La durée moyenne de la span pour les traces qui incluent la ressource actuelle et où la span est présente au moins une fois.

`Avg % Exec Time`
: Le pourcentage de temps d'exécution moyen pendant lequel la span est active pour les traces qui incluent la ressource actuelle et où la span est présente au moins une fois.

**Remarque** : une span est considérée comme active lorsqu'elle n'attend pas la fin d'une span enfant. Les spans actives à un moment donné et pour une trace donnée regroupent toutes les spans terminales (c'est-à-dire les spans sans enfants).

Le tableau Span Summary n'est disponible que pour les ressources contenant des spans d'entrée de service.

## Traces

Consultez la liste des [traces][7] associées à cette ressource dans la fenêtre contextuelle de [recherche de traces][8]. Un filtre correspondant à votre environnement, service, opération et nom de ressource est automatiquement appliqué :

{{< img src="tracing/visualization/resource/traces_list.png" alt="Liste de traces"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#services
[2]: /fr/tracing/glossary/
[3]: /fr/tracing/glossary/#trace
[4]: /fr/dashboards/
[5]: /fr/monitors/manage/status/
[6]: /fr/tracing/glossary/#spans
[7]: /fr/tracing/trace_explorer/trace_view/
[8]: /fr/tracing/search/