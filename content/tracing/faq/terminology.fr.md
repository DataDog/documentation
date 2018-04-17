---
title: Terminologie
kind: faq
---

|Terme|Définition|Note|
|:----|:-----|:---|
|[Service][1]|Le nom d'un ensemble de processus qui font le même travail. Utilisé pour regrouper les statistiques pour votre application.| Les services sont affichés sur la  [Datadog Services list][2] et on un [ensemble de graphiques de performances par défaut][3].|
|[Ressource][4]|Action particulière pour un service|Les Ressources sont affichés sur la [Resources list][5] pour chaque Service  et on un [ensemble de graphiques de performances par défaut][6].|
|[Trace][7]|Représentation d'une requête telle qu'elle circule dans un système distribué.| Une trace peut être collectée dans [n'importe quelle language][8]. Les traces se trouvent dans la [Liste des traces pour chaque ressource][9] ou dans la page [Trace Search][10].|
|[Span][11] |Une unité de travail logique dans le système| Les Spans sont associées à un [service][1] et éventuellement une [ressource][4]. Chaque span comprend une heure de début, une durée et des optionnellement des tags.|

[1]: /tracing/visualization/service
[2]: /tracing/visualization/services_list/
[3]: /tracing/visualization/service/#out-of-the-box-graphs
[4]: /tracing/visualization/resource
[5]: /tracing/visualization/service/#resources
[6]: /tracing/visualization/resource/#out-of-the-box-graphs
[7]: /tracing/visualization/trace
[8]: /tracing/setup
[9]: /tracing/visualization/resource/#traces
[10]: /tracing/visualization/trace_search/
[11]: /tracing/visualization/trace/#spans
