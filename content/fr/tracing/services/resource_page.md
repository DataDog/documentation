---
aliases:
- /fr/tracing/visualization/resource/
further_reading:
- link: https://www.datadoghq.com/blog/dependency-map-navigator/
  tag: Blog
  text: Identifier les problèmes de performance dans vos services en aval avec le
    navigateur de la carte des dépendances
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing APM avec votre application
- link: /tracing/service_catalog/
  tag: Documentation
  text: Découvrir et cataloguer les services transmettant des données à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Apprendre à lire une trace Datadog
title: Page Ressource
---

{{< img src="tracing/visualization/resource/resource-page-cropped.png" alt="La page ressource dans APM affichant le statut des monitors et les tendances des métriques clés" >}}

Une ressource est une action particulière pour un [service][1] donné (généralement, un endpoint ou une requête). Découvrez davantage d'informations sur les ressources sur la page [Débuter avec l'APM][2]. Pour chaque ressource, l'APM génère automatiquement une page de dashboard avec les éléments suivants :

* Métriques de santé clés
* Le statut de tous les monitors associés à ce service
* La liste des métriques pour toutes les ressources associées à ce service

## Graphiques prêts à l'emploi

Datadog fournit des graphiques prêts à l'emploi pour chaque ressource :

* Requêtes  – Choisissez d'afficher :
    *  Le **nombre total de requêtes**
    *  Le nombre de **requêtes par seconde**
* Latence – Choisissez d'afficher :
    *  La moyenne, le 75e centile, le 90e centile, le 95e centile, le 99e centile ou la valeur maximale de la latence de vos requêtes tracées
* Erreurs – Choisissez d'afficher :
    * Le **nombre total d'erreurs**
    * Le nombre **d'erreurs par seconde**
    * Le **taux d'erreur en %**
* Sous-services : lorsque plusieurs services sont impliqués, un quatrième graphique est disponible. Il présente la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total/relatif/moyen passé par les [traces][3] du service actuel par rapport aux autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui mettent fin au processus et n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Graphiques de ressources prêts à l'emploi affichant les requêtes par seconde, la latence, le nombre total d'erreurs et le pourcentage de temps passé par service" style="width:90%;">}}

### Exporter un graphique dans un dashboard

En haut à droite de chaque graphique, cliquez sur la flèche vers le haut pour exporter votre graphique dans un [dashboard][4] existant :

### Distribution de la latence

La page ressource affiche également un graphique représentant la distribution des latences sur les ressources :

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Graphique de distribution des latences affichant la distribution du temps consacré à chaque requête de ressource" style="width:100%;">}}

Utilisez les sélecteurs en haut à droite pour zoomer sur un centile donné, ou passez votre curseur sur la barre latérale pour voir les marqueurs de centile.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="Vue rapprochée de la barre latérale du graphique de distribution des latences, qui permet de filtrer en fonction des centiles" style="width:50%;">}}

## Navigateur de la carte des dépendances

Vous pouvez également consulter une carte représentant l'ensemble des dépendances de service en amont et en aval d'une ressource. Le navigateur de la carte des dépendances vous permet de visualiser en quelques secondes le flux des différents services dont les spans passent par une ressource spécifique (comme un endpoint ou une requête de base de données), ainsi que le nombre de requêtes associées.

La carte est générée en fonction d'un échantillon de spans ingérées, cet échantillon étant constitué au moyen d'un algorithme d'échantillonnage fixe qui prend en compte la structure des traces. L'algorithme d'échantillonnage n'est pas configurable et n'est pas affecté par les paramètres d'ingestion.

La carte des dépendances est uniquement disponible pour les ressources contenant des spans d'entrée de service.

{{< img src="tracing/visualization/resource/dependency-map-navigator-cropped.png" alt="Carte des dépendances pour une ressource donnée, avec la liste des dépendances de service et un diagramme de flux représentant les requêtes d'un service à l'autre" style="width:100%;" >}}

Passez votre curseur sur un nœud pour afficher les métriques de chaque service, notamment le nombre de requêtes par seconde, le taux d'erreur et la latence moyenne. Cliquez sur un nœud pour ouvrir un menu contextuel qui vous permettra de consulter la page Service, les traces associées, et plus encore.

Chaque nœud est affiché dans une certaine couleur en fonction du [statut du monitor][5] du service. Si plusieurs monitors ont été configurés pour un service, le statut du monitor avec la gravité la plus forte est indiqué.

{{< img src="tracing/visualization/resource/dependency-navigator-cropped.mp4" video="true" alt="Une vidéo montrant la sélection d'un service dans la liste des dépendances pour visualiser le flux des requêtes reçues et émises par ce service" style="width:100%;" >}}

### Amplification de la charge

Lorsqu'un service reçoit plus de 100 % des requêtes reçues par la ressource en amont sélectionnée, on dit que sa charge est amplifiée. Cette amplification est représentée par la couleur orange dans le chemin des appels, et le coefficient d'amplification est indiqué dans la liste sur la gauche. L'amplification est calculée en fonction du nombre de requêtes reçues par la ressource (en surbrillance sur la carte dans l'image ci-dessous) et du nombre de requêtes reçues par le service en aval (indiqué à l'intérieur du nœud du service en aval sur la carte). Vous pouvez consulter les spans contribuant à l'amplification en cliquant sur un service dans la liste.

{{< img src="tracing/visualization/resource/dependency-map-requests-cropped.png" alt="Carte des dépendances affichant le flux des requêtes reçues et émises par une ressource donnée, ainsi que le nombre de requêtes associées à cette ressource" style="width:100%;" >}}


## Résumé des spans

Vous pouvez consulter une analyse détaillée des [spans][6] d'une ressource donnée pour toutes les traces correspondantes :

{{< img src="tracing/visualization/resource/span_stats.png" alt="Tableau affichant plusieurs métriques clés pour une liste de spans associées à une ressource donnée" style="width:80%;">}}

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

{{< img src="tracing/visualization/resource/traces_list.png" alt="Liste de traces associées à une ressource donnée qui indique le timestamp, la durée, le statut et la répartition de la latence pour chaque trace" style="width:90%;">}}

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
