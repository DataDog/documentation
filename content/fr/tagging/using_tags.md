---
title: Utiliser les tags
kind: documentation
aliases:
  - /fr/getting_started/tagging/using_tags/
further_reading:
  - link: tagging
    tag: Documentation
    text: Débuter avec les tags
  - link: tagging/assigning_tags
    tag: Documentation
    text: Apprendre à assigner des tags
---
Après avoir [assigné des tags][1], utilisez-les pour filtrer et regrouper vos données au sein de la plateforme Datadog. Les tags vous permettent d'inclure et d'exclure des données. Lorsque vous choisissez d'inclure ou d'exclure plusieurs tags :

* la fonction Include utilise la logique `AND` ;
* la fonction Exclude utilise la logique `OR`.

## Événements

Le [flux d'événements][2] affiche tous les événements qui se sont produits dans votre environnement au cours de l'intervalle spécifié. Utilisez des tags pour affiner la liste d'événements et étudier un sous-ensemble d'événements. Saisissez `tags:` suivi du nom d'un tag pour afficher tous les événements générés par un host ou une [intégration][3] qui possèdent ce tag. L'exemple ci-dessous permet de rechercher le tag `service:coffee-house` à l'aide de l'expression `tags:service:coffee-house`. Pour rechercher plusieurs tags, séparez chaque tag par une virgule : `tags:service:coffee-house,host:coffeehouseprod`.

{{< img src="tagging/using_tags/eventtags.png" alt="Liste d'événements et tags" responsive="true" style="width:80%;">}}

## Dashboards

{{< tabs >}}
{{% tab "Assignation" %}}

Utilisez des tags pour filtrer les métriques à afficher dans un [graphique de dashboard][1] ou pour créer des groupes agrégés de métriques à afficher. Pour filtrer les métriques, saisissez le tag dans la zone de texte **from**. Cela affiche les données de la métrique choisie fournies par toutes les sources qui possèdent ce tag (à savoir, `service:coffee-house` dans l'exemple ci-dessous).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags dans des dashboards avec la zone de texte from" responsive="true" style="width:80%;">}}

Pour créer un groupe agrégé à l'aide de tags, saisissez la clé du tag dans la zone de texte **avg by**. Par exemple, si vous disposez d'un graphique de séries temporelles présentant une métrique taguée avec la clé `service`, comme `service:coffee-house`, saisissez `service` dans la zone de texte **avg by** pour afficher une ligne pour chaque valeur de tag `service`. Chaque ligne représente la valeur moyenne de la métrique pour l'ensemble des sources qui partagent la valeur de tag `service`. 

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags dans des dashboards avec la zone de texte avg by" responsive="true" style="width:80%;">}}

Les tags peuvent également être utilisés pour superposer des événements sur un dashboard, comme dans le [flux d'événements][2].
Saisissez `tags:` suivi du nom du tag. Les événements correspondants sont superposés sous la forme de barres verticales dans le graphique. L'exemple ci-dessous utilise l'expression `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Superposition d'événements dans des dashboards" responsive="true" style="width:80%;">}}

Utilisez des [template variables][3] pour activer facilement le tag **from** sur les graphiques de votre dashboard. Dans l'exemple ci-dessous, `service` est utilisé pour représenter la clé de tag `service`. Ajoutez la template variable `$service` dans la zone de texte **from** de votre requête de graphique pour l'utiliser.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Template variables dashboard" responsive="true" style="width:80%;">}}


[1]: /fr/graphing/dashboards
[2]: /fr/graphing/event_stream
[3]: /fr/graphing/dashboards/template_variables
{{% /tab %}}
{{% tab "Exemples" %}}

Vous trouverez ci-dessous un exemple de tags avec l'éditeur de graphiques pour séries temporelles. Aucun tag n'a été appliqué dans la première capture d'écran. L'utilisation moyenne de processeur est donc affichée pour l'ensemble des hosts :

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" responsive="true" style="width:75%;">}}

Les informations de l'éditeur sont ensuite mises à jour afin d'inclure un tag (`region:eastus`) dans la zone de texte **from**. Cela permet à Datadog d'afficher l'utilisation de processeur sur l'ensemble de la région Est des États-Unis. Le tag `region` est utilisé à titre d'exemple : vous pouvez utiliser n'importe quel tag arbitraire transmis à votre plateforme Datadog, comme `application`, `service`, `environment`, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" responsive="true" style="width:75%;">}}

Enfin, le deuxième champ vide (la zone de texte **avg by**) est utilisé pour afficher une ligne de série temporelle pour chaque `host`. Le processeur du serveur est affiché pour chaque host exécuté dans la région Est des États-Unis.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" responsive="true" style="width:75%;">}}

Vous pouvez ajouter d'autres tags pour réduire davantage la portée, afin d'étudier par exemple les hosts dans `region:eastus` et `env:production`. Les tags peuvent être utilisés pour de nombreuses fonctionnalités de Datadog et appliqués à l'ensemble des éléments de base (métriques, traces et logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

Pour filtrer la [hostmap][4], [la liste d'infrastructures][5], les [conteneurs][6] et les [processus][7], saisissez un tag dans la zone de texte **Filter by** en haut de la page. Les hosts et conteneurs peuvent être regroupés par clé de tag à l'aide de la zone de texte **Group by**. Si vous saisissez `service` dans cette zone de texte, chaque service s'affiche sous la forme d'un en-tête de groupe.

{{< tabs >}}
{{% tab "Hostmap" %}}

Depuis cette section, utilisez des tags pour filtrer ou regrouper des hosts :

{{< img src="tagging/using_tags/hostmaptags.png" alt="Tags hostmap" responsive="true" style="width:80%;">}}

Ou des conteneurs :

{{< img src="tagging/using_tags/containermaptags.png" alt="Tags Map des conteneurs" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Liste d'infrastructures" %}}

Voici les zones de texte de filtrage et de regroupement de la page de la liste d'infrastructures :

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags de la liste d'infrastructures" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Conteneurs" %}}

Voici les zones de texte de filtrage et de regroupement de la page des live containers :

{{< img src="tagging/using_tags/livecontainertags.png" alt="Tags live containers" responsive="true" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processus" %}}

Voici les zones de texte de filtrage et de regroupement de la page des live processes :

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Tags live processes" responsive="true" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

{{< tabs >}}
{{% tab "Gérer les monitors" %}}

Pour filtrer des monitors en leur [assignant des tags][1], utilisez la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `tag:<KEY>:<VALUE>`. Indiquez par exemple `tag:service:coffee-house`. **Remarque** : les tags de monitor ne fonctionnent pas de la même façon que les tags de métrique.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Gérer les tags de monitor" responsive="true" style="width:80%;">}}


[1]: /fr/tagging/assigning_tags
{{% /tab %}}

{{% tab "Nouveau monitor" %}}

Lorsque vous créez un [monitor][1], utilisez les tags de métrique dans :

* la zone de texte **from**, afin de limiter la portée du monitor et d'inclure uniquement les métriques possédant les tags indiqués ;

* la zone de texte **excluding**, afin d'exclure les métriques correspondantes de la portée du monitor ;

* la zone de texte **avg by**, afin de transformer le monitor en un monitor à alertes multiples pour chaque valeur de tag.

{{< img src="tagging/using_tags/newmonitortags.png" alt="Tags nouveau monitor" responsive="true" style="width:80%;">}}


[1]: /fr/monitors/monitor_types
{{% /tab %}}
{{% tab "Gérer les downtimes" %}}

Pour filtrer les [downtimes][1] en fonction d'un tag de monitor, saisissez le nom du tag dans la barre de recherche, par exemple `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Gérer les tags de monitor" responsive="true" style="width:80%;">}}


[1]: /fr/monitors/downtimes
{{% /tab %}}
{{< /tabs >}}

## Métriques

Utilisez les tags dans [Metrics Explorer][8] pour filtrer les métriques en fonction de tags ou pour afficher plusieurs graphiques selon une clé de tag. L'exemple ci-dessous représente une métrique avec l'expression `service:coffee-house` et affiche un graphique par `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Gérer les tags de monitor" responsive="true" style="width:80%;">}}

## Intégrations

Certaines intégrations, comme celles pour [AWS][9], [Google Cloud][10] et [Azure][11], vous permettent de fixer des limites facultatives pour vos métriques à l'aide de tags. Dans le carré d'intégration pertinent, utilisez une liste de tags au format `<KEY>:<VALUE>` séparés par des virgules.

{{< img src="tagging/using_tags/integrationtags.png" alt="Collecte de métriques limite facultative" responsive="true" style="width:80%;">}}

Cela définit un filtre, qui est utilisé lors de la collecte des métriques. Les wildcards, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères), peuvent également être utilisés. Seuls les hosts qui correspondent à l'un des tags définis sont importés dans Datadog. Les autres hosts sont ignorés. Ajoutez `!` devant un tag pour exclure les hosts correspondant à ce tag.

Exemple : `datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1`

## APM

{{< tabs >}}
{{% tab "Analyse et recherche de traces" %}}

Pour [les recherches de traces][1], filtrez les traces avec des tags à l'aide de la barre de recherche ou des cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la page [sur les recherches de traces][2].

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Tags recherche de traces" responsive="true" style="width:80%;">}}


[1]: /fr/tracing/app_analytics/search
[2]: /fr/tracing/advanced/search/#search-bar
{{% /tab %}}
{{% tab "Service map" %}}

Après avoir [assigné des tags][1], utilisez la Service map pour accéder facilement à différentes sections de l'application en cliquant sur un service spécifique. L'exemple ci-dessous affiche les données des [analyses et recherches de traces][2], des [monitors][3], des [logs][4] et de la [hostmap][5] filtrées par le tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Tags Service map" responsive="true" style="width:80%;">}}


[1]: /fr/tagging/assigning_tags
[2]: /fr/tracing/app_analytics/search
[3]: /fr/monitors/manage_monitor
[4]: /fr/logs/explorer/search
[5]: /fr/graphing/infrastructure/hostmap
{{% /tab %}}

{{< /tabs >}}

## Notebooks

Lors de la création d'un graphique de [notebook][12], limitez des métriques en utilisant des tags dans la zone de texte **from**. Vous pouvez également regrouper des métriques en ajoutant des tags dans la zone de texte **avg by**. Dans l'exemple ci-dessous, les métriques sont limitées par `service:coffee-house` et regroupées par `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Tags notebook" responsive="true" style="width:80%;">}}

Pour exclure des tags, utilisez `</>` afin de modifier le texte, puis ajoutez le tag en respectant le format `!<KEY>:<VALUE>`. Dans l'exemple ci-dessous, `service:coffeehouse` est exclu par l'expression `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Le notebook exclut les tags" video="true" responsive="true" width="80%">}}

## Logs

Pour [les recherches][13], [les analyses][14], [les patterns][15] et le [Live Tailing][16] de logs, filtrez les logs avec des tags à l'aide de la barre de recherche ou des cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la page [sur les recherches de logs][13].

{{< tabs >}}
{{% tab "Recherche" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Tags de recherche de logs" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Analyse" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Tags d'analyse de logs" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Tags de Log Patterns" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Live Tail Tags" video="true" responsive="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Les tags permettent également de filtrer un [pipeline][17] de logs. Dans l'exemple ci-dessous, le pipeline filtre des logs selon le tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Tags de pipeline" responsive="true" style="width:80%;">}}

## Développeurs

Les tags peuvent être utilisés de diverses façons avec l'[API][18]. Cliquez sur les liens ci-dessous pour accéder aux rubriques indiquées :

- [Planifier le downtime d'un monitor][19]
- [Interroger le flux d'événements][20]
- [Rechercher des hosts][21]
- [Intégrations][22] pour [AWS][23] et [Google Cloud][24]
- [Interroger les points de séries temporelles][25]
- [Récupérer tous les détails d'un monitor][26]
- [Désactiver un monitor][27]
- [Rechercher des monitors][28]
- [Rechercher des groupes de monitors][29]
- [Créer un screenboard][30]
- [Créer un timeboard][31]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tagging/assigning_tags
[2]: /fr/graphing/event_stream
[3]: /fr/integrations
[4]: /fr/graphing/infrastructure/hostmap
[5]: /fr/graphing/infrastructure
[6]: /fr/graphing/infrastructure/livecontainers
[7]: /fr/graphing/infrastructure/process
[8]: /fr/graphing/metrics/explorer
[9]: /fr/integrations/amazon_web_services
[10]: /fr/integrations/google_cloud_platform
[11]: /fr/integrations/azure
[12]: /fr/graphing/notebooks
[13]: /fr/logs/explorer/search
[14]: /fr/logs/explorer/analytics
[15]: /fr/logs/explorer/patterns
[16]: /fr/logs/live_tail
[17]: /fr/logs/processing/pipelines
[18]: /fr/api
[19]: /fr/api/?lang=python#schedule-monitor-downtime
[20]: /fr/api/?lang=python#query-the-event-stream
[21]: /fr/api/?lang=python#search-hosts
[22]: /fr/api/?lang=python#integrations
[23]: /fr/api/?lang=python#aws
[24]: /fr/api/?lang=python#google-cloud-platform
[25]: /fr/api/?lang=python#query-timeseries-points
[26]: /fr/api/?lang=python#get-all-monitor-details
[27]: /fr/api/?lang=python#mute-a-monitor
[28]: /fr/api/?lang=python#monitors-search
[29]: /fr/api/?lang=python#monitors-group-search
[30]: /fr/api/?lang=python#create-a-screenboard
[31]: /fr/api/?lang=python#create-a-dashboard