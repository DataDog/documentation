---
title: Index
kind: documentation
description: Contrôler le volume de logs indexés par Datadog
aliases:
  - /fr/logs/dynamic_volume_control
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: 'https://www.datadoghq.com/blog/logging-without-limits/'
    tag: Blog
    text: Logging without Limits*
---
Les index se trouvent sur la [page Configuration][1], dans la section Indexes. Cliquez deux fois sur les index ou sur le bouton *edit* pour obtenir plus d'informations concernant le nombre de logs indexés au cours des trois derniers jours, ainsi que la période de rétention de ces logs :

{{< img src="logs/indexes/index_details.png" alt="détails de l'index"  style="width:70%;">}}

Vous pouvez utiliser des logs indexés pour la [recherche à facettes][2], les [patterns][3], les [analyses][4], la [création de dashboards][5] et la [surveillance][6].

## Index

Par défaut, la vue Log Explorer ne comprend qu'un seul index de logs. Néanmoins, Datadog propose plusieurs index selon vos besoins :

* Vous pouvez choisir parmi plusieurs périodes de rétention et/ou plusieurs [quotas journaliers](#definir-un-quota-journalier), pour mieux contrôler votre budget.
* Vous pouvez ajouter plusieurs autorisations, afin d'optimiser votre [contrôle d'accès basé sur des rôles (RBAC)][7].

<div class="alert alert-info">
L'utilisation de plusieurs index constitue une fonctionnalité en version bêta privée. <a href="/help">Contactez l'assistance Datadog</a> afin de l'activer pour votre compte.
</div>

## Filtres d'index

Grâce aux filtres d'index, vous pouvez choisir de façon dynamique à quels index sont transmis les logs de votre choix. Par exemple, si vous créez un premier index filtré sur l'attribut `status:notice`, un deuxième index filtré sur l'attribut `status:error` et un dernier index sans filtre (équivalent à `*`), tous vos logs `status:notice` sont envoyés au premier index, tous vos logs `status:error` vont dans le deuxième index et tous les autres logs sont rassemblés dans le dernier index.

{{< img src="logs/indexes/multi_index.png" alt="Index multiples" style="width:70%;">}}

**Remarque** : **les logs sont envoyés dans le premier index filtré auquel ils correspondent**. Faites glisser et déposez les index dans la liste pour modifier leur ordre, selon vos besoins.

## Exclusion Filters

Par défaut, les index de logs ne possèdent pas de filtre d'exclusion. Ainsi, tous les logs correspondant à leur filtre sont indexés.

Toutefois, puisque vos logs ne sont pas tous utiles, les filtres d'exclusion contrôlent leur transmission dans l'index afin d'identifier les logs à supprimer. Les logs exclus sont supprimés des index, mais continuent à être analysés par la fonctionnalité de [live tailing][8] et peuvent être utilisés pour [générer des métriques][9] et être [archivés][10].

Les filtres d'exclusion sont définis par une requête, une règle d'échantillonnage et un bouton d'activation :

* La **query** (requête) par défaut est `*`. Celle-ci entraîne l'exclusion de tous les logs transmis dans l'index. Réduisez le filtre d'exclusion en définissant uniquement un sous-ensemble de logs [avec une requête de log][11].
* La **sampling rule** (règle d'échantillonnage) par défaut `Exclude 100% of logs` exclut tous les logs correspondant à la requête. Définissez un taux d'échantillonnage entre 0 et 100 %, et choisissez de l'appliquer à chaque log ou à des groupes de logs caractérisés par les valeurs uniques d'un attribut.
* Par défaut, le filtre est activé. Les logs sont donc supprimés de l'index selon les paramètres du filtre. Cliquez sur le bouton pour désactiver le filtre afin de l'ignorer pour les nouveaux logs transmis.

**Remarque** : les filtres d'index pour les logs sont uniquement traités avec le premier filtre d'exclusion **actif** correspondant. Si un log correspond à un filtre d'exclusion (même si le log n'est pas transmis en raison d'un échantillonnage), il ignore tous les filtres d'exclusion suivants.

Faites glisser et déposez les filtres d'exclusion dans la liste pour modifier leur ordre, selon vos besoins.

{{< img src="logs/indexes/reorder_index_filters.png" alt="modifier l'ordre des filtres d'index" style="width:80%;">}}

### Exemples de filtres d'exclusion

#### Désactivation et activation d'un filtre

Imaginons que vous souhaitez uniquement utiliser vos logs DEBUG lorsque votre plate-forme souffre d'une défaillance, ou que vous cherchez à surveiller le déploiement d'une version critique de votre application. Configurez un filtre d'exclusion à 100 % sur `status:DEBUG`, et activez-le ou désactivez-le à partir de l'interface Datadog ou via l'[API][12] dès que vous en avez besoin.

{{< img src="logs/indexes/enable_index_filters.png" alt="activer les filtres d'index" style="width:80%;">}}

#### Suivi des tendances

Partons du principe que vous n'avez pas besoin de conserver tous les logs de vos requêtes de serveur relatives à l'accès Web. Vous pouvez choisir d'indexer tous les logs 3xx, 4xx et 5xx, mais d'exclure 95 % des logs 2xx  `source:nginx AND http.status_code:[200 TO 299]` pour surveiller les tendances.
**Astuce** : transformez vos logs d'accès Web en KPI utiles en [générant une métrique à partir de vos logs][10]. Celle-ci vous permettra par exemple de compter le nombre de requêtes et de les taguer par code de statut, [navigateur][13] et [pays][14].

{{< img src="logs/indexes/sample_200.png" alt="activer les filtres d'index"  style="width:80%;">}}

#### Échantillonnage cohérent avec des entités de plus haut niveau

Des millions d'utilisateurs se connectent à votre site Web chaque jour. Bien que vous n'ayez pas besoin de connaître parfaitement tous vos utilisateurs, il peut être utile de comprendre les caractéristiques de certains d'entre eux. Définissez un filtre d'exclusion qui s'applique à tous les logs de production (`env:production`) et excluez les logs pour 90 % de `@user.email` :

{{< img src="logs/indexes/sample_user_id.png" alt="activer les filtres d'index"  style="width:80%;">}}

Vous pouvez utiliser l'APM avec les logs grâce à l'[injection d'ID de trace dans les logs][15]. Vous n'avez pas besoin de garder tous vos logs sur les utilisateurs. Cependant, veillez à ce que les logs que vous conservez représentent tous les aspects d'une trace. Une telle pratique simplifiera grandement votre correction des problèmes.
Configurez un filtre d'exclusion appliqué aux logs à partir de votre service instrumenté (`service:mon_app_python`) et excluez les logs pour 50 % des `Trace ID`. Assurez-vous d'utiliser le [remappeur d'ID de trace][16] en amont dans vos pipelines.

{{< img src="logs/indexes/sample_trace_id.png" alt="activer les filtres d'index"  style="width:80%;">}}

## Définir un quota journalier

Il est possible de définir un quota journalier pour limiter le nombre de logs stockés dans un index au cours d'une journée. Ce quota est appliqué à l'ensemble des logs qui auraient dû être stockés (c'est-à-dire une fois les filtres d'exclusion appliqués).
Une fois ce quota atteint, les logs ne sont plus indexés. Ils restent toutefois disponibles pour le [live tailing][17] et continuent à être [envoyés vers vos archives][18] et utilisés pour [générer des métriques][19].

Ce quota peut être modifié ou supprimé à tout moment en modifiant l'index :

{{< img src="logs/indexes/index_quota.png" alt="détails de l'index" style="width:70%;">}}

**Remarque** : le quota journalier d'un index est automatiquement réinitialisé à 14 h 00 UTC (16 h 00 CET, 10 h 00 EDT, 7 h 00 PDT).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/pipelines/indexes
[2]: /fr/logs/explorer/?tab=facets#visualization
[3]: /fr/logs/explorer/patterns
[4]: /fr/logs/explorer/analytics
[5]: /fr/logs/explorer/analytics/#dashboard
[6]: /fr/monitors/monitor_types/log
[7]: /fr/account_management/rbac
[8]: /fr/logs/live_tail
[9]: /fr/logs/archives
[10]: /fr/logs/logs_to_metrics
[11]: /fr/logs/explorer/search/
[12]: /fr/api/?lang=bash#update-an-index
[13]: /fr/logs/processing/processors/?tab=ui#user-agent-parser
[14]: /fr/logs/processing/processors/?tab=ui#geoip-parser
[15]: /fr/tracing/connect_logs_and_traces/
[16]: /fr/logs/processing/processors/?tab=ui#trace-remapper
[17]: https://docs.datadoghq.com/fr/logs/live_tail/#overview
[18]: https://docs.datadoghq.com/fr/logs/archives/
[19]: https://docs.datadoghq.com/fr/logs/logs_to_metrics/