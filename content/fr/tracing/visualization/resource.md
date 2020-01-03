---
title: Page Ressource
kind: documentation
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
{{< img src="tracing/visualization/resource/ressource.png" alt="Ressource"  >}}

Une ressource est une action particulière pour un [service][1] donné (généralement, un endpoint ou une requête). Découvrez davantage d'informations sur les ressources sur la page [Débuter avec l'APM][2]. Pour chaque ressource, l'APM génère automatiquement une page de dashboard avec les éléments suivants :

* Métriques de santé clés
* Le statut de tous les monitors associés à ce service
* La liste et les métriques pour toutes les ressources associées à ce service

## Graphiques par défaut

Datadog fournit des graphiques par défaut pour chaque ressource :

* Requêtes - Choisissez si vous voulez afficher :
    *  Le **nombre total de requêtes**
    *  Le nombre de **requêtes par seconde**
* Latence - Choisissez si vous voulez afficher :
    *  La latence moyenne, au 75e centile, au 90e centile, au 95e centile, au 99e centile ou maximale de vos requêtes tracées
* Erreur - Choisissez si vous voulez afficher :
    * Le **nombre total d'erreurs**
    * Le nombre **d'erreurs par seconde**
    * Le **taux d'erreur en %**
* Sous-services : lorsque plusieurs services sont impliqués, un quatrième graphique est disponible. Il décrit la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total/relatif/moyen passé par les [traces][3] du service actuel par rapport aux autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui sont des opérations « finales » qui n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Graphiques par défaut des ressources"  style="width:90%;">}}

### Export to Timeboard

En haut à droite de chaque graphique, cliquez sur la flèche pour exporter votre graphique dans un [timeboard][4] existant :

{{< img src="tracing/visualization/resource/save_to_timeboard.png" alt="Enregistrer en tant que timeboard"  style="width:40%;">}}

### Distribution de la latence

Outre ces graphiques, vous disposez également d'un graphique de distribution de la latence sur les ressources :

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Distribution de la latence"  style="width:90%;">}}

Utilisez le sélecteur en haut à droite de ce graphique pour zoomer sur un centile donné de la distribution de latence :

{{< img src="tracing/visualization/service/latency_distribution_selector.png" alt="Sélection de distribution de latence"  style="width:20%;">}}

Zoomez sur ce graphique pour filtrer les traces correspondantes.

## Résumé des spans

Pour une ressource donnée, Datadog vous offre une analyse détaillée des [spans][5] pour toutes les traces correspondantes :

{{< img src="tracing/visualization/resource/span_stats.png" alt="Statistiques des spans"  style="width:80%;">}}

Les métriques affichées représentent, par span :

| Métrique            | Description                                                                                             |
| ------            | --------                                                                                                |
| `Avg Span/trace`  | Le nombre moyen d'occurrences de la span pour les traces qui incluent la ressource actuelle, où la span est présente au moins une fois. |
| `% of traces`     | Le pourcentage de traces qui incluent la ressource actuelle, où la span est présente au moins une fois. |
| `Avg duration`    | La durée moyenne de la span pour les traces qui incluent la ressource actuelle, où la span est présente au moins une fois.                |
| `Avg % Exec Time` | Le pourcentage de temps d'exécution moyen pendant lequel la span est active pour les traces qui incluent la ressource actuelle, où la span est présente au moins une fois. |

**Remarque** : un span est considéré comme actif lorsqu'il n'attend pas la fin d'un span enfant. Les spans actifs à un moment donné et pour une trace donnée regroupent tous les spans terminaux (c'est-à-dire les spans sans enfants).


## Traces

Consultez la liste des traces associées à cette ressource. Filtrez ou triez cette liste pour afficher les traces rapides/lentes et les traces avec ou sans erreur :

[Consultez la documentation relative aux traces pour en savoir plus][6].

{{< img src="tracing/visualization/resource/traces_list.png" alt="Liste des traces"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#services
[2]: /fr/tracing/visualization
[3]: /fr/tracing/visualization/#trace
[4]: /fr/graphing/dashboards/timeboard
[5]: /fr/tracing/visualization/#spans
[6]: /fr/tracing/visualization/trace