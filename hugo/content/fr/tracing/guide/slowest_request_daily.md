---
title: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web

further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: "3\_minutes"
    text: Être alerté en cas de latence au 99e centile anormale pour un service de base de données
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: "2\_minutes"
    text: Comparer la latence d'un service avec celle de la semaine précédente
  - link: /tracing/guide/apm_dashboard/
    tag: "4\_minutes"
    text: Créer un dashboard pour suivre et corréler les métriques APM
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: "7\_minutes"
    text: Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 3 minutes_

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1.mp4" video="true" alt="Identifier la trace la plus lente et trouver ses métriques de host" style="width:90%;">}}

Avec l'APM Datadog, vous pouvez examiner les performances de vos endpoints, identifier les requêtes lentes et trouver l'origine des problèmes de latence. Cet exemple permet d'identifier la [trace][1] la plus lente de la journée pour un endpoint de paiement d'une plateforme e-commerce et d'attribuer l'origine de ce ralentissement à une charge processeur élevée.

1. **Ouvrez la [page Services][2]**.

    Cette page affiche la liste de tous les [services][3] instrumentés disponibles dans l'APM Datadog. Notez que vous pouvez rechercher des mots clés, filtrer par `env-tag` et définir la chronologie.

2. **Recherchez un service web pertinent et actif, puis ouvrez la page Service**.

    Cet exemple s'intéresse au service web-store, car il s'agit du serveur principal parmi l'ensemble des ressources et qu'il contrôle la plupart des appels aux services tiers.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2.png" alt="Identifier la trace la plus lente et identifier le goulot d'étranglement à son origine" style="width:90%;">}}

    En plus d'afficher le débit, la latence et le taux d'erreur, la page Service contient une liste des ressources (opérations principales comme les endpoints d'API, les requêtes SQL et les requêtes web) identifiées pour le service.

3. **Triez le tableau des ressources selon la p99 latency (latence au 99e centile)** et cliquez sur la ressource la plus lente.
   **Remarque** : si vous ne voyez pas la colonne p99 latency, cliquez sur l'icône en forme d'engrenage `Change Columns` et activez l'option `p99`.

    La page [Ressource][4] affiche les métriques de haut niveau sur cette ressource, telles que le débit, la latence et le taux d'erreur, ainsi que la répartition de la latence en fonction des différents services en aval de la ressource. De plus, elle affiche les [traces][1] spécifiques qui traversent la ressource et une vue agrégée des [spans][5] qui composent ces traces.

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3.png" alt="Identifier la trace la plus lente et identifier le goulot d'étranglement à son origine" style="width:90%;">}}

4. Définissez le filtre d'intervalle sur `1d One Day`. Faites défiler la page vers le bas jusqu'au tableau des traces et **filtrez-le par durée**. Ensuite, passez votre curseur sur la première trace dans le tableau et cliquez sur **View Trace**

    Le Flamegraph et des informations connexes apparaissent alors. C'est ici que vous pouvez consulter la durée de chaque étape dans la trace et vérifier la présence d'anomalies. Cela facilite l'identification des composants lents ou à l'origine d'un grand nombre d'erreurs. Vous pouvez agrandir, faire défiler et explorer le Flamegraph comme bon vous semble. Les métadonnées, les logs et les informations sur le host associés s'affichent sous le Flamegraph.

    Le Flamegraph est idéal pour identifier précisément quelle partie de votre stack est à l'origine d'erreurs ou d'une latence élevée. Les erreurs sont surlignées en rouge, et la durée est représentée par la longueur horizontale de la span. Les spans les plus longues sont donc les plus lentes. Consultez le [guide sur la Vue Trace][6] pour en savoir plus sur l'utilisation du Flamegraph.

    Sous le Flamegraph, la liste de tous les tags (y compris des [tags custom][7]) s'affiche. De là, vous pouvez également voir les logs associés (si vous avez [connecté les logs à vos traces][8]) et les informations sur le host, comme l'utilisation de la mémoire et du processeur.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4.png" alt="Identifier la trace la plus lente et identifier le goulot d'étranglement à son origine" style="width:90%;">}}

5. **Cliquez sur l'onglet Host** pour consulter les performances du processeur et de la mémoire du host sous-jacent au moment de la requête.
6. **Cliquez sur Open Host Dashboard** pour consulter toutes les données pertinentes sur le host.

L'APM Datadog prend automatiquement en compte les autres informations et métriques de Datadog, telles que les métriques d'infrastructure et les logs. Le Flamegraph vous donne accès à ces informations ainsi qu'à toutes les [métadonnées personnalisées][7] que vous envoyez avec vos traces.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: https://app.datadoghq.com/apm/services
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/visualization/#resources
[5]: /fr/tracing/visualization/#spans
[6]: /fr/tracing/visualization/trace/?tab=spanmetadata
[7]: /fr/tracing/guide/adding_metadata_to_spans/
[8]: /fr/tracing/connect_logs_and_traces/