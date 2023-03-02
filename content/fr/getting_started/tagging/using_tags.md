---
title: Utiliser les tags
kind: documentation
aliases:
  - /fr/tagging/using_tags/
further_reading:
  - link: /getting_started/tagging/
    tag: Documentation
    text: Débuter avec les tags
  - link: /getting_started/tagging/assigning_tags/
    tag: Documentation
    text: Apprendre à assigner des tags
  - link: https://www.datadoghq.com/blog/tagging-best-practices/
    tag: Blog
    text: Bonnes pratiques en matière de tagging pour votre infrastructure et vos applications
---
Après avoir [assigné des tags][1], utilisez-les pour filtrer et regrouper vos données au sein de la plateforme Datadog. Les tags vous permettent d'inclure et d'exclure des données. Lorsque vous choisissez d'inclure ou d'exclure plusieurs tags :

* la fonction Include utilise la logique `AND` ;
* la fonction Exclude utilise la logique `OR`.

## Événements

Le [flux d'événements][2] affiche tous les événements de votre environnement au cours de l'intervalle spécifié. Utilisez des tags pour affiner la liste d'événements et étudier un sous-ensemble d'événements. Saisissez `tags:` suivi du nom d'un tag pour afficher tous les événements générés par un host, une [intégration][3] ou un service qui possèdent ce tag. Dans l'exemple ci-dessous, l'expression `tags:service:coffee-house` permet de rechercher le tag `service:coffee-house`. Pour effectuer une recherche inclusive avec plusieurs tags, séparez chaque tag par l'opérateur OR : `tags:service:coffee-house OR host:coffeehouseprod`. Pour effectuer une recherche exclusive avec plusieurs tags, séparez chaque tag par une virgule : `tags:service:coffee-house,host:coffeehouseprod.`

{{< img src="tagging/using_tags/eventtags.png" alt="Liste d'événements et tags" style="width:80%;">}}

## Dashboards

{{< tabs >}}
{{% tab "Assignation" %}}

Utilisez des tags pour filtrer les métriques à afficher dans un [graphique de dashboard][1] ou pour créer des groupes agrégés de métriques à afficher. Pour filtrer les métriques à afficher, saisissez les tags dans la zone de texte **from**. Les données de la métrique choisie s'afficheront alors pour toutes les sources qui possèdent ce tag (à savoir, `service:coffee-house` dans l'exemple ci-dessous).

{{< img src="tagging/using_tags/dashboardtags_1.png" alt="Tags dans des dashboards avec la zone de texte from" style="width:80%;">}}

Le filtrage avancé des valeurs de tag peut également inclure des filtres booléens. La syntaxe booléenne suivante est prise en charge :

* `NOT`, `!`
* `AND`, `,`
* `OR`
* `key IN (valeur_tag1, valeur_tag2, etc.)`
* `key NOT IN (valeur_tag1, valeur_tag2, etc.)`

Utilisez `AND` ou `OR` pour examiner une métrique en fonction de tags spécifiques :

{{< img src="tagging/using_tags/dashboard_boolean_1.png" alt="Filtre booléen avec AND/OR" style="width:80%;">}}

Utilisez `IN` ou `NOT IN` pour filtrer rapidement une métrique en fonction de tags spécifiques :

{{< img src="tagging/using_tags/dashboards_boolean_2.png" alt="Filtre booléen avec IN/NOT IN" style="width:80%;">}}

Pour créer un groupe agrégé à l'aide de tags, saisissez la clé du tag dans la zone de texte **avg by**. Par exemple, si vous disposez d'un graphique de séries temporelles présentant une métrique taguée avec la clé `service`, comme `service:coffee-house`, saisissez `service` dans la zone de texte **avg by** pour afficher une ligne pour chaque valeur de tag `service`. Chaque ligne représente la valeur moyenne de la métrique pour l'ensemble des sources qui partagent la valeur de tag `service`. 

{{< img src="tagging/using_tags/dashboardtags.png" alt="Tags dans des dashboards avec la zone de texte avg by" style="width:80%;">}}

Les tags peuvent également être utilisés pour superposer des événements sur un dashboard, comme dans le [flux d'événements][2].
Saisissez `tags:` suivi du nom du tag. Les événements correspondants sont superposés sous la forme de barres verticales dans le graphique. L'exemple ci-dessous utilise l'expression `tags:service:coffee-house`.

{{< img src="tagging/using_tags/dashboardeventtags.png" alt="Superposition d'événements dans des dashboards" style="width:80%;">}}

Utilisez des [template variables][3] pour activer facilement le tag **from** sur les graphiques de votre dashboard. Dans l'exemple ci-dessous, `service` est utilisé pour représenter la clé de tag `service`. Ajoutez la template variable `$service` dans la zone de texte **from** de votre requête de graphique pour l'utiliser.

{{< img src="tagging/using_tags/dashboardtemplatevariables.png" alt="Template variables dashboard" style="width:80%;">}}

[1]: /fr/dashboards/
[2]: /fr/events/
[3]: /fr/dashboards/template_variables/
{{% /tab %}}
{{% tab "Exemples" %}}

Vous trouverez ci-dessous un exemple de tags avec l'éditeur de graphiques pour séries temporelles. Aucun tag n'a été appliqué dans la première capture d'écran. L'utilisation moyenne de processeur est donc affichée pour l'ensemble des hosts :

{{< img src="tagging/using_tags/Tags_1.png" alt="Tags_1" style="width:75%;">}}

Les informations de l'éditeur sont ensuite mises à jour afin d'inclure un tag (`region:eastus`) dans la zone de texte **from**. Cela permet à Datadog d'afficher l'utilisation de processeur sur l'ensemble de la région Est des États-Unis. Le tag `region` est utilisé à titre d'exemple : vous pouvez utiliser n'importe quel tag arbitraire transmis à votre plateforme Datadog, comme `application`, `service`, `environment`, etc.

{{< img src="tagging/using_tags/Tags_2.png" alt="Tags_2" style="width:75%;">}}

Enfin, le deuxième champ vide (la zone de texte **avg by**) est utilisé pour afficher une ligne de série temporelle pour chaque `host`. Le processeur du serveur est affiché pour chaque host exécuté dans la région Est des États-Unis.

{{< img src="tagging/using_tags/Tags_3.png" alt="Tags_3" style="width:75%;">}}

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

{{< tabs >}}
{{% tab "Gérer les monitors" %}}

Pour filtrer des monitors en fonction des [tags qui leur sont assignés][1], utilisez la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `tag:<KEY>:<VALUE>`. Indiquez par exemple `tag:service:coffee-house`. Pour exclure les monitors associés à un tag spécifique de votre recherche, utilisez `-` (par exemple : `tag:-service:coffee-house`). **Remarque** : les tags de monitor ne fonctionnent pas de la même façon que les tags de métrique.

{{< img src="tagging/using_tags/managemonitorstags.png" alt="Gérer les tags de monitor" style="width:80%;">}}

[1]: /fr/getting_started/tagging/assigning_tags/
{{% /tab %}}

{{% tab "Nouveau monitor" %}}

Lorsque vous créez un [monitor][1], utilisez les tags de métrique dans :

* la zone de texte **from**, afin de limiter la portée du monitor et d'inclure uniquement les métriques possédant les tags indiqués ;

* la zone de texte **excluding**, afin d'exclure les métriques correspondantes de la portée du monitor ;

* la zone de texte **avg by**, afin de transformer le monitor en un monitor à alertes multiples pour chaque valeur de tag.

{{< img src="tagging/using_tags/newmonitortags.png" alt="Tags nouveau monitor" style="width:80%;">}}

[1]: /fr/monitors/create/types/
{{% /tab %}}
{{% tab "Gérer les downtimes" %}}

Pour filtrer les [downtimes][1] en fonction d'un tag de monitor, saisissez le nom du tag dans la barre de recherche, par exemple `service:coffee-house`.

{{< img src="tagging/using_tags/managedowntimetags.png" alt="Gérer les tags de monitor" style="width:80%;">}}

[1]: /fr/monitors/notify/downtimes/
{{% /tab %}}
{{< /tabs >}}

## Métriques

Utilisez les tags dans [Metrics Explorer][8] pour filtrer les métriques en fonction de tags ou pour afficher plusieurs graphiques selon une clé de tag. L'exemple ci-dessous représente une métrique avec l'expression `service:coffee-house` et affiche un graphique par `host`.

{{< img src="tagging/using_tags/metricsexplorertags.png" alt="Gérer les tags de monitor" style="width:80%;">}}

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
{{% tab "Analytics" %}}

Pour [les recherches de traces][1], filtrez les traces avec des tags à l'aide de la barre de recherche ou des cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la page [sur les recherches de traces][2].

{{< img src="tagging/using_tags/tracesearchtags.png" alt="Tags recherche de traces" style="width:80%;">}}

[1]: /fr/tracing/app_analytics/search/
[2]: /fr/tracing/app_analytics/search/#search-bar
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

Pour [les recherches][10], [les analyses][11], [les patterns][12] et le [Live Tailing][13] de logs, filtrez les logs avec des tags à l'aide de la barre de recherche ou des cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>`. Indiquez par exemple `service:coffee-house`. Pour effectuer une recherche avancée, consultez la page [sur les recherches de logs][10].

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


## Service Level Objectives

{{< tabs >}}
{{% tab "Gérer vos SLO" %}}

Pour filtrer des SLO en fonction des [tags qui leur sont assignés][1], utilisez la barre de recherche ou les cases des facettes. Vous devez utiliser le format suivant dans la barre de recherche : `<KEY>:<VALUE>` (par exemple : `journey:add_item`). Pour exclure les SLO associés à un tag spécifique de votre recherche, utilisez `-` (par exemple : `-journey:add_item`). **Remarque** : les tags de SLO sont différents et distincts des tags de métrique ou de monitor utilisés dans les métriques ou les monitors qui composent un SLO.

{{< img src="tagging/using_tags/manage_slo_tags.png" alt="Tags de SLO" style="width:80%;">}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=servicelevelobjectives#ui
{{% /tab %}}

{{% tab "SLO basés sur des métriques" %}}

Lorsque vous créez un [SLO basé sur des métriques][1], utilisez les tags de métrique dans les requêtes de calcul du taux de réussite du SLO (toutes les métriques doivent utiliser le même ensemble de tags de métrique) :

* La zone de texte **from** permet de limiter le contexte de la métrique à ces tags uniquement.
* La zone de texte **sum by** permet de créer un SLO groupé basé sur des métriques qui affiche un pourcentage de statut ainsi que la marge d'erreur restante pour le SLO global et pour chaque valeur de tag.

{{< img src="tagging/using_tags/metric_based_slo_tags.png" alt="Tags de SLO basé sur des métriques" style="width:80%;">}}

[1]: /fr/monitors/service_level_objectives/metric/
{{% /tab %}}
{{% tab "SLO basés sur des monitors" %}}

Lorsque vous créez un SLO [basé sur des monitors][1] à partir d'un seul [monitor groupé][2], utilisez l'option **Calculate on selected groups** pour sélectionner jusqu'à 20 valeurs de tag associées au monitor sous-jacent et afficher le pourcentage de statut et la marge d'erreur restante pour le SLO global et pour chaque valeur de tag :

{{< img src="tagging/using_tags/monitor_based_slo_tags.png" alt="Tags de SLO basé sur des monitors" style="width:80%;">}}

[1]: /fr/monitors/service_level_objectives/monitor/
[2]: /fr/getting_started/tagging/using_tags/?tab=newmonitor#monitors
{{% /tab %}}
{{< /tabs >}}

## Développeurs

Les tags peuvent être utilisés de diverses façons avec l'[API][15]. Cliquez sur les liens ci-dessous pour accéder aux rubriques indiquées :

* [Planifier le downtime d'un monitor][16]
* [Interroger le flux d'événements][17]
* [Rechercher des hosts][18]
* Intégrations pour [AWS][19] et [Google Cloud][20]
* [Interroger les points de séries temporelles][21]
* [Récupérer tous les détails d'un monitor][22]
* [Désactiver un monitor][23]
* [Rechercher des monitors][22]
* [Rechercher des groupes de monitors][22]
* [Créer un screenboard][24]
* [Créer un timeboard][24]
* [Créer un SLO][25]
* [Récupérer les détails d'un SLO][26]
* [Mettre à jour un SLO][27]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/
[2]: /fr/events/
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
[15]: /fr/api/
[16]: /fr/api/v1/downtimes/#schedule-a-downtime
[17]: /fr/api/v1/events/#query-the-event-stream
[18]: /fr/api/v1/hosts/
[19]: /fr/api/v1/aws-integration/
[20]: /fr/api/v1/gcp-integration/
[21]: /fr/api/v1/metrics/#query-timeseries-points
[22]: /fr/api/v1/monitors/#get-all-monitor-details
[23]: /fr/api/v1/monitors/#mute-a-monitor
[24]: /fr/api/v1/dashboards/#create-a-new-dashboard
[25]: /fr/api/v1/service-level-objectives/#create-a-slo-object
[26]: /fr/api/v1/service-level-objectives/#get-a-slos-details
[27]: /fr/api/v1/service-level-objectives/#update-a-slo