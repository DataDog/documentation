---
title: Métriques de distribution
kind: documentation
description: Calculez les centiles globaux de l'intégralité de votre ensemble de données.
aliases:
  - /fr/developers/faq/characteristics-of-datadog-histograms/
further_reading:
  - link: 'developers/dogstatsd/data_types#distributions'
    tag: Documentation
    text: Utilisation des distributions dans DogStatsD
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta. <a href="/help">Contactez l'assistance Datadog</a> afin d'activer les métriques de distribution pour votre compte.
</div>

## Présentation

Les distributions sont un [type de métrique][1] et peuvent être comparées à une version globale de la [métrique histogram][2], qui mesure la distribution statistique des valeurs discrètes sur un seul host. Les distributions observent les valeurs envoyées par plusieurs hosts afin de mesurer les distributions statistiques dans toute votre infrastructure. Cela vous permet de calculer les centiles globaux de l'intégralité de votre ensemble de données.

Les distributions globales sont conçues pour instrumenter des objets logiques, comme des services, indépendamment des hosts sous-jacents. Ils fournissent également des statistiques concernant le comportement des métriques dans votre infrastructure.

Consultez la [section Outils de développement][3] pour en savoir plus sur les spécificités de ce type de métrique. Vous pouvez également poursuivre votre lecture pour apprendre à manipuler et à visualiser les distributions dans l'interface.

## Agrégations

Le nouveau flux de travail de tagging pour les distributions vous permet de définir les agrégations disponibles dans les requêtes. Dans un premier temps, Datadog conserve une seule série temporelle, pour `*` (toutes les occurrences), et ignore tous les tags. Agrégez manuellement votre métrique en fonction de plusieurs ensembles de tags choisis parmi la liste des tags normalement disponibles. Pour des raisons pratiques, Datadog crée également des agrégations pour toutes les combinaisons composées d'un maximum de quatre tags personnalisés qui sont appliqués à chaque métrique.

Grâce à l'[IU de distribution][4], créez davantage de séries temporelles agrégées. Pour ce faire, appliquez un ensemble de tags à une métrique afin de créer une série temporelle pour chaque combinaison de valeurs de tag dans l'ensemble.

**Les ensembles ne peuvent pas comprendre plus de quatre tags.**

{{< img src="graphing/metrics/distributions/distribution_metric.png" alt="Métrique de distribution" responsive="true" >}}

Lorsque vous créez votre propre graphique, des agrégations spatiales supplémentaires sont automatiquement disponibles pour les métriques de distribution dans l'IU :

{{< img src="graphing/metrics/distributions/dogweb_latency_bis.png" alt="Métrique de distribution bis" responsive="true" >}}

## Étude de cas

`my.service.latency` est une métrique envoyée à 500 hosts.

Chaque host est tagué avec l'une des trois `Availability Zones` (conformément aux tags de l'intégration AWS) et l'un des 20 `Roles` de Chef, le système d'approvisionnement de Datadog.

De plus, le tag `Status` est appliqué à cette métrique. Il comprend 2 valeurs : `Status:Success` ou `Status:Fail` et `Result`. Ce dernier possède également 2 valeurs : `Result:Open` ou `Result:Close`.

##### 1er scénario

Par défaut, Datadog crée des agrégations pour `my.service.latency` pour chaque combinaison de tags de métrique custom `Status` et `Result`.

Vous pouvez alors envoyer, par exemple, la requête `{my.service.latency for Status:success, Result:closed}`, mais pas `{my.service.latency for Availability-Zone: US-East-1a}`

Cette action crée (2 + 1) * (2 + 1) * 10 = 90 séries temporelles.

##### 2e scénario

Vous effectuez une agrégation à partir de `{Status, Result, Host}` à la place des valeurs par défaut.
Les requêtes disponibles comprennent, par exemple :

* `{my.service.latency for Status:success, Result:closed, Host: i-deadbeef}`
* `{my.service.latency for Status:fail, host: i-deadbeef}`

La requête suivante n'est pas disponible :

* `{my.service.latency for Availability-Zone: US-East-1a}`

Cette action crée (2 + 1) * (2 + 1) * (500 + 1) * 10 = 45 090 séries temporelles.

##### 3e scénario

Vous agrégez à partir de `{Availability-Zone, Status}`, en plus de `{Status, Result, Host}`.

Les requêtes disponibles comprennent :

* `{my.service.latency for AZ: US-East-1a}`
* `{my.service.latency for AZ: US-West-2b, Status: Success}`
*  N'importe quelle requête du scénario précédent

La série temporelle agrégée selon `Availability-Zone` et `Host` n'a pas été demandée, donc `{my.service.latency for AZ:US-East-1a, Host:i-deadbeef}` n'est pas disponible.

Cette action crée (3 + 1) * (2 + 1) * 10 = 120 séries temporelles, en plus des 45 090 précédentes, pour un total de 45 210 séries temporelles.

Comme vous pouvez le voir, l'agrégation de plusieurs ensembles de tags augmente de façon cumulative le nombre de séries temporelles, ce qui limite la croissance des séries temporelles.

Le gif suivant illustre comment inspecter des agrégations créées pour une métrique, `intake.batch_api_keys_for_org`. Ici, vous pourriez interroger `{availability-zone, role}` ou `{instance-type, role}`, mais pas `{availability-zone, instance-type}`.

{{< img src="graphing/metrics/distributions/Distros_Tagging.gif" alt="Tagging_distributions" responsive="true" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/metrics
[2]: /fr/developers/metrics/histograms
[3]: /fr/developers/metrics/distributions
[4]: https://app.datadoghq.com/metric/distribution_metrics