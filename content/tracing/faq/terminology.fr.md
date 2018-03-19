---
title: Terminologie
kind: faq
---

|Terme|Définition|Note|
|:----|:-----|:---|
|[Service](/tracing/visualization/service)|Le nom d'un ensemble de processus qui font le même travail. Utilisé pour regrouper les statistiques pour votre application.| Les services sont affichés sur la  [Datadog Services list](/tracing/visualization/services_list/) et on un [ensemble de graphes de performances par défaut](/tracing/visualization/service/#out-of-the-box-graphs).|
|[Ressource](/tracing/visualization/resource)|Action particulière pour un service|Les Ressources sont affichés sur la [Resources list](/tracing/visualization/services_list/) pour chaque Service  et on un [ensemble de graphes de performances par défaut](/tracing/visualization/resource/#out-of-the-box-graphs).|
|[Trace](/tracing/visualization/trace)|Représentation d'une requête telle qu'elle circule dans un système distribué.| Une trace peut être collectée dans [n'importe quelle language](/tracing/setup). Les traces se trouvent dans la [Liste des traces pour chaque ressource](/tracing/visualization/resource/#traces) ou dans la page [Trace Search](/tracing/visualization/trace_search/).|
|[Span](/tracing/visualization/trace/#spans) |Une unité de travail logique dans le système| Les Spans sont associées à un [service](/tracing/visualization/service) et éventuellement une [ressource](/tracing/visualization/resource). Chaque span comprend une heure de début, une durée et des optionnellement des tags.|