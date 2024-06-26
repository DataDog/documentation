---
description: Visualisez les anomalies et singularités correspondant à votre requête
  de recherche grâce à Watchdog Insights.
further_reading:
- link: /logs/explorer/watchdog_insights/
  tag: Documentation
  text: Watchdog Insights pour les logs
- link: /real_user_monitoring/explorer/watchdog_insights/
  tag: Documentation
  text: Watchdog Insights pour RUM
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: Blog
  text: Optimisation du dépannage avec Watchdog Insights
- link: https://www.datadoghq.com/blog/watchdog-insights-apm/
  tag: Blog
  text: Détecter automatiquement les patterns d'erreur et de latence grâce à Watchdog Insights
    pour APM
kind: documentation
title: Watchdog Insights
---

## Présentation

Pour qu'une enquête sur un incident soit fructueuse, il ne faut pas avoir peur de faire des erreurs. Les ingénieurs chevronnés peuvent compter sur leur expérience dans un domaine spécifique pour déterminer le point de départ de leurs recherches. Grâce à Watchdog Insights, tous les ingénieurs, peu importe leur savoir-faire, peuvent se focaliser sur les données les plus importantes, afin d'accélérer le processus d'enquête.

Pour la plupart des fonctionnalités de Datadog, Watchdog fournit deux types d'insights :

- Des **anomalies** : il s'agit de l'ensemble des [alertes Watchdog][11] précalculées qui correspondent à la requête de recherche active. Ces alertes sont détectées par Watchdog suite à l'analyse des données de votre organisation. Accédez au [Watchdog Alert Explorer][12] pour consulter la liste complète des alertes.
- Des **singularités** : elles sont calculées sur la base des données des solutions correspondant à la requête active. Les anomalies révèlent les tags qui figurent trop souvent dans certains types d'événements (par exemple, des erreurs) ou qui augmentent la valeur de certaines métriques continues (par exemple, la latence).

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="Le Log Explorer affichant la bannière Watchdog Insights avec cinq anomalies dans les logs" style="width:100%;" >}}

## Explorer les insights

Le carrousel Watchdog apparaît en haut de la page des solutions suivantes :

- [Log Explorer][1]
- APM :
    - [Trace Explorer][2]
    - [Page Service][3]
    - [Page Ressource][4]
    - [Database Explorer][5]
    - [Profile Explorer][6]
- Infrastructure :
    - [Processes Explorer][7]
    - [Serverless Explorer][8]
    - [Kubernetes Explorer][9]
- [Real User Monitoring (RUM) Explorer][10]
- [Volet latéral des problèmes du suivi des erreurs][13]

Développez le carrousel pour afficher une vue d'ensemble. Les insights avec la priorité la plus élevée (en fonction de `Insight type`, `State`, `Status`, `Start time`, `Anomaly type`) sont affichés sur la gauche.

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="Le carrousel Watchdog Insights dans le Log Explorer, avec trois anomalies : les nouveaux logs d'erreur dans le service web-store, un pic de logs d'erreur dans le service product-recommendation et un autre pic de logs d'erreur dans le service product-recommendation" style="width:100%;">}}

Cliquez sur **View all** pour développer le volet. Un volet latéral s'ouvre alors sur la droite. Il contient une liste verticale des insights Watchdog. Chaque entrée comporte une vue détaillée, qui vous permet de consulter des informations supplémentaires ne figurant pas sur la fiche récapitulative.

Chaque singularité propose des interactions ainsi qu'un volet latéral affichant des informations de dépannage. Les interactions et le volet latéral varient en fonction du type d'insight Watchdog.

### Appliquer un filtre à une requête d'insight

Pour affiner votre vue actuelle afin d'afficher un insight Watchdog précis, passez votre curseur sur le coin supérieur droit d'une fiche récapitulative d'insight. Deux icônes s'affichent alors. Cliquez sur l'icône en forme de triangle inversé dont l'infobulle est **Filter on Insight**. La page s'actualise alors et affiche la liste des entrées correspondant à l'insight.

{{< img src="watchdog/filter_on_insight.png" alt="Filtrage de l'Explorer sur le contexte de l'insight" style="width:70%;">}}

### Partager une singularité

Pour partager une singularité précise, cliquez dessus dans le volet des insights. Cela ouvre alors un volet latéral comportant des détails. Cliquez sur le bouton **Copy Link** en haut du volet des détails :

{{< img src="watchdog/share-outlier.png" alt="Volet latéral d'une singularité avec l'option permettant de copier le lien" style="width:80%;">}}

Le lien vers la singularité est valable durant toute la période de rétention des données sous-jacentes. Par exemple, si les logs sur lesquels la singularité se base sont conservés pendant 15 jours, le lien expire après 15 jours.

## Types de singularités

{{< tabs >}}
{{% tab "Log Management" %}}

### Singularités sur des erreurs

Les singularités sur des erreurs affichent des champs, comme des [tags ou attributs à facettes][1], susceptibles d'indiquer des erreurs pour la requête actuelle. Les paires `key:value` qui sont statistiquement surreprésentées parmi les erreurs mettent en lumière les causes possibles d'un problème.

Voici quelques exemples de singularités sur des erreurs habituelles : `env:staging`, `docker_image:acme:3.1` et `http.useragent_details.browser.family:curl`.

Les informations suivantes sont accessibles depuis la fiche de la bannière :

  * Le nom du champ
  * La proportion du nombre total d'erreurs et de logs globaux associés au champ en question

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="La fiche « error outlier » affichant une barre rouge représentant 73,3 % des erreurs totales ainsi qu'une barre bleue représentant 8,31 % des erreurs totales" style="width:50%;" >}}

Les informations suivantes sont accessibles depuis le volet latéral développé :

  * La série temporelle pour les logs d'erreur associés au champ
  * Les tags généralement associés aux logs d'erreur
  * La liste complète des [patterns de log][2]

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="Volet latéral de la singularité sur des erreurs" style="width:100%;" >}}

[1]: /fr/logs/explorer/facets/
[2]: /fr/logs/explorer/analytics/patterns
{{% /tab %}}
{{% tab "APM" %}}

Les singularités APM sont accessibles depuis l'ensemble des pages APM sur lesquelles le carrousel Watchdog Insights est affiché :
 - [Trace Explorer](/tracing/trace_explorer/?tab=listview)
 - [Page Service](/tracing/services/service_page/)
 - [Page Ressource](/tracing/services/resource_page/)

### Singularités sur des erreurs

Les singularités sur des erreurs affichent des champs, comme des tags, susceptibles d'indiquer des erreurs pour la requête actuelle. Les paires `key:value` qui sont statistiquement surreprésentées parmi les erreurs mettent en lumière les causes possibles d'un problème.

Voici quelques exemples de singularités sur des erreurs habituelles : `env:staging`, `availability_zone:us-east-1a`, `cluster_name:chinook` et `version:v123456`.

Les informations suivantes sont accessibles depuis la fiche de la bannière :

  * Le nom du champ
  * La proportion du nombre total d'erreurs et de traces globales associées au champ en question

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_s_card.png" alt="La fiche « error outlier » affichant une barre rouge représentant 24,2 % des erreurs totales ainsi qu'une barre bleue représentant 12,1 % des erreurs totales" style="width:30%;" >}}

Les informations suivantes sont accessibles depuis le volet latéral développé :

  * La série temporelle pour les traces d'erreur associées au champ
  * Les tags généralement associés aux traces d'erreur
  * La liste complète des problèmes et spans ayant échoué en lien avec le suivi des erreurs

{{< img src="tracing/trace_explorer/watchdog_insights/error_outlier_side_panel.png" alt="Volet latéral de la singularité sur des erreurs" style="width:100%;" >}}

### Singularité sur la latence

Les singularités sur la latence affichent des champs, comme des tags, qui sont associés aux goulots d'étranglement pour la requête de recherche actuelle. Les paires `key:value` dont les performances sont inférieures à la référence mettent en lumière la nature des goulots d'étranglement parmi un sous-ensemble de spans APM.

Les singularités sur la latence sont calculées pour la durée de la span.

Les informations suivantes sont accessibles depuis la fiche de la bannière :

* Le nom du champ
* La distribution de la latence pour les spans contenant le tag et la référence pour le reste des données
* Un centile de la valeur de latence pertinente pour le tag de la singularité, et l'écart avec la référence pour le reste des données

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outliers_s_card.png" alt="Fiche de la bannière de singularité sur la latence" style="width:30%;" >}}

Le volet latéral développé comporte un graphique de distribution de la latence pour le tag ainsi que la référence. L'axe des abscisses est gradué avec les valeurs `p50`, `p75`, `p99` et `max`. La liste des événements APM contenant le champ est également affichée.

{{< img src="tracing/trace_explorer/watchdog_insights/latency_outlier_side_panel.png" alt="Volet latéral développé de la singularité sur la latence" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Profiling" %}}

### Singularité sur un conflit de verrouillage

Les informations suivantes sont accessibles depuis la fiche de la bannière :

  * Le nom du service concerné
  * Le nombre de threads impactés
  * Les gains potentiels de CPU (et une estimation des économies)

{{< img src="watchdog/small_card_profiling_lock_pressure.png" alt="Insight de profiling sur un conflit de verrouillage" style="width:50%;">}}

Le volet latéral développé contient des instructions vous permettant de résoudre le conflit de verrouillage :

{{< img src="watchdog/side_panel_profiling_lock_pressure.png" alt="Volet latéral comportant toutes les informations nécessaires pour corriger la singularité sur un conflit de verrouillage" style="width:100%;">}}

### Singularité sur le nettoyage de la mémoire

Les informations suivantes sont accessibles depuis la fiche de la bannière :

  * Le nom du service concerné
  * Le temps CPU consacré au nettoyage de la mémoire

{{< img src="watchdog/small_card_profiling_garbage_collection.png" alt="Insight de profiling sur le nettoyage de la mémoire" style="width:30%;">}}

Le volet latéral développé contient des instructions vous permettant d'améliorer la configuration du nettoyage de la mémoire, afin de solliciter moins longtemps le CPU :

{{< img src="watchdog/side_panel_profiling_garbage_collection.png" alt="Volet latéral comportant toutes les informations nécessaires pour corriger la singularité sur le nettoyage de la mémoire" style="width:100%;">}}

### Singularité sur la compilation des expressions régulières

Les informations suivantes sont accessibles depuis la fiche de la bannière :

  * Le nom du service concerné
  * Le temps CPU consacré à la compilation des expressions régulières

{{< img src="watchdog/small_card_profiling_regex_compilation.png" alt="Insight de profiling sur la compilation des expressions régulières" style="width:30%;">}}

Le volet latéral développé contient des instructions vous permettant de réduire la durée de compilation des expressions régulières, ainsi que des exemples de fonctions dans votre code pouvant être améliorées :

{{< img src="watchdog/side_panel_profiling_regex_compilation.png" alt="Volet latéral comportant toutes les informations nécessaires pour corriger la singularité sur la compilation d'expressions régulières" style="width:100%;">}}

{{% /tab %}}
{{% tab "Bases de données" %}}

Pour la solution Database Monitoring, Watchdog affiche des insights sur les métriques suivantes :

- `CPU`
- `Commits`
- `IO`
- `Background`
- `Concurrency`
- `Idle`

Utilisez le carrousel d'insights pour identifier les bases de données impactées par une ou plusieurs singularités.

{{< img src="watchdog/side_panel_dbm_insights.png" alt="Carrousel permettant de filtrer les bases de données pour lesquelles des insights sont disponibles" style="width:100%;">}}

Des données sont alors superposées aux bases de données. Un bouton rose indique les différents insights et fournit des informations supplémentaires sur l'activité à l'origine de la singularité.

{{< img src="watchdog/overlay_database_insight.png" alt="Superposition d'insights Watchdog sur la base de données permettant de mieux comprendre ce qui a généré la singularité" style="width:100%;">}}

{{% /tab %}}
{{% tab "RUM" %}}

### Singularités sur des erreurs

Les singularités sur des erreurs affichent des champs, comme des [tags ou attributs à facettes][3], susceptibles d'indiquer des erreurs pour la requête de recherche actuelle. Les paires `key:value` qui sont statistiquement surreprésentées parmi les erreurs mettent en lumière les causes possibles d'un problème. Voici quelques exemples de singularités sur des erreurs habituelles : `env:staging`, `version:1234` et `browser.name:Chrome`.

Les informations suivantes sont accessibles depuis la fiche de la bannière :

* Le nom du champ
* La proportion du nombre d'erreurs et d'événements RUM globaux associés au champ en question
* Tags associés

Le volet latéral développé comporte un graphique de série temporelle représentant le nombre total d'erreurs RUM avec le champ, des graphiques à secteurs illustrant l'impact, ainsi que la liste des événements RUM contenant le champ.

{{< img src="real_user_monitoring/explorer/watchdog_insights/error_outlier_side_panel-1.png" alt="Volet latéral développé d'une singularité sur des erreurs" style="width:100%;" >}}

### Singularités sur la latence

Les singularités sur la latence affichent des champs, comme des [tags ou attributs à facettes][1], qui sont associés aux goulots d'étranglement pour la requête de recherche actuelle. Les paires `key:value` dont les performances sont inférieures à la référence mettent en lumière la nature des goulots d'étranglement parmi un sous-ensemble d'utilisateurs réels.

Les singularités sur la latence sont calculées pour les [signaux Web essentiels][2], comme les mesures First Contentful Paint, First Input Delay, Cumulative Layout Shift, ainsi que pour la [durée de chargement][3]. Pour en savoir plus, consultez la section [Surveillance des performances de pages][2].

Les informations suivantes sont accessibles depuis la fiche de la bannière :

* Le nom du champ
* La valeur de la métrique de performance contenant le champ et la référence pour le reste des données

Le volet latéral développé comporte un graphique de série temporelle représentant la métrique de performance. L'axe des abscisses est gradué avec les valeurs `p50`, `p75`, `p99` et `max`. La liste des événements RUM contenant le champ est également affichée.

{{< img src="real_user_monitoring/explorer/watchdog_insights/latency_outlier_side_panel-1.png" alt="Volet latéral développé de la singularité sur la latence" style="width:100%;" >}}

[1]: /fr/real_user_monitoring/explorer/search/#facets
[2]: /fr/real_user_monitoring/browser/monitoring_page_performance/#core-web-vitals
[3]: /fr/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
{{% /tab %}}
{{% tab "Infrastructure sans serveur" %}}

Pour les infrastructures sans serveur, Watchdog affiche les insights suivants :

- `Cold Start Ratio Up/Down`
- `Error Invocation Ratio Up/Down`
- `Memory Usage Up/Down`
- `OOM Ratio Up/Down`
- `Estimated Cost Up/Down`
- `Init Duration Up/Down`
- `Runtime Duration Up/Down`

Utilisez le carrousel d'insights pour identifier les fonctions sans serveur impactées par une ou plusieurs singularités.

{{< img src="watchdog/side_panel_serverless_facet_insights.png" alt="Facette permettant de filtrer les fonctions sans serveur pour lesquelles des insights sont disponibles" style="width:30%;">}}

Des données sont alors superposées à la fonction. Un bouton rose indique les différents insights et fournit des informations supplémentaires sur l'activité à l'origine de la singularité.

{{< img src="watchdog/overlay_serverless_insight.png" alt="Superposition d'insights Watchdog sur la fonction permettant de mieux comprendre ce qui a généré la singularité" style="width:100%;">}}

[1]: /fr/serverless/guide/serverless_warnings/#errors
{{% /tab %}}
{{% tab "Processus" %}}

Pour le Process Explorer, le carrousel d'insights Watchdog affiche [toutes les anomalies sur des processus][1] pour le contexte actif du Process Explorer.

[1]: /fr/watchdog/#overview
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour le Kubernetes Explorer, le carrousel d'insights Watchdog affiche [toutes les anomalies Kubernetes][1] pour le contexte actif du Kubernetes Explorer.

[1]: /fr/watchdog/#overview
{{% /tab %}}
{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/apm/traces
[3]: /fr/tracing/services/service_page/
[4]: /fr/tracing/services/resource_page/
[5]: https://app.datadoghq.com/databases/list
[6]: https://app.datadoghq.com/profiling/search
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/functions
[9]: https://app.datadoghq.com/orchestration/overview/pod
[10]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aview
[11]: /fr/watchdog/#overview
[12]: https://app.datadoghq.com/watchdog
[13]: https://app.datadoghq.com/rum/error-tracking