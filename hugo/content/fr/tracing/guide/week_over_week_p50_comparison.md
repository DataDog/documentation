---
title: Comparer la latence d'un service avec celle de la semaine précédente

further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: "3\_minutes"
    text: Être alerté en cas de latence au 99e centile anormale pour un service de base de données
  - link: /tracing/guide/apm_dashboard/
    tag: "4\_minutes"
    text: Créer un dashboard pour suivre et corréler les métriques APM
  - link: /tracing/guide/slowest_request_daily/
    tag: "3\_minutes"
    text: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: "7\_minutes"
    text: Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 2 minutes_

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3.mp4" alt="vidéo de comparaison" video="true" style="width:90%;">}}

Datadog peut vous montrer l'évolution de la latence de votre application dans le temps et comparer la latence actuelle à celle mesurée à des instants similaires dans un intervalle donné, tel qu'une semaine ou un mois. Cet exemple s'intéresse à un serveur web pour une plate-forme e-commerce et surveille la latence mesurée sur le serveur au cours du dernier mois.

1. **Ouvrez la [page Service List][1]**.

    Cette page affiche la liste de tous les [services][2] instrumentés disponibles dans l'APM Datadog. Vous pouvez rechercher vos services par mots clés, les filtrer par tag `env` et définir la chronologie.
2. **Recherchez et ouvrez un service pertinent et actif**.

    Cet exemple repose sur le service web-store, car il s'agit d'un service stable. Il permet de vérifier l'absence de problèmes durant le mois passé.

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2.png" alt="comparaison 2" style="width:90%;">}}

    La page Service s'affiche lorsque vous cliquez sur un service de votre stack qui est disponible dans l'APM Datadog. Elle vous permet de visualiser des analyses approfondies du débit, de la latence (y compris la distribution par centiles) et des erreurs, ainsi qu'un résumé des monitors Datadog actifs pour le [service][2] et une liste détaillée des [ressources][3] associées au service.

3. **Recherchez le graphique de latence** dans la partie supérieure du dashboard du service et décochez tous les centiles de la légende, sauf l'option p50. Ensuite, **développez le graphique de latence** pour l'afficher en mode plein écran et visualiser une analyse plus complète.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3.png" alt="Vue complète du graphique de latence avec comparaison par rapport à la semaine précédente" style="width:90%;">}}

    L'APM Datadog vous permet de comparer les différents centiles de latence pour le service dans le temps, mais aussi de visualiser la distribution complète des mesures de latence dans le graphique de distribution ci-dessous.

4. **Ajoutez les mesures au 50e centile de la semaine précédente** en cochant l'option `Week` dans la section *Compare to Last* sur la droite.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="Vue complète du graphique de latence avec comparaison par rapport à la semaine précédente"  style="width:90%;">}}

**Remarque** : pour une analyse encore plus poussée, vous pouvez exporter ce graphique vers n'importe quel dashboard depuis la vue du service afin de visualiser ces données en même temps que n'importe quel autre graphique généré dans Datadog, tel qu'un graphique de vos métriques custom, des informations sur le host ou de vos logs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/tracing/visualization/#services
[3]: /fr/tracing/visualization/#resources