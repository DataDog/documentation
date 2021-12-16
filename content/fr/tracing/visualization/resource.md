---
title: Page Ressource
kind: documentation
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
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
* Sous-services : lorsque plusieurs services sont impliqués, un quatrième graphique est disponible. Il décrit la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total/relatif/moyen passé par les [traces][3] du service actuel par rapport aux autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui sont des opérations « finales » qui n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Graphiques par défaut des ressources" style="width:90%;">}}

### Exporter un graphique dans un timeboard

En haut à droite de chaque graphique, cliquez sur la flèche vers le haut pour exporter votre graphique dans un [timeboard][4] existant :

### Distribution de la latence

La page ressource affiche également un graphique représentant la distribution des latences sur les ressources :

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Distribution de la latence"  style="width:100%;">}}

Utilisez les sélecteurs en haut à droite pour zoomer sur un centile donné, ou passez votre curseur sur la barre latérale pour voir les marqueurs de centile.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="Sélecteur de distribution de la latence"  style="width:50%;">}}

## Résumé des spans

Vous pouvez consulter une analyse détaillée des [spans][5] d'une ressource donnée pour toutes les traces correspondantes :

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

## Traces

Consultez la liste des [traces][6] associées à cette ressource dans la fenêtre contextuelle de [recherche de traces][7]. Un filtre correspondant à votre environnement, service, opération et nom de ressource est automatiquement appliqué.

{{< img src="tracing/visualization/resource/traces_list.png" alt="Liste de traces"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#services
[2]: /fr/tracing/visualization/
[3]: /fr/tracing/visualization/#trace
[4]: /fr/dashboards/timeboard/
[5]: /fr/tracing/visualization/#spans
[6]: /fr/tracing/visualization/trace/
[7]: /fr/tracing/search/