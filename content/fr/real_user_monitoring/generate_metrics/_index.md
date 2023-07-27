---
description: Créez des métriques custom à partir de vos événements RUM.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Apprendre à capturer des événements RUM depuis vos applications pour navigateur
    et mobile
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Découvrir comment créer des requêtes dans le RUM Explorer
- link: /real_user_monitoring/explorer/search/#event-types/
  tag: Documentation
  text: En savoir plus sur les types d'événements RUM
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentation
  text: Générer des métriques à partir de logs ingérés
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: GitHub
  text: Générer des métriques basées sur RUM pour suivre les tendances historiques
    relatives à l'expérience client
kind: documentation
title: Générer des métriques custom à partir d'événements RUM
---

## Présentation

La solution Real User Monitoring (RUM) vous permet de capturer les événements qui se produisent dans vos applications pour navigateur et mobile à l'aide des SDK RUM Datadog. Elle vous permet également de recueillir des données à partir d'événements en appliquant un certain [taux d'échantillonnage][1]. Datadog conserve ces données d'événement dans le [RUM Explorer][2], où vous pouvez créer des requêtes de recherche et des visualisations.

Les métriques custom basées sur RUM vous permettent de synthétiser à moindre coût les données associées à vos événements RUM. Vous pouvez visualiser les tendances ainsi que les anomalies dans vos données RUM à un niveau de granularité élevé sur une durée allant jusqu'à 15 mois.

**Remarque concernant la facturation :** les métriques créées à partir d'événements RUM sont facturées comme des [métriques custom][3].

## Créer une métrique custom basée sur RUM

Pour créer une métrique custom à partir de données d'événement RUM, accédez à [**UX Monitoring** > **Setup & Configuration** > **Generate Metrics**][4] et cliquez sur **+ New Metric**.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="Cliquez sur + New Metric pour créer une métrique custom basée sur RUM" width="80%" >}}

Pour créer une métrique custom à partir d'une requête de recherche dans le [RUM Explorer][5], cliquez sur le bouton **Export** et sélectionnez **Generate new metric** dans le menu déroulant.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Générer une métrique custom basée sur RUM" width="80%" >}}

1. Donnez un nom à votre [métrique custom][3] en vous assurant qu'il ne commence pas par `datadog.estimated_usage`, par exemple `rum.sessions.count_by_geography`. Pour en savoir plus, consultez la section [Convention de nommage][6].
2. Sélectionnez le type d'événement pour lequel vous souhaitez créer une métrique custom (par exemple : `Sessions`). Les options disponibles comprennent **Sessions**, **Views**, **Actions**, **Errors**, **Resources** et **Long Tasks**. Pour en savoir plus, consultez la section [Rechercher des événements RUM][7].
3. Créez une requête de recherche à l'aide de la [syntaxe de recherche][8] du RUM Explorer, telle que `@session.type:user`, afin de filtrer vos événements RUM.
4. Choisissez un champ à suivre dans le menu déroulant à côté de **Count**.

   - Sélectionnez `*` pour calculer le nombre d'événements RUM renvoyés par votre requête de recherche.
   - Vous pouvez également saisir un attribut d'événement tel que `@action.target` pour agréger une valeur numérique et créer une métrique `count` ou `distribution` correspondante.

   Si la facette utilisée pour l'attribut RUM est une mesure, la valeur de la métrique correspond à celle de l'attribut RUM.

5. Dans le menu déroulant à côté de **group by**, sélectionnez un chemin pour le regroupement. Le nom du tag de métriques correspond à l'attribut d'origine ou au nom du tag, mais sans le symbole `@`. Les métriques custom générées à partir des événements RUM ne contiennent aucun tag, sauf si vous avez explicitement choisi d'en ajouter. Pour créer des tags de métriques, utilisez une dimension d'attribut ou de tag déjà présente dans vos événements RUM, comme `@error.source` ou `env`.

   <div class="alert alert-warning">RUM-based custom metrics are considered as <a href="/metrics/custom_metrics/">custom metrics</a> and billed accordingly. Avoid grouping by unbounded or extremely high cardinality attributes such as timestamps, user IDs, request IDs, and session IDs.
   </div>

6. Pour les métriques custom créées à partir des sessions et des vues, sélectionnez **The active session/view starts matching the query** ou **The session/view becomes inactive or is completed** pour définir les sessions ou les vues à inclure. Pour en savoir plus, consultez la section [Ajouter une métrique basée sur RUM à partir des sessions et des vues](#ajouter-une-metrique-basee-sur-RUM-a-partir-des-sessions-et-des-vues).

7. Ajoutez des agrégations par centile pour les métriques de distribution. Vous pouvez activer les requêtes avancées et utiliser des centiles calculés à l'échelle globale (tels que P50, P75, P90, P95 et P99).

   <div class="alert alert-warning">L'activation des requêtes avancées avec centiles entraîne l'augmentation du nombre de <a href="/metrics/custom_metrics/">métriques custom</a> générées, ce qui <a href="/account_management/billing/custom_metrics/">affectera votre facture</a>.

8. Cliquez sur **Create Metric**.

Votre métrique custom basée sur RUM apparaît dans la liste en dessous de **Custom RUM Metrics**. Il est possible qu'elle mette un certain temps avant de s'afficher dans vos [dashboards][9] et vos [monitors][10].

Aucun point de données n'est créé pour les métriques qui comportent des données historiques. Pour votre métrique custom basée sur RUM, des points de données sont générés toutes les dix secondes. Les données de métriques sont conservées pendant 15 mois.

### Ajouter une métrique basée sur RUM à partir des sessions et des vues

Les sessions et les vues sont considérées comme actives si une application est en cours d'utilisation ou qu'un utilisateur est actif dans une application RUM. Par exemple, lorsqu'un utilisateur ouvre une nouvelle page, la vue de page est enregistrée dans la session utilisateur. Lorsqu'il clique sur un bouton, cette action est enregistrée dans la vue de page.

   Supposons que vous avez une métrique custom basée sur RUM qui calcule le nombre de sessions utilisateur ayant obtenu plus de cinq erreurs. Une session portant l'ID `123` a atteint cinq erreurs à 11 h et a pris fin à 12 h.

   - En comptabilisant la session ou la vue dès qu'elle correspond à la requête, vous incrémentez la valeur de la métrique count d'une unité au timestamp de 11 h.
   - En comptabilisant la session ou la vue inactive, vous incrémentez la valeur de la métrique count d'une unité au timestamp de 12 h.

## Gérer des métriques custom basées sur RUM

Vous pouvez générer une métrique count représentant le nombre d'événements RUM qui correspondent à une requête, ou une [métrique de distribution][11] représentant une valeur numérique contenue dans des événements RUM, comme la durée des requêtes.

### Modifier une métrique custom basée sur RUM

Pour modifier une métrique, passez votre curseur dessus et cliquez sur l'icône **Edit** en haut à droite.

- Filtre de requête : modifiez l'ensemble d'événements RUM correspondants qui sont agrégés en métriques.
- Groupes d'agréation : modifiez les tags afin de gérer la cardinalité des métriques générées
- Sélection de centiles : cliquez sur **Calculate percentiles** pour supprimer ou générer des métriques en centiles.

Puisqu'il est impossible de renommer une métrique existante, il est recommandé d'en créer une autre.

### Supprimer une métrique custom basée sur RUM

Pour que votre métrique custom ne génère plus de points de données et ne soit plus facturée, passez votre curseur sur une métrique et cliquez sur l'icône **Delete** en haut à droite.

## Utilisation

Les métriques custom basées sur RUM vous permettent d'accomplir ce qui suit :

- Visualiser les tendances sur une période définie dans un [dashboard][12]
- Déclencher une alerte lorsqu'une métrique se comporte de manière anormale dans un [monitor d'anomalie][13]
- Déclencher une alerte lorsqu'une métrique va franchir un seuil dans un [monitor de prévision][14]
- Créer des [SLO basés sur des métriques][15] pour suivre les objectifs de performance axés sur l'utilisateur de vos équipes et organisations

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/#browser-and-session-replay-sampling-configuration
[2]: https://app.datadoghq.com/rum/explorer
[3]: /fr/metrics/custom_metrics/
[4]: https://app.datadoghq.com/rum/generate-metrics
[5]: /fr/real_user_monitoring/explorer/
[6]: /fr/metrics/custom_metrics/#naming-custom-metrics
[7]: /fr/real_user_monitoring/explorer/search/#event-types
[8]: /fr/real_user_monitoring/explorer/search_syntax/
[9]: /fr/dashboards/
[10]: /fr/monitors/
[11]: /fr/metrics/distributions/
[12]: /fr/dashboards/querying/#configuring-a-graph
[13]: /fr/monitors/types/anomaly/
[14]: /fr/monitors/types/forecasts/
[15]: /fr/service_management/service_level_objectives/metric/