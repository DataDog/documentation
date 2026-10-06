---
aliases:
- /fr/real_user_monitoring/generate_metrics
description: Créez des métriques custom à partir de vos événements RUM
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Apprendre à capturer des événements RUM depuis vos applications pour navigateur
    et mobile
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Apprendre à créer des requêtes dans RUM Explorer
- link: /real_user_monitoring/explorer/search/#event-types
  tag: Documentation
  text: En savoir plus sur les types d'événements RUM
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentation
  text: Générer des métriques à partir de logs ingérés
- link: https://www.datadoghq.com/blog/track-customer-experience-with-rum-metrics/
  tag: Blog
  text: Générer des métriques basées sur RUM pour suivre les tendances historiques
    relatives à l'expérience client
title: Générer des Custom Metrics à partir des événements RUM
---
## Présentation {#overview}

Real User Monitoring (RUM) vous permet de capturer les événements qui se produisent dans votre navigateur et vos applications mobiles à l'aide des SDK Datadog RUM et de collecter des données à partir d'événements à un [taux d'échantillonnage][1]. Datadog conserve ces données d'événement dans le [RUM Explorer][2], où vous pouvez créer des requêtes de recherche et des visualisations.

Les métriques personnalisées basées sur RUM sont une option rentable pour résumer les données de votre ensemble d'événements RUM. Vous pouvez visualiser les tendances et les anomalies dans vos données RUM à un niveau granulaire jusqu'à 15 mois. Après avoir créé une métrique personnalisée, consultez [Créer des graphiques avec RUM Custom Metrics][17] pour l'ajouter à un dashboard.

**Remarque :** Les métriques personnalisées sont calculées sur la base de 100 % du trafic RUM ingéré, et non uniquement sur les données conservées dans le RUM Explorer. Cela garantit des métriques précises même lors de l'utilisation de filtres de rétention [RUM without Limits][16] qui peuvent ne conserver qu'un sous-ensemble de vos sessions.

**Remarque sur la facturation :** Les métriques créées à partir d'événements RUM sont facturées en tant que [Custom Metrics][3].

## Créer une métrique personnalisée basée sur RUM {#create-a-rum-based-custom-metric}

Pour créer une métrique personnalisée à partir de données d'événements RUM, accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}}][4] et cliquez sur {{< ui >}}\+ New Metric{{< /ui >}}.

{{< img src="real_user_monitoring/generate_metrics/new_metrics_button-2.png" alt="Cliquez sur + New Metric pour créer une métrique personnalisée basée sur RUM" width="80%" >}}

Pour créer une métrique personnalisée à partir d'une requête de recherche dans le [RUM Explorer][5], cliquez sur le bouton {{< ui >}}Export{{< /ui >}} et sélectionnez {{< ui >}}Generate new metric{{< /ui >}} dans le menu déroulant.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="Générer une métrique personnalisée basée sur RUM" width="80%" >}}

1. Donnez à votre [métrique personnalisée][3] un nom qui ne commence pas par `datadog.estimated_usage`, tel que `rum.sessions.count_by_geography`. Pour plus d'informations, consultez la [convention de nommage][6].
2. Sélectionnez un type d'événement pour lequel vous souhaitez créer une métrique personnalisée, tel que `Sessions`. Vos options incluent {{< ui >}}Sessions{{< /ui >}}, {{< ui >}}Views{{< /ui >}}, {{< ui >}}Actions{{< /ui >}}, {{< ui >}}Errors{{< /ui >}}, {{< ui >}}Resources{{< /ui >}} et {{< ui >}}Long Tasks{{< /ui >}}. Pour plus d'informations, consultez [Rechercher des événements RUM][7].
3. Créez une requête de recherche qui filtre vos événements RUM en utilisant la [syntaxe de recherche][8] du RUM Explorer, telle que `@session.type:user`. 
4. Choisissez un champ à suivre dans le menu déroulant à côté de {{< ui >}}Count{{< /ui >}}. 

   - Sélectionnez `*` pour générer un décompte de tous les événements RUM qui correspondent à votre requête de recherche. 
   - Optionnellement, saisissez un attribut d'événement tel que `@action.target` pour agréger une valeur numérique et créer une métrique `count` ou `distribution` correspondante. 

   Si la facette utilisée pour les attributs RUM est une mesure, la valeur de la métrique correspond à celle de l'attribut RUM.

5. Sélectionnez un chemin à regrouper par dans le menu déroulant à côté de {{< ui >}}group by{{< /ui >}}. Le nom du tag de métrique est l'attribut ou le nom de tag d'origine sans le `@`. Par défaut, les métriques personnalisées générées à partir d'événements RUM ne contiennent pas de tags à moins qu'ils ne soient explicitement ajoutés. Vous pouvez utiliser une dimension d'attribut ou de tag qui existe dans vos événements RUM, telle que `@error.source` ou `env`, pour créer des tags de métrique. 
   
   <div class="alert alert-danger">Les métriques personnalisées basées sur RUM sont considérées comme des <a href="/metrics/custom_metrics/">métriques personnalisées</a> et facturées en conséquence. Évitez de regrouper par des attributs non bornés ou à cardinalité extrêmement élevée tels que les horodatages, les ID utilisateur, les ID de requête et les ID de session.
   </div>

6. Pour les métriques personnalisées créées sur des sessions et des vues, sélectionnez {{< ui >}}The active session/view starts matching the query{{< /ui >}} ou {{< ui >}}The session/view becomes inactive or is completed{{< /ui >}} pour définir les critères de correspondance pour les sessions et les vues. Pour plus d'informations, consultez [Ajouter une métrique basée sur RUM pour les sessions et les vues](#add-a-rum-based-metric-on-sessions-and-views).

7. Optionnellement, ajoutez des agrégations de centiles pour les métriques de distribution. Consultez [Agrégation de centiles](#percentile-aggregation).

8. Cliquez sur {{< ui >}}Create Metric{{< /ui >}}.

Votre métrique personnalisée basée sur RUM apparaît dans la liste sous {{< ui >}}Custom RUM Metrics{{< /ui >}}, et un court délai peut être nécessaire pour que votre métrique soit disponible dans [dashboards][9] et [monitors][10]. 

Aucun point de données n'est créé pour les métriques avec des données historiques. Les points de données pour votre métrique personnalisée basée sur RUM sont générés à un intervalle de dix secondes. Les données des métriques sont conservées pendant 15 mois. 

### Agrégation de centiles {#percentile-aggregation}

Vous pouvez opter pour une fonctionnalité de requête avancée et utiliser des centiles globalement précis (tels que P50, P75, P90, P95 et P99) pour les métriques de distribution.

<div class="alert alert-danger">L'activation de la fonctionnalité de requête avancée avec des centiles génère davantage de <a href="/metrics/custom_metrics/">métriques personnalisées</a> et est <a href="/account_management/billing/custom_metrics/">facturée en conséquence</a>.</div>

### Ajoutez une métrique basée sur RUM pour les sessions et les vues {#add-a-rum-based-metric-on-sessions-and-views}

Les sessions et les vues sont considérées comme actives lorsqu'il y a une activité continue de l'application ou de l'utilisateur dans une application RUM. Par exemple, lorsqu'un utilisateur ouvre de nouvelles pages, ces pages vues sont collectées dans la session utilisateur. Lorsqu'un utilisateur interagit avec des boutons sur une page, ces actions sont collectées dans les pages vues.

   Supposons que vous ayez une métrique personnalisée basée sur le RUM qui compte le nombre de sessions utilisateur contenant plus de cinq erreurs, et un ID de session `123` qui atteint cinq erreurs à 11 h et se ferme à 12 h.

   - En comptabilisant la session ou la vue dès qu'elle correspond à la requête, vous incrémentez la valeur de la métrique de comptage de un à l'horodatage de 11 h.
   - En comptabilisant la session ou la vue qui est inactive, vous incrémentez la valeur de la métrique de comptage de un à l'horodatage de 12 h.

## Gérez les métriques personnalisées basées sur RUM {#manage-rum-based-custom-metrics}

Vous pouvez générer une métrique count représentant le nombre d'événements RUM qui correspondent à une requête, ou une [métrique de distribution][11] représentant une valeur numérique contenue dans des événements RUM, comme la durée des requêtes.

### Mettez à jour une métrique personnalisée basée sur RUM {#update-a-rum-based-custom-metric}

Pour mettre à jour une métrique, survolez une métrique et cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} dans le coin droit.

- Requête de filtrage : modifiez l'ensemble des événements RUM correspondants qui sont agrégés dans les métriques.
- Groupes d'agrégation : mettez à jour les tags pour gérer la cardinalité des métriques générées.
- Sélection de centile : cliquez sur le bouton {{< ui >}}Calculate percentiles{{< /ui >}} pour supprimer ou générer des métriques de centile.

Comme il est impossible de renommer une métrique existante, Datadog recommande d'en créer une autre.

### Supprimez une métrique personnalisée basée sur RUM {#delete-a-rum-based-custom-metric}

Afin d'arrêter le calcul des points de données de votre métrique personnalisée et la facturation, survolez une métrique et cliquez sur l'icône {{< ui >}}Delete{{< /ui >}} dans le coin droit. 

## Utilisation {#usage}

Vous pouvez utiliser des métriques custom basées sur RUM pour les actions suivantes :

- Visualisez les tendances sur une période donnée dans un [dashboard][12]
- Déclenchez une alerte lorsqu'une métrique se comporte différemment de ce qu'elle a fait par le passé dans un [monitor d'anomalie][13]
- Déclenchez une alerte lorsqu'une métrique est censée franchir un seuil à l'avenir dans un [monitor de prévision][14]
- Créez des [SLO basés sur des métriques][15] pour suivre les objectifs de performance centrés sur l'utilisateur pour vos équipes et organisations 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/guide/sampling-browser-plans
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
[15]: /fr/service_level_objectives/metric/
[16]: /fr/real_user_monitoring/rum_without_limits/
[17]: /fr/real_user_monitoring/guide/create-charts-with-rum-custom-metrics