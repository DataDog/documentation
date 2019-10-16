---
title: Métriques custom
kind: documentation
aliases:
  - /fr/getting_started/custom_metrics
---
Avec Datadog, vous pouvez envoyer de plusieurs façons des métriques custom afin de gagner en visibilité sur l'ensemble de votre infrastructure.

Cette page explique :

* Qu'est-ce qu'une métrique custom, et comment pouvez-vous l'envoyer à Datadog
* Le nombre de métriques custom autorisées par défaut
* Comment vérifier le nombre de métriques custom au fil du temps

## Comment est définie une métrique custom ?

Une métrique custom représente une seule et unique combinaison du nom, du host et des tags d'une métrique.

Les métriques custom désignent généralement n'importe quelle métrique envoyée via Statsd, [DogStatsD][1] ou une extension de l'[Agent Datadog][2]. Certaines [intégrations][3] peuvent potentiellement générer un nombre illimité de métriques susceptibles d'être considérées comme des métriques custom. Découvrez [les intégrations standard qui génèrent des métriques custom][4] pour en savoir plus.

Utilisez les tags afin de tirer pleinement parti des capacités de Datadog via les contextes et les alertes. Lorsque vous utilisez des tags, l'envoi d'une seule métrique entraîne la création de **plusieurs combinaisons de tags uniques** prises en compte dans le nombre de métriques custom.

**Exemple 1**

Par exemple, supposons que vous souhaitiez mesurer la `temperature` moyenne aux États-Unis. Vous collectez les mesures de température suivantes toutes les 10 secondes au cours de la dernière minute pour Orlando, Miami, New York, Boston et Seattle. Chaque mesure de la `temperature` est taguée avec les informations relatives à `city`, `state`, `region` et `country`. 

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Chaque combinaison unique de tags `city`, `state`, `region` et `country` représente une métrique de série temporelle/custom. À partir des cinq séries chronologiques ci-dessus, il est possible de déterminer la température moyenne aux États-Unis, dans le Nord-Est ou en Floride.

**Exemple 2**

* Vous choisissez le nom de métrique suivant : `auth.exceptionCount`.
* Votre instrumentation de code prévoit d'associer les tags suivants à cette métrique : `method:X`, `method:Y`, `exception:A`, `exception:B`.
* Votre métrique suit alors la logique suivante :
{{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="métrique_custom_1" responsive="true" >}}

Les métriques uniques **pour un host donné** sont alors :

* `auth.exceptionCount` avec le tag `method:X`
* `auth.exceptionCount` avec le tag `method:Y`
* `auth.exceptionCount` avec les tags `method:X` et `exception:A` (elles sont uniques à cause du nouveau tag `exception:A`)
* `auth.exceptionCount` avec les tags `method:X` et `exception:B`
* `auth.exceptionCount` avec les tags `method:Y` et `exception:A`
* `auth.exceptionCount` avec les tags `method:Y` et `exception:B`

Dans cette situation, on obtiendrait 6 métriques différentes.

Veuillez noter que l'ordre des tags n'a pas d'importance. Les deux métriques suivantes ne sont donc pas considérées comme uniques :

* auth.exceptionCount avec les tags `method:X` et `exception:A`
* auth.exceptionCount avec les tags `exception:A` et `method:X`

## Combien de métriques custom est-il possible d'envoyer ?

Datadog propose deux forfaits : Pro et Enterprise. Les clients Pro ont droit à 100 métriques custom par host, contre 200 métriques custom par host pour les clients Enterprise. Le total de ces métriques repose sur l'ensemble de l'infrastructure, plutôt que sur une évaluation par host. Par exemple, si vous utilisez le forfait Pro et que vous avez droit à 3 hosts, vous disposez alors de 300 métriques personnalisées par défaut. Ces 300 métriques peuvent être réparties de façon égale entre chaque host individuel ou être toutes envoyées depuis un seul host.

En suivant l'exemple précédent, voici trois scénarios qui ne dépassent pas le nombre de métriques par défaut pour trois hosts :

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="métriques_custom_300" responsive="true" style="width:75%;">}}

{{< img src="developers/metrics/custom_metrics/custom-metrics-1.jpg" alt="métriques-custom-1" responsive="true" style="width:75%;">}}

Aucune [limite de débit fixe][5] n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, vous serez facturé conformément à la [politique de facturation de Datadog pour les métriques custom][6].

## Comment vérifier le nombre de métriques custom ?

Lorsque vous créez une métrique custom, tous les tags de host sont automatiquement ajoutés à cette métrique sous une seule combinaison de tags, à laquelle vous ajouterez les tags associés à la métrique. Ces tags sont les plus importants, car ils s'ajoutent au nombre réel de métriques.

Imaginons que vous souhaitez surveiller le nombre de requêtes en provenance de différents services sur votre infrastructure.

* Vous créez ainsi votre métrique service.request.count.
* Vous souhaitez séparer les requêtes réussies des échecs. Vous créez donc deux tags :
    * `status:success`
    * `status:failure`
* Vous souhaitez que cette métrique soit transmise par chaque service s'exécutant sur votre infrastructure. Imaginons que vous disposez de trois services par host :
    * `service:database`
    * `service:api`
    * `service:webserver`

Votre métrique suit alors la logique suivante :

{{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="métrique_logique" responsive="true" style="width:75%;">}}

À partir de là, vous pouvez voir que **sur chaque host transmettant cette métrique**, si tous les services renvoient des réussites et des échecs, vous pouvez avoir jusqu'à 1 x 2 x 3 = **6 métriques custom**.

Partons du principe que vous avez trois hosts :

* `host1` transmet toutes les configurations possibles.
* `host2` transmet uniquement les réussites de tous les services.
* `host3` transmet les réussites et les échecs, mais uniquement pour les services de base de données et de serveur Web.

Vos 3 hosts envoient alors 13 métriques distinctes. Le tableau suivant vous explique pourquoi :

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="nombre_métriques" responsive="true" style="width:75%;">}}

Si vous êtes un administrateur, vous pouvez voir le nombre total de métriques custom par heure ainsi que les 500 principales métriques custom en fonction de leur cardinalité depuis votre compte, sur [la page des détails d'utilisation][7]. Vous pouvez également accéder à ces informations sur votre [page de résumé des métriques][8], où vous pouvez voir le nombre exact de combinaisons de tags uniques en cliquant sur la métrique service.request.count.

Voyons maintenant combien de métriques custom existent avec uniquement le premier host de l'exemple ci-dessus :

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="résumé_métriques" responsive="true" style="width:70%;">}}

En ajoutant le deuxième host :

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="résumé_métriques_2" responsive="true" style="width:70%;">}}

Avec le troisième host, vous obtenez 13 métriques distinctes :

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="résumé_métriques_3" responsive="true" style="width:70%;">}}

Grâce à l'éditeur de requêtes, vous pouvez également utiliser l'agrégateur count: :

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="agrégateur_métriques" responsive="true" style="width:70%;">}}

Enfin, vous obtenez 13 métriques avec la requête suivante : `count:service.request.count{*}`.

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="nombre_de_métriques" responsive="true" style="width:70%;">}}

### Calculer le nombre de métriques custom à partir de métriques gauge, count, histogram et rate
Une métrique [gauge][9] représente une valeur par seconde (exemples : température ou décalage de la file d'attente Kafka).

Supposons que vous souhaitiez mesurer la `temperature` moyenne dans l'État de Floride. La `temperature` est enregistrée en tant que métrique de type `gauge` dans Datadog. Vous collectez les mesures de température suivantes toutes les 10 secondes au cours de la dernière minute pour Orlando, Miami, Boston, New York et Seattle, chaque mesure étant taguée avec les informations relatives à `city`, `state`, `region` et `country`.

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Le nombre total de métriques personnalisées associées à la métrique gauge `temperature` est de cinq. Chaque combinaison de chaîne unique entre `city`, `state`, `region` et `country` associée aux données de température est considérée comme une métrique custom (en d'autres termes, des séries temporelles de données stockées par Datadog).

À partir des cinq séries temporelles ci-dessus, il est possible de déterminer la `temperature` moyenne aux États-Unis, dans le Nord-Est ou en Floride au moment de la requête.

**Remarque** : la méthode utilisée pour calculer le nombre de métriques custom est la même que celle utilisée pour calculer les métriques de type `count`,` histogram` et `rate`.

#### Supprimer des tags
Supposons que vous souhaitiez supprimer le tag `country` de la métrique gauge `temperature`.

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Même s'il y a cinq villes, quatre États, trois régions et un pays, les données contiennent encore cinq combinaisons de valeurs uniques pour les tags `city`, `state`, `region` et `country`. Le nombre total de métriques custom émises par la métrique `temperature` est toujours de cinq.

Supposons que vous supprimiez le tag `city` de la métrique gauge `temperature`.

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| FL, Southeast | 81 | 81 | 81 | 81 | 81.5 | 81.5 | 81.5 |
| MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

Les données de `temperature` contiennent désormais quatre combinaisons de valeurs de tag uniques. Par conséquent, le nombre total de métriques custom émises par la métrique `temperature` avec les tags ` state` et `region` est de quatre.

### Calculer le nombre de métriques custom à partir de métriques de distribution
Une métrique de distribution récupère l'ensemble des valeurs pour l'ensemble des hosts émettant des valeurs de métriques dans un intervalle de dix secondes. Les distributions émettent un nombre de métriques custom proportionnel au nombre de métriques custom émises par les `gauges`. Les distributions génèrent quatre séries temporelles pour chaque combinaison de tag unique qui apparaît dans les données : `sum`, `count`, `min` et `max` (`avg` est calculé à partir de sum/count).

Supposons que vous souhaitiez mesurer la métrique `age` maximale dans l'État de New York. La métrique `age` est envoyée à Datadog en tant que métrique de distribution avec les tags `city` et `state` :

|  | Valeurs par intervalle de 10 secondes | Sum | Count | Minimum | Maximum | Average (Sum/Count) |
|---------------|------------------------------|-----|-------|---------|---------|---------------------|
| Rochester, NY | 23,29,33,55,41,36,12,67 | 296 | 8 | 12 | 67 | 37 |
| New York, NY | 18,22,26,31,29,40,23,35 | 215 | 8 | 18 | 40 | 28 |

Le nombre total de métriques custom ou de séries temporelles émises à partir de la métrique de distribution `age` est de **dix (5 x 2)**. Pour les deux combinaisons de valeurs de tags uniques ci-dessus (Rochester, NY et New York, NY), Datadog conserve cinq séries temporelles (`sum`, `count`, `min`, `max`, `avg`).

On peut obtenir l'âge maximal dans l'État de New York en agrégeant les séries temporelles ci-dessus : âge maximal à New York = `max` (`max` (Rochester, NY), `max` (New York, NY)) = 67.

#### Métriques de distribution avec agrégations en centile
Après avoir envoyé une métrique de distribution à Datadog, vous avez la possibilité d'ajouter des agrégations de centiles depuis l'interface Distributions de l'application. Les distributions avec agrégations en centile sont calculées différemment des types de métriques énumérés ci-dessus, car les centiles ne peuvent pas être réagrégés mathématiquement.

Supposons que vous souhaitiez calculer l'`age`  *median* dans l'État de New York, où la métrique de distribution `age` est associée aux tags `city` et `state`.

|  | Valeurs par intervalle de 10 secondes | Sum | Count | Min | Max | Avg | p50 | p75 | p90 | p95 | p99 |
|---------------|------------------------------|-----|-------|-----|-----|-----|-----|-----|-----|-----|-----|
| Rochester, NY | 23,33,55,41,36,12,66 | 266 | 7 | 12 | 66 | 38 | 23 | 55 | 66 | 66 | 66 |
| New York, NY | 18,26,31,29,40,23,36 | 203 | 7 | 18 | 40 | 29 | 29 | 36 | 40 | 40 | 40 | 

Contrairement aux âges maximum ci-dessus, les centiles ne peut PAS être réagrégés. L'âge médian à New York n'est pas égal à `median`(`median`(Rochester, NY), `median`(New York, NY)).

Par conséquent, Datadog doit précalculer cinq séries temporelles (`p50`, `p75`, `p90`, `p95`, `p99`) pour chaque combinaison de valeurs de tags pouvant faire l'objet d'une requête. Dans l'exemple de New York, les combinaisons de valeurs de tags pouvant faire l'objet d'une requête sont les suivantes :
 * Rochester, (État `null`)
 * New York, (État `null`)
 * (Ville `Null`), NY
 * Rochester, NY
 * New York, NY
 * (Ville `Null`), (État `null`) -- équivalent à * {toutes les séries temporelles}

Le nombre de valeurs pouvant faire l'objet d'une requête est de trois pour le tag `city` {Rochester, New York, `null`} et de deux pour le tag `state` : {NY, `null`}.

Le nombre total de métriques custom émises par la métrique de distribution `age` AVEC les agrégations en centile est égal à :

{{< img src="developers/metrics/custom_metrics/38-timeseries.png" alt="[4 x (2)] + [5 x ((3) x (2))] = 38 séries temporelles." responsive="true" style="width:70%;">}}

## Poids des données

Si vous envoyez directement des métriques à l'API Datadog *sans* utiliser [DogStatsD][1], attendez-vous à :

* 64 bits pour le timestamp
* 64 bits pour la valeur
* 20 octets pour les noms de métriques
* 50 octets pour les séries temporelles

La charge utile totale vaut \~ 100 octets. Cependant, avec l'API DogStatsD, cette charge est compressée, ce qui entraîne un nombre d'octets très faible.

[1]: /fr/developers/dogstatsd
[2]: /fr/agent
[3]: /fr/integrations
[4]: /fr/account_management/billing/custom_metrics/#standard-integrations
[5]: /fr/api/#rate-limiting
[6]: /fr/account_management/billing/custom_metrics
[7]: https://app.datadoghq.com/account/usage/hourly
[8]: https://app.datadoghq.com/metric/summary
[9]: https://docs.datadoghq.com/fr/developers/metrics/gauges