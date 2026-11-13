---
aliases:
- /fr/tagging/using_tags/
description: Découvrez comment utiliser des tags dans les solutions Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/tagging-best-practices/
  tag: Blog
  text: Bonnes pratiques en matière de tagging pour votre infrastructure et vos applications
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
- link: /getting_started/tagging/assigning_tags/
  tag: Documentation
  text: Apprendre à assigner des tags
title: Utiliser les tags
---
## Présentation {#overview}

Après avoir [attribué des tags][1], commencez à les utiliser pour filtrer et regrouper vos données sur votre plateforme Datadog. Les tags peuvent être utilisés pour inclure ou exclure des données.

Lorsque vous souhaitez inclure ou exclure plusieurs tags :

* Include utilise la logique `AND`
* Exclude utilise la logique `OR`

## Événements{#events}

L'[Events Explorer][2] affiche les événements de votre environnement sur une période donnée. Utilisez des tags pour filtrer la liste des événements et vous concentrer sur un sous-ensemble d'événements. Saisissez `tags:` suivi d'un tag pour voir tous les événements provenant d'un host, d'une [intégration][3] ou d'un service avec ce tag. Par exemple, utilisez `tags:(service:coffee-house)` pour rechercher le tag `service:coffee-house`.

Pour rechercher plusieurs tags de manière inclusive, séparez chaque tag par OR : `tags:(service:coffee-house OR host:coffeehouseprod)`. Pour rechercher plusieurs tags qui doivent tous être présents, séparez chaque tag par AND : `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards {#dashboards}

{{< tabs >}}
{{% tab "Attribution" %}}

Utilisez des tags pour filtrer les métriques à afficher dans un [graphique de dashboard][1], ou pour créer des groupes agrégés de métriques à afficher. Pour filtrer les métriques à afficher, saisissez le tag dans la zone de texte {{< ui >}}from{{< /ui >}}. Cette métrique s'affiche pour toutes les sources auxquelles ce tag particulier est attribué (`service:web-store` dans l'exemple ci-dessous).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Filtrez les métriques dans les dashboards en ajoutant un tag au champ « from » ; dans cet exemple, la métrique est filtrée sur « service:web-store »" style="width:80%;">}}

Le filtrage avancé des valeurs de tag est également disponible avec des filtres booléens. La syntaxe booléenne suivante est prise en charge :

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (tag_value1, tag_value2,...)`
* `key NOT IN (tag_value1, tag_value2,...)`

Utilisez `AND`, `ORs` pour examiner une métrique à travers des tags spécifiques :

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Filtre booléen avec AND/OR" style="width:80%;">}}

Utilisez `IN`, `NOT IN` pour filtrer rapidement une métrique sur des tags spécifiques :

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Filtre booléen avec IN/NOT IN" style="width:80%;">}}

Pour créer un groupe agrégé à l'aide de tags, saisissez la partie clé du tag dans la zone de texte {{< ui >}}avg by{{< /ui >}}. Par exemple, si vous avez un graphique de séries temporelles affichant une métrique taguée avec la clé `service`, telle que `service:web-store`, saisissez `service` dans la zone de texte {{< ui >}}avg by{{< /ui >}} pour afficher une ligne pour chaque valeur de tag `service`. Chaque ligne représente la valeur moyenne de la métrique pour toutes les sources qui partagent cette valeur de tag `service`.

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Tags dans le champ « avg by » des dashboards" style="width:80%;">}}

Les tags peuvent également être utilisés pour superposer des événements sur le dashboard. Cela fonctionne de la même manière que dans l'[Events Explorer][2].
Les événements correspondants sont superposés sous forme de barres verticales sur le graphique. L'exemple ci-dessous utilise `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Utilisez des tags pour ajouter des Event Overlays dans les dashboards" style="width:80%;">}}

Utilisez les [variables de modèle][3] pour gagner du temps lorsque vous changez le tag {{< ui >}}from{{< /ui >}} sur les graphiques de votre dashboard. Dans l'exemple ci-dessous, `service` est utilisé pour représenter la clé de tag `service`. Pour utiliser la variable de modèle, ajoutez la variable de modèle `$service` dans la zone de texte {{< ui >}}from{{< /ui >}} de votre requête de graphique.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Variables de modèle du dashboard" style="width:80%;">}}

[1]: /fr/dashboards/
[2]: /fr/events/
[3]: /fr/dashboards/template_variables/
{{% /tab %}}
{{% tab "Scénarios" %}}

Voici un exemple d'utilisation des tags dans l'éditeur de graphiques de séries temporelles. Pour la première capture d'écran, aucun tag n'a été appliqué et l'utilisation moyenne du processeur sur tous les hosts est affichée :

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Éditeur de graphiques de séries temporelles sans tag ajouté" style="width:75%;">}}

Ensuite, l'éditeur est mis à jour pour inclure un tag (`region:eastus`) dans la zone de texte {{< ui >}}from{{< /ui >}} qui permet à Datadog d'examiner l'utilisation du processeur dans la région US East. Le tag `region` est utilisé ici comme exemple, mais vous pourriez utiliser n'importe quel tag arbitraire envoyé à votre plateforme Datadog, y compris `application`, `service` ou `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Éditeur de graphiques de séries temporelles filtré par le tag « region:us-east-1 »" style="width:75%;">}}

Enfin, le deuxième champ vide (la zone de texte {{< ui >}}avg by{{< /ui >}}) est utilisé pour afficher une ligne de série temporelle individuelle pour chaque `host`. L'utilisation du processeur des serveurs est affichée pour chaque host fonctionnant dans la région US East.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Éditeur de graphiques de séries temporelles filtré par « region:us-east-1 » et regroupé par « host »" style="width:75%;">}}

Si nécessaire, ajoutez des tags supplémentaires pour restreindre davantage le périmètre, par exemple, les hosts dans `region:eastus` et `env:production`. Les tags peuvent être utilisés dans tout Datadog et appliqués à tous les éléments principaux (métriques, traces et logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure {#infrastructure}

Pour filtrer [Host Map][4], [Infrastructure List][5], [Containers][6] et [Processes][7], saisissez un tag dans la zone de texte {{< ui >}}Filter by{{< /ui >}} en haut de la page. Les hosts et les conteneurs peuvent être regroupés par clé de tag à l'aide de la zone de texte {{< ui >}}Group by{{< /ui >}}. Si vous saisissez `service` dans la zone de regroupement, chaque service apparaît comme un en-tête de groupe.

{{< tabs >}}
{{% tab "Hostmap" %}}

Depuis cette section, utilisez des tags pour filtrer ou regrouper des hosts :

{{< img src="tagging/using_tags/hostmaptags.png" alt="Tags de Hostmap" style="width:80%;">}}

Ou des conteneurs :

{{< img src="tagging/using_tags/containermaptags.png" alt="Tags de Container Map" style="width:80%;">}}
{{% /tab %}}

{{% tab "Liste d'infrastructures" %}}

La liste d'infrastructures propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags de Infrastructure List" style="width:80%;">}}
{{% /tab %}}

{{% tab "Containers" %}}

La page des live containers propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/livecontainertags.png" alt="Tags de Live Container" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processus" %}}

La page Live Processes propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Tags de Live Process" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## monitors {#monitors}

Pour filtrer les monitors et les [downtimes des monitors][31] par [tags assignés][32], utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `tag:"<KEY>:<VALUE>"`, par exemple : `tag:"service:coffee-house"`. Pour faire correspondre n'importe quelle valeur d'une clé de tag, échappez le deux-points avec une barre oblique inverse (`\`) au lieu d'utiliser des guillemets, car les caractères génériques ne sont pas pris en charge entre guillemets. Par exemple, `tag:service\:*` renvoie tous les monitors qui possèdent un tag `service`. Pour exclure les monitors avec un tag spécifique de votre recherche, utilisez `-`, par exemple : `-tag:"service:coffee-house"`.

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filtrer les monitors dans la barre de recherche avec des tags" style="width:80%;">}}

**Remarque** : les tags de monitor sont différents et distincts des tags de métrique. Pour plus d'informations, consultez la documentation sur les [tags de monitor][30].

Lors de la création d'un nouveau monitor, utilisez les *tags de métrique* dans les champs suivants :
zone de texte * {{< ui >}}from{{< /ui >}} pour limiter le périmètre du monitor aux seules métriques possédant ces tags.
* {{< ui >}}excluding{{< /ui >}} zone de texte pour supprimer les métriques correspondantes du périmètre du monitor.
* {{< ui >}}avg by{{< /ui >}} zone de texte pour transformer le monitor en monitor à alertes multiples, avec une alerte pour chaque valeur de tag.

## Métriques {#metrics}

Utilisez des tags dans [Metrics Explorer][8] pour filtrer les métriques par tag ou afficher plusieurs graphiques par clé de tag. L'exemple ci-dessous représente graphiquement une métrique pour `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="Un graphique de métrique limité à un seul tag" style="width:80%;">}}

## Intégrations {#integrations}

Certaines intégrations vous permettent de limiter les métriques recueillies en utilisant des tags.

{{< tabs >}}
{{% tab "AWS" %}}

La [tuile d'intégration AWS][1] possède les filtres de tag `to hosts with tag` et `to Lambdas with tag`.

Ces champs acceptent une liste de tags séparés par des virgules (sous la forme `<KEY>:<VALUE>`) qui définit un filtre, utilisé pour collecter vos ressources EC2 ou Lambda. Vous pouvez utiliser ces `<KEY>:<VALUE>` pour inclure des fonctions dans la surveillance ou les en exclure en fonction de leurs tags. Pour spécifier qu'un tag doit être exclu, ajoutez un `!` avant la clé de tag. Vous pouvez également utiliser des caractères génériques, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères).

Les filtres incluent les ressources qui possèdent au moins un des tags d'inclusion, à l'aide d'une instruction `OR`. L'exemple de filtre suivant collecte les instances EC2 qui contiennent le tag `datadog:monitored` OR `env:production` :

```text
datadog:monitored,env:production
```

Si vous avez spécifié l'exclusion d'un tag, celle-ci est prioritaire et forme une instruction `AND`. L'exemple de filtre suivant collecte les instances EC2 qui contiennent le tag `datadog:monitored`, OR `env:production`, OR un tag `instance-type` avec une valeur `c1.*` AND NOT un tag `region:us-east-1` :

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Pour en savoir plus sur le tagging dans AWS, consultez la documentation sur [EC2][2] et les [fonctions Lambda][3].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

La [tuile d'intégration Azure][1] possède le filtre de tag `Optionally filter to VMs with tag`.

Ce champ accepte une liste de tags séparés par des virgules (sous la forme `<KEY>:<VALUE>`) qui définit un filtre, utilisé pour collecter des métriques depuis des VM Azure. Vous pouvez également utiliser des caractères génériques, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères). Seules les VM qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres sont ignorées.

Les VM correspondant à un tag donné peuvent également être exclues en ajoutant `!` avant le tag, par exemple :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

La [tuile d'intégration Google Cloud][1] comporte le filtre de tag `to hosts with tag`.

Ce champ accepte une liste de libellés GCP séparés par des virgules (sous la forme `<KEY>:<VALUE>`) qui définit un filtre, utilisé pour collecter des métriques depuis GCP. Vous pouvez également utiliser des caractères génériques, tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères). Seuls les hosts qui correspondent à l'un des libellés définis sont importés dans Datadog. Les autres sont ignorées.

Vous pouvez exclure les hosts correspondant à un libellé donné en ajoutant `!` avant le tag, par exemple :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la documentation Google Cloud pour en savoir plus sur la [création et la gestion d'étiquettes][2].

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM {#apm}

{{< tabs >}}
{{% tab "Trace Explorer" %}}

Dans le [Trace Explorer][1], vous pouvez filtrer les traces par tags à l'aide de la barre de recherche ou des cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`, par exemple : `service:coffee-house`. Pour une recherche avancée, consultez la [syntaxe de requête][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Tags du Trace Explorer" style="width:80%;">}}

[1]: /fr/tracing/trace_explorer/search/
[2]: /fr/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

Après avoir [attribué des tags][1], utilisez la Service Map pour accéder aux différentes parties de l'application en cliquant sur un service donné. Dans l'exemple ci-dessous, affichez [Analytics][2], [Monitors][3], [Logs][4] et la [Host Map][5], filtrés par le tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Tags de la Service Map" style="width:80%;">}}

[1]: /fr/getting_started/tagging/assigning_tags/
[2]: /fr/tracing/app_analytics/search/
[3]: /fr/monitors/manage/
[4]: /fr/logs/explorer/search/
[5]: /fr/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks {#notebooks}

Lors de la création d'un graphique de [Notebook][9], limitez les métriques à l'aide de tags dans la zone de texte {{< ui >}}from{{< /ui >}}. De plus, regroupez les métriques à l'aide de tags dans la zone de texte {{< ui >}}avg by{{< /ui >}}. Dans l'exemple ci-dessous, les métriques sont limitées à `service:coffee-house` et regroupées par `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Tags de Notebook" style="width:80%;">}}

Pour exclure des tags, utilisez `</>` pour modifier le texte, puis ajoutez le tag sous la forme `!<KEY>:<VALUE>`. Dans l'exemple ci-dessous, `service:coffeehouse` est exclu à l'aide de `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Tags exclus de Notebook" video="true" width="80%">}}

## Logs {#logs}

Pour [Search][10], [Analytics][11], [Patterns][12] et [Live Tail][13] de Logs, filtrez les logs par tags à l'aide de la barre de recherche ou des cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`, par exemple : `service:coffee-house`. Pour une recherche avancée, consultez [Rechercher des logs][10].

De plus, les tags permettent de filtrer un [Pipeline][14] de logs. Par exemple, si vous souhaitez que seuls les logs du service coffee-house passent par le pipeline, ajoutez le tag `service:coffee-house` au champ de filtre.

## RUM & Session Replay {#rum-session-replay}

Le [RUM Explorer][15] représente les événements provenant de votre environnement sur une période donnée.

Pour filtrer les données d'événements RUM par tags, utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`, par exemple : `service:shopist`. Pour une recherche avancée, consultez [Rechercher des événements RUM][16].

{{< img src="tagging/using_tags/rumtags.png" alt="Tags RUM" style="width:80%;">}}

## Synthetics {#synthetics}

{{< tabs >}}
{{% tab "Tests Synthetic" %}}

La page [Synthetic Tests][1] répertorie la liste de vos tests Synthetic.

Pour filtrer les tests par tags, utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`. Par exemple : `tag:mini-website`. Pour une recherche avancée, consultez [Rechercher et gérer les tests Synthetic][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Tags Synthetics" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /fr/synthetics/search/
{{% /tab %}}
{{% tab "Explorer" %}}

La vue [Synthetic Monitoring & Testing Results Explorer][1] présente vos exécutions de test et lots d'exécutions au sein d'un [pipeline de CI][2].

Pour filtrer les exécutions de tests par tags, utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`. Par exemple : `@ci.provider.name:github`. Pour une recherche avancée, consultez [Rechercher des lots de tests][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Tags Synthetics et CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /fr/continuous_testing/cicd_integrations
[3]: /fr/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Objectifs de niveau de service {#service-level-objectives}

{{< tabs >}}
{{% tab "Gérer les SLO" %}}

Pour filtrer les SLO par [tags attribués][1], utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`, par exemple : `journey:add_item`. Pour exclure les SLO avec un tag spécifique de votre recherche, utilisez `-`, par exemple : `-journey:add_item`.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Tags de SLO" style="width:80%;">}}

Les tags de SLO ne fonctionnent pas de la même façon que les tags appliqués aux métriques ou monitors sous-jacents d'un SLO.

[1]: /fr/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLO basés sur des métriques" %}}

Lorsque vous créez un [SLO basé sur des métriques][1], utilisez les tags de métrique dans les requêtes de calcul du taux de réussite du SLO (toutes les métriques doivent utiliser le même ensemble de tags de métrique) :

* {{< ui >}}from{{< /ui >}} zone de texte pour limiter le périmètre de la métrique à ces tags uniquement.
* {{< ui >}}sum by{{< /ui >}} zone de texte pour créer un SLO groupé basé sur une métrique qui affiche un pourcentage de statut et un budget d'erreur restant pour l'ensemble du SLO et pour chaque valeur de tag.

[1]: /fr/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLO basés sur des monitors" %}}

Lors de la création d'un [SLO basé sur un monitor][1] à partir d'un seul [monitor groupé][2], utilisez le bouton {{< ui >}}Calculate on selected groups{{< /ui >}} pour sélectionner jusqu'à 20 valeurs de tag du monitor sous-jacent afin d'afficher le pourcentage de statut et le budget d'erreur restant pour le SLO global et pour chaque valeur de tag :

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Tags des SLO basés sur des monitors" style="width:80%;">}}

[1]: /fr/service_level_objectives/monitor/
[2]: /fr/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility {#ci-visibility}

{{< tabs >}}
{{% tab "Exécutions de tests" %}}

La vue [CI Visibility Explorer][101] affiche vos exécutions de test dans un pipeline de CI.

Pour filtrer les exécutions de tests par tags, utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`. Par exemple : `@test.status:failed`. Pour une recherche avancée, consultez [Syntaxe de recherche du Test Optimization Explorer][102].

{{< img src="/continuous_integration/test_runs.png" alt="Exécutions de tests dans le CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /fr/tests/explorer/search_syntax

{{% /tab %}}
{{% tab "Exécutions de pipeline" %}}

La vue [CI Visibility Explorer][101] affiche vos exécutions de pipeline de CI.

Pour filtrer les exécutions de pipeline par tags, utilisez la barre de recherche ou les cases à cocher des facettes. Le format de la barre de recherche est `<KEY>:<VALUE>`. Par exemple : `@ci.provider.name:gitlab`. Pour une recherche avancée, consultez [Rechercher et gérer les pipelines CI][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Exécutions de pipeline dans le CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /fr/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## DORA Metrics {#dora-metrics}

Le [DORA Metrics Explorer][33] affiche vos agrégations DORA Metrics. Pour filtrer les métriques et agrégations affichées par tags, utilisez le bouton {{< ui >}}\+ Filter{{< /ui >}} pour ajouter des facettes pour les tags existants. Pour effectuer des requêtes avec des tags dans les graphiques et les dashboards, consultez [DORA Metrics Create Custom Dashboards][34].

{{< img src="/delivery_performance/dora_metrics/dora_ui_3.png" alt="Un aperçu des calculs DORA Metrics filtrés par le tag personnalisé Language" style="width:80%;">}}

## Développeurs {#developers}

Il existe diverses façons d'exploiter les tags avec l'[API][17].

Consultez la liste de liens ci-dessous pour accéder aux rubriques correspondantes :

* [Planifier un downtime de monitor][18]
* [Interroger l'Event Explorer][19]
* [Rechercher des hosts][20]
* Intégrations pour [AWS][21] et [Google Cloud][22]
* [Interroger des points de séries temporelles][23]
* [Obtenir tous les détails d'un monitor][24]
* [Mettre un monitor en sourdine][25]
* [Recherche de Monitors][24]
* [Recherche de groupes de Monitors][24]
* [Créer un Screenboard][26]
* [Créer un Timeboard][26]
* [Créer un SLO][27]
* [Obtenir les détails d'un SLO][28]
* [Mettre à jour un SLO][29]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/
[2]: /fr/events/explorer
[3]: /fr/integrations/
[4]: /fr/infrastructure/hostmap/
[5]: /fr/infrastructure/
[6]: /fr/infrastructure/livecontainers/
[7]: /fr/infrastructure/process/
[8]: /fr/metrics/explorer/
[9]: /fr/notebooks/
[10]: /fr/logs/explorer/search/
[11]: /fr/logs/explorer/analytics/
[12]: /fr/logs/explorer/patterns/
[13]: /fr/logs/live_tail/
[14]: /fr/logs/log_configuration/pipelines
[15]: /fr/real_user_monitoring/explorer/
[16]: /fr/real_user_monitoring/explorer/search/
[17]: /fr/api/
[18]: /fr/api/v1/downtimes/#schedule-a-downtime
[19]: /fr/api/v1/events/#query-the-event-stream
[20]: /fr/api/v1/hosts/
[21]: /fr/api/v1/aws-integration/
[22]: /fr/api/v1/gcp-integration/
[23]: /fr/api/v1/metrics/#query-timeseries-points
[24]: /fr/api/v1/monitors/#get-all-monitor-details
[25]: /fr/api/v1/monitors/#mute-a-monitor
[26]: /fr/api/v1/dashboards/#create-a-new-dashboard
[27]: /fr/api/v1/service-level-objectives/#create-a-slo-object
[28]: /fr/api/v1/service-level-objectives/#get-a-slos-details
[29]: /fr/api/v1/service-level-objectives/#update-a-slo
[30]: /fr/monitors/manage/#monitor-tags
[31]: /fr/monitors/downtimes/
[32]: /fr/getting_started/tagging/assigning_tags?tab=monitors
[33]: https://app.datadoghq.com/ci/dora
[34]: /fr/delivery_performance/dora_metrics/#create-custom-dashboards