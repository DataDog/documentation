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
title: Utiliser des tags
---

## Présentation

Après avoir [assigné des tags][1], utilisez-les pour filtrer et regrouper vos données au sein de la plateforme Datadog. Les tags vous permettent d'inclure et d'exclure des données.

Lorsque vous souhaitez inclure ou exclure plusieurs tags :

* la fonction Include utilise la logique `AND` ;
* la fonction Exclude utilise la logique `OR`.

## Événements

L'[Events Explorer][2] affiche les événements de votre environnement au cours de l'intervalle spécifié. Utilisez des tags pour affiner la liste d'événements et étudier un sous-ensemble d'événements. Saisissez `tags:` suivi du nom d'un tag pour afficher tous les événements générés par un host, une [intégration][3] ou un service qui possèdent ce tag. Par exemple, l'expression `tags:service:coffee-house` permet de rechercher le tag `service:coffee-house`.

Pour effectuer une recherche inclusive avec plusieurs tags, utilisez des parenthèses et séparez chaque tag par l'opérateur OR : `tags:(service:coffee-house OR host:coffeehouseprod)`. Pour effectuer une recherche exclusive avec plusieurs tags, séparez chaque tag par l'opérateur AND : `tags:(service:coffee-house AND host:coffeehouseprod)`.

## Dashboards

{{< tabs >}}
{{% tab "Assignation" %}}

Utilisez des tags pour filtrer les métriques à afficher dans un [graphique de dashboard][1] ou pour créer des groupes agrégés de métriques à afficher. Pour filtrer les métriques à afficher, saisissez les tags dans la zone de texte **from**. Cette métrique s'affiche alors pour toutes les sources qui possèdent ce tag (à savoir, `service:web-store` dans l'exemple ci-dessous).

{{< img src="tagging/using_tags/dashboards_tags_example.png" alt="Ajoutez un tag dans le champ from pour filtrer les métriques affichées dans des dashboards. Pour cet exemple, le filtre service:web-store est appliqué à la métrique." style="width:80%;">}}

Le filtrage avancé des valeurs de tag peut également inclure des filtres booléens. La syntaxe booléenne suivante est prise en charge :

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (valeur_tag1, valeur_tag2, etc.)`
* `key NOT IN (valeur_tag1, valeur_tag2, etc.)`

Utilisez `AND` ou `OR` pour examiner une métrique en fonction de tags spécifiques :

{{< img src="tagging/using_tags/dashboard_advanced_tags_AND_OR.png" alt="Filtre booléen avec les opérateurs AND/OR" style="width:80%;">}}

Utilisez `IN` ou `NOT IN` pour filtrer rapidement une métrique en fonction de tags spécifiques :

{{< img src="tagging/using_tags/dashboard_advanced_tags_NOT_IN.png" alt="Filtre booléen avec les opérateurs IN/NOT IN" style="width:80%;">}}

Pour créer un groupe agrégé à l'aide de tags, saisissez la clé du tag dans la zone de texte **avg by**. Par exemple, si vous disposez d'un graphique de série temporelle présentant une métrique taguée avec la clé `service`, comme `service:web-store`, saisissez `service` dans la zone de texte **avg by** pour afficher une ligne pour chaque valeur de tag `service`. Chaque ligne représente la valeur moyenne de la métrique pour l'ensemble des sources qui partagent la valeur de tag `service`. 

{{< img src="tagging/using_tags/dashboard_group_by_tags.png" alt="Tags dans des dashboards avec la zone de texte avg by" style="width:80%;">}}

Les tags peuvent également servir à superposer des événements sur un dashboard, comme dans l'[Events Explorer][2]. Les événements correspondants sont superposés sous la forme de barres verticales dans le graphique. L'exemple ci-dessous utilise l'expression `service:web-store`.

{{< img src="tagging/using_tags/dashboard_event_overlays.png" alt="Utiliser des tags pour superposer des événements dans des dashboards" style="width:80%;">}}

Utilisez des [template variables][3] pour activer facilement le tag **from** sur les graphiques de votre dashboard. Dans l'exemple ci-dessous, `service` est utilisé pour représenter la clé de tag `service`. Ajoutez la template variable `$service` dans la zone de texte **from** de votre requête de graphique pour l'utiliser.

{{< img src="tagging/using_tags/dashboard_dynamic_template_variables.png" alt="Template variables dans un dashboard" style="width:80%;">}}

[1]: /fr/dashboards/
[2]: /fr/events/
[3]: /fr/dashboards/template_variables/
{{% /tab %}}
{{% tab "Exemples" %}}

Vous trouverez ci-dessous un exemple de tags avec l'éditeur de graphiques pour séries temporelles. Aucun tag n'a été appliqué dans la première capture d'écran. L'utilisation moyenne du CPU est donc affichée pour l'ensemble des hosts :

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_no_tags.png" alt="Éditeur de graphiques pour séries temporelles, sans aucun tag défini" style="width:75%;">}}

Les informations de l'éditeur sont ensuite mises à jour afin d'inclure un tag (`region:eastus`) dans la zone de texte **from**. Cela permet à Datadog d'afficher l'utilisation du CPU sur l'ensemble de la région Est des États-Unis. Le tag `region` est utilisé à titre d'exemple : vous pouvez utiliser n'importe quel tag arbitraire transmis à votre plateforme Datadog, comme `application`, `service` ou `environment`.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_from_tag.png" alt="Éditeur de graphiques pour séries temporelles avec le tag « region:us-east-1 »" style="width:75%;">}}

Enfin, le deuxième champ vide (la zone de texte **avg by**) est utilisé pour afficher une ligne de série temporelle pour chaque `host`. Le CPU du serveur est affiché pour chaque host exécuté dans la région Est des États-Unis.

{{< img src="tagging/using_tags/dashboard_timeseries_graph_editor_sumby_tag.png" alt="Éditeur de graphiques pour séries temporelles avec le tag « region:us-east-1 » et un regroupement basé sur host" style="width:75%;">}}

Vous pouvez ajouter d'autres tags pour réduire davantage la portée, afin d'étudier par exemple les hosts dans `region:eastus` et `env:production`. Les tags peuvent être utilisés pour de nombreuses fonctionnalités de Datadog et appliqués à l'ensemble des éléments de base (métriques, traces et logs).

{{% /tab %}}
{{< /tabs >}}

## Infrastructure

Pour filtrer la [hostmap][4], [la liste des infrastructures][5], les [conteneurs][6] et les [processus][7], saisissez un tag dans la zone de texte **Filter by** en haut de la page. Les hosts et conteneurs peuvent être regroupés par clé de tag à l'aide de la zone de texte **Group by**. Si vous saisissez `service` dans cette zone de texte, chaque service s'affiche sous la forme d'un en-tête de groupe.

{{< tabs >}}
{{% tab "Hostmap" %}}

Depuis cette section, utilisez des tags pour filtrer ou regrouper des hosts :

{{< img src="tagging/using_tags/hostmaptags.png" alt="Tags hostmap" style="width:80%;">}}

Ou des conteneurs :

{{< img src="tagging/using_tags/containermaptags.png" alt="Tags map des conteneurs" style="width:80%;">}}
{{% /tab %}}

{{% tab "Liste d'infrastructures" %}}

La liste d'infrastructures propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/infrastructuretags.png" alt="Tags de la liste d'infrastructures" style="width:80%;">}}
{{% /tab %}}

{{% tab "Conteneurs" %}}

La page des live containers propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/livecontainertags.png" alt="Tags live containers" style="width:80%;">}}
{{% /tab %}}

{{% tab "Processus" %}}

La page des live processes propose les champs de filtrage et de regroupement suivants :

{{< img src="tagging/using_tags/liveprocessestags.png" alt="Tags live processes" style="width:80%;">}}
{{% /tab %}}
{{< /tabs >}}

## Monitors

Pour filtrer des monitors et des [downtimes de monitor][31] en fonction des [tags qui leur sont assignés][32], utilisez la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `tag:<KEY>:<VALUE>`. Indiquez par exemple `tag:service:coffee-house`. Pour exclure les monitors associés à un tag spécifique de votre recherche, utilisez `-` (par exemple : `tag:-service:coffee-house`).

{{< img src="/tagging/using_tags/manage_monitor_tags.png" alt="Filtrer des monitors dans la barre de recherche avec des tags" style="width:80%;">}}

**Remarque** : les tags de monitor ne fonctionnent pas de la même façon que les tags de métrique. Pour en savoir plus, consultez la rubrique [Tags de monitor][30].

Lorsque vous créez un monitor, utilisez des *tags de métrique* dans :
* la zone de texte **from**, afin de limiter la portée du monitor et d'inclure uniquement les métriques possédant les tags indiqués ;
* la zone de texte **excluding**, afin d'exclure les métriques correspondantes de la portée du monitor ;
* la zone de texte **avg by**, afin de transformer le monitor en un monitor à alertes multiples pour chaque valeur de tag.

## Métriques

Utilisez des tags dans le [Metrics Explorer][8] pour filtrer les métriques en fonction de tags ou pour afficher plusieurs graphiques selon une clé de tag. L'exemple ci-dessous représente une métrique filtrée selon `service:web-store`.

{{< img src="tagging/using_tags/metrics_explorer.png" alt="Un graphique de métrique filtré sur un tag spécifique" style="width:80%;">}}

## Intégrations

Certaines intégrations vous permettent de limiter les métriques recueillies en utilisant des tags.

{{< tabs >}}
{{% tab "AWS" %}}

Le [carré d'intégration AWS][1] propose les filtres par tags `to hosts with tag` et `to Lambdas with tag`.

Ces champs acceptent une liste de tags séparés par des virgules (au format `<KEY>:<VALUE>`) qui, ensemble, définissent un filtre utilisé pour la collecte de vos ressources EC2 ou Lambda. Ces paires `<KEY>:<VALUE>` peuvent être utilisées pour inclure ou exclure des fonctions selon leurs tags. Pour exclure un tag, ajoutez `!` devant la clé de tag. Les wildcards tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères) sont également acceptés.

Si vous souhaitez qu'un filtre inclue les ressources contenant n'importe quel tag autorisé, utilisez l'opérateur `OR`. L'exemple de filtre suivant recueille les instances EC2 contenant le tag `datadog:monitored` OU `env:production` :

```text
datadog:monitored,env:production
```

Si vous spécifiez un tag d'exclusion, cette règle est appliquée en priorité via une déclaration `AND`. L'exemple de filtre suivant recueille les instances EC2 qui contiennent le tag `datadog:monitored`, OU `env:production`, OU un tag `instance-type` avec une valeur `c1.*`, mais qui ne contiennent PAS le tag `region:us-east-1` :

```text
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```

Pour en savoir plus sur le tagging dans AWS, consultez la documentation sur [EC2][2] et les [fonctions Lambda][3].

[1]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
[3]: https://docs.aws.amazon.com/lambda/latest/dg/tagging.html
{{% /tab %}}
{{% tab "Azure" %}}

Le [carré d'intégration Azure][1] propose le filtre par tags `Optionally filter to VMs with tag`.

Ce champ accepte une liste de tags séparés par des virgules (au format `<KEY>:<VALUE>`) qui, ensemble, définissent un filtre utilisé pour la collecte de métriques à partir des VM Azure. Les wildcards tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères) sont également acceptés. Seules les VM qui correspondent à l'un des tags définis sont importées dans Datadog. Les autres sont ignorées.

Ajoutez `!` devant un tag pour exclure les machines virtuelles correspondant à ce tag. Par exemple :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

[1]: https://app.datadoghq.com/account/settings#integrations/azure
{{% /tab %}}
{{% tab "Google Cloud" %}}

Le [carré d'intégration Google Cloud][1] propose le filtre par tags `to hosts with tag`.

Ce champ accepte une liste de libellés GCP séparés par des virgules (au format `<KEY>:<VALUE>`) qui, ensemble, définissent un filtre utilisé pour la collecte de métriques à partir de GCP. Les wildcards tels que `?` (pour un seul caractère) et `*` (pour plusieurs caractères) sont également acceptés. Seuls les hosts qui correspondent à l'un des libellés définis sont importés dans Datadog. Les autres sont ignorés.

Ajoutez `!` devant un tag pour exclure les hosts correspondant à un libellé spécifique. Par exemple :

```text
datadog:monitored,env:production,!env:staging,instance-type:c1.*
```

Consultez la documentation Google Cloud pour en savoir plus sur la [création et la gestion d'étiquettes][2].

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: https://cloud.google.com/compute/docs/labeling-resources
{{% /tab %}}
{{< /tabs >}}

## APM

{{< tabs >}}
{{% tab "Trace Explorer" %}}

Depuis le [Trace Explorer][1], vous pouvez filtrer les traces avec des tags à l'aide de la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la section [Syntaxe de requête][2].

{{< img src="tagging/using_tags/trace_explorer.png" alt="Tags dans le Trace Explorer" style="width:80%;">}}

[1]: /fr/tracing/trace_explorer/search/
[2]: /fr/tracing/trace_explorer/query_syntax/
{{% /tab %}}
{{% tab "Service Map" %}}

Après avoir [assigné des tags][1], utilisez la Service Map pour accéder à différentes sections de l'application en cliquant sur un service spécifique. L'exemple ci-dessous affiche les données [Analytics][2], les [monitors][3], les [logs][4] et la [hostmap][5] correspondant au tag `service:coffee-house`.

{{< img src="tagging/using_tags/servicemaptags.png" alt="Tags Service Map" style="width:80%;">}}

[1]: /fr/getting_started/tagging/assigning_tags/
[2]: /fr/tracing/app_analytics/search/
[3]: /fr/monitors/manage/
[4]: /fr/logs/explorer/search/
[5]: /fr/infrastructure/hostmap/
{{% /tab %}}

{{< /tabs >}}

## Notebooks

Lors de la création d'un graphique de [notebook][9], limitez des métriques en utilisant des tags dans la zone de texte **from**. Vous pouvez également regrouper des métriques en ajoutant des tags dans la zone de texte **avg by**. Dans l'exemple ci-dessous, les métriques sont limitées à `service:coffee-house` et regroupées par `host`.

{{< img src="tagging/using_tags/notebooktags.png" alt="Tags notebook" style="width:80%;">}}

Pour exclure des tags, utilisez `</>` afin de modifier le texte, puis ajoutez le tag en respectant le format `!<KEY>:<VALUE>`. Dans l'exemple ci-dessous, `service:coffeehouse` est exclu par l'expression `!service:coffeehouse`.

{{< img src="tagging/using_tags/notebooktagsexclude.mp4" alt="Exclure des tags pour un notebook" video="true" width="80%">}}

## Logs

Pour [les recherches][10], [les analyses][11], [les patterns][12] et le [Live Tailing][13] de logs, filtrez les logs avec des tags à l'aide de la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la section [Rechercher des logs][10].

{{< tabs >}}
{{% tab "Recherche" %}}

{{< img src="tagging/using_tags/logsearchtags.png" alt="Tags de recherche de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Analyse" %}}

{{< img src="tagging/using_tags/loganalyticstags.png" alt="Tags d'analyse de logs" style="width:80%;">}}

{{% /tab %}}
{{% tab "Patterns" %}}

{{< img src="tagging/using_tags/logpatternstags.png" alt="Tags de Log Patterns" style="width:80%;">}}

{{% /tab %}}
{{% tab "Live Tail" %}}

{{< img src="tagging/using_tags/livetailtags.mp4" alt="Tags live Tail" video="true" width="80%">}}

{{% /tab %}}
{{< /tabs >}}

Les tags permettent également de filtrer un [pipeline][14] de logs. Dans l'exemple ci-dessous, le pipeline filtre les logs selon le tag `service:coffee-house`.

{{< img src="tagging/using_tags/logpipelinetags.png" alt="Tags de pipeline" style="width:80%;">}}

## RUM et Session Replay

Le [RUM Explorer][15] représente les événements provenant de votre environnement sur une période donnée.

Pour filtrer les données des événements RUM en fonction de tags, utilisez la barre de recherche ou les cases de facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:shopist`. Pour effectuer une recherche avancée, consultez la section [Rechercher des événements RUM][16].

{{< img src="tagging/using_tags/rumtags.png" alt="Tags RUM" style="width:80%;">}}

## Synthetics

{{< tabs >}}
{{% tab "Tests Synthetic" %}}

La page [Synthetic Tests][1] répertorie la liste de vos tests Synthetic.

Pour filtrer des tests en fonction de tags, utilisez la barre de recherche ou les cases de facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `tag:mini-website`. Pour effectuer une recherche avancée, consultez la section [Rechercher et gérer des tests Synthetic][2].

{{< img src="tagging/using_tags/syntheticstags.png" alt="Tags Synthetic" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/tests
[2]: /fr/synthetics/search/
{{% /tab %}}
{{% tab "Explorer" %}}

La vue [Synthetic Monitoring & Testing Results Explorer][1] présente vos exécutions de test et lots d'exécutions au sein d'un [pipeline de CI][2].

Pour filtrer des exécutions de test en fonctions de tags, utilisez la barre de recherche ou les cases de facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `@ci.provider.name:github`. Pour effectuer une recherche avancée, consultez la section [Rechercher des lots de tests][3].

{{< img src="tagging/using_tags/syntheticscitags.png" alt="Tags Synthetics et CI" style="width:80%;">}}


[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /fr/continuous_testing/cicd_integrations
[3]: /fr/continuous_testing/explorer/search/
{{% /tab %}}
{{< /tabs >}}

## Service Level Objectives

{{< tabs >}}
{{% tab "Gérer vos SLO" %}}

Pour filtrer des SLO en fonction des [tags qui leur sont assignés][1], utilisez la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `journey:add_item`. Pour exclure les SLO associées à un tag spécifique de votre recherche, utilisez `-` (par exemple : `-journey:add_item`).

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Tags de SLO" style="width:80%;">}}

Les tags de SLO ne fonctionnent pas de la même façon que les tags appliqués aux métriques ou monitors sous-jacents d'un SLO.

[1]: /fr/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLO basés sur des métriques" %}}

Lorsque vous créez un [SLO basé sur des métriques][1], utilisez les tags de métrique dans les requêtes de calcul du taux de réussite du SLO (toutes les métriques doivent utiliser le même ensemble de tags de métrique) :

* La zone de texte **from** permet de limiter le contexte de la métrique à ces tags uniquement.
* La zone de texte **sum by** permet de créer un SLO groupé basé sur des métriques qui affiche un pourcentage de statut ainsi que la marge d'erreur restante pour le SLO global et pour chaque valeur de tag.

[1]: /fr/service_management/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLO basés sur des monitors" %}}

Lorsque vous créez un SLO [basé sur des monitors][1] à partir d'un seul [monitor groupé][2], utilisez l'option **Calculate on selected groups** pour sélectionner jusqu'à 20 valeurs de tag associées au monitor sous-jacent et afficher le pourcentage de statut et la marge d'erreur restante pour le SLO global et pour chaque valeur de tag :

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Tags de SLO basé sur des monitors" style="width:80%;">}}

[1]: /fr/service_management/service_level_objectives/monitor/
[2]: /fr/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## CI Visibility

{{< tabs >}}
{{% tab "Exécutions de test" %}}

La vue [CI Visibility Explorer][101] affiche vos exécutions de test dans un pipeline de CI.

Pour filtrer des exécutions de test en fonction de tags, utilisez la barre de recherche ou les cases de facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `@test.status:failed`. Pour effectuer une recherche avancée, consultez la section [Rechercher et gérer des tests CI][102].

{{< img src="/continuous_integration/test_runs.png" alt="Exécutions de test dans le CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /fr/tests/search/

{{% /tab %}}
{{% tab "Exécutions de pipeline" %}}

La vue [CI Visibility Explorer][101] affiche vos exécutions de pipeline de CI.

Pour filtrer des exécutions de pipeline en fonctions de tags, utilisez la barre de recherche ou les cases de facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `@ci.provider.name:gitlab`. Pour effectuer une recherche avancée, consultez la section [Rechercher des lots de tests][102].

{{< img src="/continuous_integration/pipeline_executions.png" alt="Exécutions de pipeline dans le CI Visibility Explorer" style="width:80%;">}}

[101]: https://app.datadoghq.com/ci/pipeline-executions
[102]: /fr/continuous_testing/explorer/search/

{{% /tab %}}
{{< /tabs >}}

## Développeurs

Il existe diverses façons d'exploiter les tags avec l'[API][17].

Consultez la liste de liens ci-dessous pour accéder aux rubriques correspondantes :

* [Planifier un downtime de monitor][18]
* [Interroger l'Events Explorer][19]
* [Rechercher des hosts][20]
* Intégrations pour [AWS][21] et [Google Cloud][22]
* [Interroger les points de séries temporelles][23]
* [Récupérer tous les détails d'un monitor][24]
* [Désactiver un monitor][25]
* [Rechercher des monitors][24]
* [Rechercher des groupes de monitors][24]
* [Créer un screenboard][26]
* [Créer un timeboard][26]
* [Créer un SLO][27]
* [Récupérer les détails d'un SLO][28]
* [Mettre à jour un SLO][29]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/
[2]: /fr/service_management/events/explorer
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