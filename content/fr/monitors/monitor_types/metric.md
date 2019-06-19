---
title: Monitor de métrique
kind: documentation
description: Comparer les valeurs d'une métrique avec un seuil défini par un utilisateur
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Configuration

1. Choisissez la méthode de détection.
    {{< img src="monitors/monitor_types/metric/alert_type.png" alt="type d'alerte" responsive="true" >}}

    Une **[alerte de seuil][1]** compare la valeur durant l'intervalle sélectionné par rapport à un seuil donné. D'autres options peuvent être configurées dans la section des conditions d'alertes. C'est une alerte standard vous permettant de connaître les valeurs inattendues.

    Une **[alerte de changement][1]** compare le changement exprimé en valeur absolue ou en pourcentage entre des valeurs actuelles et des valeurs historiques par rapport à un seuil donné. Les points de données comparés ne sont pas des points uniques, mais sont calculés à l'aide des paramètres dans la section des *conditions d'alerte*.

    Ce type d'alerte est utile pour suivre les pics et baisses brusques, ainsi que les changements progressifs d'une métrique lorsque vous ne disposez pas d'un seuil exact pour un comportement « inattendu ».
    *Remarque* : la valeur calculée n'est pas une valeur absolue. Elle est donc négative en cas de baisse.

    La **[détection d'anomalies][2]** est une fonction algorithmique qui vous permet d'identifier un comportement anormal d'une métrique en fonction de ses données historiques, comme les tendances et les variations saisonnières en fonction du jour de la semaine ou de l'heure. Cette fonctionnalité convient aux métriques qui possèdent de fortes tendances et des modèles récurrents qui sont difficiles voire impossibles à surveiller avec des alertes de seuil.

    La **[détection de singularités][3]** est une fonction algorithmique qui vous permet d'identifier lorsque certains membres d'un groupe affichent un comportement anormal par rapport à celui des autres. Par exemple, vous pouvez détecter qu'un serveur Web d'un pool traite un nombre de requêtes inhabituel et devrait, de ce fait, être remplacé. Vous pouvez également être prévenu en avance en cas d'une forte augmentation du nombre d'erreurs 500 dans une zone de disponibilité AWS par rapport aux autres zones, ce qui peut indiquer une défaillance au niveau de cette zone.

    Les **[prévisions][4]** sont une fonctionnalité algorithmique qui vous permet de prédire le comportement futur d'une métrique. Elles sont particulièrement utiles pour les métriques qui possèdent de fortes tendances ou des modèles récurrents.

2. Sélectionnez la métrique et le contexte que vous souhaitez surveiller.
  {{< img src="monitors/monitor_types/metric/metric_scope.png" alt="contexte métrique" responsive="true" >}}
  Des monitors peuvent être créés sur n'importe quelle métrique actuellement envoyée à Datadog.

3. Sélectionnez le groupe d'alertes.
    {{< img src="monitors/monitor_types/metric/alert_grouping.png" alt="groupe d'alertes" responsive="true" >}}

    Une **alerte simple** agrège vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies ci-dessous. Ces alertes sont particulièrement utiles pour surveiller une métrique depuis un seul host, comme la moyenne `avg` de `system.cpu.iowait` sur `host:bits`, ou pour une métrique agrégée sur de nombreux hosts, comme la somme `sum` de `nginx.bytes.net` sur `region:us-east`.

    Les **alertes multiples** appliquent l'alerte à chaque source, conformément aux paramètres de votre groupe. Par exemple, pour une alerte relative à l'espace disque, vous pouvez effectuer un regroupement par host et appareil, en créant la requête suivante :

        avg:system.disk.in_use{*} by {host,device}

    Cela déclenche une alerte distincte pour chaque appareil sur chaque host qui manque d'espace.

4.  Sélectionnez les conditions d'alerte :

  * Les options de **seuil** varient légèrement en fonction du type d'alerte souhaité. Dans tous les cas, indiquez un seuil et un type de comparaison basés sur votre métrique. À mesure que vous modifiez le seuil, le graphique se met à jour en affichant le point limite.
  {{< img src="monitors/monitor_types/metric/metric_threshold.png" alt="seuil de métrique" responsive="true" >}}
  Vous pouvez saisir des valeurs mises en forme en fonction de la métrique. Par exemple, vous pouvez saisir le seuil `20GB` pour `system.disk.used`.
  Pour une **alerte de seuil**, vous pouvez choisir une *agrégation temporelle* des données. Le moteur d'alertes génère une série unique et effectue l'agrégation sélectionnée.
  Vous trouverez ci-dessous une explication de chaque option :

    * **on average** : la moyenne de la série est calculée afin de générer une valeur unique, qui est ensuite comparée au seuil. Cette option ajoute les [fonctions][5] `avg()` au début de la requête de votre monitor.

    * **at least once** : si une valeur dans la série générée dépasse le seuil, une alerte est alors déclenchée. Cette option ajoute une [fonction][5] au début de la requête de votre monitor en fonction de votre sélection : `min()` pour une valeur inférieure ou `max()` pour une valeur supérieure.

    * **at all times** : si chaque point de la série générée dépasse le seuil, une alerte est alors déclenchée. Cette option ajoute une [fonction][5] au début de la requête de votre monitor en fonction de votre sélection : `min()` pour des valeurs supérieures ou `max()` pour des valeurs inférieures.

    * **in total** : si la somme de tous les points de la série dépasse le seuil, une alerte est alors déclenchée. Cette option ajoute les [fonctions][5] `sum()` au début de la requête de votre monitor.

  - Lorsque vous sélectionnez l'option **change alert** pour une alerte de changement, vous pouvez configurer les paramètres supplémentaires suivants :

    -  L'option *change* correspond à un changement absolu de la valeur, tandis que l'option *% change* correspond au pourcentage de changement de votre valeur par rapport à sa valeur précédente (par exemple, si la valeur était de 2 et qu'elle est maintenant de 4, le *% change* est de 100 %).
    - Comparez le changement de la valeur pendant un intervalle donné en sélectionnant la période pour laquelle vous souhaitez effectuer la comparaison. Elle peut varier de 5 minutes à 2 jours.
    - Comme pour l'**alerte de seuil**, utilisez les champs *time aggregation* et *time window* pour définir l'agrégation temporelle et l'intervalle à utiliser pour le calcul du changement.

    - Pour plus d'informations sur la configuration de la détection d'anomalies, consultez [le guide dédié][2].

    - Pour plus d'informations sur la configuration de la détection des singularités, consultez [le guide dédié][3].

5. Sélectionnez la durée **evaluation_delay** (en secondes) correspondant au délai avant l'évaluation (nombre entier non négatif). Par exemple, pour une valeur définie sur 300 (5 min), si l'intervalle est défini sur last_5m et s'il est 7 h, le monitor évalue les données de 6 h 50 à 6 h 55. Cette option s'avère très utile pour AWS CloudWatch et pour d'autres métriques renvoyées pour s'assurer que le monitor dispose toujours de données lors de l'évaluation.

6. Vous pouvez aussi choisir de recevoir une notification en l'absence de données, après une période configurable, à l'aide de l'option **notify on no data**. Cette période doit être au moins 2 fois supérieure à l'intervalle d'alerte. Par exemple, si vous définissez une alerte pour les données des 5 dernières minutes, vous devez alors attendre au moins 10 minutes avant de recevoir une notification de données manquantes.

**Remarque** : la durée de l'option No Data Alerts ne peut normalement pas dépasser 24 heures. Contactez l'assistance pour discuter de l'augmentation de cette valeur.

7. Choisissez ou non de résoudre automatiquement le monitor à partir d'un état déclenché grâce à l'option **automatically resolve the monitor from a triggered state**.
    Il est généralement conseillé de ne pas activer cette option, car vous souhaitez uniquement qu'une alerte soit résolue une fois qu'elle aura été corrigée.

    Cette option peut être utilisée lorsque vous disposez de très peu de counters, pour des erreurs, par exemple. Lorsque les erreurs arrêtent de se produire, la métrique n'est plus transmise. Cela empêche le monitor d'effectuer une résolution, car il n'y a plus de valeurs pour déclencher ladite résolution. Un [seuil d'annulation][6] peut également être défini.

8. Configurez vos **options de notification**. Reportez-vous à la page de la documentation relative aux [notifications][7] pour obtenir plus d'informations.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/metric
[2]: /fr/monitors/monitor_types/anomaly
[3]: /fr/monitors/monitor_types/outlier
[4]: /fr/monitors/monitor_types/forecasts
[5]: /fr/graphing/miscellaneous/functions
[6]: /fr/monitors/faq/what-are-recovery-thresholds
[7]: /fr/monitors/notifications