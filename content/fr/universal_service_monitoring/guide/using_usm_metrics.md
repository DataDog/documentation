---
description: Découvrez comment créer des monitors, SLO et dashboards basés sur vos
  métriques USM.
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Découvrir, mapper et surveiller automatiquement tous vos services en quelques
    secondes avec la solution Universal Service Monitoring
- link: /universal_service_monitoring
  tag: Documentation
  text: En savoir plus sur Universal Service Monitoring
- link: /tracing/metrics
  tag: Documentation
  text: En savoir plus sur les métriques APM

title: Utiliser vos métriques USM dans des monitors, des SLO et des dashboards
---

## Présentation

La solution [Universal Service Monitoring][1] permet de découvrir les services qui utilisent des tags de conteneur populaires (tels que `app`, `short_image` ou `kube_deployment`) et de générer des entrées dans le [Service Catalog][2] pour ces services. 

Dans Datadog, vous pouvez accéder à des métriques de requêtes, d'erreurs et de durée pour le trafic entrant et sortant de tous les services découverts avec Universal Service Monitoring. Ces métriques de santé des services peuvent ensuite être utilisées pour créer des alertes, [suivre les déploiements][11] et définir des [Service Level Objectives (SLO)][3] afin d'obtenir une visibilité étendue sur tous les services exécutés au sein de votre infrastructure.

{{< img src="universal_service_monitoring/guide/usm_slo.png" alt="SLO Universal Service Monitoring pour BITSBOUTIQUE" style="width:100%;" >}}

Dans ce guide, vous verrez comment rechercher des métriques USM telles que `universal.http.*` afin de les utiliser dans vos monitors, SLO et dashboards.

## Métriques USM et métriques APM

| Nom de la métrique                 | Unités   | Type         | Description                                       |
|-----------------------------|---------|--------------|---------------------------------------------------|
| universal.http.client       | Secondes | Distribution | Latence, nombre, erreurs et taux des requêtes sortantes.                |
| universal.http.client.hits  | Hits    | Count        | Nombre total de requêtes sortantes et d'erreurs.                |
| universal.http.client.apdex | Score   | Gauge        | Score Apdex des requêtes sortantes pour ce service.                |
| universal.http.server       | Secondes | Distribution | Latence, nombre, erreurs et taux des requêtes entrantes.  |
| universal.http.server.hits  | Hits    | Count        | Nombre total de requêtes entrantes et d'erreurs.                 |
| universal.http.server.apdex | Score   | Gauge        | Score Apdex de ce service Web.             |

Contrairement aux métriques APM, les erreurs sont disponibles via le tag `error:true` au lieu de prendre la forme d'une métrique séparée.

**Remarque :** les métriques `.hits` contiennent tous les tags de votre infrastructure et constituent donc la méthode recommandée pour obtenir le nombre de requêtes et d'erreurs. Vous pouvez également ajouter un [deuxième tag primaire][16] à toutes les métriques USM.

### Syntaxe des métriques

La syntaxe de requête des métriques USM diffère de [celle des métriques APM][4], qui utilise `trace.*`. Les métriques USM sont regroupées sous un même nom de métrique de distribution.

Par exemple :

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

Les mêmes traductions s'appliquent à l'opération `universal.http.server`, qui capture le trafic entrant. Pour en savoir plus sur les métriques de distribution, consultez la section [Métriques basées sur DDSketch dans APM][12].

## Utilisation

Accédez à [**APM** > **Service Catalog**][5], filtrez les résultats en fonction du type de données de télémétrie Universal Service Monitoring, puis cliquez sur un service. L'onglet **Performance** affiche des graphiques représentant les hits, la latence, les requêtes, les erreurs, etc. pour le service sélectionné. Vous pouvez également accéder à ces métriques lors de la création d'un [monitor](#creer-un-monitor) ou d'un [SLO](#creer-un-slo), ou lorsque vous consultez un [dashboard](#acceder-a-un-dashboard-defini) dans le [Service Catalog][2].

### Créer un monitor

Vous pouvez créer un [**monitor APM**][8] pour déclencher une alerte lorsqu'une métrique USM telle que `universal.http.client` dépasse un certain seuil ou affiche un comportement inattendu.

1. Accédez à **Monitors** > **New Monitor** et cliquez sur [**APM**][13].
2. Sélectionnez **APM Metrics** et définissez le tag `env` d'un service ou d'une ressource, ainsi que tout autre [tag primaire][14] de votre choix. Sélectionnez le service ou la ressource à surveiller et définissez l'intervalle d'évaluation de la requête du monitor.
3. Sélectionnez **Threshold Alert** et choisissez une métrique USM, telle que `Requests per Second`, sur laquelle le monitor se déclenchera. Ensuite, indiquez si la valeur doit être **above** (supérieure) ou **below** (inférieure) aux seuils d'alerte et d'avertissement. Saisissez une valeur pour le seuil d'alerte, ainsi que pour le seuil d'avertissement si vous le souhaitez.
4. La section dédiée aux notifications contient un message prédéfini pour le monitor. Vous pouvez personnaliser le nom de l'alerte et le message, mais aussi définir les autorisations de ce monitor.
5. Cliquez sur **Create**.

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="Monitor Universal Service Monitoring pour BITSBOUTIQUE" style="width:100%;" >}}

Pour en savoir plus, consultez la [documentation dédiée aux monitors APM][6].

### Créer un SLO

Vous pouvez créer un [**SLO**][10] pour chaque service afin de vous assurer que vous respectez les objectifs définis par les métriques USM et que la disponibilité du service s'améliore au fil du temps. Datadog vous conseille de [créer vos SLO par programmation][9] afin de couvrir un vaste nombre de services.

Pour créer un SLO à partir du Service Catalog :

1. Accédez à l'onglet **Reliability** du [Service Catalog][5].
2. Sous la colonne **SLOs**, passez votre curseur sur un service et cliquez sur **+ Create Availability SLO** ou **+ Create Latency SLO**.

{{< img src="universal_service_monitoring/guide/service_catalog_slo_setup.png" alt="Configurer un SLO Universal Service Monitoring pour BITSBOUTIQUE" style="width:100%;" >}}

Vous pouvez également créer un SLO manuellement à partir de métriques USM :

1. Accédez à **Service Management** > **SLOs** et cliquez sur [**New SLO**][15].
2. Sélectionnez **Metric Based** et créez deux requêtes dans la section **Good events (numerator)** :

   * Requête A : Saisissez une métrique USM telle que `universal.http.server`, filtrez en fonction d'un service spécifique en ajoutant les tags primaires `service` et `env` dans le champ `from`, et sélectionnez `count` dans le champ `as`.
   * Requête B : Saisissez une métrique USM telle que `universal.http.server`, filtrez en fonction d'un service spécifique en ajoutant les tags primaires `service` et `env` en plus du tag `error:true` dans le champ `from`, et sélectionnez `count` dans le champ `as`.

3. Cliquez sur **+ Add Formula** et saisissez `a-b`.
4. Dans la section **Total events (denominator)**, saisissez une métrique USM telle que `universal.http.server`, filtrez en fonction d'un service spécifique en ajoutant les tags primaires `service` et `env` dans le champ `from`, et sélectionnez `count` dans le champ `as`.
5. Cliquez sur **+ New Target** pour créer un seuil cible avec les paramètres suivants :

   * Intervalle de temps de `7 Days`, seuil cible de `95%` et seuil d'avertissement de `99.5%`. Datadog vous conseille de définir le même seuil cible pour tous les intervalles de temps.

6. Saisissez un nom et une description pour ce SLO. Définissez les tags primaires `env` et `service` en plus du tag `team`.
7. Cliquez sur **Save and Set Alert**.

{{< img src="universal_service_monitoring/guide/usm_slo_setup.png" alt="Configurer un SLO Universal Service Monitoring pour BITSBOUTIQUE" style="width:100%;" >}}

Pour en savoir plus, consultez la [documentation dédiée aux Service Level Objectives][10].

### Accéder à un dashboard défini

Le [Service Catalog][2] identifie les dashboards définis dans votre fichier de définition de service et les répertorie sur l'onglet **Dashboards**. Cliquez sur **Manage Dashboards** pour accéder à la définition de service et la modifier directement dans GitHub. 

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="Bouton Manage Dashboards sur l'onglet Dashboards d'un service dans le Service Catalog" style="width:90%;" >}}

Pour en savoir plus, consultez la [documentation dédiée aux dashboards][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/universal_service_monitoring
[2]: /fr/tracing/service_catalog
[3]: /fr/monitors/service_level_objectives
[4]: /fr/tracing/metrics/metrics_namespace
[5]: https://app.datadoghq.com/services
[6]: /fr/monitors/create/types/apm
[7]: /fr/dashboards
[8]: https://app.datadoghq.com/monitors/create/apm
[9]: /fr/api/latest/service-level-objectives/
[10]: https://app.datadoghq.com/slo/new
[11]: /fr/tracing/services/deployment_tracking/
[12]: /fr/tracing/guide/ddsketch_trace_metrics/
[13]: https://app.datadoghq.com/monitors/create/apm
[14]: /fr/metrics/advanced-filtering/
[15]: https://app.datadoghq.com/slo/new
[16]: /fr/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog